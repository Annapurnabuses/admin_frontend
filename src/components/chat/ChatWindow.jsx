import React, { useState } from 'react';
import { 
  X, Send, Paperclip, Phone, MoreVertical, 
  Check, CheckCheck, Clock 
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

const ChatWindow = ({ chat, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages] = useState([
    {
      id: 1,
      text: 'Hello, I need to know about my booking status',
      sender: 'customer',
      time: '10:00 AM',
      status: 'read'
    },
    {
      id: 2,
      text: 'Hi! Your booking BK-2024-001 is confirmed. The vehicle will arrive at your pickup location by 6:00 AM tomorrow.',
      sender: 'admin',
      time: '10:05 AM',
      status: 'read'
    },
    {
      id: 3,
      text: 'When will the bus arrive?',
      sender: 'customer',
      time: '10:30 AM',
      status: 'delivered'
    }
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Send message:', message);
      setMessage('');
    }
  };

  const getMessageStatus = (status) => {
    switch (status) {
      case 'sent':
        return <Check size={16} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={16} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={16} className="text-blue-600" />;
      default:
        return <Clock size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {chat.customer.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{chat.customer.name}</h3>
              <p className="text-sm text-gray-500">{chat.bookingId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={Phone}>
              Call
            </Button>
            <Button variant="outline" size="sm" icon={MoreVertical} />
            <Button
              variant="outline"
              size="sm"
              icon={X}
              onClick={onClose}
              className="md:hidden"
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                ${msg.sender === 'admin' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-900 border border-gray-200'
                }
              `}>
                <p className="text-sm">{msg.text}</p>
                <div className={`
                  flex items-center justify-end gap-1 mt-1
                  ${msg.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'}
                `}>
                  <span className="text-xs">{msg.time}</span>
                  {msg.sender === 'admin' && getMessageStatus(msg.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={Paperclip}
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            size="sm"
            icon={Send}
            disabled={!message.trim()}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;