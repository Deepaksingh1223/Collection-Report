/**
 * agg() sums rows, groupTL() builds ranked team rows, tierOf()/status() decide Top/Average/Low labels, incentive() uses the slabs.
 */
import {incentiveRules,performanceBands as pb,incentiveThreshold} from "../data/dashboardData";
const K=["target","collected","allocatedAccounts","contactedAccounts","connectedAccounts","ptpCount","ptpAmount","ptpKept","ptpBroken","paidAccounts"];
export const ach=(c,t)=>t>0&&Number.isFinite(c/t)?(c/t)*100:0;
export function agg(rows){
  const s={};K.forEach(k=>{s[k]=rows.reduce((a,e)=>a+(e[k]||0),0)});
  s.pending=Math.max(s.target-s.collected,0);s.achievement=ach(s.collected,s.target);s.pendingAccounts=Math.max(s.allocatedAccounts-s.paidAccounts,0);
  s.ptpRate=s.ptpCount>0?(s.ptpKept/s.ptpCount)*100:0;s.efficiency=s.allocatedAccounts>0?Math.min((s.paidAccounts/s.allocatedAccounts)*100,100):0;return s;
}
export const tierOf=a=>a>=pb.good?"top":a>=pb.average?"avg":"low";
export const status=a=>a>=pb.excellent?"Excellent":a>=pb.good?"Good":a>=pb.average?"Average":"Needs Attention";
// Check if achievement meets 85% threshold for incentive eligibility
export const isEligibleForIncentive=a=>a>=incentiveThreshold;
// Calculate incentive based on achievement percentage
export const incentive=(c,a)=>{const s=incentiveRules.slabs.find(x=>a>=x.min);return Math.round(c*(s?s.rate:0)/100)+(incentiveRules.bonus||0)};
// Calculate incentive for TL based on team performance
export const tlIncentive=(collected,achievement)=>isEligibleForIncentive(achievement)?incentive(collected,achievement):0;
// Calculate incentive for Head based on overall team performance (85% threshold)
export const headIncentive=(collected,achievement)=>isEligibleForIncentive(achievement)?incentive(collected,achievement):0;
export function groupTL(execs,tls){
  return tls.map(tl=>{const rows=execs.filter(e=>e.tlId===tl.id);return{id:tl.id,name:tl.name,team:tl.team,userId:tl.userId,...agg(rows),teamSize:rows.length}}).filter(t=>t.teamSize>0)
   .sort((a,b)=>b.achievement-a.achievement).map((t,i)=>({...t,rank:i+1,status:status(t.achievement),incentive:tlIncentive(t.collected,t.achievement),eligible:isEligibleForIncentive(t.achievement)}));
}
