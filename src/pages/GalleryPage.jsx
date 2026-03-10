import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { PHOTOS as FALLBACK_PHOTOS } from '../config/galleryPhotos';
import { useSakuraSnow } from '../hooks/useSakuraSnow';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguageContext } from '../context/LanguageContext';
import './GalleryPage.css';

const GalleryPage = () => {
  useSakuraSnow();
  useScrollReveal();
  const { t } = useLanguageContext();

  const [photos, setPhotos]     = useState([]);
  const [status, setStatus]     = useState('loading'); // loading | ok | fallback
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data.photos && data.photos.length > 0) {
          setPhotos(data.photos);
        } else {
          setPhotos(FALLBACK_PHOTOS);
        }
        setStatus('ok');
      })
      .catch(() => {
        setPhotos(FALLBACK_PHOTOS);
        setStatus('fallback');
      });
  }, []);

  const close = () => setLightbox(null);
  const prev  = () => setLightbox((i) => (i - 1 + photos.length) % photos.length);
  const next  = () => setLightbox((i) => (i + 1) % photos.length);

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'Escape') close();
  };

  const subtitle =
    status === 'loading'
      ? t('gallery.page.subtitle.loading')
      : status === 'fallback'
      ? t('gallery.page.subtitle.fallback')
      : t('gallery.page.subtitle.loaded').replace('{n}', photos.length);

  return (
    <div className="gallery-page">
      <Navigation />

      <header className="gallery-header">
        <h1 className="gallery-title">{t('gallery.page.title')}</h1>
        <p className="gallery-subtitle">{subtitle}</p>
      </header>

      {status === 'loading' && (
        <div className="gallery-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="gallery-skeleton" />
          ))}
        </div>
      )}

      {status !== 'loading' && (
        <main className="gallery-grid" aria-label="Photo gallery">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              className={`gallery-item${photo.wide ? ' gallery-item--wide' : ''} info-card`}
              onClick={() => setLightbox(idx)}
              aria-label={photo.title || `Photo ${idx + 1}`}
            >
              <img
                src={photo.src}
                alt={photo.title || ''}
                loading="lazy"
                decoding="async"
                className="gallery-item__img"
              />
              {(photo.title || photo.caption) && (
                <div className="gallery-item__overlay">
                  {photo.title && <span className="gallery-item__title">{photo.title}</span>}
                  {photo.caption && <span className="gallery-item__caption">{photo.caption}</span>}
                </div>
              )}
            </button>
          ))}
        </main>
      )}

      {lightbox !== null && (
        <div
          className="gallery-lightbox"
          onClick={close}
          onKeyDown={onKey}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          <button
            className="lb-btn lb-btn--prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label={t('gallery.page.prev')}
          >&#x2039;</button>

          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[lightbox].srcFull || photos[lightbox].src}
              alt={photos[lightbox].title || ''}
              className="lb-img"
            />
            {(photos[lightbox].title || photos[lightbox].caption) && (
              <div className="lb-info">
                {photos[lightbox].title   && <strong>{photos[lightbox].title}</strong>}
                {photos[lightbox].caption && <span>{photos[lightbox].caption}</span>}
              </div>
            )}
          </div>

          <button
            className="lb-btn lb-btn--next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label={t('gallery.page.next')}
          >&#x203A;</button>
          <button
            className="lb-btn lb-btn--close"
            onClick={close}
            aria-label={t('gallery.page.close')}
          >&#x2715;</button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;