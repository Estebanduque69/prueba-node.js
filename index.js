const express = require('express');
const { getConnection } = require('./db/connect-mongo');
require('dotenv').config();

const app = express();
const port = process.env.PORT;


getConnection();

app.use(express.json());

const cors = require('cors');
app.use(cors());

// Rutas de la API
app.use('/directors', require('./routes/director'));
app.use('/genres', require('./routes/genero'));
app.use('/producers', require('./routes/productora'));
app.use('/types', require('./routes/tipo'));
app.use('/media', require('./routes/media'));

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
