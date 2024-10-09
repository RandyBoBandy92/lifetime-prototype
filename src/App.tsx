import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Clock, PieChart, BarChart } from 'lucide-react';
import TransactionsPage from './pages/TransactionsPage';
import BudgetPage from './pages/BudgetPage';
import ReflectPage from './pages/ReflectPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Time Well Spent</h1>
          <p className="text-gray-600">Manage your time like you manage your money</p>
        </header>

        <nav className="flex justify-center mb-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `mx-2 px-4 py-2 rounded-md ${
                isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`
            }
          >
            <Clock className="inline-block mr-2" /> Transactions
          </NavLink>
          <NavLink
            to="/budget"
            className={({ isActive }) =>
              `mx-2 px-4 py-2 rounded-md ${
                isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`
            }
          >
            <PieChart className="inline-block mr-2" /> Budget
          </NavLink>
          <NavLink
            to="/reflect"
            className={({ isActive }) =>
              `mx-2 px-4 py-2 rounded-md ${
                isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`
            }
          >
            <BarChart className="inline-block mr-2" /> Reflect
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<TransactionsPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/reflect" element={<ReflectPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;