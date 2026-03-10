import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useSakuraSnow } from '../hooks/useSakuraSnow';
import { useViewCounter } from '../hooks/useViewCounter';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useChizuruReveal } from '../hooks/useChizuruReveal';
import { useDynamicGreeting } from '../hooks/useDynamicGreeting';
import { useLanguageContext } from '../context/LanguageContext';
import { useCardTilt } from '../hooks/useCardTilt';
import SpotifyCornerPopup from '../components/SpotifyCornerPopup';
import './HomePage.css';

const CONTACTS = [
  {
    color: '330 74% 62%',
    icon: 'fa-brands fa-facebook-f',
    name: 'Facebook',
    detail: 'Nguyễn Thành Long',
    link: 'https://www.facebook.com/long.nguyen.07102005',
    ctaIcon: 'fa-solid fa-link',
    ctaKey: 'contact.facebook.cta',
  },
  {
    color: '260 80% 65%',
    icon: 'fa-brands fa-discord',
    name: 'Discord',
    detail: 'chiznguyen71',
    link: 'https://discord.com/users/chiznguyen71',
    ctaIcon: 'fa-solid fa-link',
    ctaKey: 'contact.discord.cta',
  },
  {
    color: '12 85% 64%',
    icon: 'fa-solid fa-envelope-open-text',
    name: 'Gmail',
    detail: 'longnguyenthanh0710@gmail.com',
    link: 'mailto:longnguyenthanh0710@gmail.com',
    ctaIcon: 'fa-solid fa-paper-plane',
    ctaKey: 'contact.gmail.cta',
  },
  {
    color: '322 82% 66%',
    icon: 'fa-brands fa-instagram',
    name: 'Instagram',
    detail: '@l07nguyenthanh',
    link: 'https://www.instagram.com/l07.ng.chiz/',
    ctaIcon: 'fa-solid fa-camera',
    ctaKey: 'contact.instagram.cta',
  },
  {
    color: '210 10% 35%',
    icon: 'fa-brands fa-x-twitter',
    name: 'X (Twitter)',
    detail: '@ChizGuen',
    link: 'https://x.com/ChizGuen',
    ctaIcon: 'fa-solid fa-arrow-up-right-from-square',
    ctaKey: 'contact.twitter.cta',
  },
  {
    color: '210 64% 52%',
    icon: 'fa-brands fa-github',
    name: 'GitHub',
    detail: 'ThLongNg',
    link: 'https://github.com/ThLongNg',
    ctaIcon: 'fa-solid fa-code',
    ctaKey: 'contact.github.cta',
  },
];



const HomePage = () => {
  useSakuraSnow();
  useScrollReveal();
  useChizuruReveal();
  useCardTilt();
  const viewCount = useViewCounter();
  const { lang, t } = useLanguageContext();
  const greeting = useDynamicGreeting(lang);

  // All-language greetings for the marquee strip
  const hour = new Date().getHours();
  const timeKey = hour >= 5 && hour < 12 ? 'morning' : hour >= 12 && hour < 17 ? 'afternoon' : hour >= 17 && hour < 21 ? 'evening' : 'night';
  const allGreetings = {
    morning:   ['\uD83C\uDF38 Good Morning!', '\uD83C\uDF38 Chào buổi sáng!', '\uD83C\uDF38 おはようございます！'],
    afternoon: ['\u2600\uFE0F Good Afternoon!', '\u2600\uFE0F Chào buổi chiều!', '\u2600\uFE0F こんにちは！'],
    evening:   ['\uD83C\uDF19 Good Evening!', '\uD83C\uDF19 Chào buổi tối!', '\uD83C\uDF19 こんばんは！'],
    night:     ['\uD83C\uDF03 Good Night!', '\uD83C\uDF03 Chúc ngủ ngon!', '\uD83C\uDF03 おやすみなさい！'],
  };
  const marqueeItems = allGreetings[timeKey];

  // (old glitch-text init removed — handled by side columns now)

  return (
    <div className="home-page">
      <Navigation />

      {/* Vertical side columns — reveal on scroll */}
      <div className="chizuru-left" aria-hidden="true">
        {['ち', 'ず', 'る'].map((c) => (
          <span key={c} className="chizuru-char">{c}</span>
        ))}
      </div>
      <div className="chizuru-right" aria-hidden="true">
        {['グ', 'エ', 'ン'].map((c) => (
          <span key={c} className="chizuru-char">{c}</span>
        ))}
      </div>

      {/* Spotify corner popup — fixed bottom-left, no backend needed */}
      <SpotifyCornerPopup />

      <div className="view-counter" aria-label="Total site views">
        <span className="view-counter__icon" aria-hidden="true">👁</span>
        <span className="view-counter__count">{viewCount}</span>
      </div>

      <div className="greeting-marquee" aria-label={greeting}>
        <div className="greeting-marquee__track">
          {/* Duplicate 2x for seamless loop */}
          {[...marqueeItems, ...marqueeItems].map((g, i) => (
            <span key={i}>{g} &ensp;&middot;&ensp;</span>
          ))}
        </div>
      </div>
      <h1>{t('hero.title')}</h1>

      {/* Featured Song Section */}
      <section className="info-card" id="section-featured-song">
        <iframe
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/track/6efouvscdEILOB0bpJB8GM?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Featured Song"
        />
      </section>

      {/* Profile Section */}
      <section className="info-card" id="section-profile">
        <h2>{t('profile.fullName')}</h2>
        <h3>{t('profile.jpName')}</h3>
        <p>
          --- Studied at:{' '}
          <a href="https://www.facebook.com/FPTU.HCM" target="_blank" rel="noopener noreferrer">
            {t('profile.education')}
          </a>{' '}
          ---
        </p>
        <p>{t('profile.birth')}</p>
        <p>{t('profile.address')}</p>
      </section>

      {/* Contact Section */}
      <section className="info-card contact-info" id="section-contact">
        <h2>{t('contact.heading')}</h2>
        <div className="contact-grid">
          {CONTACTS.map((c) => (
            <article key={c.name} className="contact-card" style={{ '--contact-color': c.color }}>
              <div className="contact-card-content">
                <div className="contact-icon-ring">
                  <i className={`${c.icon} contact-icon`} aria-hidden="true" />
                </div>
                <h3>{c.name}</h3>
                <p className="contact-detail">{c.detail}</p>
                <a
                  className="contact-action"
                  href={c.link}
                  target={c.link.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                >
                  <i className={c.ctaIcon} aria-hidden="true" />
                  <span>{t(c.ctaKey)}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bio Section */}
      <section className="info-card" id="section-bio">
        <h2>{t('bio.heading')}</h2>
        <p>{t('bio.body')}</p>
      </section>

      {/* GitHub Section */}
      <section className="info-card github-calendar-section" id="section-github">
        <h2>{t('github.heading')}</h2>
        <a href="https://github.com/ThLongNg" target="_blank" rel="noopener noreferrer">
          <img
            id="github-graph"
            src="https://ghchart.rshah.org/c71585/ThLongNg"
            alt="GitHub Contribution Graph"
            style={{ width: '100%', maxWidth: '650px', paddingTop: '15px' }}
            loading="lazy"
          />
        </a>
        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '20px' }}>
          {t('github.note')}
        </p>
      </section>

      {/* Spotify Profile */}
      <section className="info-card spotify-profile-section" id="section-spotify">
        <h2>{t('spotify.profile.heading')}</h2>
        <div className="spotify-profile-card">
          <div className="spotify-profile-info">
            <div className="spotify-avatar" style={{ width: 64, height: 64 }}>
              <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.308 128 128 128 70.697 0 128-57.304 128-128C256 57.314 198.697.006 128 .006L128 0zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644-30.053-18.357-67.886-22.515-112.441-12.335-4.293.979-8.573-1.711-9.551-6.006-.979-4.295 1.7-8.575 6.004-9.553 48.758-11.14 90.582-6.343 124.322 14.277 3.76 2.308 4.952 7.214 2.641 10.973zm15.667-34.853c-2.889 4.696-9.034 6.179-13.726 3.29-34.406-21.149-86.853-27.274-127.549-14.92-5.278 1.594-10.852-1.38-12.454-6.648-1.59-5.278 1.386-10.842 6.655-12.447 46.486-14.105 104.276-7.273 143.787 17.008 4.692 2.889 6.175 9.034 3.287 13.717zm1.345-36.294C163.148 89.16 95.085 86.907 55.698 98.862a16.046 16.046 0 0 1-19.99-10.662 16.04 16.04 0 0 1 10.662-19.99c45.214-13.726 120.377-11.074 167.873 17.122 5.701 3.377 7.566 10.724 4.188 16.406-3.363 5.689-10.73 7.565-16.4 4.187z" fill="#1ED760" />
              </svg>
            </div>
            <div className="spotify-details">
              <h3>ChizNguyen</h3>
              <p className="spotify-username">@NguyenThanhLong</p>
              <p className="spotify-bio">{t('spotify.profile.bio')}</p>
              <a
                href="https://open.spotify.com/user/31kyh2opotdtof36smvsyrx66rdy?si=41576a9683ac443b"
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-profile-btn"
              >
                {t('spotify.profile.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="info-card featured-playlists-section">
        <h2>{t('spotify.playlists.heading')}</h2>
        <div className="embedded-playlists">
          <div className="playlist-embed">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/50peNK1HB3HCCEWfC6nmWB?utm_source=generator"
              width="100%" height="352" frameBorder="0" allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy" title="Playlist 1"
            />
          </div>
          <div className="playlist-embed">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/4zVuENJGDW2qCLJpXHgyhd?utm_source=generator"
              width="100%" height="352" frameBorder="0" allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy" title="Playlist 2"
            />
          </div>
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="info-card gallery-cta-card" id="section-gallery-cta">
        <h2>{t('gallery.cta.heading')}</h2>
        <p style={{ marginBottom: '18px' }}>{t('gallery.cta.desc')}</p>
        <Link to="/gallery" className="gallery-cta-btn">
          <i className="fa-solid fa-images" aria-hidden="true" />
          <span>{t('gallery.cta.btn')}</span>
        </Link>
      </section>

      {/* Decorative images */}
      <img className="image image1" src="https://starrail.honeyhunterworld.com/img/eidolon/please-write-on-with-a-smile-eidolon_icon.webp" alt="" loading="lazy" aria-hidden="true" />
      <img className="image image2" src="https://shop.ldrescdn.com/rms/ld-space/process/img/743c321c5972482590721bc9b7cee6821758792367.webp?1758792373043&x-oss-process=image/format,webp" alt="" loading="lazy" aria-hidden="true" />
      <img className="image image3" src="https://shop.ldrescdn.com/rms/ld-space/process/img/3fa2ba6995114da0a18c718bc1fe23851758792367.webp?1758792373020&x-oss-process=image/format,webp" alt="" loading="lazy" aria-hidden="true" />
      <img className="image image4" src="https://starrail.honeyhunterworld.com/img/eidolon/a-tomorrow-in-thirteen-shades-eidolon_icon.webp" alt="" loading="lazy" aria-hidden="true" />
      <img className="i5" src="assets/cyrene.png" alt="Cyrene sticker" loading="lazy" />
    </div>
  );
};

export default HomePage;
