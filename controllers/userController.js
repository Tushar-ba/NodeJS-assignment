import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import nodemailer from 'nodemailer'


const registerUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' })
  }

  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'User already exists' })

    const user = await User.create({ email, password })

    
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/verify/${generateToken(user._id)}`
    }

    await transporter.sendMail(mailOptions)
    
    res.status(201).json({
      _id: user._id,
      email: user.email,
      balance: user.balance,
      token: generateToken(user._id)
    })
  } catch (error) {
    console.error('Error:', error)  
    res.status(500).json({ message: error.message })
  }
}

const loginUser = async (req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
    return res.status(400).json({message:'Please provide all the required field'})
  }
  try{
    const user = await User.findOne({email})
    if(user&&(await user.matchPassword(password))){
      res.json({
        _id:user._id,
        email:user.email,
        balance:user.balance,
        token:generateToken(user._id)
      })
    }else{
      res.status(401).json({message:'Invalid email or password'})
    }
  }catch(error){
    res.status(401).json({message: error.message})
  }
}

export { registerUser,loginUser }
