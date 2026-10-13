import React from 'react';

const palettes = {
  apple: ['#ff6b72', '#52b788'],
  ball: ['#ff9f43', '#feca57'],
  cat: ['#f7b267', '#805b46'],
  dog: ['#d99a69', '#704d36'],
  elephant: ['#91c9df', '#628da2'],
  fish: ['#63c7d8', '#ff8a65'],
  giraffe: ['#f8c35b', '#bd7835'],
  monkey: ['#bc865e', '#80543f'],
  rabbit: ['#fff0df', '#ea9eb0'],
  flower: ['#ff85b3', '#ffd166'],
  banana: ['#ffd34e', '#f2a900'],
  orange: ['#ff9c45', '#e66a25'],
  strawberry: ['#fa6c7a', '#4ba86b'],
  butterfly: ['#b79ced', '#f582ae'],
  star: ['#ffd34e', '#ffab5e'],
  car: ['#7f9cf5', '#ed6a75'],
  tiger: ['#ffad56', '#663f2d'],
  applepie: ['#e7a36a', '#9d6741'],
  house: ['#ff9f8e', '#86c5a1'],
  kite: ['#c5a5ff', '#ff7e9d'],
  moon: ['#ffe27a', '#f5b95e'],
  nest: ['#84c99b', '#a36b45'],
  owl: ['#bc9a7a', '#705444'],
  penguin: ['#8498b7', '#3b4c67'],
  queen: ['#d4a8ff', '#ffc94f'],
  robot: ['#94c8df', '#f08b76'],
  sun: ['#ffd45c', '#f7a94b'],
  turtle: ['#75c997', '#4e986c'],
  umbrella: ['#ff8fb1', '#f4be4f'],
  violin: ['#d18c54', '#794a36'],
  whale: ['#77b8e8', '#467da8'],
  xylophone: ['#fc8e89', '#77c6a5'],
  yak: ['#d0a879', '#876141'],
  zebra: ['#faf8f2', '#48515f'],
};

export const pictureWords = [
  ['A', 'Apple', 'apple'], ['B', 'Ball', 'ball'], ['C', 'Cat', 'cat'],
  ['D', 'Dog', 'dog'], ['E', 'Elephant', 'elephant'], ['F', 'Fish', 'fish'],
  ['G', 'Giraffe', 'giraffe'], ['H', 'House', 'house'], ['I', 'Ice cream', 'icecream'],
  ['J', 'Jam', 'jam'], ['K', 'Kite', 'kite'], ['L', 'Lion', 'lion'],
  ['M', 'Moon', 'moon'], ['N', 'Nest', 'nest'], ['O', 'Orange', 'orange'],
  ['P', 'Penguin', 'penguin'], ['Q', 'Queen', 'queen'], ['R', 'Robot', 'robot'],
  ['S', 'Sun', 'sun'], ['T', 'Turtle', 'turtle'], ['U', 'Umbrella', 'umbrella'],
  ['V', 'Violin', 'violin'], ['W', 'Whale', 'whale'], ['X', 'Xylophone', 'xylophone'],
  ['Y', 'Yak', 'yak'], ['Z', 'Zebra', 'zebra'],
];

export function Illustration({ type = 'tiger', className = '', label, size = 112 }) {
  const [main, accent] = palettes[type] || palettes.tiger;
  if (type === 'tiger') {
    return <svg className={className} width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={label || 'Friendly tiger mascot'}>
      <ellipse cx="60" cy="66" rx="42" ry="41" fill={main} />
      <path d="M26 40 20 14l25 15M94 40l6-26-25 15" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round" />
      <path d="m27 40 7-13 7 15m44-2 7-13 7 14" fill="#ffb6bb" />
      <ellipse cx="60" cy="72" rx="27" ry="22" fill="#fff3da" />
      <ellipse cx="47" cy="57" rx="4" ry="6" fill="#263653" /><ellipse cx="73" cy="57" rx="4" ry="6" fill="#263653" />
      <circle cx="48" cy="55" r="1.5" fill="white" /><circle cx="74" cy="55" r="1.5" fill="white" />
      <path d="M56 69q4-5 8 0-4 5-8 0m4 4q-2 7-8 4m8-4q2 7 8 4" fill="none" stroke="#714631" strokeWidth="2.8" strokeLinecap="round" />
      <path d="m37 45 9 4m-13 8 9 1m32-13-9 4m13 8-9 1" stroke={accent} strokeWidth="5" strokeLinecap="round" />
      <path d="M30 78q-9 4-11 12m71-12q9 4 11 12" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      <circle cx="36" cy="69" r="4" fill="#ff9db1" opacity=".7" /><circle cx="84" cy="69" r="4" fill="#ff9db1" opacity=".7" />
    </svg>;
  }
  return <svg className={className} width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={label || type}>
    {type === 'apple' && <><path d="M61 35q-2-15 11-20" fill="none" stroke="#76523a" strokeWidth="6" strokeLinecap="round"/><path d="M68 28q10-13 23-5-7 14-21 12" fill="#58b879"/><path d="M60 40C34 20 14 44 23 75c6 24 23 31 37 17 14 14 31 7 37-17 9-31-11-55-37-35" fill={main}/><circle cx="42" cy="57" r="4" fill="white"/><circle cx="73" cy="57" r="4" fill="white"/><path d="M51 69q9 9 18 0" fill="none" stroke="#7c3c3b" strokeWidth="3" strokeLinecap="round"/></>}
    {type === 'ball' && <><circle cx="60" cy="62" r="42" fill={main}/><path d="M24 40q35 20 72 0M23 81q37-20 74 0M51 21q21 40 0 82M73 23q-21 39 0 78" fill="none" stroke={accent} strokeWidth="8"/><circle cx="47" cy="53" r="3" fill="white"/></>}
    {type === 'cat' && <><path d="M27 53 23 20l29 19m16 0 29-19-4 34" fill={main} stroke={accent} strokeWidth="5" strokeLinejoin="round"/><circle cx="60" cy="66" r="38" fill={main}/><path d="m33 41 12 6-3-14m45 8-12 6 3-14" fill="#f3a1a7"/><ellipse cx="60" cy="79" rx="22" ry="15" fill="#fff2df"/><ellipse cx="46" cy="63" rx="4" ry="6" fill="#263653"/><ellipse cx="74" cy="63" rx="4" ry="6" fill="#263653"/><path d="m56 75 4-3 4 3-4 4zM60 79q-4 7-10 4m10-4q4 7 10 4M40 77l-18-4m18 9-19 3m59-8 18-4m-18 9 19 3" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/></>}
    {type === 'dog' && <><ellipse cx="60" cy="70" rx="38" ry="35" fill={main}/><path d="M33 47Q9 27 16 62q3 17 24 13m47-28q24-20 17 15-3 17-24 13" fill={accent}/><ellipse cx="60" cy="79" rx="24" ry="19" fill="#fff0dc"/><ellipse cx="46" cy="62" rx="4" ry="6" fill="#263653"/><ellipse cx="73" cy="62" rx="4" ry="6" fill="#263653"/><ellipse cx="60" cy="75" rx="8" ry="6" fill="#493c3a"/><path d="M60 81q-4 7-10 4m10-4q4 7 10 4m-10 4q-2 12 8 10" fill="none" stroke="#805b46" strokeWidth="3" strokeLinecap="round"/><circle cx="87" cy="76" r="10" fill="#8c5e48"/></>}
    {type === 'elephant' && <><ellipse cx="60" cy="68" rx="38" ry="35" fill={main}/><ellipse cx="24" cy="67" rx="19" ry="25" fill={accent}/><ellipse cx="96" cy="67" rx="19" ry="25" fill={accent}/><ellipse cx="24" cy="67" rx="11" ry="16" fill="#f4aeb7"/><ellipse cx="96" cy="67" rx="11" ry="16" fill="#f4aeb7"/><circle cx="47" cy="56" r="4" fill="#263653"/><circle cx="73" cy="56" r="4" fill="#263653"/><path d="M54 69q6 6 12 0v26q-1 17 9 16" fill="none" stroke={main} strokeWidth="14" strokeLinecap="round"/><path d="m43 76-8 12 14-4m28-8 8 12-14-4" fill="#fff4df" stroke="#d6e7e8" strokeWidth="2"/></>}
    {type === 'giraffe' && <><path d="M45 58V30q0-15 14-15t14 15v28" fill={main} stroke={accent} strokeWidth="5"/><ellipse cx="60" cy="69" rx="34" ry="25" fill={main}/><path d="M44 33q16 7 32 0" fill="none" stroke={accent} strokeWidth="5"/><path d="M45 87v21m30-21v21m-43-27-15 10m71-10 15 10" fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round"/><path d="m49 16-2-12m24 12 2-12" stroke={accent} strokeWidth="5" strokeLinecap="round"/><circle cx="46" cy="4" r="6" fill={main}/><circle cx="74" cy="4" r="6" fill={main}/><ellipse cx="60" cy="37" rx="17" ry="16" fill={main}/><circle cx="54" cy="34" r="3" fill="#263653"/><circle cx="67" cy="34" r="3" fill="#263653"/><path d="M55 42q5 4 10 0" fill="none" stroke={accent} strokeWidth="2.5"/><path d="m44 65 10-5 7 8-7 8-11-2zm25-9 9 3 2 9-10 5-7-7zM58 83l9-4 7 7-5 8-12-2z" fill={accent}/></>}
    {type === 'fish' && <><path d="M13 60Q36 25 78 42q9 4 17 13l19-17v45L95 67q-19 18-44 15Q24 80 13 60" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round"/><path d="m53 41 10-20 15 24m-24 34 10 18 16-20" fill={accent}/><circle cx="37" cy="55" r="5" fill="#263653"/><circle cx="38" cy="53" r="1.5" fill="white"/><path d="M27 68q7 5 14 0m17-18q10 10 0 20m12-20q10 10 0 20" fill="none" stroke="#fff4df" strokeWidth="3"/><circle cx="19" cy="34" r="4" fill="#8ed8f8"/><circle cx="12" cy="24" r="2" fill="#8ed8f8"/></>}
    {type === 'monkey' && <><circle cx="60" cy="64" r="37" fill={main}/><circle cx="24" cy="64" r="15" fill={accent}/><circle cx="96" cy="64" r="15" fill={accent}/><circle cx="24" cy="64" r="7" fill="#e8bd95"/><circle cx="96" cy="64" r="7" fill="#e8bd95"/><ellipse cx="60" cy="76" rx="25" ry="20" fill="#f0cfaa"/><ellipse cx="47" cy="57" rx="4" ry="6" fill="#263653"/><ellipse cx="73" cy="57" rx="4" ry="6" fill="#263653"/><ellipse cx="60" cy="71" rx="10" ry="7" fill="#fff0dc"/><circle cx="60" cy="69" r="4" fill="#493c3a"/><path d="M52 82q8 7 16 0m35 4q20 11 6 24-10 8-19-2" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round"/></>}
    {type === 'rabbit' && <><ellipse cx="60" cy="76" rx="31" ry="30" fill={main} stroke={accent} strokeWidth="3"/><ellipse cx="43" cy="25" rx="12" ry="30" fill={main} stroke={accent} strokeWidth="3" transform="rotate(-12 43 25)"/><ellipse cx="76" cy="25" rx="12" ry="30" fill={main} stroke={accent} strokeWidth="3" transform="rotate(12 76 25)"/><ellipse cx="43" cy="25" rx="5" ry="20" fill="#f3a2b3"/><ellipse cx="76" cy="25" rx="5" ry="20" fill="#f3a2b3"/><ellipse cx="60" cy="82" rx="19" ry="14" fill="#fff"/><circle cx="48" cy="65" r="4" fill="#263653"/><circle cx="72" cy="65" r="4" fill="#263653"/><path d="m56 77 4-3 4 3-4 4zM60 82v9m0-2q-7 7-13 1m13 1q7 6 13 0" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/><circle cx="89" cy="88" r="9" fill="#fff"/></>}
    {type === 'turtle' && <><ellipse cx="58" cy="67" rx="39" ry="29" fill="#71bb79" stroke="#4e986c" strokeWidth="4"/><path d="M28 65q3-32 31-32t32 32q-9 19-32 20T28 65" fill="#7bba68" stroke="#4e986c" strokeWidth="4"/><path d="M59 35v49M31 61h57m-42-25 13 12 15-12m-28 45 13-14 15 14" fill="none" stroke="#4e986c" strokeWidth="3"/><circle cx="101" cy="58" r="17" fill={main}/><circle cx="105" cy="54" r="3" fill="#263653"/><path d="M108 64q-7 5-13 0m-60 19-4 11m21-9-2 12m26-12 2 12m20-16 5 10" fill="none" stroke="#4e986c" strokeWidth="7" strokeLinecap="round"/></>}
    {type === 'owl' && <><path d="m29 43-4-24 23 15m43 9 4-24-23 15" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round"/><ellipse cx="60" cy="67" rx="38" ry="39" fill={main}/><circle cx="46" cy="57" r="16" fill="#fff3db"/><circle cx="74" cy="57" r="16" fill="#fff3db"/><circle cx="47" cy="58" r="6" fill="#263653"/><circle cx="73" cy="58" r="6" fill="#263653"/><path d="m55 73 5-7 5 7-5 7z" fill="#f5a744"/><ellipse cx="60" cy="93" rx="19" ry="10" fill="#f1cf91"/><path d="m43 101-8 8m42-8 8 8" stroke={accent} strokeWidth="5" strokeLinecap="round"/></>}
    {type === 'yak' && <><path d="M22 55Q10 21 35 30q9-20 25-7 16-13 25 7 25-9 13 25l9 29H13z" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round"/><path d="M28 42q-22-29-24-5-1 13 17 16m71-11q22-29 24-5 1 13-17 16" fill="#fff0cf" stroke={accent} strokeWidth="5" strokeLinecap="round"/><ellipse cx="60" cy="70" rx="29" ry="26" fill="#e8c99e"/><circle cx="48" cy="58" r="4" fill="#263653"/><circle cx="72" cy="58" r="4" fill="#263653"/><ellipse cx="60" cy="73" rx="13" ry="9" fill="#fff0dc"/><path d="m54 68 6-4 6 4-6 4zM60 79q-6 9-12 3m12-3q6 9 12 3m-36 21v9m48-9v9" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round"/></>}
    {type === 'flower' && <><path d="M60 66v39m0-17q-16-12-24 1 15 11 24 3m0 1q17-13 25 0-15 11-25 3" fill="none" stroke="#55a975" strokeWidth="6" strokeLinecap="round"/>{Array.from({length:6},(_,i)=><ellipse key={i} cx="60" cy="36" rx="11" ry="20" fill={main} transform={`rotate(${i*60} 60 52)`}/>)}<circle cx="60" cy="52" r="13" fill={accent}/><circle cx="56" cy="51" r="2" fill="#5c4a46"/><circle cx="64" cy="51" r="2" fill="#5c4a46"/></>}
    {type === 'butterfly' && <><path d="M58 57Q20 8 14 40q-2 23 35 24Q12 91 30 103q20 5 30-35 10 40 30 35 18-12-19-39 37-1 35-24-6-32-44 17" fill={main} stroke={accent} strokeWidth="3"/><ellipse cx="60" cy="64" rx="5" ry="25" fill={accent}/><path d="m58 43-8-12m12 12 8-12" stroke={accent} strokeWidth="3" strokeLinecap="round"/><circle cx="37" cy="44" r="5" fill="#fff1d4"/><circle cx="82" cy="44" r="5" fill="#fff1d4"/></>}
    {type === 'car' && <><path d="M15 70h12l10-24q3-8 13-8h28q8 0 13 9l10 23h8v21H13V75q0-5 2-5" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round"/><path d="m43 45-8 21h48L73 45z" fill="#dff5ff"/><circle cx="36" cy="89" r="10" fill="#34435e"/><circle cx="85" cy="89" r="10" fill="#34435e"/><circle cx="36" cy="89" r="4" fill="#fff2ce"/><circle cx="85" cy="89" r="4" fill="#fff2ce"/></>}
    {type === 'star' && <><path d="m60 10 14 32 35 4-26 23 8 35-31-18-31 18 8-35L11 46l35-4z" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round"/><circle cx="49" cy="55" r="3" fill="#fff"/></>}
    {type === 'sun' && <><g stroke={accent} strokeWidth="7" strokeLinecap="round">{Array.from({length:8},(_,i)=><path key={i} d="M60 8v10" transform={`rotate(${i*45} 60 60)`}/>)}</g><circle cx="60" cy="60" r="31" fill={main}/><circle cx="49" cy="56" r="3" fill="#604b46"/><circle cx="71" cy="56" r="3" fill="#604b46"/><path d="M50 69q10 9 20 0" fill="none" stroke="#604b46" strokeWidth="3" strokeLinecap="round"/></>}
    {type === 'moon' && <><path d="M86 27q-44-17-55 21-12 43 29 54 28 7 45-18-31 9-43-17-12-25 24-40" fill={main}/><circle cx="66" cy="58" r="3" fill={accent}/><path d="m39 39 2 5 5 1-5 2-2 5-1-5-5-2 5-1z" fill={accent}/></>}
    {type === 'nest' && <><path d="M18 74q42 18 84 0l-10 24H28z" fill={accent}/><path d="M23 84q37 13 74 0M27 92q33 12 66 0" fill="none" stroke="#d6a064" strokeWidth="4" strokeLinecap="round"/><ellipse cx="47" cy="61" rx="19" ry="21" fill={main}/><ellipse cx="76" cy="58" rx="17" ry="19" fill="#f7cb71"/><circle cx="48" cy="57" r="3" fill="#34435e"/><circle cx="77" cy="55" r="3" fill="#34435e"/><path d="m36 64 9 3m24-7 9 3" stroke="#f18c83" strokeWidth="4" strokeLinecap="round"/></>}
    {type === 'queen' && <><path d="m20 42 17 16 22-35 23 35 18-16-7 51H27z" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round"/><circle cx="37" cy="39" r="6" fill="#f18c83"/><circle cx="60" cy="25" r="7" fill="#f2c04c"/><circle cx="83" cy="39" r="6" fill="#8ed8f8"/><rect x="30" y="93" width="60" height="12" rx="5" fill={accent}/><circle cx="51" cy="68" r="3" fill="#493d53"/><circle cx="69" cy="68" r="3" fill="#493d53"/><path d="M53 78q7 6 14 0" fill="none" stroke="#493d53" strokeWidth="2.5" strokeLinecap="round"/></>}
    {type === 'robot' && <><rect x="25" y="29" width="70" height="67" rx="18" fill={main} stroke={accent} strokeWidth="4"/><path d="M60 17v12m-15 0-9-9m39 9 9-9" stroke={accent} strokeWidth="5" strokeLinecap="round"/><rect x="38" y="48" width="16" height="15" rx="5" fill="#fff"/><rect x="66" y="48" width="16" height="15" rx="5" fill="#fff"/><circle cx="46" cy="55" r="3" fill="#3b4c67"/><circle cx="74" cy="55" r="3" fill="#3b4c67"/><path d="M46 76h28" stroke="#fff" strokeWidth="5" strokeLinecap="round"/><path d="M15 53h10m70 0h10M43 97l-8 11m42-11 8 11" stroke={accent} strokeWidth="5" strokeLinecap="round"/></>}
    {type === 'umbrella' && <><path d="M12 61q3-43 48-46 45 3 48 46-14-12-24 1-12-14-24 0-13-14-24 0-12-14-24-1" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round"/><path d="M60 57v40q0 16 13 11 7-3 4-10" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round"/><path d="M36 58q7 7 13 0m22 0q6 7 13 0" fill="none" stroke="#fff" strokeWidth="3"/></>}
    {type === 'violin' && <><path d="M49 18h22v20q17 8 8 24 14 16 0 29-7 7-13 4v10H53V95q-7 6-14-1-14-13 0-31-10-16 8-25z" fill={main} stroke={accent} strokeWidth="4"/><path d="M60 17v86m-10-71h20m-28 23q7 4 13 0m10 0q7 4 13 0" stroke="#fff0ca" strokeWidth="3"/><circle cx="60" cy="63" r="4" fill={accent}/></>}
    {type === 'xylophone' && <><path d="M21 32h78L86 97H34z" fill={accent} opacity=".3"/>{['#f18c83','#f2c04c','#87cfaa','#8ed8f8','#aa93e5'].map((color,i)=><rect key={color} x={22+i*15} y={28+i*8} width="13" height={43+i*5} rx="5" fill={color} stroke="#fff" strokeWidth="2"/>)}<path d="m91 20 13 4-25 62-9-4z" fill="#b77d52"/><circle cx="73" cy="88" r="6" fill="#e2a45f"/></>}
    {type === 'whale' && <><path d="M14 69q9-34 48-34 31 0 43 25l13-12-3 28-15-8q-9 29-39 32-33 3-47-19" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round"/><path d="M54 99q-4 18-14 12 1-9 10-13" fill={accent}/><circle cx="79" cy="61" r="4" fill="#263653"/><path d="M89 71q-9 7-18 4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"/><path d="M42 25q-5-15 6-18m8 18q-1-17 11-17" fill="none" stroke="#8ed8f8" strokeWidth="5" strokeLinecap="round"/></>}
    {type === 'penguin' && <><ellipse cx="60" cy="69" rx="37" ry="43" fill={main}/><ellipse cx="60" cy="76" rx="24" ry="29" fill="#fff8ec"/><circle cx="48" cy="55" r="4" fill="#263653"/><circle cx="72" cy="55" r="4" fill="#263653"/><path d="m54 64 6-5 6 5-6 6z" fill="#ffad52"/><path d="M43 106q-14 8-22-1m56 1q14 8 22-1" fill="none" stroke="#ffad52" strokeWidth="7" strokeLinecap="round"/></>}
    {type === 'zebra' && <><ellipse cx="60" cy="68" rx="40" ry="38" fill="#fff9ef" stroke={accent} strokeWidth="4"/><path d="m31 44-5-27 27 20m36 7 5-27-27 20" fill="#fff9ef" stroke={accent} strokeWidth="5" strokeLinejoin="round"/><path d="M33 49q9 10 0 22m10-31q9 13 0 27m34-25q-9 13 0 27m10-18q-9 10 0 22" fill="none" stroke={accent} strokeWidth="5"/><ellipse cx="60" cy="80" rx="21" ry="14" fill="#fff"/><circle cx="48" cy="60" r="4" fill="#263653"/><circle cx="72" cy="60" r="4" fill="#263653"/><path d="M53 82q7 6 14 0" fill="none" stroke={accent} strokeWidth="3"/></>}
    {type === 'house' && <><path d="M14 57 60 18l46 39v49H14z" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round"/><path d="M47 106V72h27v34" fill="#fff0c9" stroke={accent} strokeWidth="4"/><rect x="23" y="65" width="17" height="17" rx="3" fill="#dff5ff"/><rect x="81" y="65" width="15" height="17" rx="3" fill="#dff5ff"/></>}
    {type === 'kite' && <><path d="m60 13 35 46-35 46-35-46z" fill={main} stroke={accent} strokeWidth="4"/><path d="m60 13-2 91m-33-45 68 0" stroke="white" strokeWidth="3"/><path d="M60 105q-13 4-4 12 9 7-3 10" fill="none" stroke={accent} strokeWidth="3"/><path d="m52 113 7-3 5 6-8 2z" fill={main}/></>}
    {type === 'icecream' && <><path d="m34 65 26 44 26-44z" fill="#d59a58" stroke="#b47842" strokeWidth="3"/><path d="m42 74 37 0m-31 11 26 0m-20 11 14 0" stroke="#fff0c9" strokeWidth="3"/><circle cx="60" cy="52" r="27" fill={main}/><circle cx="43" cy="37" r="17" fill={accent}/><circle cx="76" cy="38" r="16" fill="#fff0c9"/></>}
    {type === 'jam' && <><rect x="25" y="38" width="70" height="65" rx="15" fill={main} stroke={accent} strokeWidth="4"/><path d="M31 37h58V26q0-7-7-7H38q-7 0-7 7z" fill="#a98bcd"/><rect x="36" y="57" width="48" height="28" rx="7" fill="#fff3d7"/><path d="M60 64q-9-10-16 0 0 9 16 16 16-7 16-16-7-10-16 0" fill="#f47682"/></>}
    {type === 'lion' && <><circle cx="60" cy="64" r="48" fill={accent}/><ellipse cx="60" cy="68" rx="32" ry="34" fill={main}/><circle cx="48" cy="59" r="4" fill="#263653"/><circle cx="72" cy="59" r="4" fill="#263653"/><ellipse cx="60" cy="74" rx="17" ry="13" fill="#fff1dc"/><path d="m56 71 4-3 4 3-4 4zM60 75q-5 8-10 4m10-4q5 8 10 4" fill="none" stroke="#60402f" strokeWidth="3" strokeLinecap="round"/></>}
    {type === 'banana' && <><path d="M20 32q30 15 65-3 3 45-41 65-24 10-34-5 31-8 42-41-14 9-32 1z" fill={main} stroke={accent} strokeWidth="4" strokeLinejoin="round"/><path d="m20 32-5-9m70 6 5-8" stroke="#805b46" strokeWidth="6" strokeLinecap="round"/></>}
    {type === 'orange' && <><circle cx="60" cy="65" r="39" fill={main}/><path d="M60 28q-2-13 12-16m-12 14q9-12 20-7-4 12-18 12" fill="#62b878"/><circle cx="45" cy="55" r="3" fill="white"/></>}
    {type === 'strawberry' && <><path d="M20 43q40-37 80 0l-6 13q-12 38-34 50-22-12-34-50z" fill={main}/><path d="M60 33q-17-19-27-7m27 7q7-23 22-12m-22 12q18-15 32-5" fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round"/>{[[42,54],[67,54],[53,72],[77,73],[39,74],[61,92]].map(([x,y])=><ellipse key={x+','+y} cx={x} cy={y} rx="2" ry="4" fill="#ffd166"/>)}</>}
    {!['apple','ball','cat','dog','elephant','giraffe','fish','penguin','turtle','whale','yak','zebra','owl','tiger','monkey','rabbit','banana','orange','strawberry','flower','butterfly','car','star','sun','moon','house','kite','icecream','jam','lion','nest','queen','robot','umbrella','violin','xylophone'].includes(type) && <><circle cx="60" cy="60" r="39" fill={main}/><path d="M60 8 70 40 103 38 78 59 89 91 60 72 31 91 42 59 17 38 50 40z" fill={accent} opacity=".95"/><circle cx="47" cy="55" r="3" fill="white"/><circle cx="73" cy="55" r="3" fill="white"/><path d="M51 68q9 10 18 0" fill="none" stroke="#5b4d56" strokeWidth="3" strokeLinecap="round"/></>}
  </svg>;
}

export function Sparkles({ className = '' }) {
  return <div className={`sparkles ${className}`} aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span></div>;
}
