import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { logger, stream } from './config/winston.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import indexRoute from './routes/index.route.js';

let app = express();
dotenv.config();
global.logger = logger;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev', { stream }));

app.use('/api', indexRoute);

// errorHandler
//eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  logger.error(err.message);
  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode,
    status: 'Error',
    message: err.message,
  });
});

// Connect MongoDB
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  logger.info('Connected to mongod server');
});
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = app;
