import React from 'react';
import { useAppContext } from '../context/AppContext';
import BudgetScreen from '../components/BudgetScreen';

const BudgetPage: React.FC = () => {
  const { state, updateCategory } = useAppContext();

  return (
    <BudgetScreen
      categories={state.categories}
      transactions={state.transactions}
      onUpdateCategory={updateCategory}
    />
  );
};

export default BudgetPage;