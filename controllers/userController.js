import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import nodemailer from 'nodemailer'
import sendEmail from '../utils/sendEmail.js'


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
      text: `Welcome you have successfully created an account `
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

const getUserBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ balance: user.balance })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const transferBalance = async (req, res) => {
  const { recipientEmail, amount } = req.body

  try {
    const sender = await User.findById(req.user._id)
    const recipient = await User.findOne({ email: recipientEmail })

    if (!recipient) {
      await sendEmail({
        to: sender.email,
        subject: 'Transfer Failed',
        text: `Transfer of ${amount} to ${recipientEmail} failed. Recipient not found.`
      })
      return res.status(404).json({ message: 'Recipient not found' })
    }

    if (sender.balance < amount) {
      await sendEmail({
        to: sender.email,
        subject: 'Transfer Failed',
        text: `Transfer of ${amount} to ${recipientEmail} failed. Insufficient balance.`
      })
      return res.status(400).json({ message: 'Insufficient balance' })
    }

    sender.balance -= amount
    recipient.balance += amount

    await sender.save()
    await recipient.save()

    await sendEmail({
      to: sender.email,
      subject: 'Transfer Successful',
      text: `You have successfully transferred ${amount} to ${recipientEmail}.`
    })

    await sendEmail({
      to: recipient.email,
      subject: 'Funds Received',
      text: `You have received ${amount} from ${sender.email}.`
    })

    res.status(200).json({ message: 'Transfer successful' })
  } catch (error) {
    await sendEmail({
      to: sender.email,
      subject: 'Transfer Failed',
      text: `Transfer of ${amount} to ${recipientEmail} failed. Error: ${error.message}`
    })
    res.status(500).json({ message: error.message })
  }
}

export { registerUser,loginUser,getUserBalance, transferBalance }
