

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./LoginForm.css";
// import Dashboard from "./Dashboard"; // Assuming this is your Dashboard component
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
//   const navigate = useNavigate();

//   useEffect(() => {
//     isUserLoggedIn();
//   }, []);

//   // Function to check if the user is already logged in
//   async function isUserLoggedIn() {
//     try {
//       const response = await axios.get("http://localhost:8000/api/user/loggedIn", {
//         withCredentials: true,
//       });
//       if (response.status === 200) {
//         setIsLoggedIn(true);
//       }
//     } catch (err) {
//       console.log("Error checking login status: " + err);
//     }
//   }

//   // Function to handle form submission for login
//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/user/login",
//         { email, password, role: "admin" },
//         { withCredentials: true }
//       );

//       // If login is successful, set the `isLoggedIn` state to true
//       if (response.status === 200) {
//         setIsLoggedIn(true);
//         console.log("Login successful:", response);
//         navigate("/admin/dashboard");
//       }
//     } catch (err) {
//       console.log("Error during login: ", err);
//     }
//   }

//   return (
//     <>
//       {isLoggedIn ? (
//         // Pass `setIsLoggedIn` as a prop to `Dashboard`
//         <Dashboard setIsLoggedIn={setIsLoggedIn} />
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <h2>Admin Login</h2>
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//       )}
//     </>
//   );
// };

// export default LoginForm;



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginForm(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  // Function to check if the user is already logged in
  async function isUserLoggedIn() {
    try {
      const response = await axios.get("http://localhost:8000/api/user/loggedIn", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate("/admin/dash board"); // Redirect to dashboard if already logged in
      }
    } catch (err) {
      console.log("Error checking login status: " + err);
    }
  }

  // Function to handle form submission for login
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        { email, password, role: "admin" },
        { withCredentials: true }
      );

      // If login is successful, set the `isLoggedIn` state to true
      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log("Login successful:", response);
        navigate("/admin/dashboard"); // Redirect to dashboard after successful login
      }
    } catch (err) {
      console.log("Error during login: ", err);
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
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
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      <br />
      <br />
      <Link to='/admin/forget-password'>Forget Password...?</Link>
    </form>
   
    </>
  );
};

export default LoginForm;
    
