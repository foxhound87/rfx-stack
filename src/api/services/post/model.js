import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema(
  {
    uuid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Will automatically create and update updatedAt and createdAt Fields
  });

export default mongoose.model('post', PostSchema);
