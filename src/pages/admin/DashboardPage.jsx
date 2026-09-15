import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatters';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Drawer from '../../components/common/Drawer';
import Modal from '../../components/common/Modal';
import InvoiceModal from '../../components/billing/InvoiceModal';
import {
  BedDouble,
  TrendingUp,
  LogIn,
  LogOut,
  Plus,
  UserCheck,
  UserX,
  UserPlus,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Sparkles,
  Wrench,
  ArrowRight,
  Filter
} from 'lucide-react';

export const DashboardPage = () => {
  const {
    rooms,
    reservations,
    guests,
    activities,
    metrics,
    checkInGuest,
    checkOutGuest,
    updateRoomStatus,
    reportMaintenanceIssue
  } = useHotel();

  // Selected Room Drawer State
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [quickCheckInModalOpen, setQuickCheckInModalOpen] = useState(false);
  const [quickCheckOutModalOpen, setQuickCheckOutModalOpen] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);

  // Filtered rooms for grid
  const displayedRooms = statusFilter === 'All'
    ? rooms
    : rooms.filter(r => r.status.toLowerCase() === statusFilter.toLowerCase());

  // Attention Needed counts
  const pendingPayments = reservations.filter(r => r.paymentStatus === 'Pending');
  const cleaningQueue = rooms.filter(r => r.status === 'Cleaning');
  const maintenanceRooms = rooms.filter(r => r.status === 'Maintenance');

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* TOP SUMMARY CARDS (No graphs, clean KPI cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Occupancy */}
        <div className="bg-bg-card border border-border-dark p-5 rounded-xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-txt-muted uppercase tracking-wider block mb-1">
              Occupancy
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-brand-cyan">
                {Math.round(metrics.occupancyRate * 100)}%
              </span>
              <span className="text-xs text-txt-secondary">
                ({metrics.occupiedRooms}/{metrics.totalRooms} rooms)
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
            <BedDouble className="w-6 h-6" />
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="bg-bg-card border border-border-dark p-5 rounded-xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-txt-muted uppercase tracking-wider block mb-1">
              Today's Revenue
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-txt-main">
                {formatCompactCurrency(metrics.totalRevenue)}
              </span>
              <span className="text-xs text-emerald-400 font-semibold">
                +14% vs avg
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Check-ins */}
        <div className="bg-bg-card border border-border-dark p-5 rounded-xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-txt-muted uppercase tracking-wider block mb-1">
              Check-ins
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-txt-main">
                18
              </span>
              <span className="text-xs text-txt-secondary">
                ({metrics.todayCheckIns} arriving today)
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
            <LogIn className="w-6 h-6" />
          </div>
        </div>

        {/* Check-outs */}
        <div className="bg-bg-card border border-border-dark p-5 rounded-xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-txt-muted uppercase tracking-wider block mb-1">
              Check-outs
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-txt-main">
                11
              </span>
              <span className="text-xs text-txt-secondary">
                ({metrics.todayCheckOuts} departed)
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <LogOut className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* MIDDLE ROW: ROOM STATUS GRID + ACTIVITY FEED & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ROOM STATUS GRID (8 Cols) */}
        <div className="lg:col-span-8 bg-bg-card border border-border-dark rounded-xl p-6 shadow-card space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-dark">
            <div>
              <h2 className="text-base font-bold text-txt-main uppercase tracking-wider flex items-center gap-2">
                Room Status
                <span className="text-xs font-semibold text-txt-muted font-normal lowercase">
                  (interactive live floor plan)
                </span>
              </h2>
              <p className="text-xs text-txt-secondary mt-0.5">
                Click any room to view details, update state, or assign staff.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['All', 'Available', 'Occupied', 'Cleaning', 'Maintenance', 'Reserved'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition-all ${
                    statusFilter === status
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'bg-bg-secondary text-txt-secondary hover:text-txt-main hover:bg-bg-hover border border-border-dark'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Room Status Grid (101 to 510) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[460px] overflow-y-auto p-1">
            {displayedRooms.map(room => {
              const isOccupied = room.status === 'Occupied';
              const isAvailable = room.status === 'Available';
              const isCleaning = room.status === 'Cleaning';
              const isMaintenance = room.status === 'Maintenance';
              const isReserved = room.status === 'Reserved';

              let borderColor = 'border-border-dark';
              let badgeBg = 'bg-bg-secondary';
              if (isAvailable) borderColor = 'hover:border-emerald-500/50 border-emerald-500/20';
              if (isOccupied) borderColor = 'hover:border-blue-500/50 border-blue-500/20';
              if (isCleaning) borderColor = 'hover:border-amber-500/50 border-amber-500/20';
              if (isMaintenance) borderColor = 'hover:border-rose-500/50 border-rose-500/20';
              if (isReserved) borderColor = 'hover:border-purple-500/50 border-purple-500/20';

              return (
                <div
                  key={room.id}
                  onClick={() => handleRoomClick(room)}
                  className={`bg-bg-secondary border ${borderColor} rounded-lg p-3 cursor-pointer hover:scale-[1.02] transition-all flex flex-col justify-between shadow-sm group`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-txt-main group-hover:text-brand-blue transition-colors">
                      {room.roomNumber}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      isAvailable ? 'bg-emerald-400' :
                      isOccupied ? 'bg-blue-400' :
                      isCleaning ? 'bg-amber-400' :
                      isMaintenance ? 'bg-rose-400' : 'bg-purple-400'
                    }`} />
                  </div>

                  <div className="mt-2">
                    <span className="text-[10px] text-txt-muted block truncate">{room.type}</span>
                    <Badge status={room.status} size="xs" className="mt-1" />
                  </div>

                  {room.currentGuest && (
                    <span className="text-[10px] text-txt-secondary font-medium truncate mt-2 block border-t border-border-dark/60 pt-1">
                      {room.currentGuest.guestName}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid Legend */}
          <div className="pt-3 border-t border-border-dark flex flex-wrap items-center gap-4 text-[11px] text-txt-muted">
            <span className="font-semibold uppercase tracking-wider">Legend:</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Available ({metrics.availableRooms})</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> Occupied ({metrics.occupiedRooms})</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Cleaning ({metrics.cleaningRooms})</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400" /> Maintenance ({metrics.maintenanceRooms})</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400" /> Reserved ({metrics.reservedRooms})</span>
          </div>
        </div>

        {/* RIGHT COLUMN: QUICK ACTIONS + TODAY'S ACTIVITY (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* QUICK ACTIONS */}
          <div className="bg-bg-card border border-border-dark rounded-xl p-5 shadow-card space-y-3">
            <h3 className="text-xs font-bold text-txt-muted uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <Link to="/rooms">
                <Button variant="primary" size="sm" className="w-full text-xs" icon={Plus}>
                  New Reservation
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
                icon={UserCheck}
                onClick={() => setQuickCheckInModalOpen(true)}
              >
                Check-in Guest
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
                icon={UserX}
                onClick={() => setQuickCheckOutModalOpen(true)}
              >
                Check-out Guest
              </Button>
              <Link to="/guests">
                <Button variant="secondary" size="sm" className="w-full text-xs" icon={UserPlus}>
                  Add Guest
                </Button>
              </Link>
            </div>
          </div>

          {/* TODAY'S ACTIVITY */}
          <div className="bg-bg-card border border-border-dark rounded-xl p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border-dark">
              <h3 className="text-xs font-bold text-txt-muted uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                Today's Activity
              </h3>
              <span className="text-[10px] text-txt-muted">Real-time event feed</span>
            </div>

            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {activities.slice(0, 8).map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <span className="font-mono text-[11px] font-semibold text-brand-cyan shrink-0 mt-0.5">
                    {act.time}
                  </span>
                  <div className="flex-1 text-txt-secondary leading-tight">
                    <span className="text-txt-main">{act.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: ATTENTION NEEDED */}
      <div className="bg-bg-card border border-border-dark rounded-xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-dark">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-txt-main uppercase tracking-wider">
              Attention Needed
            </h3>
          </div>
          <span className="text-xs text-txt-muted">Operational alerts requiring staff action</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Attention 1: Rooms requiring attention */}
          <div className="p-4 rounded-lg bg-bg-secondary border border-border-dark flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-txt-main">
                {metrics.maintenanceRooms} rooms require maintenance
              </span>
              <p className="text-[11px] text-txt-secondary">
                Rooms taken out of order. Engineering dispatched.
              </p>
            </div>
            <Link to="/maintenance">
              <Button variant="outline" size="sm">Review</Button>
            </Link>
          </div>

          {/* Attention 2: Reservations need payment */}
          <div className="p-4 rounded-lg bg-bg-secondary border border-border-dark flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-txt-main">
                {pendingPayments.length} reservations need payment
              </span>
              <p className="text-[11px] text-txt-secondary">
                Arriving guests with pending balance at check-in.
              </p>
            </div>
            <Link to="/reservations">
              <Button variant="outline" size="sm">Collect</Button>
            </Link>
          </div>

          {/* Attention 3: Rooms awaiting housekeeping */}
          <div className="p-4 rounded-lg bg-bg-secondary border border-border-dark flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-txt-main">
                {metrics.cleaningRooms} rooms awaiting housekeeping
              </span>
              <p className="text-[11px] text-txt-secondary">
                Turnover required before afternoon check-in window.
              </p>
            </div>
            <Link to="/housekeeping">
              <Button variant="outline" size="sm">Assign</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ROOM DETAILS DRAWER */}
      {selectedRoom && (
        <Drawer
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          title={`Room ${selectedRoom.roomNumber}`}
          subtitle={`${selectedRoom.type} • Floor ${selectedRoom.floor}`}
          footer={
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedRoom(null)}>
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Image */}
            <div className="h-48 rounded-xl overflow-hidden border border-border-dark bg-bg-card">
              <img
                src={selectedRoom.images[0]}
                alt={selectedRoom.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Status & Change Status */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-txt-muted uppercase">Current Status</span>
                <Badge status={selectedRoom.status} size="sm" />
              </div>

              <div>
                <label className="block text-[11px] text-txt-muted uppercase font-semibold mb-1.5">
                  Change Lifecycle Status
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Available', 'Occupied', 'Cleaning', 'Maintenance', 'Reserved'].map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        updateRoomStatus(selectedRoom.id, st);
                        setSelectedRoom({ ...selectedRoom, status: st });
                      }}
                      className={`text-xs py-1.5 px-2 rounded border text-center transition-all ${
                        selectedRoom.status === st
                          ? 'bg-brand-blue text-white border-brand-blue font-bold'
                          : 'bg-bg-secondary text-txt-secondary border-border-dark hover:border-border-subtle'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Guest info if occupied/reserved */}
            {selectedRoom.currentGuest && (
              <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-2">
                <span className="text-xs font-semibold text-brand-cyan uppercase">Current Guest</span>
                <p className="text-sm font-bold text-txt-main">{selectedRoom.currentGuest.guestName}</p>
                <p className="text-xs text-txt-secondary">
                  Stay: {selectedRoom.currentGuest.checkIn} to {selectedRoom.currentGuest.checkOut}
                </p>
                <p className="text-xs text-txt-muted font-mono">
                  Reservation: #{selectedRoom.currentGuest.reservationId}
                </p>
              </div>
            )}

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 bg-bg-card rounded-lg border border-border-dark">
                <span className="text-txt-muted block text-[10px]">RATE</span>
                <span className="font-bold text-txt-main">{formatCurrency(selectedRoom.basePrice)}</span>
              </div>
              <div className="p-3 bg-bg-card rounded-lg border border-border-dark">
                <span className="text-txt-muted block text-[10px]">CAPACITY</span>
                <span className="font-bold text-txt-main">{selectedRoom.capacity} Guests</span>
              </div>
              <div className="p-3 bg-bg-card rounded-lg border border-border-dark">
                <span className="text-txt-muted block text-[10px]">SIZE</span>
                <span className="font-bold text-txt-main">{selectedRoom.size} m²</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                icon={Wrench}
                onClick={() => {
                  reportMaintenanceIssue({
                    roomNumber: selectedRoom.roomNumber,
                    issue: 'Reported via Room Drawer by Admin',
                    priority: 'Medium'
                  });
                  setSelectedRoom({ ...selectedRoom, status: 'Maintenance' });
                }}
              >
                Report Maintenance Issue
              </Button>
            </div>
          </div>
        </Drawer>
      )}

      {/* QUICK CHECK-IN MODAL */}
      <Modal
        isOpen={quickCheckInModalOpen}
        onClose={() => setQuickCheckInModalOpen(false)}
        title="Check-in Arriving Guest"
        subtitle="Select a confirmed reservation to check in immediately"
        maxWidth="max-w-md"
      >
        <div className="space-y-3">
          {reservations.filter(r => r.status === 'Confirmed').length === 0 ? (
            <p className="text-xs text-txt-muted text-center py-6">No arriving guests awaiting check-in.</p>
          ) : (
            reservations.filter(r => r.status === 'Confirmed').map(res => (
              <div
                key={res.id}
                className="p-3 bg-bg-secondary rounded-lg border border-border-dark flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-txt-main block">{res.guestName}</span>
                  <span className="text-[11px] text-txt-muted">Room {res.roomNumber} ({res.roomType})</span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    checkInGuest(res.id);
                    setQuickCheckInModalOpen(false);
                  }}
                >
                  Check In
                </Button>
              </div>
            ))
          )}
        </div>
      </Modal>

      {/* QUICK CHECK-OUT MODAL */}
      <Modal
        isOpen={quickCheckOutModalOpen}
        onClose={() => setQuickCheckOutModalOpen(false)}
        title="Check-out Guest"
        subtitle="Select an in-house guest to checkout and send room to housekeeping"
        maxWidth="max-w-md"
      >
        <div className="space-y-3">
          {reservations.filter(r => r.status === 'Checked-in').length === 0 ? (
            <p className="text-xs text-txt-muted text-center py-6">No guests currently checked in.</p>
          ) : (
            reservations.filter(r => r.status === 'Checked-in').map(res => (
              <div
                key={res.id}
                className="p-3 bg-bg-secondary rounded-lg border border-border-dark flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-txt-main block">{res.guestName}</span>
                  <span className="text-[11px] text-txt-muted">Room {res.roomNumber} • Balance: {res.paymentStatus}</span>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    checkOutGuest(res.id);
                    setQuickCheckOutModalOpen(false);
                  }}
                >
                  Check Out
                </Button>
              </div>
            ))
          )}
        </div>
      </Modal>

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

export default DashboardPage;
