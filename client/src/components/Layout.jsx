import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiPlusCircle, 
  FiList, 
  FiUser, 
  FiLogOut, 
  FiMenu,
  FiGrid
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Check authentication
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!user) return null;

  // --- MENU CONFIGURATION ---
  
  // Menu for STUDENTS
  const studentMenu = [
    { name: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
    { name: 'Lodge Complaint', icon: <FiPlusCircle />, path: '/lodge-complaint' },
    { name: 'My History', icon: <FiList />, path: '/my-complaints' },
    { name: 'Profile', icon: <FiUser />, path: '/profile' },
  ];

  // Menu for ADMINS
  const adminMenu = [
    { name: 'Admin Console', icon: <FiGrid />, path: '/admin-dashboard' },
    { name: 'Profile', icon: <FiUser />, path: '/profile' },
  ];

  // Decide which menu to show
  const menuItems = user.role === 'admin' ? adminMenu : studentMenu;

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* MOBILE SIDEBAR TOGGLE */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button className="btn btn-circle btn-sm btn-ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* SIDEBAR */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} duration-300 h-full bg-white border-r border-gray-200 hidden md:flex flex-col justify-between p-4 shadow-sm`}>
        
        {/* Top: Logo Area */}
        <div>
          <div className={`flex items-center gap-3 px-2 mb-8 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="min-w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg">
              C
            </div>
            {isSidebarOpen && (
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary whitespace-nowrap">
                CampusVoice
              </h1>
            )}
          </div>

          {/* Navigation Links (Dynamic) */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-semibold' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className={`text-xl ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>
                    {item.icon}
                  </span>
                  {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom: User Profile with RANDOM IMAGE */}
        <div className="border-t pt-4">
          <div className={`flex items-center gap-3 px-2 ${!isSidebarOpen && 'justify-center'}`}>
            
            {/* AVATAR IMAGE */}
            <div className="avatar">
              <div className={`w-10 rounded-full ring ring-offset-base-100 ring-offset-2 ${user.role === 'admin' ? 'ring-secondary' : 'ring-primary'}`}>
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt="avatar" 
                />
              </div>
            </div>

            {/* User Details */}
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden transition-all duration-300">
                <p className="text-sm font-semibold truncate text-gray-800">{user.name}</p>
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${user.role === 'admin' ? 'bg-secondary' : 'bg-primary'}`}></span>
                  <p className="text-xs text-gray-500 truncate capitalize">{user.role}</p>
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleLogout}
            className={`mt-4 w-full flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors ${!isSidebarOpen && 'justify-center'}`}
          >
            <FiLogOut />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;