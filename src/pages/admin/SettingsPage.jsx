import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import Button from '../../components/common/Button';
import {
  Settings,
  Building2,
  DollarSign,
  RefreshCw,
  Save,
  ShieldAlert,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const SettingsPage = () => {
  const { hotelSettings, setHotelSettings, resetToDemoData, addToast } = useHotel();

  const [formSettings, setFormSettings] = useState({ ...hotelSettings });
  const [pricingMultipliers, setPricingMultipliers] = useState({
    weekendSurge: 15, // %
    occupancySurge: 20, // %
    taxGst: 18, // %
    serviceFee: 500, // ₹
    breakfastRate: 800, // ₹
    extraBedRate: 1000 // ₹
  });

  const handleSaveHotelProfile = (e) => {
    e.preventDefault();
    setHotelSettings(formSettings);
    addToast('Hotel profile configuration saved successfully.');
  };

  const handleSavePricing = (e) => {
    e.preventDefault();
    addToast('Dynamic pricing engine rules updated.');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-txt-main flex items-center gap-2">
          System & Hotel Settings
        </h1>
        <p className="text-xs text-txt-secondary mt-1">
          Configure property metadata, dynamic pricing rules, operational check-in windows, and demo state.
        </p>
      </div>

      {/* HOTEL PROFILE SETTINGS */}
      <div className="bg-bg-card border border-border-dark rounded-xl p-6 shadow-card space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-border-dark">
          <Building2 className="w-5 h-5 text-brand-blue" />
          <div>
            <h2 className="text-sm font-bold text-txt-main uppercase tracking-wider">Property Details</h2>
            <p className="text-xs text-txt-secondary">Used across guest bookings, confirmation emails, and tax invoices.</p>
          </div>
        </div>

        <form onSubmit={handleSaveHotelProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Hotel Property Name</label>
              <input
                type="text"
                value={formSettings.name}
                onChange={(e) => setFormSettings({ ...formSettings, name: e.target.value })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">GSTIN / Tax ID</label>
              <input
                type="text"
                value={formSettings.gstin}
                onChange={(e) => setFormSettings({ ...formSettings, gstin: e.target.value })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Street Address</label>
              <input
                type="text"
                value={formSettings.address}
                onChange={(e) => setFormSettings({ ...formSettings, address: e.target.value })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Concierge Phone</label>
              <input
                type="text"
                value={formSettings.phone}
                onChange={(e) => setFormSettings({ ...formSettings, phone: e.target.value })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Official Email</label>
              <input
                type="email"
                value={formSettings.email}
                onChange={(e) => setFormSettings({ ...formSettings, email: e.target.value })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Standard Check-in Time</label>
              <input
                type="text"
                value={formSettings.checkInTime}
                onChange={(e) => setFormSettings({ ...formSettings, checkInTime: e.target.value })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Standard Check-out Time</label>
              <input
                type="text"
                value={formSettings.checkOutTime}
                onChange={(e) => setFormSettings({ ...formSettings, checkOutTime: e.target.value })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="sm" type="submit" icon={Save}>
              Save Property Profile
            </Button>
          </div>
        </form>
      </div>

      {/* DYNAMIC PRICING ENGINE RULES */}
      <div className="bg-bg-card border border-border-dark rounded-xl p-6 shadow-card space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-border-dark">
          <Sliders className="w-5 h-5 text-brand-cyan" />
          <div>
            <h2 className="text-sm font-bold text-txt-main uppercase tracking-wider">Dynamic Pricing Engine</h2>
            <p className="text-xs text-txt-secondary">Adjust algorithmic multipliers, weekend premiums, and standard add-on charges.</p>
          </div>
        </div>

        <form onSubmit={handleSavePricing} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Weekend Surge (%)</label>
              <input
                type="number"
                value={pricingMultipliers.weekendSurge}
                onChange={(e) => setPricingMultipliers({ ...pricingMultipliers, weekendSurge: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">High Occupancy Surge (%)</label>
              <input
                type="number"
                value={pricingMultipliers.occupancySurge}
                onChange={(e) => setPricingMultipliers({ ...pricingMultipliers, occupancySurge: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">GST Tax Rate (%)</label>
              <input
                type="number"
                value={pricingMultipliers.taxGst}
                onChange={(e) => setPricingMultipliers({ ...pricingMultipliers, taxGst: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Service Fee (₹)</label>
              <input
                type="number"
                value={pricingMultipliers.serviceFee}
                onChange={(e) => setPricingMultipliers({ ...pricingMultipliers, serviceFee: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Breakfast Rate / Guest (₹)</label>
              <input
                type="number"
                value={pricingMultipliers.breakfastRate}
                onChange={(e) => setPricingMultipliers({ ...pricingMultipliers, breakfastRate: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Extra Bed / Night (₹)</label>
              <input
                type="number"
                value={pricingMultipliers.extraBedRate}
                onChange={(e) => setPricingMultipliers({ ...pricingMultipliers, extraBedRate: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="sm" type="submit" icon={Save}>
              Save Pricing Multipliers
            </Button>
          </div>
        </form>
      </div>

      {/* DEMO DATA RESTORATION / RESET */}
      <div className="bg-bg-card border border-rose-500/20 rounded-xl p-6 shadow-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border-dark">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <div>
            <h2 className="text-sm font-bold text-txt-main uppercase tracking-wider">Demo Data Reset</h2>
            <p className="text-xs text-txt-secondary">Restore the initial dataset of 50 rooms, 20+ reservations, and 15+ guests.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-txt-muted max-w-md">
            Wipes local modifications from your browser's LocalStorage and cleanly re-seeds default hotel data.
          </p>
          <Button
            variant="danger"
            size="sm"
            icon={RefreshCw}
            onClick={resetToDemoData}
          >
            Reset All Demo Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
