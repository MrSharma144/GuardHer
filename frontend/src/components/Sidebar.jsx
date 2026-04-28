import { Home, Users, History, Settings, MessageSquare, User, LogOut, Map } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard',     path: '/dashboard',  icon: Home },
    { name: 'Safe Contacts', path: '/contacts',   icon: Users },
    { name: 'Alert History', path: '/emergency',  icon: History },
    { name: 'Area Reviews',  path: '/reviews',    icon: MessageSquare },
    { name: 'My Profile',    path: '/profile',    icon: User },
    { name: 'Settings',      path: '/settings',   icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-midnight border-r border-charcoal min-h-[calc(100vh-73px)] pt-6 sticky top-[73px]">
      <div className="flex flex-col gap-1 px-4 flex-grow">
        <div className="text-xs font-bold text-lavender uppercase tracking-wider mb-3 pl-2">
          Navigation
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? 'bg-lavender/10 text-lavender border-l-4 border-lavender'
                  : 'text-offwhite/60 hover:bg-navy/50 hover:text-lavender border-l-4 border-transparent'
              }`
            }
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-charcoal/50">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium text-sm border border-transparent cursor-pointer"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
