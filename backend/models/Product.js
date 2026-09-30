const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Fire Extinguishers',
        'Fire Alarms & Detectors',
        'Fire Blankets & First Aid',
        'Hydrants & Hose Reels',
        'Firefighting PPE & Suits',
        'Emergency Signage & Accessories',
      ],
    },
    fireClasses: {
      type: [String],
      default: [], // e.g. ['Class A', 'Class B', 'Class C', 'Electrical']
    },
    industry: {
      type: [String],
      default: ['Residential', 'Commercial'], // 'Residential', 'Commercial', 'Industrial', 'Kitchen'
    },
    capacity: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 20,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewsCount: {
      type: Number,
      default: 24,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    certification: {
      type: String,
      default: 'IS:15683 / CE Certified',
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    specifications: {
      dischargeTime: { type: String, default: '15-20 seconds' },
      dischargeRange: { type: String, default: '4-6 meters' },
      testPressure: { type: String, default: '35 bar' },
      operatingTemp: { type: String, default: '-30°C to +60°C' },
      cylinderMaterial: { type: String, default: 'High Grade Carbon Steel' },
      warranty: { type: String, default: '5 Years Manufacturer Warranty' },
    },
    applications: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
