"use client"
import React, {useEffect, useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from '../../../components/ui/button';
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea";
import { chatSession } from "../../../utils/GeminiAIModal"
import { LoaderCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import pdfToText from 'react-pdftotext'
import toast from 'react-hot-toast';

function AddNewInterview({ addToServer }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [JsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const [pdfText, setPdfText] = useState("");

  function extractText(event) {
    const file = event.target.files[0]
    pdfToText(file)
      .then(text => setPdfText(text))
      .catch(error => console.error("Failed to extract text from pdf"))
  }

  // Function to generate the input prompt for the chat session
  const generateInputPrompt = (jobPosition, jobDesc, jobExperience, pdfText) => {
    return `For the position of ${jobPosition}, with the following experience requirements: ${jobExperience}, and job description: ${jobDesc}, as well as the following extracted text from a PDF: ${pdfText}, generate 5 interview questions. Provide both questions and ideal answers in JSON format, structured as an array of objects with "question" and "answer" fields.`;
  };


  // Function to send prompt and retrieve chat response
  const fetchChatResponse = async (inputPrompt) => {
    const result = await chatSession.sendMessage(inputPrompt);
    return result.response.text();
  };

  // Function to clean and parse JSON response
  const parseResponse = (responseText) => {
    try {
      const cleanText = responseText.replace(/```json|```/g, '');
      return JSON.parse(cleanText); // Parse JSON
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
      return null;
    }
  };


  // Main submit function triggered by form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = generateInputPrompt(jobPosition, jobDesc, jobExperience, pdfText);
    const chatResponseText = await fetchChatResponse(inputPrompt);
    const mockJsonResp = parseResponse(chatResponseText);

    if (mockJsonResp) {
      setJsonResponse(mockJsonResp);
      console.log(mockJsonResp);

      const data = {
        jsonMockResp: '',
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        questions: mockJsonResp,
      };

      await addToServer(data);
      toast.success("created successfully");
      setOpenDialog(false);
      setJobPosition('');
      setJobDesc('');
      setJobExperience('');

    } else {
      console.error("Failed to generate questions.");
    }

    setLoading(false);
  };
  return (
    <div>
      <div className='h-full min-h-24 w-full flex items-center justify-center border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>
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
                  <div className='mt-7 my-3 space-y-2'>
                    <label>Job Role/Position</label>
                    <Input placeholder="Ex.Full stack Developer" required onChange={(event) => setJobPosition(event.target.value)} />
                  </div>
                  <div className='my-3 space-y-2'>
                    <label>Job Description/Tech Stack(In Short)</label>
                    <Textarea placeholder="Ex.React,Angular,NodeJs,Mysql etc" required onChange={(event) => setJobDesc(event.target.value)} />
                  </div>
                  <div className='my-3 space-y-2'>
                    <label>Years of experience</label>
                    <Input placeholder="Ex.5" type="number" required onChange={(event) => setJobExperience(event.target.value)} />
                  </div>
                  <div>
                    <div className="grid w-full mb-2 items-center gap-1.5">
                      <label htmlFor="picture">Resume</label>
                      <Input id="picture" type="file" required onChange={extractText} />
                    </div>
                  </div>
                </div>
                <div className='flex gap-5 justify-end'>
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ?
                      <><LoaderCircle className='animate-spin' />Generating from AI</>
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
