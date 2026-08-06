// GLOBAL THEME TOGGLE WITH LOCAL STORAGE & HARDCODED PRODUCTION API URL
const API_URL = 'https://auto-india-motors.onrender.com/api';
const BACKEND_URL = 'https://auto-india-motors.onrender.com';

const moonSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const sunSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

// Check local storage immediately on load
function applySavedTheme() {
  const savedTheme = localStorage.getItem('autoindia_theme');
  const themeIcon = document.getElementById('themeIcon');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    if(themeIcon) themeIcon.innerHTML = sunSvg;
  } else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    if(themeIcon) themeIcon.innerHTML = moonSvg;
  }
}

function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('themeIcon');

  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('autoindia_theme', 'light');
    if(themeIcon) themeIcon.innerHTML = moonSvg;
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('autoindia_theme', 'dark');
    if(themeIcon) themeIcon.innerHTML = sunSvg;
  }
}

applySavedTheme();

// Helper to format image paths properly whether local or absolute URL
function getImageUrl(imgPath) {
  if (!imgPath) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/320px-No_image_available.svg.png';
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
    return imgPath;
  }
  // Ensure clean pathing with backend server URL
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  return `${BACKEND_URL}/${cleanPath}`;
}

// ── NAV SEARCH LOGIC ──
function handleNavSearch(e) {
  if (e.key === 'Enter') {
    const query = e.target.value.trim();
    if (query) {
      window.location.href = `inventory.html?search=${encodeURIComponent(query)}`;
    }
  }
}

function handleLiveSearch(e) {
  const query = e.target.value.trim();
  const grid = document.getElementById('inventoryGrid');
  if (grid) {
    renderCars('All', query);
  }
}

const defaultCarsList = [
  {
    brand:'Tata', name:'Nexon EV Max', type:['EV','SUV'], stock: 8, condition: 'New',
    price:'20.10 Lakh', priceNum:2010000,
    fuel:'Electric', engine:'30.2kWh', power:'143 HP', seats:5, range:'437 km', mileage:'N/A', transmission:'Auto',
    image:'images/nexon-ev.jpg.avif',
    parts:['Battery Module','BMS Unit','Motor Controller','Brake Regen Kit','AC Compressor','Touchscreen 10.25"','LED DRL Kit','Alloy Wheels 16"']
  },
  {
    brand:'Mahindra', name:'Thar Roxx', type:['SUV'], stock: 2, condition: 'New',
    price:'15.49 Lakh', priceNum:1549000,
    fuel:'Diesel/Petrol', engine:'2.2L mHawk', power:'175 HP', seats:5, range:'N/A', mileage:'15 kmpl', transmission:'Manual/Auto',
    image:'images/thar-roxx.jpg.webp',
    parts:['Engine Filter','Skid Plate','Bull Bar','Off-Road Tyres','Snorkel','Lift Suspension Kit','Rock Sliders','Differential Lock']
  },
  {
    brand:'Hyundai', name:'Creta N-Line', type:['SUV'], stock: 12, condition: 'New',
    price:'16.82 Lakh', priceNum:1682000,
    fuel:'Petrol', engine:'1.5L Turbo', power:'160 HP', seats:5, range:'N/A', mileage:'16 kmpl', transmission:'DCT Auto',
    image:'images/creta-nline.jpg.avif',
    parts:['DCT Filter','Turbo Intercooler','Sport Exhaust','18" Alloys','Brembo Brakes','LED Headlamp','N-Performance Tune','Sport Air Filter']
  },
  {
    brand:'Kia', name:'Seltos HTX+', type:['SUV'], stock: 5, condition: 'New',
    price:'19.65 Lakh', priceNum:1965000,
    fuel:'Diesel', engine:'1.5L CRDi', power:'116 HP', seats:5, range:'N/A', mileage:'21 kmpl', transmission:'6-Speed MT',
    image:'images/seltos.jpg',
    parts:['Diesel Filter','Glow Plug Set','EGR Valve','Panoramic Roof Panel','ADAS Camera','Parking Sensor','BOSE Speaker Kit','Wireless Charger']
  },
  {
    brand:'Tata', name:'Harrier Dark', type:['SUV'], stock: 3, condition: 'New',
    price:'24.99 Lakh', priceNum:2499000,
    fuel:'Diesel', engine:'2.0L Kryotec', power:'170 HP', seats:5, range:'N/A', mileage:'17 kmpl', transmission:'6-Speed MT/AT',
    image:'images/harrier.jpg.jpg',
    parts:['Kryotec Head Gasket','Timing Chain','Panoramic Roof Seal','360 Camera Module','20" Dark Alloys','LED ORVM','Keyless Entry Kit','Air Purifier']
  },
  {
    brand:'Ford', name:'EcoSport S', type:['SUV','Hatchback'], stock: 1, condition: 'Used',
    price:'8.50 Lakh', priceNum:850000,
    fuel:'Petrol', engine:'1.0L EcoBoost', power:'125 HP', seats:5, range:'N/A', mileage:'18 kmpl', transmission:'6-Speed MT',
    image:'images/ecosport.jpg.avif',
    parts:['EcoBoost Turbo','Intercooler Hose','Timing Belt','Door Lock Actuator','Fog Lamp Assembly','Clutch Kit','Rear Wiper Blade','Battery 55Ah']
  },
  {
    brand:'Mahindra', name:'XUV700 AX7 L', type:['SUV'], stock: 7, condition: 'New',
    price:'27.84 Lakh', priceNum:2784000,
    fuel:'Diesel', engine:'2.2L mHawk', power:'200 HP', seats:7, range:'N/A', mileage:'15 kmpl', transmission:'6-Speed AT',
    image:'images/xuv700.jpg.avif',
    parts:['AdrenoX Display','ADAS Radar','Panoroof Motor','7-Seat Seat Cover','Bose Speaker Set','360 Camera Kit','Air Purifier PM2.5','20" Alloy Wheel']
  },
  {
    brand:'Hyundai', name:'i20 Sportz IVT', type:['Hatchback'], stock: 15, condition: 'New',
    price:'9.87 Lakh', priceNum:987000,
    fuel:'Petrol', engine:'1.2L Kappa', power:'83 HP', seats:5, range:'N/A', mileage:'20 kmpl', transmission:'IVT Auto',
    image:'images/i20.jpg.jpg',
    parts:['IVT Belt','Kappa Timing Chain','LED Headlamp','Wireless Charger','BlueLink Module','Rear Defogger','Alloy Wheel 16"','Rain Sensor']
  },
  {
    brand:'Kia', name:'Sonet HTX IVT', type:['SUV','Hatchback'], stock: 9, condition: 'New',
    price:'12.89 Lakh', priceNum:1289000,
    fuel:'Petrol', engine:'1.0L Turbo', power:'120 HP', seats:5, range:'N/A', mileage:'18 kmpl', transmission:'IVT Auto',
    image:'images/kia-sonet-gravity-edition.jpg',
    parts:['Turbo O-Ring','Intercooler Pipe','Wireless ChargerPad','Blind Spot Mirror','Air Purifier','LED Map Light Kit','Sport Air Filter','Alloy 16"']
  },
  {
    brand:'Tata', name:'Punch Adventure', type:['SUV','Hatchback'], stock: 18, condition: 'New',
    price:'7.99 Lakh', priceNum:799000,
    fuel:'Petrol', engine:'1.2L Revotron', power:'86 HP', seats:5, range:'N/A', mileage:'18 kmpl', transmission:'5-Speed MT',
    image:'images/punch.jpg',
    parts:['Revotron Filter','Clutch Plate','Fog Lamp','Roof Rail','Rear Spoiler','Floor Mats','Alloy Wheel 16"','Trunk Liner']
  },
  {
    brand:'Maruti', name:'Brezza ZXi+', type:['SUV'], stock: 14, condition: 'New',
    price:'13.84 Lakh', priceNum:1384000,
    fuel:'Petrol', engine:'1.5L K-Series', power:'103 HP', seats:5, range:'N/A', mileage:'19 kmpl', transmission:'6-Speed AT',
    image:'images/brezza.jpg.avif',
    parts:['K-Series Timing Belt','AT Filter','Sunroof Motor','360 Camera','Head Unit 9"','Alloy Wheel 16"','Ambient Light Kit','Wireless Charger']
  },
  {
    brand:'Toyota', name:'Fortuner Legender', type:['SUV'], stock: 4, condition: 'New',
    price:'43.43 Lakh', priceNum:4343000,
    fuel:'Diesel', engine:'2.8L 1GD-FTV', power:'204 HP', seats:7, range:'N/A', mileage:'13 kmpl', transmission:'6-Speed AT',
    image:'images/fortuner.jpg.webp',
    parts:['1GD-FTV Turbo','Transfer Case','Diff Lock','Running Board','Bull Bar','Tow Hitch','265/60 Tyres','Rear Entertainment']
  },
  {
    brand: 'Ford', name: 'Everest Titanium+', type: ['SUV'], stock: 1, condition: 'Used',
    price: '38.50 Lakh', priceNum: 3850000,
    fuel: 'Diesel', engine: '3.2L Titanim Plus', power: '210 HP', seats: 7, range: 'N/A', mileage: '12.5 kmpl', transmission: '6-Speed AT',
    image: 'images/everest.webp',
    parts: ['Bi-Turbo Intercooler', 'Terrain Management System', 'Electric Winch', 'Snorkel Intake', 'Panoroof Glass', 'Power Liftgate Motor']
  },
  {
    brand: 'Hyundai', name: 'Verna SX(O) Turbo', type: ['Sedan'], stock: 6, condition: 'New',
    price: '17.42 Lakh', priceNum: 1742000,
    fuel: 'Petrol', engine: '1.5L Turbo GDi', power: '160 HP', seats: 5, range: 'N/A', mileage: '18.6 kmpl', transmission: '7-Speed DCT',
    image: 'images/verna.jpg',
    parts: ['GDi Turbocharger', 'DCT Clutch Actuator', 'LED Horizon Light Bar', 'Bose 8-Speaker System', 'ADAS Front Radar']
  },
  {
    brand: 'Volkswagen', name: 'Virtus GT Plus', type: ['Sedan'], stock: 2, condition: 'New',
    price: '19.40 Lakh', priceNum: 1940000,
    fuel: 'Petrol', engine: '1.5L TSI EVO', power: '150 HP', seats: 5, range: 'N/A', mileage: '18.67 kmpl', transmission: '7-Speed DSG',
    image: 'images/virtus.jpg',
    parts: ['TSI Turbocharger', 'DSG Dual-Clutch Kit', 'Active Cylinder Tech (ACT) Sensor', 'Red Brake Calipers']
  },
  
  {
    brand: 'Skoda', name: 'Slavia 1.5 TSI Style', type: ['Sedan'], stock: 4, condition: 'New',
    price: '19.12 Lakh', priceNum: 1912000,
    fuel: 'Petrol', engine: '1.5L TSI Turbo', power: '150 HP', seats: 5, range: 'N/A', mileage: '18.7 kmpl', transmission: '7-Speed DSG / MT',
    image: 'images/slavia.jpg',
    parts: ['TSI Turbo Unit', 'DSG Mechatronic Kit', 'Cylinder Deactivation Sensor', 'Subwoofer Module']
  },
  
  {
    brand: 'Honda', name: 'Amaze VX CVT', type: ['Sedan'], stock: 11, condition: 'New',
    price: '9.96 Lakh', priceNum: 996000,
    fuel: 'Petrol', engine: '1.2L i-VTEC', power: '90 HP', seats: 5, range: 'N/A', mileage: '18.3 kmpl', transmission: 'CVT / 5-Speed MT',
    image: 'images/amaze.avif',
    parts: ['i-VTEC Engine Oil Filter', 'CVT Transmission Belt', 'Digipad 2.0 Touchscreen']
  },
  {
    brand: 'Maruti', name: 'Swift ZXi+', type: ['Hatchback'], stock: 30, condition: 'New',
    price: '9.14 Lakh', priceNum: 914000,
    fuel: 'Petrol', engine: '1.2L Z-Series', power: '82 HP', seats: 5, range: 'N/A', mileage: '24.8 kmpl', transmission: '5-Speed AMT/MT',
    image: 'images/Swift ZXi+.avif',
    parts: ['Z-Series Engine Block', 'AMT Gearbox Kit', 'LED Projector Lamps']
  },
  {
    brand: 'Maruti', name: 'Baleno Alpha', type: ['Hatchback'], stock: 16, condition: 'New',
    price: '9.88 Lakh', priceNum: 988000,
    fuel: 'Petrol', engine: '1.2L DualJet', power: '90 HP', seats: 5, range: 'N/A', mileage: '22.9 kmpl', transmission: 'AMT/MT',
    image: 'images/baleno.jpg',
    parts: ['Heads-up Display Module', '360 View Camera', '9-inch SmartPlay Pro+']
  },
  
  
  {
    brand: 'Tata', name: 'Tiago.ev Tech Lux', type: ['Hatchback', 'EV'], stock: 4, condition: 'New',
    price: '11.89 Lakh', priceNum: 1189000,
    fuel: 'Electric', engine: '24kWh Battery', power: '74 HP', seats: 5, range: '315 km', mileage: 'N/A', transmission: 'Automatic',
    image: 'images/tiago-ev.jpg',
    parts: ['Ziptron Battery Pack', 'Regenerative Braking Unit', 'CCS2 Charging Port']
  },
  
  {
    brand: 'Maruti', name: 'S-Presso VXi+', type: ['Hatchback'], stock: 2, condition: 'Used',
    price: '5.50 Lakh', priceNum: 550000,
    fuel: 'Petrol', engine: '1.0L K10C', power: '67 HP', seats: 5, range: 'N/A', mileage: '25.3 kmpl', transmission: 'AMT/MT',
    image: 'images/spresso.jpg',
    parts: ['Dynamic Center Console', 'Digital Instrument Cluster']
  },
  {
    brand: 'Tata', name: 'Altroz iCNG / Racer', type: ['Hatchback'], stock: 6, condition: 'New',
    price: '10.50 Lakh', priceNum: 1050000,
    fuel: 'Petrol/CNG', engine: '1.2L i-Turbo', power: '110 HP', seats: 5, range: 'N/A', mileage: '18 kmpl', transmission: 'Manual/DCA',
    image: 'images/altroz.avif',
    parts: ['90-degree Door Hinges', 'Twin Cylinder CNG Kit']
  },
  
  {
    brand: 'Tata', name: 'Safari Accomplished+ (A)', type: ['SUV'], stock: 2, condition: 'New',
    price: '27.34 Lakh', priceNum: 2734000,
    fuel: 'Diesel', engine: '2.0L Kryotec', power: '170 HP', seats: 7, range: 'N/A', mileage: '16.14 kmpl', transmission: '6-Speed AT',
    image: 'images/safari.webp',
    parts: ['Kryotec Turbo', 'Panoramic Sunroof', '360-Degree Camera', '12.3-inch Harman Touchscreen']
  },
  {
    brand: 'Mahindra', name: 'Thar LX 4-Wheel Drive', type: ['SUV'], stock: 4, condition: 'New',
    price: '17.00 Lakh', priceNum: 1700000,
    fuel: 'Diesel / Petrol', engine: '2.2L mHawk / 2.0L mStallion', power: '130 HP / 150 HP', seats: 4, range: 'N/A', mileage: '15.2 kmpl', transmission: '6-Speed AT / MT',
    image: 'images/thar.avif',
    parts: ['Shift-on-the-Touch 4WD', 'Mechanical Locking Differential', 'Removable Hard Top']
  },
  {
    brand: 'Mahindra', name: 'Bolero B6 (O)', type: ['SUV'], stock: 4, condition: 'Used',
    price: '10.91 Lakh', priceNum: 1091000,
    fuel: 'Diesel', engine: '1.5L mHawk75', power: '75 HP', seats: 7, range: 'N/A', mileage: '16 kmpl', transmission: '5-Speed MT',
    image: 'images/bolero.webp',
    parts: ['mHawk75 Turbocharger', 'Metal Body Panels', 'Rear Leaf Spring Suspension']
  },
  {
    brand: 'Mahindra', name: 'Bolero Neo N10 (L)', type: ['SUV'], stock: 7, condition: 'New',
    price: '12.15 Lakh', priceNum: 1215000,
    fuel: 'Diesel', engine: '1.5L mHawk100', power: '100 HP', seats: 7, range: 'N/A', mileage: '17.2 kmpl', transmission: '5-Speed MT',
    image: 'images/bolero-neo.webp',
    parts: ['Multi-Terrain Technology', 'Static Bending Headlamps']
  },
  {
    brand: 'Mahindra', name: 'Scorpio Classic S11', type: ['SUV'], stock: 6, condition: 'New',
    price: '17.35 Lakh', priceNum: 1735000,
    fuel: 'Diesel', engine: '2.2L mHawk', power: '130 HP', seats: 7, range: 'N/A', mileage: '15 kmpl', transmission: '6-Speed MT',
    image: 'images/scorpio-classic.avif',
    parts: ['Classic Bonnet Scoop', 'LED Eyebrows', 'Signature Side Cladding']
  },
  {
    brand: 'Mahindra', name: 'Scorpio-N Z8L 4WD', type: ['SUV'], stock: 3, condition: 'New',
    price: '24.54 Lakh', priceNum: 2454000,
    fuel: 'Diesel / Petrol', engine: '2.2L mHawk / 2.0L mStallion', power: '175 HP / 203 HP', seats: 7, range: 'N/A', mileage: '14 kmpl', transmission: '6-Speed AT/MT',
    image: 'images/scorpio-n.jpeg',
    parts: ['4XPLOR Terrain Modes', 'Sony 12-Speaker System', 'Watt’s Linkage Suspension']
  },
  
  
  {
    brand: 'Mahindra', name: 'XUV 7XO (700 Facelift)', type: ['SUV'], stock: 4, condition: 'New',
    price: '26.99 Lakh', priceNum: 2699000,
    fuel: 'Diesel', engine: '2.2L mHawk', power: '200 HP', seats: 7, range: 'N/A', mileage: '15.5 kmpl', transmission: '6-Speed AT',
    image: 'images/xuv7xo.jpg',
    parts: ['Smart Door Handles', 'Dual 10.25-inch Screens', 'Memory Seat Module']
  },
  
  {
    brand: 'Maruti', name: 'Fronx Alpha Turbo', type: ['SUV'], stock: 9, condition: 'New',
    price: '13.04 Lakh', priceNum: 1304000,
    fuel: 'Petrol', engine: '1.0L BoosterJet', power: '100 HP', seats: 5, range: 'N/A', mileage: '21.5 kmpl', transmission: '6-Speed AT / MT',
    image: 'images/fronx.webp',
    parts: ['BoosterJet Turbocharger', 'Head-Up Display Unit', '360 View Camera']
  },
  
  
  {
    brand: 'Tata', name: 'Sierra.ev (Concept Edition)', type: ['SUV', 'EV'], stock: 0, condition: 'New',
    price: '25.00 Lakh', priceNum: 2500000,
    fuel: 'Electric', engine: '60kWh Battery', power: '180 HP', seats: 5, range: '500 km', mileage: 'N/A', transmission: 'Automatic',
    image: 'images/sierra.jpg',
    parts: ['Signature Alpine Windows', 'Ziptron High-Volt Motor', 'Dual-Tone Leather Interior']
  },
  {
    brand: 'Toyota', name: 'Innova Crysta VX', type: ['SUV'], stock: 3, condition: 'Used',
    price: '26.30 Lakh', priceNum: 2630000,
    fuel: 'Diesel', engine: '2.4L GD-Series', power: '150 HP', seats: 7, range: 'N/A', mileage: '15 kmpl', transmission: '5-Speed MT',
    image: 'images/innova.webp',
    parts: ['GD-Series Turbocharger', 'Wood Finish Dashboard Panel', 'Captain Seat Armrests']
  }
];

// Combine DB cars with local list
let cars = [...defaultCarsList]; 
let currentFilter = 'All';
let currentSearchQuery = '';

// Load cars from the backend API
async function loadAllCars() {
  try {
    const res = await fetch(`${API_URL}/cars`);
    if (res.ok) {
      const backendCars = await res.json();
      cars = [...backendCars, ...defaultCarsList];
      
      const grid = document.getElementById('inventoryGrid');
      if (grid) {
        renderCars(currentFilter, currentSearchQuery);
      }
    }
  } catch (err) {
    console.log("Backend not connected, using default cars list.", err);
  }
}
// Trigger fetch immediately
loadAllCars();


function stockLabel(stockQty) {
  if (stockQty > 5) return '✅ Available';
  if (stockQty > 0) return '⚠️ Only ' + stockQty + ' Left';
  return '❌ Out of Stock';
}

// ── RENDER WITH GLOBAL SEARCH CAPABILITY ──
function renderCars(filter = 'All', searchQuery = '') {
  currentFilter = filter;
  currentSearchQuery = searchQuery;
  
  const grid = document.getElementById('inventoryGrid');
  if (!grid) return; 

  let filtered = filter === 'All' ? cars : cars.filter(c => {
    if (c.brand === filter || c.condition.toLowerCase() === filter.toLowerCase()) return true;
    if (Array.isArray(c.type)) {
      return c.type.some(t => t.toLowerCase() === filter.toLowerCase());
    }
    return c.type && c.type.toLowerCase() === filter.toLowerCase();
  });

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(c => 
      c.brand.toLowerCase().includes(q) || 
      c.name.toLowerCase().includes(q) ||
      (Array.isArray(c.type) ? c.type.join(' ').toLowerCase().includes(q) : c.type.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; font-size: 18px; color: var(--muted);">No vehicles found matching your search.</div>`;
    return;
  }

  grid.innerHTML = filtered.map((c, i) => {
    let badgeBg = c.stock > 5 ? '#00c853' : (c.stock > 0 ? 'var(--gold)' : 'var(--red)');
    let badgeColor = c.stock > 5 ? '#fff' : (c.stock > 0 ? '#000' : '#fff');
    const safeImageSrc = getImageUrl(c.image);

    return `
    <div class="car-card reveal" style="animation-delay:${i * 0.07}s">
      <div class="car-badge" style="background:${badgeBg}; color:${badgeColor};">${stockLabel(c.stock)}</div>
      <div class="car-img-wrap">
        <img
          src="${safeImageSrc}"
          alt="${c.brand} ${c.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/320px-No_image_available.svg.png'"
          style="width:100%;height:100%;object-fit:cover;display:block;"
        >
      </div>
      <div class="car-info">
        <div class="car-brand">${c.brand} · <span style="color:var(--gold);font-weight:700;">${c.condition.toUpperCase()}</span></div>
        <div class="car-name">${c.name}</div>
        <div class="car-specs">
          <span class="spec-tag">${c.fuel}</span>
          <span class="spec-tag">${c.engine}</span>
          <span class="spec-tag">${c.power}</span>
          <span class="spec-tag">${c.seats} Seats</span>
        </div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:8px">Mileage: ${c.mileage} &nbsp;|&nbsp; Gearbox: ${c.transmission}</div>
        <div class="car-price-row">
          <div class="car-price">₹${c.price} <span>on-road*</span></div>
          <button class="btn-details" onclick="openModal(${cars.indexOf(c)})">See Details</button>
        </div>
      </div>
    </div>
  `}).join('');

  observeReveal();
}

function filterCars(filter, btn) {
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderCars(filter);
}

function openModal(idx) {
  const c = cars[idx];
  
  if(!document.getElementById('modalBrand')) return;

  document.getElementById('modalBrand').textContent = `${c.brand} (${c.condition})`;
  document.getElementById('modalName').textContent = c.name;
  
  const modalImageSrc = getImageUrl(c.image);

  document.getElementById('modalStats').innerHTML = `
    <div style="grid-column:1/-1;margin-bottom:16px;">
      <img
        src="${modalImageSrc}"
        alt="${c.brand} ${c.name}"
        onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/320px-No_image_available.svg.png'"
        style="width:100%;height:220px;object-fit:cover;border-radius:10px;display:block;"
      >
    </div>
    ${[
      ['💰 Ex-showroom', `₹${c.price}`],
      ['🏷️ Condition',   c.condition],
      ['⛽ Fuel Type',   c.fuel],
      ['🔧 Engine',      c.engine],
      ['⚡ Power',       c.power],
      ['👥 Seats',       c.seats],
      ['🛣️ Mileage',    c.mileage],
      ['🔄 Gearbox',     c.transmission],
    ].map(([l, v]) => `
      <div class="modal-stat">
        <div class="modal-stat-label">${l}</div>
        <div class="modal-stat-val">${v}</div>
      </div>`).join('')}
  `;

  if (document.getElementById('modalParts')) {
    document.getElementById('modalParts').innerHTML = c.parts
      .map(p => `<span class="part-chip">${p}</span>`).join('');
  }

  const base = c.priceNum;
  document.getElementById('modalPricing').innerHTML = [
    ['Ex-showroom',    `₹${(base / 100000).toFixed(2)} L`],
    ['Road Tax (~10%)',`₹${(base * 0.10 / 100000).toFixed(2)} L`],
    ['Insurance (1yr)',`₹${(base * 0.035 / 100000).toFixed(2)} L`],
    ['Registration',   `₹${(base * 0.02 / 100000).toFixed(2)} L`],
    ['On-Road Est.',   `₹${(base * 1.155 / 100000).toFixed(2)} L`],
    ['TCS (1%)',       base > 1000000 ? `₹${(base * 0.01 / 100000).toFixed(2)} L` : 'N/A'],
  ].map(([l, v]) => `
    <div class="modal-stat">
      <div class="modal-stat-label">${l}</div>
      <div class="modal-stat-val" style="color:var(--gold)">${v}</div>
    </div>`).join('');

  document.getElementById('carModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('carModal').classList.remove('open');
  document.body.style.overflow = '';
}

if (document.getElementById('carModal')) {
  document.getElementById('carModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
}

function calcEMI() {
  if (!document.getElementById('emiPrice')) return;
  
  const exShowroom = +document.getElementById('emiPrice').value;
  const downPayment = +document.getElementById('emiDown').value;
  const R = +document.getElementById('emiRate').value;
  const N = +document.getElementById('emiTenure').value;

  document.getElementById('emiPriceVal').textContent  = '₹' + exShowroom.toLocaleString('en-IN');
  document.getElementById('emiDownVal').textContent   = '₹' + downPayment.toLocaleString('en-IN');
  document.getElementById('emiRateVal').textContent   = R.toFixed(1) + '%';
  document.getElementById('emiTenureVal').textContent = N + ' months';

  const tcs = exShowroom > 1000000 ? exShowroom * 0.01 : 0;
  const rto = exShowroom * 0.10;
  const insurance = exShowroom * 0.035;
  const miscCharges = 2500;

  const onRoadPrice = exShowroom + tcs + rto + insurance + miscCharges;

  let loan = onRoadPrice - downPayment;
  if (loan < 0) loan = 0;

  const r = R / 12 / 100;
  let emi = 0;
  if (loan > 0 && r > 0) {
    emi = Math.round(loan * r * Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1));
  } else if (loan > 0 && r === 0) {
    emi = Math.round(loan / N);
  }

  const totalPay = emi * N;
  const totalInt = totalPay - loan;

  document.getElementById('emiMonthly').textContent  = '₹' + emi.toLocaleString('en-IN');
  
  const emiOnRoadEl = document.getElementById('emiOnRoad');
  if(emiOnRoadEl) emiOnRoadEl.textContent = '₹' + Math.round(onRoadPrice).toLocaleString('en-IN');
  
  document.getElementById('emiLoanAmt').textContent  = '₹' + Math.round(loan).toLocaleString('en-IN');
  document.getElementById('emiTotalInt').textContent = '₹' + Math.round(totalInt).toLocaleString('en-IN');
  document.getElementById('emiTotalPay').textContent = '₹' + Math.round(totalPay).toLocaleString('en-IN');
}

// ── ENQUIRY FORM SUBMISSION ──
async function submitEnquiryForm() {
  const firstName = document.getElementById('fname')?.value.trim();
  const lastName = document.getElementById('lname')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const city = document.getElementById('citySelect')?.value; 
  const interestedIn = document.getElementById('interestedSelect')?.value; 
  const message = document.getElementById('messageBox')?.value.trim();

  if (!firstName || !phone || !email) {
    showToast('⚠️ Please fill out required fields!');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/submit-enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, phone, email, city, interestedIn, message })
    });

    const data = await response.json();
    if (response.ok) {
      showToast('✅ Enquiry submitted & confirmation email sent!');
      const successDiv = document.getElementById('formSuccess');
      if (successDiv) successDiv.style.display = 'block';
    } else {
      showToast('⚠️ ' + data.message);
    }
  } catch (err) {
    showToast('❌ Server Error. Could not send email.');
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

function toggleMenu() {
  document.getElementById('navbar').classList.toggle('open');
}

// ── NEW REGISTRATION FUNCTION (API) ──
async function handleRegistration() {
  const name = document.getElementById('regName')?.value.trim();
  const contact = document.getElementById('regContact')?.value.trim();
  const pass = document.getElementById('regPass')?.value.trim();

  if (!name || !contact || !pass) {
    showToast('⚠️ Please fill out all fields!');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, contact, password: pass })
    });
    const data = await res.json();

    if (res.ok) {
      showToast('✅ Account created! Please log in.');
      setTimeout(() => {
        if (typeof switchAuthTab === 'function') switchAuthTab('login');
      }, 1500);
    } else {
      showToast('⚠️ ' + data.message);
    }
  } catch (err) {
    showToast('❌ Server Error. Is backend running?');
  }
}

// ── NEW LOGIN FUNCTION (API) ──
async function handleUnifiedLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  if (!user || !pass) {
    showToast('⚠️ Please enter both username and password!');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('autoIndiaToken', data.token);
      localStorage.setItem('autoIndiaUserName', data.name);
      localStorage.setItem('autoindia_user', 'true'); // Syncs with custom navbar user session state

      if (data.role === 'admin') {
        localStorage.setItem('autoIndiaAdminLoggedIn', 'true');
        showToast('✅ Admin Login Successful!');
        setTimeout(() => window.location.href = 'add-car.html', 1200);
      } else {
        localStorage.setItem('autoIndiaUserLoggedIn', 'true');
        showToast(`✅ Welcome back, ${data.name}!`);
        setTimeout(() => window.location.href = 'user-dashboard.html', 1200);
      }
    } else {
      showToast('⚠️ ' + data.message);
    }
  } catch (err) {
    showToast('❌ Server Error. Is backend running?');
  }
}

function adminLogout() {
  localStorage.removeItem('autoIndiaAdminLoggedIn');
  localStorage.removeItem('autoIndiaToken');
  localStorage.removeItem('autoindia_user');
  showToast('🔒 Logged out successfully.');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// ── SAVE NEW CAR TO API (ADMIN PANEL) ──
async function saveNewCarLocally() {
  const token = localStorage.getItem('autoIndiaToken');

  const newCarObj = {
    brand: document.getElementById('carBrand').value.trim(),
    name: document.getElementById('carName').value.trim(),
    type: [document.getElementById('carType').value],
    condition: document.getElementById('carCondition').value,
    stock: parseInt(document.getElementById('carStock').value) || 5,
    price: document.getElementById('carPrice').value.trim(),
    priceNum: parseFloat(document.getElementById('carPriceNum').value) || 1000000,
    fuel: document.getElementById('carFuel').value,
    engine: document.getElementById('carEngine').value.trim() || 'Not Specified',
    power: document.getElementById('carPower').value.trim() || 'N/A',
    seats: parseInt(document.getElementById('carSeats').value) || 5,
    transmission: document.getElementById('carTransmission').value,
    mileage: document.getElementById('carMileage').value.trim() || 'N/A',
    image: document.getElementById('carImage').value.trim() || 'images/nexon-ev.jpg.avif',
    parts: document.getElementById('carParts').value ? document.getElementById('carParts').value.split(',').map(p => p.trim()) : ['Standard Features']
  };

  try {
    const res = await fetch(`${API_URL}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newCarObj)
    });

    if (res.ok) {
      showToast('✅ Car added to MongoDB database!');
      setTimeout(() => window.location.reload(), 1200);
    } else {
      const errData = await res.json();
      showToast('⚠️ ' + (errData.message || 'Failed to save car'));
    }
  } catch (err) {
    showToast('❌ Server Error. Check server terminal.');
  }
}

// ── ENHANCED CHATBOT SCRIPT (WITH FULL CONVERSATION FLOWS & CONTACT OPTIONS) ──
function toggleChat() {
  document.getElementById('chatContainer').classList.toggle('open');
}

function handleChatKey(e) { 
  if (e.key === 'Enter') sendChatMessage(); 
}

function appendMessage(text, side) {
  const box = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.className = `chat-msg ${side}`;
  div.style.cssText = side === 'user' 
    ? "background: #ff4724; color: #fff; padding: 8px 12px; border-radius: 8px; margin: 6px 0; max-width: 80%; margin-left: auto; word-break: break-word;"
    : "background: #f1f3f5; color: #212529; padding: 8px 12px; border-radius: 8px; margin: 6px 0; max-width: 80%; word-break: break-word;";
  div.innerHTML = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function sendChatMessage() {
  const inputField = document.getElementById('chatInput');
  const userText = inputField.value.trim();
  if (!userText) return;

  appendMessage(userText, 'user');
  inputField.value = '';

  setTimeout(() => {
    const textLower = userText.toLowerCase();
    let responseHTML = "";

    if (textLower.includes('hi') || textLower.includes('hello') || textLower.includes('hey')) {
      responseHTML = "Hello there! Welcome to AutoIndia Motors. How can I assist you with finding your dream car today?";
    } 
    else if (textLower.includes('price') || textLower.includes('cost') || textLower.includes('budget')) {
      responseHTML = "We feature vehicles ranging from under ₹5 Lakhs to luxury models above ₹20 Lakhs. You can use our <a href='inventory.html' style='color: #ff4724; font-weight: 700;'>Inventory page</a> to filter vehicles by your precise budget!";
    } 
    else if (textLower.includes('brand') || textLower.includes('tata') || textLower.includes('mahindra') || textLower.includes('hyundai') || textLower.includes('kia')) {
      responseHTML = "We partner with top multi-brand manufacturers including Tata Motors, Mahindra, Hyundai, Kia, and Ford. Check out our <a href='new-cars.html' style='color: #ff4724; font-weight: 700;'>New Cars section</a> to view the latest lineups.";
    }
    else if (textLower.includes('emi') || textLower.includes('loan') || textLower.includes('finance')) {
      responseHTML = "Yes, we offer flexible car financing and low-interest loans. You can easily estimate your monthly payments using our <a href='emi.html' style='color: #ff4724; font-weight: 700;'>EMI Calculator</a>.";
    } 
    else if (textLower.includes('test drive') || textLower.includes('book')) {
      responseHTML = "We'd love to set you up with a test drive! Please head over to our <a href='contact.html' style='color: #ff4724; font-weight: 700;'>Contact Page</a> to schedule your preferred slot.";
    } 
    else if (textLower.includes('warranty') || textLower.includes('insurance')) {
      responseHTML = "All our brand new cars come with full manufacturer warranties, and our pre-owned models are fully certified and inspected. We also assist with comprehensive vehicle insurance options.";
    }
    else if (textLower.includes('trade') || textLower.includes('exchange') || textLower.includes('old car')) {
      responseHTML = "Yes! We accept old car trade-ins with instant valuation. Bring your vehicle to any of our hubs or visit our <a href='contact.html' style='color: #ff4724; font-weight: 700;'>Contact Page</a> to book an evaluation.";
    }
    else if (textLower.includes('delivery') || textLower.includes('home delivery')) {
      responseHTML = "We offer safe doorstep home delivery for all purchased vehicles right to your location!";
    }
    else if (textLower.includes('service') || textLower.includes('repair') || textLower.includes('maintenance')) {
      responseHTML = "Our multi-brand service centers handle scheduled maintenance, repairs, and modifications. Reach out via our <a href='contact.html' style='color: #ff4724; font-weight: 700;'>Contact Page</a> to book a service appointment.";
    }
    else if (textLower.includes('timing') || textLower.includes('hours') || textLower.includes('open')) {
      responseHTML = "Our showrooms and support desks are open Monday through Saturday from 9:00 AM to 8:00 PM.";
    }
    else if (textLower.includes('location') || textLower.includes('address') || textLower.includes('city') || textLower.includes('hyderabad')) {
      responseHTML = "We operate across major Indian cities including Hyderabad, Mumbai, Bangalore, New Delhi, and Chennai. Check the city selector on top or visit our <a href='contact.html' style='color: #ff4724; font-weight: 700;'>Contact page</a> for detailed dealership branches.";
    } 
    else if (textLower.includes('thank')) {
      responseHTML = "You're very welcome! Let me know if you need help with anything else, or feel free to connect via our <a href='contact.html' style='color: #ff4724; font-weight: 700;'>Contact page</a>.";
    }
    else {
      responseHTML = "I want to make sure you get the exact details you need! Please drop your query directly through our <a href='contact.html' style='color: #ff4724; font-weight: 700;'>Contact Page</a> or chat with us instantly on WhatsApp using the floating button.";
    }

    appendMessage(responseHTML, 'bot');
  }, 500);
}

// ── FILTER EXTENSION FOR HOMEPAGE REDIRECT ──
function filterCarsByParams(params) {
  const { condition, vehicleType, budget, brand } = params;
  
  const grid = document.getElementById('inventoryGrid');
  if (!grid) return;

  let filtered = [...cars];

  if (condition) {
    filtered = filtered.filter(c => c.condition.toLowerCase() === condition.toLowerCase());
  }
  
  // FIXED: Explicitly handling vehicleType filtering to ensure Sedan, SUV, etc. match successfully
  if (vehicleType && vehicleType !== 'All' && vehicleType !== 'All Vehicle Types') {
    filtered = filtered.filter(c => {
      if (Array.isArray(c.type)) {
        return c.type.some(t => t.toLowerCase() === vehicleType.toLowerCase());
      }
      return c.type && c.type.toLowerCase() === vehicleType.toLowerCase();
    });
  }

  if (brand && brand !== 'Select Brand') {
    filtered = filtered.filter(c => c.brand.toLowerCase() === brand.toLowerCase());
  }
  
  if (budget && budget !== 'Select Budget') {
    filtered = filtered.filter(c => {
      const p = c.priceNum;
      if (budget.includes('Under ₹5 Lakh')) return p < 500000;
      if (budget.includes('₹5 - ₹10 Lakh')) return p >= 500000 && p <= 1000000;
      if (budget.includes('₹10 - ₹20 Lakh')) return p > 1000000 && p <= 2000000;
      if (budget.includes('Above ₹20 Lakh')) return p > 2000000;
      return true;
    });
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; font-size: 18px; color: var(--muted);">No vehicles found matching your custom criteria.</div>`;
    return;
  }

  grid.innerHTML = filtered.map((c, i) => {
    let badgeBg = c.stock > 5 ? '#00c853' : (c.stock > 0 ? 'var(--gold)' : 'var(--red)');
    let badgeColor = c.stock > 5 ? '#fff' : (c.stock > 0 ? '#000' : '#fff');
    const safeImageSrc = getImageUrl(c.image);

    return `
    <div class="car-card reveal" style="animation-delay:${i * 0.07}s">
      <div class="car-badge" style="background:${badgeBg}; color:${badgeColor};">${stockLabel(c.stock)}</div>
      <div class="car-img-wrap">
        <img src="${safeImageSrc}" alt="${c.brand} ${c.name}" loading="lazy" onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/320px-No_image_available.svg.png'" style="width:100%;height:100%;object-fit:cover;display:block;">
      </div>
      <div class="car-info">
        <div class="car-brand">${c.brand} · <span style="color:var(--gold);font-weight:700;">${c.condition.toUpperCase()}</span></div>
        <div class="car-name">${c.name}</div>
        <div class="car-specs">
          <span class="spec-tag">${c.fuel}</span>
          <span class="spec-tag">${c.engine}</span>
          <span class="spec-tag">${c.power}</span>
          <span class="spec-tag">${c.seats} Seats</span>
        </div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:8px">Mileage: ${c.mileage} &nbsp;|&nbsp; Gearbox: ${c.transmission}</div>
        <div class="car-price-row">
          <div class="car-price">₹${c.price} <span>on-road*</span></div>
          <button class="btn-details" onclick="openModal(${cars.indexOf(c)})">See Details</button>
        </div>
      </div>
    </div>
  `}).join('');

  observeReveal();
}

window.addEventListener('scroll', () => {
  const s    = window.scrollY > 80;
  const nav  = document.getElementById('navbar');
  const btop = document.getElementById('backTop');
  if (nav)  nav.classList.toggle('scrolled', s);
  if (btop) btop.classList.toggle('visible', window.scrollY > 400);
});

function observeReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80)
      el.classList.add('visible');
  });
}
window.addEventListener('scroll', observeReveal);

window.addEventListener('load', () => {
  const inventoryGrid = document.getElementById('inventoryGrid');
  if (inventoryGrid) {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const brandToFilter = urlParams.get('brand');
    const searchToFilter = urlParams.get('search'); 

    if (searchToFilter) {
      renderCars('All', searchToFilter);
    } else if (path.includes('new-cars.html')) {
      renderCars('New');
    } else if (path.includes('used-cars.html')) {
      renderCars('Used');
    } else if (brandToFilter) {
      const filterButtons = document.querySelectorAll('.filter-btn');
      let activeButton = null;
      filterButtons.forEach(btn => {
        if (btn.textContent.trim() === brandToFilter) {
          activeButton = btn;
        }
      });
      filterCars(brandToFilter, activeButton);
    } else {
      // Intentionally left blank. loadAllCars() will trigger the initial render.
    }
  }

  calcEMI();
  observeReveal();

  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) {
      l.classList.add('fade-out');
      setTimeout(() => l.style.display = 'none', 600);
    }
  }, 1800);
});