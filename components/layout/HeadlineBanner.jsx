/**
 * Dark one-line summary at the top (collected vs target, best TL, lagging TL, top member). Generated from the selected period.
 */
import {Sparkles} from "lucide-react";
import {inr} from "../../utils/formatters";
export default function HeadlineBanner({d}){
  const t=d.total,b=d.bestTL,w=d.worstTL;
  if(!t||!t.target)return null;
  return <section className="rounded-xl bg-slate-900 text-white p-5 animate-fadeUp"><div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400"><Sparkles size={13}/>{d.periodLabel} at a glance</div>
    <p className="mt-2 text-lg sm:text-xl font-semibold leading-snug">{inr(t.collected)} collected against a {inr(t.target)} target — <span className="text-emerald-300">{t.achievement.toFixed(1)}% achieved</span>, {inr(t.pending)} still to go.</p>
    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-300">
      {b&&<span>🏆 {b.team} ({b.name}) leads at {b.achievement.toFixed(1)}%</span>}
      {w&&<span>⚠ {w.team} ({w.name}) is behind at {w.achievement.toFixed(1)}%</span>}
      {d.top[0]&&<span>⭐ Top member: {d.top[0].name} ({d.top[0].achievement.toFixed(1)}%)</span>}</div></section>;
}
