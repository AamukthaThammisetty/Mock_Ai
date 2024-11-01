'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Webcam from 'react-webcam';
import { LoaderCircle, AlertCircle, Mic, StopCircle, Video, VideoOff, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";
import { Button } from '../../../../components/ui/button';
import toast from "react-hot-toast";
import {CircleCheckBig} from "lucide-react";
import {chatSession} from "../../../../utils/GeminiAIModal";
import {useRouter} from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const router=useRouter();
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [readyForFeedback,setReadyForFeedBack]=useState(false);
  const [generatingFeedback,setGeneratingFeedback]=useState(false);

  useEffect(() => {
    if (completedQuestions.size === questions.length) {
      setReadyForFeedBack(true);
    }
  }, [completedQuestions, questions.length]);


  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join("");
    console.log("Transcript:", transcript);
    setCompletedQuestions(prev => new Set(prev).add(questions[selectedQuestionIndex]._id));
    setQuestionAttempted(selectedQuestionIndex,transcript);
  };

  const setQuestionAttempted=async (questionIndex, userAnswer) => {
    try{
      await axios.put(`/api/interview/${id}/question/${questionIndex}`, {userAnswer});
    }catch(error){
      toast.error("Error Saving answer");
      console.error(error.message);
    }
  }

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setError("Error with speech recognition.");
  };

  const startRecording = () => {
    setRecording(true);
    recognition.start();
  };

  const stopRecording = () => {
    setRecording(false);
    recognition.stop();
  };

  const retakeQuestion = () => {
    setCompletedQuestions(prev => {
      const newCompleted = new Set(prev);
      newCompleted.delete(selectedQuestionIndex);
      return newCompleted;
    });
    setRecording(false);
  };

  const getInterviewDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/api/interview/${id}`);
      const { data } = response.data;
      console.log(data);
      setInterviewDetails(data);

      setQuestions(data.questions || []);
      const completedQuestionsArray = data.questions.filter(question => question.isAttempted);
      const completedQuestionsSet = new Set(completedQuestionsArray.map(question => question._id));
      setCompletedQuestions(completedQuestionsSet);
      console.log(completedQuestionsSet);
    } catch (err) {
      setError("Error fetching interview details.");
      console.error("Error fetching interview details:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getInterviewDetails();
  }, [getInterviewDetails]);

  const submitFeedback = async (id, score, questions) => {
    try {
      const response = await axios.post(`/api/interview/${id}/feedback`, {
        score,
        questions,
      });

      if (response.data.success) {
        toast.success("Feedback generated successfully")
        router.push(`/interview/${id}/feedback`);
        return null;
      } else {
        console.error('Error submitting feedback:', response.data.error);
        return null;
      }
    } catch (error) {
      console.error('An error occurred while submitting feedback:', error);
      return null;
    }
  };


  const requestFeedBack = async () => {
    if (!readyForFeedback) {
      return;
    }

    // Build a prompt with specific instructions
    const inputPrompt = `Below are interview questions and user-provided answers. 
      Please provide feedback to the user with a score for each question, along with an overall score. 
      
      Questions and User Responses:
      ${questions.map((q, index) => `Q${index + 1}: ${q.question} \nAnswer: ${q.userAnswer}`).join("\n\n")}
      
      Format the output as follows:
      {
          score: Overall score as a number,
          questions: [
              { score: "Score for the question", feedback: "Feedback for the answer" }
          ]
      }`;


    try {
      setGeneratingFeedback(true);
      const result = await chatSession.sendMessage(inputPrompt);
      const response=result.response.text();
      const responseJson=JSON.parse(response);
      await submitFeedback(id,responseJson.score,responseJson.questions);

    } catch (error) {
      console.error("Error requesting feedback:", error);
      return null;
    }finally {
      setGeneratingFeedback(false);
    }
  };


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin text-gray-600" size={48} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 grid place-items-center">
      {interviewDetails ? (
        <div className="grid grid-cols-2 gap-6 bg-white p-8 rounded-lg w-full text-left">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Interview Questions</h3>
            <div className="flex items-center flex-wrap gap-2">
              {questions.map((question, index) => (
                <Button
                  key={question._id}
                  onClick={() => setSelectedQuestionIndex(index)}
                  disabled={completedQuestions.has(question._id)}
                  variant={selectedQuestionIndex === index ? '' : 'outline'}
                  className={`text-left ${completedQuestions.has(question._id) ? 'bg-green-500 text-white' : ''}`}
                >
                  Question #{index + 1}
                  {completedQuestions.has(index) && <Check className="ml-1 w-4 h-4" />}
                </Button>
              ))}
            </div>
            {
              readyForFeedback ? <div className={"w-full h-40 flex flex-col gap-4 items-center justify-center"}>
                <CircleCheckBig size={60} className={"text-white bg-green-600 p-3 rounded-full"}
                />
                <p>All questions done. Go and check the feedback</p>
              </div> : <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-bold text-gray-800">Question:</h4>
                <p className="text-gray-700">{questions[selectedQuestionIndex]?.question}</p>
              </div>
            }

            {!readyForFeedback &&  <Alert className="mt-6 flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-500"/>
              <div>
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  Click "Record" to answer. Feedback with correct answers will be provided after the interview.
                </AlertDescription>
              </div>
            </Alert>}


            {completedQuestions.has(selectedQuestionIndex) && (
              <Button onClick={retakeQuestion} variant="outline" className="mt-4">
                Retake Question
              </Button>
            )}
          </div>

          <div className="flex flex-col items-center">
            {webcamEnabled ? (
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored
                className="rounded-lg shadow-lg"
                style={{ width: '384px', height: '288px' }}
              />
            ) : (
              <div className="flex items-center justify-center h-72 w-96 bg-gray-200 rounded-lg">
                <Video className="text-gray-500" size={64} />
              </div>
            )}
            <Button
              onClick={() => setWebcamEnabled(!webcamEnabled)}
              variant={webcamEnabled ? '' : 'outline'}
              className="mt-4"
            >
              {webcamEnabled ? <Video /> : <VideoOff />}
            </Button>
            {readyForFeedback ?
                <Button onClick={requestFeedBack} className="bg-green-600 hover:bg-green-500 mt-4 flex items-center gap-2">
                  {generatingFeedback ? <span className={"flex items-center gap-3"}> <LoaderCircle className={"animate-spin"}/> Generating Feedback</span>:<>Get Feedback</>}</Button>:
                <Button
                    onClick={recording ? stopRecording : startRecording}
                    variant={recording ? 'destructive' : ''}
                    disabled={completedQuestions.has(questions[selectedQuestionIndex]._id)}
                    className={`mt-4 flex items-center gap-2`}
                >
                  {recording ? <StopCircle className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
                  {recording ? 'Stop Recording' : 'Record Answer'}
                </Button>
            }

          </div>
        </div>
      ) : (
        <p className="text-gray-600">No details available for this interview.</p>
      )}
    </div>
  );
};

export default Page;
