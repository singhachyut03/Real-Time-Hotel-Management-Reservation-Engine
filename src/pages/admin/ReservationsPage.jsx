import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency, formatShortDate } from '../../utils/formatters';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Drawer from '../../components/common/Drawer';
import EmptyState from '../../components/common/EmptyState';
import InvoiceModal from '../../components/billing/InvoiceModal';
import {
  CalendarCheck,
  Search,
  Plus,
  Receipt,
  UserCheck,
  UserX,
  XCircle,
  Eye,
  Filter,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReservationsPage = () => {
  const {
    reservations,
    checkInGuest,
    checkOutGuest,
    updatePaymentStatus,
    addToast
  } = useHotel();

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [invoiceReservation, setInvoiceReservation] = useState(null);

  const filters = ['All', 'Today', 'Upcoming', 'Checked-in', 'Completed', 'Cancelled'];

  const filteredReservations = useMemo(() => {
    return reservations.filter(res => {
      // Filter tab
      if (activeFilter === 'Checked-in' && res.status !== 'Checked-in') return false;
      if (activeFilter === 'Upcoming' && res.status !== 'Confirmed') return false;
      if (activeFilter === 'Completed' && res.status !== 'Completed') return false;
      if (activeFilter === 'Cancelled' && res.status !== 'Cancelled') return false;
      if (activeFilter === 'Today') {
        const todayStr = new Date().toISOString().split('T')[0];
        if (res.checkIn !== todayStr && res.checkOut !== todayStr) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = res.id.toLowerCase().includes(q);
        const matchName = res.guestName.toLowerCase().includes(q);
        const matchRoom = String(res.roomNumber).includes(q);
        const matchEmail = res.guestEmail?.toLowerCase().includes(q);
        if (!matchId && !matchName && !matchRoom && !matchEmail) return false;
      }

      return true;
    });
  }, [reservations, activeFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-txt-main flex items-center gap-2">
            Reservations Management
            <span className="text-xs font-semibold text-brand-cyan bg-brand-cyanMuted px-2.5 py-0.5 rounded-full border border-brand-cyan/30">
              {filteredReservations.length} Bookings
            </span>
          </h1>
          <p className="text-xs text-txt-secondary mt-1">
            Track guest arrivals, process seamless check-ins, manage stays, and generate billing invoices.
          </p>
        </div>

        <Link to="/rooms">
          <Button variant="primary" size="md" icon={Plus}>
            New Reservation
          </Button>
        </Link>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-bg-card border border-border-dark rounded-xl p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, guest name, room number or email..."
            className="w-full pl-9 pr-4 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                activeFilter === f
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-bg-secondary text-txt-secondary hover:text-txt-main hover:bg-bg-hover border border-border-dark'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* RESERVATIONS TABLE */}
      {filteredReservations.length === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title="No reservations found"
          description="No bookings match your current search query or selected filter tab."
          actionLabel="Clear Filters"
          onAction={() => {
            setActiveFilter('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="bg-bg-card border border-border-dark rounded-xl overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-bg-secondary/70 border-b border-border-dark text-txt-muted uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Reservation ID</th>
                  <th className="px-5 py-3.5 font-bold">Guest</th>
                  <th className="px-5 py-3.5 font-bold">Room</th>
                  <th className="px-5 py-3.5 font-bold">Check-in</th>
                  <th className="px-5 py-3.5 font-bold">Check-out</th>
                  <th className="px-5 py-3.5 font-bold">Status</th>
                  <th className="px-5 py-3.5 font-bold">Payment</th>
                  <th className="px-5 py-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark/60">
                {filteredReservations.map(res => (
                  <tr
                    key={res.id}
                    className="hover:bg-bg-secondary/40 transition-colors cursor-pointer group"
                    onClick={() => setSelectedReservation(res)}
                  >
                    <td className="px-5 py-4 font-mono font-bold text-brand-cyan">
                      #{res.id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-txt-main group-hover:text-brand-blue transition-colors">
                        {res.guestName}
                      </div>
                      <div className="text-[11px] text-txt-muted truncate max-w-[140px]">
                        {res.guestEmail}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-txt-main">Room {res.roomNumber}</div>
                      <div className="text-[11px] text-txt-muted">{res.roomType}</div>
                    </td>
                    <td className="px-5 py-4 text-txt-secondary font-medium">
                      {formatShortDate(res.checkIn)}
                    </td>
                    <td className="px-5 py-4 text-txt-secondary font-medium">
                      {formatShortDate(res.checkOut)}
                    </td>
                    <td className="px-5 py-4">
                      <Badge status={res.status} size="xs" />
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
                    <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {res.status === 'Confirmed' && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => checkInGuest(res.id)}
                            title="Check-in guest"
                          >
                            Check-in
                          </Button>
                        )}

                        {res.status === 'Checked-in' && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => checkOutGuest(res.id)}
                            title="Check-out guest"
                          >
                            Check-out
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Eye}
                          onClick={() => setSelectedReservation(res)}
                          title="View Details"
                        />

                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Receipt}
                          onClick={() => setInvoiceReservation(res)}
                          title="View Tax Invoice"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RIGHT-SIDE RESERVATION DETAILS DRAWER */}
      {selectedReservation && (
        <Drawer
          isOpen={!!selectedReservation}
          onClose={() => setSelectedReservation(null)}
          title={`Reservation #${selectedReservation.id}`}
          subtitle={`Created on ${formatShortDate(selectedReservation.createdAt || selectedReservation.checkIn)}`}
          footer={
            <div className="flex items-center gap-2">
              {selectedReservation.status === 'Confirmed' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    checkInGuest(selectedReservation.id);
                    setSelectedReservation({ ...selectedReservation, status: 'Checked-in' });
                  }}
                >
                  Check In Guest
                </Button>
              )}
              {selectedReservation.status === 'Checked-in' && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    checkOutGuest(selectedReservation.id);
                    setSelectedReservation({ ...selectedReservation, status: 'Completed' });
                  }}
                >
                  Check Out Guest
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                icon={Receipt}
                onClick={() => setInvoiceReservation(selectedReservation)}
              >
                Invoice
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setSelectedReservation(null)}>
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Status overview */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-txt-muted uppercase">Booking Status</span>
                <div className="mt-1">
                  <Badge status={selectedReservation.status} size="sm" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-semibold text-txt-muted uppercase">Payment</span>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                    selectedReservation.paymentStatus === 'Paid'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {selectedReservation.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Guest Info */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-3">
              <h3 className="text-xs font-bold text-txt-muted uppercase tracking-wider">Guest Information</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-txt-main font-bold">
                  <User className="w-4 h-4 text-brand-blue" />
                  <span>{selectedReservation.guestName}</span>
                </div>
                <div className="flex items-center gap-2.5 text-txt-secondary">
                  <Mail className="w-4 h-4 text-brand-blue" />
                  <span>{selectedReservation.guestEmail}</span>
                </div>
                <div className="flex items-center gap-2.5 text-txt-secondary">
                  <Phone className="w-4 h-4 text-brand-blue" />
                  <span>{selectedReservation.guestPhone}</span>
                </div>
              </div>
            </div>

            {/* Room & Dates */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-3">
              <h3 className="text-xs font-bold text-txt-muted uppercase tracking-wider">Stay Schedule</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-txt-muted block text-[10px]">ROOM ASSIGNED</span>
                  <span className="font-bold text-txt-main">Room {selectedReservation.roomNumber}</span>
                  <span className="text-txt-secondary block text-[11px]">{selectedReservation.roomType}</span>
                </div>
                <div>
                  <span className="text-txt-muted block text-[10px]">OCCUPANCY</span>
                  <span className="font-bold text-txt-main">{selectedReservation.guestsCount || 2} Adults</span>
                </div>
                <div>
                  <span className="text-txt-muted block text-[10px]">CHECK-IN</span>
                  <span className="font-bold text-txt-main">{formatShortDate(selectedReservation.checkIn)} (2:00 PM)</span>
                </div>
                <div>
                  <span className="text-txt-muted block text-[10px]">CHECK-OUT</span>
                  <span className="font-bold text-txt-main">{formatShortDate(selectedReservation.checkOut)} (11:00 AM)</span>
                </div>
              </div>
            </div>

            {/* Billing breakdown */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-2.5 text-xs">
              <h3 className="text-xs font-bold text-txt-muted uppercase tracking-wider">Payment Breakdown</h3>
              <div className="flex justify-between text-txt-secondary">
                <span>Room Charges</span>
                <span>{formatCurrency(selectedReservation.roomCharges)}</span>
              </div>
              {selectedReservation.addOns && selectedReservation.addOns.map((ad, idx) => (
                <div key={idx} className="flex justify-between text-txt-secondary">
                  <span>{ad.name}</span>
                  <span>+{formatCurrency(ad.cost)}</span>
                </div>
              ))}
              <div className="flex justify-between text-txt-secondary">
                <span>Taxes & GST</span>
                <span>{formatCurrency(selectedReservation.taxAmount)}</span>
              </div>
              <div className="pt-2 border-t border-border-dark flex justify-between font-bold text-txt-main">
                <span>Total Amount</span>
                <span className="text-brand-cyan">{formatCurrency(selectedReservation.totalAmount)}</span>
              </div>
            </div>

            {selectedReservation.specialRequests && (
              <div className="p-3 bg-bg-card rounded-lg border border-border-dark text-xs">
                <span className="text-txt-muted block text-[10px] font-semibold uppercase mb-1">Special Requests:</span>
                <p className="text-txt-secondary">{selectedReservation.specialRequests}</p>
              </div>
            )}
          </div>
        </Drawer>
      )}

      {/* INVOICE MODAL */}
      {invoiceReservation && (
        <InvoiceModal
          isOpen={!!invoiceReservation}
          onClose={() => setInvoiceReservation(null)}
          reservation={invoiceReservation}
        />
      )}
    </div>
  );
};

export default ReservationsPage;
