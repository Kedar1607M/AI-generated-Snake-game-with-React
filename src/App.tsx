/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Trophy, Music, Gamepad2, Github } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore] = useState(48250); // Hardcoded for demo aesthetic

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e0e0e0] font-mono flex flex-col p-6 overflow-hidden">
      {/* Scanline Effect Overlay */}
      <div className="scanline-effect"></div>

      <header className="relative z-10 flex justify-between items-end border-b border-[#00f3ff]/30 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-[#00f3ff] glow-cyan">
            NEON-SNAKE // MEDIA_OS
          </h1>
          <p className="text-[10px] text-[#00f3ff]/60 mt-1 uppercase tracking-[0.2em]">
            System Status: Optimal | Audio: Synchronized
          </p>
        </div>
        <div className="flex gap-8 text-right">
          <div>
            <p className="text-[10px] text-[#ff00ff]/60 uppercase">High Score</p>
            <p className="text-2xl font-bold text-[#ff00ff] glow-pink">{highScore.toString().padStart(7, '0')}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#39ff14]/60 uppercase">Current Score</p>
            <p className="text-2xl font-bold text-[#39ff14] glow-green">{score.toString().padStart(7, '0')}</p>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex gap-6 flex-1 min-h-0">
        {/* Left Sidebar */}
        <section className="w-72 flex flex-col gap-4 overflow-hidden">
          <div className="border border-[#00f3ff]/30 bg-[#0a0a0a] p-4 flex-1 overflow-y-auto custom-scrollbar">
            <h2 className="text-sm font-bold text-[#00f3ff] uppercase mb-6 border-b border-[#00f3ff]/20 pb-2 italic tracking-widest">
              SYSTEM_PLAYLIST
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-[#00f3ff]/10 border-l-2 border-[#00f3ff] cursor-pointer">
                <p className="text-sm font-bold">01. Cybernetic Drift</p>
                <p className="text-[10px] text-gray-500 font-bold">A.I. Generated Beats</p>
              </div>
              <div className="p-3 hover:bg-white/5 border-l-2 border-transparent cursor-pointer group">
                <p className="text-sm font-bold group-hover:text-[#00f3ff]">02. Neon Rainforest</p>
                <p className="text-[10px] text-gray-500 font-bold">Synth-Flora Engine</p>
              </div>
              <div className="p-3 hover:bg-white/5 border-l-2 border-transparent cursor-pointer group">
                <p className="text-sm font-bold group-hover:text-[#00f3ff]">03. Glitch in Reality</p>
                <p className="text-[10px] text-gray-500 font-bold">Neural Waveform v4</p>
              </div>
            </div>
          </div>

          <div className="border border-[#ff00ff]/30 bg-[#0a0a0a] p-4 h-36">
            <h2 className="text-sm font-bold text-[#ff00ff] uppercase mb-4 italic tracking-widest">SYSTEM_DIFFICULTY</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#ff00ff]/80">
                  <span>Speed_Clock</span>
                  <span>1.5x</span>
                </div>
                <div className="w-full bg-white/10 h-1 relative">
                  <div className="absolute top-0 left-0 bg-[#ff00ff] h-full w-2/3 glow-pink"></div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#ff00ff]/80">
                  <span>Growth_Rate</span>
                  <span>Max</span>
                </div>
                <div className="w-full bg-white/10 h-1 relative">
                  <div className="absolute top-0 left-0 bg-[#ff00ff] h-full w-full glow-pink"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Center Game Section */}
        <section className="flex-1 flex flex-col bg-[#0a0a0a] border-x-2 border-t-2 border-[#39ff14]/40 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-8 py-2 border border-[#00f3ff]/40 bg-[#050505] z-20">
             <h2 className="text-2xl font-bold text-[#e0e0e0] uppercase tracking-tighter shadow-lg shadow-black/50">
               Snake Game
             </h2>
          </div>
          <div className="flex-1 flex items-center justify-center p-6 border-b-2 border-[#39ff14]/40">
            <SnakeGame onScoreChange={setScore} />
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-6 border border-[#00f3ff]/30 bg-[#0a0a0a] overflow-hidden">
        <MusicPlayer />
      </footer>
    </div>
  );
}


