import React from 'react';
import Navigation from '../components/Navigation';
import { useSakuraSnow } from '../hooks/useSakuraSnow';
import { useViewCounter } from '../hooks/useViewCounter';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCardTilt } from '../hooks/useCardTilt';
import { useLanguageContext } from '../context/LanguageContext';
import SpotifyCornerPopup from '../components/SpotifyCornerPopup';
import ScrollToTop from '../components/ScrollToTop';
import './ProjectsPage.css';

const CERTS = [
  {
    title: 'Business Analysis Essentials',
    link: 'https://coursera.org/share/d80a05af53981fed1f384ae63c8c78e5',
    descKey: 'projects.cert0.desc',
    ctaKey:  'projects.cert0.cta',
  },
  {
    title: 'Requirements Gathering in Practice',
    link: 'https://coursera.org/share/4e37cfaa7eed2f44bbada9e3361154d8',
    descKey: 'projects.cert1.desc',
    ctaKey:  'projects.cert1.cta',
  },
  {
    title: 'Systems Design for Bridge SE',
    link: 'https://coursera.org/share/7166fb99b4cce473cf8676fa2787cc0e',
    descKey: 'projects.cert2.desc',
    ctaKey:  'projects.cert2.cta',
  },
  {
    title: 'Stakeholder Communication & Agile',
    link: 'https://coursera.org/share/7d312d20a7e7a01f3fb398ebefbd4a90',
    descKey: 'projects.cert3.desc',
    ctaKey:  'projects.cert3.cta',
  },
];

const PROJECTS = [
  {
    title: 'ChizNG Portfolio',
    tag: 'Live',
    link: 'https://chiz-ng-profile.vercel.app/',
    btnClass: 'primary-btn',
    descKey:    'projects.proj0.desc',
    bullet0Key: 'projects.proj0.bullet0',
    bullet1Key: 'projects.proj0.bullet1',
    ctaKey:     'projects.proj0.cta',
  },
  {
    title: 'Mini Capstone Project',
    tag: 'Team Demo',
    link: 'https://swp-edvm-mini-capstone-project.vercel.app/',
    btnClass: 'secondary-btn',
    descKey:    'projects.proj1.desc',
    bullet0Key: 'projects.proj1.bullet0',
    bullet1Key: 'projects.proj1.bullet1',
    ctaKey:     'projects.proj1.cta',
  },
];

const ProjectsPage = () => {
  useSakuraSnow();
  useScrollReveal();
  useCardTilt();
  const viewCount = useViewCounter();
  const { t } = useLanguageContext();

  return (
    <div className="projects-page">
      <Navigation />

      <div className="view-counter" aria-label="Total site views">
        <span className="view-counter__icon" aria-hidden="true">&#x1F441;</span>
        <span className="view-counter__count">{viewCount}</span>
      </div>

      <h1>{t('projects.page.title')}</h1>

      {/* Project Hero */}
      <section className="info-card project-hero" id="section-journey">
        <h2>{t('projects.hero.heading')}</h2>
        <p>{t('projects.hero.body')}</p>
        <div className="hero-actions">
          <a className="primary-btn" href="https://github.com/ThLongNg" target="_blank" rel="noopener noreferrer">
            {t('projects.hero.github')}
          </a>
          <a className="secondary-btn" href="mailto:longnguyenthanh0710@gmail.com">
            {t('projects.hero.contact')}
          </a>
        </div>
      </section>

      {/* GitHub Contributions */}
      <section className="info-card github-contributions" id="section-contrib">
        <h2>{t('projects.github.heading')}</h2>
        <img
          src="https://ghchart.rshah.org/c71585/ThLongNg"
          alt={t('projects.github.heading')}
          loading="lazy"
          style={{ width: '100%', maxWidth: '650px', paddingTop: '15px' }}
        />
        <p className="muted">{t('projects.github.note')}</p>
      </section>

      {/* Experience Timeline */}
      <section className="info-card experience-section" id="section-experience">
        <h2>{t('projects.exp.heading')}</h2>
        <ul className="timeline-list">
          <li className="timeline-item">
            <div>
              <p className="timeline-period">{t('projects.exp.2025.period')}</p>
              <h3>{t('projects.exp.2025.title')}</h3>
              <p>{t('projects.exp.2025.body')}</p>
              <div className="skill-badges">
                <span>Teamwork</span>
                <span>GitHub Flow</span>
                <span>Mini Capstone</span>
              </div>
            </div>
          </li>
          <li className="timeline-item">
            <div>
              <p className="timeline-period">{t('projects.exp.2024.period')}</p>
              <h3>{t('projects.exp.2024.title')}</h3>
              <p>{t('projects.exp.2024.body')}</p>
              <div className="skill-badges">
                <span>HTML/CSS/JS</span>
                <span>Self-Study</span>
                <span>Japanese</span>
              </div>
            </div>
          </li>
        </ul>
      </section>

      {/* Certificates */}
      <section className="info-card certificate-section" id="section-certs">
        <h2>{t('projects.certs.heading')}</h2>
        <div className="certificate-grid">
          {CERTS.map((cert) => (
            <article key={cert.title} className="certificate-card">
              <h3>{cert.title}</h3>
              <p>{t(cert.descKey)}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                {t(cert.ctaKey)}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="info-card project-showcase" id="section-projects">
        <h2>{t('projects.showcase.heading')}</h2>
        <div className="project-grid">
          {PROJECTS.map((proj) => (
            <article key={proj.title} className="project-card">
              <div className="project-head">
                <h3>{proj.title}</h3>
                <span className="project-tag">{proj.tag}</span>
              </div>
              <p>{t(proj.descKey)}</p>
              <ul>
                <li>{t(proj.bullet0Key)}</li>
                <li>{t(proj.bullet1Key)}</li>
              </ul>
              <a className={proj.btnClass} href={proj.link} target="_blank" rel="noopener noreferrer">
                {t(proj.ctaKey)}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="info-card project-cta" id="section-cta">
        <h2>{t('projects.cta.heading')}</h2>
        <p>{t('projects.cta.body')}</p>
        <div className="hero-actions">
          <a className="primary-btn" href="mailto:longnguyenthanh0710@gmail.com">
            {t('projects.cta.start')}
          </a>
          <a className="secondary-btn" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            {t('projects.cta.linkedin')}
          </a>
        </div>
      </section>

      <SpotifyCornerPopup />
      <ScrollToTop />
    </div>
  );
};

export default ProjectsPage;