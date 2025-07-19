import { useState } from 'react'
import{ BrowserRouter , Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Menu from './Pages/Menu'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Order from './Pages/Order'
import Login from './Pages/Login'
function App() {

  return (
    <>
      <BrowserRouter>

    <header style={{width:'100%' ,backgroundColor:'black',color:'white',textAlign:'center',padding:'10px'}} className="App-header">
      <h1>Restaurant Management System</h1>
      <nav>
       <Link to="/">Menu</Link> 
       <Link to="/about">About</Link>
       <Link to="/contact">Contact</Link>
       <Link to="/Order">Order</Link>
       <Link to="/Login">Login</Link>
      </nav>
    </header>
      <div className="main-content">
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/Order' element={<Order />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </div>

      </BrowserRouter>
    </>           
      
        
  )
}

export default App
