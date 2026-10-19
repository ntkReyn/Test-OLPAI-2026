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
  await check('140 questions, four choices, explanation hidden before selection', "document.querySelectorAll('.grid-question').length === 140 && document.querySelectorAll('.option').length === 4 && document.getElementById('feedback').hidden");
  await evaluate("document.querySelector('[data-letter=B]').click()");
  await check('Wrong answer red, correct answer green, explanation and score shown', "document.querySelector('.option.wrong').dataset.letter === 'B' && document.querySelector('.option.correct').dataset.letter === 'A' && !document.getElementById('feedback').hidden && document.getElementById('feedback').textContent.includes('Cú pháp comprehension') && document.getElementById('wrong-stat').textContent === '1' && [...document.querySelectorAll('.option')].every(b => b.disabled)");
  await check('Three alternatives explained and the selected mistake is highlighted', "document.querySelectorAll('.alternative-item').length === 3 && document.querySelector('.alternative-item.your-choice').dataset.explanationLetter === 'B' && document.querySelector('.your-choice-tag').textContent === 'Bạn đã chọn' && document.querySelector('.takeaway').textContent.includes('comprehension')");
  await evaluate("document.getElementById('bookmark-button').click()");
  await command('Page.reload');
  await waitForApp();
  await check('Answer and bookmark survive reload from local file', "document.querySelector('.option.wrong').dataset.letter === 'B' && document.getElementById('bookmark-button').getAttribute('aria-pressed') === 'true'");
  await evaluate("document.querySelector('[data-filter=wrong]').click()");
  await check('Wrong-answer filter finds the failed question', "document.querySelectorAll('.grid-question').length === 1 && document.getElementById('question-index').textContent === 'CÂU 01'");
  await evaluate("document.getElementById('retry-button').click(); document.querySelector('[data-letter=A]').click()");
  await check('Retry correct answer updates result without hiding explanation', "document.querySelector('.option.correct').dataset.letter === 'A' && !document.querySelector('.option.wrong') && !document.getElementById('feedback').hidden && document.getElementById('wrong-stat').textContent === '0' && document.getElementById('correct-stat').textContent === '1'");
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
  await evaluate("document.dispatchEvent(new KeyboardEvent('keydown', {key:'1', bubbles:true})); document.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowRight', bubbles:true}))");
  await check('Keyboard answers and navigates', "document.getElementById('correct-stat').textContent === '1' && document.getElementById('question-index').textContent === 'CÂU 02'");
  // Exercise the real explanations for every question in both answer states.
  await evaluate(`(() => {
    const plain = text => text.split(String.fromCharCode(96)).join('').split('**').join('').replace(/\\s+/g, ' ').trim();
    for (const q of window.QUESTION_BANK) {
      [...document.querySelectorAll('.grid-question')].find(b => Number(b.textContent) === q.id).click();
      const retry = document.getElementById('retry-button');
      if (!retry.hidden) retry.click();
      if (!document.getElementById('feedback').hidden || document.querySelector('.alternative-item')) throw new Error('Premature explanation: ' + q.id);
      const wrong = q.options.find(o => o.letter !== q.answer).letter;
      document.querySelector('[data-letter="' + wrong + '"]').click();
      const items = [...document.querySelectorAll('.alternative-item')];
      if (items.length !== 3 || document.querySelector('.your-choice').dataset.explanationLetter !== wrong) throw new Error('Alternative count/selection: ' + q.id);
      for (const item of items) {
        const letter = item.dataset.explanationLetter;
        const expected = q.incorrectExplanations[letter];
        if (!expected || letter === q.answer || plain(item.querySelector('.alternative-reason').textContent) !== plain(expected)) throw new Error('Alternative content: ' + q.id + letter);
      }
      if (plain(document.querySelector('.correct-explanation .markdown').textContent) !== plain(q.explanation) || plain(document.querySelector('.takeaway .markdown').textContent) !== plain(q.takeaway)) throw new Error('Correct explanation/takeaway: ' + q.id);
      retry.click();
      document.querySelector('[data-letter="' + q.answer + '"]').click();
      if (document.querySelectorAll('.option').length !== 4 || document.getElementById('feedback').hidden || !document.querySelector('.option.correct')) throw new Error('Question ' + q.id);
      if (document.querySelector('.your-choice') || document.querySelectorAll('.alternative-item').length !== 3) throw new Error('Correct answer explanation: ' + q.id);
    }
  })()`);
  await check('All 140 correct explanations, 420 alternatives and 140 takeaways render in both states', "document.getElementById('correct-stat').textContent === '140' && document.getElementById('accuracy-stat').textContent === '100%' && document.getElementById('next-button').disabled && document.getElementById('session-summary').textContent.includes('140 câu')");
  await evaluate("document.querySelectorAll('.grid-question')[0].click(); document.getElementById('retry-button').click(); document.querySelector('[data-letter=B]').click()");
  for (const width of [1440, 1280, 768, 375]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: width === 375 ? 900 : 1040, deviceScaleFactor: 1, mobile: width < 760 });
    await check(`No page overflow at ${width}px`, 'document.documentElement.scrollWidth <= window.innerWidth');
    await check(`All explanation cards fit the screen at ${width}px`, "[...document.querySelectorAll('.alternative-item,.correct-explanation,.takeaway')].every(el => { const rect = el.getBoundingClientRect(); return rect.left >= 0 && rect.right <= window.innerWidth && el.scrollWidth <= el.clientWidth + 1; })");
    if (width === 1440 || width === 375) {
      await evaluate("document.getElementById('feedback').scrollIntoView({block:'start'})");
      const screenshot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      const output = join(tmpdir(), `uet-ai-${width}.png`);
      await writeFile(output, Buffer.from(screenshot.data, 'base64'));
      console.log('SCREENSHOT ' + output);
    }
  }
  await evaluate("document.getElementById('feedback').scrollIntoView(); document.getElementById('next-button').click()");
  await check('Navigating after a long explanation brings the next question into view', "document.getElementById('question-index').textContent === 'CÂU 02' && document.getElementById('question-title').getBoundingClientRect().top >= 0 && document.getElementById('question-title').getBoundingClientRect().bottom <= window.innerHeight");
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
