'use client'
import * as React from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export function InterviewCard({ jobDetails, onDelete }) {
  const router = useRouter();

  const startInterview = (_id) => {
    router.push(`/interview/${_id}`);
  };

  const deleteInterview = async (_id) => {
    try {
      await axios.delete(`/api/interview/${_id}`);
      toast.success("Deleted successfully.");
      router.refresh(); // Refreshes the page to show updated data after deletion
    } catch (error) {
      console.error("Error deleting interview:", error);
      alert("Failed to delete the interview.");
    }
  };

  return (
    <Card className="bg-white h-auto shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <CardHeader className="p-4 bg-gray-100 relative">
        <div className="right-2 justify-end absolute">
          <Button
            onClick={() => onDelete(jobDetails._id)}
            variant="destructive"
            className="flex items-center justify-center px-3  "
          >
            <Trash2 className="w-4 h-4" />

          </Button>
        </div>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {jobDetails.jobPosition}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {jobDetails.jobDesc.substring(0, 50)}...
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex w-full justify-between p-2 gap-2 bg-gray-100">
        <Button variant="outline" className="text-gray-700 w-full hover:bg-gray-200">
          Feedback
        </Button>
        <Button
          onClick={() => startInterview(jobDetails._id)}
          className="bg-blue-600 text-white w-full hover:bg-blue-700"
        >
          Start
        </Button>

      </CardFooter>
    </Card>
  );
}
