import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, LayoutDashboard, Menu, X, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export const PublicNavbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Reservations', path: '/my-bookings' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 glass-nav border-b border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-cyan-400 flex items-center justify-center shadow-glow-blue">
            <Building2 className="w-5 h-5 text-bg-primary stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-wider text-txt-main flex items-center gap-1">
              STAY<span className="text-brand-cyan">OPS</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-txt-muted block -mt-1 font-semibold">
              Grand & Suites
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-brand-cyan bg-brand-cyanMuted'
                  : 'text-txt-secondary hover:text-txt-main hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-txt-secondary hover:text-txt-main px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            Login
          </Link>
          <Link to="/dashboard">
            <Button
              variant="primary"
              size="sm"
              icon={LayoutDashboard}
              iconRight={ArrowRight}
            >
              Open Dashboard
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Link to="/dashboard">
            <Button variant="primary" size="sm" icon={LayoutDashboard}>
              Dashboard
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-txt-secondary hover:text-txt-main rounded-lg hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-dark bg-bg-secondary px-4 pt-2 pb-6 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'text-brand-cyan bg-brand-cyanMuted'
                  : 'text-txt-secondary hover:text-txt-main'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border-dark flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 text-sm text-txt-secondary hover:text-txt-main"
            >
              Login
            </Link>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full" icon={LayoutDashboard}>
                Open Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
