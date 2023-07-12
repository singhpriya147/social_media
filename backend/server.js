const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes')
const path =require('path')

const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());
// app.get('/',(req,res)=>{
//  res.setHeader("Access-Control-Allow-Credentials","true");
//  res.send("API is running")
// })
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// if(process.env.NODE_ENV==='production'){
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
// }
// else{
//  app.get('/',(req,res)=>res.send(' please set to production'))
// }



app.use(errorHandler);
app.listen(port, () => console.log(`SERVER IS RUNNING ON ${port}`));
