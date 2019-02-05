import {model, Schema} from 'mongoose';

const messageSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true
  },
  body: {
    type: Schema.Types.String,
    required: true
  }
});

export default model('Message', messageSchema);
