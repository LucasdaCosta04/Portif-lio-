/* ════════════════════════════════════════════
   CANVAS — Starfield + Scorpius + Shooting Stars + Particles
════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  const SCORPIUS_RAW = [
    { n:'Antares',     rx:0.52, ry:0.52, mag:0 },
    { n:'σ Sco',       rx:0.48, ry:0.60, mag:1 },
    { n:'α¹ Sco',      rx:0.44, ry:0.67, mag:2 },
    { n:'β Sco',       rx:0.41, ry:0.74, mag:1 },
    { n:'δ Sco',       rx:0.47, ry:0.78, mag:1 },
    { n:'π Sco',       rx:0.38, ry:0.80, mag:2 },
    { n:'ρ Sco',       rx:0.35, ry:0.75, mag:2 },
    { n:'ε Sco',       rx:0.55, ry:0.44, mag:1 },
    { n:'μ¹ Sco',      rx:0.58, ry:0.36, mag:1 },
    { n:'ζ¹ Sco',      rx:0.60, ry:0.28, mag:2 },
    { n:'η Sco',       rx:0.62, ry:0.22, mag:2 },
    { n:'θ Sco',       rx:0.65, ry:0.17, mag:1 },
    { n:'ι¹ Sco',      rx:0.68, ry:0.13, mag:2 },
    { n:'κ Sco',       rx:0.71, ry:0.10, mag:1 },
    { n:'λ Sco',       rx:0.74, ry:0.08, mag:1 },
    { n:'υ Sco',       rx:0.76, ry:0.11, mag:1 },
    { n:'G Sco',       rx:0.72, ry:0.16, mag:2 },
    { n:'τ Sco',       rx:0.50, ry:0.58, mag:2 },
  ];

  const SCORPIUS_LINES = [
    [5,3],[3,4],[4,1],[1,17],[17,0],[0,7],
    [2,3],[2,6],
    [7,8],[8,9],[9,10],[10,11],[11,12],
    [12,13],[13,14],[14,15],[13,16],
  ];

  let scorpius = [];
  function buildScorpius() {
    const marginX = W * 0.10, marginY = H * 0.04;
    const scaleX  = W * 0.62, scaleY  = H * 0.78;
    scorpius = SCORPIUS_RAW.map(s => ({
      ...s,
      px: marginX + s.rx * scaleX,
      py: marginY + (1 - s.ry) * scaleY,
      twinkle: Math.random() * Math.PI * 2,
      tspeed:  0.008 + Math.random() * 0.006,
    }));
  }

  let stars = [];
  function mkStars() {
    stars = [];
    const n = Math.floor(W * H / 820);
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.3 + 0.2,
        base: Math.random() * 0.65 + 0.12,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.013 + 0.004,
        hue: Math.random() < 0.75 ? 210 + Math.random() * 40 : 270 + Math.random() * 30,
      });
    }
  }

  let meteors = [];
  function spawnMeteor() {
    const startX = Math.random() * W * 1.2;
    const startY = Math.random() * H * 0.45;
    const angle  = Math.PI / 5 + Math.random() * 0.4;
    const speed  = 8 + Math.random() * 13;
    meteors.push({
      x: startX, y: startY,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      len: 120 + Math.random() * 200, alpha: 1,
      fade: 0.016 + Math.random() * 0.012,
      width: 1.4 + Math.random() * 1.4,
    });
  }
  function scheduleMeteor() {
    spawnMeteor();
    setTimeout(() => {
      scheduleMeteor();
      if (Math.random() < 0.25) {
        setTimeout(spawnMeteor, 300 + Math.random() * 400);
        if (Math.random() < 0.4) setTimeout(spawnMeteor, 700 + Math.random() * 600);
      }
    }, 1800 + Math.random() * 4200);
  }

  let pts = [];
  function mkPts() {
    const n = Math.floor(W * H / 14000);
    const COLS = ['rgba(37,99,255,','rgba(124,58,237,','rgba(77,138,255,'];
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .36, vy: (Math.random() - .5) * .36,
      r: Math.random() * 1.3 + .4,
      c: COLS[Math.floor(Math.random() * COLS.length)],
      o: Math.random() * .42 + .18,
    }));
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.016;

    for (const s of stars) {
      const alpha = s.base + Math.sin(t * s.speed * 60 + s.phase) * 0.22;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},80%,92%,${Math.max(0, alpha)})`;
      ctx.fill();
      if (s.r > 1.05 && Math.sin(t * s.speed * 80 + s.phase) > 0.82) {
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 2.8);
        grd.addColorStop(0, `hsla(${s.hue},90%,95%,0.22)`);
        grd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      }
    }

    if (scorpius.length) {
      ctx.save();
      ctx.lineWidth = 0.7;
      for (const [a, b] of SCORPIUS_LINES) {
        const sa = scorpius[a], sb = scorpius[b];
        const lineAlpha = 0.18 + Math.sin(t * 0.4) * 0.04;
        ctx.beginPath();
        ctx.moveTo(sa.px, sa.py);
        ctx.lineTo(sb.px, sb.py);
        const lg = ctx.createLinearGradient(sa.px, sa.py, sb.px, sb.py);
        lg.addColorStop(0, `rgba(100,160,255,${lineAlpha})`);
        lg.addColorStop(1, `rgba(168,85,247,${lineAlpha})`);
        ctx.strokeStyle = lg;
        ctx.stroke();
      }
      ctx.restore();

      for (const s of scorpius) {
        const tw = Math.sin(t * s.tspeed * 60 + s.twinkle);
        const isAntares = s.n === 'Antares';
        const baseR   = isAntares ? 3.8 : (s.mag === 0 ? 2.8 : s.mag === 1 ? 2.0 : 1.4);
        const baseAlp = isAntares ? 0.95 : (s.mag === 1 ? 0.82 : 0.65);
        const r = baseR + tw * 0.4;
        const alpha = Math.max(0, baseAlp + tw * 0.12);

        const hue = isAntares ? 15 : 210 + s.mag * 20;
        const sat = isAntares ? 80 : 60;

        const glowR = r * (isAntares ? 5 : 4);
        const grd = ctx.createRadialGradient(s.px, s.py, 0, s.px, s.py, glowR);
        grd.addColorStop(0, `hsla(${hue},${sat}%,90%,${alpha * 0.35})`);
        grd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(s.px, s.py, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();

        ctx.beginPath(); ctx.arc(s.px, s.py, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},${sat}%,95%,${alpha})`;
        ctx.fill();

        if (s.mag <= 1 || isAntares) {
          const spikeLen = r * (isAntares ? 7 : 5);
          const spikeAlpha = alpha * 0.25;
          ctx.save();
          ctx.strokeStyle = `hsla(${hue},60%,95%,${spikeAlpha})`;
          ctx.lineWidth = isAntares ? 1.5 : 0.8;
          [[0,1],[1,0],[0.7,0.7],[-0.7,0.7]].forEach(([dx,dy]) => {
            ctx.beginPath();
            ctx.moveTo(s.px - dx*spikeLen, s.py - dy*spikeLen);
            ctx.lineTo(s.px + dx*spikeLen, s.py + dy*spikeLen);
            ctx.stroke();
          });
          ctx.restore();
        }

        if (isAntares) {
          ctx.save();
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillStyle = `rgba(255,200,160,${0.45 + tw * 0.1})`;
          ctx.fillText('Antares', s.px + 10, s.py - 8);
          ctx.restore();
        }
      }
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      const mag = Math.hypot(m.vx, m.vy);
      const tailX = m.x - m.vx / mag * m.len;
      const tailY = m.y - m.vy / mag * m.len;
      const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(0.6, `rgba(180,210,255,${m.alpha * 0.38})`);
      grad.addColorStop(1, `rgba(255,255,255,${m.alpha})`);
      ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(m.x, m.y);
      ctx.strokeStyle = grad; ctx.lineWidth = m.width; ctx.lineCap = 'round'; ctx.stroke();
      const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 6);
      hg.addColorStop(0, `rgba(220,240,255,${m.alpha * 0.85})`);
      hg.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(m.x, m.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = hg; ctx.fill();
      m.x += m.vx; m.y += m.vy; m.alpha -= m.fade;
      if (m.alpha <= 0 || m.x > W + 100 || m.y > H + 100) meteors.splice(i, 1);
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 108) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(70,110,255,${(1 - d/108) * 0.08})`; ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
    for (const p of pts) {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c + p.o + ')'; ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    }

    requestAnimationFrame(draw);
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    mkStars(); mkPts(); buildScorpius();
  }

  resize(); draw(); scheduleMeteor();
  window.addEventListener('resize', resize);
})();

/* ════════════════════════════════════════════
   CURSOR GLOW SUAVIZADO
════════════════════════════════════════════ */
const cg = document.getElementById('cursor-glow');
if (cg) {
  let mx = 0, my = 0, cgx = 0, cgy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    // Fator lerp reduzido (0.06) para um rastro mais fluido e menos mecânico
    cgx += (mx - cgx) * 0.06;
    cgy += (my - cgy) * 0.06;
    cg.style.left = cgx + 'px';
    cg.style.top  = cgy + 'px';
    requestAnimationFrame(animCursor);
  })();
  document.querySelectorAll('a,button,.tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => cg.classList.add('big'));
    el.addEventListener('mouseleave', () => cg.classList.remove('big'));
  });
}

/* ════════════════════════════════════════════
   3D TILT EFFECT SUAVIZADO
════════════════════════════════════════════ */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;
    // Multiplicador menor (5deg) para uma inclinação elegante e suave
    card.style.transform = `perspective(1000px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

/* ════════════════════════════════════════════
   SCROLL REVEAL COM STAGGER (ATRASO)
════════════════════════════════════════════ */
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    // Delay multiplicado pelo índice para elementos aparecerem em cascata sutil
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 100);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ════════════════════════════════════════════
   NAV ACTIVE (Highlight no menu)
════════════════════════════════════════════ */
const secs  = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 140) cur = s.id; });
  navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--blue-xl)' : ''; });
});

/* ════════════════════════════════════════════
   FORM - Envio de e-mail
════════════════════════════════════════════ */
// Associado ao 'window' para poder ser chamado no 'onsubmit' do HTML
window.handleForm = function(e) {
  e.preventDefault();
  const s = encodeURIComponent(document.getElementById('assunto').value);
  const b = encodeURIComponent(document.getElementById('msg').value);
  window.open(`mailto:lucas.costa15gl@gmail.com?subject=${s}&body=${b}`);
  document.getElementById('form-ok').style.display = 'block';
  e.target.reset();
}