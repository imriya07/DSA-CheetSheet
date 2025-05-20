const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json()); 
app.use(cookieParser());

app.use(cors({
  origin: 'https://dsafrontend.vercel.app', 
  credentials: true,               
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const userRoutes = require('./Routes/userRoutes');
const headingRoutes = require('./Routes/headingRoutes');


app.use('/api/users', userRoutes);
app.use('/api/headings', headingRoutes);

const PORT = process.env.PORT || 8000;
if(process.env.NODE_ENV !== "production"){
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;