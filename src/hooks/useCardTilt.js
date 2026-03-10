import { useEffect } from 'react';

/**
 * Applies a subtle 3-D tilt effect to every .info-card on mouse move.
 * The card gently rotates toward the cursor position within the card.
 * Spring-returns to flat when the cursor leaves.
 */
export const useCardTilt = () => {
  useEffect(() => {
    const MAX_TILT = 8; // degrees

    const onMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      // x → rotateY, y → rotateX (inverted for natural feel)
      card.style.transform = `perspective(900px) rotateX(${(-y * MAX_TILT).toFixed(2)}deg) rotateY(${(x * MAX_TILT).toFixed(2)}deg) translateZ(6px)`;
      card.style.transition = 'transform 0.08s ease';
      card.style.boxShadow = `
        ${-x * 18}px ${-y * 18}px 40px rgba(199,21,133,0.22),
        0 8px 32px rgba(199,21,133,0.14)
      `;
    };

    const onLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease';
      card.style.boxShadow = '';
    };

    const attach = () => {
      document.querySelectorAll('.info-card').forEach((card) => {
        // avoid double-listener
        if (card.dataset.tiltBound) return;
        card.dataset.tiltBound = '1';
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
      });
    };

    // Initial attach + re-scan when new cards appear
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelectorAll('.info-card[data-tilt-bound]').forEach((card) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
        card.style.transform = '';
        card.style.boxShadow = '';
        delete card.dataset.tiltBound;
      });
    };
  }, []);
};
