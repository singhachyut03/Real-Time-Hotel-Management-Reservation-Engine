import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import {
  Wrench,
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  User
} from 'lucide-react';

export const MaintenancePage = () => {
  const {
    maintenanceIssues,
    rooms,
    reportMaintenanceIssue,
    updateMaintenanceStatus,
    addToast
  } = useHotel();

  const [activeFilter, setActiveFilter] = useState('All');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // New Issue Form State
  const [formData, setFormData] = useState({
    roomNumber: '204',
    issue: '',
    priority: 'High',
    assignedTo: 'HVAC & Electrical Team',
    notes: ''
  });

  const filters = ['All', 'High Priority', 'Medium', 'Low', 'Resolved'];

  const filteredIssues = useMemo(() => {
    return maintenanceIssues.filter(issue => {
      if (activeFilter === 'Resolved') return issue.status === 'Resolved';
      if (activeFilter === 'High Priority') return issue.priority === 'High' && issue.status !== 'Resolved';
      if (activeFilter === 'Medium') return issue.priority === 'Medium' && issue.status !== 'Resolved';
      if (activeFilter === 'Low') return issue.priority === 'Low' && issue.status !== 'Resolved';
      return true;
    });
  }, [maintenanceIssues, activeFilter]);

  const handleSubmitIssue = (e) => {
    e.preventDefault();
    if (!formData.issue.trim()) return;

    reportMaintenanceIssue({
      roomNumber: formData.roomNumber,
      issue: formData.issue,
      priority: formData.priority,
      assignedTo: formData.assignedTo,
      notes: formData.notes
    });

    setReportModalOpen(false);
    setFormData({
      roomNumber: '101',
      issue: '',
      priority: 'High',
      assignedTo: 'HVAC & Electrical Team',
      notes: ''
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-txt-main flex items-center gap-2">
            Maintenance & Engineering
            <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
              {filteredIssues.length} Tickets
            </span>
          </h1>
          <p className="text-xs text-txt-secondary mt-1">
            Track equipment repairs, safety work orders, and lockdown rooms until certified fit for occupancy.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setReportModalOpen(true)}
        >
          Report Issue
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-bg-card border border-border-dark rounded-xl p-4 shadow-card flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                activeFilter === f
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-bg-secondary text-txt-secondary hover:text-txt-main hover:bg-bg-hover border border-border-dark'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ISSUES GRID */}
      {filteredIssues.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="No maintenance tickets"
          description="All rooms are fully operational and within service specifications."
          actionLabel="Clear Filter"
          onAction={() => setActiveFilter('All')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIssues.map(issue => {
            const isResolved = issue.status === 'Resolved';

            return (
              <div
                key={issue.id}
                className="bg-bg-card border border-border-dark hover:border-brand-blue/40 rounded-xl p-5 shadow-card hover:shadow-glow-blue transition-all flex flex-col justify-between group space-y-4"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-sm font-black text-txt-main">
                        Room {issue.roomNumber}
                      </span>
                      <span className="text-[11px] text-txt-muted block">{issue.roomType}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        issue.priority === 'High'
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : issue.priority === 'Medium'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      }`}>
                        {issue.priority}
                      </span>
                      <Badge status={issue.status} size="xs" />
                    </div>
                  </div>

                  {/* Issue description */}
                  <div className="mt-3">
                    <h4 className="text-sm font-bold text-txt-main leading-snug">
                      {issue.issue}
                    </h4>
                    {issue.notes && (
                      <p className="text-xs text-txt-secondary mt-1 italic">
                        "{issue.notes}"
                      </p>
                    )}
                  </div>

                  {/* Details */}
                  <div className="mt-4 pt-3 border-t border-border-dark/60 space-y-1.5 text-xs text-txt-secondary">
                    <div className="flex items-center justify-between">
                      <span className="text-txt-muted">Assigned:</span>
                      <span className="font-medium text-txt-main">{issue.assignedTo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-txt-muted">Reported:</span>
                      <span>{issue.reportedAt}</span>
                    </div>
                    {issue.partsNeeded && (
                      <div className="flex items-center justify-between">
                        <span className="text-txt-muted">Parts:</span>
                        <span className="text-brand-cyan">{issue.partsNeeded}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-border-dark flex items-center justify-between gap-2">
                  {!isResolved ? (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs flex-1"
                        onClick={() => {
                          const next = issue.status === 'Reported' ? 'In Progress' : 'Resolved';
                          updateMaintenanceStatus(issue.id, next);
                        }}
                      >
                        {issue.status === 'Reported' ? 'Start Repair' : 'Mark Resolved'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedIssue(issue)}
                      >
                        Details
                      </Button>
                    </>
                  ) : (
                    <div className="w-full text-center text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5 py-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Issue Resolved & Cleared</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* REPORT ISSUE MODAL */}
      <Modal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        title="Report Maintenance Issue"
        subtitle="Lock down room and dispatch engineering service ticket"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmitIssue} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-txt-secondary mb-1">Room Number *</label>
            <select
              value={formData.roomNumber}
              onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
              className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
            >
              {rooms.map(r => (
                <option key={r.id} value={r.roomNumber}>
                  Room {r.roomNumber} ({r.type} - Current: {r.status})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-txt-secondary mb-1">Issue Description *</label>
            <input
              type="text"
              required
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              placeholder="e.g. AC cooling low, bathroom faucet leak..."
              className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
              >
                <option value="High">High (Immediate Lockdown)</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1">Assigned Team</label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none"
              >
                <option value="HVAC & Electrical Team">HVAC & Electrical</option>
                <option value="Plumbing Specialists">Plumbing Specialists</option>
                <option value="AV & Smart Systems">AV & Smart Systems</option>
                <option value="Carpentry & Hardware">Carpentry & Hardware</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-txt-secondary mb-1">Additional Diagnostic Notes</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Parts required, suspected cause, guest feedback..."
              className="w-full px-3 py-2 bg-bg-secondary border border-border-dark rounded-lg text-xs text-txt-main focus:border-brand-blue focus:outline-none resize-none"
            />
          </div>

          <div className="pt-3 border-t border-border-dark flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setReportModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" type="submit">
              Lockdown & Report
            </Button>
          </div>
        </form>
      </Modal>

      {/* ISSUE DETAILS MODAL */}
      {selectedIssue && (
        <Modal
          isOpen={!!selectedIssue}
          onClose={() => setSelectedIssue(null)}
          title={`Ticket #${selectedIssue.id}`}
          subtitle={`Room ${selectedIssue.roomNumber} (${selectedIssue.roomType})`}
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-bg-secondary border border-border-dark space-y-2">
              <span className="font-semibold text-txt-muted uppercase text-[10px]">Problem Summary:</span>
              <p className="font-bold text-txt-main text-sm">{selectedIssue.issue}</p>
              {selectedIssue.notes && <p className="text-txt-secondary italic">"{selectedIssue.notes}"</p>}
            </div>

            <div className="grid grid-cols-2 gap-2 text-txt-secondary">
              <div>Status: <span className="font-bold text-txt-main">{selectedIssue.status}</span></div>
              <div>Priority: <span className="font-bold text-rose-400">{selectedIssue.priority}</span></div>
              <div>Assigned To: <span className="font-bold text-txt-main">{selectedIssue.assignedTo}</span></div>
              <div>Reported: <span className="font-bold text-txt-main">{selectedIssue.reportedAt}</span></div>
            </div>

            <div className="pt-3 border-t border-border-dark flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setSelectedIssue(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MaintenancePage;
