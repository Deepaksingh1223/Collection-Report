/**
 * Audit Log Component
 * Shows detailed history of all data changes (add, update, delete operations)
 * With before/after values, filtering, and search
 */
import {Clock,Edit,Trash2,UserPlus,X,Search,Filter} from "lucide-react";
import {Card} from "../ui";
import {getAuditLog,clearAuditLog} from "../../utils/dataManager";
import {useState,useEffect} from "react";
import {inr} from "../../utils/formatters";

const ACTION_ICONS={
  add:{icon:UserPlus,color:"text-emerald-600",bg:"bg-emerald-100",label:"New Member Added"},
  update:{icon:Edit,color:"text-blue-600",bg:"bg-blue-100",label:"Member Updated"},
  delete:{icon:Trash2,color:"text-red-600",bg:"bg-red-100",label:"Member Removed"}
};

export default function AuditLog({open,onClose}){
  const [logs,setLogs]=useState([]);
  const [filter,setFilter]=useState("all");
  const [search,setSearch]=useState("");

  useEffect(()=>{
    if(open){
      setLogs(getAuditLog());
    }
  },[open]);

  const handleClear=()=>{
    if(confirm("Are you sure you want to clear the audit log?")){
      clearAuditLog();
      setLogs([]);
    }
  };

  const filteredLogs=logs.filter(log=>{
    const matchesFilter=filter==="all"||log.action===filter;
    const matchesSearch=!search||
      log.memberName?.toLowerCase().includes(search.toLowerCase())||
      log.userId?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter&&matchesSearch;
  });

  if(!open)return null;

  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 backdrop-blur-[2px] p-4 animate-fade" onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 animate-fadeUp">
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Audit Log</h2>
          <p className="text-sm text-slate-500">Detailed history of all data changes</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleClear} className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">Clear Log</button>
          <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg hover:bg-slate-100"><X size={18}/></button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
          <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search by name or user ID..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"/>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-500"/>
          <select value={filter} onChange={e=>setFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
            <option value="all">All Actions</option>
            <option value="add">Added</option>
            <option value="update">Updated</option>
            <option value="delete">Removed</option>
          </select>
        </div>
      </div>

      {filteredLogs.length===0?(
        <div className="text-center py-12 text-slate-500">
          <Clock size={48} className="mx-auto mb-4 text-slate-300"/>
          <p>{logs.length===0?"No audit log entries yet":"No matching entries found"}</p>
        </div>
      ):(
        <div className="space-y-3">
          {filteredLogs.map(log=>{
            const config=ACTION_ICONS[log.action]||ACTION_ICONS.update;
            const Icon=config.icon;
            const date=new Date(log.timestamp);
            return <div key={log.id} className="rounded-lg bg-slate-50 border border-slate-200 overflow-hidden">
              <div className="flex items-start gap-3 p-4">
                <div className={`h-10 w-10 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={config.color}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-slate-900">{config.label}</span>
                    <span className="text-xs text-slate-500">by {log.user}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400">{date.toLocaleDateString()} at {date.toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm text-slate-700 font-medium">{log.memberName} ({log.userId})</p>
                </div>
              </div>

              {/* Detailed Changes */}
              {log.changes&&log.changes.length>0&&(
                <div className="px-4 pb-4 pt-0">
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="text-xs font-medium text-slate-600 mb-2">Changes made:</p>
                    {log.changes.map((change,idx)=>(
                      <div key={idx} className="text-xs text-slate-600 py-1 border-b border-slate-100 last:border-0">
                        <span className="font-medium">{change.field}:</span>
                        <span className="text-red-600 ml-1">{change.from}</span>
                        <span className="text-slate-400 mx-1">→</span>
                        <span className="text-emerald-600">{change.to}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Before/After for Delete */}
              {log.action==="delete"&&log.before&&(
                <div className="px-4 pb-4 pt-0">
                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <p className="text-xs font-medium text-red-700 mb-2">Removed member details:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                      <div><span className="font-medium">Name:</span> {log.before.name}</div>
                      <div><span className="font-medium">Instant Fundz:</span> {log.before.tlName}</div>
                      <div><span className="font-medium">Target:</span> {inr(log.before.target)}</div>
                      <div><span className="font-medium">Status:</span> {log.before.status}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* After for Add */}
              {log.action==="add"&&log.after&&(
                <div className="px-4 pb-4 pt-0">
                  <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                    <p className="text-xs font-medium text-emerald-700 mb-2">New member details:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                      <div><span className="font-medium">Name:</span> {log.after.name}</div>
                      <div><span className="font-medium">Instant Fundz:</span> {log.after.tlName}</div>
                      <div><span className="font-medium">Target:</span> {inr(log.after.target)}</div>
                      <div><span className="font-medium">Status:</span> {log.after.status}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>;
          })}
        </div>
      )}
    </div>
  </div>;
}
