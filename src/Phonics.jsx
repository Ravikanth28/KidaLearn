import { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';

export const PHONICS = [
  ['A', 'apple', '🍎', 'aah'], ['B', 'bed', '🛏️', 'buh'], ['C', 'candy', '🍬', 'kuh'], ['D', 'desk', '🪑', 'duh'],
  ['E', 'egg', '🥚', 'eh'], ['F', 'fan', '🪭', 'fuh'], ['G', 'gorilla', '🦍', 'guh'], ['H', 'hand', '✋', 'huh'],
  ['I', 'igloo', '🏠', 'ih'], ['J', 'jacket', '🧥', 'juh'], ['K', 'kangaroo', '🦘', 'kuh'], ['L', 'lamp', '💡', 'luh'],
  ['M', 'monkey', '🐵', 'muh'], ['N', 'nose', '👃', 'nuh'], ['O', 'octopus', '🐙', 'aw'], ['P', 'panda', '🐼', 'puh'],
  ['Q', 'queen', '👑', 'kwuh'], ['R', 'rabbit', '🐰', 'ruh'], ['S', 'sun', '☀️', 'suh'], ['T', 'table', '🍽️', 'tuh'],
  ['U', 'umbrella', '☂️', 'uh'], ['V', 'van', '🚐', 'vuh'], ['W', 'watch', '⌚', 'wuh'], ['X', 'box', '📦', 'ks'],
  ['Y', 'yacht', '⛵', 'yuh'], ['Z', 'zebra', '🦓', 'zuh'],
];

const base = `${import.meta.env.BASE_URL}audio/phonics/`;
const SEQUENCE = ['name', 'sound', 'word'];
const fileFor = (letter, kind) => `${base}${letter.toLowerCase()}${kind === 'sound' ? '' : `-${kind}`}.mp3`;

export default function Phonics({ sound }) {
  const [active, setActive] = useState(null);
  const audioRef = useRef(null);
  const runRef = useRef(0);

  const stop = () => {
    runRef.current += 1;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  useEffect(() => stop, []);

  // Plays a recorded clip; resolves false when the file is missing so the caller can fall back.
  const playClip = url => new Promise(resolve => {
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => resolve(true);
    audio.onerror = () => resolve(false);
    audio.play().catch(() => resolve(false));
  });

  const speakFallback = text => new Promise(resolve => {
    if (!('speechSynthesis' in window)) return resolve();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.7;
    u.onend = resolve;
    u.onerror = resolve;
    window.speechSynthesis.speak(u);
  });

  const play = async (entry, kinds = SEQUENCE) => {
    const [letter, word, , hint] = entry;
    stop();
    setActive(letter);
    const run = runRef.current;
    const fallback = { name: letter, sound: hint, word: `${letter} for ${word}` };
    for (const kind of kinds) {
      if (!sound || run !== runRef.current) break;
      const ok = await playClip(fileFor(letter, kind));
      if (!ok && run === runRef.current) await speakFallback(fallback[kind]);
    }
    if (run === runRef.current) setActive(null);
  };

  return <div className="page subpage phonics-page">
    <section className="phonics-intro">
      <span className="eyebrow">LISTEN AND LEARN</span>
      <h1>Phonics <span>Sounds</span></h1>
      <p>Tap a letter to hear its name, its sound and a word that starts with it.</p>
      {!sound && <p className="phonics-muted">Sound is off. Turn it on using the speaker button at the top.</p>}
    </section>
    <section className="phonics-grid" aria-label="Alphabet phonics">
      {PHONICS.map(entry => {
        const [letter, word, emoji] = entry;
        return <button key={letter} type="button" className={`phonics-card ${active === letter ? 'playing' : ''}`} onClick={() => play(entry)} aria-label={`${letter} for ${word}. Tap to hear the letter, sound and word`}>
          <span className="phonics-letter">{letter}<small>{letter.toLowerCase()}</small></span>
          <span className="phonics-emoji" aria-hidden="true">{emoji}</span>
          <span className="phonics-word">{word}</span>
          <Volume2 size={18} aria-hidden="true" />
        </button>;
      })}
    </section>
  </div>;
}
