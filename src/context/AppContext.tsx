import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppState, TimeTransaction, Category } from '../types';

interface AppContextType {
  state: AppState;
  addTransaction: (transaction: Omit<TimeTransaction, 'id'>) => void;
  updateCategory: (category: Category) => void;
  updateCategoryBudget: (categoryId: string, monthKey: string, budgetedTime: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const savedState = localStorage.getItem('timeTrackerState');
    return savedState ? JSON.parse(savedState) : { transactions: [], categories: [] };
  });

  useEffect(() => {
    localStorage.setItem('timeTrackerState', JSON.stringify(state));
  }, [state]);

  const addTransaction = (transaction: Omit<TimeTransaction, 'id'>) => {
    setState(prevState => ({
      ...prevState,
      transactions: [...prevState.transactions, { ...transaction, id: uuidv4() }]
    }));
  };

  const updateCategory = (category: Category) => {
    setState(prevState => {
      const existingCategoryIndex = prevState.categories.findIndex(c => c.id === category.id);
      if (existingCategoryIndex !== -1) {
        // Update existing category
        const updatedCategories = [...prevState.categories];
        updatedCategories[existingCategoryIndex] = category;
        return { ...prevState, categories: updatedCategories };
      } else {
        // Add new category
        return { ...prevState, categories: [...prevState.categories, category] };
      }
    });
  };

  const updateCategoryBudget = (categoryId: string, monthKey: string, budgetedTime: number) => {
    setState(prevState => {
      const updatedCategories = prevState.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            budgetedTime: {
              ...category.budgetedTime,
              [monthKey]: budgetedTime
            }
          };
        }
        return category;
      });
      return { ...prevState, categories: updatedCategories };
    });
  };

  return (
    <AppContext.Provider value={{ state, addTransaction, updateCategory, updateCategoryBudget }}>
      {children}
    </AppContext.Provider>
  );
};