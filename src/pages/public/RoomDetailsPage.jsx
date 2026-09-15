import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import { calculateRoomPricing } from '../../utils/pricingEngine';
import { formatCurrency, calculateNights } from '../../utils/formatters';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import FacilityItem from '../../components/common/FacilityItem';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import BookingModal from '../../components/booking/BookingModal';
import InvoiceModal from '../../components/billing/InvoiceModal';
import {
  Star,
  Users,
  Bed,
  Maximize,
  ChevronRight,
  ShieldCheck,
  Clock,
  Ban,
  Dog,
  Check,
  Images,
  Info,
  Calendar,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const RoomDetailsPage = () => {
  const { id } = useParams();
  const { rooms, metrics } = useHotel();

  // Find room by roomNumber or id
  const room = rooms.find(r => r.roomNumber === id || r.id === id) || rooms[0];

  // Booking & Invoice states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);

  // Sticky booking widget state
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);

  const nights = calculateNights(checkIn, checkOut);

  const pricing = useMemo(() => {
    if (!room) return null;
    return calculateRoomPricing({
      basePrice: room.basePrice,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      currentOccupancyRate: metrics.occupancyRate || 0.84,
      selectedAddOns: [],
      numberOfGuests: guestsCount,
      numberOfRooms: roomsCount
    });
  }, [room, checkIn, checkOut, guestsCount, roomsCount, metrics.occupancyRate]);

  if (!room) return null;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-txt-muted mb-6">
          <Link to="/" className="hover:text-txt-main">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/rooms" className="hover:text-txt-main">Rooms</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-cyan font-semibold truncate">{room.name}</span>
        </nav>

        {/* TOP TITLE & RATING HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge status={room.status} size="sm" />
              <span className="text-xs uppercase font-bold tracking-wider text-brand-cyan">
                {room.type} Suite
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-txt-main">
              {room.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-bg-secondary px-3 py-1.5 rounded-lg border border-border-dark">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-txt-main">{room.rating}</span>
              <span className="text-xs text-txt-muted">({room.reviewsCount} verified reviews)</span>
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY (1 Large + 4 Preview thumbnails) */}
        <div className="relative rounded-2xl overflow-hidden border border-border-dark bg-bg-secondary mb-10 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[360px] md:h-[480px]">
            {/* 1 Large Main Image */}
            <div className="md:col-span-2 relative h-full group overflow-hidden cursor-pointer" onClick={() => setGalleryModalOpen(true)}>
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* 4 Preview Images in 2x2 Grid */}
            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
              {room.images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setGalleryModalOpen(true)}
                  className="relative h-full overflow-hidden group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${room.name} ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* View All Photos Overlay Button */}
          <button
            onClick={() => setGalleryModalOpen(true)}
            className="absolute bottom-4 right-4 bg-bg-primary/90 backdrop-blur-md hover:bg-bg-primary text-txt-main text-xs font-semibold px-4 py-2.5 rounded-lg border border-border-dark flex items-center gap-2 shadow-lg transition-all"
          >
            <Images className="w-4 h-4 text-brand-cyan" />
            <span>View all photos ({room.images.length})</span>
          </button>
        </div>

        {/* TWO-COLUMN LAYOUT: ROOM SPECS/FACILITIES vs STICKY BOOKING PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT CONTENT (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Key Specs Bar */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-bg-card border border-border-dark text-center">
              <div className="space-y-1">
                <Maximize className="w-5 h-5 text-brand-blue mx-auto" />
                <span className="text-[11px] text-txt-muted block uppercase">Room Size</span>
                <span className="text-sm font-bold text-txt-main">{room.size} m²</span>
              </div>
              <div className="space-y-1 border-x border-border-dark">
                <Users className="w-5 h-5 text-brand-blue mx-auto" />
                <span className="text-[11px] text-txt-muted block uppercase">Occupancy</span>
                <span className="text-sm font-bold text-txt-main">{room.capacity} Adults</span>
              </div>
              <div className="space-y-1">
                <Bed className="w-5 h-5 text-brand-blue mx-auto" />
                <span className="text-[11px] text-txt-muted block uppercase">Bed Type</span>
                <span className="text-sm font-bold text-txt-main">{room.bedType}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-txt-main mb-3">About This Room</h2>
              <p className="text-sm text-txt-secondary leading-relaxed">
                {room.description}
              </p>
              <p className="text-sm text-txt-secondary leading-relaxed mt-3">
                Furnished with bespoke Italian wood accents, an artisan king bed with 400-thread-count Egyptian cotton linens, and a spa-inspired bathroom with rainfall shower and soaking tub. Floor-to-ceiling soundproof windows frame magnificent urban and waterfront vistas.
              </p>
            </div>

            {/* Facilities Section with Icons */}
            <div className="pt-6 border-t border-border-dark">
              <h2 className="text-lg font-bold text-txt-main mb-4">Room Facilities & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {room.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-bg-card border border-border-dark">
                    <FacilityItem name={fac} />
                  </div>
                ))}
              </div>
            </div>

            {/* Room Features */}
            <div className="pt-6 border-t border-border-dark">
              <h2 className="text-lg font-bold text-txt-main mb-4">Room Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-txt-secondary">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Panoramic city skyline or waterfront view</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Double-glazed soundproof acoustic windows</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Premium orthopaedic mattress with down pillows</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Ergonomic Herman Miller chair and executive work desk</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Modern marble en-suite bathroom with walk-in rain shower</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Complimentary luxury botanical toiletries & plush bathrobes</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="pt-6 border-t border-border-dark">
              <h2 className="text-lg font-bold text-txt-main mb-4">What's Included in Your Stay</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-txt-secondary">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High-speed optical fiber Wi-Fi throughout hotel</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Twice-daily housekeeping with evening turndown</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24-hour in-room dining and concierge services</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Complimentary Himalayan spring bottled water replenished daily</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full access to heated rooftop infinity pool & fitness club</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>In-room Nespresso machine with complimentary pods</span>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="pt-6 border-t border-border-dark">
              <h2 className="text-lg font-bold text-txt-main mb-4">Hotel & Room Policies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-txt-secondary">
                <div className="p-3.5 rounded-lg bg-bg-card border border-border-dark flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-txt-main block">Check-in / Check-out</span>
                    <span>Check-in: 2:00 PM • Check-out: 11:00 AM. Early check-in subject to availability.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-bg-card border border-border-dark flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-txt-main block">Cancellation Policy</span>
                    <span>Free cancellation up to 24 hours before check-in date.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-bg-card border border-border-dark flex items-start gap-3">
                  <Ban className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-txt-main block">Non-Smoking Property</span>
                    <span>100% non-smoking inside all guest rooms and indoor public areas.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-bg-card border border-border-dark flex items-start gap-3">
                  <Dog className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-txt-main block">Pet Policy</span>
                    <span>Service animals welcomed. Small pets allowed with advance concierge notice.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY BOOKING PANEL (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-bg-card border border-border-dark rounded-xl p-6 shadow-2xl space-y-5">
              {/* Price per night header */}
              <div className="pb-4 border-b border-border-dark">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-txt-main">
                    {formatCurrency(pricing ? pricing.effectivePricePerNight : room.basePrice)}
                  </span>
                  <span className="text-xs text-txt-muted">/ night</span>
                </div>
                {pricing && pricing.primaryReason && (
                  <p className="text-[11px] text-brand-cyan mt-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{pricing.primaryReason}</span>
                  </p>
                )}
              </div>

              {/* Form Controls */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-txt-muted uppercase tracking-wider mb-1">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-txt-muted uppercase tracking-wider mb-1">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-txt-muted uppercase tracking-wider mb-1">
                      Guests
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
                    >
                      {[...Array(room.capacity)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} Adult{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-txt-muted uppercase tracking-wider mb-1">
                      Rooms
                    </label>
                    <select
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
                    >
                      <option value={1}>1 Room</option>
                      <option value={2}>2 Rooms</option>
                      <option value={3}>3 Rooms</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Estimated Total Calculation Breakdown */}
              {pricing && (
                <div className="bg-bg-secondary rounded-lg p-3.5 border border-border-dark/70 space-y-2 text-xs">
                  <div className="flex justify-between text-txt-secondary">
                    <span>{formatCurrency(pricing.effectivePricePerNight)} × {nights} night{nights > 1 ? 's' : ''}</span>
                    <span className="font-semibold text-txt-main">{formatCurrency(pricing.adjustedRoomTotal)}</span>
                  </div>
                  <div className="flex justify-between text-txt-secondary">
                    <span>Service Fee</span>
                    <span>{formatCurrency(pricing.serviceFee)}</span>
                  </div>
                  <div className="flex justify-between text-txt-secondary">
                    <span>GST (18%)</span>
                    <span>{formatCurrency(pricing.taxAmount)}</span>
                  </div>
                  <div className="pt-2 border-t border-border-dark flex justify-between items-baseline">
                    <span className="font-bold text-txt-main">Estimated Total</span>
                    <span className="text-base font-extrabold text-brand-cyan">
                      {formatCurrency(pricing.finalTotal)}
                    </span>
                  </div>
                </div>
              )}

              {/* Reserve Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={room.status !== 'Available'}
                onClick={() => setBookingModalOpen(true)}
              >
                {room.status === 'Available' ? 'Reserve Room' : `Unavailable (${room.status})`}
              </Button>

              <div className="text-center">
                <span className="text-[11px] text-txt-muted">
                  You won’t be charged until final review
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ALL PHOTOS LIGHTBOX MODAL */}
      <Modal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        title={`${room.name} — Photo Gallery`}
        subtitle="Curated high-resolution photography"
        maxWidth="max-w-4xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {room.images.map((img, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden border border-border-dark h-64 bg-bg-secondary">
              <img
                src={img}
                alt={`${room.name} shot ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </Modal>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedRoom={room}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        onOpenInvoice={(res) => setActiveInvoice(res)}
      />

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

export default RoomDetailsPage;
