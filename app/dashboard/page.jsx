'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddNewInterview from './_components/AddNewInterview'
import { InterviewCard } from './_components/InterviewCard'
import { LoaderCircle } from 'lucide-react';

function Dashboard() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch interviews from an API
  const getInterviews = async () => {
    try {
      const response = await axios.get('/api/interview');
      setInterviews(response.data.data || []); // Default to empty array if no data
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInterviews();
  }, []);

  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl mb-2'>Dashboard</h2>
      <h2 className='text-gray-500 mb-5'>Create and start your AI Mockup Interview</h2>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'> {/* Adjusted grid for responsiveness */}
        <AddNewInterview />
        {loading ? ( // Show loader while fetching
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
            <LoaderCircle className='animate-spin mx-auto mb-2' />
            Loading interviews...
          </div>
        ) : (
          interviews.length > 0 ? (
            interviews.map((interview, index) => (
              <div key={index} className="w-full"> {/* Added width handling */}
                <InterviewCard jobDetails={interview} />
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
              <p>No interviews available.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;
