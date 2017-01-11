import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default mongoose.model('post',
  new Schema({
    uuid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }));
