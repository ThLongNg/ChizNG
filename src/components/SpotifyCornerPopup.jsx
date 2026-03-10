import React, { useState, useEffect, useRef } from 'react';
import './SpotifyCornerPopup.css';

const SPOTIFY_API_URL = '/api/spotify';
const POLL_INTERVAL = 5000;

/**
 * Fixed bottom-left Now Listening widget — always visible, no toggle.
 * Auto-fetches /api/spotify every 5 s.
 */
const SpotifyCornerPopup = () => {
  const [state, setState] = useState('loading'); // 'loading' | 'playing' | 'offline'
  const [track, setTrack] = useState(null);
  const intervalRef = useRef(null);

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch(SPOTIFY_API_URL);
      if (!res.ok) {
        let details = `Error ${res.status}`;
        try { const e = await res.json(); details = e.details || e.error || details; } catch (_) {}
        throw new Error(details);
      }
      const data = await res.json();
      if (data.isPlaying && data.songName) {
        setTrack(data);
        setState('playing');
      } else {
        setTrack(null);
        setState('offline');
      }
    } catch (err) {
      console.error('Spotify fetch error:', err.message);
      setState('offline');
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    intervalRef.current = setInterval(fetchNowPlaying, POLL_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, []);

  const progressPercent =
    track && track.durationMs > 0
      ? (track.progressMs / track.durationMs) * 100
      : 0;

  return (
    <div className="sp-corner">
      {/* Loading */}
      {state === 'loading' && (
        <div className="sp-widget sp-widget--loading">
          <SpotifyIcon />
          <span className="sp-widget__text">Loading...</span>
          <div className="sp-mini-spinner" />
        </div>
      )}

      {/* Offline */}
      {state === 'offline' && (
        <div className="sp-widget sp-widget--offline">
          <SpotifyIcon />
          <span className="sp-widget__text">Offline</span>
        </div>
      )}

      {/* Now Playing */}
      {state === 'playing' && track && (
        <div className="sp-widget sp-widget--playing">
          <img className="sp-widget__art" src={track.albumArtUrl} alt="Album Art" />
          <div className="sp-widget__info">
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sp-widget__song"
              title={track.songName}
            >
              {track.songName}
            </a>
            <p className="sp-widget__artist">{track.artistName}</p>
            <div className="sp-widget__bar">
              <div className="sp-widget__fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SpotifyIcon = () => (
  <svg className="sp-widget__icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.308 128 128 128
         70.697 0 128-57.304 128-128C256 57.314 198.697.006 128 .006L128 0z
         m58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644
         -30.053-18.357-67.886-22.515-112.441-12.335-4.293.979-8.573-1.711
         -9.551-6.006-.979-4.295 1.7-8.575 6.004-9.553
         48.758-11.14 90.582-6.343 124.322 14.277 3.76 2.308 4.952 7.214
         2.641 10.973zm15.667-34.853c-2.889 4.696-9.034 6.179-13.726 3.29
         -34.406-21.149-86.853-27.274-127.549-14.92-5.278 1.594-10.852-1.38
         -12.454-6.648-1.59-5.278 1.386-10.842 6.655-12.447
         46.486-14.105 104.276-7.273 143.787 17.008 4.692 2.889 6.175 9.034
         3.287 13.717zm1.345-36.294C163.148 89.16 95.085 86.907 55.698 98.862
         a16.046 16.046 0 0 1-19.99-10.662 16.04 16.04 0 0 1 10.662-19.99
         c45.214-13.726 120.377-11.074 167.873 17.122 5.701 3.377 7.566 10.724
         4.188 16.406-3.363 5.689-10.73 7.565-16.4 4.187z"
      fill="#1ED760"
    />
  </svg>
);

export default SpotifyCornerPopup;
