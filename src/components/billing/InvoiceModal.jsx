import React, { useRef } from 'react';
import { Modal } from '../common/Modal';
import Button from '../common/Button';
import { formatCurrency, formatShortDate } from '../../utils/formatters';
import { HOTEL_INFO } from '../../data/seedData';
import { Printer, Download, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const InvoiceModal = ({
  isOpen,
  onClose,
  reservation
}) => {
  const invoiceRef = useRef();

  if (!isOpen || !reservation) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate simple text-based / data download or trigger print-to-pdf dialog
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Guest Invoice"
      subtitle={`Tax Invoice #${reservation.id || 'STY4821'}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-6" ref={invoiceRef}>
        {/* Printable Invoice Container */}
        <div className="bg-bg-secondary border border-border-dark rounded-xl p-6 shadow-card">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border-dark pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-cyan-400 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-bg-primary stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-wider text-txt-main">
                  STAY<span className="text-brand-cyan">OPS</span>
                </h2>
                <p className="text-[10px] text-txt-muted uppercase tracking-widest">{HOTEL_INFO.name}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-txt-muted block">INVOICE</span>
              <span className="text-base font-bold text-brand-cyan font-mono">#{reservation.id}</span>
              <span className="text-[10px] text-txt-muted block mt-0.5">Date: {new Date().toLocaleDateString('en-GB')}</span>
            </div>
          </div>

          {/* Hotel & Guest Details Row */}
          <div className="grid grid-cols-2 gap-4 py-4 border-b border-border-dark text-xs">
            <div>
              <span className="text-txt-muted block mb-1 uppercase font-semibold text-[10px]">Billed To:</span>
              <p className="font-bold text-txt-main text-sm">{reservation.guestName}</p>
              <p className="text-txt-secondary">{reservation.guestEmail}</p>
              <p className="text-txt-secondary">{reservation.guestPhone}</p>
            </div>

            <div className="text-right">
              <span className="text-txt-muted block mb-1 uppercase font-semibold text-[10px]">Stay Details:</span>
              <p className="font-bold text-txt-main">Room {reservation.roomNumber} ({reservation.roomType})</p>
              <p className="text-txt-secondary">
                {formatShortDate(reservation.checkIn)} – {formatShortDate(reservation.checkOut)}
              </p>
              <div className="inline-flex items-center gap-1 text-emerald-400 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">Payment: {reservation.paymentStatus || 'Paid'}</span>
              </div>
            </div>
          </div>

          {/* Itemized Charges Table */}
          <div className="py-4 space-y-2 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-border-dark/60 font-semibold text-txt-muted text-[10px] uppercase">
              <span>Description</span>
              <span>Amount</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-txt-main">Room Charges</span>
              <span className="font-semibold text-txt-main">{formatCurrency(reservation.roomCharges)}</span>
            </div>

            {/* Addons */}
            {reservation.addOns && reservation.addOns.map((addon, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="text-txt-secondary">{addon.name}</span>
                <span className="font-semibold text-txt-secondary">+{formatCurrency(addon.cost)}</span>
              </div>
            ))}

            <div className="flex justify-between items-center py-1">
              <span className="text-txt-secondary">Service Fee</span>
              <span className="font-semibold text-txt-secondary">+{formatCurrency(reservation.serviceFee || 500)}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-txt-secondary">GST / Government Tax (18%)</span>
              <span className="font-semibold text-txt-secondary">+{formatCurrency(reservation.taxAmount)}</span>
            </div>

            {/* Total */}
            <div className="pt-3 mt-2 border-t-2 border-border-dark flex justify-between items-center">
              <div>
                <span className="text-sm font-bold text-txt-main block">TOTAL AMOUNT</span>
                <span className="text-[10px] text-txt-muted font-mono">GSTIN: {HOTEL_INFO.gstin}</span>
              </div>
              <span className="text-xl font-extrabold text-brand-cyan">
                {formatCurrency(reservation.totalAmount)}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-dark text-[11px] text-txt-muted text-center">
            Thank you for staying with StayOps Grand & Suites. We hope you enjoy your time with us!
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" size="md" icon={Printer} onClick={handlePrint}>
            Print Invoice
          </Button>
          <Button variant="primary" size="md" icon={Download} onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceModal;
