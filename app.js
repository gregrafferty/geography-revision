(() => {
  "use strict";

  const app = document.getElementById("app");
  const titleEl = document.getElementById("title");
  const backBtn = document.getElementById("backBtn");
  const APP_TITLE = "Geography Revision";

  /* ---------- Storage (wrapped: private mode can throw) ---------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
    }
  };
  const statsKey = (topic) => `geo.stats.${topic.id}`;
  const settingsKey = (topic) => `geo.settings.${topic.id}`;

  function getStats(topic) { return store.get(statsKey(topic), {}); }
  function record(topic, item, correct) {
    const stats = getStats(topic);
    const s = stats[item.q] || { c: 0, w: 0, streak: 0 };
    if (correct) { s.c++; s.streak++; } else { s.w++; s.streak = 0; }
    s.last = Date.now();
    stats[item.q] = s;
    store.set(statsKey(topic), stats);
  }
  // 0 = not tried, 1 = struggling, 2 = getting there, 3 = mastered
  function mastery(s) {
    if (!s || (s.c + s.w) === 0) return 0;
    if (s.streak >= 3) return 3;
    if (s.streak >= 1) return 2;
    return 1;
  }

  function getSettings(topic) {
    return Object.assign(
      { groups: Object.keys(topic.groups || {}).filter(g => !(topic.defaultOff || []).includes(g)), length: 10 },
      store.get(settingsKey(topic), {})
    );
  }
  function saveSettings(topic, s) { store.set(settingsKey(topic), s); }

  function poolFor(topic, settings) {
    if (!topic.groups) return topic.items.slice();
    return topic.items.filter(i => !i.group || settings.groups.includes(i.group));
  }

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  // Ignore accents, case, punctuation and filler words, so "the River Thames" matches "Thames".
  const FILLER = new Set(["the", "river", "mount", "mt", "mountain", "mountains"]);
  const normalise = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w && !FILLER.has(w)).join("");

  function levenshtein(a, b) {
    const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let prev = dp[0]; dp[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const tmp = dp[j];
        dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = tmp;
      }
    }
    return dp[b.length];
  }

  // Returns "exact" | "close" | "wrong"
  function check(input, accepted) {
    const n = normalise(input);
    if (!n) return "wrong";
    const targets = accepted.map(normalise);
    if (targets.includes(n)) return "exact";
    const best = Math.min(...targets.map(t => levenshtein(n, t)));
    const longest = Math.max(...targets.map(t => t.length));
    if (best <= (longest > 6 ? 2 : 1)) return "close";
    return "wrong";
  }

  const fill = (tpl, item) => tpl.replace("{q}", item.q).replace("{a}", item.a);
  const askText = (topic, item) => item.ask || fill(topic.forward, item);
  const factText = (topic, item) => item.fact || (topic.fact ? fill(topic.fact, item) : "");

  /* ---------- Navigation ---------- */
  let current = null; // { name, params }
  const views = {};

  function go(name, params = {}, replace = false) {
    current = { name, params };
    const state = { name, params };
    if (replace) history.replaceState(state, ""); else history.pushState(state, "");
    render();
  }
  function render() {
    const { name, params } = current;
    backBtn.hidden = name === "home";
    app.innerHTML = "";
    views[name](params);
    window.scrollTo(0, 0);
  }
  window.addEventListener("popstate", (e) => {
    current = e.state || { name: "home", params: {} };
    render();
  });
  backBtn.addEventListener("click", () => history.back());

  const topicById = (id) => window.TOPICS.find(t => t.id === id);

  /* ---------- Views ---------- */
  views.home = () => {
    titleEl.textContent = APP_TITLE;
    const tiles = window.TOPICS.map(t => {
      const stats = getStats(t);
      const mastered = t.items.filter(i => mastery(stats[i.q]) === 3).length;
      const pct = Math.round((mastered / t.items.length) * 100);
      return `
        <button class="tile" data-topic="${t.id}">
          <span class="emoji">${t.emoji}</span>
          <span style="flex:1">
            <span class="t">${esc(t.title)}</span><br>
            <span class="s">${mastered} of ${t.items.length} mastered</span>
            <span class="meter"><span style="width:${pct}%"></span></span>
          </span>
          <span class="chev">›</span>
        </button>`;
    }).join("");
    app.innerHTML = `
      <h2>Ready to revise?</h2>
      <p class="lede">Pick a topic. Little and often works best: one quick quiz a day adds up.</p>
      <div class="list">${tiles}</div>
      <p class="muted center" style="margin-top:28px;font-size:.85rem">More topics coming soon.</p>`;
    app.querySelectorAll("[data-topic]").forEach(b =>
      b.addEventListener("click", () => go("topic", { id: b.dataset.topic })));
  };

  views.topic = ({ id }) => {
    const topic = topicById(id);
    titleEl.textContent = topic.title;
    const settings = getSettings(topic);
    const stats = getStats(topic);

    const draw = () => {
      const pool = poolFor(topic, settings);
      const mastered = pool.filter(i => mastery(stats[i.q]) === 3).length;
      const weak = pool.filter(i => { const m = mastery(stats[i.q]); return m === 1 || m === 2; }).length;
      const groupChips = topic.groups ? Object.entries(topic.groups).map(([g, label]) =>
        `<button class="chip" data-group="${g}" aria-pressed="${settings.groups.includes(g)}">${esc(label)}</button>`).join("") : "";
      const lengthChips = [10, 20, 0].map(n =>
        `<button class="chip" data-len="${n}" aria-pressed="${settings.length === n}">${n ? n + " questions" : "All " + pool.length}</button>`).join("");

      const modes = [
        { m: "learn", e: "🃏", t: "Flashcards", s: "Flip cards to learn them first" },
        { m: "mc", e: "✅", t: "Multiple choice", s: topic.mcHint || "Pick the right answer from four options" },
        topic.reverse && { m: "mc-rev", e: "🔁", t: "Reverse multiple choice", s: topic.reverseHint || "Work backwards from the answer" },
        { m: "type", e: "⌨️", t: "Type the answer", s: "Exam style: spelling counts" },
        { m: "weak", e: "🎯", t: "Practise weak spots", s: weak ? `${weak} to work on` : "Do a quiz first to find these", disabled: !weak }
      ].filter(Boolean);

      app.innerHTML = `
        <div class="card">
          <div class="progress-line"><span>${mastered} of ${pool.length} mastered</span><span>${pool.length ? Math.round(mastered / pool.length * 100) : 0}%</span></div>
          <div class="meter"><span style="width:${pool.length ? mastered / pool.length * 100 : 0}%"></span></div>
          <button class="link-btn" id="progressBtn">See all progress ›</button>
        </div>
        ${groupChips ? `<h3>Regions to include</h3><div class="chips">${groupChips}</div>` : ""}
        <h3>Quiz length</h3><div class="chips">${lengthChips}</div>
        <h3>Choose a mode</h3>
        <div class="list">
          ${modes.map(x => `
            <button class="tile" data-mode="${x.m}" ${x.disabled || !pool.length ? "disabled style='opacity:.55;cursor:default'" : ""}>
              <span class="emoji">${x.e}</span>
              <span><span class="t">${x.t}</span><br><span class="s">${x.s}</span></span>
              <span class="chev">›</span>
            </button>`).join("")}
        </div>`;

      app.querySelectorAll("[data-group]").forEach(b => b.addEventListener("click", () => {
        const g = b.dataset.group;
        settings.groups = settings.groups.includes(g) ? settings.groups.filter(x => x !== g) : [...settings.groups, g];
        saveSettings(topic, settings); draw();
      }));
      app.querySelectorAll("[data-len]").forEach(b => b.addEventListener("click", () => {
        settings.length = Number(b.dataset.len); saveSettings(topic, settings); draw();
      }));
      app.querySelectorAll("[data-mode]:not([disabled])").forEach(b => b.addEventListener("click", () => {
        const mode = b.dataset.mode;
        go(mode === "learn" ? "learn" : "quiz", { id, mode });
      }));
      app.querySelector("#progressBtn").addEventListener("click", () => go("progress", { id }));
    };
    draw();
  };

  function pickQuestions(topic, settings, mode) {
    const pool = poolFor(topic, settings);
    const stats = getStats(topic);
    const n = settings.length || pool.length;
    if (mode === "weak") {
      // Struggling first, then "getting there", oldest-seen first within each.
      const weak = pool.filter(i => { const m = mastery(stats[i.q]); return m === 1 || m === 2; })
        .sort((a, b) => mastery(stats[a.q]) - mastery(stats[b.q]) || (stats[a.q].last || 0) - (stats[b.q].last || 0));
      return shuffle(weak.slice(0, Math.min(n, weak.length)));
    }
    return shuffle(pool).slice(0, n);
  }

  views.quiz = ({ id, mode }) => {
    const topic = topicById(id);
    const settings = getSettings(topic);
    const questions = pickQuestions(topic, settings, mode);
    const reverse = mode === "mc-rev";
    // Weak-spot practice uses typing, which is the best memory test.
    const typed = mode === "type" || mode === "weak";
    const modeNames = { mc: "Multiple choice", "mc-rev": "Reverse", type: "Type the answer", weak: "Weak spots" };
    titleEl.textContent = modeNames[mode];

    let index = 0, score = 0;
    const log = [];

    const ask = () => {
      if (index >= questions.length) return finish();
      const item = questions[index];
      const qText = reverse ? fill(topic.reverse, item) : askText(topic, item);
      const fact = factText(topic, item);
      const header = `
        <div class="progress-line"><span>Question ${index + 1} of ${questions.length}</span><span>Score ${score}</span></div>
        <div class="meter"><span style="width:${index / questions.length * 100}%"></span></div>
        <p class="question">${!reverse && item.flag ? `<span class="flag" aria-hidden="true">${item.flag}</span>` : ""}${esc(qText)}</p>`;

      if (typed) {
        app.innerHTML = `${header}
          <form id="f" autocomplete="off">
            <input class="answer-input" id="ans" type="text" placeholder="Type your answer…" autocapitalize="words" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="Your answer">
            <div class="actions row">
              <button type="button" class="btn secondary" id="skip">I don't know</button>
              <button type="submit" class="btn">Check</button>
            </div>
          </form>
          <div id="fb"></div>`;
        const input = app.querySelector("#ans");
        input.focus();
        const submit = (given) => {
          const result = given == null ? "wrong" : check(given, [item.a, ...(item.alt || [])]);
          const ok = result !== "wrong";
          if (ok) score++;
          record(topic, item, ok);
          log.push({ item, ok, given });
          app.querySelector("#f").remove();
          const fb = app.querySelector("#fb");
          const factLine = item.fact ? `<small>${esc(item.fact)}</small>` : "";
          const msg = result === "exact" ? `<div class="feedback good">✓ Correct: ${esc(item.a)}${factLine}</div>`
            : result === "close" ? `<div class="feedback close">≈ Nearly! Check the spelling: <strong>${esc(item.a)}</strong><small>You wrote “${esc(given)}”. Counted as correct, but spelling matters in the exam.</small>${factLine}</div>`
            : `<div class="feedback bad">✗ The answer is <strong>${esc(item.a)}</strong>${given ? `<small>You wrote “${esc(given)}”.</small>` : ""}${factLine}</div>`;
          fb.innerHTML = `${msg}<div class="actions"><button class="btn block" id="next">${index + 1 < questions.length ? "Next question" : "See results"}</button></div>`;
          const next = fb.querySelector("#next");
          next.focus();
          next.addEventListener("click", () => { index++; ask(); });
        };
        app.querySelector("#f").addEventListener("submit", (e) => {
          e.preventDefault();
          if (!input.value.trim()) { input.focus(); return; }
          submit(input.value.trim());
        });
        app.querySelector("#skip").addEventListener("click", () => submit(null));
        return;
      }

      // Multiple choice
      const pool = poolFor(topic, settings);
      const answerOf = (i) => reverse ? i.q : i.a;
      const correctAnswer = answerOf(item);
      // Distractors must have a different answer (e.g. England and the UK are both London)
      // and be the same kind of thing (a river for a river question, a peak for a peak question).
      const candidates = topic.items.filter(i => i.a !== item.a && answerOf(i) !== correctAnswer && i.kind === item.kind);
      const sameGroup = shuffle(candidates.filter(i => i.group === item.group && pool.includes(i)));
      const others = shuffle(candidates.filter(i => !sameGroup.includes(i)));
      const seen = new Set([correctAnswer]);
      const distractors = [];
      for (const c of [...sameGroup, ...others]) {
        const ans = answerOf(c);
        if (!seen.has(ans)) { seen.add(ans); distractors.push(ans); }
        if (distractors.length === 3) break;
      }
      const options = shuffle([correctAnswer, ...distractors]);

      app.innerHTML = `${header}
        <div class="options">${options.map(o => `<button class="option" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div>
        <div id="fb"></div>`;
      app.querySelectorAll(".option").forEach(btn => btn.addEventListener("click", () => {
        const chosen = btn.dataset.o;
        const ok = chosen === correctAnswer;
        if (ok) score++;
        record(topic, item, ok);
        log.push({ item, ok, given: chosen, reverse });
        app.querySelectorAll(".option").forEach(b => {
          b.disabled = true;
          if (b.dataset.o === correctAnswer) b.classList.add("correct");
          else if (b === btn) b.classList.add("wrong");
        });
        const fb = app.querySelector("#fb");
        fb.innerHTML = `<div class="feedback ${ok ? "good" : "bad"}">${ok ? "✓ Correct!" : `✗ Not quite. The answer is ${esc(correctAnswer)}.`} ${fact ? `<small>${esc(fact)}</small>` : ""}</div>
          <div class="actions"><button class="btn block" id="next">${index + 1 < questions.length ? "Next question" : "See results"}</button></div>`;
        const next = fb.querySelector("#next");
        next.focus();
        next.addEventListener("click", () => { index++; ask(); });
      }));
    };

    const finish = () => {
      titleEl.textContent = "Results";
      const pct = questions.length ? Math.round(score / questions.length * 100) : 0;
      const msg = pct === 100 ? "Perfect score! 🎉" : pct >= 80 ? "Great work! 🌟" : pct >= 50 ? "Good effort, keep going 💪" : "Keep practising, you'll get there 📚";
      const wrong = log.filter(l => !l.ok);
      app.innerHTML = `
        <div class="card center">
          <div class="muted">You scored</div>
          <div class="score">${score} / ${questions.length}</div>
          <div>${msg}</div>
        </div>
        ${wrong.length ? `<h3>To revisit</h3>
          <div class="card"><ul class="review-list">${wrong.map(l => `
            <li><span>${l.item.flag ? l.item.flag + " " : ""}${esc(l.item.q)}</span>
            <span style="text-align:right"><strong>${esc(l.item.a)}</strong>${l.given ? `<br><span class="yours">${esc(l.given)}</span>` : ""}</span></li>`).join("")}
          </ul></div>` : ""}
        <div class="actions row" style="margin-top:20px">
          <button class="btn secondary" id="done">Done</button>
          <button class="btn" id="again">Play again</button>
        </div>`;
      app.querySelector("#again").addEventListener("click", () => go("quiz", { id, mode }, true));
      app.querySelector("#done").addEventListener("click", () => history.back());
    };

    if (!questions.length) {
      app.innerHTML = `<p class="lede">Nothing to practise here yet. Try including more regions.</p>`;
      return;
    }
    ask();
  };

  views.learn = ({ id }) => {
    const topic = topicById(id);
    const settings = getSettings(topic);
    const cards = shuffle(poolFor(topic, settings));
    titleEl.textContent = "Flashcards";
    let index = 0;
    const missed = [];

    const show = () => {
      if (index >= cards.length) {
        app.innerHTML = `
          <div class="card center">
            <div class="score">🎓</div>
            <p><strong>All ${cards.length} cards done.</strong></p>
            <p class="muted">${missed.length ? `You marked ${missed.length} as “not yet”. Go round again with just those?` : "You knew them all. Try a quiz next!"}</p>
          </div>
          <div class="actions row">
            ${missed.length ? `<button class="btn secondary" id="missed">Just the “not yet” cards</button>` : ""}
            <button class="btn" id="done">Done</button>
          </div>`;
          app.querySelector("#done").addEventListener("click", () => history.back());
          const m = app.querySelector("#missed");
          if (m) m.addEventListener("click", () => {
            cards.length = 0; cards.push(...shuffle(missed)); missed.length = 0; index = 0; show();
          });
        return;
      }
      const item = cards[index];
      app.innerHTML = `
        <div class="progress-line"><span>Card ${index + 1} of ${cards.length}</span><span>Tap card to flip</span></div>
        <div class="flash" id="flash" role="button" tabindex="0" aria-label="Flip card">
          <div class="flash-inner">
            <div class="flash-face front">
              ${item.flag ? `<div class="flag" aria-hidden="true">${item.flag}</div>` : ""}
              ${item.ask
                ? `<div class="big medium">${esc(item.ask)}</div>`
                : `<div class="big">${esc(item.q)}</div><div class="hint">${esc(topic.flashHint || "")}</div>`}
            </div>
            <div class="flash-face back">
              ${topic.flashBack && !item.ask ? `<div class="hint" style="margin:0 0 8px">${esc(fill(topic.flashBack, item))}</div>` : ""}
              <div class="big">${esc(item.a)}</div>
              ${item.fact ? `<div class="hint">${esc(item.fact)}</div>` : ""}
            </div>
          </div>
        </div>
        <div class="row" id="judge" style="visibility:hidden">
          <button class="btn secondary" id="no">Not yet</button>
          <button class="btn" id="yes">I knew it</button>
        </div>`;
      const flash = app.querySelector("#flash");
      const flip = () => { flash.classList.toggle("flipped"); app.querySelector("#judge").style.visibility = "visible"; };
      flash.addEventListener("click", flip);
      flash.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } });
      app.querySelector("#yes").addEventListener("click", () => { index++; show(); });
      app.querySelector("#no").addEventListener("click", () => { missed.push(item); index++; show(); });
      flash.focus();
    };
    show();
  };

  views.progress = ({ id }) => {
    const topic = topicById(id);
    titleEl.textContent = "Progress";
    const stats = getStats(topic);
    const groups = topic.groups || { _: "All" };
    const sections = Object.entries(groups).map(([g, label]) => {
      const items = topic.items.filter(i => (i.group || "_") === g);
      if (!items.length) return "";
      return `<h3>${esc(label)}</h3><div class="card"><ul class="review-list">${items.map(i => {
        const s = stats[i.q];
        const m = mastery(s);
        return `<li><span style="display:flex"><span class="mastery-dot m${m}"></span>${i.flag ? i.flag + "&nbsp;" : ""}${esc(i.q)}</span>
          <span style="text-align:right">${esc(i.a)}<br><span class="muted" style="font-size:.8rem">${s ? `${s.c} right · ${s.w} wrong` : "not tried"}</span></span></li>`;
      }).join("")}</ul></div>`;
    }).join("");
    app.innerHTML = `
      <div class="legend">
        <span><span class="mastery-dot m3"></span>Mastered (3 in a row)</span>
        <span><span class="mastery-dot m2"></span>Getting there</span>
        <span><span class="mastery-dot m1"></span>Needs work</span>
        <span><span class="mastery-dot m0"></span>Not tried</span>
      </div>
      ${sections}
      <div class="center" style="margin-top:24px"><button class="link-btn" id="reset" style="color:var(--bad)">Reset progress for this topic</button></div>`;
    app.querySelector("#reset").addEventListener("click", () => {
      if (confirm("Reset all progress for this topic?")) { store.set(statsKey(topic), {}); render(); }
    });
  };

  /* ---------- Boot ---------- */
  current = history.state && views[history.state.name] ? history.state : { name: "home", params: {} };
  history.replaceState(current, "");
  render();
})();
