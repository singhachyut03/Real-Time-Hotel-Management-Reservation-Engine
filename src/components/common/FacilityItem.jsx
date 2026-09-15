import React from 'react';
import {
  Wifi,
  Wind,
  Tv,
  Refrigerator,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  Bath,
  Scissors,
  Shirt,
  ShieldCheck,
  Laptop,
  Sun,
  Eye,
  Waves,
  Dumbbell,
  Car,
  Check
} from 'lucide-react';

const FACILITY_ICONS = {
  'Free Wi-Fi': Wifi,
  'Wi-Fi': Wifi,
  'Air Conditioning': Wind,
  'Smart TV': Tv,
  'Mini Fridge': Refrigerator,
  'Tea/Coffee Maker': Coffee,
  'Room Service': UtensilsCrossed,
  'Daily Housekeeping': Sparkles,
  'Housekeeping': Sparkles,
  'Private Bathroom': Bath,
  'Bathtub': Bath,
  'Hair Dryer': Scissors,
  'Wardrobe': Shirt,
  'Safe': ShieldCheck,
  'Work Desk': Laptop,
  'Balcony': Sun,
  'City View': Eye,
  'Pool Access': Waves,
  'Gym Access': Dumbbell,
  'Breakfast': Coffee,
  'Complimentary Breakfast': Coffee,
  'Parking': Car
};

export const getFacilityIcon = (facilityName) => {
  return FACILITY_ICONS[facilityName] || Check;
};

export const FacilityItem = ({ name, showText = true, className = '' }) => {
  const Icon = getFacilityIcon(name);

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs text-txt-secondary ${className}`} title={name}>
      <Icon className="w-3.5 h-3.5 text-brand-blue shrink-0" />
      {showText && <span>{name}</span>}
    </div>
  );
};

export default FacilityItem;
