import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

connectDB()

dotenv.config()

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('api is running')
})

const PORT = process.env.PORT
app.listen(PORT,(req,res)=>{
    console.log("the servere is running")
})