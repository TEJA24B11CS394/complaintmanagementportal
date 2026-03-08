import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiBriefcase, FiMapPin, FiShield } from 'react-icons/fi';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto pt-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
      >
        {/* Profile Header Background */}
        <div className="h-48 bg-gradient-to-r from-primary to-secondary relative">
           <div className="absolute -bottom-16 left-10">
             <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-5xl text-gray-400 font-bold shadow-lg">
               {user.name.charAt(0).toUpperCase()}
             </div>
           </div>
        </div>

        {/* Profile Details */}
        <div className="pt-20 pb-10 px-10">
           <div className="flex justify-between items-start mb-6">
             <div>
               <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
               <p className="text-gray-500">{user.role === 'admin' ? 'Administrator' : 'Student'}</p>
             </div>
             <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
               user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
             }`}>
               Active Status
             </span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
             {/* Email */}
             <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
               <div className="p-3 bg-white rounded-full shadow-sm text-primary"><FiMail size={20} /></div>
               <div>
                 <p className="text-xs text-gray-400 font-semibold uppercase">Email Address</p>
                 <p className="text-gray-700 font-medium">{user.email}</p>
               </div>
             </div>

             {/* Department */}
             <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
               <div className="p-3 bg-white rounded-full shadow-sm text-secondary"><FiBriefcase size={20} /></div>
               <div>
                 <p className="text-xs text-gray-400 font-semibold uppercase">Department</p>
                 <p className="text-gray-700 font-medium">{user.department || 'Not Assigned'}</p>
               </div>
             </div>

             {/* Role */}
             <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
               <div className="p-3 bg-white rounded-full shadow-sm text-green-500"><FiShield size={20} /></div>
               <div>
                 <p className="text-xs text-gray-400 font-semibold uppercase">Account Role</p>
                 <p className="text-gray-700 font-medium capitalize">{user.role}</p>
               </div>
             </div>

             {/* Location (Dummy for visual balance) */}
             <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
               <div className="p-3 bg-white rounded-full shadow-sm text-orange-500"><FiMapPin size={20} /></div>
               <div>
                 <p className="text-xs text-gray-400 font-semibold uppercase">Campus Location</p>
                 <p className="text-gray-700 font-medium">Main Campus</p>
               </div>
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;