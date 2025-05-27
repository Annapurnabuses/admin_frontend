import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useMobile } from '../../hooks/useMobile.js'
import { useApp } from '../../context/AppContext';

const Layout = ({ children, currentPage, setCurrentPage }) => {
  const isMobile = useMobile();
  const { sidebarOpen } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {!isMobile && (
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      
      <main className={`
        transition-all duration-300
        ${!isMobile ? (sidebarOpen ? 'ml-64' : 'ml-16') : 'ml-0'}
        pt-16
      `}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>

      {isMobile && (
        <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};

export default Layout;