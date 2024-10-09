import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';

const TransactionsPage: React.FC = () => {
  const { state, addTransaction } = useAppContext();
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {isAddingTransaction ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Add Time Transaction</h2>
          <TransactionForm
            onAddTransaction={(transaction) => {
              addTransaction(transaction);
              setIsAddingTransaction(false);
            }}
            categories={state.categories}
          />
          <button
            onClick={() => setIsAddingTransaction(false)}
            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <TransactionList
          transactions={state.transactions}
          onAddTransaction={() => setIsAddingTransaction(true)}
        />
      )}
    </div>
  );
};

export default TransactionsPage;