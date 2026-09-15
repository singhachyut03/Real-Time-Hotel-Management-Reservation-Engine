import React from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency } from '../../utils/formatters';
import Button from '../../components/common/Button';
import {
  TrendingUp,
  AlertTriangle,
  Sparkles,
  BedDouble,
  CreditCard,
  Wrench,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export const SmartInsightsPage = () => {
  const { rooms, reservations, metrics } = useHotel();

  // Rule-based insights calculation
  const pendingReservations = reservations.filter(r => r.paymentStatus === 'Pending');
  const cleaningCount = rooms.filter(r => r.status === 'Cleaning').length;
  const maintenanceCount = rooms.filter(r => r.status === 'Maintenance').length;
  const unavailableTotal = cleaningCount + maintenanceCount;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-txt-main flex items-center gap-2">
            Smart Operations Insights
            <span className="text-xs font-semibold text-brand-cyan bg-brand-cyanMuted px-2.5 py-0.5 rounded-full border border-brand-cyan/30">
              Rule-Based Intelligence
            </span>
          </h1>
          <p className="text-xs text-txt-secondary mt-1">
            Actionable automated advisories derived from live occupancy, maintenance logs, and financial balances.
          </p>
        </div>
      </div>

      {/* INSIGHT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insight 1: High Demand & Dynamic Pricing */}
        <div className="p-6 rounded-xl bg-bg-card border border-border-dark hover:border-brand-blue/40 shadow-card hover:shadow-glow-blue transition-all flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyanMuted px-2 py-0.5 rounded border border-brand-cyan/30">
                Revenue & Demand
              </span>
              <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-txt-main">HIGH DEMAND SURGE</h3>
            <p className="text-sm text-txt-secondary mt-2 leading-relaxed">
              Weekend occupancy is currently high at <span className="text-brand-cyan font-bold">{Math.round(metrics.occupancyRate * 100)}%</span> across 50 rooms. Demand multipliers are actively driving ADR (Average Daily Rate).
            </p>

            <div className="mt-4 p-3 rounded-lg bg-bg-secondary border border-border-dark text-xs space-y-1">
              <span className="font-bold text-txt-main block">Suggested Action:</span>
              <p className="text-txt-secondary">
                Review Deluxe & Executive room pricing caps (+15% weekend modifier already active). Consider lifting minimum stay duration to 2 nights for upcoming weekend.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-border-dark flex justify-end">
            <Link to="/settings">
              <Button variant="outline" size="sm" iconRight={ArrowRight}>
                Configure Pricing Engine
              </Button>
            </Link>
          </div>
        </div>

        {/* Insight 2: Room Availability */}
        <div className="p-6 rounded-xl bg-bg-card border border-border-dark hover:border-brand-blue/40 shadow-card hover:shadow-glow-blue transition-all flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Turnover Bottleneck
              </span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <BedDouble className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-txt-main">ROOM AVAILABILITY ALERT</h3>
            <p className="text-sm text-txt-secondary mt-2 leading-relaxed">
              <span className="text-amber-400 font-bold">{unavailableTotal} rooms</span> are currently unavailable for new bookings ({maintenanceCount} in Maintenance, {cleaningCount} in Housekeeping turnover).
            </p>

            <div className="mt-4 p-3 rounded-lg bg-bg-secondary border border-border-dark text-xs space-y-1">
              <span className="font-bold text-txt-main block">Suggested Action:</span>
              <p className="text-txt-secondary">
                Prioritize Housekeeping inspection queue before 2:00 PM check-in window to release {cleaningCount} sanitized suites into available inventory.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-border-dark flex justify-end">
            <Link to="/housekeeping">
              <Button variant="outline" size="sm" iconRight={ArrowRight}>
                Open Housekeeping Board
              </Button>
            </Link>
          </div>
        </div>

        {/* Insight 3: Payment Alert */}
        <div className="p-6 rounded-xl bg-bg-card border border-border-dark hover:border-brand-blue/40 shadow-card hover:shadow-glow-blue transition-all flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Accounts Receivable
              </span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-txt-main">PAYMENT ALERT</h3>
            <p className="text-sm text-txt-secondary mt-2 leading-relaxed">
              <span className="text-purple-400 font-bold">{pendingReservations.length} reservations</span> have pending payments awaiting settlement at the reception desk.
            </p>

            <div className="mt-4 p-3 rounded-lg bg-bg-secondary border border-border-dark text-xs space-y-1">
              <span className="font-bold text-txt-main block">Suggested Action:</span>
              <p className="text-txt-secondary">
                Notify front desk reception to collect outstanding dues during guest check-in / check-out verification.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-border-dark flex justify-end">
            <Link to="/billing">
              <Button variant="outline" size="sm" iconRight={ArrowRight}>
                View Pending Receivables
              </Button>
            </Link>
          </div>
        </div>

        {/* Insight 4: Maintenance Alert */}
        <div className="p-6 rounded-xl bg-bg-card border border-border-dark hover:border-brand-blue/40 shadow-card hover:shadow-glow-blue transition-all flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Engineering Lock
              </span>
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                <Wrench className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-txt-main">MAINTENANCE ALERT</h3>
            <p className="text-sm text-txt-secondary mt-2 leading-relaxed">
              <span className="text-rose-400 font-bold">Room 204</span> has been unavailable for 2 days due to an HVAC compressor malfunction.
            </p>

            <div className="mt-4 p-3 rounded-lg bg-bg-secondary border border-border-dark text-xs space-y-1">
              <span className="font-bold text-txt-main block">Suggested Action:</span>
              <p className="text-txt-secondary">
                Follow up with HVAC contractor for capacitor replacement to minimize opportunity cost on prime Deluxe inventory.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-border-dark flex justify-end">
            <Link to="/maintenance">
              <Button variant="outline" size="sm" iconRight={ArrowRight}>
                View Work Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartInsightsPage;
