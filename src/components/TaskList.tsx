import React from 'react'
import { Trash2 } from 'lucide-react'
import { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
  onDeleteTask: (id: string) => void
  onUpdateTaskTime: (id: string, time: number) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onUpdateTaskTime }) => {
  return (
    <ul className="space-y-4">
      {tasks.map(task => (
        <li key={task.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
          <div>
            <h3 className="font-semibold">{task.name}</h3>
            <p className="text-sm text-gray-600">Budget: {task.budgetedTime} minutes</p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={task.timeSpent || 0}
              onChange={(e) => {
                const newTime = e.target.value === '' ? 0 : parseInt(e.target.value, 10)
                onUpdateTaskTime(task.id, isNaN(newTime) ? 0 : newTime)
              }}
              className="w-20 p-2 border rounded"
              min="0"
            />
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList