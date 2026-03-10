import { useEffect } from 'react';

export const useSakuraSnow = () => {
  useEffect(() => {
    // ── Spawn one ambient petal ──────────────────────────────────
    const spawnPetal = () => {
      const el = document.createElement('div');
      el.classList.add('snowflake');
      el.textContent = '🌸';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.fontSize = (Math.random() * 18 + 8) + 'px';
      el.style.animationDuration = (Math.random() * 10 + 8) + 's';
      el.style.animationDelay = '0s';
      el.style.opacity = (Math.random() * 0.35 + 0.2).toFixed(2);
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 20000);
    };

    // Gentle ambient rain — one petal every ~350 ms
    const interval = setInterval(spawnPetal, 350);

    return () => clearInterval(interval);
  }, []);
};


