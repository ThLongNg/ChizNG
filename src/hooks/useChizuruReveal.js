import { useEffect } from 'react';

const CHARS_LEFT  = ['ち', 'ず', 'る'];
const CHARS_RIGHT = ['グ', 'エ', 'ン'];
const TOTAL       = CHARS_LEFT.length + CHARS_RIGHT.length; // 7

// All characters fully visible by the time scroll reaches this fraction (0.5 = 50%)
const FULL_AT = 0.5;
// Max opacity — slightly frosted
const MAX_OPACITY = 0.62;

export const useChizuruReveal = () => {
  useEffect(() => {
    const leftSpans  = Array.from(document.querySelectorAll('.chizuru-left  .chizuru-char'));
    const rightSpans = Array.from(document.querySelectorAll('.chizuru-right .chizuru-char'));
    const allSpans   = [...leftSpans, ...rightSpans];

    if (allSpans.length === 0) return;

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress  = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 1;

      allSpans.forEach((span, i) => {
        // Spread thresholds evenly across 0 → FULL_AT
        const threshold = (i / (TOTAL - 1)) * FULL_AT;
        // Fade range per char: 7% of scroll
        const fade = Math.min(Math.max((progress - threshold) / 0.07, 0), 1);
        span.style.opacity      = fade * MAX_OPACITY;
        span.style.transform    = `translateY(${(1 - fade) * 18}px)`;
        // Slightly scale up as each char reveals
        span.style.fontSize     = `clamp(1.8rem, ${3 + fade * 1.5}vw, ${2.8 + fade * 0.8}rem)`;
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize',  update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize',  update);
    };
  }, []);
};
