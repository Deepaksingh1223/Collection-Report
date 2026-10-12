/**
 * Data Management Utilities for CRUD operations on team members
 * Handles localStorage persistence for member data changes with detailed audit logging
 */
import {executives} from "../data/executiveData";
import {TLS} from "../data/tlData";

const STORAGE_KEY="lcd.team.members.v1";
const AUDIT_KEY="lcd.audit.log.v1";

// Get all members (initial + localStorage changes)
export function getAllMembers(){
  try{
    const stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
    const base=[...executives];
    const storedIds=new Set(stored.map(m=>m.id));
    // Remove deleted members from base
    const filtered=base.filter(m=>!storedIds.has(m.id)||stored.find(s=>s.id===m.id&&!s.deleted));
    // Add/merge stored members
    stored.forEach(s=>{
      if(!s.deleted){
        const idx=filtered.findIndex(m=>m.id===s.id);
        if(idx>=0){
          filtered[idx]={...filtered[idx],...s};
        }else{
          filtered.push(s);
        }
      }
    });
    return filtered;
  }catch{
    return [...executives];
  }
}

// Save member changes to localStorage with before/after tracking
export function saveMember(member,action="update",beforeData=null){
  try{
    const stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
    const idx=stored.findIndex(m=>m.id===member.id);
    const toSave={...member,_action:action,_timestamp:new Date().toISOString()};
    if(idx>=0){
      const before={...stored[idx]};
      stored[idx]=toSave;
      addAuditLog(action,member,before);
    }else{
      stored.push(toSave);
      addAuditLog(action,member,beforeData);
    }
    localStorage.setItem(STORAGE_KEY,JSON.stringify(stored));
    return true;
  }catch{
    return false;
  }
}

// Delete member (soft delete) with full data preservation
export function deleteMember(id){
  try{
    const stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
    const idx=stored.findIndex(m=>m.id===id);
    let memberData=null;
    if(idx>=0){
      memberData={...stored[idx]};
      stored[idx]={...stored[idx],deleted:true,_action:"delete",_timestamp:new Date().toISOString()};
    }else{
      // Find in base executives
      memberData=executives.find(m=>m.id===id);
      stored.push({...memberData,deleted:true,_action:"delete",_timestamp:new Date().toISOString()});
    }
    localStorage.setItem(STORAGE_KEY,JSON.stringify(stored));
    addAuditLog("delete",memberData,null);
    return true;
  }catch{
    return false;
  }
}

// Add new member
export function addMember(member){
  const newMember={
    ...member,
    id:`E${Date.now()}`,
    userId:`EX-${2000+getAllMembers().length+1}`,
    achievement:0,
    incentive:0,
    eligible:false,
    status:"Active",
    joinedDate:new Date().toISOString().split("T")[0]
  };
  return saveMember(newMember,"add",null)?newMember:null;
}

// Get member by ID for before/after comparison
export function getMemberById(id){
  const all=getAllMembers();
  return all.find(m=>m.id===id);
}

// Audit Log functions with detailed tracking
function addAuditLog(action,afterData,beforeData){
  try{
    const log=JSON.parse(localStorage.getItem(AUDIT_KEY)||"[]");
    const entry={
      id:Date.now(),
      action,
      timestamp:new Date().toISOString(),
      user:localStorage.getItem("userId")||"system",
      memberId:afterData?.id||beforeData?.id,
      memberName:afterData?.name||beforeData?.name,
      userId:afterData?.userId||beforeData?.userId,
      before:beforeData?{
        name:beforeData.name,
        tlId:beforeData.tlId,
        tlName:beforeData.tlName,
        target:beforeData.target,
        status:beforeData.status,
        contact:beforeData.contact,
        email:beforeData.email
      }:null,
      after:afterData?{
        name:afterData.name,
        tlId:afterData.tlId,
        tlName:afterData.tlName,
        target:afterData.target,
        status:afterData.status,
        contact:afterData.contact,
        email:afterData.email
      }:null,
      changes:beforeData&&afterData?calculateChanges(beforeData,afterData):null
    };
    log.unshift(entry);
    if(log.length>200)log.pop(); // Keep last 200 entries
    localStorage.setItem(AUDIT_KEY,JSON.stringify(log));
  }catch(e){
    console.error("Audit log error:",e);
  }
}

// Calculate specific changes between before and after
function calculateChanges(before,after){
  const changes=[];
  const fields=["name","tlId","tlName","target","status","contact","email"];
  fields.forEach(field=>{
    if(before[field]!==after[field]){
      changes.push({
        field,
        from:before[field],
        to:after[field]
      });
    }
  });
  return changes.length>0?changes:null;
}

export function getAuditLog(filterAction=null){
  try{
    const log=JSON.parse(localStorage.getItem(AUDIT_KEY)||"[]");
    return filterAction?log.filter(entry=>entry.action===filterAction):log;
  }catch{
    return [];
  }
}

export function clearAuditLog(){
  localStorage.removeItem(AUDIT_KEY);
}

// Reset all member data to initial state
export function resetMemberData(){
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(AUDIT_KEY);
}
