"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import {MockInterview} from "../../../utils/schema"
import {db} from "../../../utils/db"
import { Button } from '../../../components/ui/button';
import {Input} from "../../../components/ui/input"
import {Textarea} from "../../../components/ui/textarea";
import {chatSession} from "../../../utils/GeminiAIModal"
import { LoaderCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
function AddNewInterview() {
 const [openDialog,setOpenDialog]=useState(false);
 const [jobPosition,setJobPosition]=useState();
 const [jobDesc,setJobDesc]=useState();
 const [jobExperience,setJobExperience]=useState();
  const [loading,setLoading]=useState(false);
  const [JsonResponse,setJsonResponse]=useState([]);
  const {user}=useUser();
 const onSubmit=async (e)=>{
  setLoading(true);
  e.preventDefault();
  console.log(jobPosition,jobDesc,jobExperience);
  const InputPrompt="jobExperience:"+jobExperience+"job Title:"+jobPosition+"jobDesc:"+jobDesc+"prepare me"+'5'+"questions based on above information provide answers and question both in json"

 const result=await chatSession.sendMessage(InputPrompt);
 const MockJsonResp=(result.response.text()).replace('```json','').replace('```','');
 console.log(MockJsonResp);
  console.log(JSON.parse(MockJsonResp));
 setJsonResponse(MockJsonResp);


 if(MockJsonResp){
  console.log("before insert");
  const resp=await db.insert(MockInterview).values({
    mockId:uuidv4(),
    jsonMockResp:MockJsonResp,
    jobPosition: jobPosition,
    jobDesc:jobDesc,
    jobExperience:jobExperience,
    createdBy:user?.primaryEmailAddress?.emailAddress,
    createdAt:moment().format('DD-MM-yyyy'),
   }).returning('mockId')
   console.log("before insert");

   if (resp && resp.length > 0) {
    console.log("Inserted ID:", resp[0].mockId);
  } else {
    console.error("Insert operation failed.");
  }
   
 }else{
  console.log("error");
 }


 setLoading(false);

 }
  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' 
      onClick={()=>setOpenDialog(true)}>
        <h2 className="text-lg text-center">+Add New</h2>
      </div>
      <Dialog open={openDialog}>
 <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className='font-bold text-2xl'>Tell us more about your job interview</DialogTitle>
      <DialogDescription >
        <form onSubmit={onSubmit}>
        <div>
            <h2>Add Details about your job position/Role,Job Description and years of experience </h2>
            <div className='mt-7 my-3'>
              <label>Job Role/Position</label>
              <Input placeholder="Ex.Full stack Developer" required onChange={(event)=>setJobPosition(event.target.value)}/>
            </div>
            <div className='my-3'>
              <label>Job Description/Tech Stack(In Short)</label>
              <Textarea placeholder="Ex.React,Angular,NodeJs,Mysql etc" required onChange={(event)=>setJobDesc(event.target.value)}/>
            </div>
            <div className='my-3'>
              <label>Years of experience</label>
              <Input placeholder="Ex.5" type="number" required onChange={(event)=>setJobExperience(event.target.value)}/>
            </div>
         </div>
        <div className='flex gap-5 justify-end'>
          <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading?
            <><LoaderCircle className='animate-spin'/>'Generating from AI'</>
            :
            "Start Interview"}
            </Button>
        </div>
        </form>

      </DialogDescription>

    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
    
  )
}

export default AddNewInterview
