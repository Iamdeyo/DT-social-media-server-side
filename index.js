const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

mongoose.connect(
  //   'mongodb+srv://deyo:Adenium111@dtnodetest.ibxf5.mongodb.net/?retryWrites=true&w=majority',
  'mongodb://127.0.0.1:27017/DTsocials',
  async () => {
    try {
      console.log('MongoDB connected');
    } catch (err) {
      console.log(err);
    }
  }
);

// Middlewares
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// app.use(express.json());
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

const port = process.env.PORT;
app.listen(port || 8080, () => {
  console.log('server is running');
});
