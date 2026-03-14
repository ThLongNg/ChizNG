import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navigation from '../components/Navigation';
import { PHOTOS as FALLBACK_PHOTOS } from '../config/galleryPhotos';
import { useSakuraSnow } from '../hooks/useSakuraSnow';
import { useLanguageContext } from '../context/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';
import './GalleryPage.css';

/* ── Inline 3D tilt on a single card ───────────────────────── */
const GalleryItem = ({ photo, idx, onClick }) => {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 14;
    const y = ((e.clientY - top)  / height - 0.5) * -14;
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) scale(1.04)`;
    el.style.boxShadow = `${-x * 1.5}px ${y * 1.5}px 32px rgba(199,21,133,0.28)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease';
    el.style.transform  = '';
    el.style.boxShadow  = '';
    setTimeout(() => { if (el) el.style.transition = ''; }, 500);
  }, []);

  return (
    <button
      ref={ref}
      className={`gallery-item${photo.wide ? ' gallery-item--wide' : ''}${photo.isVideo ? ' gallery-item--video' : ''} info-card`}
      style={{ '--i': idx }}
      onClick={() => onClick(idx)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={photo.title || `Item ${idx + 1}`}
    >
      {photo.isVideo ? (
        <>
          <img src={photo.thumb || photo.src} alt={photo.title || ''} loading="lazy" decoding="async" className="gallery-item__img" onError={(e) => { e.target.style.display='none'; }} />
          <div className="gallery-item__play">&#x25B6;</div>
        </>
      ) : (
        <img src={photo.src} alt={photo.title || ''} loading="lazy" decoding="async" className="gallery-item__img" />
      )}
      {(photo.title || photo.caption) && (
        <div className="gallery-item__overlay">
          {photo.title   && <span className="gallery-item__title">{photo.title}</span>}
          {photo.caption && <span className="gallery-item__caption">{photo.caption}</span>}
        </div>
      )}
    </button>
  );
};

/* ── Lightbox ───────────────────────────────────────────────── */
const Lightbox = ({ photos, index, onClose, onPrev, onNext }) => {
  const touchX = useRef(null);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx >  50) onPrev();
    if (dx < -50) onNext();
    touchX.current = null;
  };

  const onKey = useCallback((e) => {
    if (e.key === 'ArrowLeft')  onPrev();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'Escape')     onClose();
  }, [onPrev, onNext, onClose]);

  const photo = photos[index];

  return (
    <div
      className="gallery-lightbox"
      onClick={onClose}
      onKeyDown={onKey}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      ref={(el) => el?.focus()}
    >
      <button className="lb-btn lb-btn--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">&#x2039;</button>

      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        {photo.isVideo ? (
          <iframe src={photo.srcFull} className="lb-video" allow="autoplay" allowFullScreen title={photo.title || 'Video'} />
        ) : (
          <img src={photo.srcFull || photo.src} alt={photo.title || ''} className="lb-img" />
        )}
        {(photo.title || photo.caption) && (
          <div className="lb-info">
            {photo.title   && <strong>{photo.title}</strong>}
            {photo.caption && <span>{photo.caption}</span>}
          </div>
        )}
        <div className="lb-counter">{index + 1} / {photos.length}</div>
      </div>

      <button className="lb-btn lb-btn--next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">&#x203A;</button>
      <button className="lb-btn lb-btn--close" onClick={onClose} aria-label="Close">&#x2715;</button>
    </div>
  );
};

/* ── Page ───────────────────────────────────────────────────── */
const GalleryPage = () => {
  useSakuraSnow();
  const { t } = useLanguageContext();

  const [photos, setPhotos]     = useState([]);
  const [status, setStatus]     = useState('loading');
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter]     = useState('all'); // all | photo | video

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setPhotos(data.photos?.length > 0 ? data.photos : FALLBACK_PHOTOS); setStatus('ok'); })
      .catch(() => { setPhotos(FALLBACK_PHOTOS); setStatus('fallback'); });
  }, []);

  const filtered = photos.filter((p) =>
    filter === 'all' ? true : filter === 'video' ? p.isVideo : !p.isVideo
  );
  const hasVideo = photos.some((p) => p.isVideo);

  const close = () => setLightbox(null);
  const prev  = () => setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
  const next  = () => setLightbox((i) => (i + 1) % filtered.length);

  const subtitle =
    status === 'loading'  ? t('gallery.page.subtitle.loading')
    : status === 'fallback' ? t('gallery.page.subtitle.fallback')
    : t('gallery.page.subtitle.loaded').replace('{n}', filtered.length);

  return (
    <div className="gallery-page">
      <Navigation />

      <header className="gallery-header">
        <h1 className="gallery-title">{t('gallery.page.title')}</h1>
        <p className="gallery-subtitle">{subtitle}</p>

        {/* Filter tabs — only show if there are videos */}
        {status === 'ok' && hasVideo && (
          <div className="gallery-filters">
            {['all','photo','video'].map((f) => (
              <button
                key={f}
                className={`gallery-filter-btn${filter === f ? ' gallery-filter-btn--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? '📷 All' : f === 'photo' ? '🖼️ Photos' : '🎥 Videos'}
              </button>
            ))}
          </div>
        )}
      </header>

      {status === 'loading' && (
        <div className="gallery-grid">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="gallery-skeleton" style={{ '--i': i }} />)}
        </div>
      )}

      {status !== 'loading' && (
        <main className="gallery-masonry" aria-label="Photo gallery">
          {filtered.map((photo, idx) => (
            <GalleryItem key={idx} photo={photo} idx={idx} onClick={(i) => setLightbox(i)} />
          ))}
        </main>
      )}

      {lightbox !== null && (
        <Lightbox photos={filtered} index={lightbox} onClose={close} onPrev={prev} onNext={next} />
      )}

      <ScrollToTop />
    </div>
  );
};

export default GalleryPage;