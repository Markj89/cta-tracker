import express from 'express';
import cors from 'cors';
import './loadEnv.mjs';
import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import stations from './routes/stations.mjs'
import arrivals from './routes/arrivals.mjs';
import rateLimtit from 'express-rate-limit';

const PORT = 3000;
const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));

const limiter = rateLimtit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  headers: true, // Optional: include rate limit info in response headers
});
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// Route to redirect to API response
app.get('/', (req, res) => {
  res.redirect('/api');
});
app.use('/api', express.static('./static/index.html'));
app.use('/api/stations', limiter, stations);
app.use('/api/arrivals', limiter, arrivals);
app.use('/api/arrivals/:_id', limiter, arrivals);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).sendFile('404.html', { root: './static' });
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('Environment ', req.app.get('env'));
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Pass to next layer of middleware
  next();

  // render the error page
  res.status(err.status || 500).render(err.status).sendFile('500.html', { root: './static' });
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});