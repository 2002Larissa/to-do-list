import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, Moon, Sun, Plus } from 'lucide-react';
import taskIllustration from './assets/task-illustration.png';

// Importando os nossos novos componentes
import Sidebar from './components/Sidebar';
import TaskItem from './components/TaskItem';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('minhasTarefas');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [activeTab, setActiveTab] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

  //Salva tarefas automaticamente
  useEffect(() => {
    localStorage.setItem('minhasTarefas', JSON.stringify(tasks));
  }, [tasks]);

  //Memoriza as funções para não recriá-arlas a cada renderização
  const handleAddTask = useCallback(() => {
    if (inputValue.trim() === '') return;
    const newTask = { id: Date.now(), text: inputValue, completed: false };
    setTasks(prev => [...prev, newTask]); // Usando prev previne bugs de concorrência
    setInputValue('');
  }, [inputValue]);

  const toggleTaskCompletion = useCallback((taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const handleStartEditing = useCallback((task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  }, []);

  const handleSaveEdit = useCallback((taskId) => {
    if (editingText.trim() === '') return;
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, text: editingText } : task
    ));
    setEditingTaskId(null);
  }, [editingText]);

  //Só recalcula os filtros se a lista de tarefas ou a aba ativa mudarem
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (activeTab === 'Active') return !task.completed;
      if (activeTab === 'Completed') return task.completed;
      return true;
    });
  }, [tasks, activeTab]);

  return (
    <div className={`flex h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex w-full h-full bg-[#f9fafb] dark:bg-[#0f172a] text-gray-800 dark:text-slate-200 relative overflow-hidden">
        
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" onClick={() => setIsSidebarOpen(false)} />
        )}

        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 flex flex-col relative py-8 px-4 md:py-10 md:px-8 items-center overflow-y-auto w-full">
          <div className="w-full max-w-2xl flex justify-between items-center mb-6 md:mb-0 md:absolute md:top-8 md:right-8 md:w-auto">
            <button className="md:hidden p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <div className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="w-6 h-6 text-slate-300 hover:text-white" /> : <Moon className="w-6 h-6 text-gray-600 hover:text-gray-900" />}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 md:mt-10 mb-8 transition-colors">My Tasks</h1>

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

          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-10">
              <div className="flex items-center space-x-4 md:space-x-6 text-left">
                <img src={taskIllustration} alt="Empty task list illustration" className="w-32 h-32 md:w-48 md:h-48 object-contain" />
                <div className="text-gray-500 dark:text-slate-400 italic transition-colors text-sm md:text-base">
                  <p>Empty as my motivation on Monday 😅.</p>
                  <p>Let's start adding stuff!</p>
                </div>
              </div>
            </div>
          ) : (
            <>
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

              <div className="w-full max-w-2xl flex flex-col space-y-3">
                {filteredTasks.map((task) => (
                  <TaskItem 
                    key={task.id}
                    task={task}
                    toggleTaskCompletion={toggleTaskCompletion}
                    handleDeleteTask={handleDeleteTask}
                    handleStartEditing={handleStartEditing}
                    handleSaveEdit={handleSaveEdit}
                    editingTaskId={editingTaskId}
                    editingText={editingText}
                    setEditingText={setEditingText}
                  />
                ))}
              </div>
            </>
          )}

          <div className="mt-auto pt-10 pb-2 text-xs md:text-sm text-gray-400 dark:text-slate-600 transition-colors">
            © 2026
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;