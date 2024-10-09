import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Task } from '../types'

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [name, setName] = useState('')
  const [budgetedTime, setBudgetedTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && budgetedTime) {
      const newTask: Task = {
        id: uuidv4(),
        name,
        budgetedTime: parseInt(budgetedTime),
        timeSpent: 0
      }
      onAddTask(newTask)
      setName('')
      setBudgetedTime('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="budgetedTime" className="block text-sm font-medium text-gray-700">
          Budgeted Time (minutes)
        </label>
        <input
          type="number"
          id="budgetedTime"
          value={budgetedTime}
          onChange={(e) => setBudgetedTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          min="1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Task
      </button>
    </form>
  )
}

export default TaskForm