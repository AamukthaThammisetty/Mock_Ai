'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Webcam from 'react-webcam'
import { LoaderCircle, WebcamIcon, AlertCircle,MoveRight } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert"
import Layout from '../../../components/Layout'
import {useRouter} from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [webcamEnable, setWebCamEnable] = useState(false);
  const [error, setError] = useState(null);
  const router=useRouter();

  // Fetch interview details from API
  const getInterviewDetails = async () => {
    try {
      const response = await axios.get(`/api/interview/${id}`);
      setInterviewDetails(response.data.data);
    } catch (err) {
      setError("Error fetching interview details.");
      console.error("Error fetching interview details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInterviewDetails();
  }, [id]);

  const startInterview=()=>{
    router.push(`/interview/${id}/start`);
  }

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
      <Layout>
    <div className="p-6  grid place-items-center">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Let's Get Started</h2>
      {interviewDetails ? (
        <div className="grid grid-cols-2 gap-6 bg-white p-8 rounded-lg  w-full  text-left">
          {/* Job Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700"><strong>Job Position/Role:</strong> {interviewDetails.jobPosition}</h3>
            <p className="text-gray-600"><strong>Job Description:</strong> {interviewDetails.jobDesc}</p>
            <p className="text-gray-600"><strong>Experience:</strong> {interviewDetails.jobExperience} years</p>
            <Alert variant="info" className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              <div>
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  Enable your webcam and microphone to start your AI-generated mock interview. You’ll receive five questions to answer, and at the end, a report based on your responses. Note: We do not record your video, and you can disable the webcam at any time.
                </AlertDescription>
              </div>
            </Alert>
          </div>

          {/* Webcam Section */}
          <div className="flex flex-col items-center justify-center">
            {webcamEnable ? (
              <div className="flex flex-col items-center space-y-4">
                {/* Webcam view with fixed dimensions */}
                <Webcam
                  onUserMedia={() => setWebCamEnable(true)}
                  onUserMediaError={() => setWebCamEnable(false)}
                  className=""
                  mirrored={true}
                  style={{ width: '384', height: '288px' }} // Fixed size for consistency
                />
                <Button variant="outline" onClick={() => setWebCamEnable(false)} className="w-full">
                  Disable Webcam
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                {/* Placeholder with fixed dimensions matching webcam view */}
                <div className="flex items-center justify-center  h-72 w-96 bg-gray-200 rounded-lg">
                  <WebcamIcon className="text-gray-500" size={64} />
                </div>
                <Button onClick={() => setWebCamEnable(true)} className="w-full">
                  Enable Webcam and Microphone
                </Button>
                <div>
                  <Button className={"space-x-2"} onClick={startInterview}>
                    <span>  Start interview</span>
                   <MoveRight />
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      ) : (
        <p className="text-gray-600">No details available for this interview.</p>
      )}
    </div>
      </Layout>
  );
}

export default Page;
