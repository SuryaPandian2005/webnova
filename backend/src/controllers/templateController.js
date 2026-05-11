const Template = require('../models/Template');

const SEED_TEMPLATES = [
  { name: 'PortfolioX Pro', category: 'Portfolio', description: 'Stunning developer portfolio with animated hero, project showcases, and skills timeline.', colorPalette: ['#6366f1', '#8b5cf6', '#06b6d4', '#1e1b4b'], features: ['Animated Hero', 'Project Gallery', 'Skills Timeline', 'Contact Form', 'Dark Mode'], pages: ['Home', 'About', 'Portfolio', 'Blog', 'Contact'], techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'], rating: 4.9, reviewCount: 234, downloads: 1820, isFeatured: true, isPremium: false, price: 0, tags: ['portfolio', 'developer', 'creative', 'dark'] },
  { name: 'ShopWave Elite', category: 'Ecommerce', description: 'Full-featured ecommerce platform with cart, checkout, product pages and admin dashboard.', colorPalette: ['#f59e0b', '#ef4444', '#10b981', '#111827'], features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Admin Panel', 'Analytics'], pages: ['Home', 'Shop', 'Product', 'Cart', 'Login', 'Dashboard'], techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'], rating: 4.8, reviewCount: 412, downloads: 3200, isFeatured: true, isPremium: true, price: 49, tags: ['ecommerce', 'shop', 'stripe', 'cart'] },
  { name: 'FoodieHub', category: 'Restaurant', description: 'Beautiful restaurant website with menu, reservations, gallery and online ordering.', colorPalette: ['#f97316', '#dc2626', '#fbbf24', '#1c1917'], features: ['Digital Menu', 'Online Reservations', 'Photo Gallery', 'Online Ordering', 'Reviews'], pages: ['Home', 'Menu', 'About', 'Gallery', 'Contact'], techStack: ['React.js', 'Node.js', 'MongoDB'], rating: 4.7, reviewCount: 189, downloads: 1450, isFeatured: true, isPremium: false, price: 0, tags: ['restaurant', 'food', 'menu', 'reservations'] },
  { name: 'LaunchPad SaaS', category: 'SaaS', description: 'Modern SaaS landing page with pricing, features, testimonials and onboarding flow.', colorPalette: ['#6366f1', '#22d3ee', '#a855f7', '#0f172a'], features: ['Pricing Tables', 'Feature Sections', 'Testimonials', 'Auth System', 'Dashboard'], pages: ['Home', 'Pricing', 'Features', 'Blog', 'Login', 'Dashboard'], techStack: ['Next.js', 'Tailwind CSS', 'Stripe', 'PostgreSQL'], rating: 4.9, reviewCount: 567, downloads: 4100, isFeatured: true, isPremium: true, price: 79, tags: ['saas', 'startup', 'landing', 'pricing'] },
  { name: 'PropSpace', category: 'Real Estate', description: 'Premium real estate platform with property listings, map view, search filters and agent profiles.', colorPalette: ['#0ea5e9', '#10b981', '#f59e0b', '#0f172a'], features: ['Property Listings', 'Map View', 'Advanced Search', 'Agent Profiles', 'Mortgage Calculator'], pages: ['Home', 'Listings', 'Property', 'Agents', 'Contact'], techStack: ['Next.js', 'Node.js', 'MongoDB', 'Google Maps'], rating: 4.6, reviewCount: 145, downloads: 980, isFeatured: false, isPremium: true, price: 59, tags: ['real-estate', 'properties', 'listings', 'map'] },
  { name: 'BlogFlow', category: 'Blog', description: 'Clean, minimal blog platform with CMS, categories, tags, comments and newsletter.', colorPalette: ['#64748b', '#3b82f6', '#f1f5f9', '#0f172a'], features: ['CMS Integration', 'Categories & Tags', 'Comments', 'Newsletter', 'SEO Optimized'], pages: ['Home', 'Blog', 'About', 'Contact'], techStack: ['Next.js', 'MDX', 'Tailwind CSS'], rating: 4.5, reviewCount: 98, downloads: 2300, isFeatured: false, isPremium: false, price: 0, tags: ['blog', 'cms', 'writing', 'minimal'] },
  { name: 'AgencyFlow', category: 'Agency', description: 'Bold creative agency website with portfolio, case studies, team and lead generation.', colorPalette: ['#ec4899', '#8b5cf6', '#f59e0b', '#111827'], features: ['Portfolio Grid', 'Case Studies', 'Team Profiles', 'Service Pages', 'Lead Forms'], pages: ['Home', 'Services', 'Portfolio', 'Team', 'Contact'], techStack: ['Next.js', 'GSAP', 'Tailwind CSS'], rating: 4.8, reviewCount: 276, downloads: 1890, isFeatured: true, isPremium: false, price: 0, tags: ['agency', 'creative', 'portfolio', 'bold'] },
  { name: 'EduLearn', category: 'School', description: 'Comprehensive school/university platform with courses, admissions, events and student portal.', colorPalette: ['#3b82f6', '#10b981', '#f59e0b', '#1e3a5f'], features: ['Course Catalog', 'Admissions Form', 'Student Portal', 'Event Calendar', 'Faculty Profiles'], pages: ['Home', 'Courses', 'Admissions', 'Events', 'Contact', 'Login'], techStack: ['Next.js', 'Node.js', 'PostgreSQL'], rating: 4.6, reviewCount: 134, downloads: 760, isFeatured: false, isPremium: true, price: 39, tags: ['school', 'education', 'courses', 'students'] },
  { name: 'MediCare Plus', category: 'Hospital', description: 'Professional healthcare platform with doctor profiles, appointment booking, and patient portal.', colorPalette: ['#06b6d4', '#10b981', '#f8fafc', '#0c4a6e'], features: ['Doctor Profiles', 'Appointment Booking', 'Patient Portal', 'Telemedicine', 'Insurance Info'], pages: ['Home', 'Doctors', 'Services', 'Appointments', 'Contact', 'Portal'], techStack: ['Next.js', 'Node.js', 'MongoDB'], rating: 4.7, reviewCount: 203, downloads: 1120, isFeatured: true, isPremium: true, price: 69, tags: ['hospital', 'healthcare', 'doctors', 'appointments'] },
  { name: 'NeuralLaunch', category: 'AI Startup', description: 'Futuristic AI startup landing with animated demos, API docs, pricing and waitlist.', colorPalette: ['#6366f1', '#06b6d4', '#a855f7', '#030712'], features: ['Animated Demos', 'API Documentation', 'Pricing', 'Waitlist', 'Status Page'], pages: ['Home', 'Features', 'Pricing', 'Docs', 'Blog', 'Login'], techStack: ['Next.js', 'Framer Motion', 'Tailwind CSS'], rating: 4.9, reviewCount: 389, downloads: 2870, isFeatured: true, isPremium: true, price: 89, tags: ['ai', 'startup', 'tech', 'futuristic'] },
  { name: 'CorpEdge', category: 'Business', description: 'Corporate business website with services, team, case studies and enterprise lead generation.', colorPalette: ['#1e40af', '#0f172a', '#64748b', '#f1f5f9'], features: ['Services Showcase', 'Case Studies', 'Team Page', 'News/Blog', 'Contact Forms'], pages: ['Home', 'About', 'Services', 'Team', 'Blog', 'Contact'], techStack: ['Next.js', 'Tailwind CSS', 'Node.js'], rating: 4.5, reviewCount: 167, downloads: 1340, isFeatured: false, isPremium: false, price: 0, tags: ['business', 'corporate', 'services', 'professional'] },
  { name: 'CreativeStudio', category: 'Agency', description: 'Minimalist creative studio with smooth GSAP animations, case studies and studio process.', colorPalette: ['#f8fafc', '#111827', '#6366f1', '#a855f7'], features: ['GSAP Animations', 'Case Studies', 'Studio Process', 'Awards', 'Client Logos'], pages: ['Home', 'Work', 'About', 'Services', 'Contact'], techStack: ['Next.js', 'GSAP', 'Three.js'], rating: 4.8, reviewCount: 312, downloads: 2100, isFeatured: true, isPremium: true, price: 99, tags: ['creative', 'minimal', 'gsap', 'animation'] },
];

const seedTemplates = async (req, res, next) => {
  try {
    await Template.deleteMany({});
    const templates = await Template.insertMany(
      SEED_TEMPLATES.map(t => ({ ...t, createdBy: req.user._id }))
    );
    res.json({ success: true, message: `${templates.length} templates seeded!`, count: templates.length });
  } catch (error) {
    next(error);
  }
};

const getTemplates = async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;
    const query = { isActive: true };
    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.isFeatured = true;

    let templates = await Template.find(query).sort({ isFeatured: -1, downloads: -1 });

    if (search) {
      const s = search.toLowerCase();
      templates = templates.filter(t =>
        t.name.toLowerCase().includes(s) ||
        t.description.toLowerCase().includes(s) ||
        t.tags.some(tag => tag.includes(s))
      );
    }

    res.json({ success: true, templates, count: templates.length });
  } catch (error) {
    next(error);
  }
};

const createTemplate = async (req, res, next) => {
  try {
    const template = await Template.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, template });
  } catch (error) {
    next(error);
  }
};

module.exports = { seedTemplates, getTemplates, createTemplate };