// import axios from 'axios';
// import React, { useState } from 'react';

// function ForgetPassword() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [stage, setStage] = useState(1);
//   const [otp, setOtp] = useState('')

//   // Function to send the password reset email
//   async function sendMail(e) {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8000/api/user/forget-password", { email });
//       console.log(response); // Check the response data

//       if (response.status === 200) {
//         alert("Password reset email sent");
//         setStage(2)
//       }
//     } catch (error) {
//       if(error.response.data.message){
//         alert(error.response.data.message)
//         return
//       }
//       else{
//       console.log("Error:", error);
//       alert("Failed to send password reset email");
//       }
//     }
//   }
//   async function verifyOtp(e) {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8000/api/user/verify-otp", { email,otp });
//       console.log(response); // Check the response data

//       if (response.status === 200) {
//         alert(response.data.message);
//         setStage(3)
//       }
//     } catch (error) {
//       console.log("Error:", error);
//       alert("Failed to reset password");
//     }
//   }

//   async function changePassword(e){
//     e.preventDefault();
//     try{
//     const response = await axios.post('http://localhost:8000/api/user/change-password', {email,password})
//     alert(response.data.message)
//     }
//     catch(error){
//       if(error.response.data.message){
//         alert(error.response.data.message)
//       }
//       else{
//         alert('Internal server error')
//       }
//     }
//   }
//   return (
//     <>
//       {
//         stage === 1 ? 
//           <form onSubmit={sendMail}>
//             <div>
//               <label>Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//         :

//         stage == 2  ?
//         <form onSubmit={verifyOtp}>
//             <div>
//               <label>OTP</label>
//               <input
//                 type="otp"
//                 name="otp"
//                 placeholder="Enter your otp"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//            :

//            <form onSubmit={changePassword}>
//            <div>
//              <label>Password</label>
//              <input
//                type="password"
//                name="password"
//                placeholder="Enter your password"
//                value={password}
//                onChange={(e) => setPassword(e.target.value)}
//                required
//              />
//            </div>
//            <button type="submit">Submit</button>
//          </form>
        
//       }
//     </>
//   );
// }

// export default ForgetPassword;


import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For confirming password
  const [stage, setStage] = useState(1);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate(); // React router hook for navigation

  // Function to send the password reset email
  async function sendMail(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/user/forget-password", { email });
      console.log(response);

      if (response.status === 200) {
        alert("OTP has been sent to your email.");
        setStage(2); // Proceed to OTP verification stage
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send password reset email. Please try again.";
      alert(errorMessage);
    }
  }

  // Function to verify OTP
  async function verifyOtp(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/user/verify-otp", { email, otp });
      console.log(response);

      if (response.status === 200) {
        alert("OTP verified successfully. You can now reset your password.");
        setStage(3); // Proceed to change password stage
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again.";
      alert(errorMessage);
    }
  }

  // Function to change the password
  async function changePassword(e) {
    e.preventDefault();

    // Validate if password and confirm password match
    if (password !== confirmPassword) {
      alert("New Password and Confirm Password do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/change-password', { email, password });
      alert("Password changed successfully. Please log in with your new password.");
      navigate('/admin/login'); // Navigate to the login page after successful password change
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to change password. Please try again.";
      alert(errorMessage);
    }
  }

  return (
    <>
      {stage === 1 && (
        <form onSubmit={sendMail}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send OTP</button>
        </form>
      )}

      {stage === 2 && (
        <form onSubmit={verifyOtp}>
          <div>
            <label>OTP:</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter the OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {stage === 3 && (
        <form onSubmit={changePassword}>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
      )}
    </>
  );
}

export default ForgetPassword;


