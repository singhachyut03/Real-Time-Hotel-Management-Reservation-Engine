import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Users,
  Sparkles,
  Wrench,
  TrendingUp,
  Receipt,
  Settings,
  Globe,
  Menu,
  X,
  Plus,
  RefreshCw,
  Bell,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import Button from '../common/Button';
import ToastContainer from '../common/ToastContainer';

export const AdminLayout = () => {
  const location = useLocation();
  const { metrics, resetToDemoData, addToast } = useHotel();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  const navigationSections = [
    {
      title: 'OPERATIONS',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Reservations', path: '/reservations', icon: CalendarCheck, badge: metrics.todayCheckIns > 0 ? `${metrics.todayCheckIns}` : null },
        { name: 'Rooms', path: '/rooms-management', icon: BedDouble },
        { name: 'Guests', path: '/guests', icon: Users },
        { name: 'Housekeeping', path: '/housekeeping', icon: Sparkles, badge: metrics.cleaningRooms > 0 ? `${metrics.cleaningRooms}` : null },
      ]
    },
    {
      title: 'BUSINESS',
      items: [
        { name: 'Revenue & Billing', path: '/billing', icon: Receipt },
        { name: 'Maintenance', path: '/maintenance', icon: Wrench, badge: metrics.maintenanceRooms > 0 ? `${metrics.maintenanceRooms}` : null },
        { name: 'Smart Insights', path: '/insights', icon: TrendingUp },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Settings', path: '/settings', icon: Settings },
      ]
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-50 h-screen w-64 bg-bg-secondary border-r border-border-dark flex flex-col transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 border-b border-border-dark flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-cyan-400 flex items-center justify-center shadow-glow-blue">
              <Building2 className="w-5 h-5 text-bg-primary stroke-[2.5]" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-wider text-txt-main flex items-center gap-1">
                STAY<span className="text-brand-cyan">OPS</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-txt-muted block -mt-1 font-semibold">
                Control Hub
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-txt-muted hover:text-txt-main p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live occupancy status ribbon */}
        <div className="px-6 py-3 bg-bg-card/40 border-b border-border-dark flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-txt-secondary font-medium">Hotel Live</span>
          </div>
          <span className="text-brand-cyan font-mono font-semibold">
            {Math.round(metrics.occupancyRate * 100)}% Occ.
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h5 className="px-3 text-[11px] font-bold text-txt-muted uppercase tracking-wider mb-2">
                {section.title}
              </h5>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                        active
                          ? 'bg-brand-blue/15 text-brand-cyan border border-brand-blue/30 shadow-sm'
                          : 'text-txt-secondary hover:text-txt-main hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${active ? 'text-brand-cyan' : 'text-txt-muted'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-brand-blue/20 text-brand-cyan font-semibold border border-brand-blue/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Public Portal Switcher */}
        <div className="p-4 border-t border-border-dark bg-bg-card/30">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg text-xs font-medium text-txt-secondary hover:text-txt-main border border-border-dark hover:border-brand-blue/40 bg-bg-secondary hover:bg-bg-hover transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-brand-blue" />
            <span>Public Hotel Portal</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-bg-secondary/70 backdrop-blur-md border-b border-border-dark px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-txt-secondary hover:text-txt-main rounded-lg hover:bg-white/5"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-base font-semibold text-txt-main flex items-center gap-2">
                Good morning, Admin
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </h1>
              <p className="text-xs text-txt-secondary">
                Here's what's happening across StayOps today.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Reset Demo Data Button */}
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={resetToDemoData}
              title="Reset state to initial realistic demo data"
            >
              <span className="hidden sm:inline">Reset Demo</span>
            </Button>

            {/* Quick Action Trigger */}
            <div className="relative">
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => setQuickActionOpen(!quickActionOpen)}
              >
                <span>Quick Actions</span>
              </Button>

              {quickActionOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-bg-card border border-border-dark rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-txt-muted uppercase tracking-wider">
                    Immediate Operations
                  </div>
                  <Link
                    to="/rooms"
                    onClick={() => setQuickActionOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-txt-main hover:bg-white/5"
                  >
                    <Plus className="w-3.5 h-3.5 text-brand-blue" />
                    <span>+ New Reservation</span>
                  </Link>
                  <Link
                    to="/reservations"
                    onClick={() => setQuickActionOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-txt-main hover:bg-white/5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Check-in Guest</span>
                  </Link>
                  <Link
                    to="/housekeeping"
                    onClick={() => setQuickActionOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-txt-main hover:bg-white/5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Housekeeping Kanban</span>
                  </Link>
                  <Link
                    to="/maintenance"
                    onClick={() => setQuickActionOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-txt-main hover:bg-white/5"
                  >
                    <Wrench className="w-3.5 h-3.5 text-rose-400" />
                    <span>Report Maintenance Issue</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Toasts */}
      <ToastContainer />
    </div>
  );
};

export default AdminLayout;
