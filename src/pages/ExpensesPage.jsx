import React, { useState } from 'react';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseForm from '../components/expenses/ExpenseForm';
import FuelTracking from '../components/expenses/FuelTracking';

const ExpensesPage = () => {
  const [view, setView] = useState('list');
  const [selectedExpense, setSelectedExpense] = useState(null);

  const vehicles = [
    { id: 1, number: 'DL 01 AB 1234' },
    { id: 2, number: 'DL 02 CD 5678' },
    { id: 3, number: 'DL 03 EF 9012' }
  ];

  const handleSelectExpense = (expense) => {
    setSelectedExpense(expense);
    setView('form');
  };

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setView('form');
  };

  const handleSave = (formData) => {
    console.log('Save expense:', formData);
    setView('list');
    setSelectedExpense(null);
  };

  const handleCancel = () => {
    setView('list');
    setSelectedExpense(null);
  };

  return (
    <div>
      {view === 'list' && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <ExpenseList
            onSelectExpense={handleSelectExpense}
            onAddExpense={handleAddExpense}
          />
          <FuelTracking vehicles={vehicles} />
        </div>
      )}

      {view === 'form' && (
        <ExpenseForm
          expense={selectedExpense}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ExpensesPage;