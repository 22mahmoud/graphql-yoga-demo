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

export default mongoose.model('Comment', CommentSchema);
