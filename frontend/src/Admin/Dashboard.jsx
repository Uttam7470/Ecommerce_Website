// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Dashboard({ setIsLoggedIn }) {
//   const navigate = useNavigate();

//   // Function to handle the logout
//   async function handleLogout() {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/user/logout",
//         {},
//         { withCredentials: true }
//       );
//       if (response.data.message === "Logout Successfully") {
//         setIsLoggedIn(false); // Update the login state
//         navigate("/admin/login"); // Redirect the user to the login page
//       }
//     } catch (error) {
//       console.log("Error during logout: ", error);
//     }
//   }

//   return (
//     <div>
//       <h1>Welcome, Admin!</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Dashboard;



import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
  const[products, setProducts] = useState([])
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn } = location.state || {};

  let count  = useRef(0);

  useEffect(()=>{
    fetchAllProducts();
  },[]);

  async function fetchAllProducts(){
    try{
      const response = await axios.get(
        "http://localhost:8000/api/product")
        console.log(response.data);
        setProducts(response.data)
        
    }
    catch(err){
      console.log("Error fetching products: " + err);
      
    }
  }

  async function handleLogout() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/logout",
        {},
        { withCredentials: true }
      );
      if (response.data.message === "Logout Successfully") {
        if (setIsLoggedIn) setIsLoggedIn(false);
        navigate("/admin/login");
      }
    } catch (error) {
      console.log("Error during logout: ", error);
    }
  }

  return (
    <>
    <header>
      <h1>Welcome, Admin!</h1>
      <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <h2>Manage Products</h2>
        <table>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product)=>{
                return <tr key={product._id}>
                  <td>{++count.current}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                </tr>
                
              })
            }
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Dashboard;
