import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBook, FiShield, FiLogIn, FiUserPlus } from 'react-icons/fi';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Blobs for Visual Appeal */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-[-50%] translate-y-[-50%]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 translate-x-[50%] translate-y-[50%]"></div>

      {/* Main Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-2xl"
      >
        <div className="inline-block p-3 rounded-2xl bg-white shadow-sm mb-4">
           <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
             CampusVoice
           </span>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Complaint Management <br/> <span className="text-primary">Simplified.</span>
        </h1>
        <p className="text-lg text-gray-600">
          A seamless bridge between students and administration. 
          Raise issues, track status, and improve campus facilities in real-time.
        </p>
      </motion.div>

      {/* Action Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* STUDENT CARD */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-primary"
        >
          <div className="card-body items-center text-center p-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <FiBook size={40} />
            </div>
            <h2 className="card-title text-2xl font-bold text-gray-800">Student Portal</h2>
            <p className="text-gray-500 mb-8">
              Face issues with academics, hostel, or mess? 
              Log in to raise complaints and track them instantly.
            </p>
            
            <div className="flex flex-col w-full gap-3">
              <Link to="/login" className="btn btn-primary w-full text-lg shadow-lg shadow-primary/30">
                <FiLogIn className="mr-2" /> Student Login
              </Link>
              <Link to="/register" className="btn btn-outline btn-primary w-full text-lg">
                <FiUserPlus className="mr-2" /> Student Register
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ADMIN CARD */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-secondary"
        >
          <div className="card-body items-center text-center p-10">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-4 text-secondary">
              <FiShield size={40} />
            </div>
            <h2 className="card-title text-2xl font-bold text-gray-800">Admin Console</h2>
            <p className="text-gray-500 mb-8">
              Faculty and Staff access. Review pending complaints, 
              update status, and manage campus facilities.
            </p>
            
            <div className="flex flex-col w-full gap-3">
              {/* Note: In a real app, Admin Login is usually the same page, but we label it for clarity */}
              <Link to="/login" className="btn btn-secondary w-full text-lg shadow-lg shadow-secondary/30">
                <FiLogIn className="mr-2" /> Admin Login
              </Link>
              {/* Note: Admin Registration is usually restricted, but for the project we allow it */}
              <Link to="/register" className="btn btn-outline btn-secondary w-full text-lg">
                <FiUserPlus className="mr-2" /> Admin Register
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer / Copyright */}
      <div className="mt-16 text-center text-gray-400 text-sm">
        <p>© 2024 CampusVoice Portal. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;