import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fixtures from '../fixtures';
import messages from './api/routes/messages.routes';
import serverConfig from '../config';

//initialize express app
const app = new Express();

//set native promises as mongoose promise
mongoose.Promise = global.Promise;

//MongoDB connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure MongoDB is installed and running!');
    throw error;
  }
  fixtures();
});

app.use(compression());
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use('/api', messages);

//start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Server running on port: ${serverConfig.port}`);
  }
});

export default app;
