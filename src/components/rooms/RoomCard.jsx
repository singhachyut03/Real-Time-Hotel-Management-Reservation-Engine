import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Bed, Maximize, Star, Check, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const RoomCard = ({
  room,
  onBookNow,
  nights = 1,
  pricing
}) => {
  const pricePerNight = pricing ? pricing.effectivePricePerNight : room.basePrice;
  const totalPrice = pricing ? pricing.finalTotal : Math.round(room.basePrice * nights * 1.18 + 500);

  // Key facilities to highlight on the card
  const highlights = room.facilities.slice(0, 5);

  return (
    <div className="group bg-bg-card border border-border-dark hover:border-brand-blue/40 rounded-xl overflow-hidden shadow-card hover:shadow-glow-blue transition-all duration-200 flex flex-col md:flex-row">
      {/* Room Image Container */}
      <div className="relative md:w-72 lg:w-80 shrink-0 h-56 md:h-auto overflow-hidden bg-bg-secondary">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent md:hidden" />
        
        {/* Availability / Tag Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <Badge status={room.status} size="xs" />
          {room.status === 'Available' && (
            <span className="bg-bg-primary/90 backdrop-blur-md text-brand-cyan text-[10px] font-semibold px-2 py-0.5 rounded-full border border-brand-cyan/30">
              Only 2 rooms left
            </span>
          )}
        </div>

        {room.breakfastIncluded && (
          <div className="absolute bottom-3 left-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-medium px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Breakfast Included</span>
          </div>
        )}
      </div>

      {/* Room Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Top meta & title */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-semibold text-brand-cyan uppercase tracking-wider">
                {room.type}
              </span>
              <h3 className="text-base font-bold text-txt-main hover:text-brand-blue transition-colors">
                <Link to={`/rooms/${room.roomNumber}`}>
                  {room.name}
                </Link>
              </h3>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 bg-bg-secondary px-2 py-1 rounded-md border border-border-dark shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-txt-main">{room.rating}</span>
              <span className="text-[10px] text-txt-muted">({room.reviewsCount})</span>
            </div>
          </div>

          {/* Quick Specs: Guests, Bed, Size */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-txt-secondary border-y border-border-dark/60 py-2">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-blue" />
              <span>{room.capacity} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-brand-blue" />
              <span>{room.bedType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5 text-brand-blue" />
              <span>{room.size} m²</span>
            </div>
          </div>

          {/* Facilities bullet list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-3 text-xs text-txt-secondary">
            {highlights.map((facility, idx) => (
              <div key={idx} className="flex items-center gap-1.5 truncate">
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{facility}</span>
              </div>
            ))}
          </div>

          {/* Policies note */}
          <div className="mt-3 flex items-center gap-3 text-[11px] text-txt-muted">
            {room.freeCancellation && (
              <span className="text-emerald-400 font-medium">✓ Free cancellation</span>
            )}
            <span>• Pay at hotel or online</span>
          </div>
        </div>

        {/* Pricing & CTA footer */}
        <div className="mt-4 pt-3 border-t border-border-dark flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-txt-main">
                {formatCurrency(pricePerNight)}
              </span>
              <span className="text-xs text-txt-muted">/ night</span>
            </div>
            <p className="text-[11px] text-txt-secondary">
              Total {formatCurrency(totalPrice)} for {nights} night{nights > 1 ? 's' : ''} (incl. taxes & fees)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/rooms/${room.roomNumber}`}>
              <Button variant="outline" size="sm">
                View Room
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              disabled={room.status !== 'Available'}
              onClick={() => onBookNow && onBookNow(room)}
            >
              {room.status === 'Available' ? 'Book Now' : room.status}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
