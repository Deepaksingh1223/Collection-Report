/**
 * Empty state and loading skeletons.
 */
export const Empty=()=><div className="text-center text-slate-500 py-12 text-sm">No collection data found for the selected filters.</div>;
export const SectionSkeleton=()=><div className="animate-pulse space-y-3"><div className="h-4 w-1/3 bg-slate-100 rounded"/><div className="h-28 bg-slate-100 rounded-lg"/><div className="h-4 w-2/3 bg-slate-100 rounded"/></div>;
export const Skeleton=()=><div className="space-y-4 animate-pulse"><div className="h-48 bg-slate-200/70 rounded-xl"/><div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">{[...Array(8)].map((_,i)=><div key={i} className="h-32 bg-slate-200/70 rounded-xl"/>)}</div></div>;
