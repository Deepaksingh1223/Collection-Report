/**
 * Chips that jump to sections on the page (anchors match the `id` of each section).
 */
const LINKS=[["#brand","Brand"],["#kpis","Key metrics"],["#teams","Teams"],["#tls","TLs"],["#members","Members"],["#trends","Trends"],["#attention","Attention"]];
export default function SectionNav(){
  return <nav aria-label="Sections" className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">{LINKS.map(([h,l])=><a key={h} href={h} className="whitespace-nowrap rounded-full bg-white ring-1 ring-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-brand-dark hover:text-white hover:ring-brand-dark transition">{l}</a>)}</nav>;
}
