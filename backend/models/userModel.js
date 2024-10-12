import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true  // Corrected 'require' to 'required'
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    otp : {
        type : String,
        default : null
    },
    otpExpiry: { type: Date }
},
{ timestamps: true }  // This will add createdAt and updatedAt fields
);

// Correctly export the model (name it 'User')
export const userModel = mongoose.model('user', userSchema);
