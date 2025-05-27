import React, { useState } from 'react';
import BookingList from '../components/bookings/BookingList';
import BookingDetails from '../components/bookings/BookingDetails';
import BookingForm from '../components/bookings/BookingForm';
import { Plus } from 'lucide-react';
import Button from '../components/common/Button';

const BookingsPage = () => {
  const [view, setView] = useState('list');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking);
    setView('details');
  };

  const handleEdit = () => {
    setView('form');
  };

  const handleSave = (formData) => {
    console.log('Save booking:', formData);
    setView('list');
    setSelectedBooking(null);
  };

  const handleBack = () => {
    setView('list');
    setSelectedBooking(null);
  };

  return (
    <div>
      {view === 'list' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            <Button
              icon={Plus}
              onClick={() => setView('form')}
            >
              New Booking
            </Button>
          </div>
          <BookingList onSelectBooking={handleSelectBooking} />
        </div>
      )}

      {view === 'details' && selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onBack={handleBack}
          onEdit={handleEdit}
        />
      )}

      {view === 'form' && (
        <BookingForm
          booking={selectedBooking}
          onSave={handleSave}
          onCancel={handleBack}
        />
      )}
    </div>
  );
};

export default BookingsPage;