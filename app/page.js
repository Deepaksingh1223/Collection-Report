"use client";
/**
 * PAGE = composition only. All data/filter logic lives in hooks/useDashboard.js,
 * every visual block is a component in components/. Read top-to-bottom = what you see on screen.
 */
import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import {useDashboard} from "../hooks/useDashboard";
import DashboardHeader from "../components/layout/DashboardHeader";
import FilterBar from "../components/layout/FilterBar";
import ActiveFilters from "../components/layout/ActiveFilters";
import HeadlineBanner from "../components/layout/HeadlineBanner";
import SectionNav from "../components/layout/SectionNav";
import BrandProgress from "../components/sections/BrandProgress";
import KPICards from "../components/sections/KPICards";
import ExecutiveKPICards from "../components/sections/ExecutiveKPICards";
import {TeamPerformance,TLPerformance} from "../components/sections/TeamPerformance";
import MemberTable from "../components/sections/MemberTable";
import {DailyData,MonthlyTrend} from "../components/sections/DailyData";
import AttentionPanel from "../components/sections/AttentionPanel";
import {TeamChart,TrendChart,TopChart} from "../components/charts/Charts";
import SummaryModal from "../components/modals/SummaryModal";
import ImportDialog from "../components/modals/ImportDialog";
import TeamTree from "../components/sections/TeamTree";
import AddMemberModal from "../components/modals/AddMemberModal";
import EditMemberModal from "../components/modals/EditMemberModal";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import AuditLog from "../components/sections/AuditLog";
import {Card,Empty,RefreshContext,Skeleton} from "../components/ui";
import {downloadWhatsAppReport} from "../utils/excelExport";
import {TLS} from "../data/tlData";
import {executives} from "../data/executiveData";
import {getAllMembers} from "../utils/dataManager";

export const dynamic='force-dynamic';

export default function Page(){
  const router=useRouter();
  const d=useDashboard(),[importing,setImporting]=useState(false),{f,userRole,userId}=d;
  const focused=!!(f.tl||f.ex||f.q);
  const [addMemberOpen,setAddMemberOpen]=useState(false);
  const [editMemberOpen,setEditMemberOpen]=useState(false);
  const [deleteMemberOpen,setDeleteMemberOpen]=useState(false);
  const [auditLogOpen,setAuditLogOpen]=useState(false);
  const [selectedMember,setSelectedMember]=useState(null);

  // Check authentication on mount
  useEffect(()=>{
    if(typeof window==="undefined") return;
    const isLoggedIn=localStorage.getItem("isLoggedIn");
    if(!isLoggedIn||isLoggedIn!=="true"){
      router.replace("/login");
    }
  },[router]);

  const toggleTL=id=>d.set({tl:f.tl===id?"":id,ex:""});                                   // click a team/TL: focus it, click again: show all
  const pickDate=x=>f.from===x&&f.to===x?d.resetDates():d.set({from:x,to:x,month:""});     // click a date: focus it, click again: clear
  const openImport=()=>{d.setShowSummary(false);setImporting(true)};
  const handleLogout=()=>{
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const handleAddMember=()=>{
    setAddMemberOpen(true);
  };

  const handleEditMember=member=>{
    setSelectedMember(member);
    setEditMemberOpen(true);
  };

  const handleDeleteMember=member=>{
    setSelectedMember(member);
    setDeleteMemberOpen(true);
  };

  const handleMemberSuccess=()=>{
    d.refresh(); // Refresh dashboard data after member changes
  };

  const handleDownloadDRR=()=>{
    // Get ALL team members from base data
    const allMembers = getAllMembers();

    // Group members by team leader
    const membersByTeam = {};
    allMembers.forEach(exec => {
      if (!membersByTeam[exec.tlId]) {
        membersByTeam[exec.tlId] = [];
      }
      membersByTeam[exec.tlId].push(exec);
    });

    // Check if a specific TL is selected in filter
    // If f.tl is empty or "", download all TLs
    // If f.tl has a value, download only that specific TL
    let tlData;
    if (f.tl) {
      // Specific TL selected - download only that TL
      const selectedTl = TLS.find(tl => tl.id === f.tl);
      tlData = [{
        name: selectedTl?.name || "Team",
        members: membersByTeam[f.tl] || []
      }];
    } else {
      // "All" selected - download all TLs
      tlData = TLS.map(tl => ({
        name: tl.name,
        members: membersByTeam[tl.id] || []
      }));
    }

    // Download report
    downloadWhatsAppReport(tlData, d.periodLabel);
  };

  return <RefreshContext.Provider value={d.reload}>
    {!d.ready?<Skeleton/>:<>
      <DashboardHeader stamp={d.stamp} period={d.periodLabel} importedTotal={d.importedTotal} onRefresh={d.refresh} onImport={openImport} onSummary={()=>d.setShowSummary(true)} onLogout={handleLogout} onAuditLog={()=>setAuditLogOpen(true)} userRole={userRole} onDownloadDRR={handleDownloadDRR} selectedPeriod={f.month||f.from||"Today"}/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <FilterBar f={f} set={d.set} reset={d.reset} resetDates={d.resetDates} months={d.months} bounds={d.bounds} userRole={userRole} userId={userId}/>
        {userRole!=="executive"&&<ActiveFilters f={f} onClear={k=>d.set(k==="tl"?{tl:"",ex:""}:{[k]:""})} onShowAll={d.showEverything}/>}
        {userRole==="executive"&&d.execRows.length>0&&<ExecutiveKPICards member={d.execRows[0]}/>}
        {!d.execRows.length?<Card title="Performance"><Empty/></Card>:<>
          {userRole!=="executive"&&<HeadlineBanner d={d.insights}/>}
          {userRole!=="executive"&&<SectionNav/>}
          {userRole!=="executive"&&<BrandProgress t={d.total} period={d.periodLabel}/>}
          {userRole!=="executive"&&<KPICards t={d.total} tlRows={d.tlRows} members={d.insights.members} imported={d.insights.impRecs}/>}
          {userRole!=="executive"&&<TeamTree tlRows={d.visibleTlRows} allExecRows={d.visibleExecRows}/>}
          {userRole!=="executive"&&<TeamPerformance rows={d.visibleTlRows} selected={f.tl} onSelect={toggleTL}/>}
          {userRole!=="executive"&&<TLPerformance rows={d.visibleTlRows} selected={f.tl} onSelect={toggleTL}/>}
          <MemberTable rows={d.execRows} allRows={d.visibleExecRows} focused={focused} selectedEx={f.ex} onSelect={e=>d.set({tl:e.tlId,ex:f.ex===e.id?"":e.id})} onAdd={handleAddMember} onEdit={handleEditMember} onDelete={handleDeleteMember} userRole={userRole}/>
          {userRole!=="executive"&&<TopChart rows={d.visibleExecRows}/>}
          <div className="grid gap-5 lg:grid-cols-3"><div className="lg:col-span-2 overflow-auto"><DailyData rows={d.daily} allRows={d.dailyCtx} selected={f.from&&f.from===f.to?f.from:""} onPick={pickDate} userRole={userRole}/></div><MonthlyTrend rows={d.monthly}/></div>
          {userRole!=="executive"&&<AttentionPanel tlRows={d.visibleTlRows} members={d.visibleExecRows} onSelect={d.set}/>}
        </>}
      </main>
    </>}
    {d.showSummary&&<SummaryModal d={d.insights} onClose={()=>d.setShowSummary(false)} onImport={openImport}/>}
    <ImportDialog open={importing} onClose={()=>setImporting(false)} onImport={d.importRecords} importedTotal={d.importedTotal} onClear={d.clearImported}/>
    <AddMemberModal open={addMemberOpen} onClose={()=>setAddMemberOpen(false)} onSuccess={handleMemberSuccess}/>
    <EditMemberModal open={editMemberOpen} onClose={()=>setEditMemberOpen(false)} onSuccess={handleMemberSuccess} member={selectedMember}/>
    <DeleteConfirmModal open={deleteMemberOpen} onClose={()=>setDeleteMemberOpen(false)} onSuccess={handleMemberSuccess} member={selectedMember}/>
    <AuditLog open={auditLogOpen} onClose={()=>setAuditLogOpen(false)}/>
  </RefreshContext.Provider>;
}
