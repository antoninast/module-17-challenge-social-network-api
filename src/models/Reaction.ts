import { Schema, Document } from 'mongoose';
import { formatter } from './date-formatter.js';

interface IReaction extends Document { 
  reactionBody: string;
  username: string;
  createdAt: String;
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => formatter.format(timestamp)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default reactionSchema;
