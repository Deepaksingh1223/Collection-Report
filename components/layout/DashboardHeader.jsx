/**
 * Top bar: brand name, current period, Summary / Import / Refresh / Logout / Audit Log buttons.
 * Used in: app/page.js. The Refresh here reloads the WHOLE page; each section also has its own small refresh icon.
 */
"use client";
import {Calendar,RefreshCw,Trophy,Upload,LogOut,Clock,History} from "lucide-react";
import {Btn} from "../ui";
import {brand,head} from "../../data/dashboardData";
import {useEffect,useState} from "react";
export default function DashboardHeader({stamp,period,importedTotal,onRefresh,onImport,onSummary,onLogout,onAuditLog,userRole}){
  const [currentTime,setCurrentTime]=useState("");
  const [userName,setUserName]=useState("");
  useEffect(()=>{
    if(typeof window!=="undefined"){
      setUserName(localStorage.getItem("userName")||"");
    }
  },[]);
  useEffect(()=>{
    const updateTime=()=>setCurrentTime(new Date().toLocaleTimeString());
    updateTime();
    const interval=setInterval(updateTime,1000);
    return()=>clearInterval(interval);
  },[]);
  const roleLabel=userRole==="head"?"Head":userRole==="tl"?"Team Leader":"Team Member";
  return <header className="sticky top-0 z-30 bg-slate-50/85 backdrop-blur border-b border-slate-200/70">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-lg bg-slate-900 text-white grid place-items-center font-semibold">{brand[0]}</div>
        <div><h1 className="text-lg font-semibold leading-tight tracking-tight">{brand}</h1><p className="text-xs text-slate-500">{userName} · {roleLabel}</p></div></div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white ring-1 ring-slate-200"><Calendar size={14} className="text-slate-500"/>{period}</span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white ring-1 ring-slate-200"><Clock size={14} className="text-slate-500"/>{currentTime}</span>
        <Btn onClick={onSummary} className="inline-flex items-center gap-1.5"><Trophy size={14}/>Summary</Btn>
        <button onClick={onImport} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-violet-600 text-white hover:bg-violet-700 active:scale-95 transition"><Upload size={14}/>Import data{importedTotal>0&&<span className="ml-1 rounded-full bg-white/25 px-1.5 text-xs">{importedTotal}</span>}</button>
        {userRole!=="executive"&&<Btn onClick={onAuditLog} className="inline-flex items-center gap-1.5"><History size={14}/>Audit Log</Btn>}
        <Btn onClick={onRefresh} aria-label="Refresh" className="inline-flex items-center"><RefreshCw size={14}/></Btn>
        <button onClick={onLogout} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 active:scale-95 transition" title="Logout"><LogOut size={14}/>Logout</button></div></div></header>;
}
