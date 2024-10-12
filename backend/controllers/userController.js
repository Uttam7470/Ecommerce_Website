import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/tokenGenerate.js";
import { sendMail } from "../services/sendMail.js";
import { generateSixDigitNumber } from "../utils/otpGenerator.js";


export async function registerUser(req, res) {
  try {
    let { firstname, lastname, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    password = hashedPassword;
    const user = new userModel({ firstname, lastname, email, password, role });
    await user.save();
    res.status(201).json({ message: "success" });
  } catch (err) {
    console.log(err);
  }
}

// export async function loginUser(req, res) {
  
//     try {
//     const { email, password, role } = req.body;

//     const checkUser = await userModel.findOne({ email }).exec();

//   // if (!checkUser) {
//   //   res.status(404).json({ error: "Invalid Creditionals" });
//   // }

//   // const check = await bcrypt.compare(password, checkUser.password);
//   // if (!check) {
//   //   res.status(404).json({ error: "Invalid Credentials" });
//   // }

//   if (!checkUser || !bcrypt.compare(password, checkUser.password) || checkUser.role !== role) {
//    return res.status(401).json({ error: "Invalid Creditionals" });
//   }



//   //CREATE A TOKEN
//   // console.log(generateToken());
//   const token = generateToken(checkUser);

//   //How to send token to frontend
//   //1. sending token in response body, saving it in localstorage in frontend
//   //2. sending token as a only cookie : securing it from xss attacks(Cross site scripting attcks)

//   //1. sending token in response body
//   //   res.status(200).json({   
//   //     message : 'Login Successful',
//   //     token
//   //   }) 

//   //2.sending token as a only cookie
//   res.cookie('auth_token',token,
//     {
//         httpOnly:true,
//         secure : false,
//         sameSite : 'strict',
//         maxAge : 3600000,
//     }
//   ).status(200).json({
//     message: "Login Successful",
//   });
// }
// catch(err){
//    res.status(500).json({error : err})
    
// }

//   //LOGIN A TOKEN
// }

export async function loginUser(req, res) {
  try {
    const { email, password, role } = req.body;

    // Find user by email
    const checkUser = await userModel.findOne({ email }).exec();

    // Check if user exists, password matches, and role is correct
    if (!checkUser || !(await bcrypt.compare(password, checkUser.password)) || checkUser.role !== role) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Generate a token
    const token = generateToken(checkUser);

    // Send token as an httpOnly cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    }).status(200).json({
      message: "Login Successful",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



export async function logoutUser(req,res){
   try{ 
    res
    .clearCookie('auth_token')
    .status(200).json({message : 'Logout Successfully' })}
    catch(err){
        res.status(500).json({error : err})
    }
}

export function isUserLoggedIn(req,res){
// console.log(req);

  res.json({user : req.user})

}

// Simple Code for Forget-Password

// export async function forgetPassword(req,res){
//   const {email} = req.body;
//   const subject = 'Reset Password' ;
//   const body = generateSixDigitNumber() ;
//   await sendMail(process.env.SENDER_EMAIL, process.env.SENDER_EMAIL_APP_PASSWORD, email,subject,body)
// }

 
// export async function forgetPassword(req, res) {
//   const { email } = req.body;
//   const user = userModel.findOne({email :email});
//   if(!user){
//     return res.status(404).json({message : 'User not found'})
//   }

//   // Check if the email is provided
//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }

//   try {
//     const subject = 'Reset Password';
//     // const body = `Your password reset code is: ${generateSixDigitNumber()}`;
//     const otp = generateSixDigitNumber();
//     // Call the sendMail function with the necessary parameters
//     await sendMail(process.env.SENDER_EMAIL, process.env.SENDER_EMAIL_APP_PASSWORD, email, subject, otp);
//     await updateOtp(user._id, otp)
//     // Respond with success
//     return res.status(200).json({ message: "Password reset email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).json({ error: "Failed to send password reset email" });
//   }
// }


export async function forgetPassword(req, res) {
  const { email } = req.body;

  // Check if the email is provided
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Find the user by email
    const user = await userModel.findOne({ email: email });
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a 6-digit OTP
    const otp = generateSixDigitNumber();
   
    const subject = 'Reset Password';

    // Call the sendMail function with the necessary parameters
    await sendMail(process.env.SENDER_EMAIL, process.env.SENDER_EMAIL_APP_PASSWORD, email, subject, `Your OTP is: ${otp}`);

    // Update the OTP for the user in the database
    await updateOtp(user._id, otp);

    // Respond with success
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send password reset email" });
  }
}



// export async function verifyOtp(req,res){
//   const { email, otp } = req.body;
//   const user = await userModel.findOne({ email: email });
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//   if(user.otp == otp){
//     res.status(200).json({message : 'otp is verified successfully'})
//   }
//   else{
//     res.status(401).json({message : 'Invalid Otp'})
//   }


// }


// async function updateOtp(userId, otp){
//   const updateUser = await userModel.findByIdAndUpdate(
//     userId,
//     {otp},
//     {new : true, upsert : false}
//   );

//   if(!updateUser){
//     console.log("User not found");
//     return null;
//   }
// }

// export async function changePassword(req,res){
//   const {email, password} = req.body;
//   const user = await userModel.findOne({ email: email });
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   } 
//   const hashedPassword = await bcrypt.hash(password, 10);
//  await userModel.findByIdAndUpdate(
//     user._id,
//     {password : hashedPassword},
//     {new : true, upsert : false}
//   );
//   res.status(200).json({message : 'Passowrd updated Successfully'})
// }

export async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  // Check if both email and OTP are provided
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  // Find the user by email
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the OTP matches
  if (user.otp !== otp) {
    return res.status(401).json({ message: 'Invalid OTP' });
  }

  // Check if the OTP has expired
  const currentTime = new Date();
  if (currentTime > user.otpExpiry) {
    return res.status(401).json({ message: 'OTP has expired' });
  }

  // If OTP is valid and not expired
  res.status(200).json({ message: 'OTP is verified successfully' });
}

async function updateOtp(userId, otp, otpExpiry) {
  const updateUser = await userModel.findByIdAndUpdate(
    userId,
    { otp, otpExpiry },
    { new: true, upsert: false }
  );

  if (!updateUser) {
    console.log("User not found");
    return null;
  }
}

export async function changePassword(req, res) {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true, upsert: false }
    );

    // Check if update was successful
    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update password" });
    }

    // Send success response
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    // Catch any errors and send a server error response
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
