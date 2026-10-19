/**
 * Delete Confirmation Modal
 * Confirms before deleting a team member
 */
import {useState} from "react";
import {X,AlertTriangle} from "lucide-react";
import {deleteMember} from "../../utils/dataManager";

export default function DeleteConfirmModal({open,onClose,onSuccess,member}){
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const handleDelete=async()=>{
    setError("");
    setLoading(true);

    const result=deleteMember(member.id);
    if(result){
      onSuccess&&onSuccess(member);
      onClose();
    }else{
      setError("Failed to delete member. Please try again.");
    }
    setLoading(false);
  };

  if(!open||!member)return null;

  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 backdrop-blur-[2px] p-4 animate-fade" onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 animate-fadeUp">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={24} className="text-red-600"/>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Delete Team Member</h2>
            <p className="text-sm text-slate-500">This action cannot be undone</p>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg hover:bg-slate-100"><X size={18}/></button>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 mb-4">
        <p className="text-sm text-slate-700">
          Are you sure you want to delete <b>{member.name}</b> ({member.userId})?
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Current target: {member.target?.toLocaleString()||"N/A"} · Instant Fundz: {member.tlName}
        </p>
      </div>

      {error&&<div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 mb-4">{error}</div>}

      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">Cancel</button>
        <button onClick={handleDelete} disabled={loading} className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 transition">
          {loading?"Deleting...":"Delete Member"}
        </button>
      </div>
    </div>
  </div>;
}
