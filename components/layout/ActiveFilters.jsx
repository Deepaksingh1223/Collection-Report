/**
 * Blue strip that appears when a team/member/search/source is selected. Each chip removes one filter; "Show everything" clears them all.
 * This is how you get back the cards that were hidden by clicking a team or member.
 */
import {X} from "lucide-react";
import {TLS} from "../../data/tlData";
import {executives} from "../../data/executiveData";
export default function ActiveFilters({f,onClear,onShowAll}){
  const chips=[];
  if(f.tl)chips.push(["tl",`Instant Fundz: ${TLS.find(t=>t.id===f.tl)?.name}`]);
  if(f.ex)chips.push(["ex",`Member: ${executives.find(e=>e.id===f.ex)?.name}`]);
  if(f.q)chips.push(["q",`Search: ${f.q}`]);
  if(f.src)chips.push(["src",f.src==="imported"?"Imported only":"Historical only"]);
  if(!chips.length)return null;
  return <div className="flex flex-wrap items-center gap-2 rounded-xl bg-orange-50 ring-1 ring-orange-100 px-3 py-2 text-sm animate-fade">
    <span className="font-medium text-brand-dark">Focused view</span><span className="text-xs text-brand-orange hidden sm:inline">KPIs show only this selection. Team, TL, member and attention sections still list everyone.</span>
    {chips.map(([k,l])=><button key={k} onClick={()=>onClear(k)} className="inline-flex items-center gap-1 rounded-full bg-white ring-1 ring-orange-200 px-2.5 py-0.5 text-xs hover:bg-orange-100 transition">{l}<X size={12}/></button>)}
    <button onClick={onShowAll} className="ml-auto font-medium text-brand-orange underline underline-offset-2">Show everything</button></div>;
}
