const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const throng = require('throng');

const nodeAppServer = require('./node-app-server');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(compression());

nodeAppServer(app);

const start = () => app.listen(PORT, err => (err ?
  console.error(err) :
  console.log(`Listening on port ${PORT}`)
));

if (process.env.NODE_ENV === 'production') {
  throng(start);
} else {
  start();
}
