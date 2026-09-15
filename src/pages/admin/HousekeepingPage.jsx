import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  Sparkles,
  User,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

export const HousekeepingPage = () => {
  const {
    housekeepingTasks,
    advanceHousekeepingStage,
    assignHousekeeper,
    addToast
  } = useHotel();

  const columns = [
    { id: 'Needs Cleaning', title: 'NEEDS CLEANING', badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
    { id: 'In Progress', title: 'IN PROGRESS', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { id: 'Inspection', title: 'INSPECTION', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    { id: 'Ready', title: 'READY', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
  ];

  const staffList = ['Neha Sharma', 'Suresh Kumar', 'Anita Verma', 'Manoj Patel', 'Sunita Rao'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-txt-main flex items-center gap-2">
            Housekeeping Operations
            <span className="text-xs font-semibold text-brand-cyan bg-brand-cyanMuted px-2.5 py-0.5 rounded-full border border-brand-cyan/30">
              Kanban Board
            </span>
          </h1>
          <p className="text-xs text-txt-secondary mt-1">
            Real-time room turnover tracking. Advance rooms from Dirty to Cleaned, Inspected, and Ready for Guest Arrival.
          </p>
        </div>
      </div>

      {/* KANBAN BOARD (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
        {columns.map(col => {
          const tasksInCol = housekeepingTasks.filter(t => t.stage === col.id);

          return (
            <div
              key={col.id}
              className="bg-bg-card border border-border-dark rounded-xl overflow-hidden shadow-card flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="p-4 border-b border-border-dark bg-bg-secondary flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black tracking-wider text-txt-main">
                    {col.title}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${col.badgeColor}`}>
                    {tasksInCol.length}
                  </span>
                </div>
              </div>

              {/* Tasks List */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[620px]">
                {tasksInCol.length === 0 ? (
                  <div className="text-center py-12 text-txt-muted text-xs">
                    No rooms in this stage.
                  </div>
                ) : (
                  tasksInCol.map(task => (
                    <div
                      key={task.id}
                      className="bg-bg-secondary border border-border-dark hover:border-brand-blue/40 rounded-lg p-3.5 space-y-3 shadow-sm hover:shadow-glow-blue transition-all"
                    >
                      {/* Room Num & Type */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-sm font-black text-txt-main">
                              ROOM {task.roomNumber}
                            </span>
                            {task.priority === 'High' && (
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                Priority
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-txt-muted block mt-0.5">{task.roomType}</span>
                        </div>
                        <Badge status={col.id} size="xs" />
                      </div>

                      {/* Staff Assignment & Time */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-txt-secondary">
                          <span className="text-[11px] text-txt-muted flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>Assigned:</span>
                          </span>
                          <select
                            value={task.assignedStaff}
                            onChange={(e) => assignHousekeeper(task.id, e.target.value)}
                            className="bg-bg-card border border-border-dark rounded px-1.5 py-0.5 text-[11px] text-txt-main focus:outline-none"
                          >
                            {staffList.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-txt-muted">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Turnaround:</span>
                          </span>
                          <span>{task.timeSinceCheckout}</span>
                        </div>

                        {task.notes && (
                          <p className="text-[11px] text-txt-secondary italic bg-bg-card/50 p-1.5 rounded border border-border-dark/60 mt-1">
                            "{task.notes}"
                          </p>
                        )}
                      </div>

                      {/* Workflow Advancement Action Buttons */}
                      <div className="pt-2 border-t border-border-dark/80 flex items-center justify-between gap-1.5">
                        {col.id === 'Needs Cleaning' && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => advanceHousekeepingStage(task.id, 'In Progress')}
                          >
                            Mark Cleaning
                          </Button>
                        )}

                        {col.id === 'In Progress' && (
                          <Button
                            variant="cyan"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => advanceHousekeepingStage(task.id, 'Inspection')}
                          >
                            Submit Inspection
                          </Button>
                        )}

                        {col.id === 'Inspection' && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => advanceHousekeepingStage(task.id, 'Ready')}
                          >
                            Mark Ready & Available
                          </Button>
                        )}

                        {col.id === 'Ready' && (
                          <div className="w-full text-center text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Room Available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HousekeepingPage;
