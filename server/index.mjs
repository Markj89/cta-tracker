import express from 'express';
import cors from 'cors';
import './loadEnv.mjs';
import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import stations from './routes/stations.mjs'
import arrivals from './routes/arrivals.mjs';

const PORT = 3000;
const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/stations', stations);
app.use(arrivals);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send('Unable to find request');
  next(createHttpError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Pass to next layer of middleware
  next();

  // render the error page
  res.status(err.status || 500).render(err.status);
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});