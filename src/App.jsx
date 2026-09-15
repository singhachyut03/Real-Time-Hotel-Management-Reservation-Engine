import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HotelProvider } from './context/HotelContext';

// Public Portal Pages
import LandingPage from './pages/public/LandingPage';
import RoomDiscoveryPage from './pages/public/RoomDiscoveryPage';
import RoomDetailsPage from './pages/public/RoomDetailsPage';
import FindBookingPage from './pages/public/FindBookingPage';
import AboutPage from './pages/public/AboutPage';
import LoginPage from './pages/public/LoginPage';

// Admin Operations Layout & Pages
import AdminLayout from './components/layout/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import ReservationsPage from './pages/admin/ReservationsPage';
import RoomsManagementPage from './pages/admin/RoomsManagementPage';
import GuestsPage from './pages/admin/GuestsPage';
import HousekeepingPage from './pages/admin/HousekeepingPage';
import MaintenancePage from './pages/admin/MaintenancePage';
import BillingPage from './pages/admin/BillingPage';
import SmartInsightsPage from './pages/admin/SmartInsightsPage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  return (
    <HotelProvider>
      <Routes>
        {/* Public Hotel Guest Portal */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/rooms" element={<RoomDiscoveryPage />} />
        <Route path="/rooms/:id" element={<RoomDetailsPage />} />
        <Route path="/my-bookings" element={<FindBookingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Hotel Operations & Admin Workspace */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/rooms-management" element={<RoomsManagementPage />} />
          <Route path="/guests" element={<GuestsPage />} />
          <Route path="/housekeeping" element={<HousekeepingPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/insights" element={<SmartInsightsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HotelProvider>
  );
}

export default App;
