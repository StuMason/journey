/* journey.stumason.dev — interaction. No dependencies. */
(function () {
  'use strict';
  const D = window.JOURNEY;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode, fine */ } }
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
  const svgEl = (tag, attrs) => {
    const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };

  /* ---------- Nav: mark the section in view ---------- */
  (function nav() {
    const links = $$('.nav a');
    const byId = {};
    links.forEach(a => { byId[a.getAttribute('href').slice(1)] = a; });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => a.classList.remove('is-active'));
          const a = byId[e.target.id]; if (a) a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    $$('main .sec').forEach(s => obs.observe(s));
  })();

  /* ---------- The circle ---------- */
  (function circle() {
    const pts = $('#circle-points'), hero = $('#circle-hero');
    const R = 230, C = 300, LR = 272;
    let i = 0, timer = null, playing = !reduceMotion;
    const angle = k => (-90 + k * 45) * Math.PI / 180;

    D.CIRCLE.forEach((b, k) => {
      const a = angle(k), x = C + R * Math.cos(a), y = C + R * Math.sin(a);
      const lx = C + LR * Math.cos(a), ly = C + LR * Math.sin(a);
      const g = svgEl('g', { class: 'circle__pt' + (y > C + 1 ? ' is-below' : ''), role: 'button', tabindex: '0', 'aria-label': `Beat ${b.n}: ${b.name}` });
      g.append(svgEl('circle', { cx: x, cy: y, r: 13 }));
      const t = svgEl('text', { x: lx, y: ly + 6 });
      // anchor labels away from the ring
      const cos = Math.cos(a);
      t.setAttribute('text-anchor', Math.abs(cos) < .3 ? 'middle' : (cos > 0 ? 'start' : 'end'));
      if (Math.abs(cos) < .3) t.setAttribute('y', ly + (Math.sin(a) < 0 ? -8 : 22));
      t.textContent = b.name;
      g.append(t);
      g.addEventListener('click', () => { stop(); show(k); });
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stop(); show(k); } });
      pts.append(g);
    });

    function show(k) {
      i = (k + 8) % 8;
      const b = D.CIRCLE[i];
      $$('.circle__pt', pts).forEach((g, n) => g.classList.toggle('is-on', n === i));
      hero.style.transform = `rotate(${i * 45}deg)`;
      $('#circle-num').textContent = b.n;
      $('#circle-name').textContent = b.name;
      $('#cp-eyebrow').textContent = `Beat ${b.n} of 8`;
      $('#cp-name').textContent = b.name;
      $('#cp-line').textContent = b.line;
      $('#cp-note').textContent = b.note;
      $('#cp-sw').textContent = b.sw;
    }
    function start() { if (timer) return; playing = true; $('#cp-play').textContent = 'Pause'; $('#cp-play').setAttribute('aria-pressed', 'true'); timer = setInterval(() => show(i + 1), 3600); }
    function stop() { playing = false; clearInterval(timer); timer = null; $('#cp-play').textContent = 'Play'; $('#cp-play').setAttribute('aria-pressed', 'false'); }
    $('#cp-prev').addEventListener('click', () => { stop(); show(i - 1); });
    $('#cp-next').addEventListener('click', () => { stop(); show(i + 1); });
    $('#cp-play').addEventListener('click', () => playing ? stop() : start());
    show(0);
    if (playing) {
      // only run while on screen
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && playing) { if (!timer) start(); } else { clearInterval(timer); timer = null; } }), { threshold: .3 });
      io.observe($('#circle'));
    } else { stop(); }
  })();

  /* ---------- The twelve stages ---------- */
  (function stages() {
    const FILES = ['01-ordinary-world', '02-call', '03-refusal', '04-mentor', '05-threshold', '06-tests', '07-approach', '08-ordeal', '09-reward', '10-road-back', '11-resurrection', '12-return'];
    const ALT = [
      'A cottage with one lit window beside a long road to the hills, a small figure at the gate.',
      'A figure opening a door to find a raven with a sealed letter on the step.',
      'A figure sitting in a doorway, looking out at a path that leads to mountains, not moving.',
      'An old cloaked figure handing a lit lantern to a young one at the edge of a dark wood.',
      'A lone figure stepping out on to a rope across a gorge, mist below.',
      'Three figures around a campfire in a forest at night.',
      'Two small figures climbing a path toward a castle on a crag, one window lit.',
      'A figure floating above dark water with arms spread, a great serpent coiled below.',
      'A kneeling figure holding a small cup up into a shaft of light in a cave.',
      'A figure running along a mountain ridge with a storm of birds behind.',
      'A figure standing with arms out inside wings made of flame.',
      'A figure walking back into a village at dawn carrying a lantern, people waiting at the gate.'
    ];
    const WORLD = { known: 'The known world', edge: 'The threshold', special: 'The special world' };
    const list = $('#stage-list'), panel = $('#stage-panel'), tabs = $('#film-tabs');
    let s = 0, f = 0;

    D.STAGES.forEach((st, k) => {
      const li = el('li', { class: st.world === 'special' ? 'is-special' : (st.world === 'edge' ? 'is-edge' : '') },
        el('button', { type: 'button', onclick: () => show(k) }, el('span', { class: 'n' }, String(st.n)), el('span', null, st.name)));
      list.append(li);
    });
    D.TEXTBOOK.forEach((film, k) => {
      tabs.append(el('button', { type: 'button', role: 'tab', 'aria-selected': k === 0 ? 'true' : 'false', onclick: () => { f = k; render(); } }, film.title));
    });

    function show(k) {
      s = (k + 12) % 12; render();
      if (window.innerWidth < 900) panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
    function render() {
      const st = D.STAGES[s], film = D.TEXTBOOK[f];
      $$('li', list).forEach((li, n) => li.classList.toggle('is-on', n === s));
      $$('button', tabs).forEach((b, n) => b.setAttribute('aria-selected', n === f ? 'true' : 'false'));
      panel.className = 'stage' + (st.world === 'special' ? ' is-special' : (st.world === 'edge' ? ' is-edge' : ''));
      const ink = $('#stage-ink');
      ink.style.setProperty('--m', `url(img/${FILES[s]}.webp)`);
      ink.setAttribute('aria-label', ALT[s]);
      $('#st-num').textContent = `Stage ${st.n} of 12`;
      $('#st-world').textContent = WORLD[st.world];
      $('#st-name').textContent = st.name;
      $('#st-slug').textContent = st.slug;
      $('#st-what').textContent = st.what;
      $('#st-why').textContent = st.why;
      $('#st-trap').textContent = st.trap;
      $('#st-beat').textContent = film.beats[s];
      const w = film.wobble && film.wobble[s];
      const wn = $('#st-wobble'); wn.hidden = !w; wn.textContent = w ? 'Where it wobbles: ' + w : '';
      $('#st-prev').disabled = s === 0; $('#st-next').disabled = s === 11;
    }
    $('#st-prev').addEventListener('click', () => show(s - 1));
    $('#st-next').addEventListener('click', () => show(s + 1));
    render();
  })();

  /* ---------- The maps ---------- */
  (function maps() {
    const toggles = $('#map-toggles'), rows = $('#map-rows'), readout = $('#map-readout');
    const on = { acts: true, harmon: true, vogler: true, snyder: false, campbell: false };
    Object.keys(D.SYSTEMS).forEach(key => {
      const sys = D.SYSTEMS[key];
      toggles.append(el('button', { type: 'button', 'aria-pressed': String(on[key]), onclick: e => { on[key] = !on[key]; e.currentTarget.setAttribute('aria-pressed', String(on[key])); $(`#row-${key}`).classList.toggle('is-off', !on[key]); } }, sys.name));
      const track = el('div', { class: 'maps__track' });
      sys.beats.forEach(b => {
        const span = Math.max(b.to - b.at, 0);
        const point = span <= 1.5;
        const d = el('button', { type: 'button', class: 'maps__beat' + (point ? ' is-point' : ''), title: b.name, 'aria-label': `${sys.name}: ${b.name}, ${b.at} to ${b.to} percent` });
        d.style.left = b.at + '%';
        d.style.width = point ? '10px' : span + '%';
        if (!point && span >= 4) d.textContent = b.name;
        d.addEventListener('click', () => {
          $$('.maps__beat').forEach(x => x.classList.remove('is-on')); d.classList.add('is-on');
          readout.innerHTML = `<b>${b.name}</b> · ${sys.name} · ${point ? b.at + '%' : b.at + '–' + b.to + '%'} of the running time${sys.note ? '. ' + sys.note : ''}`;
        });
        track.append(d);
      });
      rows.append(el('div', { class: 'maps__row' + (on[key] ? '' : ' is-off'), id: `row-${key}` }, el('div', { class: 'maps__label' }, sys.name), track));
    });
  })();

  /* ---------- Textbook cards ---------- */
  (function textbook() {
    const wrap = $('#textbook-cards');
    D.TEXTBOOK.forEach(film => {
      const beats = el('ol', { class: 'beats' });
      film.beats.forEach((b, k) => {
        const li = el('li', null, el('span', { class: 'bname' }, D.STAGES[k].name), el('p', { class: 'btext' }, b));
        if (film.wobble && film.wobble[k]) li.append(el('p', { class: 'wobble' }, film.wobble[k]));
        beats.append(li);
      });
      wrap.append(el('details', { class: 'card', id: 'tb-' + film.id },
        el('summary', null, el('span', { class: 'card__title' }, film.title), el('span', { class: 'card__meta' }, `${film.kind} · ${film.year} · ${film.by}`)),
        el('div', { class: 'card__body' }, el('p', { class: 'card__fit' }, film.fit), beats)));
    });
  })();

  /* ---------- Broken ---------- */
  (function broken() {
    const chips = $('#broken-chips'), wrap = $('#broken-cards');
    let active = 'all';
    const counts = {};
    D.BROKEN.forEach(b => b.breaks.forEach(t => { counts[t] = (counts[t] || 0) + 1; }));
    const mk = (key, label) => el('button', { type: 'button', 'aria-pressed': key === active ? 'true' : 'false', onclick: () => { active = key; $$('button', chips).forEach(c => c.setAttribute('aria-pressed', c.dataset.key === key ? 'true' : 'false')); filter(); }, 'data-key': key }, label);
    chips.append(mk('all', `All ${D.BROKEN.length}`));
    Object.keys(D.BREAK_TAGS).forEach(t => { if (counts[t]) chips.append(mk(t, `${D.BREAK_TAGS[t]} ${counts[t]}`)); });
    D.BROKEN.forEach(b => {
      const tags = el('div', { class: 'card__tags' });
      b.breaks.forEach(t => tags.append(el('span', null, D.BREAK_TAGS[t])));
      const card = el('details', { class: 'card card--broken', 'data-tags': b.breaks.join(' ') },
        el('summary', null, el('span', { class: 'card__title' }, b.title), el('span', { class: 'card__meta' }, `${b.kind} · ${b.year} · ${b.by}`)),
        el('div', { class: 'card__body' },
          el('p', { class: 'card__rule' }, b.rule), tags,
          el('h4', null, 'How'), el('p', null, b.how),
          el('h4', null, 'Why it works'), el('p', null, b.why)));
      wrap.append(card);
    });
    function filter() { $$('.card', wrap).forEach(c => c.classList.toggle('is-hidden', active !== 'all' && !c.dataset.tags.split(' ').includes(active))); }
  })();

  /* ---------- Lenses, books ---------- */
  (function lists() {
    const lg = $('#lens-grid');
    D.LENSES.forEach(l => lg.append(el('div', { class: 'lens' }, el('h3', null, l.name), el('p', null, l.body))));
    const bl = $('#book-list');
    D.BOOKS.forEach(b => {
      const head = el('div', null, el('h3', null, b.title), el('p', { class: 'by' }, `${b.by} · ${b.year}`));
      if (b.start) head.append(el('span', { class: 'start' }, 'Start here'));
      bl.append(el('li', { class: 'book' }, head, el('div', null, el('p', null, b.read), el('p', { class: 'warn' }, b.warn))));
    });
  })();

  /* ---------- Mapper ---------- */
  (function mapper() {
    const KEY = 'journey.map';
    const fields = $('#mapper-fields'), pts = $('#mapper-points'), title = $('#m-title'), status = $('#m-status');
    const saved = store.get(KEY, { title: '', beats: ['', '', '', '', '', '', '', ''] });
    const inputs = [];
    D.CIRCLE.forEach((b, k) => {
      const inp = el('input', { type: 'text', maxlength: '90', placeholder: b.line, id: 'm-' + k });
      inp.value = saved.beats[k] || '';
      inputs.push(inp);
      fields.append(el('label', { class: 'field' }, el('span', { html: `<b>${b.n}. ${b.name}</b>${b.line}` }), inp));
    });
    title.value = saved.title || '';
    const R = 150, C = 300, LR = 190;
    const angle = k => (-90 + k * 45) * Math.PI / 180;
    const groups = D.CIRCLE.map((b, k) => {
      const a = angle(k), x = C + R * Math.cos(a), y = C + R * Math.sin(a);
      const lx = C + LR * Math.cos(a), ly = C + LR * Math.sin(a);
      const g = svgEl('g', { class: 'mp' + (y > C + 1 ? ' is-below' : '') });
      g.append(svgEl('circle', { cx: x, cy: y, r: 9 }));
      const cos = Math.cos(a), sin = Math.sin(a);
      const anchor = Math.abs(cos) < .3 ? 'middle' : (cos > 0 ? 'start' : 'end');
      const lbl = svgEl('text', { class: 'lbl', x: lx, y: ly + (Math.abs(cos) < .3 ? (sin < 0 ? -22 : 14) : -6), 'text-anchor': anchor });
      lbl.textContent = b.name;
      const txt = svgEl('text', { class: 'txt', x: lx, y: ly + (Math.abs(cos) < .3 ? (sin < 0 ? -6 : 30) : 12), 'text-anchor': anchor });
      g.append(lbl, txt);
      pts.append(g);
      return { g, txt };
    });
    const clip = (s, n) => s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s;
    function render() {
      const t = title.value.trim();
      $('#mapper-title').textContent = t ? clip(t, 18) : 'Your story';
      inputs.forEach((inp, k) => {
        const v = inp.value.trim();
        groups[k].txt.textContent = clip(v, 22);
        groups[k].g.classList.toggle('has-text', !!v);
      });
    }
    let t;
    function save() { clearTimeout(t); t = setTimeout(() => { store.set(KEY, { title: title.value, beats: inputs.map(i => i.value) }); status.textContent = 'Saved in this browser'; }, 300); }
    [title, ...inputs].forEach(i => i.addEventListener('input', () => { render(); save(); }));
    $('#m-copy').addEventListener('click', async () => {
      const lines = [title.value.trim() || 'Untitled', ''].concat(D.CIRCLE.map((b, k) => `${b.n}. ${b.name}: ${inputs[k].value.trim() || '(blank)'}`));
      const text = lines.join('\n');
      try { await navigator.clipboard.writeText(text); status.textContent = 'Copied'; }
      catch (e) { window.prompt('Copy this:', text); }
    });
    $('#m-clear').addEventListener('click', () => { title.value = ''; inputs.forEach(i => i.value = ''); render(); store.set(KEY, { title: '', beats: ['', '', '', '', '', '', '', ''] }); status.textContent = 'Cleared'; });
    render();
  })();

  /* ---------- Tonight checklist ---------- */
  (function tonight() {
    const KEY = 'journey.tonight';
    const boxes = $$('#tonight-list input');
    const saved = store.get(KEY, []);
    boxes.forEach((b, k) => { b.checked = !!saved[k]; b.addEventListener('change', () => store.set(KEY, boxes.map(x => x.checked))); });
  })();
})();
