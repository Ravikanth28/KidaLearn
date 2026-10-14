import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Award, BookOpen, Check, ChevronLeft, ChevronRight, CircleHelp, Gamepad2, Home as HomeIcon, Menu, RotateCcw, Volume2, VolumeX, X } from 'lucide-react';
import { Illustration, pictureWords, Sparkles } from './illustrations.jsx';

const GAME_PATHS = ['/game/numbers-order', '/game/missing-numbers', '/game/alphabet-order', '/game/missing-letters', '/game/counting', '/game/picture-match', '/game/quantity-match', '/game/more-or-less', '/game/make-number', '/game/add-take-away', '/game/number-patterns', '/game/number-bingo'];
const GAME_CARDS = [
  { path: GAME_PATHS[0], title: 'Number Line-Up', desc: 'Put the numbers in the right order!', kind: 'numbers', icon: 'ball', color: 'peach' },
  { path: GAME_PATHS[1], title: 'Number Detective', desc: 'Find the missing number!', kind: 'missing-number', icon: 'apple', color: 'yellow' },
  { path: GAME_PATHS[2], title: 'Letter Line-Up', desc: 'Help letters find their places!', kind: 'letters', icon: 'butterfly', color: 'lavender' },
  { path: GAME_PATHS[3], title: 'Letter Detective', desc: 'Which letter comes next?', kind: 'missing-letter', icon: 'cat', color: 'pink' },
  { path: GAME_PATHS[4], title: 'Count the Cuties', desc: 'Count all the friendly faces!', kind: 'count', icon: 'strawberry', color: 'mint' },
  { path: GAME_PATHS[5], title: 'Letter Picture Match', desc: 'Match each letter to a picture!', kind: 'match', icon: 'elephant', color: 'blue' },
  { path: GAME_PATHS[6], title: 'Number & Quantity Match', desc: 'Match a number to the matching group!', kind: 'quantity-match', icon: 'apple', color: 'yellow', tag: 'LOOK & MATCH' },
  { path: GAME_PATHS[7], title: 'More or Less?', desc: 'Compare two groups of friendly things!', kind: 'compare', icon: 'turtle', color: 'mint', tag: 'COMPARE' },
  { path: GAME_PATHS[8], title: 'Make the Number', desc: 'Find two groups that make the target!', kind: 'make-number', icon: 'ball', color: 'peach', tag: 'NUMBER BUILDER' },
  { path: GAME_PATHS[9], title: 'Add & Take Away', desc: 'Add or subtract with picture clues!', kind: 'arithmetic', icon: 'strawberry', color: 'pink', tag: 'MATH MAGIC' },
  { path: GAME_PATHS[10], title: 'Number Patterns', desc: 'Spot the pattern and fill the gap!', kind: 'patterns', icon: 'butterfly', color: 'lavender', tag: 'PATTERN PARTY' },
  { path: GAME_PATHS[11], title: 'Number Bingo', desc: 'Find the called number on your board!', kind: 'bingo', icon: 'star', color: 'blue', tag: 'BINGO!' },
];
const BADGES = [
  { id: 'number-explorer', title: 'Number Explorer', desc: 'Play a number game', icon: 'ball', test: p => p.games.numbers > 0 },
  { id: 'alphabet-star', title: 'Alphabet Star', desc: 'Play a letter game', icon: 'butterfly', test: p => p.games.letters > 0 },
  { id: 'counting-champ', title: 'Counting Champion', desc: 'Finish a counting round', icon: 'strawberry', test: p => p.games.count > 0 },
  { id: 'picture-matcher', title: 'Picture Matcher', desc: 'Match a letter and picture', icon: 'cat', test: p => p.games.match > 0 },
  { id: 'little-champion', title: 'Little Learning Champion', desc: 'Earn 20 stars', icon: 'tiger', test: p => p.stars >= 20 },
];
const GREETINGS = ['Amazing!', 'Super star!', 'You did it!', 'Great job!'];
const readProgress = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('kidalearn-progress') || '{}');
    return { stars: Number(saved.stars) || 0, rounds: Number(saved.rounds) || 0, sound: saved.sound !== false, games: { numbers: 0, letters: 0, count: 0, match: 0, ...(saved.games || {}) } };
  } catch {
    return { stars: 0, rounds: 0, sound: true, games: { numbers: 0, letters: 0, count: 0, match: 0 } };
  }
};
const shuffle = items => [...items].sort(() => Math.random() - 0.5);
const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const numberName = n => ({1:'one',2:'two',3:'three',4:'four',5:'five',6:'six',7:'seven',8:'eight',9:'nine',10:'ten',11:'eleven',12:'twelve',13:'thirteen',14:'fourteen',15:'fifteen',16:'sixteen',17:'seventeen',18:'eighteen',19:'nineteen',20:'twenty'})[n] || String(n);
const pluralize = word => word === 'fish' ? word : word.endsWith('y') ? `${word.slice(0, -1)}ies` : `${word}s`;
let lastSpeech = { text: '', time: 0 };
let speechTimer;

function say(text, enabled) {
  if (!enabled || !('speechSynthesis' in window)) return;
  const now = Date.now();
  if (lastSpeech.text === text && now - lastSpeech.time < 700) return;
  lastSpeech = { text, time: now };
  window.speechSynthesis.cancel();
  window.clearTimeout(speechTimer);
  speechTimer = window.setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }, 80);
}

function stopSpeech() {
  window.clearTimeout(speechTimer);
  lastSpeech = { text: '', time: 0 };
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function App() {
  const [progress, setProgress] = useState(readProgress);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    try { localStorage.setItem('kidalearn-progress', JSON.stringify(progress)); } catch { setToast('Progress could not be saved on this device.'); }
  }, [progress]);
  const updateReward = kind => setProgress(old => ({ ...old, stars: old.stars + 1, rounds: old.rounds + 1, games: { ...old.games, [kind]: old.games[kind] + 1 } }));
  const toggleSound = () => {
    if (progress.sound) stopSpeech();
    setProgress(old => ({ ...old, sound: !old.sound }));
  };
  const resetProgress = () => {
    if (window.confirm('Grown-up check: clear all stars and learning progress from this device?')) {
      setProgress(old => ({ stars: 0, rounds: 0, sound: old.sound, games: { numbers: 0, letters: 0, count: 0, match: 0 } }));
    }
  };
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);
  return <div className="app-shell">
    <Header stars={progress.stars} sound={progress.sound} onToggleSound={toggleSound} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <AnimatePresence mode="wait">
      <motion.main key={useLocation().pathname} initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: prefersReducedMotion ? 0 : .22 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/numbers" element={<LearnMode type="numbers" sound={progress.sound} />} />
          <Route path="/alphabets" element={<LearnMode type="letters" sound={progress.sound} />} />
          <Route path="/games/numbers" element={<GameDirectory group="numbers" />} />
          <Route path="/games/alphabets" element={<GameDirectory group="letters" />} />
          <Route path="/game/:gameId" element={<GamePage progress={progress} onReward={updateReward} sound={progress.sound} />} />
          <Route path="/rewards" element={<Rewards progress={progress} resetProgress={resetProgress} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
    <Footer />
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}

function Header({ stars, sound, onToggleSound, menuOpen, setMenuOpen }) {
  const links = [['Home', '/', HomeIcon], ['Numbers', '/numbers', BookOpen], ['Alphabets', '/alphabets', BookOpen], ['Games', '/games/numbers', Gamepad2], ['My Rewards', '/rewards', Award]];
  return <header className="topbar">
    <div className="topbar-inner">
      <Link className="brand" to="/" aria-label="KidaLearn home"><span className="brand-mark"><Illustration type="tiger" size={48} /></span><span><strong>KidaLearn</strong><small>Learn, Play & Grow!</small></span></Link>
      <nav className={`desktop-nav ${menuOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
        {links.map(([label, to, Icon]) => <NavLink key={label} to={to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={17} />{label}</NavLink>)}
      </nav>
      <div className="header-actions">
        <span className="star-pill" aria-label={`${stars} stars`}><span>★</span>{stars}</span>
        <button className="icon-button sound-button" onClick={onToggleSound} aria-label={sound ? 'Turn sound off' : 'Turn sound on'} title={sound ? 'Sound on' : 'Sound off'}>{sound ? <Volume2 size={20} /> : <VolumeX size={20} />}</button>
        <button className="icon-button menu-button" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </div>
  </header>;
}

function Home() {
  const challenge = useMemo(() => Math.ceil(Math.random() * 10), []);
  const prefersReducedMotion = useReducedMotion();
  const cards = [
    { title: 'Learn Numbers', desc: 'Meet numbers 1–20', path: '/numbers', icon: 'apple', color: 'yellow', tag: 'NUMBER FUN' },
    { title: 'Learn Alphabets', desc: 'Explore A to Z', path: '/alphabets', icon: 'butterfly', color: 'lavender', tag: 'ABC ADVENTURE' },
    { title: 'Number Games', desc: 'Play and practise', path: '/games/numbers', icon: 'ball', color: 'peach', tag: 'LET’S PLAY' },
    { title: 'Alphabet Games', desc: 'Letters come alive', path: '/games/alphabets', icon: 'cat', color: 'pink', tag: 'LET’S PLAY' },
    { title: 'Count the Objects', desc: 'Count cute things', path: GAME_PATHS[4], icon: 'strawberry', color: 'mint', tag: 'COUNT ALONG' },
    { title: 'My Rewards', desc: 'See your shiny stars', path: '/rewards', icon: 'tiger', color: 'blue', tag: 'YOUR TROPHY ROOM' },
  ];
  return <div className="page home-page">
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow"><Sparkles /> A little learning goes a long way</div><h1>Big fun for<br /><span>little minds!</span></h1><p>Hey, Little Explorer! Ready to learn something fun?</p><div className="hero-actions"><Link className="button button-primary" to="/games/numbers"><Gamepad2 size={21} /> Let’s Play! <span>→</span></Link><Link className="button button-secondary" to="/numbers"><BookOpen size={20} /> Start Learning</Link></div><div className="hero-note"><span className="tiny-stars">★★★★★</span> Happy learning starts here!</div></div>
      <div className="hero-art"><div className="rainbow" aria-hidden="true"><i/><i/><i/></div><div className="hero-sun"/><div className="cloud cloud-a"/><div className="cloud cloud-b"/><motion.div className="mascot" animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}><Illustration type="tiger" size={242} /><div className="mascot-bubble">Hi, friend! <span>♥</span></div></motion.div><span className="float-star star-a">✦</span><span className="float-star star-b">✧</span><span className="float-star star-c">✦</span><span className="hero-caption">your learning buddy</span></div>
    </section>
    <div className="section-heading"><div><span className="eyebrow">PICK YOUR ADVENTURE</span><h2>What shall we play today?</h2></div><span className="heading-doodle">✿</span></div>
    <section className="learning-grid">{cards.map((card, i) => <LearningCard key={card.title} {...card} index={i} />)}</section>
    <section className="challenge-card"><div className="challenge-illustration"><Illustration type="apple" size={84} /><span>?</span></div><div><span className="eyebrow">TODAY’S LITTLE CHALLENGE</span><h3>Can you find the number {challenge}?</h3><p>A tiny challenge, a giant high-five!</p></div><Link to="/game/missing-numbers" className="button button-coral">I’m ready! <span>→</span></Link></section>
    <section className="parent-note"><span>🧡</span><p>Made for curious kids and their grown-ups. No sign-in, just joyful learning.</p></section>
  </div>;
}

function LearningCard({ title, desc, path, icon, color, tag, index = 0 }) {
  const prefersReducedMotion = useReducedMotion();
  return <motion.div className={`learning-card ${color}`} initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReducedMotion ? 0 : index * .06 }} whileHover={prefersReducedMotion ? undefined : { y: -5 }}><Link to={path} aria-label={`${title}: ${desc}`}><span className="card-tag">{tag || 'LET’S PLAY'}</span><div className="card-illustration"><Illustration type={icon} size={96} /></div><div className="card-copy"><h3>{title}</h3><p>{desc}</p><span className="card-arrow" aria-hidden="true">↗</span></div></Link></motion.div>;
}

function GameDirectory({ group }) {
  const numberKinds = ['numbers', 'missing-number', 'count', 'quantity-match', 'compare', 'make-number', 'arithmetic', 'patterns', 'bingo'];
  const cards = GAME_CARDS.filter(card => group === 'numbers' ? numberKinds.includes(card.kind) : ['letters', 'missing-letter', 'match'].includes(card.kind));
  const warmups = cards.filter(card => ['numbers', 'missing-number', 'count'].includes(card.kind));
  const adventures = cards.filter(card => !['numbers', 'missing-number', 'count'].includes(card.kind));
  if (group !== 'numbers') return <div className="page subpage"><PageIntro kicker="YOUR NEXT ADVENTURE" title="Alphabet Games" text="Pick a game, give it a go, and earn a shiny star!" type="butterfly" /><div className="learning-grid game-card-grid">{cards.map((card, i) => <LearningCard key={card.kind} {...card} index={i} />)}</div><div className="switch-pills"><Link to="/games/numbers">🔢 Number games</Link><Link to="/games/alphabets">🔤 Alphabet games</Link></div></div>;
  return <div className="page subpage number-adventures">
    <section className="number-park-hero"><div className="park-copy"><span className="eyebrow">WELCOME TO YOUR NUMBER PLAYGROUND</span><h1>Number<br/><span>Adventure Park!</span></h1><p>Count, compare, build and discover. Every game is a new way to play with numbers!</p><Link className="button button-primary" to="/game/quantity-match"><Gamepad2 size={20}/> Start an adventure <span>→</span></Link><div className="park-perks"><span>✦ No timers</span><span>✦ Just for fun</span><span>✦ Stars to earn</span></div></div><div className="park-art"><div className="park-sun"/><span className="park-number n-one">1</span><span className="park-number n-two">2</span><span className="park-number n-three">3</span><div className="park-buddy"><Illustration type="tiger" size={190}/></div><Illustration className="park-apple" type="apple" size={66}/><span className="park-cloud">Let’s play! ✨</span></div></section>
    <div className="number-track" aria-label="Number skills to explore"><span>🔢 Count</span><i>→</i><span>👀 Compare</span><i>→</i><span>🧩 Make</span><i>→</i><span>🎉 Celebrate!</span></div>
    <div className="section-heading park-heading"><div><span className="eyebrow">READY, SET, PLAY!</span><h2>Start with a little warm-up</h2><p>Meet the games that make numbers feel easy.</p></div><span className="heading-doodle">✿</span></div>
    <section className="learning-grid game-card-grid">{warmups.map((card, i) => <LearningCard key={card.kind} {...card} index={i} />)}</section>
    <div className="section-heading park-heading"><div><span className="eyebrow">YOUR NEXT BIG DISCOVERY</span><h2>More number adventures!</h2><p>Try a new way to think, notice and play with numbers.</p></div><span className="heading-doodle">✦</span></div>
    <section className="learning-grid game-card-grid">{adventures.map((card, i) => <LearningCard key={card.kind} {...card} index={i} />)}</section>
    <div className="number-encouragement"><Illustration type="tiger" size={68}/><div><strong>Every try makes your brain grow!</strong><p>Take your time, explore the pictures and ask your grown-up to play along.</p></div><Link className="button button-secondary" to="/numbers">Visit Number Garden <BookOpen size={17}/></Link></div>
    <div className="switch-pills"><Link to="/games/numbers">🔢 Number games</Link><Link to="/games/alphabets">🔤 Alphabet games</Link></div>
  </div>;
}

function PageIntro({ kicker, title, text, type = 'tiger' }) {
  return <div className="page-intro"><div><span className="eyebrow">{kicker}</span><h1>{title}</h1><p>{text}</p></div><div className="intro-buddy"><Illustration type={type} size={132} /></div></div>;
}

function LearnMode({ type, sound }) {
  const isNumber = type === 'numbers';
  const entries = isNumber ? Array.from({ length: 20 }, (_, i) => i + 1) : letters;
  const [selected, setSelected] = useState(0);
  const current = entries[selected];
  const wordItem = !isNumber ? pictureWords[selected] : null;
  const choose = index => {
    setSelected(index);
    say(isNumber ? `${numberName(entries[index])}, ${entries[index]}` : `${pictureWords[index][0]} is for ${pictureWords[index][1]}`, sound);
  };
  const move = delta => choose((selected + delta + entries.length) % entries.length);
  return <div className="page subpage"><PageIntro kicker="EXPLORE AT YOUR OWN PACE" title={isNumber ? 'Number Garden' : 'Alphabet Garden'} text={isNumber ? 'Tap a number to meet it. No rush, just explore!' : 'A to Z is full of wonderful things to discover!'} type={isNumber ? 'apple' : 'butterfly'} />
    <div className="learn-layout"><div className="tile-grid" aria-label={isNumber ? 'Numbers 1 to 20' : 'Letters A to Z'}>{entries.map((entry, index) => <button key={entry} onClick={() => choose(index)} className={`learn-tile tile-${index % 6} ${index === selected ? 'selected' : ''}`} aria-pressed={index === selected}>{entry}</button>)}</div>
      <section className="learn-detail" aria-live="polite"><div className="detail-squiggle">✦ ✧ ✦</div>{isNumber ? <><div className="big-learning-number">{current}</div><h2>{numberName(current)}!</h2><p>Let’s count together</p><div className="count-dots">{Array.from({ length: current }, (_, i) => current <= 10 ? <Illustration key={i} type="apple" size={30} label={`Apple ${i + 1}`} /> : <span key={i} className={`dot dot-${i % 5}`} />)}</div></> : <><div className="big-learning-letter">{current}<small>{current.toLowerCase()}</small></div><Illustration type={wordItem[2]} size={110} /><h2>{wordItem[1]}</h2><p>{current} is for {wordItem[1].toLowerCase()}!</p></>}<div className="detail-controls"><button className="round-control" onClick={() => move(-1)} aria-label="Previous"><ChevronLeft /></button><button className="button button-secondary listen-button" onClick={() => say(isNumber ? `${numberName(current)}, ${current}` : `${wordItem[0]} is for ${wordItem[1]}`, sound)}><Volume2 size={18}/> Listen</button><button className="round-control" onClick={() => move(1)} aria-label="Next"><ChevronRight /></button></div></section></div>
  </div>;
}

function GamePage({ progress, onReward, sound }) {
  const { gameId } = useParamsSafe();
  const kindById = { 'numbers-order': 'numbers', 'missing-numbers': 'missing-number', 'alphabet-order': 'letters', 'missing-letters': 'missing-letter', counting: 'count', 'picture-match': 'match', 'quantity-match': 'quantity-match', 'more-or-less': 'compare', 'make-number': 'make-number', 'add-take-away': 'arithmetic', 'number-patterns': 'patterns', 'number-bingo': 'bingo' };
  const kind = kindById[gameId] || 'numbers';
  const meta = GAME_CARDS.find(card => card.kind === kind) || GAME_CARDS[0];
  return <GamePlay key={gameId} kind={kind} title={meta.title} desc={meta.desc} progress={progress} onReward={onReward} sound={sound} />;
}

function useParamsSafe() {
  const location = useLocation();
  return { gameId: location.pathname.split('/').pop() };
}

function GamePlay({ kind, title, desc, progress, onReward, sound }) {
  const navigate = useNavigate();
  const isLetter = kind === 'letters' || kind === 'missing-letter';
  const isAlphabetGame = isLetter || kind === 'match';
  const isOrder = kind === 'numbers' || kind === 'letters';
  const isMissing = kind === 'missing-number' || kind === 'missing-letter';
  const isNumberGame = !isAlphabetGame;
  const nextGamePool = GAME_CARDS.filter(card => isNumberGame ? ['numbers', 'missing-number', 'count', 'quantity-match', 'compare', 'make-number', 'arithmetic', 'patterns', 'bingo'].includes(card.kind) : ['letters', 'missing-letter', 'match'].includes(card.kind));
  const nextGame = nextGamePool[(nextGamePool.findIndex(card => card.kind === kind) + 1) % nextGamePool.length];
  const [round, setRound] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState(null);
  const [slots, setSlots] = useState([]);
  const [tiles, setTiles] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [celebrate, setCelebrate] = useState(false);
  const [wrongOrder, setWrongOrder] = useState(false);
  const [mode, setMode] = useState('missing');
  const [letterCase, setLetterCase] = useState('upper');
  const [range, setRange] = useState('easy');
  const [customStart, setCustomStart] = useState('1');
  const [customEnd, setCustomEnd] = useState('5');
  const [customRange, setCustomRange] = useState({ start: 1, end: 5 });
  const [counted, setCounted] = useState([]);
  const [operation, setOperation] = useState('add');
  const successRef = React.useRef(false);
  const feedbackTimer = React.useRef(null);

  const createRound = (start = customRange.start, end = customRange.end) => {
    window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = null;
    successRef.current = false;
    document.querySelectorAll('.fly-to-slot').forEach(tile => { tile.classList.remove('fly-to-slot'); tile.style.removeProperty('--dx'); tile.style.removeProperty('--dy'); });
    setSelected(null); setFeedback(''); setCelebrate(false); setWrongOrder(false); setCounted([]);
    if (kind === 'numbers' || kind === 'letters') {
      const size = isLetter
        ? (range === 'easy' ? 5 : range === 'medium' ? 8 : 10)
        : range === 'custom' ? end - start + 1 : (range === 'easy' ? 5 : range === 'medium' ? 10 : 20);
      const offset = isLetter ? Math.floor(Math.random() * (27 - size)) : 0;
      const values = Array.from({ length: size }, (_, i) => isLetter ? (letterCase === 'lower' ? letters[offset + i].toLowerCase() : letters[offset + i]) : range === 'custom' ? start + i : i + 1);
      setAnswer(values); setSlots(Array(size).fill(null)); setTiles(shuffle(values));
    } else if (kind === 'missing-number' || kind === 'missing-letter') {
      const alpha = isLetter;
      const max = alpha
        ? (range === 'easy' ? 10 : range === 'medium' ? 18 : 26)
        : (range === 'easy' ? 5 : range === 'medium' ? 10 : 20);
      let values;
      let target;
      if (mode === 'before') {
        const firstShown = alpha
          ? 1 + Math.floor(Math.random() * (max - 3))
          : 2 + Math.floor(Math.random() * (max - 3));
        target = alpha ? (letterCase === 'lower' ? letters[firstShown - 1].toLowerCase() : letters[firstShown - 1]) : firstShown - 1;
        values = [null, ...Array.from({ length: 3 }, (_, i) => alpha ? (letterCase === 'lower' ? letters[firstShown + i].toLowerCase() : letters[firstShown + i]) : firstShown + i)];
      } else {
        const start = alpha ? Math.floor(Math.random() * (max - 3)) : 1 + Math.floor(Math.random() * (max - 3));
        values = Array.from({ length: 4 }, (_, i) => alpha ? (letterCase === 'lower' ? letters[start + i].toLowerCase() : letters[start + i]) : start + i);
        const hole = mode === 'next' ? 3 : Math.floor(Math.random() * 4);
        target = values[hole];
        values[hole] = null;
      }
      setQuestion({ values, target, mode });
      const targetIndex = alpha ? letters.indexOf(String(target).toUpperCase()) : Number(target);
      const distractors = alpha
        ? letters.filter((_, index) => index !== targetIndex).sort((a, b) => Math.abs(letters.indexOf(a) - targetIndex) - Math.abs(letters.indexOf(b) - targetIndex)).slice(0, 3).map(value => letterCase === 'lower' ? value.toLowerCase() : value)
        : shuffle(Array.from({ length: max }, (_, index) => index + 1).filter(value => value !== Number(target))).slice(0, 3);
      setTiles(shuffle([target, ...distractors]));
      setAnswer(target);
    } else if (kind === 'count') {
      const list = ['apple', 'banana', 'orange', 'strawberry', 'ball', 'cat', 'tiger', 'fish', 'butterfly', 'flower', 'star', 'car', 'monkey', 'rabbit'];
      const object = list[Math.floor(Math.random() * list.length)];
      const maxQuantity = range === 'hard' ? 15 : range === 'medium' ? 12 : 10;
      const quantity = 1 + Math.floor(Math.random() * maxQuantity);
      setQuestion({ object, quantity });
      setAnswer(quantity);
      setTiles(shuffle([quantity, ...shuffle(Array.from({ length: maxQuantity }, (_, index) => index + 1).filter(value => value !== quantity)).slice(0, 3)]));
    } else if (kind === 'quantity-match') {
      const list = ['apple', 'banana', 'orange', 'strawberry', 'ball', 'cat', 'fish', 'flower', 'star', 'car', 'tiger', 'rabbit'];
      const object = list[Math.floor(Math.random() * list.length)];
      const maxQuantity = range === 'hard' ? 20 : range === 'medium' ? 10 : 5;
      const quantity = 1 + Math.floor(Math.random() * maxQuantity);
      setQuestion({ object, quantity });
      setAnswer(quantity);
      setTiles(shuffle([quantity, ...shuffle(Array.from({ length: maxQuantity }, (_, index) => index + 1).filter(value => value !== quantity)).slice(0, 3)]));
    } else if (kind === 'compare') {
      const object = ['apple', 'ball', 'fish', 'flower', 'star'][Math.floor(Math.random() * 5)];
      const task = ['more', 'fewer', 'same'][Math.floor(Math.random() * 3)];
      const maxQuantity = range === 'hard' ? 15 : range === 'medium' ? 10 : 6;
      const left = task === 'more'
        ? 2 + Math.floor(Math.random() * (maxQuantity - 1))
        : task === 'fewer'
          ? 1 + Math.floor(Math.random() * (maxQuantity - 1))
          : 1 + Math.floor(Math.random() * maxQuantity);
      const right = task === 'same' ? left : task === 'more' ? 1 + Math.floor(Math.random() * (left - 1)) : left + 1 + Math.floor(Math.random() * (maxQuantity - left));
      setQuestion({ object, left, right, task });
      setAnswer(task === 'same' ? 'same' : task === 'more' ? (left > right ? 'left' : 'right') : (left < right ? 'left' : 'right'));
      setTiles(['left', 'right', 'same']);
    } else if (kind === 'make-number') {
      const maxTarget = range === 'hard' ? 20 : range === 'medium' ? 12 : 8;
      const target = 3 + Math.floor(Math.random() * (maxTarget - 2));
      const correctPair = { a: 1 + Math.floor(Math.random() * (target - 1)), b: 0, id: '' };
      correctPair.b = target - correctPair.a;
      correctPair.id = `${correctPair.a}+${correctPair.b}`;
      const decoys = [];
      const maxPart = range === 'easy' ? 5 : range === 'medium' ? 8 : 12;
      while (decoys.length < 3) {
        const a = 1 + Math.floor(Math.random() * maxPart);
        const b = 1 + Math.floor(Math.random() * maxPart);
        const pair = { a, b, id: `${a}+${b}` };
        if (a + b !== target && !decoys.some(item => item.id === pair.id)) decoys.push(pair);
      }
      const options = shuffle([correctPair, ...decoys]);
      setQuestion({ target, options });
      setAnswer(correctPair.id);
      setTiles(options.map(item => item.id));
    } else if (kind === 'arithmetic') {
      const max = range === 'hard' ? 20 : range === 'medium' ? 10 : 5;
      const a = 1 + Math.floor(Math.random() * max);
      const b = 1 + Math.floor(Math.random() * max);
      const subtract = operation === 'subtract';
      const left = subtract ? Math.max(a, b) : a;
      const right = subtract ? Math.min(a, b) : b;
      const result = subtract ? left - right : left + right;
      const object = ['apple', 'ball', 'star', 'strawberry'][Math.floor(Math.random() * 4)];
      setQuestion({ a: left, b: right, result, op: subtract ? '-' : '+', object });
      setAnswer(result);
      const largestAnswer = subtract ? max : max * 2;
      const distractors = shuffle(Array.from({ length: largestAnswer + 1 }, (_, index) => index).filter(value => value !== result)).slice(0, 3);
      setTiles(shuffle([result, ...distractors]));
    } else if (kind === 'patterns') {
      const stepOptions = range === 'easy' ? [1, 2] : range === 'medium' ? [2, 5] : [5, 10];
      const step = stepOptions[Math.floor(Math.random() * stepOptions.length)];
      const max = range === 'hard' ? 100 : range === 'medium' ? 50 : 20;
      const base = 1 + Math.floor(Math.random() * Math.max(1, max - step * 4));
      const values = Array.from({ length: 5 }, (_, index) => base + step * index);
      const target = values[4];
      values[4] = null;
      setQuestion({ values, step });
      setAnswer(target);
      setTiles(shuffle([target, ...shuffle(Array.from({ length: max }, (_, index) => index + 1).filter(value => value !== target)).slice(0, 3)]));
    } else if (kind === 'bingo') {
      const max = range === 'hard' ? 100 : range === 'medium' ? 50 : 20;
      const target = 1 + Math.floor(Math.random() * max);
      const board = shuffle([target, ...shuffle(Array.from({ length: max }, (_, index) => index + 1).filter(value => value !== target)).slice(0, 8)]);
      setQuestion({ target, board, max });
      setAnswer(target);
    } else if (kind === 'match') {
      const letterLimit = range === 'easy' ? 7 : range === 'medium' ? 14 : pictureWords.length;
      const availableWords = pictureWords.slice(0, letterLimit);
      const candidates = shuffle(availableWords).slice(0, 4);
      const target = candidates[Math.floor(Math.random() * candidates.length)];
      setQuestion({ target, options: shuffle([target, ...availableWords.filter(item => item[0] !== target[0]).slice(0, 3)]) });
      setAnswer(target[0]);
    }
  };

  useEffect(() => { createRound(); }, [kind, range, mode, letterCase, operation]);
  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);
  const customStartNumber = Number(customStart);
  const customEndNumber = Number(customEnd);
  const customRangeValid = customStart.trim() !== '' && customEnd.trim() !== ''
    && Number.isInteger(customStartNumber) && Number.isInteger(customEndNumber)
    && customStartNumber >= 0 && customEndNumber <= 100
    && customEndNumber > customStartNumber && customEndNumber - customStartNumber < 10;
  const applyCustomRange = () => {
    if (!customRangeValid) return;
    const nextRange = { start: customStartNumber, end: customEndNumber };
    setCustomRange(nextRange);
    createRound(nextRange.start, nextRange.end);
  };
  const showRetryFeedback = (message, isWrongOrder = false) => {
    window.clearTimeout(feedbackTimer.current);
    setWrongOrder(isWrongOrder);
    setFeedback(message);
    feedbackTimer.current = window.setTimeout(() => {
      setFeedback('');
      setWrongOrder(false);
      feedbackTimer.current = null;
    }, isWrongOrder ? 1000 : 1100);
  };
  const award = () => {
    if (successRef.current) return;
    successRef.current = true;
    setFeedback(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
    setCelebrate(true);
    setCorrect(value => value + 1);
    onReward(isLetter ? 'letters' : kind === 'count' ? 'count' : kind === 'match' ? 'match' : 'numbers');
  };
  const flyToSlot = value => {
    if (!isMissing) return;
    const tile = document.querySelector(`.answer-tile[data-value="${value}"]`);
    const slot = document.querySelector('.missing-slot');
    if (!tile || !slot) return;
    const a = tile.getBoundingClientRect(), b = slot.getBoundingClientRect();
    tile.style.setProperty('--dx', `${b.left + b.width / 2 - a.left - a.width / 2}px`);
    tile.style.setProperty('--dy', `${b.top + b.height / 2 - a.top - a.height / 2}px`);
    tile.classList.add('fly-to-slot');
  };
  const checkAnswer = value => {
    if (feedback) return;
    if (String(value) === String(answer)) { flyToSlot(value); award(); }
    else { showRetryFeedback('Almost! Try one more time!'); say('Almost, try again!', sound); }
  };
  const nextRound = () => { setRound(value => value + 1); createRound(); };
  const placeTile = (value, slot) => {
    if (feedback) return;
    const copy = [...slots];
    const oldSlot = copy.indexOf(value);
    if (oldSlot >= 0) copy[oldSlot] = null;
    copy[slot] = value;
    setSlots(copy);
    if (copy.every((item, index) => item === answer[index])) award();
    else if (copy.every(item => item !== null)) {
      showRetryFeedback(kind === 'numbers' ? 'Oops! Let’s try a new order!' : 'Almost! Try switching a couple of tiles!', kind === 'numbers');
    }
  };
  const dragStart = (event, value) => event.dataTransfer.setData('text/plain', String(value));
  const dragDrop = (event, slot) => { event.preventDefault(); const value = event.dataTransfer.getData('text/plain'); const matched = tiles.find(tile => String(tile) === value); if (matched !== undefined) placeTile(matched, slot); };
  const speakPrompt = () => {
    if (kind === 'count' && question) say(`How many ${pluralize(question.object)} can you see?`, sound);
    else if (kind === 'quantity-match' && question) say(`Look at the ${question.quantity} ${pluralize(question.object)}. Find the number that matches!`, sound);
    else if (kind === 'compare' && question) say(`Which group has ${question.task === 'fewer' ? 'fewer' : question.task === 'same' ? 'the same number of' : 'more'} ${pluralize(question.object)}?`, sound);
    else if (kind === 'make-number' && question) say(`Which two numbers make ${question.target}?`, sound);
    else if (kind === 'arithmetic' && question) say(`${question.a} ${question.op === '+' ? 'plus' : 'take away'} ${question.b} equals what?`, sound);
    else if (kind === 'patterns' && question) say(`Find the missing number: ${question.values.map(value => value ?? 'blank').join(', ')}`, sound);
    else if (kind === 'bingo' && question) say(`Number ${question.target}! Find it on your bingo board!`, sound);
    else if (kind === 'match' && question) say(`${question.target[0]} is for ${question.target[1]}. Which picture starts with ${question.target[0]}?`, sound);
    else if (isMissing && question) say(`${mode === 'before' ? 'What comes before' : mode === 'next' ? 'What comes next' : isLetter ? 'Which letter is missing' : 'Which number is missing'}? ${question.values.map(value => value ?? 'blank').join(', ')}`, sound);
    else say(isLetter ? 'Put the letters in order!' : 'Put the numbers in order!', sound);
  };

  return <div className={`page subpage game-page ${wrongOrder ? 'order-wrong' : ''}`}>
    <div className="game-back-row"><button className="text-back" onClick={() => navigate(isAlphabetGame ? '/games/alphabets' : '/games/numbers')}><ChevronLeft size={18}/> All {isAlphabetGame ? 'alphabet' : 'number'} games</button><div className="game-progress-chip"><span>★</span> {progress.stars} stars</div></div>
    <div className="game-heading"><div><span className="eyebrow">GAME {round} · LET’S DO THIS!</span><h1>{title}</h1><p>{desc}</p></div><Illustration type={kind === 'letters' || kind === 'missing-letter' || kind === 'match' ? 'butterfly' : kind === 'count' || kind === 'quantity-match' ? 'strawberry' : kind === 'compare' ? 'turtle' : kind === 'bingo' ? 'star' : 'tiger'} size={90}/></div>
    <section className="game-board">
      <div className="game-settings">
        <label>Level <select value={range} onChange={e => setRange(e.target.value)}><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>{kind === 'numbers' && <option value="custom">Custom range</option>}</select></label>
        {kind === 'numbers' && range === 'custom' && <div className="custom-number-range">
          <label>From <input type="number" min="0" max="100" step="1" value={customStart} onChange={e => setCustomStart(e.target.value)} aria-label="Starting number"/></label>
          <label>To <input type="number" min="0" max="100" step="1" value={customEnd} onChange={e => setCustomEnd(e.target.value)} aria-label="Ending number"/></label>
          <button className="button button-primary custom-range-apply" type="button" onClick={applyCustomRange} disabled={!customRangeValid}>Make my number line</button>
          <span className={`custom-range-hint ${customRangeValid ? '' : 'invalid'}`} role="status">{customRangeValid ? 'Choose 2–10 numbers, from 0 to 100.' : 'Pick whole numbers: end after start, with up to 10 numbers.'}</span>
        </div>}
        {isMissing && <div className="mode-pills" role="tablist" aria-label="Game mode">{[['missing','🔍','Find the missing'],['next','➡️','Next number'],['before','⬅️','Previous number']].map(([key, icon, label]) => <button key={key} type="button" role="tab" aria-selected={mode === key} className={`mode-pill ${mode === key ? 'active' : ''}`} onClick={() => setMode(key)}><span>{icon}</span>{isLetter && key !== 'missing' ? label.replace('number', 'letter') : label}</button>)}</div>}
        {isLetter && <label>Letters <select value={letterCase} onChange={e => setLetterCase(e.target.value)}><option value="upper">Uppercase</option><option value="lower">Lowercase</option></select></label>}
        {kind === 'arithmetic' && <label>Operation <select value={operation} onChange={e => setOperation(e.target.value)}><option value="add">Add</option><option value="subtract">Take away</option></select></label>}
        <button className="reset-link" onClick={createRound}><RotateCcw size={16}/> Start over</button>
      </div>
      <div className="round-progress"><span>Round {round}</span><div><i style={{ width: `${Math.min(100, correct * 10)}%` }}/></div><span>{correct} stars earned</span></div>
      <div className="prompt-wrap">
        {isOrder && <><h2>{isLetter ? 'Put the letters in order!' : 'Put the numbers in order!'}</h2><p>Tap a tile, then tap its spot — or drag it there!</p><button className="listen-again" onClick={speakPrompt}><Volume2 size={17}/> Listen to instructions</button><div className="sequence-slots">{slots.map((value, index) => <button key={index} disabled={Boolean(feedback)} onClick={() => { if (feedback) return; if (selected !== null) { placeTile(selected, index); setSelected(null); } else if (value !== null) setSlots(old => old.map((item, i) => i === index ? null : item)); }} onDragOver={e => e.preventDefault()} onDrop={e => dragDrop(e, index)} className={`sequence-slot ${value !== null ? 'filled' : ''}`} aria-label={`Position ${index + 1}${value === null ? ', empty' : `, ${value}`}`}>{value ?? <span>{index + 1}</span>}</button>)}</div><div className="answer-tiles">{tiles.filter(tile => !slots.includes(tile)).map((value, index) => <button key={value} disabled={Boolean(feedback)} draggable={!feedback} onDragStart={e => dragStart(e, value)} onClick={() => { if (feedback) return; if (selected === null) setSelected(value); else { const empty = slots.indexOf(null); if (empty >= 0) placeTile(selected, empty); setSelected(null); } }} className={`answer-tile tile-${index % 6} ${selected === value ? 'picked' : ''}`} aria-label={`Choose ${value}`}>{value}</button>)}</div>{selected !== null && <p className="tiny-hint">Now tap an empty spot for {selected}!</p>}</>}
        {isMissing && question && <><h2>{mode === 'next' ? 'What comes next?' : mode === 'before' ? 'What comes before?' : isLetter ? 'Which letter is missing?' : 'Which number is missing?'}</h2><p>Choose the tile that completes the pattern!</p><button className="listen-again" onClick={speakPrompt}><Volume2 size={17}/> Listen to instructions</button><div className="sequence-slots missing-sequence">{question.values.map((value, index) => value === null ? <button key={index} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); checkAnswer(e.dataTransfer.getData('text/plain')); }} className="sequence-slot missing-slot" aria-label="Drop the missing answer here">{celebrate ? <span className="slot-landed">{answer}</span> : '?'}</button> : <div key={index} className="sequence-slot filled">{value}</div>)}</div><div className="answer-tiles choice-tiles">{tiles.map((value, index) => <button key={value} data-value={value} draggable onDragStart={e => dragStart(e, value)} onClick={() => checkAnswer(value)} className={`answer-tile tile-${index % 6}`}>{value}</button>)}</div></>}
        {kind === 'count' && question && <><h2>How many {pluralize(question.object)} can you see?</h2><p>Tap each one as you count, then choose your answer!</p><button className="listen-again" onClick={speakPrompt}><Volume2 size={17}/> Listen to the question</button><div className="counting-pictures">{Array.from({ length: question.quantity }, (_, index) => <button key={index} className={`counting-picture ${counted.includes(index) ? 'counted' : ''}`} onClick={() => setCounted(old => old.includes(index) ? old : [...old, index])} aria-label={`Count ${question.object} ${index + 1}`}><Illustration type={question.object} size={62}/></button>)}</div><div className="answer-tiles choice-tiles">{tiles.map((value, index) => <button key={value} onClick={() => checkAnswer(value)} className={`answer-tile tile-${index % 6}`}>{value}</button>)}</div></>}
        {kind === 'quantity-match' && question && <><h2>Find the number for this group!</h2><p>Count the pictures, then choose their number.</p><button className="listen-again" onClick={speakPrompt}><Volume2 size={17}/> Listen to the clue</button><div className="counting-pictures match-quantity-pictures">{Array.from({ length: question.quantity }, (_, index) => <div key={index} className="counting-picture"><Illustration type={question.object} size={62}/></div>)}</div><div className="answer-tiles choice-tiles">{tiles.map((value, index) => <button key={value} onClick={() => checkAnswer(value)} className={`answer-tile tile-${index % 6}`}>{value}</button>)}</div></>}
        {kind === 'compare' && question && <><h2>{question.task === 'more' ? 'Which group has more?' : question.task === 'fewer' ? 'Which group has fewer?' : 'Which groups have the same amount?'}</h2><p>{question.task === 'same' ? 'Tap either group — they have the same amount!' : 'Tap the group with fewer or more pictures!'}</p><button className="listen-again" onClick={speakPrompt}><Volume2 size={17}/> Listen to the question</button><div className="compare-groups">{[['left', question.left], ['right', question.right]].map(([side, total], index) => <button key={side} type="button" onClick={() => checkAnswer(question.task === 'same' ? 'same' : side)} className={`compare-plate plate-${index}`} aria-label={`Group ${side === 'left' ? 'A' : 'B'}, ${total} ${pluralize(question.object)}`}><span className="plate-label">{side === 'left' ? 'A' : 'B'}</span><span className="plate-items">{Array.from({ length: total }, (_, item) => <Illustration key={item} type={question.object} size={48}/>)}</span></button>)}</div></>}
        {kind === 'make-number' && question && <><h2>Can you build {question.target}?</h2><p>Choose two number friends that join together to make the target!</p><button className="listen-again" onClick={speakPrompt}><Volume2 size={17}/> Hear the target</button><div className="target-number"><span>MAKE</span><strong>{question.target}</strong></div><div className="equation-options">{question.options.map((pair, index) => <button key={pair.id} className={`equation-choice tile-${index % 6}`} onClick={() => checkAnswer(pair.id)}><span className="equation-dots">{Array.from({ length: pair.a }, (_, dot) => <i key={`a${dot}`}/>)}<b>+</b>{Array.from({ length: pair.b }, (_, dot) => <i key={`b${dot}`}/>)}</span><strong>{pair.a} + {pair.b}</strong></button>)}</div></>}
        {kind === 'arithmetic' && question && <><h2>Let’s do some math magic!</h2><p>Count the pictures and solve the number sentence.</p><button className="listen-again" onClick={speakPrompt}><Volume2 size={17}/> Listen to the sum</button><div className="math-picture-groups"><div className="math-object-row">{Array.from({ length: question.a }, (_, index) => <span key={index} className={`math-piece ${question.op === '-' && index >= question.result ? 'removed-piece' : ''}`}><Illustration type={question.object} size={47}/>{question.op === '-' && index >= question.result && <i aria-hidden="true"/>}</span>)}</div>{question.op === '+' && <><span className="math-symbol">+</span><div className="math-object-row">{Array.from({ length: question.b }, (_, index) => <span key={index} className="math-piece"><Illustration type={question.object} size={47}/></span>)}</div></>}<span className="math-symbol">= ?</span></div><div className="math-equation">{question.a} {question.op === '+' ? '+' : '−'} {question.b} = <strong>?</strong></div><div className="answer-tiles choice-tiles">{tiles.map((value, index) => <button key={value} onClick={() => checkAnswer(value)} className={`answer-tile tile-${index % 6}`}>{value}</button>)}</div></>}
        {kind === 'patterns' && question && <><h2>What number comes next in the pattern?</h2><p>Look at how the numbers are hopping along!</p><button className="listen-again" onClick={speakPrompt}><Volume2 size={17}/> Listen to the pattern</button><div className="number-pattern">{question.values.map((value, index) => value === null ? <span className="pattern-missing" key={index}>?</span> : <span className={`pattern-number tile-${index % 6}`} key={index}>{value}</span>)}</div><span className="hop-hint">Each hop adds {question.step} ✨</span><div className="answer-tiles choice-tiles">{tiles.map((value, index) => <button key={value} onClick={() => checkAnswer(value)} className={`answer-tile tile-${index % 6}`}>{value}</button>)}</div></>}
        {kind === 'bingo' && question && <><h2>Find number {question.target}!</h2><p>Can you spot it on your bingo board?</p><button className="listen-again" onClick={speakPrompt}><Volume2 size={17}/> Call my number</button><div className="bingo-board" aria-label="Number bingo board">{question.board.map((value, index) => <button key={value} onClick={() => checkAnswer(value)} className={`bingo-number tile-${index % 6}`} aria-label={`Bingo number ${value}`}>{value}</button>)}</div></>}
        {kind === 'match' && question && <><h2>Which picture starts with “{question.target[0]}”?</h2><p>Listen and find the {question.target[1].toLowerCase()}!</p><button className="listen-again" onClick={speakPrompt}><Volume2 size={17}/> Listen again</button><div className="match-options">{question.options.map(([letter, word, image], index) => <button key={letter} onClick={() => checkAnswer(letter)} className={`match-option option-${index}`}><Illustration type={image} size={82}/><strong>{word}</strong></button>)}</div></>}
      </div>
      {celebrate && <div className="correct-popup" aria-hidden="true"><div className="popup-confetti">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ '--x': `${(i * 37) % 100}%`, '--d': `${(i % 6) * 0.12}s`, '--c': ['#ff7a8a','#ffd45c','#7ed6a5','#7fc4ff','#c39bff'][i % 5], '--r': `${i * 47}deg` }}/>)}</div><div className="popup-card"><div className="popup-rays"/><div className="popup-character"><Illustration type="tiger" size={120}/></div><div className="popup-title">{'Correct!'.split('').map((ch, i) => <span key={i} style={{ '--n': i }}>{ch}</span>)}</div><div className="popup-sub">{isMissing && answer !== undefined ? `${answer} fits perfectly!` : 'Great job!'}</div><div className="popup-stars"><b>⭐</b><b>⭐</b><b>⭐</b></div></div></div>}
      <div className={`feedback ${feedback ? (celebrate ? 'positive' : 'gentle') : ''}`} aria-live="polite">{feedback && <><span>{celebrate ? '✨' : '💛'}</span>{feedback}{celebrate && <span> ✨</span>}</>}</div>
      {celebrate && <div className="game-actions"><button className="button button-primary" onClick={nextRound}>Next round <ChevronRight size={19}/></button><Link className="button button-secondary" to={nextGame.path}>Next game <Gamepad2 size={17}/></Link><Link className="button button-secondary" to="/rewards">See my stars</Link></div>}
    </section>
    <div className="game-footnote"><CircleHelp size={17}/> No hurry! Take your time and have fun.</div>
  </div>;
}

function Rewards({ progress, resetProgress }) {
  const unlocked = BADGES.filter(badge => badge.test(progress));
  return <div className="page subpage rewards-page"><PageIntro kicker="YOUR TROPHY ROOM" title="Look at you, superstar!" text="Every little step is something to celebrate. Keep shining!" type="tiger" />
    <div className="reward-summary"><div className="trophy-art"><Illustration type="tiger" size={130}/><span>★</span></div><div><span className="eyebrow">YOUR BRIGHT & SHINY TOTAL</span><div className="star-total">{progress.stars}<span>★</span></div><p>{progress.rounds} happy {progress.rounds === 1 ? 'round' : 'rounds'} completed</p></div></div>
    <div className="section-heading badge-heading"><div><span className="eyebrow">COLLECT THEM ALL</span><h2>Your lovely badges</h2></div><span className="badge-count">{unlocked.length} / {BADGES.length} unlocked</span></div>
    <div className="badge-grid">{BADGES.map((badge, index) => { const active = badge.test(progress); return <div className={`badge-card ${active ? 'unlocked' : 'locked'}`} key={badge.id}><div className="badge-icon"><Illustration type={badge.icon} size={72}/>{active && <span><Check size={14}/></span>}</div><h3>{badge.title}</h3><p>{active ? badge.desc + ' — you did it!' : badge.desc}</p><div className="badge-status">{active ? '✦ UNLOCKED ✦' : '✧ KEEP PLAYING ✧'}</div></div>; })}</div>
    <div className="progress-note"><Award size={22}/><p>You’ve played <strong>{progress.rounds}</strong> rounds and earned <strong>{progress.stars}</strong> stars. Every game is a new chance to grow!</p></div>
    <button className="reset-progress" onClick={resetProgress}>Grown-ups: reset learning progress</button>
  </div>;
}

function Footer() {
  return <footer className="footer"><Link to="/" className="footer-brand"><Illustration type="tiger" size={36}/> KidaLearn</Link><span>Little steps, big discoveries <span>✦</span></span><span>Made with <span>♥</span> for curious kids</span></footer>;
}

export default App;


