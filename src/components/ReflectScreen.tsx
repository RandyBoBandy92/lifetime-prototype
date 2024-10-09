import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TimeTransaction, Category } from '../types';

interface ReflectScreenProps {
  transactions: TimeTransaction[];
  categories: Category[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

const ReflectScreen: React.FC<ReflectScreenProps> = ({ transactions, categories }) => {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.duration;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  const barChartData = categories.map(category => ({
    name: category.name,
    budgeted: category.budgetedTime,
    actual: categoryTotals[category.name] || 0
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Time Reflection</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Time Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Budget vs. Actual</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budgeted" fill="#8884d8" name="Budgeted Time" />
            <Bar dataKey="actual" fill="#82ca9d" name="Actual Time" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReflectScreen;