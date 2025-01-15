import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Grid, List, Moon, Sun, Menu, X } from 'lucide-react';
import { toggleTheme, toggleView, setSearchTerm } from '../store/uiSlice';
import doit from '../assets/doit.png';

// eslint-disable-next-line react/prop-types
export function NavBar({ toggleSidebar }) {
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isDarkTheme, isBlockView } = useSelector(state => state.ui);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <div className="flex items-center text-green-600 dark:text-green-500">
            
            
            <img src={doit} alt="DoIt" className="h-10 w-24" />
          </div>
        </div>

        <div className="flex-1 mx-4 relative hidden md:block">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full md:hidden"
          >
            {isSearchOpen ? (
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
          <button 
            onClick={() => dispatch(toggleView())}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {isBlockView ? (
              <List className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Grid className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
          <button 
            onClick={() => dispatch(toggleTheme())}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {isDarkTheme ? (
              <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
      {isSearchOpen && (
        <div className="px-4 pb-4 md:hidden">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
            onChange={handleSearch}
          />
        </div>
      )}
    </nav>
  );
}

