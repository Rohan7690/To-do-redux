import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, toggleTask, toggleImportant } from '../store/taskSlice';
import { Bell, Calendar, RotateCw, Star } from 'lucide-react';

export function TodoList() {

  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector(state => state.tasks.tasks);
  const { currentFilter, isBlockView, searchTerm, isDarkTheme } = useSelector(state => state.ui);

  const addNewTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTask({ text: newTodo }));
      setNewTodo("");
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (searchTerm && !todo.text.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    switch (currentFilter) {
      case 'today':
        return new Date(todo.createdAt).toDateString() === new Date().toDateString();
      case 'important':
        return todo.important;
      case 'planned':
        return todo.dueDate != null;
      case 'assigned':
        return todo.assignedTo === 'me';
      default:
        return true;
    }
  });

  // Separate completed and non-completed tasks
  const completedTasks = filteredTodos.filter(todo => todo.completed);
  const nonCompletedTasks = filteredTodos.filter(todo => !todo.completed);

  return (
    <div className={`flex-1 p-4 md:p-6 transition-all duration-300 bg-white dark:bg-gray-900`}>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="p-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add A Task"
              className="w-full text-lg outline-none bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              onKeyDown={(e) => e.key === 'Enter' && addNewTodo()}
            />
            <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Bell className="h-5 w-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <RotateCw className="h-5 w-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <button
                onClick={addNewTodo}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                ADD TASK
              </button>
            </div>
          </div>
        </div>

        <div className={`grid gap-4 ${isBlockView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {nonCompletedTasks.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
                isBlockView ? 'flex-col md:flex-row' : 'flex-row'
              } ${
                isDarkTheme ? 'bg-gray-800' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3 w-full">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTask(todo.id))}
                  className="h-5 w-5 border-gray-300 dark:border-gray-600 rounded text-green-600 focus:ring-green-500"
                />
                <span className={`${
                  todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'
                } ${isBlockView ? 'text-sm md:text-base' : ''}`}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => dispatch(toggleImportant(todo.id))}
                className={`p-1 rounded-lg ${
                  todo.important ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                } ${isBlockView ? 'mt-2 md:mt-0' : ''}`}
              >
                <Star className="h-5 w-5" fill={todo.important ? "currentColor" : "none"} />
              </button>
            </div>
          ))}
        </div>

        {completedTasks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Completed Tasks</h3>
            <div className={`grid gap-4 ${isBlockView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {completedTasks.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-4 rounded-lg shadow-sm opacity-50 ${
                    isBlockView ? 'flex-col md:flex-row' : 'flex-row'
                  } ${
                    isDarkTheme ? 'bg-gray-800' : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTask(todo.id))}
                      className="h-5 w-5 border-gray-300 dark:border-gray-600 rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="line-through text-gray-400 dark:text-gray-500">
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(toggleImportant(todo.id))}
                    className={`p-1 rounded-lg text-gray-400 ${isBlockView ? 'mt-2 md:mt-0' : ''}`}
                  >
                    <Star className="h-5 w-5" fill={todo.important ? "currentColor" : "none"} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

