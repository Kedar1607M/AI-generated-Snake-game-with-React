import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DUMMY_SONGS, Song } from '../types';

export const MusicPlayer: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('00:00');
  const [durationFormatted, setDurationFormatted] = useState('00:00');
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentSong = DUMMY_SONGS[currentSongIndex];

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    setCurrentSongIndex((prev) => (prev + 1) % DUMMY_SONGS.length);
    setIsPlaying(true);
  };

  const skipBack = () => {
    setCurrentSongIndex((prev) => (prev - 1 + DUMMY_SONGS.length) % DUMMY_SONGS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
    }
  }, [currentSongIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      if (duration) {
        setProgress((currentTime / duration) * 100);
        setCurrentTimeFormatted(formatTime(currentTime));
        setDurationFormatted(formatTime(duration));
      }
    }
  };

  return (
    <div className="flex items-center gap-8 p-4 bg-[#0a0a0a]">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <button 
          onClick={skipBack}
          className="text-[#00f3ff] hover:text-white transition-colors cursor-pointer"
        >
          <SkipBack size={20} fill="currentColor" />
        </button>

        <button 
          onClick={togglePlay}
          className="w-10 h-10 border-2 border-[#00f3ff] flex items-center justify-center text-[#00f3ff] shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:bg-[#00f3ff]/10 active:scale-95 transition-all cursor-pointer"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="translate-x-0.5" fill="currentColor" />}
        </button>

        <button 
          onClick={skipForward}
          className="text-[#00f3ff] hover:text-white transition-colors cursor-pointer"
        >
          <SkipForward size={20} fill="currentColor" />
        </button>
      </div>

      {/* Track Info & Progress */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#00f3ff]">
            SYSTEM_DRIVE: {currentSong.title} // {currentSong.artist}
          </span>
          <span className="text-[10px] text-[#00f3ff]/50 font-mono">
            {currentTimeFormatted} / {durationFormatted}
          </span>
        </div>
        <div className="w-full bg-white/10 h-1 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[#00f3ff] shadow-[0_0_10px_rgba(0,243,255,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
          />
        </div>
      </div>

      {/* Volume Visualizer Mock */}
      <div className="flex items-center gap-4 w-48 hidden md:flex">
        <span className="text-[10px] font-bold text-[#00f3ff] uppercase tracking-tighter">OS_VOLUME</span>
        <div className="flex-1 flex gap-1">
          {[1, 1, 1, 1, 0.2, 0.2].map((op, i) => (
            <div 
              key={i} 
              className="h-3 w-1.5 bg-[#00f3ff]" 
              style={{ opacity: op }}
            />
          ))}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipForward}
      />
    </div>
  );
};

