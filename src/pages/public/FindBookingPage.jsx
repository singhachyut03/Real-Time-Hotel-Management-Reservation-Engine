import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import InvoiceModal from '../../components/billing/InvoiceModal';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { formatCurrency, formatShortDate } from '../../utils/formatters';
import { Search, CalendarCheck, Receipt, User, ArrowRight } from 'lucide-react';

export const FindBookingPage = () => {
  const { reservations } = useHotel();
  const [searchId, setSearchId] = useState('STY4821');
  const [activeInvoice, setActiveInvoice] = useState(null);

  const matchedReservation = reservations.find(
    r => r.id.toLowerCase() === searchId.trim().toLowerCase().replace('#', '')
  );

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-txt-main">Find Your Reservation</h1>
          <p className="text-sm text-txt-secondary">
            Enter your booking ID or reservation number to view your stay details and download invoices.
          </p>
        </div>

        {/* Search Input Card */}
        <div className="bg-bg-card border border-border-dark rounded-xl p-6 shadow-card max-w-lg mx-auto">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. STY4821"
                className="w-full pl-9 pr-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-sm text-txt-main focus:border-brand-blue focus:outline-none"
              />
            </div>
            <Button variant="primary" size="md">
              Search
            </Button>
          </div>
          <p className="text-[11px] text-txt-muted mt-2 text-center">
            Demo numbers: #STY4821, #STY4822, #STY4823, #STY4824
          </p>
        </div>

        {/* Matched Result Card */}
        {matchedReservation ? (
          <div className="bg-bg-card border border-border-dark rounded-xl p-6 shadow-card space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-dark">
              <div>
                <span className="text-xs font-mono text-brand-cyan font-bold">#{matchedReservation.id}</span>
                <h3 className="text-lg font-bold text-txt-main">{matchedReservation.roomType} (Room {matchedReservation.roomNumber})</h3>
              </div>
              <Badge status={matchedReservation.status} size="sm" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-txt-muted block">Guest Name</span>
                <span className="font-semibold text-txt-main">{matchedReservation.guestName}</span>
              </div>
              <div>
                <span className="text-txt-muted block">Check-in Date</span>
                <span className="font-semibold text-txt-main">{formatShortDate(matchedReservation.checkIn)} (2 PM)</span>
              </div>
              <div>
                <span className="text-txt-muted block">Check-out Date</span>
                <span className="font-semibold text-txt-main">{formatShortDate(matchedReservation.checkOut)} (11 AM)</span>
              </div>
              <div>
                <span className="text-txt-muted block">Total Paid</span>
                <span className="font-semibold text-emerald-400">{formatCurrency(matchedReservation.totalAmount)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border-dark flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={Receipt}
                onClick={() => setActiveInvoice(matchedReservation)}
              >
                View & Print Invoice
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-txt-muted text-xs">
            No reservation found for "{searchId}". Please check your reservation ID.
          </div>
        )}
      </main>

      {/* INVOICE MODAL */}
      {activeInvoice && (
        <InvoiceModal
          isOpen={!!activeInvoice}
          onClose={() => setActiveInvoice(null)}
          reservation={activeInvoice}
        />
      )}

      <PublicFooter />
    </div>
  );
};

export default FindBookingPage;
