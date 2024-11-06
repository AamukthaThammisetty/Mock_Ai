import dbConnect from "../../../../../utils/db";
import MockInterviewModel from "../../../../../models/InterviewModel";

export async function GET(req, { params }) {
    await dbConnect();
    try {

        const email = params.email;

        const interviewData = await MockInterviewModel.find({email});
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
