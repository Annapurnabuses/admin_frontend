import React from 'react';
import { AlertCircle, Clock, Phone, Send } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

const PaymentReminders = ({ overduePayments }) => {
  const sendReminder = (payment, method) => {
    console.log(`Sending ${method} reminder to ${payment.customerName}`);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Payment Reminders</h3>
        <Badge variant="danger" dot>
          {overduePayments.length} Overdue
        </Badge>
      </div>

      {overduePayments.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="mx-auto text-gray-400 mb-2" size={48} />
          <p className="text-gray-500">No overdue payments</p>
        </div>
      ) : (
        <div className="space-y-3">
          {overduePayments.map((payment) => {
            const daysOverdue = Math.floor(
              (new Date() - new Date(payment.dueDate)) / (1000 * 60 * 60 * 24)
            );
            
            return (
              <div
                key={payment.id}
                className="p-4 bg-red-50 rounded-lg border border-red-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{payment.customerName}</h4>
                    <p className="text-sm text-gray-600">{payment.invoiceNumber}</p>
                  </div>
                  <Badge variant="danger" size="xs">
                    {daysOverdue} days overdue
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Amount Due</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(payment.balance)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Due Date</p>
                    <p className="text-sm font-medium">{formatDate(payment.dueDate)}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    icon={Phone}
                    onClick={() => sendReminder(payment, 'call')}
                  >
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={Send}
                    onClick={() => sendReminder(payment, 'whatsapp')}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sendReminder(payment, 'email')}
                  >
                    Email
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default PaymentReminders;