import dbConnect from "../../../utils/db";
import MockInterviewModel from '../../../models/InterviewModel'
import {auth, currentUser} from "@clerk/nextjs/server";


export async function POST(req, res) {
  await dbConnect();
  try {
    const data = await req.json();
    const interview = await MockInterviewModel.create(data);
    return Response.json(
      { interview },
      { status: 201 }
    );


  } catch (error) {
    return Response.json(
      {
        error: error.message
      },
      { status: error.status }
    );

  }
}


export async function GET(req, res) {
  await dbConnect();
  try {
    const {userId} = auth()
    const user = await currentUser();
    const email = user.emailAddresses[0]?.emailAddress;
    console.log(email);
    const interviews = await MockInterviewModel.find({createdBy:email});
    return Response.json(
      {
        success: true,
        data: interviews
      },
      { status: 200 }
    );

  } catch (error) {
    console.log(error.message)
    return Response.json(
      {
        error: error.message
      },
      { status: error.status }
    );

  }
}
