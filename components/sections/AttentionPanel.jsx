/**
 * Low-performing teams/TLs and members across the whole brand. Click an item to focus it; "Show all" reveals the rest.
 */
import {useState} from "react";
import {AlertTriangle} from "lucide-react";
import {Btn,Card} from "../ui";
import {inr} from "../../utils/formatters";

// Lists everyone who is behind (whole brand, not only the focused selection) with a "show all" option for the hidden ones.
export default function AttentionPanel({tlRows,members,onSelect}){
  const [all,setAll]=useState(false);
  const lowTLs=tlRows.filter(t=>t.tier==="low"),tls=lowTLs.length?lowTLs:[...tlRows].filter(t=>t.tier!=="top").sort((a,b)=>b.pending-a.pending).slice(0,1);
  const low=members.filter(e=>e.tier==="low").sort((a,b)=>a.achievement-b.achievement),shown=all?low:low.slice(0,4);
  const Item=({title,line,onClick})=><li><button onClick={onClick} className="w-full text-left rounded-lg bg-slate-50 ring-1 ring-slate-200 px-3 py-2 text-sm hover:ring-amber-300 transition">{title}<span className="block text-xs text-slate-500">{line}</span></button></li>;
  return <Card id="attention" title="Attention Required" subtitle="Where the target is behind — click to focus"><div className="grid gap-5 md:grid-cols-2">
    <div><h3 className="flex items-center gap-1.5 text-sm font-semibold text-amber-700 mb-2"><AlertTriangle size={14}/>Teams / TLs to improve</h3>
      {!tls.length?<p className="text-sm text-slate-500">All teams are on track.</p>:<ul className="space-y-2">{tls.map(t=><Item key={t.id} title={<><b>{t.team}</b> · {t.name}</>} line={`↓ ${t.achievement.toFixed(1)}% achieved · ${inr(t.pending)} remaining`} onClick={()=>onSelect({tl:t.id,ex:""})}/>)}</ul>}</div>
    <div><h3 className="flex items-center gap-1.5 text-sm font-semibold text-amber-700 mb-2"><AlertTriangle size={14}/>Members with low achievement ({low.length})</h3>
      {!low.length?<p className="text-sm text-slate-500">No low-performing members.</p>:<><ul className="space-y-2">{shown.map(e=><Item key={e.id} title={<><b>{e.name}</b> · {e.tlName}</>} line={`↓ ${e.achievement.toFixed(1)}% · ${inr(e.pending)} remaining`} onClick={()=>onSelect({tl:e.tlId,ex:e.id})}/>)}</ul>
        {low.length>4&&<div className="mt-3"><Btn onClick={()=>setAll(!all)}>{all?"Show fewer":`Show all ${low.length}`}</Btn></div>}</>}</div></div></Card>;
}
