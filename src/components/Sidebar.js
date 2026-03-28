import React from 'react';
import { Menu, X, ListTodo, Settings } from 'lucide-react';

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    return (
        <aside className={`absolute md:relative z-50 h-full transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-slate-800 flex flex-col items-center py-6`}>
        <div className="w-full px-6 flex justify-between items-center mb-8">
            <Menu className="w-6 h-6 text-gray-700 dark:text-slate-300 hidden md:block" />
            <X className="w-6 h-6 text-gray-700 dark:text-slate-300 cursor-pointer md:hidden ml-auto" onClick={() => setIsSidebarOpen(false)} />
        </div>
        
        <div className="flex flex-col items-center mb-8">
            <img src="https://i.pravatar.cc/150?img=47" alt="Jane Doe" className="w-20 h-20 rounded-full mb-3 border-4 border-white dark:border-slate-700 shadow-sm" />
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
    );
}

// React.memo evita que a Sidebar renderize de novo atoa
export default React.memo(Sidebar);