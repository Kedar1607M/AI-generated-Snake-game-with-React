import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Point, Direction } from '../types';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = 'UP';
const GAME_SPEED = 150;

interface SnakeGameProps {
  onScoreChange: (score: number) => void;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({ onScoreChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    onScoreChange(0);
    setIsGameOver(false);
    setIsPaused(false);
    generateFood(INITIAL_SNAKE);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp': if (directionRef.current !== 'DOWN') setDirection('UP'); break;
      case 'ArrowDown': if (directionRef.current !== 'UP') setDirection('DOWN'); break;
      case 'ArrowLeft': if (directionRef.current !== 'RIGHT') setDirection('LEFT'); break;
      case 'ArrowRight': if (directionRef.current !== 'LEFT') setDirection('RIGHT'); break;
      case ' ': setIsPaused(prev => !prev); break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = { ...head };

        switch (direction) {
          case 'UP': newHead.y -= 1; break;
          case 'DOWN': newHead.y += 1; break;
          case 'LEFT': newHead.x -= 1; break;
          case 'RIGHT': newHead.x += 1; break;
        }

        // Check wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => {
            const next = prev + 10;
            onScoreChange(next);
            return next;
          });
          generateFood(newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [direction, food, isGameOver, isPaused, generateFood, onScoreChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear board
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#39ff1433';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#39ff14' : '#39ff14cc';
      ctx.shadowBlur = index === 0 ? 15 : 5;
      ctx.shadowColor = '#39ff14';
      ctx.beginPath();
      ctx.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
    });

    // Draw food
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff00ff';
    ctx.beginPath();
    ctx.arc((food.x + 0.5) * cellSize, (food.y + 0.5) * cellSize, cellSize / 3, 0, Math.PI * 2);
    ctx.fill();

  }, [snake, food]);

  return (
    <div className="relative group p-1 border-2 border-[#39ff14]/40 bg-[#0a0a0a] shadow-[inset_0_0_40px_rgba(57,255,20,0.05)]">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#39ff14 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
      <div className="relative bg-[#0a0a0a] overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="max-w-full aspect-square"
        />
        
        <AnimatePresence>
          {(isPaused && !isGameOver) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4"
            >
              <h2 className="text-3xl font-black text-[#00f3ff] drop-shadow-[0_0_10px_rgba(0,243,255,0.8)] italic tracking-tighter">SYSTEM_PAUSED</h2>
              <button 
                onClick={() => setIsPaused(false)}
                className="px-6 py-2 border-2 border-[#00f3ff] text-[#00f3ff] font-bold hover:bg-[#00f3ff]/10 transition-colors uppercase cursor-pointer"
              >
                Resume Engine
              </button>
            </motion.div>
          )}

          {isGameOver && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center space-y-6"
            >
              <div className="text-center">
                <h2 className="text-4xl font-black text-[#ff00ff] drop-shadow-[0_0_15px_rgba(255,0,255,0.8)] italic tracking-tighter mb-2">SYSTEM_CRASH</h2>
                <p className="text-[#39ff14] text-xl font-bold uppercase tracking-widest">FINAL SCORE: {score.toString().padStart(7, '0')}</p>
              </div>
              <button 
                onClick={resetGame}
                className="px-8 py-3 border-2 border-[#ff00ff] text-[#ff00ff] font-black uppercase hover:bg-[#ff00ff]/10 shadow-[0_0_20px_rgba(255,0,255,0.3)] transition-all cursor-pointer"
              >
                Reboot System
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-[#39ff14]/60 uppercase tracking-widest px-2 pb-2">
        <span>NAV: ARROW_KEYS</span>
        <span>STATE: SYNCED</span>
      </div>
    </div>
  );
};
