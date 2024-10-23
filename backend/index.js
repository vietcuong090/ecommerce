const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

// middlweware setup
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
// all router
const authRouters = require('./src/users/user.route');

app.use('/api/auth', authRouters);

main()
  .then(() => console.log('mongdb is sucessfully connected.'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  app.get('/', (req, res) => {
    res.send('Lebaba E-commerce Server is running...!');
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
