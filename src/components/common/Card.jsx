import React from 'react';

const Card = ({ 
  children, 
  className = '',
  padding = true,
  hover = false,
  onClick
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200
        ${hover ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;