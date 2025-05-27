import React, { useState } from 'react';
import PaymentList from '../components/payments/PaymentList';
import InvoiceForm from '../components/payments/InvoiceForm';
import PaymentReminders from '../components/payments/PaymentReminders';

const PaymentsPage = () => {
  const [view, setView] = useState('list');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const overduePayments = [
    {
      id: 1,
      customerName: 'Raj Kumar',
      invoiceNumber: 'INV-2024-001',
      balance: 30000,
      dueDate: '2024-01-05'
    },
    {
      id: 2,
      customerName: 'Amit Patel',
      invoiceNumber: 'INV-2024-005',
      balance: 15000,
      dueDate: '2024-01-08'
    }
  ];

  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
    // Handle payment details view
  };

  const handleAddPayment = () => {
    setView('invoice');
  };

  const handleSaveInvoice = (formData) => {
    console.log('Save invoice:', formData);
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    setSelectedPayment(null);
  };

  return (
    <div>
      {view === 'list' && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PaymentList
                onSelectPayment={handleSelectPayment}
                onAddPayment={handleAddPayment}
              />
            </div>
            <div>
              <PaymentReminders overduePayments={overduePayments} />
            </div>
          </div>
        </div>
      )}

      {view === 'invoice' && (
        <InvoiceForm
          booking={selectedPayment}
          onSave={handleSaveInvoice}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default PaymentsPage;