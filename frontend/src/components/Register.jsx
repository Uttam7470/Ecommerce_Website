// import React, { useState } from "react";
// import "./Register.css";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Register() {
//   // Updated state variables to match the backend schema
//   const [user, setUser] = useState({
//     firstname: "", // Matches the backend schema
//     lastname: "", // Matches the backend schema
//     email: "",
//     password: "",
//     role: "", // Matches the backend schema
//   });

//   const [registrationStatus, setRegistrationStatus] = useState(null);

//   // Handle change function to update state
//   function handleChange(e) {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   }

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/user/register",
//         { ...user }
//       );
//       console.log(response);

//       // Check for success message and set registration status accordingly
//       if (response.data.message === "success") {
//         setRegistrationStatus(true);
//       } else {
//         setRegistrationStatus(false);
//       }
//     } catch (error) {
//       console.error("Error registering user", error);
//       setRegistrationStatus(false);
//     }
//   };

//   return (
//     <>
//       {registrationStatus !== null ? (
//         registrationStatus === true ? (
//           <h3>
//             Registration successful! You can <Link to="/login">login</Link> now.
//           </h3>
//         ) : (
//           <h3>There was some problem. Please try again later.</h3>
//         )
//       ) : (
//         ""
//       )}
//       <form onSubmit={handleSubmit}>
//         <h2>Registration Form</h2>

//         {/* First Name Field */}
//         <div>
//           <label>First Name:</label>
//           <input
//             type="text"
//             name="firstname" // Updated to match backend expected field
//             placeholder="Enter your first name"
//             value={user.firstname}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Last Name Field */}
//         <div>
//           <label>Last Name:</label>
//           <input
//             type="text"
//             name="lastname" // Updated to match backend expected field
//             placeholder="Enter your last name"
//             value={user.lastname}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Email Field */}
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={user.email}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Password Field */}
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Create a password"
//             value={user.password}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Role Dropdown */}
//         <div>
//           <label>Role:</label>
//           <select name="role" value={user.role} onChange={handleChange}>
//             <option value="">Select Role</option> {/* Added default empty option */}
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }

// export default Register;


import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  // Updated state variables to match the backend schema
  const [user, setUser] = useState({
    firstname: "", // Matches the backend schema
    lastname: "", // Matches the backend schema
    email: "",
    password: "",
    role: "", // Matches the backend schema
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);

  // Handle change function to update state
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        { ...user }
      );
      console.log(response);

      // Check for success message and set registration status accordingly
      if (response.data.message === "success") {
        setRegistrationStatus(true);
      } else {
        setRegistrationStatus(false);
      }
    } catch (error) {
      console.error("Error registering user", error);
      setRegistrationStatus(false);
    }
  };

  return (
    <>
      {registrationStatus !== null ? (
        registrationStatus === true ? (
          <h3>
            Registration successful! You can <Link to="/login">login</Link> now.
          </h3>
        ) : (
          <h3>There was some problem. Please try again later.</h3>
        )
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        {/* First Name Field */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstname" // Updated to match backend expected field
            placeholder="Enter your first name"
            value={user.firstname}
            onChange={handleChange}
          />
        </div>

        {/* Last Name Field */}
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname" // Updated to match backend expected field
            placeholder="Enter your last name"
            value={user.lastname}
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        {/* Role Dropdown */}
        <div>
          <label>Role:</label>
          <select name="role" value={user.role} onChange={handleChange}>
            <option value="">Select Role</option> {/* Added default empty option */}
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>

          {/* Link to the login page for already registered users */}
      <p style={{textAlign:"center"}}>
        Already registered? <Link to="/admin/login">Log in here</Link>.
      </p>
      </form>

    
    </>
  );
}

export default Register;

