import dbConnect from "../../../utils/db";
import MockInterviewModel from '../../../models/InterviewModel'


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
