import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDIA_URLS } from '../config/mediaUrls';
import './SplashPage.css';

const SplashPage = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Lock scroll while splash is active, restore when leaving
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.cursor = 'pointer';
    return () => {
      document.body.style.overflow = '';
      document.body.style.cursor = '';
    };
  }, []);

  useEffect(() => {
    // Ensure video plays on mobile devices
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Auto-play prevented:', err);
      });
    }

    // Try to auto-play audio with muted first
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Audio auto-play prevented:', err);
      });
    }
  }, []);

  const handleAudioToggle = (e) => {
    e.stopPropagation();
    
    if (!hasInteracted) {
      audioRef.current.muted = false;
      audioRef.current.play();
      setHasInteracted(true);
      setIsMuted(false);
    } else {
      if (isMuted) {
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  const handleVolumeClick = (e, newVolume) => {
    e.stopPropagation();
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        audioRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const handleSplashClick = () => {
    if (!hasInteracted) {
      audioRef.current.muted = false;
      audioRef.current.play();
      setHasInteracted(true);
      setIsMuted(false);
    } else {
      // Navigate to home page with fade out
      document.getElementById('splash').classList.add('fade-out');
      setTimeout(() => {
        navigate('/home');
      }, 800);
    }
  };

  return (
    <div className="splash-container" id="splash" onClick={handleSplashClick}>
      <video 
        ref={videoRef}
        id="background-video" 
        autoPlay 
        muted 
        loop 
        playsInline
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23000' width='1920' height='1080'/%3E%3C/svg%3E"
      >
        <source src={MEDIA_URLS.splashVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} loop muted autoPlay>
        <source src={MEDIA_URLS.splashAudio} type="audio/mp4" />
      </audio>

      <div className="audio-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="volume-bars-container">
          {[0.16, 0.33, 0.5, 0.66, 0.83, 1].map((level, index) => (
            <div 
              key={index}
              className={`volume-bar ${volume >= level - 0.01 ? 'active' : ''}`}
              style={{ height: `${20 + index * 16}%` }}
              onClick={(e) => handleVolumeClick(e, level)}
              title={`Volume ${Math.round(level * 100)}%`}
            />
          ))}
        </div>
        <div 
          className={`audio-control ${isMuted ? 'muted' : ''}`} 
          id="audio-toggle"
          onClick={handleAudioToggle}
        >
          <svg id="volume-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="crystal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#ffb6d9', stopOpacity:1}}>
                  <animate attributeName="stop-color" values="#ffb6d9;#d8b5e8;#ffc8e8;#ffb6d9" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" style={{stopColor:'#d8b5e8', stopOpacity:1}}>
                  <animate attributeName="stop-color" values="#d8b5e8;#ffc8e8;#ffb6d9;#d8b5e8" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" style={{stopColor:'#ffc8e8', stopOpacity:1}}>
                  <animate attributeName="stop-color" values="#ffc8e8;#ffb6d9;#d8b5e8;#ffc8e8" dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </div>
      </div>

      <div className="overlay"></div>

      <div className="content">
        <h1>Welcome to My Profile</h1>
        <p>✨ Discover my journey ✨</p>
        <div className="click-hint">
          {!hasInteracted ? "Tap anywhere to unmute" : "Click again to enter"}
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
