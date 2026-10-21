/**
 * Exports DailyData (date-wise table) and MonthlyTrend (month-wise bars).
 * DailyData can expand from the selected dates to every date of the month with one button.
 */
import {useState} from "react";
import {Btn,Card,Empty,Pill,TD,TH} from "../ui";
import {fmtDate,inr,monthLabel} from "../../utils/formatters";

// rows = dates in the selected range, allRows = every date of the surrounding month(s). `selected` = single picked date.
export function DailyData({rows,allRows,selected,onPick,userRole}){
  const [all,setAll]=useState(false),canExpand=allRows.length>rows.length,view=all&&canExpand?allRows:rows;
  const isExecutive=userRole==="executive";
  return <Card id="trends" title="Date-wise Performance" subtitle="Click a row to focus a date, click again to clear"
    right={canExpand&&<Btn onClick={()=>setAll(!all)}>{all?"Selected dates only":`Show all ${allRows.length} dates`}</Btn>}>
    {!view.length?<Empty/>:<>
    <div className="mt-4 overflow-auto max-h-80 rounded-lg ring-1 ring-slate-100"><table className="w-full text-sm"><thead className="sticky top-0 bg-white shadow-[0_1px_0_#f1f5f9]"><tr>
      {[...["Date","Target","Collection","Remaining","Ach %"],...(!isExecutive?["Top performer","Best Instant Fundz"]:[]),"Source"].map(h=><th key={h} className={TH}>{h}</th>)}</tr></thead><tbody>
      {view.map(d=><tr key={d.date} onClick={()=>onPick(d.date)} className={`border-t border-slate-50 cursor-pointer hover:bg-indigo-50/40 transition ${selected===d.date?"bg-indigo-50":d.importedCount?"bg-violet-50/60":""} ${d.importedCount?"border-l-2 border-l-violet-500":""}`}>
        <td className={TD+" font-medium"}>{fmtDate(d.date)}</td><td className={TD}>{inr(d.target)}</td><td className={TD}>{inr(d.collected)}</td><td className={TD}>{inr(d.pending)}</td><td className={TD}>{d.achievement.toFixed(1)}%</td>
        {!isExecutive&&<td className={TD}>{d.topMember}</td>}
        {!isExecutive&&<td className={TD}>{d.bestTL}</td>}
        <td className={TD}>{d.importedCount?<Pill>Imported · {d.importedCount}</Pill>:<span className="text-slate-400">Historical</span>}</td></tr>)}</tbody></table></div></>}</Card>;
}

// Month-wise totals with growth over the previous month.
export function MonthlyTrend({rows}){
  const max=Math.max(...rows.map(r=>Math.max(r.target,r.collected)),1);
  return <Card title="Month-wise Trend" subtitle="Collection vs target, growth over previous month">{!rows.length?<Empty/>:<div className="space-y-4">
    {rows.map(r=><div key={r.ym}><div className="flex flex-wrap items-center justify-between gap-2 text-sm"><b>{monthLabel(r.ym)} {r.importedCount>0&&<Pill>New data</Pill>}</b>
      <span className="text-xs text-slate-500">{inr(r.collected)} of {inr(r.target)} · {r.achievement.toFixed(1)}%{r.growth!=null&&<span className={r.growth>=0?"text-emerald-600":"text-amber-600"}> · {r.growth>=0?"↑":"↓"} {Math.abs(r.growth).toFixed(1)}%</span>}</span></div>
      <div className="mt-1.5 space-y-1"><div className="h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-300" style={{width:`${r.target/max*100}%`}}/></div>
        <div className="h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-600 transition-all duration-700" style={{width:`${r.collected/max*100}%`}}/></div></div></div>)}</div>}</Card>;
}
