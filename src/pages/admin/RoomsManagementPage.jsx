import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency, formatShortDate } from '../../utils/formatters';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Drawer from '../../components/common/Drawer';
import EmptyState from '../../components/common/EmptyState';
import FacilityItem from '../../components/common/FacilityItem';
import {
  BedDouble,
  Search,
  Filter,
  Wrench,
  Sparkles,
  User,
  Calendar,
  Layers,
  ArrowRight,
  Plus
} from 'lucide-react';

export const RoomsManagementPage = () => {
  const {
    rooms,
    reservations,
    updateRoomStatus,
    reportMaintenanceIssue,
    addToast
  } = useHotel();

  const [activeStatus, setActiveStatus] = useState('All');
  const [selectedFloor, setSelectedFloor] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const statuses = ['All', 'Available', 'Occupied', 'Reserved', 'Cleaning', 'Maintenance'];
  const floors = ['All', 'Floor 1', 'Floor 2', 'Floor 3', 'Floor 4', 'Floor 5'];

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Status filter
      if (activeStatus !== 'All' && room.status.toLowerCase() !== activeStatus.toLowerCase()) {
        return false;
      }

      // Floor filter
      if (selectedFloor !== 'All') {
        const floorNum = Number(selectedFloor.replace('Floor ', ''));
        if (room.floor !== floorNum) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchNum = room.roomNumber.includes(q);
        const matchType = room.type.toLowerCase().includes(q);
        const matchGuest = room.currentGuest?.guestName.toLowerCase().includes(q);
        if (!matchNum && !matchType && !matchGuest) return false;
      }

      return true;
    });
  }, [rooms, activeStatus, selectedFloor, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-txt-main flex items-center gap-2">
            Rooms Management
            <span className="text-xs font-semibold text-brand-cyan bg-brand-cyanMuted px-2.5 py-0.5 rounded-full border border-brand-cyan/30">
              {filteredRooms.length} Rooms
            </span>
          </h1>
          <p className="text-xs text-txt-secondary mt-1">
            Visual room directory across 5 floors. Manage operational states, turnovers, and maintenance locks.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-bg-card border border-border-dark rounded-xl p-4 shadow-card space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by room #, type, guest..."
              className="w-full pl-9 pr-4 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
            />
          </div>

          {/* Floor selector */}
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-blue" />
            <span className="text-xs text-txt-muted font-medium">Floor:</span>
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="px-3 py-1.5 bg-bg-secondary border border-border-dark rounded-lg text-xs font-semibold text-txt-main focus:border-brand-blue focus:outline-none"
            >
              {floors.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border-dark">
          {statuses.map(s => {
            const count = s === 'All' ? rooms.length : rooms.filter(r => r.status.toLowerCase() === s.toLowerCase()).length;
            return (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                  activeStatus === s
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-bg-secondary text-txt-secondary hover:text-txt-main hover:bg-bg-hover border border-border-dark'
                }`}
              >
                <span>{s}</span>
                <span className="text-[10px] opacity-75 font-mono">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ROOM CARDS GRID */}
      {filteredRooms.length === 0 ? (
        <EmptyState
          icon={BedDouble}
          title="No rooms found"
          description="No rooms match the selected filters or search terms."
          actionLabel="Clear Filters"
          onAction={() => {
            setActiveStatus('All');
            setSelectedFloor('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredRooms.map(room => {
            return (
              <div
                key={room.id}
                className="bg-bg-card border border-border-dark hover:border-brand-blue/40 rounded-xl overflow-hidden shadow-card hover:shadow-glow-blue transition-all flex flex-col justify-between group"
              >
                {/* Image & Header */}
                <div>
                  <div className="relative h-40 overflow-hidden bg-bg-secondary">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="font-mono text-xs font-black bg-bg-primary/90 backdrop-blur-md px-2.5 py-1 rounded text-txt-main border border-border-dark">
                        ROOM {room.roomNumber}
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <Badge status={room.status} size="xs" />
                    </div>
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="text-[10px] font-semibold bg-black/60 backdrop-blur-sm text-txt-main px-2 py-0.5 rounded">
                        Floor {room.floor} • {room.type}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-txt-main truncate">{room.name}</h3>
                      <span className="text-xs font-bold text-brand-cyan shrink-0">
                        {formatCurrency(room.basePrice)}/night
                      </span>
                    </div>

                    {/* Guest if occupied */}
                    {room.currentGuest ? (
                      <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-dark text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-txt-main">
                          <User className="w-3.5 h-3.5 text-brand-blue" />
                          <span className="truncate">{room.currentGuest.guestName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-txt-muted">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {formatShortDate(room.currentGuest.checkIn)} – {formatShortDate(room.currentGuest.checkOut)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-bg-secondary/40 border border-border-dark/60 text-[11px] text-txt-muted flex items-center justify-between">
                        <span>{room.status === 'Available' ? 'Ready for Check-in' : `Status: ${room.status}`}</span>
                        <span>{room.size} m²</span>
                      </div>
                    )}

                    {/* Quick Facilities */}
                    <div className="flex flex-wrap gap-1">
                      {room.facilities.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-bg-secondary text-txt-secondary border border-border-dark truncate">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setSelectedRoom(room)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ROOM SIDE DRAWER */}
      {selectedRoom && (
        <Drawer
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          title={`Room ${selectedRoom.roomNumber} Management`}
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
            <div className="h-44 rounded-xl overflow-hidden border border-border-dark bg-bg-card">
              <img
                src={selectedRoom.images[0]}
                alt={selectedRoom.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lifecycle Status Box */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-txt-muted uppercase">Lifecycle Status</span>
                <Badge status={selectedRoom.status} size="sm" />
              </div>

              <div>
                <label className="block text-[11px] text-txt-muted uppercase font-semibold mb-2">
                  Change Room Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Available', 'Occupied', 'Cleaning', 'Maintenance', 'Reserved'].map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        updateRoomStatus(selectedRoom.id, st);
                        setSelectedRoom({ ...selectedRoom, status: st });
                      }}
                      className={`text-xs py-1.5 px-2 rounded-lg border text-center transition-all ${
                        selectedRoom.status === st
                          ? 'bg-brand-blue text-white border-brand-blue font-bold shadow-sm'
                          : 'bg-bg-secondary text-txt-secondary border-border-dark hover:border-border-subtle'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Guest / Reservation Information */}
            {selectedRoom.currentGuest && (
              <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-2 text-xs">
                <span className="text-xs font-semibold text-brand-cyan uppercase">Guest & Booking</span>
                <p className="text-sm font-bold text-txt-main">{selectedRoom.currentGuest.guestName}</p>
                <p className="text-txt-secondary">
                  Dates: {selectedRoom.currentGuest.checkIn} to {selectedRoom.currentGuest.checkOut}
                </p>
                <p className="text-txt-muted font-mono">
                  Reservation ID: #{selectedRoom.currentGuest.reservationId}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-2 text-xs">
              <h4 className="font-bold text-txt-muted uppercase text-[10px]">Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-txt-secondary">
                <div>Base Rate: <span className="text-txt-main font-bold">{formatCurrency(selectedRoom.basePrice)}</span></div>
                <div>Capacity: <span className="text-txt-main font-bold">{selectedRoom.capacity} Guests</span></div>
                <div>Bed: <span className="text-txt-main font-bold">{selectedRoom.bedType}</span></div>
                <div>Size: <span className="text-txt-main font-bold">{selectedRoom.size} m²</span></div>
              </div>
            </div>

            {/* All Facilities */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-dark space-y-2.5">
              <h4 className="font-bold text-txt-muted uppercase text-[10px]">Room Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedRoom.facilities.map((fac, idx) => (
                  <FacilityItem key={idx} name={fac} />
                ))}
              </div>
            </div>

            {/* Actions: Report Issue */}
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                icon={Wrench}
                onClick={() => {
                  reportMaintenanceIssue({
                    roomNumber: selectedRoom.roomNumber,
                    issue: 'Issue logged via Room Management Drawer',
                    priority: 'High'
                  });
                  setSelectedRoom({ ...selectedRoom, status: 'Maintenance' });
                }}
              >
                Report Issue & Lockdown Room
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default RoomsManagementPage;
