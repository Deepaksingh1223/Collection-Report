/**
 * Team Tree View: Shows hierarchy (Head → TLs → Team Members) with performance metrics
 */
import {ChevronDown,ChevronRight,Crown,Users} from "lucide-react";
import {Card} from "../ui";
import {inr} from "../../utils/formatters";
import {useState} from "react";
import {head} from "../../data/dashboardData";

export default function TeamTree({tlRows,allExecRows}){
  const [expanded,setExpanded]=useState({});

  const toggleTL=id=>setExpanded(x=>({...x,[id]:!x[id]}));
  const toggleMember=id=>setExpanded(x=>({...x,[id]:!x[id]}));

  return <Card id="team-tree" title="Team Hierarchy" subtitle="Head → TLs → Team Members structure">
    <div className="space-y-3">
      {/* Head Level */}
      <div className="rounded-lg bg-slate-900 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
            <Crown size={20} className="text-amber-400"/>
          </div>
          <div className="flex-1">
            <div className="font-semibold">Instant Fundz</div>
            <div className="text-xs text-slate-300">Head · {head.userId}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">Target: ₹10 Cr</div>
            <div className="text-xs text-slate-300">{tlRows.length} TLs · {allExecRows.length} Members</div>
          </div>
        </div>
      </div>

      {/* TLs Level */}
      {tlRows.map(tl=>(
        <div key={tl.id} className="rounded-lg border border-slate-200 overflow-hidden">
          <button onClick={()=>toggleTL(tl.id)} className="w-full p-3 bg-slate-50 hover:bg-slate-100 transition flex items-center gap-3">
            {expanded[tl.id]?<ChevronDown size={18}/>:<ChevronRight size={18}/>}
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
              {tl.name[0]}
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-slate-900">{tl.name}</div>
              <div className="text-xs text-slate-500">{tl.team} · {tl.userId} · {tl.teamSize} members</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-slate-900">{inr(tl.target)}</div>
              <div className="text-xs text-slate-500">{tl.achievement.toFixed(1)}% achieved</div>
            </div>
          </button>

          {/* Team Members (expanded) */}
          {expanded[tl.id]&&(
            <div className="p-3 bg-white border-t border-slate-200 space-y-2">
              {allExecRows.filter(e=>e.tlId===tl.id).map(member=>(
                <div key={member.id} className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 transition">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-xs">
                    {member.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">{member.name}</div>
                    <div className="text-xs text-slate-500">{member.userId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-900">{inr(member.target)}</div>
                    <div className="text-xs text-slate-500">{member.achievement.toFixed(1)}%</div>
                  </div>
                  <div className="text-right w-20">
                    <div className={`text-xs font-medium ${member.eligible?"text-emerald-600":"text-slate-400"}`}>
                      {member.eligible?inr(member.incentive||0):"-"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </Card>;
}
