const express = require('express');
const morgan = require('morgan'); /* logger */
const helmet = require('helmet'); /* protection */
const cors = require('cors');
const middlewares = require('./middlewares');

/* region */
const region = require('./api/region');
/* province */
const province = require('./api/province');
/* city */
const city = require('./api/city');
/* municipality */
const municipality = require('./api/municipality');
/* barangay */
const barangay = require('./api/barangay');

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
app.use('/api/region', region);
/* province */
app.use('/api/province', province);
/* city */
app.use('/api/city', city);
/* municipality */
app.use('/api/municipality', municipality);
/* barangay */
app.use('/api/barangay', barangay);

/* errorHandler middlerware */
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});