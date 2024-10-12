import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { generateCrypto } from '../utils/cryptoGenerate.js'

export function generateToken(user){
   console.log(user);
   
   return jwt.sign(
        {
         //   admin_token : generateCrypto
         userID : user._id,
         userEmail : user.email,
         isVerified : true,

        },
        process.env.SECRET,
        {expiresIn : '1h'}
    )
}  