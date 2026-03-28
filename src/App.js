import React, { useState } from 'react';
import { Menu, Moon, Sun, Settings, ListTodo, Plus, Edit2, Trash2, Square, CheckSquare, X } from 'lucide-react';
import taskIllustration from './assets/task-illustration.png';

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  //Estado para controlar se a barra lateral está aberta no mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddTask = () => {
    if (inputValue.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'Active') return !task.completed;
    if (activeTab === 'Completed') return task.completed;
    return true;
  });

  return (
    <div className={`flex h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      
      <div className="flex w-full h-full bg-[#f9fafb] dark:bg-[#0f172a] text-gray-800 dark:text-slate-200 relative overflow-hidden">
        
        {/* NOVO: Overlay escuro para o mobile quando o menu está aberto */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar atualizada para ser responsiva */}
        <aside className={`
          absolute md:relative z-50 h-full 
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 
          transition-transform duration-300 ease-in-out 
          w-64 bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-slate-800 
          flex flex-col items-center py-6
        `}>
          <div className="w-full px-6 flex justify-between items-center mb-8">
            <Menu className="w-6 h-6 text-gray-700 dark:text-slate-300 hidden md:block" />
            {/* Botão de fechar visível apenas no mobile */}
            <X 
              className="w-6 h-6 text-gray-700 dark:text-slate-300 cursor-pointer md:hidden ml-auto" 
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          
          <div className="flex flex-col items-center mb-8">
            <img 
              src="https://i.pravatar.cc/150?img=47" 
              alt="Jane Doe" 
              className="w-20 h-20 rounded-full mb-3 border-4 border-white dark:border-slate-700 shadow-sm"
            />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Jane Doe</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">janedoe@gmail.com</p>
          </div>

          <div className="w-full px-4 border-t border-gray-100 dark:border-slate-700 pt-6">
            <button className="w-full flex items-center space-x-3 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-medium mb-2 transition-colors">
              <ListTodo className="w-5 h-5" />
              <span>My Tasks</span>
            </button>
            <button className="w-full flex items-center space-x-3 text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 px-4 py-3 rounded-xl font-medium transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative py-8 px-4 md:py-10 md:px-8 items-center overflow-y-auto w-full">
          
          {/* NOVO: Header Mobile com Menu e Toggle de Tema */}
          <div className="w-full max-w-2xl flex justify-between items-center mb-6 md:mb-0 md:absolute md:top-8 md:right-8 md:w-auto">
            <button 
              className="md:hidden p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>

            <div 
              className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun className="w-6 h-6 text-slate-300 hover:text-white" /> : <Moon className="w-6 h-6 text-gray-600 hover:text-gray-900" />}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 md:mt-10 mb-8 transition-colors">My Tasks</h1>

          {/* Input Area */}
          <div className="flex w-full max-w-2xl space-x-3 md:space-x-4 mb-8">
            <input 
              type="text" 
              placeholder="Type your task here.." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 bg-white dark:bg-[#334155] dark:text-white dark:placeholder-slate-400 shadow-sm transition-colors text-sm md:text-base"
            />
            <button onClick={handleAddTask} className="bg-black dark:bg-[#475569] text-white px-5 md:px-6 py-3 rounded-xl font-medium flex items-center space-x-2 hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors shadow-sm shrink-0">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>

          {/* Renderização Condicional */}
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-10">
              <div className="flex items-center space-x-4 md:space-x-6 text-left">
                <img 
                  src={taskIllustration} 
                  alt="Empty task list illustration" 
                  className="w-32 h-32 md:w-48 md:h-48 object-contain"
                />
                <div className="text-gray-500 dark:text-slate-400 italic transition-colors text-sm md:text-base">
                  <p>Empty as my motivation on Monday 😅.</p>
                  <p>Let's start adding stuff!</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Task Filter */}
              <div className="flex w-full max-w-2xl justify-between items-center mb-4 text-xs md:text-sm px-2">
                <div className="flex space-x-2">
                  <button onClick={() => setActiveTab('All')} className={`transition-colors ${activeTab === 'All' ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-slate-300'}`}>All</button>
                  <span className="text-gray-400 dark:text-slate-600">|</span>
                  <button onClick={() => setActiveTab('Active')} className={`transition-colors ${activeTab === 'Active' ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-slate-300'}`}>Active</button>
                  <span className="text-gray-400 dark:text-slate-600">|</span>
                  <button onClick={() => setActiveTab('Completed')} className={`transition-colors ${activeTab === 'Completed' ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-slate-300'}`}>Completed</button>
                </div>
                <div className="text-gray-400 dark:text-slate-500">
                  {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} left
                </div>
              </div>

              {/* Lista */}
              <div className="w-full max-w-2xl flex flex-col space-y-3">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between bg-white dark:bg-[#1e293b] p-3 md:p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm group hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 md:space-x-4 cursor-pointer flex-1 min-w-0" onClick={() => toggleTaskCompletion(task.id)}>
                      <button className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors shrink-0">
                        {task.completed ? <CheckSquare className="w-5 h-5 text-black dark:text-white" /> : <Square className="w-5 h-5" />}
                      </button>
                      <span className={`text-sm md:text-base truncate ${task.completed ? 'line-through text-gray-400 dark:text-slate-500' : 'text-gray-700 dark:text-slate-200'}`}>
                        {task.text}
                      </span>
                    </div>
                    
                    {/* Alterado para aparecer sempre no mobile (opacity-100 md:opacity-0) e no hover no desktop */}
                    <div className="flex space-x-2 md:space-x-3 text-gray-400 dark:text-slate-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                      <button className="hover:text-gray-700 dark:hover:text-slate-300 transition-colors"><Edit2 className="w-4 h-4 md:w-4 md:h-4" /></button>
                      <button onClick={() => handleDeleteTask(task.id)} className="hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4 md:w-4 md:h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Footer */}
          <div className="mt-auto pt-10 pb-2 text-xs md:text-sm text-gray-400 dark:text-slate-600 transition-colors">
            © 2025
          </div>
        </main>
      </div>

    </div>
  );
}

export default App;