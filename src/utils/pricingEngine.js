/**
 * StayOps Dynamic Pricing Engine
 * Calculates room price based on Base Price, Seasonality, Weekend Surges, Current Hotel Occupancy, and Add-ons.
 */

export const calculateRoomPricing = ({
  basePrice = 5000,
  checkInDate,
  checkOutDate,
  currentOccupancyRate = 0.84, // e.g. 84%
  selectedAddOns = [],
  taxRate = 0.18, // 18% GST standard hotel tax
  serviceFee = 500,
  numberOfGuests = 2,
  numberOfRooms = 1
}) => {
  // 1. Calculate number of nights
  const inDate = checkInDate ? new Date(checkInDate) : new Date();
  const outDate = checkOutDate ? new Date(checkOutDate) : new Date(inDate.getTime() + 24 * 60 * 60 * 1000);
  
  let nights = Math.max(1, Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24)));
  if (isNaN(nights) || nights < 1) nights = 1;

  // 2. Determine weekend presence in the stay
  let weekendNightsCount = 0;
  let currentDate = new Date(inDate);
  for (let i = 0; i < nights; i++) {
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
      weekendNightsCount++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const isWeekendStay = weekendNightsCount > 0;
  const weekendRatio = weekendNightsCount / nights;
  
  // 3. Multipliers
  // Weekend multiplier: +15% on weekend nights
  const weekendSurchargePercent = 0.15;
  const weekendAdjustment = Math.round(basePrice * weekendSurchargePercent * weekendRatio * nights * numberOfRooms);

  // Occupancy multiplier: if hotel occupancy > 80%, +20% demand surge; if > 90%, +30%
  let occupancySurchargePercent = 0;
  let demandReason = '';
  if (currentOccupancyRate >= 0.85) {
    occupancySurchargePercent = 0.20; // 20% surge
    demandReason = `High hotel occupancy (${Math.round(currentOccupancyRate * 100)}%) increased the room rate by 20%.`;
  } else if (currentOccupancyRate >= 0.70) {
    occupancySurchargePercent = 0.10; // 10% surge
    demandReason = `Moderate demand (${Math.round(currentOccupancyRate * 100)}% occupancy) added a 10% peak surge.`;
  } else {
    demandReason = `Standard seasonal rate with standard room availability.`;
  }

  const demandAdjustment = Math.round(basePrice * occupancySurchargePercent * nights * numberOfRooms);

  // Season multiplier (e.g., current month is peak tourist season)
  const currentMonth = inDate.getMonth(); // 0-11
  // Oct to Feb = Peak tourist season (+10%), June-Aug = Monsoon (-5%)
  let seasonSurchargePercent = 0;
  let seasonReason = 'Standard Season';
  if ([9, 10, 11, 0, 1].includes(currentMonth)) {
    seasonSurchargePercent = 0.10;
    seasonReason = 'Peak Travel Season (+10%)';
  }

  const seasonAdjustment = Math.round(basePrice * seasonSurchargePercent * nights * numberOfRooms);

  // Base total for all rooms & nights
  const rawBaseTotal = basePrice * nights * numberOfRooms;

  // Effective room rate per night
  const adjustedRoomTotal = rawBaseTotal + weekendAdjustment + demandAdjustment + seasonAdjustment;
  const effectivePricePerNight = Math.round(adjustedRoomTotal / (nights * numberOfRooms));

  // 4. Add-ons breakdown
  let addOnsTotal = 0;
  const itemizedAddOns = selectedAddOns.map(addon => {
    let cost = 0;
    if (addon.id === 'breakfast') {
      cost = 800 * numberOfGuests * nights; // ₹800/guest/night
    } else if (addon.id === 'extra-bed') {
      cost = 1000 * nights; // ₹1,000/night
    } else if (addon.id === 'airport-transfer') {
      cost = 1500; // Flat one-way
    } else if (addon.id === 'late-checkout') {
      cost = 1200; // Flat late checkout fee
    } else if (addon.id === 'room-service-pack') {
      cost = 2000; // Dining voucher package
    } else {
      cost = addon.price || 0;
    }
    addOnsTotal += cost;
    return {
      id: addon.id,
      name: addon.name,
      cost,
    };
  });

  // 5. Taxes and final sum
  const taxableAmount = adjustedRoomTotal + addOnsTotal + serviceFee;
  const taxAmount = Math.round(taxableAmount * taxRate);
  const finalTotal = taxableAmount + taxAmount;

  // Explanations for why the price changed
  const rationaleList = [];
  if (weekendAdjustment > 0) {
    rationaleList.push(`Weekend surge increased the rate by ${(weekendSurchargePercent * 100)}% for ${weekendNightsCount} weekend night(s).`);
  }
  if (demandAdjustment > 0) {
    rationaleList.push(demandReason);
  }
  if (seasonAdjustment > 0) {
    rationaleList.push(`Seasonal holiday adjustment (+${seasonSurchargePercent * 100}%).`);
  }
  if (rationaleList.length === 0) {
    rationaleList.push('Standard base rate applied without surge pricing.');
  }

  return {
    nights,
    numberOfRooms,
    basePrice,
    rawBaseTotal,
    effectivePricePerNight,
    weekendAdjustment,
    demandAdjustment,
    seasonAdjustment,
    adjustedRoomTotal,
    itemizedAddOns,
    addOnsTotal,
    serviceFee,
    taxRatePercent: Math.round(taxRate * 100),
    taxAmount,
    finalTotal,
    rationale: rationaleList,
    primaryReason: rationaleList[0]
  };
};

export const AVAILABLE_ADDONS = [
  {
    id: 'breakfast',
    name: 'Gourmet Buffet Breakfast',
    description: 'Fresh artisanal breakfast buffet served daily in the Azure Dining Room.',
    priceLabel: '₹800 / guest / night',
    category: 'Dining'
  },
  {
    id: 'airport-transfer',
    name: 'Chauffeured Airport Transfer',
    description: 'Private luxury sedan pickup or drop-off with meet & greet.',
    priceLabel: '₹1,500 one-way',
    category: 'Travel'
  },
  {
    id: 'extra-bed',
    name: 'Extra Rollaway Bed & Linens',
    description: 'Premium orthopaedic extra mattress with luxury bedding.',
    priceLabel: '₹1,000 / night',
    category: 'Room'
  },
  {
    id: 'late-checkout',
    name: 'Guaranteed Late Check-out (until 4 PM)',
    description: 'Enjoy a leisurely departure without morning rush.',
    priceLabel: '₹1,200 flat',
    category: 'Convenience'
  },
  {
    id: 'room-service-pack',
    name: 'All-Day Dining Credit (₹2,500 Value)',
    description: 'Pre-purchase dining credits for room service or lounge bar.',
    priceLabel: '₹2,000 (Save ₹500)',
    category: 'Dining'
  }
];
