import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import searchRoute from './routes/searchHistory.js'

dotenv.config();

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173'
}))


// Connect to MongoDB
mongoose
  .connect(process.env.dbURI)
  .then(() => console.log('DB Connected!'))
  .catch((e) => console.log(e));

  app.use('/api/auth', authRoute)
  app.use('/api/search', searchRoute)

  app.get('/api', (req, res)=> res.send('Welcome to Home page'))


  app.listen(5000, ()=> console.log(`App running on localhost:5000`))
