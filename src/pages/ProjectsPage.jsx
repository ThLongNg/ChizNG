import React from 'react';
import Navigation from '../components/Navigation';
import { useSakuraSnow } from '../hooks/useSakuraSnow';
import { useViewCounter } from '../hooks/useViewCounter';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCardTilt } from '../hooks/useCardTilt';
import { useLanguageContext } from '../context/LanguageContext';
import './ProjectsPage.css';

const CERTS = [
  {
    title: 'Business Analysis Essentials',
    desc: 'Eliciting business goals, building requirement traceability, and prioritizing stakeholder value.',
    link: 'https://coursera.org/share/d80a05af53981fed1f384ae63c8c78e5',
    cta: 'View Credential →',
  },
  {
    title: 'Requirements Gathering in Practice',
    desc: 'Structured interviews, use-case modeling, and documentation ready for engineering handoff.',
    link: 'https://coursera.org/share/4e37cfaa7eed2f44bbada9e3361154d8',
    cta: 'View Credential →',
  },
  {
    title: 'Systems Design for Bridge SE',
    desc: 'Translating solution architecture diagrams and clarifying data contracts for offshore teams.',
    link: 'https://coursera.org/share/7166fb99b4cce473cf8676fa2787cc0e',
    cta: 'View Credential →',
  },
  {
    title: 'Stakeholder Communication & Agile',
    desc: 'Facilitated sprint reviews, wrote BA-friendly documentation, and aligned priorities between Japan-VN squads.',
    link: 'https://coursera.org/share/7d312d20a7e7a01f3fb398ebefbd4a90',
    cta: 'View Credential →',
  },
];

const PROJECTS = [
  {
    title: 'ChizNG Portfolio',
    tag: 'Live',
  desc: 'Personal lab for testing how requirements become UI deliverables — with API widgets, Spotify data, and publicly visible specs.',
    bullets: [
      'Spotify Now Playing widget derived from the user story "see what I\'m listening to now"',
      'HSR Enka integration with clearly documented fallback behavior for developers',
    ],
    link: 'https://chiz-ng-profile.vercel.app/',
    cta: 'Visit Site',
    btnClass: 'primary-btn',
  },
  {
    title: 'Mini Capstone Project',
    tag: 'Team Demo',
    desc: 'Website that showcases our teamwork process: shared backlog, GitHub version control, and demo hand-off for a mock client.',
    bullets: [
      'Transparent commit log so the team can code in parallel',
      'Simple role-based guardrails and QA checklist',
    ],
    link: 'https://swp-edvm-mini-capstone-project.vercel.app/',
    cta: 'View Demo',
    btnClass: 'secondary-btn',
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
        <span className="view-counter__icon" aria-hidden="true">👁</span>
        <span className="view-counter__count">{viewCount}</span>
      </div>

      <h1>Projects &amp; Journey</h1>

      {/* Project Hero */}
      <section className="info-card project-hero" id="section-journey">
        <h2>Bridging Business &amp; Dev</h2>
        <p>
          I am shaping my path toward Business Analyst and Bridge System Engineer rolesâ€”translating stakeholder
          needs into actionable technical plans while keeping user experience delightful. Below is how I practice
          that craft.
        </p>
        <div className="hero-actions">
          <a className="primary-btn" href="https://github.com/ThLongNg" target="_blank" rel="noopener noreferrer">
            Visit GitHub
          </a>
          <a className="secondary-btn" href="mailto:longnguyenthanh0710@gmail.com">
            Contact Me
          </a>
        </div>
      </section>

      {/* GitHub Contributions */}
      <section className="info-card github-contributions" id="section-contrib">
        <h2>GitHub Contribution Graph</h2>
        <img
          src="https://ghchart.rshah.org/c71585/ThLongNg"
          alt="GitHub Contribution Graph"
          loading="lazy"
          style={{ width: '100%', maxWidth: '650px', paddingTop: '15px' }}
        />
        <p className="muted">Daily commits, experiments &amp; open-source contributions.</p>
      </section>

      {/* Experience Timeline */}
      <section className="info-card experience-section" id="section-experience">
        <h2>Experience &amp; Highlights</h2>
        <ul className="timeline-list">
          <li className="timeline-item">
            <div>
              <p className="timeline-period">2025</p>
              <h3>Mini Capstone Team Project</h3>
              <p>
                Built a proof-of-concept product with my squad and practiced the full GitHub workflow — backlog
                planning, pull-request review, and documentation hand-off.
              </p>
              <div className="skill-badges">
                <span>Teamwork</span>
                <span>GitHub Flow</span>
                <span>Mini Capstone</span>
              </div>
            </div>
          </li>
          <li className="timeline-item">
            <div>
              <p className="timeline-period">2024</p>
              <h3>Foundations: Web Dev &amp; Japanese</h3>
              <p>
                Completed core HTML/CSS/JS training while self-studying Japanese to prepare for a BrSE role that
                bridges Vietnamese teams with Japanese clients.
              </p>
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
        <h2>Coursera Certificates</h2>
        <div className="certificate-grid">
          {CERTS.map((cert) => (
            <article key={cert.title} className="certificate-card">
              <h3>{cert.title}</h3>
              <p>{cert.desc}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                {cert.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="info-card project-showcase" id="section-projects">
        <h2>Selected Projects</h2>
        <div className="project-grid">
          {PROJECTS.map((proj) => (
            <article key={proj.title} className="project-card">
              <div className="project-head">
                <h3>{proj.title}</h3>
                <span className="project-tag">{proj.tag}</span>
              </div>
              <p>{proj.desc}</p>
              <ul>
                {proj.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <a className={proj.btnClass} href={proj.link} target="_blank" rel="noopener noreferrer">
                {proj.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="info-card project-cta" id="section-cta">
        <h2>Let's Create Together</h2>
        <p>I'm open to collaborations, open-source initiatives, and creative front-end experiments.</p>
        <div className="hero-actions">
          <a className="primary-btn" href="mailto:longnguyenthanh0710@gmail.com">
            Start a Conversation
          </a>
          <a className="secondary-btn" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            Connect on LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
