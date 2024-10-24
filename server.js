'use strict';
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env' });

const app = express();
const port = process.env.PORT || 10000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.json());
const homeRouter = require('./controllers/home.js');
app.use('/', homeRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 'use strict';
// const express = require('express');
// const bodyParser = require('body-parser');
// require('dotenv').config({ path: '.env' });
// const sequelize = require('./config/database'); 

// const app = express();
// const port = process.env.PORT || 10000;

// app.set('view engine', 'ejs');
// app.set('views', './views');
// app.use(express.static('public'));
// app.use(bodyParser.json());

// // console.log('hi');

// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected successfully.');
//   })
//   .catch(err => {
//     console.error('Database connection error:', err);
//   });

// const db = require('./models');

// app.get('/clubs', async (req, res) => {
//   try {
//     const clubs = await db.Club.findAll();
//     res.json(clubs);
//   } catch (error) {
//     console.error('Error fetching clubs:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.use('/', require('./controllers/home.js'));
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

