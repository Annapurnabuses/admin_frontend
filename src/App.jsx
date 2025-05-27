import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import BookingsPage from './pages/BookingsPage';
import VehiclesPage from './pages/VehiclesPage';
import ConsumersPage from './pages/ConsumersPage';
import PaymentsPage from './pages/PaymentsPage';
import ExpensesPage from './pages/ExpensesPage';
import VendorsPage from './pages/VendorsPage';
import TeamPage from './pages/TeamPage';
import RatesPage from './pages/RatesPage';
import ChatPage from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  const [currentPage, setCurrentPage] = React.useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'bookings':
        return <BookingsPage />;
      case 'vehicles':
        return <VehiclesPage />;
      case 'consumers':
        return <ConsumersPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'expenses':
        return <ExpensesPage />;
      case 'vendors':
        return <VendorsPage />;
      case 'team':
        return <TeamPage />;
      case 'rates':
        return <RatesPage />;
      case 'chat':
        return <ChatPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AuthProvider>
      <AppProvider>
        <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
          {renderPage()}
        </Layout>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;