import React, { useEffect, useRef } from 'react';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const {
    audioRef,
    currentSong,
    isPlaying,
    volume,
    togglePlay,
    next,
    prev,
    changeVolume,
    analyser,
    dataArray
  } = useMusicPlayer();

  const cdDiskRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    if (!analyser || !dataArray) return;

    let animationId;
    const animateVisualizer = () => {
      animationId = requestAnimationFrame(animateVisualizer);
      analyser.getByteFrequencyData(dataArray);
      
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          const value = dataArray[i];
          const height = Math.max(4, (value / 255) * 100);
          bar.style.height = `${height}%`;
        }
      });
    };

    if (isPlaying) {
      animateVisualizer();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [analyser, dataArray, isPlaying]);

  return (
    <>
      <div id="music-container">
        <img
          ref={cdDiskRef}
          id="cd-disk"
          src="https://i1.sndcdn.com/artworks-dSGst2JiG69GhP9e-2Dw1bQ-t500x500.jpg"
          alt="Album Cover"
          loading="lazy"
          className={isPlaying ? 'playing' : ''}
          onClick={togglePlay}
          onDoubleClick={next}
        />
        <audio ref={audioRef} crossOrigin="anonymous" style={{ display: 'none' }} />
      </div>

      <div id="song-info-box" className={isPlaying ? 'show' : 'hidden'}>
        <p id="song-name">{currentSong.name}</p>
      </div>

      <div id="wave-container">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className="wave-bar"
            ref={(el) => (barsRef.current[i] = el)}
          />
        ))}
      </div>

      <div id="music-controls">
        <label>
          🔊 Volume
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
          />
        </label>
        <div>
          <button onClick={prev}>⏮ Prev</button>
          <button onClick={togglePlay}>⏯ {isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={next}>⏭ Next</button>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
