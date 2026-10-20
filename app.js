(() => {
  'use strict';
  const questions = window.QUESTION_BANK;
  const byId = new Map(questions.map(q => [q.id, q]));
  const STORAGE_KEY = 'uet-ai-practice-v1';
  const $ = id => document.getElementById(id);
  const categories = [...new Map(questions.map(q => [q.category, { id: q.category, name: q.categoryName }])).values()];
  const difficulties = [
    { id: 'easy', name: 'Dễ', description: 'Nắm nền tảng · 140 câu ôn tập ban đầu.' },
    { id: 'medium', name: 'Trung bình', description: 'Vận dụng kiến thức, đọc mã và tính nhanh.' },
    { id: 'hard', name: 'Khó', description: 'Kết hợp kiến thức, chẩn đoán và cân nhắc giải pháp.' },
  ];
  let storageAvailable = true;
  let answers = {};
  let optionOrders = {};
  let bookmarks = new Set();
  let currentId = questions[0].id;
  let category = 'all';
  let difficulty = 'easy';
  let filter = 'all';
  let search = '';
  let order = questions.map(q => q.id);
  // Freeze the visible list between explicit filter changes so choosing an answer
  // in "Chưa làm" or "Câu sai" never removes its explanation from the screen.
  let visibleIds = [];
  const mobileLayout = window.matchMedia('(max-width: 760px)');
  let directoryOpen = false;

  function shuffled(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function newOptionOrders() {
    // Balance correct positions, then independently shuffle the distractors.
    return Object.fromEntries(difficulties.flatMap(level => {
      const bank = questions.filter(q => q.difficulty === level.id);
      const positions = shuffled(bank.map((_, i) => i % 4));
      return bank.map((q, i) => {
        const sequence = shuffled(q.options.filter(o => o.letter !== q.answer).map(o => o.letter));
        sequence.splice(positions[i], 0, q.answer);
        return [q.id, sequence];
      });
    }));
  }

  function validOptionOrders(orders) {
    return orders && typeof orders === 'object' && questions.every(q => validOptionOrder(orders[q.id]));
  }

  function validOptionOrder(sequence) {
    return Array.isArray(sequence) && sequence.length === 4 && new Set(sequence).size === 4 && sequence.every(letter => /^[A-D]$/.test(letter));
  }

  function displayedQuestion(source) {
    const sequence = optionOrders[source.id];
    const labels = Object.fromEntries(sequence.map((letter, i) => [letter, 'ABCD'[i]]));
    return {
      ...source,
      answer: labels[source.answer],
      options: sequence.map(sourceLetter => ({
        ...source.options.find(o => o.letter === sourceLetter),
        sourceLetter,
        letter: labels[sourceLetter],
      })),
      incorrectExplanations: Object.fromEntries(Object.entries(source.incorrectExplanations).map(([letter, text]) => [labels[letter], text])),
    };
  }

  function updateDirectory() {
    const expanded = !mobileLayout.matches || directoryOpen;
    $('directory-body').hidden = !expanded;
    $('directory-toggle').setAttribute('aria-expanded', String(expanded));
    $('directory-toggle').setAttribute('aria-label', expanded ? 'Đóng bản đồ câu hỏi' : 'Mở bản đồ câu hỏi');
    $('directory-toggle').textContent = expanded ? '⌄' : '⌃';
  }

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && typeof saved === 'object') {
      for (const [id, letter] of Object.entries(saved.answers || {})) {
        if (byId.has(Number(id)) && /^[A-D]$/.test(letter)) answers[id] = letter;
      }
      bookmarks = new Set((Array.isArray(saved.bookmarks) ? saved.bookmarks : []).filter(id => byId.has(id)));
      if (byId.has(saved.currentId)) currentId = saved.currentId;
      if (categories.some(c => c.id === saved.category)) category = saved.category;
      if (difficulties.some(d => d.id === saved.difficulty)) difficulty = saved.difficulty;
      // Keep existing permutations when extending the bank; fill only new IDs.
      const generated = newOptionOrders();
      optionOrders = Object.fromEntries(questions.map(q => [q.id,
        validOptionOrder(saved.optionOrders?.[q.id]) ? saved.optionOrders[q.id] : generated[q.id]]));
    }
  } catch { storageAvailable = false; }
  if (!validOptionOrders(optionOrders)) optionOrders = newOptionOrders();

  function save() {
    // Answers retain their source option IDs so old progress survives relabeling.
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, optionOrders, bookmarks: [...bookmarks], currentId, category, difficulty })); }
    catch { storageAvailable = false; }
    $('storage-note').hidden = storageAvailable;
    $('storage-note').textContent = storageAvailable
      ? ''
      : 'Trình duyệt không lưu được tiến độ. Bạn vẫn có thể luyện tập trong phiên này.';
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  function inlineMarkdown(text) {
    return text.split(/(`[^`\n]+`)/g).map(part => {
      if (part.startsWith('`') && part.endsWith('`')) return '<code>' + escapeHtml(part.slice(1, -1)) + '</code>';
      return escapeHtml(part).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    }).join('');
  }

  function markdown(text) {
    return text.split(/(```[^\n]*\n[\s\S]*?```)/g).map(part => {
      if (part.startsWith('```')) {
        return '<pre><code>' + escapeHtml(part.replace(/^```[^\n]*\n/, '').replace(/```$/, '').replace(/\n$/, '')) + '</code></pre>';
      }
      return part.trim().split(/\n\s*\n/).filter(Boolean).map(p => '<p>' + inlineMarkdown(p).replace(/\n/g, '<br>') + '</p>').join('');
    }).join('');
  }

  function matches(q) {
    if (q.difficulty !== difficulty) return false;
    if (category !== 'all' && q.category !== category) return false;
    if (filter === 'unanswered' && answers[q.id]) return false;
    if (filter === 'wrong' && (!answers[q.id] || answers[q.id] === q.answer)) return false;
    if (filter === 'bookmarked' && !bookmarks.has(q.id)) return false;
    const term = normalize(search.trim());
    return !term || normalize(`${q.id} ${q.title} ${q.prompt} ${q.categoryName}`).includes(term);
  }

  function normalize(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  }

  function refreshList() {
    visibleIds = order.filter(id => matches(byId.get(id)));
    if (!visibleIds.includes(currentId)) currentId = visibleIds[0] || null;
    render();
    $('question-card').scrollTop = 0;
    $('question-grid').scrollTop = 0;
  }

  function renderCategories() {
    $('bank-total').textContent = questions.length;
    $('categories').replaceChildren();
    for (const c of [{ id: 'all', name: 'Tất cả câu hỏi' }, ...categories]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'category-button' + (c.id === category ? ' active' : '');
      button.setAttribute('aria-pressed', String(c.id === category));
      button.innerHTML = `<span class="category-icon" aria-hidden="true">${c.id === 'all' ? '▦' : c.id}</span><span class="category-name">${escapeHtml(c.name)}</span><span class="count">${questions.filter(q => q.difficulty === difficulty && (c.id === 'all' || q.category === c.id)).length}</span>`;
      button.addEventListener('click', () => { category = c.id; refreshList(); });
      $('categories').append(button);
    }
  }

  function renderDifficulties() {
    $('difficulties').replaceChildren();
    for (const level of difficulties) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'difficulty-button' + (difficulty === level.id ? ' active' : '');
      button.dataset.difficulty = level.id;
      button.setAttribute('aria-pressed', String(difficulty === level.id));
      button.innerHTML = `<span>${level.name}</span><span class="count">${questions.filter(q => q.difficulty === level.id).length}</span>`;
      button.addEventListener('click', () => {
        difficulty = level.id;
        search = ''; $('question-search').value = '';
        refreshList();
      });
      $('difficulties').append(button);
    }
    $('difficulty-description').textContent = difficulties.find(d => d.id === difficulty).description;
  }

  function renderStats() {
    const scope = questions.filter(q => q.difficulty === difficulty && (category === 'all' || q.category === category));
    const answered = scope.filter(q => answers[q.id]);
    const correct = answered.filter(q => answers[q.id] === q.answer).length;
    $('answered-stat').innerHTML = `${answered.length}<span>/${scope.length}</span>`;
    $('correct-stat').textContent = correct;
    $('wrong-stat').textContent = answered.length - correct;
    $('accuracy-stat').textContent = answered.length ? Math.round(correct / answered.length * 100) + '%' : '—';
    $('progress-fill').style.width = (scope.length ? answered.length / scope.length * 100 : 0) + '%';
    $('progress-track').setAttribute('aria-valuenow', answered.length);
    $('progress-track').setAttribute('aria-valuemax', scope.length);
  }

  function renderGrid() {
    const grid = $('question-grid');
    const scrollPosition = grid.scrollTop;
    grid.replaceChildren();
    $('visible-count').textContent = visibleIds.length + ' câu';
    for (const id of visibleIds) {
      const q = byId.get(id);
      const status = answers[id] ? answers[id] === q.answer ? 'correct' : 'wrong' : '';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'grid-question ' + status + (id === currentId ? ' current' : '') + (bookmarks.has(id) ? ' saved' : '');
      button.textContent = id;
      button.title = `Câu ${id}: ${q.title}`;
      button.setAttribute('aria-label', `Câu ${id}, ${status === 'correct' ? 'đúng' : status === 'wrong' ? 'sai' : 'chưa làm'}${bookmarks.has(id) ? ', đã lưu' : ''}`);
      if (id === currentId) button.setAttribute('aria-current', 'true');
      button.addEventListener('click', () => navigate(id));
      grid.append(button);
    }
    grid.scrollTop = scrollPosition;
  }

  function renderQuestion() {
    const source = byId.get(currentId);
    const empty = !source || !visibleIds.length;
    $('question-card').hidden = empty;
    $('navigation').hidden = empty;
    $('empty-state').hidden = !empty;
    if (empty) {
      const messages = {
        all: ['Chưa tìm thấy câu hỏi', 'Thử từ khóa khác hoặc chọn một chủ đề khác.'],
        unanswered: ['Không còn câu chưa làm', 'Bạn đã trả lời hết các câu phù hợp với bộ lọc này.'],
        wrong: ['Chưa có câu trả lời sai', 'Các câu bạn trả lời sai sẽ xuất hiện ở đây để ôn lại.'],
        bookmarked: ['Chưa có câu đã lưu', 'Nhấn ngôi sao ở góc câu hỏi để lưu lại và ôn sau.'],
      };
      const [title, message] = messages[search ? 'all' : filter];
      $('empty-title').textContent = title;
      $('empty-message').textContent = message;
      return;
    }
    const q = displayedQuestion(source);
    const selected = q.options.find(option => option.sourceLetter === answers[q.id])?.letter;
    $('question-index').textContent = 'CÂU ' + String(q.id).padStart(2, '0');
    $('topic-label').textContent = 'Chủ đề ' + q.category;
    $('difficulty-badge').textContent = difficulties.find(d => d.id === q.difficulty).name;
    $('difficulty-badge').dataset.level = q.difficulty;
    $('question-title').textContent = q.title;
    $('question-prompt').innerHTML = markdown(q.prompt);
    $('answer-instruction').textContent = selected ? 'Đã ghi nhận đáp án của bạn.' : 'Chọn một đáp án đúng nhất.';
    $('bookmark-button').textContent = bookmarks.has(q.id) ? '★' : '☆';
    $('bookmark-button').setAttribute('aria-pressed', String(bookmarks.has(q.id)));
    $('bookmark-button').setAttribute('aria-label', bookmarks.has(q.id) ? 'Bỏ lưu câu hỏi' : 'Lưu câu hỏi');
    const options = $('options');
    options.replaceChildren();
    for (const option of q.options) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'option';
      button.dataset.letter = option.letter;
      button.dataset.sourceLetter = option.sourceLetter;
      button.disabled = Boolean(selected);
      let indicator = '';
      let status = '';
      if (selected) {
        if (option.letter === q.answer) { button.classList.add('correct'); indicator = '✓'; status = 'Đáp án đúng'; }
        else if (option.letter === selected) { button.classList.add('wrong'); indicator = '×'; status = 'Bạn đã chọn sai'; }
        else button.classList.add('dimmed');
        if (selected === option.letter && option.letter === q.answer) status = 'Bạn đã chọn đúng';
      }
      button.innerHTML = `<span class="option-letter">${option.letter}</span><span class="option-content markdown">${markdown(option.text)}</span><span class="option-indicator" aria-hidden="true">${indicator}</span>`;
      if (status) button.setAttribute('aria-label', `${option.letter}. ${option.text}. ${status}`);
      button.addEventListener('click', () => answer(option.letter));
      options.append(button);
    }
    const feedback = $('feedback');
    feedback.hidden = !selected;
    feedback.className = 'feedback' + (selected && selected !== q.answer ? ' wrong' : '');
    if (selected) {
      const isCorrect = selected === q.answer;
      const alternatives = q.options.filter(option => option.letter !== q.answer && q.incorrectExplanations?.[option.letter]);
      feedback.innerHTML = `<div class="feedback-title"><span aria-hidden="true">${isCorrect ? '✓' : '×'}</span>${isCorrect ? 'Chính xác! Bạn đã chọn đáp án ' + q.answer + '.' : 'Chưa chính xác. Bạn chọn ' + selected + ', đáp án đúng là ' + q.answer + '.'}</div>
        <section class="correct-explanation" aria-label="Giải thích đáp án đúng"><h4>Vì sao ${q.answer} đúng?</h4><div class="markdown">${markdown(q.explanation)}</div></section>
        ${alternatives.length ? `<section class="alternative-explanations" aria-label="Giải thích các phương án sai"><h4>Vì sao các phương án còn lại sai?</h4><ul class="alternative-list">${alternatives.map(option => `<li class="alternative-item${selected === option.letter ? ' your-choice' : ''}" data-explanation-letter="${option.letter}" data-source-letter="${option.sourceLetter}"><div class="alternative-heading"><span class="alternative-letter">${option.letter}</span><span class="markdown alternative-option">${inlineMarkdown(option.text)}</span>${selected === option.letter ? '<span class="your-choice-tag">Bạn đã chọn</span>' : ''}</div><div class="markdown alternative-reason">${markdown(q.incorrectExplanations[option.letter])}</div></li>`).join('')}</ul></section>` : ''}
        ${q.takeaway ? `<section class="takeaway" aria-label="Kiến thức cần ghi nhớ"><h4>Ghi nhớ</h4><div class="markdown">${markdown(q.takeaway)}</div></section>` : ''}`;
    } else feedback.replaceChildren();
    $('retry-button').hidden = !selected;
    $('card-bottom').hidden = !selected;
    const position = visibleIds.indexOf(q.id);
    $('position-label').textContent = `${position + 1} / ${visibleIds.length} câu`;
    $('previous-button').disabled = position <= 0;
    $('next-button').disabled = position >= visibleIds.length - 1;
  }

  function render() {
    renderCategories();
    renderDifficulties();
    renderStats();
    renderGrid();
    renderQuestion();
    document.querySelectorAll('[data-filter]').forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    save();
  }

  function answer(letter) {
    if (!currentId || answers[currentId] || !/^[A-D]$/.test(letter)) return;
    answers[currentId] = optionOrders[currentId]['ABCD'.indexOf(letter)];
    // Update only results; keep the live status node in the DOM for screen readers.
    renderStats();
    renderGrid();
    renderQuestion();
    save();
    const card = $('question-card');
    const feedbackTop = $('feedback').getBoundingClientRect().top - card.getBoundingClientRect().top + card.scrollTop;
    card.scrollTo({ top: Math.max(0, feedbackTop - 16), behavior: 'instant' });
  }

  function navigate(id) {
    if (!visibleIds.includes(id)) return;
    currentId = id;
    renderGrid();
    renderQuestion();
    save();
    $('question-card').scrollTop = 0;
    directoryOpen = false;
    updateDirectory();
  }

  function step(delta) {
    const position = visibleIds.indexOf(currentId);
    if (position >= 0 && position + delta >= 0 && position + delta < visibleIds.length) navigate(visibleIds[position + delta]);
  }

  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; refreshList(); }));
  $('question-search').addEventListener('input', event => { search = event.target.value; refreshList(); });
  $('directory-toggle').addEventListener('click', () => { directoryOpen = !directoryOpen; updateDirectory(); });
  mobileLayout.addEventListener('change', () => { directoryOpen = false; updateDirectory(); });
  document.addEventListener('click', event => {
    if (mobileLayout.matches && directoryOpen && !$('question-panel').contains(event.target)) {
      directoryOpen = false;
      updateDirectory();
    }
  });
  $('previous-button').addEventListener('click', () => step(-1));
  $('next-button').addEventListener('click', () => step(1));
  $('bookmark-button').addEventListener('click', () => {
    if (!currentId) return;
    if (bookmarks.has(currentId)) bookmarks.delete(currentId); else bookmarks.add(currentId);
    renderGrid(); renderQuestion(); save();
  });
  $('retry-button').addEventListener('click', () => {
    delete answers[currentId];
    render();
    $('options').querySelector('button')?.focus();
  });
  $('shuffle-button').addEventListener('click', () => {
    order = shuffled(order);
    optionOrders = newOptionOrders();
    currentId = null;
    refreshList();
  });
  $('show-all-button').addEventListener('click', () => {
    filter = 'all'; search = ''; $('question-search').value = ''; refreshList();
  });
  $('reset-button').addEventListener('click', () => $('reset-dialog').showModal());
  $('reset-dialog').querySelector('form').addEventListener('submit', event => {
    if (event.submitter?.value !== 'reset') return;
    answers = {}; bookmarks.clear(); category = 'all'; filter = 'all'; search = '';
    currentId = questions[0].id; order = questions.map(q => q.id);
    optionOrders = newOptionOrders();
    $('question-search').value = ''; refreshList();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileLayout.matches && directoryOpen) {
      directoryOpen = false;
      updateDirectory();
      $('directory-toggle').focus();
      return;
    }
    if (event.ctrlKey || event.altKey || event.metaKey || $('reset-dialog').open || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (/^[1-4]$/.test(event.key) && !event.repeat) { event.preventDefault(); answer('ABCD'[Number(event.key) - 1]); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
  });
  updateDirectory();
  refreshList();
})();
