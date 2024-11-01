import dbConnect from "../../../../../../utils/db";
import MockInterviewModel from "../../../../../../models/InterviewModel";


export async function PUT(req, { params }) {
    await dbConnect();
    try {

        console.log(params);
        const { id, questionId } = params;
        const { userAnswer } = await req.json();
        const interview = await MockInterviewModel.findById(id);
        if (!interview){
            return Response.json(
                {
                    success: false,
                    error: 'Interview details not found'
                },
                { status: 404 }
            );
        }

        if (!interview.questions[questionId]) {
            Response.json(
                {
                    success: false,
                    error: 'Question details not found'
                },
                { status: 404 }
            );
        }

        interview.questions[questionId].isAttempted = true;
        interview.questions[questionId].userAnswer = userAnswer;
        console.log(userAnswer);

        // Save the updated interview document
        await interview.save();

        return Response.json(
            {
                success: true,
                question: interview.questions[questionId],
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                success: false,
                error: 'Error fetching interviewData'
            },
            { status: 400 }
        );
    }
}
