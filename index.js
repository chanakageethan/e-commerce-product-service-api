const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const serverPort = process.env.SERVER_PORT | 3000;


//--------------------------------------------------
const CategoryRoute = require('./route/CategoryRoute');
const CountryRoute = require('./route/CountryRoute');
const DiscountRoute = require('./route/DiscountRoute');
const ProductRoute = require('./route/ProductRoute');
//--------------------------------------------------



try {
  mongoose.connect(`${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}` );
  app.listen(serverPort, () => {
    console.log(`Server is running on http://localhost:${serverPort}`);
  });
} catch (e) {
  console.log(e);
}

app.get("/test-api", (req, res) => {
  res.json({ message: "Hi the server is working...." });
});

//-----------------------------------------------------
app.use('/api/v1/categories', CategoryRoute)
app.use('/api/v1/countries', CountryRoute)
app.use('/api/v1/discounts', DiscountRoute)
app.use('/api/v1/products', ProductRoute)

//-----------------------------------------------------

