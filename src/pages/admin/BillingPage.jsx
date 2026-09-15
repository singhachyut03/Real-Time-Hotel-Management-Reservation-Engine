import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency, formatShortDate, formatCompactCurrency } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import InvoiceModal from '../../components/billing/InvoiceModal';
import {
  Receipt,
  Search,
  Printer,
  Download,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CreditCard,
  FileText
} from 'lucide-react';

export const BillingPage = () => {
  const { reservations, updatePaymentStatus } = useHotel();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [paymentFilter, setPaymentFilter] = useState('All');

  const filteredReservations = useMemo(() => {
    return reservations.filter(res => {
      if (paymentFilter === 'Paid' && res.paymentStatus !== 'Paid') return false;
      if (paymentFilter === 'Pending' && res.paymentStatus !== 'Pending') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          res.id.toLowerCase().includes(q) ||
          res.guestName.toLowerCase().includes(q) ||
          String(res.roomNumber).includes(q)
        );
      }
      return true;
    });
  }, [reservations, paymentFilter, searchQuery]);

  // Aggregate stats
  const totalRevenue = reservations
    .filter(r => r.paymentStatus === 'Paid')
    .reduce((acc, r) => acc + (r.totalAmount || 0), 0);

  const pendingRevenue = reservations
    .filter(r => r.paymentStatus === 'Pending')
    .reduce((acc, r) => acc + (r.totalAmount || 0), 0);

  const totalGst = reservations
    .reduce((acc, r) => acc + (r.taxAmount || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-txt-main flex items-center gap-2">
            Revenue & Invoicing
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Finance Hub
            </span>
          </h1>
          <p className="text-xs text-txt-secondary mt-1">
            Consolidated hotel receipts, payment statuses, GST tax documentation, and printable guest invoices.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-bg-card border border-border-dark p-5 rounded-xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-txt-muted uppercase tracking-wider block mb-1">
              Collected Revenue
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {formatCurrency(totalRevenue)}
            </span>
            <span className="text-[11px] text-txt-muted block mt-1">Settled payments</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-bg-card border border-border-dark p-5 rounded-xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-txt-muted uppercase tracking-wider block mb-1">
              Pending Collections
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
              {formatCurrency(pendingRevenue)}
            </span>
            <span className="text-[11px] text-txt-muted block mt-1">Pay at check-in / check-out</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-bg-card border border-border-dark p-5 rounded-xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-txt-muted uppercase tracking-wider block mb-1">
              Total GST Accrued
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-cyan">
              {formatCurrency(totalGst)}
            </span>
            <span className="text-[11px] text-txt-muted block mt-1">18% GST statutory filing</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
            <Receipt className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-bg-card border border-border-dark rounded-xl p-4 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoice by ID, guest, room..."
            className="w-full pl-9 pr-4 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['All', 'Paid', 'Pending'].map(tab => (
            <button
              key={tab}
              onClick={() => setPaymentFilter(tab)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                paymentFilter === tab
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-bg-secondary text-txt-secondary hover:text-txt-main hover:bg-bg-hover border border-border-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* INVOICE REGISTRY TABLE */}
      {filteredReservations.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No invoice records found"
          description="Try adjusting your filter or searching for a different reservation ID."
          actionLabel="Clear Filters"
          onAction={() => {
            setPaymentFilter('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="bg-bg-card border border-border-dark rounded-xl overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-bg-secondary/70 border-b border-border-dark text-txt-muted uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Invoice #</th>
                  <th className="px-5 py-3.5 font-bold">Guest</th>
                  <th className="px-5 py-3.5 font-bold">Room</th>
                  <th className="px-5 py-3.5 font-bold">Stay Dates</th>
                  <th className="px-5 py-3.5 font-bold">Payment Method</th>
                  <th className="px-5 py-3.5 font-bold">Status</th>
                  <th className="px-5 py-3.5 font-bold">Total Amount</th>
                  <th className="px-5 py-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark/60">
                {filteredReservations.map(res => (
                  <tr key={res.id} className="hover:bg-bg-secondary/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-brand-cyan">
                      #{res.id}
                    </td>
                    <td className="px-5 py-4 font-bold text-txt-main">
                      {res.guestName}
                    </td>
                    <td className="px-5 py-4 text-txt-secondary">
                      Room {res.roomNumber} ({res.roomType})
                    </td>
                    <td className="px-5 py-4 text-txt-secondary">
                      {formatShortDate(res.checkIn)} – {formatShortDate(res.checkOut)}
                    </td>
                    <td className="px-5 py-4 text-txt-muted">
                      {res.paymentMethod || 'Credit Card'}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        res.paymentStatus === 'Paid'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}>
                        {res.paymentStatus || 'Pending'}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-extrabold text-txt-main">
                      {formatCurrency(res.totalAmount)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {res.paymentStatus === 'Pending' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => updatePaymentStatus(res.id, 'Paid')}
                          >
                            Mark Paid
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Printer}
                          onClick={() => setActiveInvoice(res)}
                        >
                          Invoice
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INVOICE MODAL */}
      {activeInvoice && (
        <InvoiceModal
          isOpen={!!activeInvoice}
          onClose={() => setActiveInvoice(null)}
          reservation={activeInvoice}
        />
      )}
    </div>
  );
};

export default BillingPage;
