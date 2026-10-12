/**
 * Card = standard section wrapper with a refresh icon. useSectionRefresh() refreshes ONLY that section (short skeleton + timestamp).
 * RefreshContext is provided by app/page.js and re-reads imported data.
 */
"use client";
import {createContext,useCallback,useContext,useEffect,useRef,useState} from "react";
import {RefreshCw} from "lucide-react";
import {SectionSkeleton} from "./States";

// Page provides a `reload` function (re-reads imported data). Every section's refresh icon calls it.
export const RefreshContext=createContext(()=>{});

// Per-section refresh: shows a short loading state for ONLY the section that uses this hook.
export function useSectionRefresh(){
  const reload=useContext(RefreshContext),timer=useRef(null),[loading,setLoading]=useState(false),[stamp,setStamp]=useState("");
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  const refresh=useCallback(()=>{reload();setLoading(true);clearTimeout(timer.current);
    timer.current=setTimeout(()=>{setLoading(false);setStamp(new Date().toLocaleTimeString())},500)},[reload]);
  return{loading,stamp,refresh};
}
export const RefreshButton=({r})=><span className="inline-flex items-center gap-1.5">
  {r?.stamp&&<span className="hidden sm:inline text-[10px] text-slate-400">Updated {r.stamp}</span>}
  <button onClick={r?.refresh} title="Refresh this section" aria-label="Refresh this section" className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition">
    <RefreshCw size={14} className={r?.loading?"animate-spin":""}/></button></span>;

// Header row used by sections that are not wrapped in a Card (e.g. the KPI grid).
export const SectionHead=({title,subtitle,r})=><div className="flex items-start justify-between gap-3"><div><h2 className="text-[15px] font-semibold">{title}</h2>{subtitle&&<p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}</div>{r&&<RefreshButton r={r}/>}</div>;

// Standard white section card with its own refresh icon. `id` is used by the top navigation chips.
export function Card({id,title,subtitle,right,children,className=""}){
  const r=useSectionRefresh();
  return <section id={id} className={`scroll-mt-24 bg-white rounded-xl ring-1 ring-slate-200/70 shadow-sm p-5 min-w-0 animate-fadeUp ${className}`}>
    <div className="flex items-start justify-between gap-3 mb-4"><div><h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>{subtitle&&<p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}</div>
      <div className="flex items-center gap-2 shrink-0">{right}{r&&<RefreshButton r={r}/>}</div></div>
    {r?.loading?<SectionSkeleton/>:children}</section>;
}
