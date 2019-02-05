import Message from '../../models/message.js';

/**
 * Get all Messages
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
export async function getMessages(req, res) {
  const messages = await Message.find({}).exec();
  return res.status(200).send({messages});
}
