import React, { useState } from 'react';
import { Search, Filter, MessageSquare, Phone, Clock } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Badge from '../common/Badge';
import ChatWindow from './ChatWindow';

const ChatSupport = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const chats = [
    {
      id: 1,
      customer: {
        name: 'Raj Kumar',
        phone: '+91 98765 43210',
        avatar: null
      },
      lastMessage: 'When will the bus arrive?',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      status: 'active',
      bookingId: 'BK-2024-001'
    },
    {
      id: 2,
      customer: {
        name: 'Priya Sharma',
        phone: '+91 98765 43211',
        avatar: null
      },
      lastMessage: 'Thank you for the quick response',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      status: 'resolved',
      bookingId: 'BK-2024-002'
    },
    {
      id: 3,
      customer: {
        name: 'Amit Patel',
        phone: '+91 98765 43212',
        avatar: null
      },
      lastMessage: 'Can I change the pickup location?',
      lastMessageTime: '2 hours ago',
      unreadCount: 1,
      status: 'pending',
      bookingId: 'BK-2024-008'
    }
  ];

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.customer.phone.includes(searchQuery) ||
                         chat.bookingId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || chat.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Chat List */}
      <div className="w-full md:w-96 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Chat Support</h2>
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search size={20} className="text-gray-400" />}
            containerClassName="mb-3"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Chats</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedChat?.id === chat.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={20} className="text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4 className="font-medium text-gray-900 truncate">
                        {chat.customer.name}
                      </h4>
                      <p className="text-xs text-gray-500">{chat.bookingId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{chat.lastMessageTime}</p>
                      {chat.unreadCount > 0 && (
                        <Badge variant="danger" size="xs" className="mt-1">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        chat.status === 'active' ? 'success' :
                        chat.status === 'pending' ? 'warning' :
                        'default'
                      }
                      size="xs"
                    >
                      {chat.status}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Phone size={12} />
                      {chat.customer.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 hidden md:flex">
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onClose={() => setSelectedChat(null)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSupport;