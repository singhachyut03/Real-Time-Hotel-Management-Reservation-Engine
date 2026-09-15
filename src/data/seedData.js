/**
 * StayOps Realistic Demo Seed Data
 * Curated high-res imagery, 50 rooms, 22 reservations, 16 guests, 12 housekeeping tasks, 6 maintenance tickets.
 */

export const HOTEL_INFO = {
  name: "StayOps Grand & Suites",
  tagline: "Real-Time Hotel Management & Reservation Engine",
  address: "42 Marina Boulevard, Waterfront District, Mumbai, MH 400001",
  phone: "+91 22 8840 9100",
  email: "concierge@stayops-hotel.com",
  gstin: "27AABCU9603R1ZM",
  checkInTime: "14:00",
  checkOutTime: "11:00",
  currency: "INR",
  currencySymbol: "₹"
};

export const HOTEL_IMAGES = {
  hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
  exterior: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
  lobby: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  pool: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  spa: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
};

export const ROOM_TYPE_GALLERY = {
  'Standard': [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
  ],
  'Deluxe': [
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
  ],
  'Executive': [
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
  ],
  'Suite': [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
  ],
  'Premium Suite': [
    "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80"
  ]
};

// Generate 50 realistic rooms across 5 floors (10 rooms per floor: 101-110, 201-210, etc.)
export const generateSeedRooms = () => {
  const rooms = [];
  const roomTypesMeta = [
    { type: 'Standard', name: 'Standard Urban Queen', price: 3800, capacity: 2, bed: '1 Queen Bed', size: 26, rating: 4.6, reviews: 84 },
    { type: 'Deluxe', name: 'Deluxe King Room', price: 5500, capacity: 2, bed: '1 King Bed', size: 32, rating: 4.8, reviews: 142 },
    { type: 'Deluxe', name: 'Deluxe Twin Room', price: 5500, capacity: 3, bed: '2 Twin Beds', size: 34, rating: 4.7, reviews: 98 },
    { type: 'Executive', name: 'Executive Business Suite', price: 7800, capacity: 2, bed: '1 California King', size: 42, rating: 4.9, reviews: 116 },
    { type: 'Suite', name: 'Grand Skyline Suite', price: 10500, capacity: 4, bed: '1 King + 1 Sofa Bed', size: 58, rating: 4.9, reviews: 73 },
    { type: 'Premium Suite', name: 'Presidential Waterfront Suite', price: 16500, capacity: 4, bed: '2 King Beds', size: 85, rating: 5.0, reviews: 49 }
  ];

  const standardFacilities = [
    'Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Private Bathroom', 'Hair Dryer', 'Daily Housekeeping', 'Electric Kettle'
  ];
  const deluxeFacilities = [
    ...standardFacilities, 'Mini Fridge', 'Tea/Coffee Maker', 'Room Service', 'Work Desk', 'Wardrobe', 'Safe'
  ];
  const suiteFacilities = [
    ...deluxeFacilities, 'Balcony', 'City View', 'Pool Access', 'Gym Access', 'Complimentary Breakfast', 'Bathtub'
  ];

  // Specific preset states to match prompt examples:
  // 101 Available, 102 Occupied, 103 Cleaning, 104 Maintenance, 105 Available, 106 Occupied, 107 Available, 108 Reserved, 204 Maintenance
  const statusOverrides = {
    101: 'Available',
    102: 'Occupied',
    103: 'Cleaning',
    104: 'Maintenance',
    105: 'Available',
    106: 'Occupied',
    107: 'Available',
    108: 'Reserved',
    204: 'Maintenance',
    205: 'Occupied',
    208: 'Cleaning',
    302: 'Occupied',
    306: 'Cleaning',
    401: 'Reserved',
    405: 'Occupied',
    501: 'Occupied',
    502: 'Available'
  };

  const guestOverrides = {
    102: { guestName: 'Rahul Sharma', checkIn: '2026-09-18', checkOut: '2026-09-21', reservationId: 'STY4821' },
    106: { guestName: 'Ananya Deshmukh', checkIn: '2026-09-17', checkOut: '2026-09-20', reservationId: 'STY4822' },
    108: { guestName: 'Vikram Malhotra', checkIn: '2026-09-19', checkOut: '2026-09-23', reservationId: 'STY4823' },
    205: { guestName: 'Pooja Hegde', checkIn: '2026-09-16', checkOut: '2026-09-19', reservationId: 'STY4824' },
    302: { guestName: 'Rohan Mehra', checkIn: '2026-09-15', checkOut: '2026-09-18', reservationId: 'STY4825' },
    401: { guestName: 'Priya Kapoor', checkIn: '2026-09-20', checkOut: '2026-09-24', reservationId: 'STY4826' },
    405: { guestName: 'Arjun Singhania', checkIn: '2026-09-16', checkOut: '2026-09-22', reservationId: 'STY4827' },
    501: { guestName: 'Dr. Siddharth Sen', checkIn: '2026-09-17', checkOut: '2026-09-21', reservationId: 'STY4828' },
  };

  for (let floor = 1; floor <= 5; floor++) {
    for (let roomIdx = 1; roomIdx <= 10; roomIdx++) {
      const roomNum = floor * 100 + roomIdx;
      
      // Select appropriate template
      let meta;
      if (roomIdx <= 3) {
        meta = roomTypesMeta[0]; // Standard
      } else if (roomIdx <= 6) {
        meta = (roomIdx % 2 === 0) ? roomTypesMeta[1] : roomTypesMeta[2]; // Deluxe King / Twin
      } else if (roomIdx <= 8) {
        meta = roomTypesMeta[3]; // Executive
      } else if (roomIdx === 9) {
        meta = roomTypesMeta[4]; // Suite
      } else {
        meta = (floor === 5) ? roomTypesMeta[5] : roomTypesMeta[4]; // Presidential on top floor, Suite elsewhere
      }

      const status = statusOverrides[roomNum] || ((roomNum % 3 === 0) ? 'Occupied' : (roomNum % 7 === 0 ? 'Cleaning' : 'Available'));
      const gallery = ROOM_TYPE_GALLERY[meta.type] || ROOM_TYPE_GALLERY['Deluxe'];
      const facilities = meta.type === 'Standard' ? standardFacilities : (meta.type === 'Deluxe' ? deluxeFacilities : suiteFacilities);

      rooms.push({
        id: `RM-${roomNum}`,
        roomNumber: String(roomNum),
        floor: floor,
        type: meta.type,
        name: `${meta.name} #${roomNum}`,
        basePrice: meta.price,
        capacity: meta.capacity,
        bedType: meta.bed,
        size: meta.size,
        rating: meta.rating,
        reviewsCount: meta.reviews,
        status: status, // Available, Occupied, Cleaning, Maintenance, Reserved
        cleaningStage: status === 'Cleaning' ? 'Needs Cleaning' : 'Ready', // Needs Cleaning, In Progress, Inspection, Ready
        currentGuest: guestOverrides[roomNum] || null,
        facilities: facilities,
        breakfastIncluded: meta.type === 'Suite' || meta.type === 'Premium Suite',
        freeCancellation: true,
        images: gallery,
        description: `Experience uncompromising comfort in our carefully appointed ${meta.name}. Features panoramic views, bespoke furnishings, plush bedding, high-speed Wi-Fi, and a dedicated executive work desk.`
      });
    }
  }

  return rooms;
};

export const INITIAL_GUESTS = [
  {
    id: 'GST-101',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98201 44521',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    totalStays: 6,
    lastStay: '2026-09-18',
    totalSpent: 84500,
    currentRoom: '102',
    vipStatus: 'Gold VIP',
    preferences: 'High floor, feather pillows, late checkout preference.',
    notes: 'Prefers quiet corner room away from elevators. Celebrating wedding anniversary this week.'
  },
  {
    id: 'GST-102',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@fintechglobal.io',
    phone: '+91 98450 11289',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    totalStays: 12,
    lastStay: '2026-09-17',
    totalSpent: 168200,
    currentRoom: '106',
    vipStatus: 'Platinum VIP',
    preferences: 'Extra espresso pods in room, almond milk for breakfast, ergonomic desk setup.',
    notes: 'Corporate account with FinTech Global. Direct bill approved.'
  },
  {
    id: 'GST-103',
    name: 'Vikram Malhotra',
    email: 'v.malhotra@zenithpartners.com',
    phone: '+91 98110 33876',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    totalStays: 4,
    lastStay: '2026-09-19',
    totalSpent: 42000,
    currentRoom: '108',
    vipStatus: 'Silver',
    preferences: 'Newspaper daily: Economic Times, wake-up call at 6:30 AM.',
    notes: 'Arriving late on flight from Delhi.'
  },
  {
    id: 'GST-104',
    name: 'Pooja Hegde',
    email: 'pooja.hegde@creativecloud.com',
    phone: '+91 97690 88214',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    totalStays: 3,
    lastStay: '2026-09-16',
    totalSpent: 38400,
    currentRoom: '205',
    vipStatus: 'Silver',
    preferences: 'Vegan breakfast, pool view.',
    notes: 'Booked via website direct promo.'
  },
  {
    id: 'GST-105',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@techcorp.in',
    phone: '+91 99201 55678',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    totalStays: 8,
    lastStay: '2026-09-15',
    totalSpent: 112000,
    currentRoom: '302',
    vipStatus: 'Gold VIP',
    preferences: 'Dual monitors if available, quiet workspace.',
    notes: 'Speaker at the Tech Summit.'
  },
  {
    id: 'GST-106',
    name: 'Priya Kapoor',
    email: 'priya.kapoor@lifestyle.co',
    phone: '+91 98210 99432',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    totalStays: 2,
    lastStay: '2026-09-20',
    totalSpent: 22500,
    currentRoom: '401',
    vipStatus: 'Member',
    preferences: 'High-speed streaming Wi-Fi, hypoallergenic sheets.',
    notes: 'Requested early check-in if possible.'
  },
  {
    id: 'GST-107',
    name: 'Arjun Singhania',
    email: 'arjun.singhania@heritagegroup.in',
    phone: '+91 99880 12345',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    totalStays: 15,
    lastStay: '2026-09-16',
    totalSpent: 284000,
    currentRoom: '405',
    vipStatus: 'Diamond VIP',
    preferences: 'Chauffeured airport transfer, personal butler on call.',
    notes: 'VIP long-stay guest. Managing director of Heritage Group.'
  },
  {
    id: 'GST-108',
    name: 'Dr. Siddharth Sen',
    email: 'siddharth.sen@apollohealth.org',
    phone: '+91 98300 77654',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    totalStays: 5,
    lastStay: '2026-09-17',
    totalSpent: 67000,
    currentRoom: '501',
    vipStatus: 'Gold VIP',
    preferences: 'Fresh green tea upon arrival, extra towels.',
    notes: 'Medical conference keynote speaker.'
  },
  {
    id: 'GST-109',
    name: 'Meera Nambiar',
    email: 'meera.nambiar@designstudio.in',
    phone: '+91 97400 32189',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    totalStays: 3,
    lastStay: '2026-08-14',
    totalSpent: 31000,
    currentRoom: null,
    vipStatus: 'Silver',
    preferences: 'South-facing natural sunlight, balcony.',
    notes: 'Architectural photographer.'
  },
  {
    id: 'GST-110',
    name: 'Kabir Oberoi',
    email: 'kabir.o@venturecapital.com',
    phone: '+91 98190 65432',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    totalStays: 7,
    lastStay: '2026-08-28',
    totalSpent: 96000,
    currentRoom: null,
    vipStatus: 'Platinum VIP',
    preferences: 'Conference room access, espresso bar.',
    notes: 'Host of angel investor breakfast meetings.'
  },
  {
    id: 'GST-111',
    name: 'Tanvi Joshi',
    email: 'tanvi.joshi@gmail.com',
    phone: '+91 98700 89012',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    totalStays: 1,
    lastStay: '2026-07-10',
    totalSpent: 12500,
    currentRoom: null,
    vipStatus: 'Member',
    preferences: 'Non-smoking floor, city view.',
    notes: 'First time stay completed smoothly.'
  },
  {
    id: 'GST-112',
    name: 'Devendra Varma',
    email: 'd.varma@infraprojects.co',
    phone: '+91 99300 45678',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    totalStays: 5,
    lastStay: '2026-08-02',
    totalSpent: 54000,
    currentRoom: null,
    vipStatus: 'Gold VIP',
    preferences: 'Airport drop service, iron and ironing board.',
    notes: 'Regular corporate traveler.'
  },
  {
    id: 'GST-113',
    name: 'Natasha Roy',
    email: 'natasha.roy@lawfirm.in',
    phone: '+91 98200 12908',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
    totalStays: 4,
    lastStay: '2026-08-19',
    totalSpent: 49000,
    currentRoom: null,
    vipStatus: 'Silver',
    preferences: 'Quiet floor, room service dinner at 8:30 PM.',
    notes: 'High court advocate.'
  },
  {
    id: 'GST-114',
    name: 'Farhan Zaidi',
    email: 'farhan.z@mediaproductions.tv',
    phone: '+91 98920 33456',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    totalStays: 9,
    lastStay: '2026-08-25',
    totalSpent: 134000,
    currentRoom: null,
    vipStatus: 'Gold VIP',
    preferences: 'Late checkout, 4 bottled waters daily.',
    notes: 'Film production scout.'
  },
  {
    id: 'GST-115',
    name: 'Sneha Chawla',
    email: 'sneha.chawla@aerospace.org',
    phone: '+91 97110 55432',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    totalStays: 6,
    lastStay: '2026-08-30',
    totalSpent: 78000,
    currentRoom: null,
    vipStatus: 'Platinum VIP',
    preferences: 'Low lighting, lavender room mist.',
    notes: 'Aviation systems analyst.'
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: 'STY4821',
    guestId: 'GST-101',
    guestName: 'Rahul Sharma',
    guestEmail: 'rahul.sharma@example.com',
    guestPhone: '+91 98201 44521',
    roomId: 'RM-102',
    roomNumber: '102',
    roomType: 'Deluxe King Room',
    checkIn: '2026-09-18',
    checkOut: '2026-09-21',
    guestsCount: 2,
    status: 'Checked-in', // Confirmed, Checked-in, Completed, Cancelled
    paymentStatus: 'Paid', // Paid, Pending, Refunded
    paymentMethod: 'Credit Card (Razorpay)',
    roomCharges: 16500,
    addOns: [
      { id: 'breakfast', name: 'Gourmet Buffet Breakfast', cost: 2400 },
      { id: 'extra-bed', name: 'Extra Bed', cost: 1000 }
    ],
    serviceFee: 500,
    taxAmount: 3672,
    totalAmount: 24072,
    createdAt: '2026-09-15T09:21:00Z',
    specialRequests: 'High floor requested. Anniversary celebration.'
  },
  {
    id: 'STY4822',
    guestId: 'GST-102',
    guestName: 'Ananya Deshmukh',
    guestEmail: 'ananya.d@fintechglobal.io',
    guestPhone: '+91 98450 11289',
    roomId: 'RM-106',
    roomNumber: '106',
    roomType: 'Deluxe King Room',
    checkIn: '2026-09-17',
    checkOut: '2026-09-20',
    guestsCount: 1,
    status: 'Checked-in',
    paymentStatus: 'Paid',
    paymentMethod: 'Corporate Direct Billing',
    roomCharges: 16500,
    addOns: [
      { id: 'airport-transfer', name: 'Airport Transfer', cost: 1500 }
    ],
    serviceFee: 500,
    taxAmount: 3330,
    totalAmount: 21830,
    createdAt: '2026-09-14T14:10:00Z',
    specialRequests: 'Almond milk with breakfast.'
  },
  {
    id: 'STY4823',
    guestId: 'GST-103',
    guestName: 'Vikram Malhotra',
    guestEmail: 'v.malhotra@zenithpartners.com',
    guestPhone: '+91 98110 33876',
    roomId: 'RM-108',
    roomNumber: '108',
    roomType: 'Executive Business Suite',
    checkIn: '2026-09-19',
    checkOut: '2026-09-23',
    guestsCount: 1,
    status: 'Confirmed',
    paymentStatus: 'Pending',
    paymentMethod: 'Pay at Check-in',
    roomCharges: 31200,
    addOns: [
      { id: 'late-checkout', name: 'Late Checkout', cost: 1200 }
    ],
    serviceFee: 500,
    taxAmount: 5922,
    totalAmount: 38822,
    createdAt: '2026-09-15T11:45:00Z',
    specialRequests: 'Late arrival estimated around 10:30 PM.'
  },
  {
    id: 'STY4824',
    guestId: 'GST-104',
    guestName: 'Pooja Hegde',
    guestEmail: 'pooja.hegde@creativecloud.com',
    guestPhone: '+91 97690 88214',
    roomId: 'RM-205',
    roomNumber: '205',
    roomType: 'Deluxe Twin Room',
    checkIn: '2026-09-16',
    checkOut: '2026-09-19',
    guestsCount: 2,
    status: 'Checked-in',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI / PhonePe',
    roomCharges: 16500,
    addOns: [
      { id: 'breakfast', name: 'Buffet Breakfast', cost: 2400 }
    ],
    serviceFee: 500,
    taxAmount: 3492,
    totalAmount: 22892,
    createdAt: '2026-09-13T16:20:00Z',
    specialRequests: 'Pool view room.'
  },
  {
    id: 'STY4825',
    guestId: 'GST-105',
    guestName: 'Rohan Mehra',
    guestEmail: 'rohan.mehra@techcorp.in',
    guestPhone: '+91 99201 55678',
    roomId: 'RM-302',
    roomNumber: '302',
    roomType: 'Standard Urban Queen',
    checkIn: '2026-09-15',
    checkOut: '2026-09-18',
    guestsCount: 1,
    status: 'Checked-in',
    paymentStatus: 'Paid',
    paymentMethod: 'Net Banking (HDFC)',
    roomCharges: 11400,
    addOns: [],
    serviceFee: 500,
    taxAmount: 2142,
    totalAmount: 14042,
    createdAt: '2026-09-12T10:15:00Z',
    specialRequests: 'Quiet room for remote video calls.'
  },
  {
    id: 'STY4826',
    guestId: 'GST-106',
    guestName: 'Priya Kapoor',
    guestEmail: 'priya.kapoor@lifestyle.co',
    guestPhone: '+91 98210 99432',
    roomId: 'RM-401',
    roomNumber: '401',
    roomType: 'Standard Urban Queen',
    checkIn: '2026-09-20',
    checkOut: '2026-09-24',
    guestsCount: 2,
    status: 'Confirmed',
    paymentStatus: 'Pending',
    paymentMethod: 'Credit Card',
    roomCharges: 15200,
    addOns: [
      { id: 'breakfast', name: 'Breakfast Buffet', cost: 3200 }
    ],
    serviceFee: 500,
    taxAmount: 3402,
    totalAmount: 22302,
    createdAt: '2026-09-14T18:00:00Z',
    specialRequests: 'Hypoallergenic pillows.'
  },
  {
    id: 'STY4827',
    guestId: 'GST-107',
    guestName: 'Arjun Singhania',
    guestEmail: 'arjun.singhania@heritagegroup.in',
    guestPhone: '+91 99880 12345',
    roomId: 'RM-405',
    roomNumber: '405',
    roomType: 'Deluxe King Room',
    checkIn: '2026-09-16',
    checkOut: '2026-09-22',
    guestsCount: 2,
    status: 'Checked-in',
    paymentStatus: 'Paid',
    paymentMethod: 'AMEX Corporate',
    roomCharges: 33000,
    addOns: [
      { id: 'airport-transfer', name: 'Luxury Transfer', cost: 1500 },
      { id: 'room-service-pack', name: 'Dining Package', cost: 2000 }
    ],
    serviceFee: 500,
    taxAmount: 6660,
    totalAmount: 43660,
    createdAt: '2026-09-11T12:00:00Z',
    specialRequests: 'Executive floor lounge privileges.'
  },
  {
    id: 'STY4828',
    guestId: 'GST-108',
    guestName: 'Dr. Siddharth Sen',
    guestEmail: 'siddharth.sen@apollohealth.org',
    guestPhone: '+91 98300 77654',
    roomId: 'RM-501',
    roomNumber: '501',
    roomType: 'Standard Urban Queen',
    checkIn: '2026-09-17',
    checkOut: '2026-09-21',
    guestsCount: 1,
    status: 'Checked-in',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    roomCharges: 15200,
    addOns: [],
    serviceFee: 500,
    taxAmount: 2826,
    totalAmount: 18526,
    createdAt: '2026-09-13T19:30:00Z',
    specialRequests: 'Extra hangers and green tea.'
  },
  {
    id: 'STY4829',
    guestId: 'GST-109',
    guestName: 'Meera Nambiar',
    guestEmail: 'meera.nambiar@designstudio.in',
    guestPhone: '+91 97400 32189',
    roomId: 'RM-202',
    roomNumber: '202',
    roomType: 'Standard Urban Queen',
    checkIn: '2026-09-22',
    checkOut: '2026-09-25',
    guestsCount: 1,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    roomCharges: 11400,
    addOns: [
      { id: 'breakfast', name: 'Breakfast', cost: 1200 }
    ],
    serviceFee: 500,
    taxAmount: 2358,
    totalAmount: 15458,
    createdAt: '2026-09-15T15:10:00Z',
    specialRequests: 'Balcony room preferred.'
  },
  {
    id: 'STY4830',
    guestId: 'GST-110',
    guestName: 'Kabir Oberoi',
    guestEmail: 'kabir.o@venturecapital.com',
    guestPhone: '+91 98190 65432',
    roomId: 'RM-308',
    roomNumber: '308',
    roomType: 'Executive Business Suite',
    checkIn: '2026-09-25',
    checkOut: '2026-09-28',
    guestsCount: 2,
    status: 'Confirmed',
    paymentStatus: 'Pending',
    paymentMethod: 'Pay at Check-in',
    roomCharges: 23400,
    addOns: [
      { id: 'late-checkout', name: 'Late Checkout', cost: 1200 }
    ],
    serviceFee: 500,
    taxAmount: 4518,
    totalAmount: 29618,
    createdAt: '2026-09-16T01:00:00Z',
    specialRequests: 'Meeting room booking inquiry.'
  }
];

export const INITIAL_HOUSEKEEPING_TASKS = [
  {
    id: 'HK-101',
    roomId: 'RM-103',
    roomNumber: '103',
    roomType: 'Grand Skyline Suite',
    assignedStaff: 'Neha Sharma',
    stage: 'Needs Cleaning', // Needs Cleaning, In Progress, Inspection, Ready
    timeSinceCheckout: '35 mins ago',
    notes: 'Deep sanitization requested. Fresh bathrobes required.',
    priority: 'High'
  },
  {
    id: 'HK-102',
    roomId: 'RM-208',
    roomNumber: '208',
    roomType: 'Executive Suite',
    assignedStaff: 'Suresh Kumar',
    stage: 'Needs Cleaning',
    timeSinceCheckout: '1 hr ago',
    notes: 'Bed linens change and mini fridge restocking.',
    priority: 'Medium'
  },
  {
    id: 'HK-103',
    roomId: 'RM-306',
    roomNumber: '306',
    roomType: 'Deluxe King',
    assignedStaff: 'Anita Verma',
    stage: 'In Progress',
    timeSinceCheckout: '2 hrs ago',
    notes: 'Floor vacuuming in progress.',
    priority: 'Medium'
  },
  {
    id: 'HK-104',
    roomId: 'RM-408',
    roomNumber: '408',
    roomType: 'Executive Suite',
    assignedStaff: 'Manoj Patel',
    stage: 'In Progress',
    timeSinceCheckout: '2 hrs 15 mins ago',
    notes: 'Replacing glass tumblers and replenishing toiletries.',
    priority: 'Medium'
  },
  {
    id: 'HK-105',
    roomId: 'RM-202',
    roomNumber: '202',
    roomType: 'Standard Queen',
    assignedStaff: 'Sunita Rao',
    stage: 'Inspection',
    timeSinceCheckout: '3 hrs ago',
    notes: 'Supervisor checking balcony windows and bathroom fixtures.',
    priority: 'Low'
  },
  {
    id: 'HK-106',
    roomId: 'RM-502',
    roomNumber: '502',
    roomType: 'Presidential Suite',
    assignedStaff: 'Anita Verma',
    stage: 'Inspection',
    timeSinceCheckout: '3 hrs 40 mins ago',
    notes: 'Final touchup: fresh flower arrangement and fruit basket.',
    priority: 'High'
  },
  {
    id: 'HK-107',
    roomId: 'RM-101',
    roomNumber: '101',
    roomType: 'Standard Queen',
    assignedStaff: 'Neha Sharma',
    stage: 'Ready',
    timeSinceCheckout: 'Completed 09:37 AM',
    notes: 'Passed 24-point quality inspection.',
    priority: 'Low'
  },
  {
    id: 'HK-108',
    roomId: 'RM-105',
    roomNumber: '105',
    roomType: 'Deluxe Twin',
    assignedStaff: 'Suresh Kumar',
    stage: 'Ready',
    timeSinceCheckout: 'Completed 09:15 AM',
    notes: 'Inspected and certified clean.',
    priority: 'Low'
  }
];

export const INITIAL_MAINTENANCE_ISSUES = [
  {
    id: 'MNT-101',
    roomId: 'RM-204',
    roomNumber: '204',
    roomType: 'Deluxe King',
    issue: 'Air conditioner not cooling below 26°C. Fan noise reported.',
    priority: 'High', // High, Medium, Low
    assignedTo: 'HVAC Team (Rajesh Tech)',
    reportedAt: 'Today, 09:31 AM',
    status: 'In Progress', // Reported, In Progress, Resolved
    daysDown: 2,
    partsNeeded: 'Capacitor replacement',
    notes: 'Room taken out of inventory until compressor verified.'
  },
  {
    id: 'MNT-102',
    roomId: 'RM-104',
    roomNumber: '104',
    roomType: 'Deluxe Twin',
    issue: 'Bathroom washbasin drain draining slowly.',
    priority: 'Medium',
    assignedTo: 'Plumbing (Dinesh K)',
    reportedAt: 'Today, 08:15 AM',
    status: 'Reported',
    daysDown: 0,
    partsNeeded: 'Drain snake and sealant',
    notes: 'Guest checked out, needs resolution before next check-in.'
  },
  {
    id: 'MNT-103',
    roomId: 'RM-304',
    roomNumber: '304',
    roomType: 'Standard Queen',
    issue: 'Smart TV HDMI port damaged / remote un-synced.',
    priority: 'Low',
    assignedTo: 'AV Support Team',
    reportedAt: 'Yesterday, 04:20 PM',
    status: 'In Progress',
    daysDown: 1,
    partsNeeded: 'New Samsung smart remote',
    notes: 'Remote paired, testing streaming applications.'
  },
  {
    id: 'MNT-104',
    roomId: 'RM-409',
    roomNumber: '409',
    roomType: 'Grand Skyline Suite',
    issue: 'Balcony sliding door latch sticky.',
    priority: 'Medium',
    assignedTo: 'Carpentry & Hardware',
    reportedAt: '2 days ago',
    status: 'Resolved',
    daysDown: 0,
    partsNeeded: 'Lubricant and track alignment',
    notes: 'Realigned runner and tested safety lock.'
  }
];

export const INITIAL_ACTIVITIES = [
  { id: 'act-1', time: '09:42', text: 'Room 204 checked in', type: 'checkin' },
  { id: 'act-2', time: '09:37', text: 'Room 102 marked clean by Neha', type: 'housekeeping' },
  { id: 'act-3', time: '09:21', text: 'Reservation #STY4821 created for Rahul Sharma', type: 'reservation' },
  { id: 'act-4', time: '09:12', text: 'Payment received ₹24,072 for STY4821', type: 'payment' },
  { id: 'act-5', time: '08:45', text: 'Room 104 reported for Plumbing maintenance', type: 'maintenance' },
  { id: 'act-6', time: '08:10', text: 'Room 202 checked out smoothly', type: 'checkout' }
];
