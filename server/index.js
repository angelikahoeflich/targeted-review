require('dotenv').config()
const express = require('express');
const massive = require('massive');


const session = require('express-session');
const punCtrl = require('./punController');
const userCtrl = require('./userController');

const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env;

const app = express();


//middleware
app.use(express.json());
app.use(session({
  resave:false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 100 * 60 * 60 * 24 * 7,
  }, 
})
);


massive({
  connectionString: CONNECTION_STRING,
  ssl:{
    rejectUnauthorized: false
  }
}).then((db) => {
  app.set('db', db);
  console.log('db is connected yo')
}).catch(err => console.log('database error' + err));

//endpoints 
app.get('/api/user')
app.put('api/user')
app.post('/api/login')
app.post('api/register')
app.delete('api/logout')

app.listen(SERVER_PORT, console.log(`server running on port ${SERVER_PORT}`))



