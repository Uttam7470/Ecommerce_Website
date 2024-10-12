import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import LoginForm from './Admin/LoginForm'
import Dashboard from './Admin/Dashboard'
import ForgetPasssword from './Admin/ForgetPasssword'
function App() {
  

  return (
    <>
    
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Register />}></Route>
    <Route path="/admin/login" element={<LoginForm />}></Route>
    <Route path="/admin/dashboard" element={<Dashboard />}></Route>
    <Route path="/admin/forget-password" element={<ForgetPasssword   />}></Route>
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
