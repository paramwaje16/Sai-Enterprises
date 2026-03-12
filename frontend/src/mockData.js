// Mock data for Sai Enterprises Hardware Shop

export const shopInfo = {
  name: "Sai Enterprises",
  tagline: "Lathe Machine Tools | Purchase of Carbide Scrap",
  description: "Your trusted partner for all types of lathe machine tools, M1TR machine, Traub machine tools, carbide scraps, and industrial hardware solutions in Pune.",
  phone: "7720953955",
  phoneName: "Aditya",
  phone2: "9822764821",
  phone2Name: "Balaji",
  email: "adityamamidwar00@gmail.com",
  address: "Plot 11/A/2, Indrayani Nagar, S Block, Chowk, Bhosari, Pune, Pimpri-Chinchwad, Maharashtra 411026",
  rating: 4.9,
  totalReviews: 13,
  hours: {
    weekdays: "9:30 AM - 7:30 PM",
    saturday: "9:30 AM - 7:30 PM",
    thursday: "Closed",
    sunday: "9:30 AM - 7:30 PM"
  },
  directors: [
    {
      name: "Aditya Mamidwar",
      title: "Director"
    },
    {
      name: "Balaji Mamidwar",
      title: "Director"
    }
  ],
  googleMapsLink: "https://www.google.com/maps/place/Sai+Enterprises",
  mapCoordinates: {
    lat: 18.6298,
    lng: 73.8480
  }
};

export const services = [
  {
    id: 1,
    title: "Lathe Machine Tools",
    description: "Complete range of high-quality lathe machine tools for precision machining and manufacturing needs.",
    icon: "Settings",
    subtypes: [
      {
        name: "Turning Tools",
        description: "Precision turning tools for external and internal operations, including roughing and finishing"
      },
      {
        name: "Boring Tools",
        description: "High-accuracy boring tools for enlarging and finishing internal surfaces"
      },
      {
        name: "Threading Tools",
        description: "Specialized threading tools for creating internal and external threads with precision"
      },
      {
        name: "Grooving Tools",
        description: "Groove cutting tools for face grooving, external and internal grooving operations"
      },
      {
        name: "Parting Tools",
        description: "Heavy-duty parting and cut-off tools for separating workpieces"
      },
      {
        name: "Facing Tools",
        description: "Precision facing tools for creating flat surfaces perpendicular to the workpiece axis"
      }
    ]
  },
  {
    id: 2,
    title: "Milling Machine Tools",
    description: "Premium milling machine tools designed for professional industrial applications with superior performance.",
    icon: "Wrench"
  },
  {
    id: 3,
    title: "Traub Machine Tools",
    description: "High-precision Traub machine tools for advanced turning and machining operations.",
    icon: "Cog"
  },
  {
    id: 4,
    title: "Customised Lathe Machine Tools",
    description: "Custom-designed lathe machine tools tailored to your specific industrial requirements and applications.",
    icon: "Settings2",
    subtypes: [
      {
        name: "Custom Turning Tools",
        description: "Specially designed turning tools for unique machining requirements"
      },
      {
        name: "Special Profile Tools",
        description: "Custom profile tools manufactured to your exact specifications"
      },
      {
        name: "Modified Standard Tools",
        description: "Standard tools modified to meet specific application needs"
      },
      {
        name: "Prototype Tool Development",
        description: "Development and testing of new tool designs for specialized applications"
      },
      {
        name: "Application-Specific Solutions",
        description: "Complete tooling solutions designed for specific production challenges"
      }
    ]
  },
  {
    id: 5,
    title: "Milling Inserts",
    description: "Wide selection of milling inserts for various machining operations and material types.",
    icon: "CircleDot"
  },
  {
    id: 6,
    title: "Brazing Services",
    description: "Expert brazing services using Brass, Copper, and Silver for durable metal joining solutions.",
    icon: "Flame",
    subtypes: [
      {
        name: "Brass Brazing",
        description: "Strong and economical brass brazing for general purpose metal joining"
      },
      {
        name: "Copper Brazing",
        description: "High thermal conductivity copper brazing for heat-sensitive applications"
      },
      {
        name: "Silver Brazing",
        description: "Premium silver brazing for superior strength and corrosion resistance"
      },
      {
        name: "Carbide Tip Brazing",
        description: "Precision brazing of carbide tips to tool shanks for cutting applications"
      },
      {
        name: "Custom Brazing",
        description: "Customized brazing solutions for specialized industrial requirements"
      }
    ]
  },
  {
    id: 7,
    title: "Carbide Scrap Purchase",
    description: "We purchase all types of carbide scraps at competitive prices. Contact us for best rates.",
    icon: "Recycle",
    subtypes: [
      {
        name: "Solid Carbide Scrap",
        description: "Purchase of solid carbide end mills, drills, and cutting tools"
      },
      {
        name: "Carbide Insert Scrap",
        description: "Competitive rates for used and broken carbide inserts"
      },
      {
        name: "Brazed Carbide Scrap",
        description: "Purchase of brazed carbide tools and tips"
      },
      {
        name: "Carbide Sludge",
        description: "Collection and purchase of carbide grinding sludge and powder"
      },
      {
        name: "Mixed Carbide Scrap",
        description: "We accept mixed carbide scrap lots at fair market prices"
      }
    ]
  },
  {
    id: 8,
    title: "Forging & Punch Heading",
    description: "Professional forging and punch heading services for custom industrial requirements.",
    icon: "Hammer"
  }
];

export const products = [
  {
    id: 1,
    name: "Carbide Turning Tools",
    category: "Lathe Tools",
    description: "High-precision carbide turning tools for smooth finishing",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
  },
  {
    id: 2,
    name: "Milling Cutters",
    category: "Milling Tools",
    description: "Durable milling cutters for various material applications",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
  },
  {
    id: 3,
    name: "Brazing Inserts",
    category: "Inserts",
    description: "Premium quality brazing inserts for industrial use",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
  },
  {
    id: 4,
    name: "Carbide Inserts",
    category: "Inserts",
    description: "High-grade carbide inserts for precision machining",
    image: "https://images.unsplash.com/photo-1581092918484-8313e1f9a5d5?w=800&q=80"
  },
  {
    id: 5,
    name: "Drill Bits Set",
    category: "Tools",
    description: "Complete set of industrial-grade drill bits",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80"
  },
  {
    id: 6,
    name: "Punch Tools",
    category: "Tools",
    description: "Professional punch tools for metal working",
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80"
  }
];

export const reviews = [
  {
    id: 1,
    name: "Kaushik Singh",
    rating: 5,
    comment: "Very Good Quality And Affordable Price",
    date: "2 months ago"
  },
  {
    id: 2,
    name: "Rohan Mane",
    rating: 5,
    comment: "Quality and pricing of brazing is good",
    date: "3 months ago"
  },
  {
    id: 3,
    name: "Shubham Gaikwad",
    rating: 5,
    comment: "Keep up the great work.",
    date: "4 months ago"
  },
  {
    id: 4,
    name: "Amit Patil",
    rating: 5,
    comment: "Excellent service and quick delivery. Best place for lathe machine tools in Pune.",
    date: "1 month ago"
  },
  {
    id: 5,
    name: "Rajesh Kumar",
    rating: 4,
    comment: "Good collection of tools. Staff is knowledgeable and helpful.",
    date: "2 months ago"
  },
  {
    id: 6,
    name: "Prashant Deshmukh",
    rating: 5,
    comment: "Best quality carbide tools at competitive rates. Highly recommended for industrial use.",
    date: "3 weeks ago"
  }
];

export const categories = [
  { id: 1, name: "Lathe Tools", count: 45 },
  { id: 2, name: "Milling Tools", count: 38 },
  { id: 3, name: "Inserts", count: 52 },
  { id: 4, name: "Brazing Materials", count: 28 },
  { id: 5, name: "Carbide Products", count: 34 },
  { id: 6, name: "Forging Tools", count: 21 }
];
