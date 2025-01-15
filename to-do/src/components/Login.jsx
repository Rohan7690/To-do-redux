import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { ListTodoIcon } from 'lucide-react';
import doit from '../assets/doit.png';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ username }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6">
        <div>
          <div className="flex justify-center">
            <img className="h-12 w-30 text-green-600" src={doit}/>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Welcome Back to <span className="text-green-600">DoIt</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Note: This is a demo application. You can sign in with any username and password.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full mt-1 px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full mt-1 px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign In
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
