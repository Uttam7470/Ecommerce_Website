import exprss from "express";
import { registerUser, loginUser, logoutUser, isUserLoggedIn , forgetPassword, verifyOtp, changePassword} from "../controllers/userController.js";
import authMiddleware from '../middlewares/authMiddleware.js'
// import { verify } from "jsonwebtoken";
const ecomRouter = exprss.Router();


ecomRouter.post('/user/register' , registerUser)
ecomRouter.post('/user/login' , loginUser)
ecomRouter.post('/user/logout' , logoutUser)
ecomRouter.get('/user/loggedIn' ,authMiddleware, isUserLoggedIn)
ecomRouter.post('/user/forget-password' , forgetPassword)
ecomRouter.post('/user/verify-otp' , verifyOtp)
ecomRouter.post('/user/change-password' , changePassword)

export default ecomRouter