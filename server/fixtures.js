import Message from './src/models/message';

const messages = [
  {
    title: 'New feature!',
    body: 'Sample text'
  },
  {
    title: 'Hello!',
    body: 'Sample text',
    timestamp: 3
  },
  {
    title: 'Welcome!',
    body: 'Sample text',
    timestamp: 5
  },
];


async function populateData() {
  const promises = [];
  
  for (const {title, body, timestamp} of messages) {
    
    console.log(title, body, timestamp);
    
    promises.push(
      Message.create({
        title,
        body,
        timestamp
      })
    );
  }
  
  await Promise.all(promises);
}


export default async function () {
  try {
    await Message.collection.remove();
    populateData();
  } catch (err) {
    console.log(err);
  }
}
