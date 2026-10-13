/**
 * Brand name, head, reporting month, today's date, incentive slabs and the Top/Average/Low bands (performanceBands).
 * Total monthly target: ₹10 Crore
 */
export const brand="Instant Fundz";
export const head={id:"H001",name:"Rahul Sharma",userId:"HD-001"};
export const reportingMonth="October 2026";
export const reportingDate="06 Oct 2026";
// Total monthly target: ₹10 Crore
export const totalMonthlyTarget=10*1e7;
// Incentive eligibility threshold: 85% achievement
export const incentiveThreshold=85;
// Configurable incentive slabs (min achievement % -> % of collection paid as incentive). Keep sorted high to low.
export const incentiveRules={slabs:[{min:100,rate:5},{min:90,rate:3},{min:85,rate:2},{min:0,rate:0}],bonus:0};
export const performanceBands={excellent:90,good:75,average:60};
export const TODAY="2026-10-06";
export const DEFAULT_MONTH="2026-10";
