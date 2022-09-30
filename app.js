const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001;
const {todoRoutes} = require('./api/todo')
const {userRoutes} = require('./api/user')
require('dotenv').config();
const connection = require('./config/db.js');
const [sess] = require('./config/mongoStore.js');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(helmet())
app.use(session(sess))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/todo',todoRoutes);
app.use('/api/user',userRoutes);

connection();
app.listen(PORT,()=>{
  console.log("server running on port: " + PORT);
})
