import {model, Schema} from 'mongoose';

const messageSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true
  },
  body: {
    type: Schema.Types.String,
    required: true
  },
  timestamp: {
    type: Schema.Types.Number,
    default: 1
  },
  new: {
    type: Schema.Types.Boolean,
    default: true
  }
});

export default model('Message', messageSchema);
