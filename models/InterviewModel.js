import mongoose from 'mongoose';
const { Schema } = mongoose;

const MockInterviewSchema = new Schema({
  jobPosition: {
    type: String,
    required: true,
  },
  jobDesc: {
    type: String,
    required: true,
  },
  jobExperience: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  questions: [
    {
      question: { type: String, required: true },
      isAttempted:{type:Boolean,default: false},
      answer: { type: String },
      userAnswer: { type: String },
      feedback:{type:String},
      score: { type: Number },
    }
  ],
  score:{
    type:Number
  },
  isCompleted:{
    type:Boolean,
    default:false
  }
});

const MockInterviewModel = mongoose.models.MockInterview || mongoose.model('MockInterview', MockInterviewSchema);

export default MockInterviewModel;
