import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency, formatShortDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Drawer from '../../components/common/Drawer';
import EmptyState from '../../components/common/EmptyState';
import InvoiceModal from '../../components/billing/InvoiceModal';
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  BedDouble,
  Receipt,
  UserPlus,
  Star,
  FileText,
  Heart
} from 'lucide-react';

export const GuestsPage = () => {
  const { guests, reservations } = useHotel();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [activeInvoice, setActiveInvoice] = useState(null);

  const filteredGuests = useMemo(() => {
    if (!searchQuery.trim()) return guests;
    const q = searchQuery.toLowerCase();
    return guests.filter(g =>
      g.name.toLowerCase().includes(q) ||
      g.email.toLowerCase().includes(q) ||
      g.phone.includes(q) ||
      (g.currentRoom && g.currentRoom.includes(q))
    );
  }, [guests, searchQuery]);

  // Guest stay history from reservations
  const guestReservations = useMemo(() => {
    if (!selectedGuest) return [];
    return reservations.filter(r =>
      r.guestId === selectedGuest.id ||
      r.guestEmail?.toLowerCase() === selectedGuest.email?.toLowerCase()
    );
  }, [selectedGuest, reservations]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-txt-main flex items-center gap-2">
            Guest Profiles (CRM)
            <span className="text-xs font-semibold text-brand-cyan bg-brand-cyanMuted px-2.5 py-0.5 rounded-full border border-brand-cyan/30">
              {filteredGuests.length} Guests
            </span>
          </h1>
          <p className="text-xs text-txt-secondary mt-1">
            Maintain guest relationships, VIP statuses, lifetime spend, preferences, and complete reservation records.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-bg-card border border-border-dark rounded-xl p-4 shadow-card flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guests by name, email, phone, room..."
            className="w-full pl-9 pr-4 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
          />
        </div>
      </div>

      {/* GUEST CARDS GRID */}
      {filteredGuests.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No guests found"
          description="No guest records match your search criteria."
          actionLabel="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGuests.map(guest => (
            <div
              key={guest.id}
              onClick={() => setSelectedGuest(guest)}
              className="bg-bg-card border border-border-dark hover:border-brand-blue/40 rounded-xl p-5 shadow-card hover:shadow-glow-blue transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Avatar & Name */}
                <div className="flex items-start gap-3.5 mb-4">
                  <img
                    src={guest.avatar}
                    alt={guest.name}
                    className="w-12 h-12 rounded-xl object-cover border border-border-dark group-hover:border-brand-blue transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-txt-main truncate group-hover:text-brand-blue transition-colors">
                        {guest.name}
                      </h3>
                      {guest.vipStatus && (
                        <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full shrink-0">
                          {guest.vipStatus}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-txt-muted truncate mt-0.5">
                      <Mail className="w-3 h-3 shrink-0" />
                      <span className="truncate">{guest.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-txt-muted truncate mt-0.5">
                      <Phone className="w-3 h-3 shrink-0" />
                      <span>{guest.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-border-dark/60 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-txt-muted uppercase block">Stays</span>
                    <span className="font-bold text-txt-main">{guest.totalStays}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-txt-muted uppercase block">Last Stay</span>
                    <span className="font-bold text-txt-main">{formatShortDate(guest.lastStay)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-txt-muted uppercase block">Total Spent</span>
                    <span className="font-bold text-brand-cyan">{formatCurrency(guest.totalSpent)}</span>
                  </div>
                </div>

                {/* Current Room Pill if active */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-txt-muted">Current Room:</span>
                  {guest.currentRoom ? (
                    <span className="font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Room {guest.currentRoom} (In-House)
                    </span>
                  ) : (
                    <span className="text-txt-muted italic">Checked out</span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border-dark flex justify-end">
                <Button variant="ghost" size="sm" className="text-xs">
                  View Full Profile →
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GUEST PROFILE DRAWER */}
      {selectedGuest && (
        <Drawer
          isOpen={!!selectedGuest}
          onClose={() => setSelectedGuest(null)}
          title={selectedGuest.name}
          subtitle={`Guest ID: ${selectedGuest.id}`}
          footer={
            <Button variant="secondary" size="sm" onClick={() => setSelectedGuest(null)}>
              Close Profile
            </Button>
          }
        >
          <div className="space-y-6">
            {/* Header Avatar card */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark flex items-center gap-4">
              <img
                src={selectedGuest.avatar}
                alt={selectedGuest.name}
                className="w-16 h-16 rounded-xl object-cover border border-border-dark"
              />
              <div>
                <h3 className="text-base font-bold text-txt-main">{selectedGuest.name}</h3>
                <p className="text-xs text-brand-cyan font-semibold">{selectedGuest.vipStatus || 'Standard Member'}</p>
                <p className="text-xs text-txt-muted mt-1">{selectedGuest.email}</p>
                <p className="text-xs text-txt-muted">{selectedGuest.phone}</p>
              </div>
            </div>

            {/* Lifetime Summary */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-bg-card border border-border-dark rounded-xl">
                <span className="text-[10px] text-txt-muted uppercase block">Lifetime Spending</span>
                <span className="text-base font-extrabold text-brand-cyan">{formatCurrency(selectedGuest.totalSpent)}</span>
              </div>
              <div className="p-3 bg-bg-card border border-border-dark rounded-xl">
                <span className="text-[10px] text-txt-muted uppercase block">Total Visits</span>
                <span className="text-base font-extrabold text-txt-main">{selectedGuest.totalStays} Stays</span>
              </div>
            </div>

            {/* Guest Preferences */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-2 text-xs">
              <div className="flex items-center gap-2 text-brand-blue font-bold uppercase text-[10px]">
                <Heart className="w-3.5 h-3.5" />
                <span>Guest Preferences</span>
              </div>
              <p className="text-txt-secondary leading-relaxed">
                {selectedGuest.preferences || 'Standard floor preference, non-smoking.'}
              </p>
            </div>

            {/* Notes */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-[10px]">
                <FileText className="w-3.5 h-3.5" />
                <span>Concierge & Internal Notes</span>
              </div>
              <p className="text-txt-secondary leading-relaxed">
                {selectedGuest.notes || 'No special notes recorded.'}
              </p>
            </div>

            {/* Stay History / Reservations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-txt-muted uppercase tracking-wider">
                Stay History & Billing Records
              </h4>

              {guestReservations.length === 0 ? (
                <p className="text-xs text-txt-muted">No reservations found in current log.</p>
              ) : (
                <div className="space-y-2.5">
                  {guestReservations.map(r => (
                    <div
                      key={r.id}
                      className="p-3 rounded-lg bg-bg-card border border-border-dark text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-brand-cyan">#{r.id}</span>
                          <span className="font-semibold text-txt-main">Room {r.roomNumber}</span>
                        </div>
                        <p className="text-[11px] text-txt-muted mt-0.5">
                          {formatShortDate(r.checkIn)} – {formatShortDate(r.checkOut)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-txt-main block">{formatCurrency(r.totalAmount)}</span>
                        <button
                          onClick={() => setActiveInvoice(r)}
                          className="text-[11px] text-brand-cyan hover:underline inline-flex items-center gap-1 mt-0.5"
                        >
                          <Receipt className="w-3 h-3" />
                          <span>Invoice</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Drawer>
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

export default GuestsPage;
