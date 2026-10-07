"use client";
/**
 * PAGE = composition only. All data/filter logic lives in hooks/useDashboard.js,
 * every visual block is a component in components/. Read top-to-bottom = what you see on screen.
 */
import {useState} from "react";
import {useDashboard} from "../hooks/useDashboard";
import DashboardHeader from "../components/layout/DashboardHeader";
import FilterBar from "../components/layout/FilterBar";
import ActiveFilters from "../components/layout/ActiveFilters";
import HeadlineBanner from "../components/layout/HeadlineBanner";
import SectionNav from "../components/layout/SectionNav";
import BrandProgress from "../components/sections/BrandProgress";
import KPICards from "../components/sections/KPICards";
import {TeamPerformance,TLPerformance} from "../components/sections/TeamPerformance";
import MemberTable from "../components/sections/MemberTable";
import {DailyData,MonthlyTrend} from "../components/sections/DailyData";
import AttentionPanel from "../components/sections/AttentionPanel";
import {TeamChart,TrendChart,TopChart} from "../components/charts/Charts";
import SummaryModal from "../components/modals/SummaryModal";
import ImportDialog from "../components/modals/ImportDialog";
import {Card,Empty,RefreshContext,Skeleton} from "../components/ui";

export default function Page(){
  const d=useDashboard(),[importing,setImporting]=useState(false),{f}=d;
  const focused=!!(f.tl||f.ex||f.q);
  const toggleTL=id=>d.set({tl:f.tl===id?"":id,ex:""});                                   // click a team/TL: focus it, click again: show all
  const pickDate=x=>f.from===x&&f.to===x?d.resetDates():d.set({from:x,to:x,month:""});     // click a date: focus it, click again: clear
  const openImport=()=>{d.setShowSummary(false);setImporting(true)};
  return <RefreshContext.Provider value={d.reload}>
    <DashboardHeader stamp={d.stamp} period={d.periodLabel} importedTotal={d.importedTotal} onRefresh={d.refresh} onImport={openImport} onSummary={()=>d.setShowSummary(true)}/>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <FilterBar f={f} set={d.set} reset={d.reset} resetDates={d.resetDates} months={d.months} bounds={d.bounds}/>
      <ActiveFilters f={f} onClear={k=>d.set(k==="tl"?{tl:"",ex:""}:{[k]:""})} onShowAll={d.showEverything}/>
      {!d.ready?<Skeleton/>:!d.execRows.length?<Card title="Performance"><Empty/></Card>:<>
        <HeadlineBanner d={d.insights}/>
        <SectionNav/>
        <BrandProgress t={d.total} period={d.periodLabel}/>
        <KPICards t={d.total} tlRows={d.tlRows} members={d.insights.members} imported={d.insights.impRecs}/>
        <TeamPerformance rows={d.allTlRows} selected={f.tl} onSelect={toggleTL}/>
        <div className="grid gap-5 lg:grid-cols-2"><TLPerformance rows={d.allTlRows} selected={f.tl} onSelect={toggleTL}/><TeamChart rows={d.allTlRows} selected={f.tl}/></div>
        <MemberTable rows={d.execRows} allRows={d.allExecRows} focused={focused} selectedEx={f.ex} onSelect={e=>d.set({tl:e.tlId,ex:f.ex===e.id?"":e.id})}/>
        <div className="grid gap-5 lg:grid-cols-2"><TrendChart rows={d.daily}/><TopChart rows={d.allExecRows}/></div>
        <div className="grid gap-5 lg:grid-cols-3"><div className="lg:col-span-2"><DailyData rows={d.daily} allRows={d.dailyCtx} selected={f.from&&f.from===f.to?f.from:""} onPick={pickDate}/></div><MonthlyTrend rows={d.monthly}/></div>
        <AttentionPanel tlRows={d.allTlRows} members={d.allExecRows} onSelect={d.set}/></>}
    </main>
    {d.showSummary&&<SummaryModal d={d.insights} onClose={()=>d.setShowSummary(false)} onImport={openImport}/>}
    <ImportDialog open={importing} onClose={()=>setImporting(false)} onImport={d.importRecords} importedTotal={d.importedTotal} onClear={d.clearImported}/>
  </RefreshContext.Provider>;
}
