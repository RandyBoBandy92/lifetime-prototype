import React, { useState } from 'react';
import { Clock, ChevronDown, Search, Plus, Upload, Undo, Redo, Trash2 } from 'lucide-react';
import { TimeTransaction, Category } from '../types';

interface TransactionListProps {
  transactions: TimeTransaction[];
  categories: Category[];
  onAddTransaction: () => void;
  onUpdateTransaction: (transaction: TimeTransaction) => void;
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  categories, 
  onAddTransaction, 
  onUpdateTransaction, 
  onDeleteTransaction 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (transaction: TimeTransaction) => {
    setEditingId(transaction.id);
  };

  const handleSave = (updatedTransaction: TimeTransaction) => {
    onUpdateTransaction(updatedTransaction);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDeleteTransaction(id);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Time Transactions</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onAddTransaction}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus size={16} className="mr-2" /> Add Transaction
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded flex items-center">
            <Upload size={16} className="mr-2" /> Import
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <Undo size={20} />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <Redo size={20} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-right">Duration</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
              {editingId === transaction.id ? (
                <>
                  <td className="py-3 px-6">
                    <input
                      type="date"
                      defaultValue={transaction.date}
                      className="w-full px-2 py-1 border rounded"
                      onChange={(e) => transaction.date = e.target.value}
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      defaultValue={transaction.description}
                      className="w-full px-2 py-1 border rounded"
                      onChange={(e) => transaction.description = e.target.value}
                    />
                  </td>
                  <td className="py-3 px-6">
                    <select
                      defaultValue={transaction.category}
                      className="w-full px-2 py-1 border rounded"
                      onChange={(e) => transaction.category = e.target.value}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="number"
                      defaultValue={transaction.duration}
                      className="w-full px-2 py-1 border rounded text-right"
                      onChange={(e) => transaction.duration = parseInt(e.target.value)}
                    />
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleSave(transaction)}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">{transaction.description}</td>
                  <td className="py-3 px-6 text-left">{transaction.category}</td>
                  <td className="py-3 px-6 text-right">{transaction.duration} min</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {filteredTransactions.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;