/**
 * Generates the team members for every TL (seeded random, so values stay the same on every run).
 * Targets are equally divided among team members by each TL.
 */
import {TLS} from "./tlData";
import {head} from "./dashboardData";
import {incentive,isEligibleForIncentive} from "../utils/calculations";
export function rng(seed){let s=seed;return()=>((s=(s*16807)%2147483647)/2147483647)}
const names=["Rohit","Sneha","Vikram","Anjali","Karan","Pooja","Manish","Divya","Arjun","Neha","Sandeep","Ritu","Gaurav","Kavita","Deepak","Isha","Nitin","Swati","Yash","Meena","Tarun","Komal","Ajay","Priya","Sunil","Rekha","Vivek","Nisha","Harsh","Simran","Mohit","Payal","Lokesh"];
export const buckets=["0 DPD","1-30","31-60","61-90","90+"];
function build(){
  const r=rng(42),out=[];let n=0;
  TLS.forEach(tl=>{
    // Equal target distribution among team members
    const targetPerMember=Math.round(tl.target/tl.teamSize);
    const targets=Array.from({length:tl.teamSize},()=>targetPerMember);
    // Collections vary realistically (85-95% of target on average)
    const collections=targets.map(t=>Math.round(t*(0.85+r()*0.1)));
    const totalCollected=collections.reduce((a,b)=>a+b,0);
    const scaleFactor=tl.collected/totalCollected;
    const scaledCollections=collections.map(c=>Math.round(c*scaleFactor));
    let acc=0;const finalCollections=scaledCollections.map((c,i)=>{const v=i<scaledCollections.length-1?c:tl.collected-acc;acc+=v;return v});
    targets.forEach((t,i)=>{
      const alloc=Math.round(t/20000),contacted=Math.round(alloc*(0.7+r()*0.25)),connected=Math.round(contacted*(0.5+r()*0.3));
      const ptp=Math.round(connected*(0.3+r()*0.2)),kept=Math.round(ptp*(0.5+r()*0.3)),a=finalCollections[i]/t;
      const achievement=t>0?(finalCollections[i]/t)*100:0;
      n++;out.push({id:`E${n}`,name:names[(n-1)%names.length],userId:`EX-${2000+n}`,tlId:tl.id,tlName:tl.name,headId:head.id,headName:head.name,
        allocatedAccounts:alloc,contactedAccounts:contacted,connectedAccounts:connected,ptpCount:ptp,ptpAmount:ptp*18000,ptpKept:kept,ptpBroken:ptp-kept,
        paidAccounts:Math.round(alloc*Math.min(a,1)*0.85),target:t,collected:finalCollections[i],dpdBucket:buckets[Math.floor(r()*5)],
        achievement:achievement,incentive:isEligibleForIncentive(achievement)?incentive(finalCollections[i],achievement):0,eligible:isEligibleForIncentive(achievement)});
    });
  });
  return out;
}
export const executives=build();
