import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (simulating MongoDB)
let perfumes = [
  {
    id: '1',
    name: 'Midnight Elegance',
    description: 'A sophisticated blend of bergamot and sandalwood',
    fullDescription: 'Midnight Elegance captures the essence of a starlit evening with its sophisticated blend of bergamot, jasmine, and sandalwood. This luxurious fragrance opens with fresh citrus notes, transitions to a floral heart, and settles into a warm, woody base that lingers beautifully on the skin.',
    price: 185,
    size: '50ml',
    gender: 'Unisex',
    fragranceType: 'Oriental',
    notes: ['Bergamot', 'Jasmine', 'Sandalwood', 'Vanilla'],
    image: 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg',
    images: [
      'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg',
      'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg',
      'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg'
    ],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 127
  },
  {
    id: '2',
    name: 'Rose Garden Dreams',
    description: 'Delicate rose petals with hints of peony',
    fullDescription: 'Rose Garden Dreams is a romantic floral fragrance that captures the beauty of a blooming garden at dawn. With top notes of fresh rose petals, a heart of peony and lily of the valley, and a base of soft musk, this perfume embodies feminine grace and elegance.',
    price: 165,
    size: '50ml',
    gender: 'Women',
    fragranceType: 'Floral',
    notes: ['Rose', 'Peony', 'Lily of the Valley', 'Musk'],
    image: 'https://images.pexels.com/photos/1458838/pexels-photo-1458838.jpeg',
    images: [
      'https://images.pexels.com/photos/1458838/pexels-photo-1458838.jpeg',
      'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg',
      'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg'
    ],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Ocean Breeze',
    description: 'Fresh aquatic notes with marine minerals',
    fullDescription: 'Ocean Breeze brings the invigorating essence of the sea to your daily routine. This fresh aquatic fragrance combines marine minerals with crisp bergamot and a touch of driftwood, creating a clean, energizing scent perfect for the modern individual.',
    price: 145,
    size: '50ml',
    gender: 'Men',
    fragranceType: 'Aquatic',
    notes: ['Marine Minerals', 'Bergamot', 'Driftwood', 'Sea Salt'],
    image: 'https://images.pexels.com/photos/1190831/pexels-photo-1190831.jpeg',
    images: [
      'https://images.pexels.com/photos/1190831/pexels-photo-1190831.jpeg',
      'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
      'https://images.pexels.com/photos/1337478/pexels-photo-1337478.jpeg'
    ],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 156
  },
  {
    id: '4',
    name: 'Golden Amber',
    description: 'Warm amber with exotic spices',
    fullDescription: 'Golden Amber is a luxurious oriental fragrance that envelops you in warmth and sophistication. Rich amber forms the heart of this composition, enhanced by exotic spices like cardamom and cinnamon, and grounded by precious woods and vanilla.',
    price: 225,
    size: '50ml',
    gender: 'Unisex',
    fragranceType: 'Oriental',
    notes: ['Amber', 'Cardamom', 'Cinnamon', 'Vanilla', 'Sandalwood'],
    image: 'https://images.pexels.com/photos/1190832/pexels-photo-1190832.jpeg',
    images: [
      'https://images.pexels.com/photos/1190832/pexels-photo-1190832.jpeg',
      'https://images.pexels.com/photos/1458839/pexels-photo-1458839.jpeg',
      'https://images.pexels.com/photos/965991/pexels-photo-965991.jpeg'
    ],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 203
  },
  {
    id: '5',
    name: 'Citrus Burst',
    description: 'Energizing blend of citrus and herbs',
    fullDescription: 'Citrus Burst is an invigorating fragrance that awakens the senses with its vibrant blend of fresh citrus fruits and aromatic herbs. Perfect for daytime wear, this energizing scent combines grapefruit, lemon, and basil for a refreshing experience.',
    price: 125,
    size: '50ml',
    gender: 'Unisex',
    fragranceType: 'Citrus',
    notes: ['Grapefruit', 'Lemon', 'Basil', 'Green Tea'],
    image: 'https://images.pexels.com/photos/1337479/pexels-photo-1337479.jpeg',
    images: [
      'https://images.pexels.com/photos/1337479/pexels-photo-1337479.jpeg',
      'https://images.pexels.com/photos/1190833/pexels-photo-1190833.jpeg',
      'https://images.pexels.com/photos/1458840/pexels-photo-1458840.jpeg'
    ],
    inStock: true,
    featured: false,
    rating: 4.3,
    reviews: 78
  },
  {
    id: '6',
    name: 'Velvet Noir',
    description: 'Dark and mysterious with black currant',
    fullDescription: 'Velvet Noir is a captivating fragrance that embodies mystery and allure. This dark composition opens with black currant and plum, develops into a heart of dark chocolate and coffee, and finishes with a base of leather and patchouli.',
    price: 195,
    size: '50ml',
    gender: 'Women',
    fragranceType: 'Oriental',
    notes: ['Black Currant', 'Plum', 'Dark Chocolate', 'Coffee', 'Leather'],
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
    images: [
      'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
      'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg',
      'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg'
    ],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 142
  },
  {
    id: '7',
    name: 'Forest Walk',
    description: 'Earthy woods with pine and cedar',
    fullDescription: 'Forest Walk captures the essence of a peaceful stroll through an ancient forest. This woody fragrance combines fresh pine needles with warm cedar and earthy moss, creating a grounding and natural scent that connects you with nature.',
    price: 155,
    size: '50ml',
    gender: 'Men',
    fragranceType: 'Woody',
    notes: ['Pine', 'Cedar', 'Moss', 'Vetiver'],
    image: 'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg',
    images: [
      'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg',
      'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg',
      'https://images.pexels.com/photos/1458838/pexels-photo-1458838.jpeg'
    ],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 94
  },
  {
    id: '8',
    name: 'Lavender Fields',
    description: 'Calming lavender with chamomile',
    fullDescription: 'Lavender Fields is a serene and calming fragrance inspired by the purple fields of Provence. This soothing composition blends pure lavender with gentle chamomile and soft vanilla, creating a peaceful and relaxing scent perfect for evening wear.',
    price: 135,
    size: '50ml',
    gender: 'Unisex',
    fragranceType: 'Floral',
    notes: ['Lavender', 'Chamomile', 'Vanilla', 'White Musk'],
    image: 'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg',
    images: [
      'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg',
      'https://images.pexels.com/photos/1337478/pexels-photo-1337478.jpeg',
      'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg'
    ],
    inStock: true,
    featured: true,
    rating: 4.4,
    reviews: 67
  }
];

let contacts = [];

// API Routes

// Get all perfumes
app.get('/api/perfumes', (req, res) => {
  const { search, gender, fragranceType, minPrice, maxPrice, sortBy } = req.query;
  
  let filteredPerfumes = [...perfumes];
  
  // Search filter
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredPerfumes = filteredPerfumes.filter(perfume => 
      perfume.name.toLowerCase().includes(searchTerm) ||
      perfume.description.toLowerCase().includes(searchTerm) ||
      perfume.notes.some(note => note.toLowerCase().includes(searchTerm))
    );
  }
  
  // Gender filter
  if (gender && gender !== 'All') {
    filteredPerfumes = filteredPerfumes.filter(perfume => perfume.gender === gender);
  }
  
  // Fragrance type filter
  if (fragranceType && fragranceType !== 'All') {
    filteredPerfumes = filteredPerfumes.filter(perfume => perfume.fragranceType === fragranceType);
  }
  
  // Price range filter
  if (minPrice) {
    filteredPerfumes = filteredPerfumes.filter(perfume => perfume.price >= parseInt(minPrice));
  }
  if (maxPrice) {
    filteredPerfumes = filteredPerfumes.filter(perfume => perfume.price <= parseInt(maxPrice));
  }
  
  // Sorting
  if (sortBy) {
    switch (sortBy) {
      case 'price-low':
        filteredPerfumes.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredPerfumes.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // For demo purposes, reverse the array to simulate newest first
        filteredPerfumes.reverse();
        break;
      case 'rating':
        filteredPerfumes.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
  
  res.json(filteredPerfumes);
});

// Get featured perfumes
app.get('/api/perfumes/featured', (req, res) => {
  const featuredPerfumes = perfumes.filter(perfume => perfume.featured);
  res.json(featuredPerfumes);
});

// Get single perfume
app.get('/api/perfumes/:id', (req, res) => {
  const perfume = perfumes.find(p => p.id === req.params.id);
  if (!perfume) {
    return res.status(404).json({ message: 'Perfume not found' });
  }
  res.json(perfume);
});

// Contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const newContact = {
    id: uuidv4(),
    name,
    email,
    message,
    date: new Date().toISOString()
  };
  
  contacts.push(newContact);
  
  res.status(201).json({ 
    message: 'Thank you for your message! We will get back to you soon.',
    contact: newContact 
  });
});

// Get fragrance types for filters
app.get('/api/fragrance-types', (req, res) => {
  const types = [...new Set(perfumes.map(p => p.fragranceType))];
  res.json(types);
});

app.listen(PORT, () => {
  console.log(`Aroma Bills server running on port ${PORT}`);
});