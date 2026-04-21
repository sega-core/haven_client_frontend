import track1 from '../../assets/tracks/track1.mp3';
import track2 from '../../assets/tracks/track2.mp3';
import track3 from '../../assets/tracks/track3.mp3';

export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  duration: number;
}

export const STATIC_TRACKS: Track[] = [
  { id: 1, title: "Summer Breeze", artist: "Jazz Ensemble", src: track1, duration: 185 },
  { id: 2, title: "Midnight Rain", artist: "Electronic Dreams", src: track2, duration: 220 },
  { id: 3, title: "Mountain Sunrise", artist: "Acoustic Vibes", src: track3, duration: 198 },
];