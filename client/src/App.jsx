import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage'; // <--- IMPORT THIS
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LodgeComplaint from './pages/LodgeComplaint';
import AdminDashboard from './pages/AdminDashboard';
import MyHistory from './pages/MyHistory'; // Import
import Profile from './pages/Profile';
import ComplaintDetails from './pages/ComplaintDetails';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} /> {/* Make this the home page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lodge-complaint" element={<LodgeComplaint />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/my-complaints" element={<MyHistory />} />
             <Route path="/profile" element={<Profile />} />
             <Route path="/complaint/:id" element={<ComplaintDetails />} />
            {/* We can add 'my-complaints' route here later */}
          </Route>
        </Routes>
      </Router>
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: { background: '#363636', color: '#fff' },
          success: { style: { background: '#4F46E5', color: 'white' } },
          error: { style: { background: '#EF4444', color: 'white' } },
        }} 
      />
    </>
  );
}

export default App;