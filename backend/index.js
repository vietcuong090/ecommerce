const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// middleware setup
app.use(express.json({ limit: '25mb' }));
// app.use(express.urlencoded({ limit: '25mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

//all routers

const authuRutes = require('./src/users/user.route');
app.use('/api/auth', authuRutes);

main()
  .then(() => console.log('MongoDB.'))
  .catch((err) => console.log(err));
async function main() {
  // await mongoose.connect(process.env.MONGODB_URL);
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('MongoDB is successfully connected.');
}

app.get('/', (req, res) => {
  res.send('Lebaba E-commerce Server is running...!');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
