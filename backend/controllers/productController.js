const Product = require('../models/Product');
const seedProducts = require('../data/seedData');

// Get all products with filtering, search, and sorting
exports.getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      fireClass,
      industry,
      minPrice,
      maxPrice,
      sort,
      featured,
    } = req.query;

    const query = {};

    // Search keyword in name or description or sku
    if (search && search.trim() !== '') {
      query.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { sku: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    // Category filter
    if (category && category !== 'All' && category !== 'all') {
      query.category = category;
    }

    // Fire class filter (Class A, Class B, Class C, Class D, Class K)
    if (fireClass && fireClass !== 'All') {
      query.fireClasses = { $in: [fireClass] };
    }

    // Industry filter (Residential, Commercial, Industrial, Kitchen)
    if (industry && industry !== 'All') {
      query.industry = { $in: [industry] };
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Featured only
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Sorting
    let sortQuery = { createdAt: -1 };
    if (sort === 'price-low') {
      sortQuery = { price: 1 };
    } else if (sort === 'price-high') {
      sortQuery = { price: -1 };
    } else if (sort === 'rating') {
      sortQuery = { rating: -1 };
    } else if (sort === 'name-asc') {
      sortQuery = { name: 1 };
    }

    const products = await Product.find(query).sort(sortQuery);

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ success: false, message: 'Error fetching product' });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ isFeatured: true }).limit(8);
    res.json({ success: true, data: featured });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching featured products' });
  }
};

// Seed database handler
exports.seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    const inserted = await Product.insertMany(seedProducts);
    res.json({
      success: true,
      message: `Database successfully seeded with ${inserted.length} products.`,
      count: inserted.length,
    });
  } catch (error) {
    console.error('Error seeding products:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
