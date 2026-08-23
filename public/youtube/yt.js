/* journey.stumason.dev/youtube — interaction */
(function () {
  'use strict';
  const Y = window.YT;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };
  const el = (tag, attrs, ...kids) => {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
    }
    for (const k of kids) if (k !== null && k !== undefined) n.append(k);
    return n;
  };
  const mmss = s => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
  async function copy(text, status) {
    try { await navigator.clipboard.writeText(text); status.textContent = 'Copied'; }
    catch (e) { window.prompt('Copy this:', text); }
  }

  /* Nav */
  (function nav() {
    const links = $$('.nav a'), byId = {};
    links.forEach(a => { byId[a.getAttribute('href').slice(1)] = a; });
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { links.forEach(a => a.classList.remove('is-active')); const a = byId[e.target.id]; if (a) a.classList.add('is-active'); }
    }), { rootMargin: '-35% 0px -55% 0px' });
    $$('main .sec').forEach(s => obs.observe(s));
  })();

  /* Spine writer */
  (function spine() {
    const KEY = 'journey.yt.spine';
    const form = $('#spine-form'), para = $('#spine-para'), verdict = $('#spine-verdict'), status = $('#spine-status'), ex = $('#spine-examples');
    const saved = store.get(KEY, null);
    const areas = Y.SPINE.map((s, k) => {
      const ta = el('textarea', { rows: '2', placeholder: s.hint, id: 'sp-' + k });
      form.append(el('div', { class: 'spine__row' }, el('label', { class: 'lead', for: 'sp-' + k }, s.lead + ',', el('small', null, s.hint)), ta));
      return ta;
    });
    Y.SPINE_EXAMPLES.forEach((e, k) => ex.append(el('button', { type: 'button', onclick: () => { areas.forEach((a, i) => a.value = e.lines[i]); render(); save(); status.textContent = 'Loaded: ' + e.name; } }, e.name)));
    if (saved) areas.forEach((a, i) => a.value = saved[i] || ''); else areas.forEach((a, i) => a.value = Y.SPINE_EXAMPLES[0].lines[i]);
    function render() {
      para.innerHTML = '';
      let filled = 0;
      Y.SPINE.forEach((s, k) => {
        const v = areas[k].value.trim();
        if (v) filled++;
        para.append(el('span', { class: 'lead' }, s.lead + ', '), v ? el('span', null, v + ' ') : el('span', { class: 'blank' }, '… '));
      });
      const call = areas[2].value.trim(), cost = areas[5].value.trim(), change = areas[6].value.trim();
      verdict.className = 'spine__verdict';
      if (filled === 0) { verdict.textContent = 'Fill in the seven lines.'; }
      else if (!call) { verdict.classList.add('is-demo'); verdict.textContent = 'Nothing after “But one day”. That is a demo, not a video.'; }
      else if (!cost) { verdict.classList.add('is-demo'); verdict.textContent = 'No “Until finally”. What did it cost? Without a price the fight looks staged.'; }
      else if (!change) { verdict.classList.add('is-demo'); verdict.textContent = 'No “Ever since then”. What do you believe now? That line is the video.'; }
      else if (filled === 7) { verdict.classList.add('is-story'); verdict.textContent = 'Seven sentences. You have a story. Now the beats.'; }
      else { verdict.textContent = `${filled} of 7. Keep going.`; }
    }
    let t;
    function save() { clearTimeout(t); t = setTimeout(() => { store.set(KEY, areas.map(a => a.value)); status.textContent = 'Saved in this browser'; }, 300); }
    areas.forEach(a => a.addEventListener('input', () => { render(); save(); }));
    $('#spine-copy').addEventListener('click', () => copy(Y.SPINE.map((s, k) => `${s.lead}, ${areas[k].value.trim() || '…'}`).join('\n'), status));
    $('#spine-clear').addEventListener('click', () => { areas.forEach(a => a.value = ''); render(); store.set(KEY, areas.map(() => '')); status.textContent = 'Cleared'; });
    render();
  })();

  /* Compare */
  (function compare() {
    const wrap = $('#compare-cols');
    const col = (cls, title, meta, lines, tagged) => {
      const c = el('div', { class: 'compare__col ' + cls }, el('div', { class: 'compare__head' }, el('h3', null, title), el('span', { class: 'mono' }, meta)));
      lines.forEach(([t, text]) => {
        const p = el('p');
        if (tagged) {
          const m = text.match(/^(.*?)\s*\[(.+?)\]\s*$/);
          if (m) { p.append(m[1]); m[2].split(',').forEach(tag => p.append(el('span', { class: 'tag' }, tag.trim()))); }
          else p.textContent = text;
        } else p.textContent = text;
        c.append(el('div', { class: 'compare__line' }, el('span', { class: 't' }, t), p));
      });
      return c;
    };
    wrap.append(col('compare__col--proof', 'As a proof', '≈ 3:00 · a reference', Y.COMPARE.proof, false));
    wrap.append(col('compare__col--story', 'As a story', '4:26 · the cut that shipped', Y.COMPARE.story, true));
  })();

  /* Clock + beats */
  (function beats() {
    const range = $('#clock-range'), out = $('#clock-out'), bar = $('#clock-bar'), list = $('#beatlist');
    const times = [];
    Y.BEATS.forEach(b => {
      const below = b.n >= 3 && b.n <= 6;
      const seg = el('div', { class: 'clock__seg' + (below ? ' is-below' : '') }, b.name, el('small', null, ''));
      bar.append(seg);
      const time = el('span', { class: 'beat__time' }, '');
      times.push({ seg, time });
      list.append(el('li', { class: 'beat' + (below ? ' is-below' : ''), id: 'beat-' + b.n },
        el('div', { class: 'beat__side' }, el('span', { class: 'beat__n' }, String(b.n)), el('span', { class: 'beat__name' }, b.name), time, el('span', { class: 'beat__cam' }, b.cam)),
        el('div', null,
          el('p', { class: 'beat__ask' }, b.ask),
          el('p', null, b.proof),
          el('h4', null, 'The trap'), el('p', null, b.trap),
          el('h4', null, 'hidden-agenda'), el('p', { class: 'eg' }, b.eg))));
    });
    function render() {
      const mins = parseFloat(range.value), total = mins * 60;
      out.textContent = mmss(total);
      Y.BEATS.forEach((b, k) => {
        const a = mmss(b.at * total), z = mmss(b.to * total);
        times[k].time.textContent = `${a} – ${z}`;
        times[k].seg.querySelector('small').textContent = a;
      });
    }
    range.addEventListener('input', render);
    render();
  })();

  /* Shorts + titles */
  (function shorts() {
    const s = $('#shorts-table');
    Y.SHORTS.forEach(x => s.append(el('div', { class: 'short' + (x.beat === 5 ? ' is-dud' : '') },
      el('div', { class: 'short__beat' }, 'Beat ' + x.beat, el('small', null, x.name)), el('p', null, x.eg), el('p', { class: 'rule' }, x.rule))));
    const t = $('#titles');
    Y.TITLES.forEach(x => t.append(el('div', { class: 'title' }, el('p', { class: 'before' }, x.before), el('p', { class: 'after' }, x.after), el('p', { class: 'why' }, x.why))));
  })();

  /* Examples */
  (function examples() {
    const tb = $('#yt-textbook');
    Y.TEXTBOOK.forEach(v => {
      const beats = el('ol', { class: 'beats' });
      v.beats.forEach((b, k) => beats.append(el('li', null, el('span', { class: 'bname' }, Y.BEATS[k].name), el('p', { class: 'btext' }, b))));
      const body = el('div', { class: 'card__body' },
        el('p', { class: 'card__fit' }, v.why),
        el('p', { class: 'card__need', 'data-label': 'The need' }, v.need),
        el('p', { class: 'card__open', 'data-label': 'Cold open' }, v.open),
        beats);
      if (v.wobble) body.append(el('p', { class: 'wobble', style: 'max-width:66ch;margin-top:1rem' }, v.wobble));
      tb.append(el('details', { class: 'card', id: 'yt-' + v.id },
        el('summary', null, el('span', { class: 'card__title' }, v.title), el('span', { class: 'card__meta' }, `${v.by} · ${v.len}`)), body));
    });
    const br = $('#yt-broken');
    Y.BROKEN.forEach(v => br.append(el('details', { class: 'card', id: 'yt-' + v.id },
      el('summary', null, el('span', { class: 'card__title' }, v.title), el('span', { class: 'card__meta' }, v.by)),
      el('div', { class: 'card__body', style: 'max-width:66ch' },
        el('span', { class: 'card__tag' }, v.tag),
        el('p', null, v.what),
        el('h4', null, 'What is missing'), el('p', null, v.miss),
        el('h4', null, 'The one change'), el('p', null, v.fix)))));
  })();

  /* Sheet */
  (function sheet() {
    const KEY = 'journey.yt.sheet';
    const flag = $('#sheet-flag'), status = $('#sh-status'), beatsWrap = $('#sheet-beats');
    const fields = { title: $('#sh-title'), need: $('#sh-need'), open: $('#sh-open'), lock: $('#sh-lock'), elixir: $('#sh-elixir'), hook: $('#sh-hook') };
    const beatInputs = Y.BEATS.map((b, k) => {
      const inp = el('input', { type: 'text', maxlength: '200', id: 'shb-' + k, placeholder: b.ask });
      beatsWrap.append(el('label', { class: 'field', id: 'shf-' + k }, el('span', { html: `<b>${b.n}. ${b.name}</b>${b.ask}` }), inp));
      return inp;
    });
    const all = () => Object.values(fields).concat(beatInputs);
    const saved = store.get(KEY, null);
    if (saved) { Object.keys(fields).forEach(k => fields[k].value = saved[k] || ''); beatInputs.forEach((i, k) => i.value = (saved.beats || [])[k] || ''); }
    function check() {
      const missing = [1, 5, 7].filter(k => !beatInputs[k].value.trim());
      [1, 5, 7].forEach(k => $('#shf-' + k).classList.toggle('is-missing', !beatInputs[k].value.trim()));
      const filled = all().filter(i => i.value.trim()).length;
      flag.className = 'sheet__flag';
      if (filled === 0) { flag.textContent = 'Empty sheet. Start with the need.'; return; }
      if (!fields.need.value.trim()) { flag.classList.add('is-demo'); flag.textContent = 'No need sentence. If you cannot say what you believe at the end, you have a demo.'; return; }
      if (missing.length) { flag.classList.add('is-demo'); flag.textContent = 'Demo, not a video. Empty: ' + missing.map(k => `beat ${k + 1} (${Y.BEATS[k].name})`).join(', ') + '.'; return; }
      if (!fields.open.value.trim()) { flag.textContent = 'Story is there. No cold open yet: which beat do you open on, and what is the picture?'; return; }
      if (!fields.lock.value.trim()) { flag.textContent = 'Nearly. What happens live on camera?'; return; }
      flag.classList.add('is-ready'); flag.textContent = 'Treatment complete. Record against it.';
    }
    let t;
    function save() { clearTimeout(t); t = setTimeout(() => { const o = {}; Object.keys(fields).forEach(k => o[k] = fields[k].value); o.beats = beatInputs.map(i => i.value); store.set(KEY, o); status.textContent = 'Saved in this browser'; }, 300); }
    all().forEach(i => i.addEventListener('input', () => { check(); save(); }));
    $('#sh-copy').addEventListener('click', () => {
      const lines = [`# ${fields.title.value.trim() || 'Untitled'}`, '', `Need: ${fields.need.value.trim()}`, `Cold open: ${fields.open.value.trim()}`, ''];
      Y.BEATS.forEach((b, k) => lines.push(`${b.n}. ${b.name}: ${beatInputs[k].value.trim() || '(blank)'}`));
      lines.push('', `Lock: ${fields.lock.value.trim()}`, `Elixir: ${fields.elixir.value.trim()}`, `Forward hook: ${fields.hook.value.trim()}`);
      copy(lines.join('\n'), status);
    });
    $('#sh-load').addEventListener('click', () => {
      const v = Y.TEXTBOOK[0];
      fields.title.value = 'I got caught prompt-injecting my own repo';
      fields.need.value = v.need; fields.open.value = v.open;
      fields.lock.value = 'Merge PR #252 live. Scan job green in ten seconds.';
      fields.elixir.value = 'npx hidden-agenda. Free. Put it in CI.';
      fields.hook.value = 'I owe you three.';
      beatInputs.forEach((i, k) => i.value = v.beats[k]);
      check(); save(); status.textContent = 'Loaded';
    });
    $('#sh-clear').addEventListener('click', () => { all().forEach(i => i.value = ''); check(); store.set(KEY, null); status.textContent = 'Cleared'; });
    check();
  })();

  /* Exercises */
  (function exercises() {
    const KEY = 'journey.yt.ex';
    const wrap = $('#exercise-list');
    const saved = store.get(KEY, {});
    Y.EXERCISES.forEach(x => {
      const ta = el('textarea', { placeholder: Y.SPINE.map(s => s.lead + ', …').join('\n') });
      ta.value = saved[x.id] || '';
      ta.addEventListener('input', () => { saved[x.id] = ta.value; store.set(KEY, saved); });
      const node = el('div', { class: 'exercise', id: 'ex-' + x.id }, el('h3', null, x.title), el('p', { class: 'proof' }, x.proof), el('p', { class: 'hint' }, x.hint), ta);
      if (x.model) {
        const m = el('p', { class: 'model' });
        Y.SPINE.forEach((s, k) => m.append(el('span', { class: 'lead' }, s.lead + ', '), x.model[k] + ' '));
        node.append(el('details', null, el('summary', null, 'One way it could go'), m));
      }
      wrap.append(node);
    });
  })();

  /* Watch */
  (function watch() {
    const l = $('#watch-list');
    Y.WATCH.forEach(w => l.append(el('li', { class: 'book' }, el('div', null, el('h3', null, w.title), el('p', { class: 'by' }, w.by)), el('div', null, el('p', null, w.for)))));
  })();
})();
