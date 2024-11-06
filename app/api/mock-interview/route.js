import dbConnect from '@/lib/dbConnect';
import FileModel from '@/model/File';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { db } from './path-to-your-db'; 
import { MockInterview } from './schema'; 

export async function POST(req, res) {
  try {
    const data = await req.json();
    const { MockJsonResp, jobPosition, jobDesc, jobExperience, user } = data; 
    if (MockJsonResp) {
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('YYYY-MM-DD'),
      }).returning('mockId');
      return Response.json({
        success: true,
        mockId: resp[0]?.mockId || null, 
      },{
        status:200,
      });
    } else {
      return Response.json(
        {
        success: false,
        message: 'Missing required data: MockJsonResp',
      },{
        status:400,
      }
    );
    }
  } catch (error) {
    return Response.json(
      {
      success: false,
      error: error.message,
    },{
      status:500,
    }
  );
  }
}
