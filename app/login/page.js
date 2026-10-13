"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Lock,User,ShieldCheck} from "lucide-react";

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

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 relative overflow-hidden flex items-center justify-center p-4">
    {/* Animated Background Accents */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl animate-float"/>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl animate-float" style={{animationDelay:'2s'}}/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl animate-gradientShift bg-gradient-to-r from-brand-orange/10 to-brand-red/10"/>
    </div>

    {/* Glassmorphism Login Card */}
    <div className="relative w-full max-w-md animate-slideUp">
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/50 overflow-hidden">
        {/* Header Section */}
        <div className="px-8 py-10 text-center bg-gradient-to-r from-brand-orange/5 to-brand-red/5 border-b border-white/50">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-orange to-brand-red rounded-full mb-4 shadow-lg shadow-brand-orange/30 animate-fadeIn">
            <ShieldCheck className="w-10 h-10 text-white"/>
          </div>
          <h1 className="text-3xl font-bold text-brand-dark tracking-tight animate-fadeIn" style={{animationDelay:'0.1s'}}>Instant Fundz</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium animate-fadeIn" style={{animationDelay:'0.2s'}}>Loan Collection Dashboard</p>
        </div>

        {/* Form Section */}
        <div className="px-8 py-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* User ID Input */}
            <div className="space-y-2 animate-fadeIn" style={{animationDelay:'0.3s'}}>
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">User ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-brand-orange transition-colors duration-200"/>
                </div>
                <input 
                  type="text" 
                  value={userId} 
                  onChange={e=>setUserId(e.target.value)} 
                  placeholder="Enter your User ID"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white/80 focus:ring-2 focus:ring-brand-orange/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2 animate-fadeIn" style={{animationDelay:'0.4s'}}>
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-brand-orange transition-colors duration-200"/>
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e=>setPassword(e.target.value)} 
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white/80 focus:ring-2 focus:ring-brand-orange/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error&&<div className="flex items-center gap-2 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl text-sm text-red-700 animate-fadeIn">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              {error}
            </div>}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-orange to-brand-red hover:from-orange-600 hover:to-red-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 animate-fadeIn"
              style={{animationDelay:'0.5s'}}
            >
              {loading?(
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Signing in...
                </>
              ):(
                <>
                  <ShieldCheck className="w-5 h-5"/>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="pt-6 border-t border-slate-200/50 animate-fadeIn" style={{animationDelay:'0.6s'}}>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
              <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                Demo Credentials
              </p>
              <div className="space-y-1 text-xs text-slate-500">
                <p><span className="font-medium text-slate-700">Head:</span> HD-001 / admin123</p>
                <p><span className="font-medium text-slate-700">Team Leader:</span> TL-1001 / admin123</p>
                <p><span className="font-medium text-slate-700">Executive:</span> EX-2001 / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
