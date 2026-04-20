export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

export const DUMMY_SONGS: Song[] = [
  {
    id: '1',
    title: 'Cybernetic Drift',
    artist: 'A.I. Generated Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/cyber/400/400'
  },
  {
    id: '2',
    title: 'Neon Rainforest',
    artist: 'Synth-Flora Engine',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/neon/400/400'
  }   ,
  {
    id: '3',
    title: 'Glitch in Reality',
    artist: 'Neural Waveform v4',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/grid/400/400'
  }
];

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Point {
  x: number;
  y: number;
}
