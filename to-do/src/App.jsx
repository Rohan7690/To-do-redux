import  { useState } from 'react';
import { useSelector } from 'react-redux';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { NavBar } from './components/Navbar';
import { TodoList } from './components/TodoList';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkTheme ? 'dark' : ''}`}>
      <NavBar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <TodoList />
      </div>
    </div>
  );
}

export default App;

