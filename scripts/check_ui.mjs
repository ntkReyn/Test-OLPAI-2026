// Browser integration check. Uses an installed Chrome/Edge and Node 22, no packages.
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, writeFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let executable;
for (const candidate of [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean)) {
  try { await access(candidate); executable = candidate; break; } catch {}
}
assert.ok(executable, 'Set CHROME_PATH to an installed Chromium browser.');
const profile = await mkdtemp(join(tmpdir(), 'uet-ai-qa-'));
const browser = spawn(executable, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--disable-background-networking', '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore', windowsHide: true });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
let command;
let passed = 0;
try {
  let port;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { port = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; break; } catch { await delay(100); }
  }
  assert.ok(port, 'Chrome debugging endpoint did not start.');
  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = pages.find(page => page.type === 'page');
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  let sequence = 0;
  const pending = new Map();
  const errors = [];
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
    if (message.id) {
      const waiter = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(message.error.message)); else waiter.resolve(message.result);
    }
  });
  command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const check = async (name, expression) => {
    assert.equal(await evaluate(expression), true, name);
    passed++;
    console.log('PASS ' + name);
  };
  const waitForApp = async () => {
    for (let attempt = 0; attempt < 100; attempt++) {
      if (await evaluate("!!document.querySelector('.option')")) return;
      await delay(50);
    }
    throw new Error('Application did not render.');
  };
  await command('Runtime.enable');
  await command('Page.enable');
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1040, deviceScaleFactor: 1, mobile: false });
  await command('Page.navigate', { url: pathToFileURL(join(root, 'index.html')).href });
  await waitForApp();
  await evaluate("localStorage.setItem('uet-ai-practice-v1', JSON.stringify({answers:{1:'B',2:'B'}, optionOrders:Object.fromEntries(QUESTION_BANK.filter(q => q.id <= 140).map(q => [q.id,['D','C','B','A']])), bookmarks:[1], currentId:1, category:'all'}))");
  await command('Page.reload');
  await waitForApp();
  await check('Legacy progress migrates by original content without changing scores', "document.querySelector('.option.wrong').dataset.sourceLetter === 'B' && document.getElementById('correct-stat').textContent === '1' && document.getElementById('wrong-stat').textContent === '1' && document.getElementById('bookmark-button').getAttribute('aria-pressed') === 'true'");
  await check('Extending the bank keeps all old permutations and adds new question orders', "(() => { const s=JSON.parse(localStorage.getItem('uet-ai-practice-v1')); return Object.keys(s.optionOrders).length === 300 && QUESTION_BANK.filter(q => q.id <= 140).every(q => s.optionOrders[q.id].join('') === 'DCBA'); })()");
  await evaluate("localStorage.removeItem('uet-ai-practice-v1')");
  await command('Page.reload');
  await waitForApp();
  await check('Correct positions are balanced independently in all three levels', "(() => { const saved = JSON.parse(localStorage.getItem('uet-ai-practice-v1')); return ['easy','medium','hard'].every(level => { const bank = QUESTION_BANK.filter(q => q.difficulty === level); const counts = [0,0,0,0]; for (const q of bank) counts[saved.optionOrders[q.id].indexOf(q.answer)]++; return counts.every(n => n === bank.length/4); }); })()");
  const initialOptionOrders = await evaluate("JSON.stringify(JSON.parse(localStorage.getItem('uet-ai-practice-v1')).optionOrders)");
  await check('140 questions, four choices, explanation hidden before selection', "document.querySelectorAll('.grid-question').length === 140 && document.querySelectorAll('.option').length === 4 && document.getElementById('feedback').hidden");
  await evaluate("document.querySelector('[data-source-letter=B]').click()");
  await check('Wrong answer red, correct answer green, explanation and score shown', "document.querySelector('.option.wrong').dataset.sourceLetter === 'B' && document.querySelector('.option.correct').dataset.sourceLetter === 'A' && !document.getElementById('feedback').hidden && document.getElementById('feedback').textContent.includes('Cú pháp comprehension') && document.getElementById('wrong-stat').textContent === '1' && [...document.querySelectorAll('.option')].every(b => b.disabled)");
  await check('Three alternatives explained and the selected mistake is highlighted', "document.querySelectorAll('.alternative-item').length === 3 && document.querySelector('.alternative-item.your-choice').dataset.sourceLetter === 'B' && document.querySelector('.alternative-item.your-choice').dataset.explanationLetter === document.querySelector('.option.wrong').dataset.letter && document.querySelector('.your-choice-tag').textContent === 'Bạn đã chọn' && document.querySelector('.takeaway').textContent.includes('comprehension')");
  await evaluate("document.getElementById('bookmark-button').click()");
  await command('Page.reload');
  await waitForApp();
  await check('Answer and bookmark survive reload from local file', "document.querySelector('.option.wrong').dataset.sourceLetter === 'B' && document.getElementById('bookmark-button').getAttribute('aria-pressed') === 'true'");
  assert.equal(await evaluate("JSON.stringify(JSON.parse(localStorage.getItem('uet-ai-practice-v1')).optionOrders)"), initialOptionOrders, 'Option positions survive reload');
  passed++;
  await evaluate("document.querySelector('[data-filter=wrong]').click()");
  await check('Wrong-answer filter finds the failed question', "document.querySelectorAll('.grid-question').length === 1 && document.getElementById('question-index').textContent === 'CÂU 01'");
  await evaluate("document.getElementById('retry-button').click(); document.querySelector('[data-source-letter=A]').click()");
  await check('Retry correct answer updates result without hiding explanation', "document.querySelector('.option.correct').dataset.sourceLetter === 'A' && !document.querySelector('.option.wrong') && !document.getElementById('feedback').hidden && document.getElementById('wrong-stat').textContent === '0' && document.getElementById('correct-stat').textContent === '1'");
  assert.equal(await evaluate("JSON.stringify(JSON.parse(localStorage.getItem('uet-ai-practice-v1')).optionOrders)"), initialOptionOrders, 'Retry does not move the choices');
  passed++;
  await evaluate("document.querySelector('[data-filter=wrong]').click()");
  await check('Empty filter state shown correctly', "!document.getElementById('empty-state').hidden && document.getElementById('question-card').hidden");
  await evaluate("document.getElementById('show-all-button').click(); document.querySelectorAll('.category-button')[2].click()");
  await check('Deep-learning category has 42 questions', "document.querySelectorAll('.grid-question').length === 42 && document.getElementById('question-index').textContent === 'CÂU 59'");
  await evaluate("document.querySelectorAll('.category-button')[0].click(); const input = document.getElementById('question-search'); input.value='mutable'; input.dispatchEvent(new Event('input'))");
  await check('Text search renders Python code without losing indentation', "document.querySelectorAll('.grid-question').length === 1 && document.querySelector('#question-prompt pre code').textContent.includes('b.append(3)')");
  await evaluate("document.getElementById('question-search').value=''; document.getElementById('question-search').dispatchEvent(new Event('input')); document.querySelector('[data-filter=unanswered]').click(); document.querySelector('.option').click()");
  await check('Unanswered filter keeps current explanation visible after answering', "!document.getElementById('feedback').hidden && document.getElementById('question-index').textContent === 'CÂU 02'");
  await evaluate("document.querySelector('[data-filter=all]').click(); document.getElementById('reset-button').click(); document.querySelector('#reset-dialog button[value=cancel]').click()");
  await delay(100);
  await check('Cancel reset preserves progress', "document.getElementById('answered-stat').textContent === '2/140'");
  await evaluate("document.getElementById('reset-button').click(); document.querySelector('#reset-dialog button[value=reset]').click()");
  await delay(100);
  await check('Confirmed reset clears answers and bookmarks', "document.getElementById('answered-stat').textContent === '0/140' && document.getElementById('bookmark-button').getAttribute('aria-pressed') === 'false'");
  assert.notEqual(await evaluate("JSON.stringify(JSON.parse(localStorage.getItem('uet-ai-practice-v1')).optionOrders)"), initialOptionOrders, 'New round reshuffles the choices');
  passed++;
  await evaluate("(() => { const letter = document.querySelector('[data-source-letter=A]').dataset.letter; document.dispatchEvent(new KeyboardEvent('keydown', {key:String('ABCD'.indexOf(letter)+1), bubbles:true})); document.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowRight', bubbles:true})); })()");
  await check('Keyboard answers and navigates', "document.getElementById('correct-stat').textContent === '1' && document.getElementById('question-index').textContent === 'CÂU 02'");
  await evaluate("document.querySelector('[data-difficulty=medium]').click()");
  await check('Medium level has its own questions, stats and badge', "document.querySelectorAll('.grid-question').length === 80 && document.getElementById('question-index').textContent === 'CÂU 141' && document.getElementById('answered-stat').textContent === '0/80' && document.getElementById('difficulty-badge').textContent === 'Trung bình' && document.getElementById('bank-total').textContent === '300'");
  await evaluate("document.querySelectorAll('.category-button')[2].click()");
  await check('Difficulty intersects topic and category counts', "document.querySelectorAll('.grid-question').length === 20 && document.getElementById('answered-stat').textContent === '0/20' && document.querySelectorAll('.category-button .count')[2].textContent === '20'");
  await evaluate("document.querySelector('[data-difficulty=hard]').click(); document.querySelectorAll('.category-button')[0].click(); document.querySelector('.grid-question').click(); document.querySelector('.option').click(); document.getElementById('bookmark-button').click()");
  await command('Page.reload');
  await waitForApp();
  await check('Hard level and its independent progress survive reload', "document.querySelector('[data-difficulty=hard]').getAttribute('aria-pressed') === 'true' && document.getElementById('answered-stat').textContent === '1/80' && document.getElementById('bookmark-button').getAttribute('aria-pressed') === 'true'");
  await evaluate("document.getElementById('question-card').scrollTop = 0");
  const hardScreenshot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(join(tmpdir(), 'uet-ai-hard.png'), Buffer.from(hardScreenshot.data, 'base64'));
  await evaluate("document.querySelector('[data-filter=bookmarked]').click()");
  await check('Bookmarks are scoped to selected level', "document.querySelectorAll('.grid-question').length === 1 && document.getElementById('question-index').textContent === 'CÂU 221'");
  await evaluate("document.querySelector('[data-difficulty=medium]').click()");
  await check('Empty bookmark state cannot leak another difficulty question', "document.getElementById('question-card').hidden && !document.getElementById('empty-state').hidden && document.getElementById('answered-stat').textContent === '0/80'");
  await evaluate("document.querySelector('[data-filter=all]').click(); document.querySelector('[data-difficulty=easy]').click()");
  await check('Returning to easy retains previous answer', "document.getElementById('correct-stat').textContent === '1' && document.getElementById('answered-stat').textContent === '1/140'");
  // Exercise the real explanations for every question in both answer states.
  await evaluate(`(() => {
    const plain = text => text.split(String.fromCharCode(96)).join('').split('**').join('').replace(/\\s+/g, ' ').trim();
    let level = 'easy';
    for (const q of window.QUESTION_BANK) {
      if (q.difficulty !== level) { document.querySelector('[data-difficulty="' + q.difficulty + '"]').click(); level = q.difficulty; }
      [...document.querySelectorAll('.grid-question')].find(b => Number(b.textContent) === q.id).click();
      const retry = document.getElementById('retry-button');
      if (!retry.hidden) retry.click();
      if (!document.getElementById('feedback').hidden || document.querySelector('.alternative-item')) throw new Error('Premature explanation: ' + q.id);
      const choices = [...document.querySelectorAll('.option')];
      if (choices.map(o => o.dataset.letter).join('') !== 'ABCD' || new Set(choices.map(o => o.dataset.sourceLetter)).size !== 4) throw new Error('Invalid permutation: ' + q.id);
      for (const choice of choices) {
        const original = q.options.find(o => o.letter === choice.dataset.sourceLetter);
        if (plain(choice.querySelector('.option-content').textContent) !== plain(original.text)) throw new Error('Option content changed: ' + q.id);
      }
      const wrong = q.options.find(o => o.letter !== q.answer).letter;
      document.querySelector('[data-source-letter="' + wrong + '"]').click();
      const items = [...document.querySelectorAll('.alternative-item')];
      if (items.length !== 3 || document.querySelector('.your-choice').dataset.sourceLetter !== wrong) throw new Error('Alternative count/selection: ' + q.id);
      for (const item of items) {
        const letter = item.dataset.sourceLetter;
        const expected = q.incorrectExplanations[letter];
        if (!expected || letter === q.answer || plain(item.querySelector('.alternative-reason').textContent) !== plain(expected)) throw new Error('Alternative content: ' + q.id + letter);
        const choice = document.querySelector('[data-source-letter="' + letter + '"]');
        if (item.dataset.explanationLetter !== choice.dataset.letter || plain(item.querySelector('.alternative-option').textContent) !== plain(q.options.find(o => o.letter === letter).text)) throw new Error('Explanation relabeling: ' + q.id + letter);
      }
      const displayedCorrect = document.querySelector('.option.correct').dataset.letter;
      if (document.querySelector('.correct-explanation h4').textContent !== 'Vì sao ' + displayedCorrect + ' đúng?') throw new Error('Correct answer label: ' + q.id);
      if (plain(document.querySelector('.correct-explanation .markdown').textContent) !== plain(q.explanation) || plain(document.querySelector('.takeaway .markdown').textContent) !== plain(q.takeaway)) throw new Error('Correct explanation/takeaway: ' + q.id);
      retry.click();
      document.querySelector('[data-source-letter="' + q.answer + '"]').click();
      if (document.querySelectorAll('.option').length !== 4 || document.getElementById('feedback').hidden || !document.querySelector('.option.correct')) throw new Error('Question ' + q.id);
      if (document.querySelector('.your-choice') || document.querySelectorAll('.alternative-item').length !== 3) throw new Error('Correct answer explanation: ' + q.id);
    }
  })()`);
  await check('All 300 explanations, 900 distractor explanations and 300 takeaways render in both states', "document.getElementById('correct-stat').textContent === '80' && document.getElementById('accuracy-stat').textContent === '100%' && document.getElementById('next-button').disabled && document.getElementById('answered-stat').textContent === '80/80' && document.getElementById('progress-track').getAttribute('aria-valuenow') === '80' && Object.keys(JSON.parse(localStorage.getItem('uet-ai-practice-v1')).answers).length === 300");
  const beforeShuffleAnswers = await evaluate("JSON.stringify(JSON.parse(localStorage.getItem('uet-ai-practice-v1')).answers)");
  const beforeShuffleOptions = await evaluate("JSON.stringify(JSON.parse(localStorage.getItem('uet-ai-practice-v1')).optionOrders)");
  await evaluate("document.getElementById('shuffle-button').click()");
  assert.equal(await evaluate("JSON.stringify(JSON.parse(localStorage.getItem('uet-ai-practice-v1')).answers)"), beforeShuffleAnswers, 'Shuffling preserves selected contents');
  assert.notEqual(await evaluate("JSON.stringify(JSON.parse(localStorage.getItem('uet-ai-practice-v1')).optionOrders)"), beforeShuffleOptions, 'Shuffle button also moves answer choices');
  await check('Shuffle preserves scores and balances the new answer positions', "(() => { const saved = JSON.parse(localStorage.getItem('uet-ai-practice-v1')); const counts = [0,0,0,0]; for (const q of QUESTION_BANK) counts[saved.optionOrders[q.id].indexOf(q.answer)]++; return counts.every(n => n === 75) && document.getElementById('correct-stat').textContent === '80' && document.getElementById('wrong-stat').textContent === '0'; })()");
  // Restore question order for the existing sequential navigation checks.
  await evaluate("document.querySelector('[data-difficulty=easy]').click(); document.getElementById('reset-button').click(); document.querySelector('#reset-dialog button[value=reset]').click(); document.querySelector('[data-source-letter=B]').click()");
  await check('Reset clears progress across every difficulty', "Object.keys(JSON.parse(localStorage.getItem('uet-ai-practice-v1')).answers).length === 1 && JSON.parse(localStorage.getItem('uet-ai-practice-v1')).bookmarks.length === 0");
  for (const [width, height] of [[1440, 1040], [1366, 768], [1280, 720], [1024, 768], [768, 1024], [375, 900], [375, 667], [320, 568], [844, 390]]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 760 });
    await check(`Entire workspace fits ${width}x${height}`, 'document.documentElement.scrollWidth <= window.innerWidth && document.documentElement.scrollHeight <= window.innerHeight + 1 && window.scrollY === 0');
    await check(`Question and navigation remain visible at ${width}x${height}`, "['question-card', 'navigation'].every(id => { const r = document.getElementById(id).getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight && r.height > 30; })");
    await check(`All difficulty controls remain visible at ${width}x${height}`, "[...document.querySelectorAll('[data-difficulty]')].every(el => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth; })");
    await check(`All explanation cards fit the screen at ${width}px`, "[...document.querySelectorAll('.alternative-item,.correct-explanation,.takeaway')].every(el => { const rect = el.getBoundingClientRect(); return rect.left >= 0 && rect.right <= window.innerWidth && el.scrollWidth <= el.clientWidth + 1; })");
    await evaluate("document.getElementById('question-card').scrollTop = document.getElementById('question-card').scrollHeight");
    await check(`Long explanation scrolls inside the frame at ${width}x${height}`, "document.getElementById('question-card').scrollTop > 0 && window.scrollY === 0 && document.documentElement.scrollHeight <= innerHeight + 1 && document.getElementById('navigation').getBoundingClientRect().bottom <= innerHeight");
    if ((width === 1440 && height === 1040) || (width === 1280 && height === 720) || (width === 375 && height === 667)) {
      await evaluate("(() => { const card = document.getElementById('question-card'); card.scrollTop += document.getElementById('feedback').getBoundingClientRect().top - card.getBoundingClientRect().top - 16; })()");
      const screenshot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      const output = join(tmpdir(), `uet-ai-${width}.png`);
      await writeFile(output, Buffer.from(screenshot.data, 'base64'));
      console.log('SCREENSHOT ' + output);
    }
  }
  await evaluate("document.getElementById('question-card').scrollTop = document.getElementById('question-card').scrollHeight; document.getElementById('next-button').click()");
  await check('Navigating after a long explanation brings the next question into view', "document.getElementById('question-index').textContent === 'CÂU 02' && document.getElementById('question-title').getBoundingClientRect().top >= 0 && document.getElementById('question-title').getBoundingClientRect().bottom <= window.innerHeight");
  await command('Emulation.setDeviceMetricsOverride', { width: 375, height: 667, deviceScaleFactor: 1, mobile: true });
  await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  await check('Mobile question directory starts collapsed', "document.getElementById('directory-body').hidden && document.getElementById('directory-toggle').getAttribute('aria-expanded') === 'false'");
  await evaluate("document.getElementById('directory-toggle').click(); document.getElementById('question-search').value = '140'; document.getElementById('question-search').dispatchEvent(new Event('input'))");
  await check('Mobile directory opens with working search and no page scrolling', "!document.getElementById('directory-body').hidden && document.querySelectorAll('.grid-question').length === 1 && document.querySelector('.grid-question').getBoundingClientRect().top >= 0 && document.documentElement.scrollHeight <= innerHeight + 1");
  await evaluate("document.querySelector('.grid-question').click()");
  await check('Selecting a mobile directory question closes it and resets reading position', "document.getElementById('directory-body').hidden && document.getElementById('question-index').textContent === 'CÂU 140' && document.getElementById('question-card').scrollTop === 0 && document.getElementById('question-title').getBoundingClientRect().top >= 0");
  await evaluate("document.getElementById('directory-toggle').click(); document.getElementById('reset-button').click()");
  await check('Reset remains accessible from the mobile directory', "document.getElementById('reset-dialog').open");
  await evaluate("document.querySelector('#reset-dialog button[value=cancel]').click(); document.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true}))");
  await check('Mobile directory closes with Escape', "document.getElementById('directory-body').hidden");
  await evaluate("document.querySelector('[data-difficulty=medium]').click(); document.querySelector('.grid-question').click()");
  await check('Switching difficulty clears stale search and shows the new first question on mobile', "document.getElementById('question-search').value === '' && document.getElementById('question-index').textContent === 'CÂU 141' && document.getElementById('answered-stat').textContent === '0/80' && document.getElementById('question-card').scrollTop === 0");
  const mediumScreenshot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(join(tmpdir(), 'uet-ai-medium-mobile.png'), Buffer.from(mediumScreenshot.data, 'base64'));
  assert.deepEqual(errors, [], 'Browser runtime errors');
  console.log(`${passed} browser checks passed; no runtime exceptions.`);
} finally {
  try { if (command) await command('Browser.close'); } catch {}
  socket?.close();
  browser.kill();
  // Only remove the temporary profile explicitly created above.
  if (resolve(profile).startsWith(resolve(tmpdir()) + '\\') || resolve(profile).startsWith(resolve(tmpdir()) + '/')) {
    await delay(300);
    await rm(profile, { recursive: true, force: true, maxRetries: 3 }).catch(() => {});
  }
}
