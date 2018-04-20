import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: {
      type: [String],
      required: true,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

PostSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      title: this.title,
      author: this.author,
      createdAt: this.createdAt,
    };
  },
  incCommentsCount() {
    this.commentsCount = this.commentsCount + 1;
    this.save();
  },

  decCommentsCount() {
    this.commentsCount = this.commentsCount - 1;
    this.save();
  },

  incLikesCount() {
    this.likesCount = this.likesCount + 1;
    this.save();
  },

  decLikesCount() {
    this.likesCount = this.likesCount - 1;
    this.save();
  },
};

export default mongoose.model('Post', PostSchema);
