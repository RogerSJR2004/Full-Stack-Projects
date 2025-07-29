import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login.jsx';
import Landing from './pages/Landing.jsx';
import Signup from './pages/Signup.jsx';
import Featured from './pages/Featured.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AddEvent from './pages/Dashboard/AddEvent.jsx';
import Events from './pages/Dashboard/Events.jsx';
import Dashboard from './pages/Dashboard/UserDashboard.jsx';
import AdminDashboard from './pages/Dashboard/AdminDashboard.jsx';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './contexts/PrivateRoute';
import RoleRoute from './contexts/RoleRoute';
import AppHeader from './contexts/AppHeader';
import SessionWarning from './components/SessionWarning.jsx';
import './App.css';

function App() {
  return (
    <>
      <AppHeader />
      <SessionWarning />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Private User Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
        </Route>

        {/* Admin Role Routes */}
        <Route element={<RoleRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/events" element={<Events />} />
        </Route>

        {/* 404 */}
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
    </>
  );
}

export default function AppWithProviders() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppHeader />
        <SessionWarning />
        <App />
      </BrowserRouter>
    </AuthProvider>
  );
}
