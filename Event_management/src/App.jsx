import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login.jsx';
import Landing from './pages/Landing.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup.jsx';
import Events from './pages/Events.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
