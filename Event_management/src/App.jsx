import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './pages/login.jsx';
import Landing from './pages/Landing.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup.jsx';
import Events from './pages/Events.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AddEvent from './pages/Dashboard/AddEvent.jsx';

import './App.css';
import Dashboard from './pages/Dashboard/UserDashboard.jsx';
import AdminDashboard from './pages/Dashboard/AdminDashboard.jsx';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/addevent');
  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/addevent" element={<AddEvent/>} />
        <Route
          path="*"
          element={
            <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <h1>404 - Not Found</h1>
              <p>The page you are looking for does not exist.</p>
              <Link to="/" style={{ color: "#1976d2", textDecoration: "underline" }}>Go to Home</Link>
            </div>
          }
        />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
