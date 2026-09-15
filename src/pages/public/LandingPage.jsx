import React from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import {
  BedDouble,
  CalendarCheck,
  Users,
  Receipt,
  Sparkles,
  Wrench,
  Star,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  CheckCircle2
} from 'lucide-react';
import Button from '../../components/common/Button';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import { HOTEL_IMAGES } from '../../data/seedData';
import { formatCurrency } from '../../utils/formatters';

export const LandingPage = () => {
  const { rooms } = useHotel();

  // Pick 3-4 representative room cards for showcase
  const featuredRooms = rooms.slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <PublicNavbar />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-blue/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                <span>Next-Generation Hotel Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-txt-main leading-[1.15]">
                Everything your hotel needs, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">in one place.</span>
              </h1>

              <p className="text-base sm:text-lg text-txt-secondary leading-relaxed max-w-xl">
                Manage rooms, reservations, guests and daily hotel operations through one simple workspace.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/rooms">
                  <Button variant="primary" size="lg" iconRight={ArrowRight}>
                    Explore Rooms
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="secondary" size="lg">
                    Open Dashboard
                  </Button>
                </Link>
              </div>

              {/* Quick trust metrics */}
              <div className="pt-6 border-t border-border-dark flex items-center gap-8 text-xs text-txt-muted">
                <div>
                  <span className="text-lg font-bold text-txt-main block">50+</span>
                  <span>Curated Rooms</span>
                </div>
                <div className="h-8 w-px bg-border-dark" />
                <div>
                  <span className="text-lg font-bold text-txt-main block">100%</span>
                  <span>Real-Time Sync</span>
                </div>
                <div className="h-8 w-px bg-border-dark" />
                <div>
                  <span className="text-lg font-bold text-txt-main block">4.9 ★</span>
                  <span>Guest Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Showcase */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-border-dark shadow-2xl bg-bg-secondary group">
                <img
                  src={HOTEL_IMAGES.hero}
                  alt="Luxury Hotel Suite"
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-black/30" />

                {/* Floating Preview Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl glass-panel border-border-dark text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-cyan">Featured Suite</span>
                    <h4 className="text-sm font-bold text-txt-main">Presidential Waterfront Suite</h4>
                    <p className="text-txt-muted mt-0.5">Panoramic sea views & private terrace</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-brand-cyan">₹16,500</span>
                    <span className="text-[10px] text-txt-muted block">per night</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE OUR ROOMS SECTION */}
      <section className="py-20 bg-bg-secondary/40 border-y border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
                Accommodations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-txt-main mt-1">
                Explore Our Rooms
              </h2>
              <p className="text-sm text-txt-secondary mt-1 max-w-lg">
                Thoughtfully appointed spaces designed for rejuvenating comfort, productivity, and modern luxury.
              </p>
            </div>
            <Link to="/rooms">
              <Button variant="outline" size="sm" iconRight={ArrowRight}>
                View All Available Rooms
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-bg-card border border-border-dark hover:border-brand-blue/50 rounded-xl overflow-hidden flex flex-col group shadow-card transition-all duration-200"
              >
                <div className="relative h-48 overflow-hidden bg-bg-secondary">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-bg-primary/90 backdrop-blur-md px-2 py-0.5 rounded text-xs font-semibold text-txt-main">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{room.rating}</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-blue text-white px-2 py-0.5 rounded">
                      {room.type}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-txt-main group-hover:text-brand-blue transition-colors truncate">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-txt-secondary mt-2">
                      <span>{room.capacity} Guests</span>
                      <span>•</span>
                      <span>{room.bedType}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {room.facilities.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded bg-bg-secondary border border-border-dark text-txt-muted truncate"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-dark flex items-center justify-between">
                    <div>
                      <span className="text-xs text-txt-muted block">Starting at</span>
                      <span className="text-base font-bold text-txt-main">{formatCurrency(room.basePrice)}</span>
                      <span className="text-[10px] text-txt-muted"> / night</span>
                    </div>
                    <Link to={`/rooms/${room.roomNumber}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY STAYOPS SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
              Core Platform
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-txt-main mt-1">
              Why StayOps?
            </h2>
            <p className="text-sm text-txt-secondary mt-2">
              Engineered from the ground up for modern boutique hotels, resorts, and premium hospitality chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Real-Time Room Management',
                desc: 'Visual grid tracking 50+ rooms across 5 floors with automated status lifecycles from Available to Occupied and Cleaning.',
                icon: BedDouble,
                accent: 'text-brand-blue',
                bg: 'bg-brand-blue/10'
              },
              {
                title: 'Smart Reservations',
                desc: 'A seamless 5-step booking flow with multi-criteria search, dynamic price breakdown, and instant reservation IDs.',
                icon: CalendarCheck,
                accent: 'text-brand-cyan',
                bg: 'bg-brand-cyan/10'
              },
              {
                title: 'Easy Guest Management',
                desc: 'Centralized guest profiles with VIP tagging, historical stays, total spend metrics, and bespoke room preferences.',
                icon: Users,
                accent: 'text-purple-400',
                bg: 'bg-purple-500/10'
              },
              {
                title: 'Automated Billing',
                desc: 'Instant generation of itemized tax invoices with GST calculation, add-on tallies, and one-click PDF printing.',
                icon: Receipt,
                accent: 'text-emerald-400',
                bg: 'bg-emerald-500/10'
              }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-bg-card border border-border-dark hover:border-brand-blue/40 shadow-card hover:shadow-glow-blue transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${feat.accent}`} />
                  </div>
                  <h3 className="text-base font-bold text-txt-main mb-2">{feat.title}</h3>
                  <p className="text-xs text-txt-secondary leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EVERYTHING YOUR TEAM NEEDS SECTION */}
      <section className="py-20 bg-bg-secondary/30 border-t border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
              Unified Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-txt-main mt-1">
              Everything your team needs
            </h2>
            <p className="text-sm text-txt-secondary mt-2">
              Cross-functional workflows uniting front desk, housekeeping, engineering, and finance in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Housekeeping Section */}
            <div className="p-6 rounded-xl bg-bg-card border border-border-dark flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-txt-main">Housekeeping Kanban</h3>
                    <p className="text-xs text-txt-secondary">Automated room turnover pipelines</p>
                  </div>
                </div>
                <p className="text-xs text-txt-secondary leading-relaxed mb-4">
                  Check-outs instantly trigger tasks across 4 workflow columns: Needs Cleaning, In Progress, Inspection, and Ready. Reassign staff and certify rooms clean with one click.
                </p>
              </div>
              <Link to="/housekeeping" className="text-xs text-brand-cyan hover:underline flex items-center gap-1 font-semibold">
                <span>View Housekeeping Board</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Maintenance Section */}
            <div className="p-6 rounded-xl bg-bg-card border border-border-dark flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-txt-main">Maintenance Tracker</h3>
                    <p className="text-xs text-txt-secondary">Fast issue resolution & room lockdowns</p>
                  </div>
                </div>
                <p className="text-xs text-txt-secondary leading-relaxed mb-4">
                  Report issues from plumbing to HVAC. Mark rooms as out-of-order, log repair parts, and automatically return repaired rooms to housekeeping before re-opening.
                </p>
              </div>
              <Link to="/maintenance" className="text-xs text-brand-cyan hover:underline flex items-center gap-1 font-semibold">
                <span>View Maintenance Tracker</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Reservations Section */}
            <div className="p-6 rounded-xl bg-bg-card border border-border-dark flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-brand-blue/10 text-brand-blue">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-txt-main">Reservations Control</h3>
                    <p className="text-xs text-txt-secondary">One-click guest check-in & check-out</p>
                  </div>
                </div>
                <p className="text-xs text-txt-secondary leading-relaxed mb-4">
                  Filter by Today, Upcoming, Checked-in, and Completed. Slide-over drawers give immediate visibility into stay duration, contact info, and special preferences.
                </p>
              </div>
              <Link to="/reservations" className="text-xs text-brand-cyan hover:underline flex items-center gap-1 font-semibold">
                <span>View Reservations</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Billing Section */}
            <div className="p-6 rounded-xl bg-bg-card border border-border-dark flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-txt-main">Billing & Invoicing</h3>
                    <p className="text-xs text-txt-secondary">Accurate tax invoices & payment logs</p>
                  </div>
                </div>
                <p className="text-xs text-txt-secondary leading-relaxed mb-4">
                  Consolidated revenue reporting with itemized breakdown of base room charges, add-on dining, airport transfers, and 18% GST with ready-to-print invoices.
                </p>
              </div>
              <Link to="/billing" className="text-xs text-brand-cyan hover:underline flex items-center gap-1 font-semibold">
                <span>View Billing Center</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-bg-secondary via-bg-card to-bg-secondary border-t border-border-dark">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-txt-main">
            Ready to experience effortless hotel management?
          </h2>
          <p className="text-sm text-txt-secondary max-w-xl mx-auto">
            Explore live rooms, simulate bookings, and experience real-time room lifecycle transitions.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/rooms">
              <Button variant="primary" size="md">
                Browse Rooms Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="md">
                Launch Operations Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default LandingPage;
