const express = require('express');
const morgan = require('morgan'); /* logger */
const helmet = require('helmet'); /* protection */
const cors = require('cors');
const middlewares = require('./middlewares');

/* region */
const region = require('./v1/region');
/* province */
const province = require('./v1/province');
/* city */
const city = require('./v1/city');
/* municipality */
const municipality = require('./v1/municipality');
/* barangay */
const barangay = require('./v1/barangay');

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

/* routes */
app.get('/', (req, res) => {
  res.json({
      message: "Made with 💜 by Justin Balaguer. Twitter - @ojintoji",
  });
});

/* region */
app.use('/v1/region', region);
/* province */
app.use('/v1/province', province);
/* city */
app.use('/v1/city', city);
/* municipality */
app.use('/v1/municipality', municipality);
/* barangay */
app.use('/v1/barangay', barangay);

/* errorHandler middlerware */
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});