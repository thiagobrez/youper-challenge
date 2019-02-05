import Message from './src/models/message';

const messages = [
  {
    title: 'New feature!',
    body: 'Sample text'
  },
  {
    title: 'Hello!',
    body: 'Sample text'
  },
  {
    title: 'Welcome!',
    body: 'Sample text'
  },
];


async function populateData() {
  const promises = [];
  
  for (const message of messages) {
    promises.push(
      Message.create({
        title: message.title,
        body: message.body
      })
    );
  }
  
  await Promise.all(promises);
}


export default async function () {
  try {
    const count = await Message.count().exec();
    if (count > 0) {
      return;
    }
    
    await populateData();
  } catch (err) {
    console.log(err);
  }
}
