import { useState, useEffect } from 'react';

const getGreetingText = (lang = 'en') => {
  const hour = new Date().getHours();
  const greetings = {
    en: {
      morning: '🌸 Good Morning!',
      afternoon: '☀️ Good Afternoon!',
      evening: '🌙 Good Evening!',
      night: '🌃 Good Night!',
    },
    vi: {
      morning: '🌸 Chào buổi sáng!',
      afternoon: '☀️ Chào buổi chiều!',
      evening: '🌙 Chào buổi tối!',
      night: '🌃 Chúc ngủ ngon!',
    },
    ja: {
      morning: '🌸 おはようございます！',
      afternoon: '☀️ こんにちは！',
      evening: '🌙 こんばんは！',
      night: '🌃 おやすみなさい！',
    },
  };

  const set = greetings[lang] || greetings.en;

  if (hour >= 5 && hour < 12) return set.morning;
  if (hour >= 12 && hour < 17) return set.afternoon;
  if (hour >= 17 && hour < 21) return set.evening;
  return set.night;
};

export const useDynamicGreeting = (lang = 'en') => {
  const [greeting, setGreeting] = useState(() => getGreetingText(lang));

  useEffect(() => {
    setGreeting(getGreetingText(lang));
    // Update every minute
    const interval = setInterval(() => {
      setGreeting(getGreetingText(lang));
    }, 60_000);
    return () => clearInterval(interval);
  }, [lang]);

  return greeting;
};
