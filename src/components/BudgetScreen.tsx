import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Category, TimeTransaction } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const BudgetScreen: React.FC = () => {
  const { state, updateCategory, updateCategoryBudget } = useAppContext();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [assignedMinutes, setAssignedMinutes] = useState(0);

  const monthKey = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`;

  useEffect(() => {
    const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();
    setTotalMinutes(daysInMonth * 1440);
  }, [selectedMonth]);

  useEffect(() => {
    const total = state.categories.reduce((sum, category) => sum + (category.budgetedTime[monthKey] || 0), 0);
    setAssignedMinutes(total);
  }, [state.categories, monthKey]);

  const handlePreviousMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1));
  };

  const handleUpdateBudget = (categoryId: string, newBudget: string) => {
    const budgetedTime = parseInt(newBudget);
    updateCategoryBudget(categoryId, monthKey, budgetedTime);
  };

  const calculateActivityTime = (categoryName: string) => {
    return state.transactions
      .filter(t => t.category === categoryName && t.date.startsWith(monthKey))
      .reduce((total, t) => total + t.duration, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePreviousMonth} className="text-gray-600 hover:text-gray-800">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold">
          {selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-800">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="mb-6 bg-blue-50 p-4 rounded-md">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total Minutes: {totalMinutes}</span>
          <span className="text-lg font-semibold">Assigned: {assignedMinutes}</span>
          <span className="text-lg font-semibold">Available: {totalMinutes - assignedMinutes}</span>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Category</th>
            <th className="text-right p-2">Assigned</th>
            <th className="text-right p-2">Activity</th>
            <th className="text-right p-2">Available</th>
          </tr>
        </thead>
        <tbody>
          {state.categories.map(category => {
            const budgetedTime = category.budgetedTime[monthKey] || 0;
            const activityTime = calculateActivityTime(category.name);
            const availableTime = budgetedTime - activityTime;
            return (
              <tr key={category.id} className="border-b">
                <td className="p-2">{category.name}</td>
                <td className="p-2">
                  <input
                    type="number"
                    value={budgetedTime}
                    onChange={(e) => handleUpdateBudget(category.id, e.target.value)}
                    className="w-20 text-right rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    min="0"
                  />
                </td>
                <td className="text-right p-2">{activityTime}</td>
                <td className={`text-right p-2 ${availableTime >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {availableTime}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Add New Category</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const name = (e.target as any).categoryName.value;
          if (name) {
            const newCategory: Category = {
              id: uuidv4(),
              name,
              budgetedTime: {}
            };
            updateCategory(newCategory);
            (e.target as any).categoryName.value = '';
          }
        }} className="flex space-x-4">
          <input
            type="text"
            name="categoryName"
            placeholder="Category name"
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default BudgetScreen;