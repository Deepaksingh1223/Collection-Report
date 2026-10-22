/**
 * Small reusable pieces: Bar, Badge, Pill (New data), TierTag, Btn, Sel (dropdown), Pager, table cell classes TD/TH, medal().
 */
import {AlertTriangle,Star} from "lucide-react";
export const TD="px-3 py-3 whitespace-nowrap";
export const TH="px-3 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap";
export const medal=r=>r===1?"🏆":r===2?"🥈":r===3?"🥉":`#${r}`;

export const Bar=({v,color="bg-brand-orange"})=><div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-700 ease-out ${color}`} style={{width:`${Math.min(Math.max(v||0,0),100)}%`}}/></div>;

const tone={Excellent:"emerald",Good:"blue","Needs Attention":"red",Average:"amber"};
const statusTone={Active:"emerald","On Leave":"amber",Inactive:"slate"};
const cls={emerald:"bg-emerald-50 text-emerald-700 ring-emerald-200",blue:"bg-blue-50 text-blue-700 ring-blue-200",red:"bg-red-50 text-red-700 ring-red-200",amber:"bg-amber-50 text-amber-700 ring-amber-200",slate:"bg-slate-100 text-slate-600 ring-slate-200"};
export const Badge=({t})=>{
  const toneVal=tone[t]||statusTone[t]||"slate";
  return <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ring-1 whitespace-nowrap ${cls[toneVal]}`}>{t}</span>;
};
export const Pill=({children})=><span className="inline-flex items-center gap-1 rounded-full bg-brand-orange px-2 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">{children}</span>;
export const TierTag=({tier})=>tier==="top"?<span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700"><Star size={12} fill="currentColor"/>Top performer ↑</span>
  :tier==="low"?<span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600"><AlertTriangle size={12}/>↓ Attention required</span>:null;

export const Btn=({children,className="",...p})=><button {...p} className={`px-3 py-1.5 text-sm font-medium rounded-lg bg-white ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300 active:scale-95 transition disabled:opacity-40 ${className}`}>{children}</button>;
export const Sel=({label,v,set,opts,className=""})=><label className="block min-w-0 text-[11px] font-medium text-slate-500">{label}
  <select value={v} onChange={e=>set(e.target.value)} className={`mt-1 w-full rounded-lg ring-1 px-2.5 py-2 text-sm transition ${v?"bg-brand-orange text-white ring-brand-orange":"bg-white ring-slate-200 text-slate-900 hover:ring-slate-300"} ${className}`}><option value="">All</option>
  {opts.map(o=><option key={o.v??o} value={o.v??o}>{o.l??o}</option>)}</select></label>;
export function Pager({pg,pages,set,size,setSize}){return <div className="flex flex-wrap items-center justify-between gap-2 pt-4 text-sm text-slate-600">
  {setSize?<label className="flex items-center gap-2">Rows<select value={size} onChange={e=>setSize(+e.target.value)} className="rounded-lg ring-1 ring-slate-200 px-1.5 py-1">{[5,10,25].map(n=><option key={n}>{n}</option>)}</select></label>:<span/>}
  <div className="flex items-center gap-2"><Btn disabled={pg===0} onClick={()=>set(pg-1)}>Prev</Btn><span className="tabular-nums">{pg+1} / {pages}</span><Btn disabled={pg+1>=pages} onClick={()=>set(pg+1)}>Next</Btn></div></div>}
