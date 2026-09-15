import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  generateSeedRooms,
  INITIAL_GUESTS,
  INITIAL_RESERVATIONS,
  INITIAL_HOUSEKEEPING_TASKS,
  INITIAL_MAINTENANCE_ISSUES,
  INITIAL_ACTIVITIES,
  HOTEL_INFO
} from '../data/seedData';
import { calculateRoomPricing } from '../utils/pricingEngine';

const HotelContext = createContext();

const STORAGE_KEYS = {
  ROOMS: 'stayops_rooms_v1',
  RESERVATIONS: 'stayops_reservations_v1',
  GUESTS: 'stayops_guests_v1',
  HOUSEKEEPING: 'stayops_housekeeping_v1',
  MAINTENANCE: 'stayops_maintenance_v1',
  ACTIVITIES: 'stayops_activities_v1',
  SETTINGS: 'stayops_settings_v1'
};

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Failed reading localStorage for ${key}:`, e);
    return fallback;
  }
};

export const HotelProvider = ({ children }) => {
  // 1. Core State with LocalStorage fallbacks
  const [rooms, setRooms] = useState(() => getStored(STORAGE_KEYS.ROOMS, generateSeedRooms()));
  const [reservations, setReservations] = useState(() => getStored(STORAGE_KEYS.RESERVATIONS, INITIAL_RESERVATIONS));
  const [guests, setGuests] = useState(() => getStored(STORAGE_KEYS.GUESTS, INITIAL_GUESTS));
  const [housekeepingTasks, setHousekeepingTasks] = useState(() => getStored(STORAGE_KEYS.HOUSEKEEPING, INITIAL_HOUSEKEEPING_TASKS));
  const [maintenanceIssues, setMaintenanceIssues] = useState(() => getStored(STORAGE_KEYS.MAINTENANCE, INITIAL_MAINTENANCE_ISSUES));
  const [activities, setActivities] = useState(() => getStored(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES));
  const [hotelSettings, setHotelSettings] = useState(() => getStored(STORAGE_KEYS.SETTINGS, HOTEL_INFO));

  // 2. Toast notification system
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HOUSEKEEPING, JSON.stringify(housekeepingTasks));
  }, [housekeepingTasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(maintenanceIssues));
  }, [maintenanceIssues]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(hotelSettings));
  }, [hotelSettings]);

  // Helper to add activity log entry
  const logActivity = (text, type = 'general') => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newEntry = {
      id: 'act-' + Date.now(),
      time,
      text,
      type
    };
    setActivities(prev => [newEntry, ...prev.slice(0, 49)]); // keep recent 50
  };

  // 3. Operational Actions & Lifecycle transitions

  // Create Reservation
  const createReservation = ({ guestData, stayData, addOns = [], pricingBreakdown }) => {
    const newResId = 'STY' + Math.floor(1000 + Math.random() * 9000);
    const room = rooms.find(r => r.id === stayData.roomId || r.roomNumber === stayData.roomNumber);
    const roomNumber = room ? room.roomNumber : stayData.roomNumber;
    const roomId = room ? room.id : `RM-${roomNumber}`;

    // Find or create guest
    let guest = guests.find(g => g.email.toLowerCase() === guestData.email.toLowerCase());
    let guestId = guest ? guest.id : 'GST-' + Math.floor(100 + Math.random() * 900);

    if (guest) {
      setGuests(prev => prev.map(g => {
        if (g.id === guest.id) {
          return {
            ...g,
            phone: guestData.phone || g.phone,
            totalStays: g.totalStays + 1,
            totalSpent: g.totalSpent + pricingBreakdown.finalTotal,
            lastStay: stayData.checkIn,
            currentRoom: roomNumber
          };
        }
        return g;
      }));
    } else {
      const newGuest = {
        id: guestId,
        name: guestData.name,
        email: guestData.email,
        phone: guestData.phone,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        totalStays: 1,
        lastStay: stayData.checkIn,
        totalSpent: pricingBreakdown.finalTotal,
        currentRoom: roomNumber,
        vipStatus: 'Member',
        preferences: guestData.specialRequests || 'Standard preference',
        notes: 'Created via Web Booking Engine.'
      };
      setGuests(prev => [newGuest, ...prev]);
    }

    const newReservation = {
      id: newResId,
      guestId,
      guestName: guestData.name,
      guestEmail: guestData.email,
      guestPhone: guestData.phone,
      roomId,
      roomNumber,
      roomType: room ? room.type : 'Standard',
      checkIn: stayData.checkIn,
      checkOut: stayData.checkOut,
      guestsCount: stayData.guestsCount || 2,
      status: 'Confirmed',
      paymentStatus: 'Paid', // Web reservations confirm with payment
      paymentMethod: guestData.paymentMethod || 'Credit Card (Online)',
      roomCharges: pricingBreakdown.adjustedRoomTotal,
      addOns: addOns.map(a => ({ id: a.id, name: a.name, cost: a.cost || 0 })),
      serviceFee: pricingBreakdown.serviceFee || 500,
      taxAmount: pricingBreakdown.taxAmount,
      totalAmount: pricingBreakdown.finalTotal,
      createdAt: new Date().toISOString(),
      specialRequests: guestData.specialRequests || ''
    };

    setReservations(prev => [newReservation, ...prev]);

    // Update Room status to 'Reserved'
    setRooms(prev => prev.map(r => {
      if (r.id === roomId || r.roomNumber === roomNumber) {
        return {
          ...r,
          status: 'Reserved',
          currentGuest: {
            guestName: guestData.name,
            checkIn: stayData.checkIn,
            checkOut: stayData.checkOut,
            reservationId: newResId
          }
        };
      }
      return r;
    }));

    logActivity(`Reservation #${newResId} created for ${guestData.name}`, 'reservation');
    addToast(`Reservation #${newResId} confirmed successfully!`);

    return newReservation;
  };

  // Check-In Guest
  const checkInGuest = (reservationId) => {
    const res = reservations.find(r => r.id === reservationId);
    if (!res) return;

    setReservations(prev => prev.map(r => {
      if (r.id === reservationId) {
        return { ...r, status: 'Checked-in' };
      }
      return r;
    }));

    // Update room to Occupied
    setRooms(prev => prev.map(r => {
      if (r.id === res.roomId || r.roomNumber === res.roomNumber) {
        return {
          ...r,
          status: 'Occupied',
          currentGuest: {
            guestName: res.guestName,
            checkIn: res.checkIn,
            checkOut: res.checkOut,
            reservationId: res.id
          }
        };
      }
      return r;
    }));

    logActivity(`Room ${res.roomNumber} checked in (${res.guestName})`, 'checkin');
    addToast(`Room ${res.roomNumber} checked in.`);
  };

  // Check-Out Guest
  const checkOutGuest = (reservationId) => {
    const res = reservations.find(r => r.id === reservationId);
    if (!res) return;

    setReservations(prev => prev.map(r => {
      if (r.id === reservationId) {
        return { ...r, status: 'Completed' };
      }
      return r;
    }));

    // Update room to Cleaning
    setRooms(prev => prev.map(r => {
      if (r.id === res.roomId || r.roomNumber === res.roomNumber) {
        return {
          ...r,
          status: 'Cleaning',
          cleaningStage: 'Needs Cleaning',
          currentGuest: null
        };
      }
      return r;
    }));

    // Add Housekeeping Task
    const existingTask = housekeepingTasks.find(h => h.roomNumber === res.roomNumber && h.stage !== 'Ready');
    if (!existingTask) {
      const newTask = {
        id: 'HK-' + Date.now(),
        roomId: res.roomId,
        roomNumber: res.roomNumber,
        roomType: res.roomType,
        assignedStaff: 'Housekeeping Pool',
        stage: 'Needs Cleaning',
        timeSinceCheckout: 'Just now',
        notes: `Guest checked out: ${res.guestName}. Full turnover required.`,
        priority: 'High'
      };
      setHousekeepingTasks(prev => [newTask, ...prev]);
    }

    logActivity(`Room ${res.roomNumber} checked out and marked for cleaning`, 'checkout');
    addToast(`Room ${res.roomNumber} checked out. Marked for cleaning.`);
  };

  // Direct Room Status Update
  const updateRoomStatus = (roomId, newStatus) => {
    const room = rooms.find(r => r.id === roomId || r.roomNumber === roomId);
    if (!room) return;

    setRooms(prev => prev.map(r => {
      if (r.id === room.id) {
        return {
          ...r,
          status: newStatus,
          cleaningStage: newStatus === 'Cleaning' ? 'Needs Cleaning' : (newStatus === 'Available' ? 'Ready' : r.cleaningStage),
          currentGuest: newStatus === 'Available' ? null : r.currentGuest
        };
      }
      return r;
    }));

    logActivity(`Room ${room.roomNumber} status changed to ${newStatus}`, 'status');
    addToast(`Room ${room.roomNumber} is now ${newStatus}.`);
  };

  // Housekeeping Workflow Stage Transition
  // Stages: 'Needs Cleaning' -> 'In Progress' -> 'Inspection' -> 'Ready'
  const advanceHousekeepingStage = (taskId, targetStage) => {
    const task = housekeepingTasks.find(t => t.id === taskId);
    if (!task) return;

    const stagesOrder = ['Needs Cleaning', 'In Progress', 'Inspection', 'Ready'];
    const nextStage = targetStage || stagesOrder[Math.min(stagesOrder.indexOf(task.stage) + 1, stagesOrder.length - 1)];

    setHousekeepingTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          stage: nextStage,
          timeSinceCheckout: nextStage === 'Ready' ? 'Completed just now' : t.timeSinceCheckout
        };
      }
      return t;
    }));

    // If Ready, transition room status to Available
    if (nextStage === 'Ready') {
      setRooms(prev => prev.map(r => {
        if (r.roomNumber === task.roomNumber || r.id === task.roomId) {
          return {
            ...r,
            status: 'Available',
            cleaningStage: 'Ready',
            currentGuest: null
          };
        }
        return r;
      }));
      logActivity(`Room ${task.roomNumber} marked clean & inspected`, 'housekeeping');
      addToast(`Room ${task.roomNumber} marked as ready.`);
    } else {
      setRooms(prev => prev.map(r => {
        if (r.roomNumber === task.roomNumber || r.id === task.roomId) {
          return {
            ...r,
            status: 'Cleaning',
            cleaningStage: nextStage
          };
        }
        return r;
      }));
      logActivity(`Room ${task.roomNumber} moved to ${nextStage}`, 'housekeeping');
      addToast(`Room ${task.roomNumber} moved to ${nextStage}.`);
    }
  };

  const assignHousekeeper = (taskId, staffName) => {
    setHousekeepingTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, assignedStaff: staffName };
      }
      return t;
    }));
    addToast(`Assigned ${staffName} to task.`);
  };

  // Maintenance Workflow
  const reportMaintenanceIssue = ({ roomNumber, issue, priority = 'High', assignedTo = 'Engineering Team', notes = '' }) => {
    const room = rooms.find(r => r.roomNumber === roomNumber || r.id === roomNumber);
    const resolvedNumber = room ? room.roomNumber : roomNumber;
    const resolvedId = room ? room.id : `RM-${resolvedNumber}`;

    const newIssue = {
      id: 'MNT-' + Math.floor(100 + Math.random() * 900),
      roomId: resolvedId,
      roomNumber: resolvedNumber,
      roomType: room ? room.type : 'Deluxe',
      issue,
      priority,
      assignedTo,
      reportedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Reported',
      daysDown: 0,
      partsNeeded: 'Inspection required',
      notes
    };

    setMaintenanceIssues(prev => [newIssue, ...prev]);

    // Mark room as Maintenance
    setRooms(prev => prev.map(r => {
      if (r.roomNumber === resolvedNumber) {
        return { ...r, status: 'Maintenance' };
      }
      return r;
    }));

    logActivity(`Maintenance reported for Room ${resolvedNumber}: ${issue.substring(0, 30)}...`, 'maintenance');
    addToast(`Maintenance issue reported for Room ${resolvedNumber}.`, 'warning');
  };

  const updateMaintenanceStatus = (issueId, newStatus) => {
    const issue = maintenanceIssues.find(i => i.id === issueId);
    if (!issue) return;

    setMaintenanceIssues(prev => prev.map(i => {
      if (i.id === issueId) {
        return { ...i, status: newStatus };
      }
      return i;
    }));

    if (newStatus === 'Resolved') {
      // Room sent to Cleaning before becoming available
      setRooms(prev => prev.map(r => {
        if (r.roomNumber === issue.roomNumber) {
          return { ...r, status: 'Cleaning', cleaningStage: 'Needs Cleaning' };
        }
        return r;
      }));

      // Add housekeeping inspection task
      setHousekeepingTasks(prev => [{
        id: 'HK-' + Date.now(),
        roomId: issue.roomId,
        roomNumber: issue.roomNumber,
        roomType: issue.roomType,
        assignedStaff: 'Housekeeping Lead',
        stage: 'Needs Cleaning',
        timeSinceCheckout: 'Just repaired',
        notes: `Maintenance issue (${issue.issue}) resolved. Post-repair cleanup required.`,
        priority: 'High'
      }, ...prev]);

      logActivity(`Maintenance resolved for Room ${issue.roomNumber}. Sent to housekeeping.`, 'maintenance');
      addToast(`Room ${issue.roomNumber} repaired and scheduled for cleaning.`);
    } else {
      addToast(`Issue status updated to ${newStatus}.`);
    }
  };

  // Payment Status Update
  const updatePaymentStatus = (reservationId, status) => {
    setReservations(prev => prev.map(r => {
      if (r.id === reservationId) {
        return { ...r, paymentStatus: status };
      }
      return r;
    }));

    logActivity(`Payment marked as ${status} for #${reservationId}`, 'payment');
    addToast(`Payment marked as ${status}.`);
  };

  // Reset Demo Data
  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.ROOMS);
    localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
    localStorage.removeItem(STORAGE_KEYS.GUESTS);
    localStorage.removeItem(STORAGE_KEYS.HOUSEKEEPING);
    localStorage.removeItem(STORAGE_KEYS.MAINTENANCE);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);

    setRooms(generateSeedRooms());
    setReservations(INITIAL_RESERVATIONS);
    setGuests(INITIAL_GUESTS);
    setHousekeepingTasks(INITIAL_HOUSEKEEPING_TASKS);
    setMaintenanceIssues(INITIAL_MAINTENANCE_ISSUES);
    setActivities(INITIAL_ACTIVITIES);
    setHotelSettings(HOTEL_INFO);

    addToast('All demo data restored to initial state.');
  };

  // Calculated Real-Time Metrics for Operations
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const availableRooms = rooms.filter(r => r.status === 'Available').length;
  const cleaningRooms = rooms.filter(r => r.status === 'Cleaning').length;
  const maintenanceRooms = rooms.filter(r => r.status === 'Maintenance').length;
  const reservedRooms = rooms.filter(r => r.status === 'Reserved').length;
  const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) : 0;

  const todayCheckIns = reservations.filter(r => r.status === 'Confirmed').length;
  const todayCheckOuts = reservations.filter(r => r.status === 'Checked-in').length;
  
  // Today's Revenue calculation
  const totalRevenue = reservations
    .filter(r => r.paymentStatus === 'Paid')
    .reduce((acc, r) => acc + (r.totalAmount || 0), 0);

  return (
    <HotelContext.Provider value={{
      rooms,
      reservations,
      guests,
      housekeepingTasks,
      maintenanceIssues,
      activities,
      hotelSettings,
      toasts,
      metrics: {
        totalRooms,
        occupiedRooms,
        availableRooms,
        cleaningRooms,
        maintenanceRooms,
        reservedRooms,
        occupancyRate,
        todayCheckIns,
        todayCheckOuts,
        totalRevenue
      },
      addToast,
      removeToast,
      createReservation,
      checkInGuest,
      checkOutGuest,
      updateRoomStatus,
      advanceHousekeepingStage,
      assignHousekeeper,
      reportMaintenanceIssue,
      updateMaintenanceStatus,
      updatePaymentStatus,
      resetToDemoData,
      setHotelSettings
    }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
