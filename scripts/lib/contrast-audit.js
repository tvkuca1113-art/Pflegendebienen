/**
 * Injected into a page and called as window.__contrastAudit().
 *
 * Returns every visible text run whose contrast against its *composited*
 * background falls below WCAG 2.2 AA (4.5:1, or 3:1 for large text).
 * Compositing matters: a light label over `rgba(255,255,255,.04)` inside a
 * dark section is dark-on-dark, and a naive check reads it as light-on-light.
 */
window.__contrastAudit = function () {
  // Chromium reports color-mix() as `color(srgb r g b / a)` with 0-1 channels,
  // and everything else as rgb()/rgba() with 0-255 channels.
  const parse = (c) => {
    const n = (c.match(/-?[\d.]+(?:e-?\d+)?/g) || ['0', '0', '0', '1']).map(Number);
    const srgb = /^color\(/.test(c);
    return [n[0], n[1], n[2]].map((v) => (srgb ? v * 255 : v)).concat(n[3] ?? 1);
  };
  const over = (fg, bg) => {            // src-over composite
    const a = fg[3] ?? 1;
    return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat(1);
  };
  const effBg = (el) => {
    const stack = [];
    let n = el;
    while (n) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if ((c[3] ?? 1) > 0) stack.push(c);
      n = n.parentElement;
    }
    return stack.reduceRight((acc, c) => over(c, acc), [255, 255, 255, 1]);
  };
  const lum = (c) => {
    const [r, g, b] = c.slice(0, 3).map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  };

  const bad = [];
  document.querySelectorAll('label, p, a, span, strong, li, h1, h2, h3, h4, button, td, th, figcaption')
    .forEach((el) => {
      // Only the element's own text, so a wrapper is not blamed for its children.
      const txt = [...el.childNodes].filter((n) => n.nodeType === 3)
        .map((n) => n.textContent.trim()).join(' ').trim();
      if (!txt) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.opacity === '0') return;
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      const need = large ? 3 : 4.5;
      const bg = effBg(el);
      const got = ratio(over(parse(cs.color), bg), bg);
      if (got < need) bad.push(`"${txt.slice(0, 28)}" ${got.toFixed(2)}:1 (need ${need})`);
    });
  return bad;
};
