import dbConnect from "../../../../utils/db";
import MockInterviewModel from '../../../../models/InterviewModel'


export async function GET(req, { params }) {
  await dbConnect();
  try {
      const headers = await req.headers;
      const { id } = await params
    console.log(id);
    const interviewData = await MockInterviewModel.findById(id);
    if (!interviewData) return Response.json(
      {
        success: false,
        error: 'File not found'
      },
      { status: 404 }
    );
    return Response.json(
      {
        success: true,
        data: interviewData
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'Error fetching interviewData'
      },
      { status: 400 }
    );
  }

}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const id = params.id;
    const result = await MockInterviewModel.deleteOne({ _id: id });
    console.log(result)
    if (!result)
      return Response.json(
        {
          success: false,
          error: 'interviewData Not Found'
        },
        { status: 404 }
      );
    return Response.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        error: error
      },
      { status: 400 }
    );
  }
} 
