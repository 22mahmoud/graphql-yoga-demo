import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    votesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

CommentSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      text: this.text,
      author: this.user,
    };
  },
};

CommentSchema.statics = {
  incVotesCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { votesCount: 1 } });
  },
  decVotesCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { votesCount: -1 } });
  },
};

export default mongoose.model('Comment', CommentSchema);
