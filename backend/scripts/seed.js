const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv path relative to directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Product = require('../models/Product');
const MattressConfig = require('../models/MattressConfig');
const SofaConfig = require('../models/SofaConfig');
const Testimonial = require('../models/Testimonial');
const HomepageContent = require('../models/HomepageContent');

const seedData = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sleepora';
    console.log(`Seeding DB: Connecting to ${dbUri}...`);
    
    await mongoose.connect(dbUri);
    console.log('Connected to database.');

    // Clear all existing data
    await User.deleteMany();
    await Product.deleteMany();
    await MattressConfig.deleteMany();
    await SofaConfig.deleteMany();
    await Testimonial.deleteMany();
    await HomepageContent.deleteMany();
    console.log('Cleared existing data.');

    // 1. Seed Default Admin User
    await User.create({
      email: 'admin@example.com',
      password: 'Admin@123' // password gets hashed automatically in models/User.js pre('save')
    });
    console.log('Seeded Admin account (admin@example.com / Admin@123).');

    // 2. Seed Mattress Configurations (Multipliers, Layers)
    await MattressConfig.create({
      cores: [
        {
          type: 'ortho',
          name: 'Ortho-Memory Foam',
          basePrice: 6500,
          retailMultiplier: 2.0,
          desc: 'Designed with high-density orthopaedic foam and contouring memory foam. Ideal for back support and posture alignment.',
          layers: [
            { name: 'Quilted Breathable Cover', height: '20px', color: 'linear-gradient(135deg, #E2E8F0, #94A3B8)' },
            { name: 'Contouring Memory Foam', height: '35px', color: 'linear-gradient(135deg, #FDE047, #CA8A04)' },
            { name: 'High-Resilience Support Foam', height: '70px', color: 'linear-gradient(135deg, #475569, #1E293B)' },
            { name: 'Anti-Skid Base', height: '15px', color: 'linear-gradient(135deg, #1E293B, #0F172A)' }
          ]
        },
        {
          type: 'latex',
          name: 'Premium Natural Latex',
          basePrice: 11500,
          retailMultiplier: 1.9,
          desc: 'Eco-friendly, hypoallergenic 100% natural pin-core latex. Excellent bounce, temperature regulation, and durability.',
          layers: [
            { name: 'Premium Bamboo Fiber Quilting', height: '25px', color: 'linear-gradient(135deg, #E2E8F0, #A7F3D0)' },
            { name: '100% Natural Pin-Core Latex', height: '50px', color: 'linear-gradient(135deg, #FEF08A, #EAB308)' },
            { name: 'Super Soft Foam Transition Layer', height: '40px', color: 'linear-gradient(135deg, #E2E8F0, #CBD5E1)' },
            { name: 'High Density HR Base Foam', height: '50px', color: 'linear-gradient(135deg, #334155, #0F172A)' }
          ]
        },
        {
          type: 'spring',
          name: 'Luxury Pocket Spring',
          basePrice: 9000,
          retailMultiplier: 2.1,
          desc: 'Individual pocketed springs that prevent motion transfer. Layered with high-density foam for plush comfort.',
          layers: [
            { name: 'Plush Knitted Cover Padding', height: '30px', color: 'linear-gradient(135deg, #F1F5F9, #CBD5E1)' },
            { name: 'High Resilience Foam Pillow-Top', height: '35px', color: 'linear-gradient(135deg, #FED7AA, #F97316)' },
            { name: 'Pocketed Spring Core Unit', height: '80px', color: 'linear-gradient(135deg, #64748B, #334155)' },
            { name: 'Sturdy Felt Protection Layer', height: '15px', color: 'linear-gradient(135deg, #1E293B, #0F172A)' }
          ]
        },
        {
          type: 'dual',
          name: 'Dual Comfort (Hard/Soft)',
          basePrice: 5000,
          retailMultiplier: 2.0,
          desc: 'Reversible mattress with one firm side for orthopaedic support and one soft side for cloud-like comfort.',
          layers: [
            { name: 'Dual-Tone Knitted Fabric Cover', height: '20px', color: 'linear-gradient(135deg, #E2E8F0, #64748B)' },
            { name: 'Cloud Comfort Soft Foam (Soft Side)', height: '45px', color: 'linear-gradient(135deg, #BFDBFE, #3B82F6)' },
            { name: 'Super Firm HR Ortho Foam (Firm Side)', height: '60px', color: 'linear-gradient(135deg, #475569, #0F172A)' }
          ]
        },
        {
          type: 'coir',
          name: 'Classic Coir Mattress',
          basePrice: 4200,
          retailMultiplier: 2.0,
          desc: 'Traditional firm support using high density natural coconut coir fiber blocks. Stays cool and keeps spine straight.',
          layers: [
            { name: 'Cotton Quilted Cover', height: '15px', color: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)' },
            { name: 'Transition Foam Foam', height: '20px', color: 'linear-gradient(135deg, #E2E8F0, #CBD5E1)' },
            { name: 'Premium Natural Rubberised Coir Block', height: '65px', color: 'linear-gradient(135deg, #854D0E, #451A03)' },
            { name: 'Heavy Duty Cotton Fabric Base', height: '10px', color: 'linear-gradient(135deg, #1E293B, #0F172A)' }
          ]
        }
      ],
      sizes: [
        { name: 'Single (72 x 36)', multiplier: 1.0 },
        { name: 'Double (72 x 48)', multiplier: 1.4 },
        { name: 'Queen (78 x 60)', multiplier: 1.6 },
        { name: 'King (78 x 72)', multiplier: 1.8 }
      ],
      thicknesses: [
        { name: '4-inch', multiplier: 0.8 },
        { name: '5-inch', multiplier: 1.0 },
        { name: '6-inch', multiplier: 1.25 },
        { name: '8-inch', multiplier: 1.5 },
        { name: '10-inch', multiplier: 1.8 }
      ]
    });
    console.log('Seeded Mattress configurations.');

    // 3. Seed Sofa Configurations
    await SofaConfig.create({
      sofaTypes: [
        { name: 'L Shape Sofa', multiplier: 1.5 },
        { name: 'Recliner Sofa', multiplier: 1.8 },
        { name: '2 Seater', multiplier: 0.85 },
        { name: '3 Seater', multiplier: 1.0 },
        { name: 'Corner Sofa', multiplier: 1.6 },
        { name: 'Custom Sofa', multiplier: 1.35 }
      ],
      materials: [
        { name: 'Fabric', priceModifier: 0 },
        { name: 'Leatherette', priceModifier: 2500 },
        { name: 'Premium Velvet', priceModifier: 4000 },
        { name: 'Genuine Leather', priceModifier: 18000 }
      ],
      fabrics: [
        { name: 'Cotton Blend', priceModifier: 0 },
        { name: 'Jute Finish', priceModifier: 500 },
        { name: 'Suede', priceModifier: 1500 },
        { name: 'Chenille', priceModifier: 2000 }
      ],
      colors: [
        { name: 'Charcoal Grey', colorCode: '#36454F' },
        { name: 'Royal Blue', colorCode: '#4169E1' },
        { name: 'Forest Green', colorCode: '#228B22' },
        { name: 'Classic Brown', colorCode: '#4B3621' },
        { name: 'Beige', colorCode: '#F5F5DC' }
      ],
      seatingCapacities: [
        { capacity: 2, multiplier: 0.85 },
        { capacity: 3, multiplier: 1.0 },
        { capacity: 5, multiplier: 1.45 },
        { capacity: 7, multiplier: 1.8 }
      ]
    });
    console.log('Seeded Sofa configurations.');

    // 4. Seed Mattress Catalogue Products
    const mattresses = [
      {
        name: 'OrthoRest Premium Memory Foam Mattress',
        slug: 'orthorest-premium-memory-foam-mattress',
        category: 'mattress',
        description: 'Designed for better spinal alignment and ultimate posture support. High density pressure relief memory foam.',
        shortDescription: 'Featured premium orthopaedic memory foam mattress.',
        basePrice: 28999,
        retailMultiplier: 1.0,
        images: [
          '/images/ortho_mattress.png',
          '/images/mattress_layers_detail.png',
          '/images/mattress_hero.png'
        ],
        isAvailable: true,
        isFeatured: true,
        specifications: {
          'Warranty': '10 Year Warranty',
          'Comfort': 'Orthopaedic Support',
          'Material': 'Premium Memory Foam',
          'Badge': 'FEATURED'
        },
        benefits: [
          'Orthopaedic Support: Designed for better spinal alignment',
          'Premium Memory Foam: High density foam for pressure relief',
          '10 Year Warranty: Long lasting comfort & durability'
        ],
        ratings: 4.9,
        reviewsCount: 154,
        mattressCoreType: 'ortho'
      },
      {
        name: 'CloudNest Memory Foam',
        slug: 'cloudnest-memory-foam-mattress',
        category: 'mattress',
        description: 'Plush and contouring memory foam designed to provide zero partner disturbance.',
        shortDescription: 'Plush contouring memory foam.',
        basePrice: 24999,
        retailMultiplier: 1.0,
        images: [
          '/images/ortho_mattress.png',
          '/images/mattress_layers_detail.png',
          '/images/workers_crafting.png'
        ],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Warranty': '10 Year Warranty',
          'Comfort': 'Medium Firm',
          'Material': 'Memory Foam',
          'Badge': 'BEST SELLER'
        },
        benefits: [
          'Contouring foam padding',
          'Zero partner disturbance',
          'Breathable cover quilting'
        ],
        ratings: 4.9,
        reviewsCount: 124,
        mattressCoreType: 'ortho'
      },
      {
        name: 'BackCare Ortho Support',
        slug: 'backcare-ortho-support',
        category: 'mattress',
        description: 'Extra firm core built specifically for back support and relief from chronic spine stiffness.',
        shortDescription: 'Extra firm orthopaedic back care.',
        basePrice: 26999,
        retailMultiplier: 1.0,
        images: [
          '/images/coir_mattress.png',
          '/images/mattress_layers_detail.png',
          '/images/factory_floor.png'
        ],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Warranty': '10 Year Warranty',
          'Comfort': 'Firm Support',
          'Material': 'Orthopaedic',
          'Badge': 'PREMIUM'
        },
        benefits: [
          'Extra firm support layers',
          'Posture correcting block',
          'High density core foam'
        ],
        ratings: 4.8,
        reviewsCount: 86,
        mattressCoreType: 'ortho'
      },
      {
        name: 'DreamRest Hybrid',
        slug: 'dreamrest-hybrid',
        category: 'mattress',
        description: 'Combines contouring comfort foam with independently responsive pocket springs.',
        shortDescription: 'Plush pocket spring and foam hybrid.',
        basePrice: 32999,
        retailMultiplier: 1.0,
        images: [
          '/images/pocket_spring.png',
          '/images/mattress_layers_detail.png',
          '/images/mattress_hero.png'
        ],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Warranty': '10 Year Warranty',
          'Comfort': 'Medium Firm',
          'Material': 'Hybrid',
          'Badge': 'NEW ARRIVAL'
        },
        benefits: [
          'Pocketed spring alignment',
          'Responsive bounce feedback',
          'Airflow ventilation channels'
        ],
        ratings: 4.9,
        reviewsCount: 98,
        mattressCoreType: 'hybrid'
      },
      {
        name: 'Latex Luxe Natural',
        slug: 'latex-luxe-natural',
        category: 'mattress',
        description: 'Eco-friendly, chemical-free sleep materials crafted from natural organic rubber latex.',
        shortDescription: '100% natural organic pin-core latex.',
        basePrice: 29999,
        retailMultiplier: 1.0,
        images: [
          '/images/latex_mattress.png',
          '/images/mattress_layers_detail.png',
          '/images/workers_crafting.png'
        ],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Warranty': '10 Year Warranty',
          'Comfort': 'Medium Firm',
          'Material': 'Natural Latex',
          'Badge': ''
        },
        benefits: [
          'Allergen protection layer',
          'Elastic bounce support',
          'Temperature regulation structure'
        ],
        ratings: 4.7,
        reviewsCount: 72,
        mattressCoreType: 'latex'
      },
      {
        name: 'SpineAlign Pocket Spring',
        slug: 'spinealign-pocket-spring',
        category: 'mattress',
        description: 'Individual spring coils that isolate movement and support the lower lumbar region.',
        shortDescription: 'Lumbar support pocket coil mattress.',
        basePrice: 23999,
        retailMultiplier: 1.0,
        images: [
          '/images/pocket_spring.png',
          '/images/mattress_layers_detail.png',
          '/images/factory_floor.png'
        ],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Warranty': '10 Year Warranty',
          'Comfort': 'Firm Support',
          'Material': 'Pocket Spring',
          'Badge': ''
        },
        benefits: [
          'Lumbar support coils',
          'Zero motion transfer springs',
          'Steel border framing edges'
        ],
        ratings: 4.8,
        reviewsCount: 41,
        mattressCoreType: 'spring'
      },
      {
        name: 'Ultra Plush Hotel Collection',
        slug: 'ultra-plush-hotel-collection',
        category: 'mattress',
        description: 'Brings the five-star luxury hotel feel home with a deep cushioning plush pillow-top cover.',
        shortDescription: 'Plush pillow-top luxury mattress.',
        basePrice: 27999,
        retailMultiplier: 1.0,
        images: [
          '/images/mattress_hotel_luxury.png',
          '/images/coir_mattress.png',
          '/images/mattress_hero.png'
        ],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Warranty': '10 Year Warranty',
          'Comfort': 'Plush Comfort',
          'Material': 'Cooling Foam',
          'Badge': ''
        },
        benefits: [
          'Pillow-top cooling layers',
          'Deep responsive support',
          'Double tempered coil coils'
        ],
        ratings: 4.9,
        reviewsCount: 33,
        mattressCoreType: 'hotel'
      }
    ];

    await Product.create(mattresses);
    console.log('Seeded Mattress catalogue items.');

    // 5. Seed Sofa Catalogue Products
    const sofas = [
      {
        name: 'Royal Sectional Sofa',
        slug: 'royal-sectional-sofa',
        category: 'sofa',
        description: 'Spacious and premium L-shape corner sectional sofa. Perfect for modern living rooms, providing maximum comfort and relaxation with high-resilience foam padding and solid seasoned sal wood inner framing.',
        shortDescription: 'Premium L-shape sectional customizable for any lounge.',
        basePrice: 28000,
        retailMultiplier: 1.8,
        images: ['/images/sofa_royal_sectional.png'],
        isAvailable: true,
        isFeatured: true,
        specifications: {
          'Frame Material': 'Seasoned Sal Wood',
          'Foam Density': '32 Density Sleep Foam',
          'Warranty': '5 Years Frame Warranty',
          'Suspension': 'Pocket Springs & Elastic Webbing'
        },
        benefits: [
          'Spacious seating configuration',
          'Solid hardwood frame that lasts decades',
          'Completely customizable dimensions and layout',
          'Plush back cushioning for spine relief'
        ],
        ratings: 4.9,
        reviewsCount: 43,
        sofaCategory: 'l-shape'
      },
      {
        name: 'Plush Lounge Recliner',
        slug: 'plush-lounge-recliner',
        category: 'sofa',
        description: 'Experience ultimate comfort with our custom single or multi-seater recliners. Features premium heavy-duty steel manual or motorized reclining mechanisms and cloud-like polyester fiber backing.',
        shortDescription: 'Premium single or multi-seater theater reclining sofa.',
        basePrice: 18000,
        retailMultiplier: 2.0,
        images: ['/images/sofa_plush_recliner.png'],
        isAvailable: true,
        isFeatured: true,
        specifications: {
          'Mechanism': 'Heavy Duty Steel Recliner Track',
          'Foam Grade': 'High Resiliency 40 Density Foam',
          'Warranty': '3 Years on Recliner Mechanism',
          'Recline angle': '150 Degrees Adjustable'
        },
        benefits: [
          'Deep padding for theater-level comfort',
          'Easy manual release latch or electric push-button',
          'Padded footrest extension',
          'Ergonomic head and neck contours'
        ],
        ratings: 4.8,
        reviewsCount: 29,
        sofaCategory: 'recliner'
      },
      {
        name: 'Compact 2-Seater Studio Sofa',
        slug: 'compact-2-seater-studio-sofa',
        category: 'sofa',
        description: 'Minimalist compact design crafted for modern apartments, studio units, or office lobbies. Generously padded seating despite a slim, space-saving footprint.',
        shortDescription: 'Sleek, minimalist 2-seater ideal for small spaces.',
        basePrice: 12500,
        retailMultiplier: 1.9,
        images: ['/images/sofa_compact_studio.png'],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Seats Layout': '2 Seater Layout',
          'Frame': 'Solid Wood & Plywood',
          'Warranty': '3 Years Warranty',
          'Leg Finish': 'Solid Oak Wood Legs'
        },
        benefits: [
          'Space saving compact dimensions',
          'Modern Scandinavian look',
          'Removable cushion covers for easy washing',
          'Sturdy oak wooden legs'
        ],
        ratings: 4.7,
        reviewsCount: 38,
        sofaCategory: '2-seater'
      },
      {
        name: 'Classic 3-Seater Comfort Sofa',
        slug: 'classic-3-seater-comfort-sofa',
        category: 'sofa',
        description: 'Timeless luxury design that anchors any living room. The perfect balance of soft pillow support and deep seating width.',
        shortDescription: 'Standard spacious 3-seater sofa for family homes.',
        basePrice: 16500,
        retailMultiplier: 2.0,
        images: ['/images/sofa_classic_3seater.png'],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Seats Layout': '3 Seater Layout',
          'Foam Grade': 'Medium Soft 32 Density PU Foam',
          'Warranty': '5 Years Frame Warranty',
          'Leg Finish': 'Chrome Plated Steel Legs'
        },
        benefits: [
          'Generous seating width for three adults',
          'Padded armrests for lounging comfort',
          'Double-stitched stress points for durability',
          'Rust-free chrome leg foundations'
        ],
        ratings: 4.8,
        reviewsCount: 52,
        sofaCategory: '3-seater'
      },
      {
        name: 'Chesterfield Classic Velvet',
        slug: 'chesterfield-classic-velvet-sofa',
        category: 'sofa',
        description: 'A classic British design featuring deep button tufting, rolled arms, and plush royal velvet upholstery.',
        shortDescription: 'Classic Chesterfield sofa with deep tufted velvet.',
        basePrice: 24500,
        retailMultiplier: 1.9,
        images: ['/images/sofa_chesterfield_velvet.png'],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Frame': 'Seasoned Sal Wood',
          'Foam': '32 Density Sleep Foam',
          'Warranty': '5 Years',
          'Upholstery': 'Premium Velvet'
        },
        benefits: [
          'Plush tufted details',
          'Highly durable wood structure'
        ],
        ratings: 4.9,
        reviewsCount: 22,
        sofaCategory: 'custom'
      },
      {
        name: 'Modular Corner Lounge',
        slug: 'modular-corner-lounge-sofa',
        category: 'sofa',
        description: 'Adaptable modular configuration that can be rearranged into a left-facing or right-facing sectional layout.',
        shortDescription: 'Modular sectional sofa layouts for modern lounges.',
        basePrice: 32000,
        retailMultiplier: 1.8,
        images: ['/images/sofa_modular_corner.png'],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Layout': 'Corner Sections',
          'Foam': 'High Density Foam',
          'Warranty': '5 Years'
        },
        benefits: [
          'Flexible layouts',
          'Deep spacious seating'
        ],
        ratings: 4.8,
        reviewsCount: 17,
        sofaCategory: 'corner'
      },
      {
        name: 'Single Premium Theater Recliner',
        slug: 'single-premium-theater-recliner-sofa',
        category: 'sofa',
        description: 'Single-seater luxury recliner with manual or motorized reclining mechanism and cup holder console.',
        shortDescription: 'Single luxury recliner for home theaters.',
        basePrice: 19500,
        retailMultiplier: 2.0,
        images: ['/images/sofa_theater_recliner.png'],
        isAvailable: true,
        isFeatured: false,
        specifications: {
          'Seats': '1 Seater Recliner',
          'Foam': '40 Density Premium Foam',
          'Warranty': '3 Years'
        },
        benefits: [
          'Padded theater seating comfort',
          'Footrest extension'
        ],
        ratings: 4.9,
        reviewsCount: 15,
        sofaCategory: 'recliner'
      }
    ];

    await Product.create(sofas);
    console.log('Seeded Sofa catalogue items.');

    // 6. Seed Testimonials (Google Maps reviews mock)
    const testimonials = [
      {
        name: 'Rajesh Kumar',
        avatar: 'RK',
        rating: 5,
        dateText: '2 weeks ago',
        location: 'New Delhi',
        text: 'Ordered 2 custom size ortho mattresses for my parent\'s wooden beds. Showroom prices were around 24,000 for size specifications. Sleepora delivered perfect fits for ₹11,500 each. Quality of memory foam is amazing. Highly recommended!'
      },
      {
        name: 'Neha Sharma',
        avatar: 'NS',
        rating: 5,
        dateText: '1 month ago',
        location: 'Mumbai',
        text: 'The natural latex mattress is fantastic. Very cool during summer nights and doesn\'t smell like chemical sprays. Visited their factory floor to check materials before buying. Very transparent team.'
      },
      {
        name: 'Amit Singh (Grand Hotel)',
        avatar: 'AS',
        rating: 5,
        dateText: '3 months ago',
        location: 'Bengaluru',
        text: 'Purchased 35 pocket spring mattresses for our guest hotel renovation. The pricing structure saved us over ₹2 Lakhs compared to major brands. Zero motion transfer and guest feedback has been excellent.'
      },
      {
        name: 'Vikram Malhotra',
        avatar: 'VM',
        rating: 5,
        dateText: '2 months ago',
        location: 'Hyderabad',
        text: 'Excellent orthopedic mattress. Lower back pain gone within 10 days of sleep usage. The option to choose customized size and 6 or 8 inch depth density is perfect.'
      }
    ];

    await Testimonial.create(testimonials);
    console.log('Seeded customer reviews/testimonials.');

    // 7. Seed Homepage content headlines and descriptions
    await HomepageContent.create({
      heroSubheading: 'Sleepora',
      heroTitle: 'Perfect Sleep, Perfect Life.',
      heroSubtitle: 'Premium mattresses and handcrafted sofas, engineered for comfort and built to last.',
      ctaTitle: 'Ready for Better Sleep?',
      ctaSubtitle: 'Talk directly with the factory owner on WhatsApp to get custom sizes and the best prices instantly.'
    });
    console.log('Seeded dynamic homepage text copies.');

    console.log('Database Seeding Completed Successfully.');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding script failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
