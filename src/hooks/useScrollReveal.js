import { useEffect } from 'react';

/**
 * Scroll-reveal for .info-card elements.
 *
 * Cards start hidden (CSS class `card-hidden`) and get `card-revealed`
 * added once they scroll into the viewport trigger zone.
 * The CSS handles the actual animation (fade + rise + blur clear).
 */
export const useScrollReveal = () => {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.info-card'));
    if (cards.length === 0) return;

    // Mark all cards as hidden initially
    cards.forEach((card) => {
      card.classList.add('card-hidden');
      card.classList.remove('card-revealed');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target;
          // Slight stagger based on position in list
          const index = cards.indexOf(card);
          const delay = (index % 4) * 60; // max 240ms stagger reset every 4
          card.style.transitionDelay = `${delay}ms`;
          card.classList.remove('card-hidden');
          card.classList.add('card-revealed');
          // Stop observing once revealed
          observer.unobserve(card);
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      cards.forEach((card) => {
        card.classList.remove('card-hidden', 'card-revealed');
        card.style.transitionDelay = '';
      });
    };
  }, []);
};
