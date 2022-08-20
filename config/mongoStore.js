const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  databaseName: 'cp0099',
  collection: 'session',
  expires: 1000 * 60 * 60 * 24,
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
  }
},(err)=>{
  if(err) console.log(err);
})

const sess = {
  key: "userInfo",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    domain: 'localhost',
    saneSite: "Lax",
    //secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24 
  },
  store: store
}

module.exports = [sess,store];