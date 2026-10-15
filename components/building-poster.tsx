import { useId } from "react";

interface BuildingPosterProps { className?: string; title?: string }

/** Original vector companion to the procedural Harbour House model; also the no-WebGL composition. */
export function BuildingPoster({ className, title = "Harbour House architectural model, with unit B-804 selected in teal" }: BuildingPosterProps) {
  const id = useId();
  const floors = Array.from({ length: 11 }, (_, index) => index);
  return <svg className={className} viewBox="0 0 620 710" role="img" aria-labelledby={`${id}-title`} xmlns="http://www.w3.org/2000/svg">
    <title id={`${id}-title`}>{title}</title>
    <defs>
      <linearGradient id={`${id}-front`} x1="0" x2="1"><stop stopColor="#e4e0d5" /><stop offset="1" stopColor="#faf8ef" /></linearGradient>
      <linearGradient id={`${id}-side`} x1="0" x2="1"><stop stopColor="#c7c7bd" /><stop offset="1" stopColor="#e2ded2" /></linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" x2="1"><stop stopColor="#233e50" /><stop offset="0.6" stopColor="#45616a" /><stop offset="1" stopColor="#74868a" /></linearGradient>
      <linearGradient id={`${id}-interior`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#b4a58b" /><stop offset="1" stopColor="#eeece0" /></linearGradient>
      <linearGradient id={`${id}-leaves`} x1="0" x2="1"><stop stopColor="#92967a" /><stop offset="1" stopColor="#65745a" /></linearGradient>
      <radialGradient id={`${id}-shadow`}><stop stopColor="#7b817b" stopOpacity="0.2" /><stop offset="1" stopColor="#7b817b" stopOpacity="0" /></radialGradient>
      <g id={`${id}-tree`}>
        <path d="M0 4V-35m0 17-9-11m9 7 9-14" fill="none" stroke="#9c8d72" strokeWidth="2" />
        <g fill={`url(#${id}-leaves)`}>
          <ellipse cx="-9" cy="-29" rx="11" ry="9" /><ellipse cx="8" cy="-34" rx="12" ry="10" />
          <ellipse cx="0" cy="-43" rx="10" ry="11" /><ellipse cx="-12" cy="-39" rx="8" ry="9" />
          <ellipse cx="2" cy="-29" rx="10" ry="9" /><ellipse cx="14" cy="-26" rx="8" ry="7" />
        </g>
      </g>
    </defs>
    <ellipse cx="339" cy="640" rx="245" ry="55" fill={`url(#${id}-shadow)`} />
    <path d="m102 580 257-75 169 108-257 79Z" fill="#dddcd3" />
    <path d="m102 580 169 109v14L102 594Z" fill="#cfcec6" />
    <path d="m271 689 257-76v14l-257 76Z" fill="#eae7de" />
    <path d="m136 554 218-65 142 91-218 67Z" fill="#f3f0e7" />
    <path d="m150 135 212-60 120 76v427l-212 64-120-77Z" fill={`url(#${id}-front)`} />
    <path d="m362 75 120 76v427l-120-77Z" fill={`url(#${id}-side)`} />
    <path d="m151 135 211-60v426l-211 63Z" fill="#e5e1d5" />
    {floors.map(index => {
      const y = 550 - index * 37;
      return <g key={index}>
        <path d={`m159 ${y - 28} 193-57v27l-193 57Z`} fill={`url(#${id}-glass)`} />
        <path d={`m366 ${y - 88} 108 69v26l-108-68Z`} fill="#314c5b" />
        {[0, 1, 2, 3, 4, 5].map(column => <g key={column}>
          {(index + column) % 3 !== 0 && <path d={`m${168 + column * 31} ${y - 24 - column * 9.2} 19-5.6v20l-19 5.6Z`} fill={`url(#${id}-interior)`} fillOpacity="0.73" />}
          <path d={`m${166 + column * 34} ${y - 30 - column * 10}v29`} stroke="#394a4d" strokeWidth="1.3" />
        </g>)}
        {[0, 1, 2, 3].map(column => <g key={column}>
          {(index + column) % 3 === 1 && <path d={`m${379 + column * 25} ${y - 77 + column * 16} 18 11v19l-18-11Z`} fill={`url(#${id}-interior)`} fillOpacity="0.65" />}
          <path d={`m${377 + column * 28} ${y - 81 + column * 18}v27`} stroke="#394a4d" strokeWidth="1.3" />
        </g>)}
        <path d={`m140 ${y} 222-66 131 83-222 68Z`} fill="#f7f4e9" />
        <path d={`m140 ${y} 131 85v4l-131-84Z`} fill="#d1cfc4" />
        <path d={`m271 ${y + 85} 222-68v4l-222 69Z`} fill="#ece8dc" />
        <path d={`m151 ${y - 11} 120 77 210-64`} fill="none" stroke="#394a4d" strokeWidth="0.8" />
        <path d={`m151 ${y - 23} 120 77 210-64`} fill="none" stroke="#394a4d" strokeWidth="0.9" />
        {[0, 1, 2, 3, 4, 5, 6].map(column => <path key={column} d={`m${274 + column * 34} ${y + 53 - column * 10.4}v12`} stroke="#394a4d" strokeWidth="0.8" />)}
        {index % 3 === 1 && <g><path d={`m175 ${y + 13} 26 17-12 4-26-17Z`} fill="#dedacf" /><use href={`#${id}-tree`} transform={`translate(177 ${y + 18}) scale(.35)`} /></g>}
      </g>;
    })}
    <path d="m175 137 9-3v417l-9 3ZM240 118l9-3v418l-9 3ZM309 98l9-3v417l-9 3Z" fill="#ebe7dc" />
    <path d="m367 84 7 5v420l-7-5ZM433 127l7 5v420l-7-5Z" fill="#e5e0d4" />
    {[0, 1, 2, 3].map(index => <path key={index} d={`m${252 + index * 6} ${115 - index * 1.7}v416`} stroke="#b4a58b" strokeWidth="2.4" />)}
    <path d="m136 135 226-68 134 86-225 69Z" fill="#fcf9ef" />
    <path d="m136 135 135 87v8l-135-87Z" fill="#d1cfc2" />
    <path d="m271 222 225-69v8l-225 69Z" fill="#e4e0d4" />
    <path d="m218 112 107-32 66 42-107 32Z" fill="#f5f2e7" />
    <path d="m218 112 66 42v-42l-66-43Z" fill="#dedacf" />
    <path d="m284 154 107-32V80l-107 32Z" fill="#ece8dd" />
    <path d="m218 69 107-32 66 43-107 32Z" fill="#faf7ee" />
    <path d="m227 69 98-25 55 36-96 26Z" fill="#e2dfd5" />
    <path d="m227 69 98-25v9l-86 23Z" fill="#cecec4" />
    <path d="m327 151 68-20 23 15-68 21Z" fill="#b3b9a3" />
    {[0, 1, 2, 3, 4].map(index => <g key={index} fill="#7d896d"><ellipse cx={341 + index * 13} cy={149 - index * 3} rx="10" ry="5" /><ellipse cx={340 + index * 13} cy={145 - index * 3} rx="6" ry="6" /></g>)}
    <path d="m300 181 84-25 42 27-84 26Z" fill="#b4a58b" />
    <path d="M302 180v-27m80 2v-27m42 53v-27m-80 54v-27" stroke="#394a4d" strokeWidth="1.4" />
    {[0, 1, 2, 3, 4, 5].map(index => <path key={index} d={`m${300 + index * 8} ${153 + index * 5} 84-25`} stroke="#b4a58b" strokeWidth="3" />)}
    <use href={`#${id}-tree`} transform="translate(400 143) scale(.45)" />
    <g>
      <path d="m284 301 126-38 66 42-127 39Z" fill="#008f91" />
      <path d="m284 263 126-38 66 42-127 39Z" fill="#00a8a7" />
      <path d="m284 263 65 43v38l-65-43Z" fill="#009a9a" fillOpacity="0.75" />
      <path d="m349 306 127-39v38l-127 39Z" fill="#84cfca" fillOpacity="0.72" />
      <path d="m284 263 65 43 127-39M349 306v38M476 267v38M284 263v38" fill="none" stroke="#008f91" strokeWidth="2" />
      <path d="m374 314 34-10 15 10-34 10Z" fill="#f6f2e5" />
      <path d="m374 314v-10l34-10v10M408 294l15 10v10" fill="#dfecdf" />
      <path d="m433 290 14-4 13 8-14 5Z" fill="#f6f2e5" />
    </g>
    <path d="m233 583 37 24v31l-37-24Z" fill="#35505b" />
    <path d="m270 607 51-15v30l-51 16Z" fill="#294553" />
    <path d="m223 582 50-15 57 36-50 15Z" fill="#d7cebc" />
    <path d="m152 567 60 38-11 7-60-39ZM359 604l103-31 14 9-102 31Z" fill="#a9b29c" />
    {[0, 1, 2, 3].map(index => <g key={index}>
      <ellipse cx={153 + index * 14} cy={570 + index * 9} rx="9" ry="6" fill="#7d8a71" />
      <ellipse cx={380 + index * 23} cy={601 - index * 7} rx="12" ry="7" fill="#7d8a71" />
      <use href={`#${id}-tree`} transform={`translate(${145 + index * 17} ${572 + index * 11}) scale(${index % 2 === 0 ? 0.85 : 0.65})`} />
      <use href={`#${id}-tree`} transform={`translate(${377 + index * 28} ${604 - index * 8.5}) scale(${index % 2 === 0 ? 0.9 : 0.68})`} />
    </g>)}
  </svg>;
}

export default BuildingPoster;
