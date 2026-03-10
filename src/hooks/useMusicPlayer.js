import { useState, useEffect, useRef } from 'react';
import { MEDIA_URLS } from '../config/mediaUrls';

export const useMusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);

  const songs = MEDIA_URLS.songs;
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = volume;

    // Web Audio API setup
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyserNode = ctx.createAnalyser();
    
    if (!window.audioSourceCreated) {
      const source = ctx.createMediaElementSource(audio);
      source.connect(analyserNode);
      analyserNode.connect(ctx.destination);
      window.audioSourceCreated = true;
    }
    
    analyserNode.fftSize = 256;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArr = new Uint8Array(bufferLength);
    
    setAnalyser(analyserNode);
    setDataArray(dataArr);

    const handleEnded = () => {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume, songs.length]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.src = currentSong.src;
      audioRef.current.load();
      audioRef.current.play().catch(console.error);
    }
  }, [currentSongIndex, currentSong, isPlaying]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const next = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const prev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return {
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
  };
};
