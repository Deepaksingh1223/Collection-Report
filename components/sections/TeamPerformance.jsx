/**
 * Exports TeamPerformance (table) and TLPerformance (ranked cards). Both always list ALL teams; the selected one is highlighted.
 * Props: rows (allTlRows), selected (tl id), onSelect(id) - clicking toggles focus.
 */
import {Card,Bar,Badge,Pill,TierTag,TD,TH,medal} from "../ui";
import {inr} from "../../utils/formatters";
const fill=(t,first)=>first||t.tier==="top"?"bg-emerald-500":t.tier==="low"?"bg-slate-300":"bg-indigo-500";

// Table comparing every team. `selected` = currently focused TL id; clicking a row focuses it, clicking again shows all.
export function TeamPerformance({rows,selected,onSelect}){
  return <Card id="teams" title="Team Performance" subtitle="All teams ranked · click a row to focus, click again to show everyone"><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="border-b border-slate-100"><tr>
    {["Rank","Team","Leader","Members","Target","Collection","Avg / member","Ach %","Incentive","Status"].map(h=><th key={h} className={TH}>{h}</th>)}</tr></thead><tbody>
    {rows.map(t=>{const first=t.rank===1&&rows.length>1,sel=selected===t.id;
      return <tr key={t.id} onClick={()=>onSelect(t.id)} className={`border-b border-slate-50 last:border-0 cursor-pointer transition hover:bg-indigo-50/40 ${sel?"bg-indigo-50 ring-1 ring-inset ring-indigo-300":first?"bg-emerald-50/60":t.tier==="low"?"text-slate-500 bg-slate-50/60":""}`}>
        <td className={TD}>{medal(t.rank)}</td><td className={TD+" font-medium"}>{t.team}{sel&&<span className="ml-2 text-[10px] font-semibold text-indigo-600">SELECTED</span>}{t.importedCount>0&&<span className="ml-2"><Pill>New data</Pill></span>}</td>
        <td className={TD}>{t.name}</td><td className={TD}>{t.teamSize}</td><td className={TD}>{inr(t.target)}</td><td className={TD}>{inr(t.collected)}</td><td className={TD}>{inr(t.avgPerMember)}</td>
        <td className={TD}><div className="flex items-center gap-2 min-w-[110px]"><div className="flex-1"><Bar v={t.achievement} color={fill(t,first)}/></div><span className="tabular-nums">{t.achievement.toFixed(1)}%</span></div></td>
        <td className={TD}>{t.eligible?<span className="text-emerald-600 font-medium">{inr(t.incentive||0)}</span>:<span className="text-slate-400">-</span>}</td>
        <td className={TD}><Badge t={t.status}/> {t.tier==="low"&&<span className="text-amber-600">↓</span>}{t.tier==="top"&&<span className="text-emerald-600">↑</span>}</td></tr>})}</tbody></table></div></Card>;
}

// Ranked TL cards. Same selection behaviour as the table above.
export function TLPerformance({rows,selected,onSelect}){
  return <Card id="tls" title="TL Performance" subtitle="Ranked for the selected period"><div className="space-y-3">
    {rows.map(t=>{const first=t.rank===1&&rows.length>1,sel=selected===t.id;
      return <button key={t.id} onClick={()=>onSelect(t.id)} className={`w-full text-left rounded-xl p-4 transition ${sel?"bg-indigo-50 ring-2 ring-indigo-400":first?"bg-emerald-50 ring-2 ring-emerald-300 shadow-sm":t.tier==="low"?"bg-slate-50 ring-1 ring-slate-200 text-slate-500":"ring-1 ring-slate-200 hover:ring-indigo-300"}`}>
        <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-3"><span className="text-xl w-8 text-center">{medal(t.rank)}</span>
          <div><div className="font-semibold text-slate-900">{t.name}{first&&<span className="ml-2 text-xs font-semibold text-emerald-700">#1 Best TL</span>}{sel&&<span className="ml-2 text-[10px] font-semibold text-indigo-600">SELECTED</span>}</div>
            <div className="text-xs text-slate-500">{t.userId} · {t.team} · {t.teamSize} members</div></div></div>
          <div className="text-right"><div className="text-lg font-semibold tabular-nums">{t.achievement.toFixed(1)}%</div><Badge t={t.status}/></div></div>
        <div className="mt-3"><Bar v={t.achievement} color={fill(t,first)}/></div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500"><span>Target {inr(t.target)} · Collection {inr(t.collected)} · Remaining {inr(t.pending)}</span><span>Incentive: {t.eligible?inr(t.incentive||0):"Not eligible"}</span><TierTag tier={first?"top":t.tier}/></div></button>})}</div></Card>;
}
