import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import Button from '../../components/common/Button';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@stayops.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-bg-card border border-border-dark rounded-2xl p-8 shadow-2xl space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-cyan-400 flex items-center justify-center shadow-glow-blue mx-auto">
              <Building2 className="w-6 h-6 text-bg-primary stroke-[2.5]" />
            </div>
            <h2 className="text-2xl font-extrabold text-txt-main tracking-tight">
              Sign In to StayOps
            </h2>
            <p className="text-xs text-txt-secondary">
              Access the hotel control hub or view your guest reservations.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-bg-secondary border border-border-dark rounded-lg text-sm text-txt-main focus:border-brand-blue focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-bg-secondary border border-border-dark rounded-lg text-sm text-txt-main focus:border-brand-blue focus:outline-none"
                />
              </div>
            </div>

            <Button variant="primary" size="md" className="w-full" type="submit" iconRight={ArrowRight}>
              Sign In to Dashboard
            </Button>
          </form>

          <div className="relative border-t border-border-dark pt-4 text-center">
            <span className="text-[11px] text-txt-muted block mb-3">Quick Demo Access</span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
                onClick={() => navigate('/dashboard')}
              >
                Admin Demo
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => navigate('/my-bookings')}
              >
                Guest Demo
              </Button>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default LoginPage;
