import dbConnect from "../../../../../utils/db";
import MockInterviewModel from '../../../../../models/InterviewModel';

export async function POST(req, { params }) {
    await dbConnect();
    try {
        const { id } = await params
        const data = await req.json();
        const { score, questions } = data;

        console.log(questions);

        const interviewData = await MockInterviewModel.findById(id);
        if (!interviewData) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'File not found'
                }),
                { status: 404 }
            );
        }

        // Update score and questions
        interviewData.score = score;
        interviewData.isCompleted = true;
        questions.forEach((question, index) => {
            if (interviewData.questions[index]) {
                interviewData.questions[index].score = question.score;
                interviewData.questions[index].feedback = question.feedback;
            }
        });

        // Save the updated document
        await interviewData.save();

        return new Response(
            JSON.stringify({
                success: true,
                data: interviewData
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({
                success: false,
                error: 'Error fetching interview data'
            }),
            { status: 400 }
        );
    }
}
