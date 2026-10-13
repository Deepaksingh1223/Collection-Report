/**
 * Edit Team Member Modal
 * Allows editing existing team member details
 */
import {useState,useEffect} from "react";
import {X,User,Mail,Phone} from "lucide-react";
import {TLS} from "../../data/tlData";
import {inr} from "../../utils/formatters";
import {saveMember} from "../../utils/dataManager";

export default function EditMemberModal({open,onClose,onSuccess,member}){
  const [formData,setFormData]=useState({
    name:"",
    tlId:"",
    target:"",
    status:"Active",
    contact:"",
    email:""
  });
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  useEffect(()=>{
    if(open&&member){
      setFormData({
        name:member.name||"",
        tlId:member.tlId||"",
        target:member.target||"",
        status:member.status||"Active",
        contact:member.contact||"",
        email:member.email||""
      });
      setError("");
    }
  },[open,member]);

  const handleSubmit=async e=>{
    e.preventDefault();
    setError("");
    setLoading(true);

    if(!formData.name||!formData.tlId||!formData.target){
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    const targetNum=Number(formData.target);
    if(isNaN(targetNum)||targetNum<=0){
      setError("Target must be a positive number");
      setLoading(false);
      return;
    }

    const tl=TLS.find(t=>t.id===formData.tlId);
    const updatedMember={
      ...member,
      name:formData.name,
      tlId:formData.tlId,
      tlName:tl.name,
      target:targetNum,
      status:formData.status,
      contact:formData.contact,
      email:formData.email,
      allocatedAccounts:Math.round(targetNum/20000)
    };

    // Pass original member as beforeData for audit log
    const result=saveMember(updatedMember,"update",member);
    if(result){
      onSuccess&&onSuccess(updatedMember);
      onClose();
    }else{
      setError("Failed to update member. Please try again.");
    }
    setLoading(false);
  };

  if(!open||!member)return null;

  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 backdrop-blur-[2px] p-4 animate-fade" onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 animate-fadeUp">
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Edit Team Member</h2>
          <p className="text-sm text-slate-500">Update member details for {member.name}</p>
        </div>
        <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg hover:bg-slate-100"><X size={18}/></button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
            <input type="text" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}
              placeholder="Enter full name" className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none" required/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Team Leader *</label>
          <select value={formData.tlId} onChange={e=>setFormData({...formData,tlId:e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none" required>
            {TLS.map(tl=>(
              <option key={tl.id} value={tl.id}>{tl.name} - {tl.team}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Target (₹) *</label>
          <input type="number" value={formData.target} onChange={e=>setFormData({...formData,target:e.target.value})}
            placeholder="Enter target amount" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none" required/>
          {formData.target&&<p className="text-xs text-slate-500 mt-1">Target: {inr(Number(formData.target))}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select value={formData.status} onChange={e=>setFormData({...formData,status:e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
            <input type="tel" value={formData.contact} onChange={e=>setFormData({...formData,contact:e.target.value})}
              placeholder="Enter contact number" className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
            <input type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}
              placeholder="Enter email address" className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"/>
          </div>
        </div>

        {error&&<div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}

        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-brand-orange to-brand-red text-white hover:from-orange-600 hover:to-red-700 disabled:from-slate-400 disabled:to-slate-500 transition">
            {loading?"Updating...":"Update Member"}
          </button>
        </div>
      </form>
    </div>
  </div>;
}
