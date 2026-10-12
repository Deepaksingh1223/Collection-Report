/**
 * INPUT: TLs, their team names, targets and collected totals. Change this to add/remove teams.
 * Structure: 1 Head, 2 TLs, 21 team members total.
 * Total monthly target: ₹10 Crore (10 * 1e7)
 */
const CR=1e7;
// Inputs only. Totals shown in the UI are always derived from executives.
export const TLS=[
 {id:"TL1",name:"Amit",team:"Team Alpha",userId:"TL-1001",teamSize:11,target:5*CR,collected:4.4*CR},
 {id:"TL2",name:"Neeraj",team:"Team Beta",userId:"TL-1002",teamSize:10,target:5*CR,collected:4.15*CR},
];
