const express = require('express');
const expressLayouts = require('express-ejs-layouts')

const app = express();
const port = process.env.PORT || 3000;

//connection and session
var db = require('./server/models/database')

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

db.connect((err)=>{
    if(err) console.log('connection error !!'+err);
    else console.log('Database connected !!');
  })

app.set('layout', './layouts/main');
app.set('view engine', 'ejs')

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
