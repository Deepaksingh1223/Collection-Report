"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Lock,User} from "lucide-react";

export default function LoginPage(){
  const router=useRouter();
  const [userId,setUserId]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const handleLogin=e=>{
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple authentication check (demo credentials)
    setTimeout(()=>{
      if(userId==="HD-001"&&password==="admin123"){
        localStorage.setItem("isLoggedIn","true");
        localStorage.setItem("userRole","head");
        localStorage.setItem("userId",userId);
        localStorage.setItem("userName","Rahul Sharma");
        router.push("/");
      }else if(userId.startsWith("TL-")&&password==="admin123"){
        localStorage.setItem("isLoggedIn","true");
        localStorage.setItem("userRole","tl");
        localStorage.setItem("userId",userId);
        localStorage.setItem("userName",userId==="TL-1001"?"Amit":"Neeraj");
        router.push("/");
      }else if(userId.startsWith("EX-")&&password==="admin123"){
        localStorage.setItem("isLoggedIn","true");
        localStorage.setItem("userRole","executive");
        localStorage.setItem("userId",userId);
        localStorage.setItem("userName","Team Member");
        router.push("/");
      }else{
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      }
    },500);
  };

  return <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">ABC Finance</h1>
        <p className="text-slate-500">Loan Collection Dashboard</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">User ID</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
            <input type="text" value={userId} onChange={e=>setUserId(e.target.value)} placeholder="Enter your User ID"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required/>
          </div>
        </div>

        {error&&<div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}

        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2.5 rounded-lg transition duration-200">
          {loading?"Signing in...":"Sign In"}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500 text-center">
          Demo credentials: HD-001, TL-1001, or EX-2001 / admin123
        </p>
      </div>
    </div>
  </div>;
}
