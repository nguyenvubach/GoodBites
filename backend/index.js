import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors())


// Connect to MongoDB
mongoose
  .connect(process.env.dbURI)
  .then(() => console.log('DB Connected!'))
  .catch((e) => console.log(e));


  app.get('/api', (req, res)=> res.send('Welcome to Home page'))

  app.listen(5000, ()=> console.log(`App running on localhost:5000`))