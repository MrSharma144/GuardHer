import { Home, Users, History, User, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard Home', path: '#overview', icon: Home },
    { name: 'Safety Map', path: '#map', icon: Home }, // reusing icon or add Map icon later
    { name: 'Safe Contacts', path: '#contacts', icon: Users },
    { name: 'Alert History', path: '#history', icon: History },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-midnight border-r border-charcoal min-h-[calc(100vh-73px)] pt-6 sidebar-container sticky top-[73px]">
      <div className="flex flex-col gap-2 px-4 flex-grow">
        <div className="text-xs font-bold text-lavender uppercase tracking-wider mb-2 pl-2">Menu</div>
        {navItems.map((item) => (
          <a
            key={item.path}
            href={`/dashboard${item.path}`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-offwhite/70 hover:bg-navy/50 hover:text-lavender border-l-4 border-transparent focus:bg-navy focus:text-coral focus:border-coral"
          >
            <item.icon size={20} />
            {item.name}
          </a>
        ))}
      </div>

      <div className="p-4 mt-auto border-t border-charcoal/50">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium border border-transparent cursor-pointer"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
