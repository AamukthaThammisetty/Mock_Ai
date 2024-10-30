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
      answer: { type: String },
      userAnswer: { type: String },
      score: { type: Number },
    }
  ],
});

const MockInterviewModel = mongoose.models.MockInterview || mongoose.model('MockInterview', MockInterviewSchema);

export default MockInterviewModel;
