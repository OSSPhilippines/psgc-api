const express = require('express');
const morgan = require('morgan'); /* logger */
const helmet = require('helmet'); /* protection */
const cors = require('cors');
const limiter = require('./utils/rateLimit'); /* rate limit */
const middlewares = require('./middlewares');
const allowedIps = require('./utils/allowedIps');

/* api */
const api = require('./api/_index');
const backers = require('./backers/_index');
const apiKeyController = require('./api/keys');

require('dotenv').config();

/* mongoose */
const mongoose = require('mongoose');
try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  next(error)
}

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

/* routes */
app.use(express.static('public'));

/* generate api key */
app.use('/key', allowedIps, apiKeyController.getApiKey)

/* api with apikey ckck */
app.use('/api', limiter, api);
app.use('/backers', middlewares.checkApiKey, backers);

/* errorHandler middlerware */
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});