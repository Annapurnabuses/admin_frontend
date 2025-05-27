import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'sm',
  dot = false 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    primary: 'bg-blue-600 text-white'
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-sm',
    md: 'px-3 py-1 text-base'
  };
  
  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${variants[variant]} ${sizes[size]}
    `}>
      {dot && (
        <span className={`
          w-2 h-2 mr-1.5 rounded-full
          ${variant === 'success' ? 'bg-green-500' : ''}
          ${variant === 'warning' ? 'bg-yellow-500' : ''}
          ${variant === 'danger' ? 'bg-red-500' : ''}
          ${variant === 'info' ? 'bg-blue-500' : ''}
          ${variant === 'primary' ? 'bg-white' : ''}
          ${variant === 'default' ? 'bg-gray-500' : ''}
        `} />
      )}
      {children}
    </span>
  );
};

export default Badge;