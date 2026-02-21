import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import AdminSidebar from './components/AdminSidebar';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BuyDashboard from './pages/BuyDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Portfolio from './pages/Portfolio';
import History from './pages/History';
import Settings from './pages/Settings';

function AppLayout() {
  const location = useLocation();
  const isDashboardArea = ['/dashboard', '/buy', '/portfolio', '/history', '/settings'].includes(location.pathname);
  const isAdminArea = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-[100dvh] bg-bg-deep text-white font-sans selection:bg-primary-purple selection:text-white flex`}>
      {!isAdminArea && (isDashboardArea ? (
        <>
          <Sidebar />
          <MobileNav />
        </>
      ) : <Navbar />)}
      {isAdminArea && <AdminSidebar />}

      <main className={`flex-1 w-full ${isDashboardArea ? 'md:ml-20 pb-20 md:pb-0' : ''} ${isAdminArea ? 'ml-64' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/buy" element={<BuyDashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Future admin routes like /admin/users can go here */}
          </Route>
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
