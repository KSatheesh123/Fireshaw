require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const seedProducts = require('./data/seedData');
const { seedDefaultUsers } = require('./controllers/authController');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Database Connection & Auto-seed initialization
let isSeeded = false;
async function initializeDB() {
  try {
    await connectDB();
    if (!isSeeded) {
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('[Auto-Seed] Products collection is empty. Populating Fireshaw catalog...');
        await Product.insertMany(seedProducts);
        console.log(`[Auto-Seed] Successfully inserted ${seedProducts.length} fire safety products.`);
      }
      await seedDefaultUsers();
      isSeeded = true;
    }
  } catch (err) {
    console.error('[DB Init Error]:', err.message);
  }
}

// Ensure DB is connected for serverless invocations
app.use(async (req, res, next) => {
  await initializeDB();
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    store: 'Fireshaw Fire Safety Equipment Store',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.send('Fireshaw Fire Safety Equipments Backend API is running.');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start listener only when run directly (not serverless import)
const PORT = process.env.PORT || 5000;
if (require.main === module || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🔥 Fireshaw Server running on port ${PORT}`);
    console.log(`👉 API Health: http://localhost:${PORT}/api/health`);
    console.log(`👉 Products API: http://localhost:${PORT}/api/products`);
    console.log(`👉 Orders API: http://localhost:${PORT}/api/orders`);
    console.log(`👉 Auth API: http://localhost:${PORT}/api/auth`);
  });
}

module.exports = app;
