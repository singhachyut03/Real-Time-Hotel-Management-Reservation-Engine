import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { calculateRoomPricing } from '../../utils/pricingEngine';
import { calculateNights, formatCurrency } from '../../utils/formatters';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import RoomCard from '../../components/rooms/RoomCard';
import BookingModal from '../../components/booking/BookingModal';
import InvoiceModal from '../../components/billing/InvoiceModal';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import {
  Search,
  Calendar,
  Users,
  Building,
  SlidersHorizontal,
  RotateCcw,
  Check,
  BedDouble,
  Sparkles,
  Info
} from 'lucide-react';

export const RoomDiscoveryPage = () => {
  const { rooms, metrics } = useHotel();

  // Booking Modal & Invoice Modal state
  const [activeBookingRoom, setActiveBookingRoom] = useState(null);
  const [activeInvoice, setActiveInvoice] = useState(null);

  // Top Search Bar State
  const [searchDestination, setSearchDestination] = useState('StayOps Grand & Suites, Mumbai');
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [guestFilter, setGuestFilter] = useState(2);

  // Left Filters State
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedBeds, setSelectedBeds] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [breakfastOnly, setBreakfastOnly] = useState(false);
  const [freeCancelOnly, setFreeCancelOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile filter toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const nights = calculateNights(checkIn, checkOut);

  // Filter Options
  const roomTypes = ['Standard', 'Deluxe', 'Executive', 'Suite', 'Premium Suite'];
  const bedTypes = ['1 King Bed', '1 Queen Bed', '2 Twin Beds', '1 California King', '2 King Beds'];
  const popularFacilities = [
    'Free Wi-Fi',
    'Air Conditioning',
    'Smart TV',
    'Mini Fridge',
    'Room Service',
    'Work Desk',
    'Balcony',
    'Bathtub'
  ];

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleBedToggle = (bed) => {
    setSelectedBeds(prev =>
      prev.includes(bed) ? prev.filter(b => b !== bed) : [...prev, bed]
    );
  };

  const handleFacilityToggle = (facility) => {
    setSelectedFacilities(prev =>
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
  };

  const handleResetFilters = () => {
    setSelectedTypes([]);
    setMaxPrice(20000);
    setSelectedBeds([]);
    setSelectedFacilities([]);
    setBreakfastOnly(false);
    setFreeCancelOnly(false);
    setAvailableOnly(false);
    setSearchQuery('');
  };

  // Filtered rooms logic
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Available status
      if (availableOnly && room.status !== 'Available') return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = room.name.toLowerCase().includes(q);
        const matchType = room.type.toLowerCase().includes(q);
        const matchNum = room.roomNumber.includes(q);
        if (!matchName && !matchType && !matchNum) return false;
      }

      // Room Type
      if (selectedTypes.length > 0 && !selectedTypes.includes(room.type)) {
        return false;
      }

      // Max price
      if (room.basePrice > maxPrice) {
        return false;
      }

      // Guest capacity
      if (guestFilter && room.capacity < guestFilter) {
        return false;
      }

      // Bed Type
      if (selectedBeds.length > 0 && !selectedBeds.includes(room.bedType)) {
        return false;
      }

      // Breakfast
      if (breakfastOnly && !room.breakfastIncluded) {
        return false;
      }

      // Free cancellation
      if (freeCancelOnly && !room.freeCancellation) {
        return false;
      }

      // Facilities match all selected
      if (selectedFacilities.length > 0) {
        const hasAll = selectedFacilities.every(f => room.facilities.includes(f));
        if (!hasAll) return false;
      }

      return true;
    });
  }, [
    rooms,
    availableOnly,
    searchQuery,
    selectedTypes,
    maxPrice,
    guestFilter,
    selectedBeds,
    breakfastOnly,
    freeCancelOnly,
    selectedFacilities
  ]);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <PublicNavbar />

      {/* TOP SEARCH BAR (Booking.com style) */}
      <section className="bg-bg-secondary border-b border-border-dark py-6 shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-bg-card border-2 border-brand-blue/40 rounded-xl p-3 shadow-glow-blue grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Destination */}
            <div className="md:col-span-4 flex items-center gap-3 px-3 py-2 bg-bg-secondary rounded-lg border border-border-dark">
              <Building className="w-5 h-5 text-brand-blue shrink-0" />
              <div className="w-full">
                <span className="text-[10px] uppercase font-bold text-txt-muted block">Destination</span>
                <input
                  type="text"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-txt-main w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Check-In Date */}
            <div className="md:col-span-2 flex items-center gap-3 px-3 py-2 bg-bg-secondary rounded-lg border border-border-dark">
              <Calendar className="w-5 h-5 text-brand-blue shrink-0" />
              <div className="w-full">
                <span className="text-[10px] uppercase font-bold text-txt-muted block">Check-in</span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-txt-main w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Check-Out Date */}
            <div className="md:col-span-2 flex items-center gap-3 px-3 py-2 bg-bg-secondary rounded-lg border border-border-dark">
              <Calendar className="w-5 h-5 text-brand-blue shrink-0" />
              <div className="w-full">
                <span className="text-[10px] uppercase font-bold text-txt-muted block">Check-out</span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-txt-main w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="md:col-span-2 flex items-center gap-3 px-3 py-2 bg-bg-secondary rounded-lg border border-border-dark">
              <Users className="w-5 h-5 text-brand-blue shrink-0" />
              <div className="w-full">
                <span className="text-[10px] uppercase font-bold text-txt-muted block">Guests</span>
                <select
                  value={guestFilter}
                  onChange={(e) => setGuestFilter(Number(e.target.value))}
                  className="bg-transparent text-xs font-semibold text-txt-main w-full focus:outline-none"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                icon={Search}
                onClick={() => {}}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA: FILTERS + ROOM CARDS */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-txt-main flex items-center gap-2">
              Available Rooms & Suites
              <span className="text-sm font-semibold text-brand-cyan bg-brand-cyanMuted px-2.5 py-0.5 rounded-full border border-brand-cyan/30">
                {filteredRooms.length} of {rooms.length} rooms
              </span>
            </h1>
            <p className="text-xs text-txt-secondary mt-1">
              Rates calculated for {nights} night{nights > 1 ? 's' : ''} ({checkIn} to {checkOut}) for {guestFilter} guest{guestFilter > 1 ? 's' : ''}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 bg-bg-card border border-border-dark rounded-lg text-xs font-semibold text-txt-main"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-blue" />
              <span>Filters ({selectedTypes.length + selectedFacilities.length})</span>
            </button>

            {/* Live Occupancy Alert Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card border border-border-dark text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-txt-muted">Hotel Occupancy:</span>
              <span className="font-bold text-brand-cyan">{Math.round(metrics.occupancyRate * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDE: FILTERS */}
          <aside
            className={`lg:col-span-4 xl:col-span-3 space-y-6 ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-bg-card border border-border-dark rounded-xl p-5 space-y-6 shadow-card sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-border-dark">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-cyan" />
                  <h3 className="text-sm font-bold text-txt-main uppercase tracking-wider">Filters</h3>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-txt-muted hover:text-brand-cyan flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>

              {/* Keyword search input */}
              <div>
                <label className="block text-xs font-semibold text-txt-secondary mb-1.5">Search Room</label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-txt-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Deluxe, 102, Suite..."
                    className="w-full pl-8 pr-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              {/* Room Availability Filter */}
              <div className="pt-3 border-t border-border-dark">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-medium text-txt-main">Available Only</span>
                  <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-border-dark bg-bg-secondary text-brand-blue focus:ring-brand-blue"
                  />
                </label>
              </div>

              {/* Room Types */}
              <div className="pt-4 border-t border-border-dark">
                <h4 className="text-xs font-bold text-txt-main uppercase tracking-wider mb-2.5">Room Type</h4>
                <div className="space-y-2">
                  {roomTypes.map(type => {
                    const count = rooms.filter(r => r.type === type).length;
                    const isChecked = selectedTypes.includes(type);
                    return (
                      <label
                        key={type}
                        className="flex items-center justify-between text-xs text-txt-secondary hover:text-txt-main cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleTypeToggle(type)}
                            className="w-3.5 h-3.5 rounded border-border-dark bg-bg-secondary text-brand-blue focus:ring-brand-blue"
                          />
                          <span>{type}</span>
                        </div>
                        <span className="text-[10px] text-txt-muted font-mono">{count}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-border-dark">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold text-txt-main uppercase tracking-wider">Max Price / Night</h4>
                  <span className="text-xs font-bold text-brand-cyan">{formatCurrency(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={20000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-blue bg-bg-secondary h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-txt-muted mt-1 font-mono">
                  <span>₹3,000</span>
                  <span>₹20,000</span>
                </div>
              </div>

              {/* Bed Type */}
              <div className="pt-4 border-t border-border-dark">
                <h4 className="text-xs font-bold text-txt-main uppercase tracking-wider mb-2.5">Bed Type</h4>
                <div className="space-y-2">
                  {bedTypes.map(bed => {
                    const isChecked = selectedBeds.includes(bed);
                    return (
                      <label
                        key={bed}
                        className="flex items-center gap-2 text-xs text-txt-secondary hover:text-txt-main cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleBedToggle(bed)}
                          className="w-3.5 h-3.5 rounded border-border-dark bg-bg-secondary text-brand-blue focus:ring-brand-blue"
                        />
                        <span>{bed}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Perks: Breakfast & Free Cancellation */}
              <div className="pt-4 border-t border-border-dark space-y-2.5">
                <h4 className="text-xs font-bold text-txt-main uppercase tracking-wider mb-1">Perks & Policies</h4>
                <label className="flex items-center gap-2 text-xs text-txt-secondary hover:text-txt-main cursor-pointer">
                  <input
                    type="checkbox"
                    checked={breakfastOnly}
                    onChange={(e) => setBreakfastOnly(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-border-dark bg-bg-secondary text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Breakfast Included</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-txt-secondary hover:text-txt-main cursor-pointer">
                  <input
                    type="checkbox"
                    checked={freeCancelOnly}
                    onChange={(e) => setFreeCancelOnly(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-border-dark bg-bg-secondary text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Free Cancellation</span>
                </label>
              </div>

              {/* Facilities */}
              <div className="pt-4 border-t border-border-dark">
                <h4 className="text-xs font-bold text-txt-main uppercase tracking-wider mb-2.5">Facilities</h4>
                <div className="space-y-2">
                  {popularFacilities.map(f => {
                    const isChecked = selectedFacilities.includes(f);
                    return (
                      <label
                        key={f}
                        className="flex items-center gap-2 text-xs text-txt-secondary hover:text-txt-main cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleFacilityToggle(f)}
                          className="w-3.5 h-3.5 rounded border-border-dark bg-bg-secondary text-brand-blue focus:ring-brand-blue"
                        />
                        <span>{f}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: ROOM CARDS */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            {filteredRooms.length === 0 ? (
              <EmptyState
                icon={BedDouble}
                title="No rooms match your filters"
                description="Try loosening your search criteria or resetting filters to browse all available rooms."
                actionLabel="Reset All Filters"
                onAction={handleResetFilters}
              />
            ) : (
              filteredRooms.map(room => {
                // Calculate dynamic pricing for this room for the given search dates
                const pricing = calculateRoomPricing({
                  basePrice: room.basePrice,
                  checkInDate: checkIn,
                  checkOutDate: checkOut,
                  currentOccupancyRate: metrics.occupancyRate || 0.84,
                  selectedAddOns: [],
                  numberOfGuests: guestFilter,
                  numberOfRooms: 1
                });

                return (
                  <RoomCard
                    key={room.id}
                    room={room}
                    nights={nights}
                    pricing={pricing}
                    onBookNow={(r) => setActiveBookingRoom(r)}
                  />
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* BOOKING MODAL */}
      {activeBookingRoom && (
        <BookingModal
          isOpen={!!activeBookingRoom}
          onClose={() => setActiveBookingRoom(null)}
          selectedRoom={activeBookingRoom}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          onOpenInvoice={(res) => setActiveInvoice(res)}
        />
      )}

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

export default RoomDiscoveryPage;
