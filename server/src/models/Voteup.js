import mongoose, { Schema } from 'mongoose';

const VoteupSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Voteup', VoteupSchema);
