import { useId } from "react";

interface BuildingPosterProps { className?: string; title?: string }

/** Original vector companion to the procedural Harbour House model; also the no-WebGL composition. */
export function BuildingPoster({ className, title = "Harbour House architectural model, with unit B-804 selected in teal" }: BuildingPosterProps) {
  const id = useId();
  const floors = Array.from({ length: 13 }, (_, index) => index);
  return <svg className={className} viewBox="0 0 620 780" role="img" aria-labelledby={`${id}-title`} xmlns="http://www.w3.org/2000/svg">
    <title id={`${id}-title`}>{title}</title>
    <defs>
      <linearGradient id={`${id}-front`} x1="0" x2="1"><stop stopColor="#e4e0d5" /><stop offset="1" stopColor="#faf8ef" /></linearGradient>
      <linearGradient id={`${id}-side`} x1="0" x2="1"><stop stopColor="#c7c7bd" /><stop offset="1" stopColor="#e2ded2" /></linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" x2="1"><stop stopColor="#233e50" /><stop offset="0.6" stopColor="#45616a" /><stop offset="1" stopColor="#74868a" /></linearGradient>
      <linearGradient id={`${id}-interior`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#b4a58b" /><stop offset="1" stopColor="#eeece0" /></linearGradient>
      <linearGradient id={`${id}-leaves`} x1="0" x2="1"><stop stopColor="#92967a" /><stop offset="1" stopColor="#65745a" /></linearGradient>
      <linearGradient id={`${id}-pool`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3ecdc6" /><stop offset="1" stopColor="#1ab5af" /></linearGradient>
      <radialGradient id={`${id}-shadow`}><stop stopColor="#7b817b" stopOpacity="0.2" /><stop offset="1" stopColor="#7b817b" stopOpacity="0" /></radialGradient>
      <g id={`${id}-tree`}>
        <path d="M0 4V-35m0 17-9-11m9 7 9-14" fill="none" stroke="#9c8d72" strokeWidth="2" />
        <g fill={`url(#${id}-leaves)`}>
          <ellipse cx="-9" cy="-29" rx="11" ry="9" /><ellipse cx="8" cy="-34" rx="12" ry="10" />
          <ellipse cx="0" cy="-43" rx="10" ry="11" /><ellipse cx="-12" cy="-39" rx="8" ry="9" />
          <ellipse cx="2" cy="-29" rx="10" ry="9" /><ellipse cx="14" cy="-26" rx="8" ry="7" />
        </g>
      </g>
      <g id={`${id}-bigtree`}>
        <path d="M0 6V-50m0 24-13-16m13 10 13-20" fill="none" stroke="#8a7d66" strokeWidth="2.5" />
        <g fill={`url(#${id}-leaves)`}>
          <ellipse cx="-12" cy="-38" rx="14" ry="12" /><ellipse cx="10" cy="-44" rx="15" ry="13" />
          <ellipse cx="0" cy="-55" rx="13" ry="14" /><ellipse cx="-15" cy="-49" rx="10" ry="12" />
          <ellipse cx="3" cy="-37" rx="13" ry="12" /><ellipse cx="17" cy="-34" rx="10" ry="9" />
          <ellipse cx="-5" cy="-60" rx="9" ry="10" /><ellipse cx="12" cy="-56" rx="10" ry="10" />
        </g>
      </g>
    </defs>
    <ellipse cx="339" cy="710" rx="245" ry="55" fill={`url(#${id}-shadow)`} />
    {/* Ground platform */}
    <path d="m92 640 267-80 179 114-267 84Z" fill="#dddcd3" />
    <path d="m92 640 179 114v14L92 654Z" fill="#cfcec6" />
    <path d="m271 754 267-80v14l-267 80Z" fill="#eae7de" />
    <path d="m126 614 228-68 152 97-228 70Z" fill="#f3f0e7" />
    {/* Building main body — taller */}
    <path d={`m150 102 212-60 120 76v478l-212 64-120-77Z`} fill={`url(#${id}-front)`} />
    <path d={`m362 42 120 76v478l-120-77Z`} fill={`url(#${id}-side)`} />
    <path d={`m151 102 211-60v477l-211 63Z`} fill="#e5e1d5" />
    {/* Floors */}
    {floors.map(index => {
      const y = 598 - index * 34;
      return <g key={index}>
        <path d={`m159 ${y - 25} 193-57v24l-193 57Z`} fill={`url(#${id}-glass)`} />
        <path d={`m366 ${y - 85} 108 69v24l-108-68Z`} fill="#314c5b" />
        {[0, 1, 2, 3, 4, 5].map(column => <g key={column}>
          {(index + column) % 3 !== 0 && <path d={`m${168 + column * 31} ${y - 22 - column * 9.2} 19-5.6v18l-19 5.6Z`} fill={`url(#${id}-interior)`} fillOpacity="0.73" />}
          <path d={`m${166 + column * 34} ${y - 28 - column * 10}v27`} stroke="#394a4d" strokeWidth="1.3" />
        </g>)}
        {[0, 1, 2, 3].map(column => <g key={column}>
          {(index + column) % 3 === 1 && <path d={`m${379 + column * 25} ${y - 74 + column * 16} 18 11v17l-18-11Z`} fill={`url(#${id}-interior)`} fillOpacity="0.65" />}
          <path d={`m${377 + column * 28} ${y - 78 + column * 18}v25`} stroke="#394a4d" strokeWidth="1.3" />
        </g>)}
        <path d={`m140 ${y} 222-66 131 83-222 68Z`} fill="#f7f4e9" />
        <path d={`m140 ${y} 131 85v4l-131-84Z`} fill="#d1cfc4" />
        <path d={`m271 ${y + 85} 222-68v4l-222 69Z`} fill="#ece8dc" />
        <path d={`m151 ${y - 9} 120 77 210-64`} fill="none" stroke="#394a4d" strokeWidth="0.8" />
        <path d={`m151 ${y - 21} 120 77 210-64`} fill="none" stroke="#394a4d" strokeWidth="0.9" />
        {[0, 1, 2, 3, 4, 5, 6].map(column => <path key={column} d={`m${274 + column * 34} ${y + 53 - column * 10.4}v11`} stroke="#394a4d" strokeWidth="0.8" />)}
        {/* Balcony planting on alternating floors */}
        {index % 2 === 1 && <g><path d={`m175 ${y + 12} 26 17-12 4-26-17Z`} fill="#dedacf" /><use href={`#${id}-tree`} transform={`translate(177 ${y + 17}) scale(.35)`} /></g>}
      </g>;
    })}
    {/* Vertical mullions */}
    <path d="m175 104 9-3v468l-9 3ZM240 85l9-3v469l-9 3ZM309 65l9-3v468l-9 3Z" fill="#ebe7dc" />
    <path d="m367 51 7 5v471l-7-5ZM433 94l7 5v471l-7-5Z" fill="#e5e0d4" />
    {[0, 1, 2, 3].map(index => <path key={index} d={`m${252 + index * 6} ${82 - index * 1.7}v468`} stroke="#b4a58b" strokeWidth="2.4" />)}
    {/* Roof slab */}
    <path d="m136 102 226-68 134 86-225 69Z" fill="#fcf9ef" />
    <path d="m136 102 135 87v8l-135-87Z" fill="#d1cfc2" />
    <path d="m271 189 225-69v8l-225 69Z" fill="#e4e0d4" />
    {/* Rooftop pool — teal aqua water feature */}
    <path d="m285 119 127-38 66 42-127 39Z" fill={`url(#${id}-pool)`} fillOpacity="0.85" />
    <path d="m285 119 66 43v6l-66-43Z" fill="#1ab5af" fillOpacity="0.5" />
    <path d="m351 162 127-38v6l-127 39Z" fill="#3ecdc6" fillOpacity="0.5" />
    {/* Pool infinity edge glass */}
    <path d="m293 155 110-32v6l-110 33Z" fill="#3ecdc6" fillOpacity="0.6" />
    {/* Pool deck */}
    <path d="m275 126 5 3 135-41 5-3Z" fill="#d6d2c6" />
    {/* Penthouse enclosure */}
    <path d="m218 79 107-32 66 42-107 32Z" fill="#f5f2e7" />
    <path d="m218 79 66 42v-42l-66-43Z" fill="#dedacf" />
    <path d="m284 121 107-32V47l-107 32Z" fill="#ece8dd" />
    <path d="m218 36 107-32 66 43-107 32Z" fill="#faf7ee" />
    <path d="m227 36 98-25 55 36-96 26Z" fill="#e2dfd5" />
    <path d="m227 36 98-25v9l-86 23Z" fill="#cecec4" />
    {/* Rooftop pergola louvre */}
    <path d="m327 118 68-20 23 15-68 21Z" fill="#b3b9a3" />
    {[0, 1, 2, 3, 4].map(index => <g key={index} fill="#7d896d"><ellipse cx={341 + index * 13} cy={116 - index * 3} rx="10" ry="5" /><ellipse cx={340 + index * 13} cy={112 - index * 3} rx="6" ry="6" /></g>)}
    {/* Louvre slats */}
    <path d="m300 148 84-25 42 27-84 26Z" fill="#b4a58b" />
    <path d="M302 147v-27m80 2v-27m42 53v-27m-80 54v-27" stroke="#394a4d" strokeWidth="1.4" />
    {[0, 1, 2, 3, 4, 5].map(index => <path key={index} d={`m${300 + index * 8} ${120 + index * 5} 84-25`} stroke="#b4a58b" strokeWidth="3" />)}
    <use href={`#${id}-tree`} transform="translate(400 110) scale(.45)" />
    {/* Selected unit B-804 (teal highlight) */}
    <g>
      <path d="m284 268 126-38 66 42-127 39Z" fill="#008f91" />
      <path d="m284 230 126-38 66 42-127 39Z" fill="#00a8a7" />
      <path d="m284 230 65 43v38l-65-43Z" fill="#009a9a" fillOpacity="0.75" />
      <path d="m349 273 127-39v38l-127 39Z" fill="#84cfca" fillOpacity="0.72" />
      <path d="m284 230 65 43 127-39M349 273v38M476 234v38M284 230v38" fill="none" stroke="#008f91" strokeWidth="2" />
      <path d="m374 281 34-10 15 10-34 10Z" fill="#f6f2e5" />
      <path d="m374 281v-10l34-10v10M408 261l15 10v10" fill="#dfecdf" />
      <path d="m433 257 14-4 13 8-14 5Z" fill="#f6f2e5" />
    </g>
    {/* Entrance canopy */}
    <path d="m223 635 50-15 57 36-50 15Z" fill="#d7cebc" />
    <path d="m233 643 37 24v31l-37-24Z" fill="#35505b" />
    <path d="m270 667 51-15v30l-51 16Z" fill="#294553" />
    {/* Canopy structure */}
    <path d="m200 632 70-21 65 42-70 22Z" fill="#e8e5da" />
    <path d="m200 632 65 42v6l-65-42Z" fill="#d1cfc4" />
    <path d="m265 674 70-21v6l-70 21Z" fill="#ece8dd" />
    {/* Parking shade structures */}
    <path d="m109 617 40-12 25 16-40 12Z" fill="#e4e0d5" />
    <path d="m390 590 50-15 20 13-50 15Z" fill="#e4e0d5" />
    {/* Landscaping on driveway */}
    <path d="m152 627 60 38-11 7-60-39ZM359 664l103-31 14 9-102 31Z" fill="#a9b29c" />
    {/* Large trees at ground level */}
    {[0, 1, 2, 3].map(index => <g key={index}>
      <ellipse cx={153 + index * 14} cy={630 + index * 9} rx="9" ry="6" fill="#7d8a71" />
      <ellipse cx={380 + index * 23} cy={661 - index * 7} rx="12" ry="7" fill="#7d8a71" />
      <use href={`#${id}-bigtree`} transform={`translate(${145 + index * 17} ${632 + index * 11}) scale(${index % 2 === 0 ? 0.95 : 0.75})`} />
      <use href={`#${id}-bigtree`} transform={`translate(${377 + index * 28} ${664 - index * 8.5}) scale(${index % 2 === 0 ? 1.0 : 0.78})`} />
    </g>)}
    {/* Additional entrance-area trees */}
    <use href={`#${id}-tree`} transform="translate(230 640) scale(0.6)" />
    <use href={`#${id}-tree`} transform="translate(280 650) scale(0.5)" />
  </svg>;
}

export default BuildingPoster;
