import React from 'react';
import { Calendar, CreditCard, FileText, AlertCircle, ChevronRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const PaymentCard = ({ payment, onClick }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'partial': return 'warning';
      case 'pending': return 'danger';
      case 'overdue': return 'danger';
      default: return 'default';
    }
  };

  const isOverdue = new Date(payment.dueDate) < new Date() && payment.balance > 0;

  return (
    <Card hover onClick={onClick} className="cursor-pointer">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{payment.invoiceNumber}</h3>
              <p className="text-sm text-gray-600">{payment.customerName}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={getStatusVariant(payment.status)}>
                {payment.status}
              </Badge>
              {isOverdue && (
                <Badge variant="danger" size="xs">
                  <AlertCircle size={12} className="mr-1" />
                  Overdue
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <FileText size={16} />
              <span>Booking: {payment.bookingNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} />
              <span>Due: {formatDate(payment.dueDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CreditCard size={16} />
              <span>{payment.paymentMode}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-gray-500">Total Amount</p>
                <p className="font-semibold">{formatCurrency(payment.totalAmount)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Paid</p>
                <p className="font-semibold text-green-600">{formatCurrency(payment.paidAmount)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Balance</p>
                <p className="font-semibold text-red-600">{formatCurrency(payment.balance)}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentCard;