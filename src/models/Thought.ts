import { Schema, model, Document } from 'mongoose';
import Reaction from './Reaction.js';
import { formatter } from './date-formatter.js';

interface IThought extends Document {
  thoughtText: string;
  username: string;
  reactions: typeof Reaction[];
  createdAt: String;
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => formatter.format(timestamp)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      getters: true
    },
    id: false,
  }
);

thoughtSchema
  .virtual('rectionCount')
  .get(function () {
    return `${this.reactions.length}`;
  });

const Thought = model('thought', thoughtSchema);

export default Thought;
