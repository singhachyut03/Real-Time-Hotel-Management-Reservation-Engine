import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { calculateRoomPricing, AVAILABLE_ADDONS } from '../../utils/pricingEngine';
import { formatCurrency, formatShortDate } from '../../utils/formatters';
import { Modal } from '../common/Modal';
import Button from '../common/Button';
import {
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  Users,
  Sparkles,
  Info,
  ArrowRight,
  ArrowLeft,
  Receipt,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingModal = ({
  isOpen,
  onClose,
  selectedRoom,
  initialCheckIn,
  initialCheckOut,
  onOpenInvoice
}) => {
  const { createReservation, metrics } = useHotel();

  // Current step 1 to 5
  const [step, setStep] = useState(1);

  // Form State
  const [guestData, setGuestData] = useState({
    name: '',
    email: '',
    phone: '',
    guestsCount: 2,
    specialRequests: ''
  });

  const [stayDates, setStayDates] = useState({
    checkIn: initialCheckIn || new Date().toISOString().split('T')[0],
    checkOut: initialCheckOut || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const [selectedAddonIds, setSelectedAddonIds] = useState(['breakfast']);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [errors, setErrors] = useState({});

  // Sync dates if initial changes
  React.useEffect(() => {
    if (initialCheckIn) setStayDates(prev => ({ ...prev, checkIn: initialCheckIn }));
    if (initialCheckOut) setStayDates(prev => ({ ...prev, checkOut: initialCheckOut }));
  }, [initialCheckIn, initialCheckOut]);

  // Pricing breakdown calculation
  const pricing = useMemo(() => {
    if (!selectedRoom) return null;
    const activeAddons = AVAILABLE_ADDONS.filter(a => selectedAddonIds.includes(a.id));
    return calculateRoomPricing({
      basePrice: selectedRoom.basePrice,
      checkInDate: stayDates.checkIn,
      checkOutDate: stayDates.checkOut,
      currentOccupancyRate: metrics.occupancyRate || 0.84,
      selectedAddOns: activeAddons,
      numberOfGuests: guestData.guestsCount,
      numberOfRooms: 1
    });
  }, [selectedRoom, stayDates, selectedAddonIds, guestData.guestsCount, metrics.occupancyRate]);

  // Validation
  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!guestData.name.trim()) newErrors.name = 'Full name is required';
      if (!guestData.email.trim() || !guestData.email.includes('@')) newErrors.email = 'Valid email is required';
      if (!guestData.phone.trim() || guestData.phone.length < 8) newErrors.phone = 'Valid phone number is required';
    }
    if (currentStep === 2) {
      if (!stayDates.checkIn) newErrors.checkIn = 'Check-in date is required';
      if (!stayDates.checkOut) newErrors.checkOut = 'Check-out date is required';
      if (stayDates.checkIn >= stayDates.checkOut) newErrors.checkOut = 'Check-out must be after check-in';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const toggleAddon = (addonId) => {
    setSelectedAddonIds(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleConfirmReservation = () => {
    if (!pricing || !selectedRoom) return;

    const res = createReservation({
      guestData,
      stayData: {
        roomId: selectedRoom.id,
        roomNumber: selectedRoom.roomNumber,
        checkIn: stayDates.checkIn,
        checkOut: stayDates.checkOut,
        guestsCount: guestData.guestsCount
      },
      addOns: pricing.itemizedAddOns,
      pricingBreakdown: pricing
    });

    setConfirmedReservation(res);
    setStep(5);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedReservation(null);
    onClose();
  };

  if (!isOpen || !selectedRoom) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={step === 5 ? "Reservation Confirmed!" : `Book ${selectedRoom.name}`}
      subtitle={step === 5 ? "Your stay has been registered in real time" : `Step ${step} of 4: Instant Guaranteed Booking`}
      maxWidth="max-w-2xl"
    >
      {/* Step Indicators */}
      {step < 5 && (
        <div className="mb-6 flex items-center justify-between border-b border-border-dark pb-4">
          {[
            { num: 1, label: 'Guest Details' },
            { num: 2, label: 'Stay Dates' },
            { num: 3, label: 'Add-ons' },
            { num: 4, label: 'Summary' },
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                  step === item.num
                    ? 'bg-brand-blue text-white shadow-glow-blue'
                    : step > item.num
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-bg-secondary text-txt-muted border border-border-dark'
                }`}
              >
                {step > item.num ? '✓' : item.num}
              </div>
              <span className={`text-xs font-medium hidden sm:inline ${step === item.num ? 'text-txt-main' : 'text-txt-muted'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* STEP 1: GUEST DETAILS */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-xs font-medium text-txt-secondary mb-1.5">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
              <input
                type="text"
                value={guestData.name}
                onChange={e => setGuestData({ ...guestData, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-9 pr-4 py-2.5 bg-bg-secondary border border-border-dark rounded-lg text-sm text-txt-main focus:border-brand-blue focus:outline-none"
              />
            </div>
            {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-txt-secondary mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
                <input
                  type="email"
                  value={guestData.email}
                  onChange={e => setGuestData({ ...guestData, email: e.target.value })}
                  placeholder="rahul.sharma@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-bg-secondary border border-border-dark rounded-lg text-sm text-txt-main focus:border-brand-blue focus:outline-none"
                />
              </div>
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-txt-secondary mb-1.5">Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
                <input
                  type="tel"
                  value={guestData.phone}
                  onChange={e => setGuestData({ ...guestData, phone: e.target.value })}
                  placeholder="+91 98201 44521"
                  className="w-full pl-9 pr-4 py-2.5 bg-bg-secondary border border-border-dark rounded-lg text-sm text-txt-main focus:border-brand-blue focus:outline-none"
                />
              </div>
              {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-txt-secondary mb-1.5">Number of Guests</label>
            <div className="relative">
              <Users className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
              <select
                value={guestData.guestsCount}
                onChange={e => setGuestData({ ...guestData, guestsCount: Number(e.target.value) })}
                className="w-full pl-9 pr-4 py-2.5 bg-bg-secondary border border-border-dark rounded-lg text-sm text-txt-main focus:border-brand-blue focus:outline-none"
              >
                {[...Array(selectedRoom.capacity || 2)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'} (Max {selectedRoom.capacity})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-txt-secondary mb-1.5">Special Requests (Optional)</label>
            <textarea
              rows={2}
              value={guestData.specialRequests}
              onChange={e => setGuestData({ ...guestData, specialRequests: e.target.value })}
              placeholder="High floor, quiet corner, early luggage drop, etc."
              className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-sm text-txt-main focus:border-brand-blue focus:outline-none resize-none"
            />
          </div>
        </div>
      )}

      {/* STEP 2: STAY DETAILS */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          {/* Room quick summary */}
          <div className="flex items-center gap-3 p-3 bg-bg-secondary border border-border-dark rounded-lg">
            <img
              src={selectedRoom.images[0]}
              alt={selectedRoom.name}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <span className="text-[11px] text-brand-cyan font-semibold">{selectedRoom.type}</span>
              <h4 className="text-sm font-bold text-txt-main">{selectedRoom.name}</h4>
              <p className="text-xs text-txt-muted">{selectedRoom.bedType} • {selectedRoom.size} m²</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-txt-secondary mb-1.5">Check-in Date *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
                <input
                  type="date"
                  value={stayDates.checkIn}
                  onChange={e => setStayDates({ ...stayDates, checkIn: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 bg-bg-secondary border border-border-dark rounded-lg text-sm text-txt-main focus:border-brand-blue focus:outline-none"
                />
              </div>
              <span className="text-[10px] text-txt-muted mt-1 block">Check-in from 2:00 PM</span>
              {errors.checkIn && <p className="text-xs text-rose-400 mt-1">{errors.checkIn}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-txt-secondary mb-1.5">Check-out Date *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
                <input
                  type="date"
                  value={stayDates.checkOut}
                  onChange={e => setStayDates({ ...stayDates, checkOut: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 bg-bg-secondary border border-border-dark rounded-lg text-sm text-txt-main focus:border-brand-blue focus:outline-none"
                />
              </div>
              <span className="text-[10px] text-txt-muted mt-1 block">Check-out until 11:00 AM</span>
              {errors.checkOut && <p className="text-xs text-rose-400 mt-1">{errors.checkOut}</p>}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-start gap-3 text-xs text-txt-secondary">
            <Info className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-txt-main">Stay Duration: </span>
              {pricing ? `${pricing.nights} night${pricing.nights > 1 ? 's' : ''}` : '1 night'}
              <p className="mt-1 text-txt-muted">{pricing?.primaryReason}</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: ADD-ONS */}
      {step === 3 && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-xs text-txt-secondary mb-2">
            Elevate your stay with curated hotel experiences and services:
          </p>

          <div className="space-y-2.5">
            {AVAILABLE_ADDONS.map(addon => {
              const isSelected = selectedAddonIds.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-brand-blue/10 border-brand-blue shadow-sm'
                      : 'bg-bg-secondary border-border-dark hover:border-border-subtle'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-brand-blue border-brand-blue text-white'
                          : 'border-border-dark bg-bg-card'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-txt-main">{addon.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-txt-muted border border-border-dark">
                          {addon.category}
                        </span>
                      </div>
                      <p className="text-xs text-txt-secondary mt-0.5">{addon.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-cyan shrink-0">
                    {addon.priceLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: PRICE SUMMARY & CONFIRMATION */}
      {step === 4 && pricing && (
        <div className="space-y-4 animate-fade-in">
          {/* Detailed Bill Breakdown */}
          <div className="bg-bg-secondary rounded-xl border border-border-dark p-4 space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-txt-secondary">
              <span>Room charges ({pricing.nights} night{pricing.nights > 1 ? 's' : ''} × {formatCurrency(pricing.effectivePricePerNight)})</span>
              <span className="font-semibold text-txt-main">{formatCurrency(pricing.adjustedRoomTotal)}</span>
            </div>

            {/* Explanations */}
            {pricing.weekendAdjustment > 0 && (
              <div className="flex justify-between items-center text-txt-muted text-[11px] pl-2 border-l border-brand-blue/40">
                <span>Weekend demand multiplier (+15%)</span>
                <span>+{formatCurrency(pricing.weekendAdjustment)}</span>
              </div>
            )}
            {pricing.demandAdjustment > 0 && (
              <div className="flex justify-between items-center text-txt-muted text-[11px] pl-2 border-l border-brand-blue/40">
                <span>High hotel occupancy surge</span>
                <span>+{formatCurrency(pricing.demandAdjustment)}</span>
              </div>
            )}

            {pricing.itemizedAddOns.length > 0 && (
              <div className="pt-2 border-t border-border-dark/60 space-y-1.5">
                <span className="font-semibold text-txt-muted uppercase tracking-wider text-[10px]">Add-ons & Services:</span>
                {pricing.itemizedAddOns.map(addon => (
                  <div key={addon.id} className="flex justify-between items-center text-txt-secondary">
                    <span>{addon.name}</span>
                    <span>+{formatCurrency(addon.cost)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-border-dark/60 flex justify-between items-center text-txt-secondary">
              <span>Standard Service Fee</span>
              <span>{formatCurrency(pricing.serviceFee)}</span>
            </div>

            <div className="flex justify-between items-center text-txt-secondary">
              <span>GST / Taxes (18%)</span>
              <span>{formatCurrency(pricing.taxAmount)}</span>
            </div>

            <div className="pt-3 border-t border-border-dark flex justify-between items-baseline">
              <div>
                <span className="text-sm font-bold text-txt-main">Total Payable</span>
                <p className="text-[10px] text-txt-muted">All taxes & fees included</p>
              </div>
              <span className="text-xl font-extrabold text-brand-cyan">
                {formatCurrency(pricing.finalTotal)}
              </span>
            </div>
          </div>

          <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg flex items-center gap-2.5 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Instant instant confirmation with free cancellation up to 24h before check-in.</span>
          </div>
        </div>
      )}

      {/* STEP 5: CONFIRMATION SUCCESS */}
      {step === 5 && confirmedReservation && (
        <div className="py-4 space-y-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-blue">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-txt-main">Reservation Confirmed!</h3>
            <p className="text-xs text-txt-secondary mt-1">
              A confirmation email and receipt have been dispatched to {guestData.email}.
            </p>
          </div>

          {/* Key Confirmation Card */}
          <div className="bg-bg-secondary border border-border-dark rounded-xl p-5 text-left space-y-3 max-w-md mx-auto">
            <div className="flex justify-between items-center pb-3 border-b border-border-dark">
              <span className="text-xs text-txt-muted">Reservation ID</span>
              <span className="font-mono text-sm font-bold text-brand-cyan">#{confirmedReservation.id}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-txt-muted block">Guest</span>
                <span className="font-semibold text-txt-main">{confirmedReservation.guestName}</span>
              </div>
              <div>
                <span className="text-txt-muted block">Room</span>
                <span className="font-semibold text-txt-main">Room {confirmedReservation.roomNumber} ({selectedRoom.type})</span>
              </div>
              <div>
                <span className="text-txt-muted block">Check-in</span>
                <span className="font-semibold text-txt-main">{formatShortDate(confirmedReservation.checkIn)} (2 PM)</span>
              </div>
              <div>
                <span className="text-txt-muted block">Check-out</span>
                <span className="font-semibold text-txt-main">{formatShortDate(confirmedReservation.checkOut)} (11 AM)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border-dark flex justify-between items-center">
              <span className="text-xs text-txt-muted">Total Paid</span>
              <span className="text-sm font-bold text-emerald-400">{formatCurrency(confirmedReservation.totalAmount)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              icon={Receipt}
              onClick={() => {
                handleResetAndClose();
                if (onOpenInvoice) onOpenInvoice(confirmedReservation);
              }}
            >
              Download / View Invoice
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleResetAndClose}
            >
              Done
            </Button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      {step < 5 && (
        <div className="mt-6 pt-4 border-t border-border-dark flex items-center justify-between">
          {step > 1 ? (
            <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={handleBack}>
              Back
            </Button>
          ) : <div />}

          {step < 4 ? (
            <Button variant="primary" size="sm" iconRight={ArrowRight} onClick={handleNext}>
              Continue
            </Button>
          ) : (
            <Button variant="cyan" size="md" icon={CheckCircle2} onClick={handleConfirmReservation}>
              Confirm & Book ({pricing ? formatCurrency(pricing.finalTotal) : ''})
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default BookingModal;
