
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { setFilter } from '../store/uiSlice';
import { ListTodo, Calendar, Star, Clock, User, Plus, LogOut } from 'lucide-react';

// eslint-disable-next-line react/prop-types
export function Sidebar({ isSidebarOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { currentFilter } = useSelector(state => state.ui);

  const navItems = [
    { icon: ListTodo, label: "All Tasks", filter: "all" },
    { icon: Calendar, label: "Today", filter: "today" },
    { icon: Star, label: "Important", filter: "important" },
    { icon: Clock, label: "Planned", filter: "planned" },
    { icon: User, label: "Assigned to me", filter: "assigned" }
  ];

  return (
    <aside className={`h-auto bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto flex-shrink-0 transition-all duration-300 ease-in-out ${
  isSidebarOpen ? 'w-64' : 'w-18'
} md:translate-x-0`}>
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${user?.username}.svg`}
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
        {isSidebarOpen && (
          <div className="min-w-0">
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Hey,</p>
            <p className="font-medium text-gray-900 dark:text-white truncate">{user?.username || 'ABCD'}</p>
          </div>
        )}
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.filter}
            onClick={() => dispatch(setFilter(item.filter))}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              currentFilter === item.filter 
                ? 'bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {isSidebarOpen && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>

      <button
        className="w-full flex items-center space-x-3 px-3 py-2 mt-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        <Plus className="h-5 w-5 flex-shrink-0" />
        {isSidebarOpen && <span className="truncate">Add list</span>}
      </button>
      <button
        onClick={() => dispatch(logout())}
        className="w-full flex items-center space-x-3 px-3 py-2 mt-4 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg"
      >
        <LogOut className="h-5 w-5 flex-shrink-0" />
        {isSidebarOpen && <span className="truncate">Logout</span>}
      </button>
    </aside>
  );
}

