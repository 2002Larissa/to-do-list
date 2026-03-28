import React from 'react';
import { Edit2, Trash2, Square, CheckSquare, Check } from 'lucide-react';

function TaskItem({ 
    task, 
    toggleTaskCompletion, 
    handleDeleteTask, 
    handleStartEditing, 
    handleSaveEdit, 
    editingTaskId, 
    editingText, 
    setEditingText 
    }) {
    const isEditing = editingTaskId === task.id;

    return (
        <div className="flex items-center justify-between bg-white dark:bg-[#1e293b] p-3 md:p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm group hover:shadow-md transition-all">
        <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
            {!isEditing && (
            <button onClick={() => toggleTaskCompletion(task.id)} className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors shrink-0">
                {task.completed ? <CheckSquare className="w-5 h-5 text-black dark:text-white" /> : <Square className="w-5 h-5" />}
            </button>
            )}
            
            {isEditing ? (
            <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                autoFocus
                className="flex-1 px-3 py-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm md:text-base text-gray-800 dark:text-white focus:outline-none"
            />
            ) : (
            <span onClick={() => toggleTaskCompletion(task.id)} className={`text-sm md:text-base truncate cursor-pointer ${task.completed ? 'line-through text-gray-400 dark:text-slate-500' : 'text-gray-700 dark:text-slate-200'}`}>
                {task.text}
            </span>
            )}
        </div>
        
        <div className="flex space-x-2 md:space-x-3 text-gray-400 dark:text-slate-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
            {isEditing ? (
            <button onClick={() => handleSaveEdit(task.id)} className="hover:text-green-500 transition-colors">
                <Check className="w-5 h-5 md:w-5 md:h-5 text-green-500" />
            </button>
            ) : (
            <>
                <button onClick={() => handleStartEditing(task)} className="hover:text-gray-700 dark:hover:text-slate-300 transition-colors">
                <Edit2 className="w-4 h-4 md:w-4 md:h-4" />
                </button>
                <button onClick={() => handleDeleteTask(task.id)} className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4 md:w-4 md:h-4" />
                </button>
            </>
            )}
        </div>
        </div>
    );
}

// React.memo junto com useCallback faz a mágica da performance acontecer
export default React.memo(TaskItem);