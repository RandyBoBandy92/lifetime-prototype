import React from 'react';
import { useAppContext } from '../context/AppContext';
import ReflectScreen from '../components/ReflectScreen';

const ReflectPage: React.FC = () => {
  const { state } = useAppContext();

  return (
    <ReflectScreen
      transactions={state.transactions}
      categories={state.categories}
    />
  );
};

export default ReflectPage;