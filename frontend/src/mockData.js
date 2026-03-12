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
  // Lathe Machine Tools - Turning Tools (3 products)
  {
    id: 1,
    name: "Carbide Turning Tool - Type 1",
    category: "Lathe Tools - Turning",
    description: "Precision carbide turning tool for external operations",
    image: "https://drive.google.com/uc?export=view&id=1--MJJQZ5SRclwWBv7wLHIWR0VWzyCyS-"
  },
  {
    id: 2,
    name: "Carbide Turning Tool - Type 2",
    category: "Lathe Tools - Turning",
    description: "High-performance turning tool for rough and finish operations",
    image: "https://drive.google.com/uc?export=view&id=1L6Jov4MgV211N0rZF6Wof11ownCD8fma"
  },
  {
    id: 3,
    name: "Carbide Turning Tool - Type 3",
    category: "Lathe Tools - Turning",
    description: "Premium quality carbide turning insert tool",
    image: "https://drive.google.com/uc?export=view&id=199m47GYBVyg5igZKnaua0kQ440lCTq0C"
  },
  
  // Lathe Machine Tools - Boring Tools (2 products)
  {
    id: 4,
    name: "Precision Boring Tool - Type 1",
    category: "Lathe Tools - Boring",
    description: "High-accuracy boring tool for internal surfaces",
    image: "https://drive.google.com/uc?export=view&id=1pY4NPwCumn0wRZVgqn8gdReg5Nhiw-jq"
  },
  {
    id: 5,
    name: "Precision Boring Tool - Type 2",
    category: "Lathe Tools - Boring",
    description: "Advanced boring tool for enlarging holes",
    image: "https://drive.google.com/uc?export=view&id=1O_eJDKfqwJFNCSnVLh5ZIg0A9qyi50K_"
  },
  
  // Lathe Machine Tools - Threading Tools (4 products)
  {
    id: 6,
    name: "Threading Tool - Type 1",
    category: "Lathe Tools - Threading",
    description: "Specialized threading tool for internal and external threads",
    image: "https://drive.google.com/uc?export=view&id=1mqRAXstcxgdJ4H8V6T2qYy3tJFQKhG2u"
  },
  {
    id: 7,
    name: "Threading Tool - Type 2",
    category: "Lathe Tools - Threading",
    description: "Precision thread cutting tool for various thread profiles",
    image: "https://drive.google.com/uc?export=view&id=1_SzcJDyQmfOVG4AhImFUHB_4rZWtlF6j"
  },
  {
    id: 8,
    name: "Threading Tool - Type 3",
    category: "Lathe Tools - Threading",
    description: "Multi-purpose threading insert tool",
    image: "https://drive.google.com/uc?export=view&id=1-WqHyp26wnbCZqdH8AsSPGTZYRG19fuI"
  },
  {
    id: 9,
    name: "Threading Tool - Type 4",
    category: "Lathe Tools - Threading",
    description: "Heavy-duty threading tool for industrial applications",
    image: "https://drive.google.com/uc?export=view&id=1bTow9SnxVkasSBYEhGFy-0EcudvmSknI"
  },
  
  // Lathe Machine Tools - Facing Tools (3 products)
  {
    id: 10,
    name: "Facing Tool - Type 1",
    category: "Lathe Tools - Facing",
    description: "Precision facing tool for creating flat surfaces",
    image: "https://drive.google.com/uc?export=view&id=1FOxou30teSQ91M7devazhld4_BZCdBcA"
  },
  {
    id: 11,
    name: "Facing Tool - Type 2",
    category: "Lathe Tools - Facing",
    description: "High-performance facing insert tool",
    image: "https://drive.google.com/uc?export=view&id=1k0vvpEragEJ8GIa2Fk_lCquzZYc7flOS"
  },
  {
    id: 12,
    name: "Facing Tool - Type 3",
    category: "Lathe Tools - Facing",
    description: "Advanced facing tool for perpendicular surfaces",
    image: "https://drive.google.com/uc?export=view&id=1zddA8xbAfAmRSdzdeQBkkGi7OasGaGPF"
  },
  
  // Lathe Machine Tools - Parting Tools (3 products)
  {
    id: 13,
    name: "Parting Tool - Type 1",
    category: "Lathe Tools - Parting",
    description: "Heavy-duty parting tool for cut-off operations",
    image: "https://drive.google.com/uc?export=view&id=1gEJ78iCk4pG0MiZzngrZr5_Jq_8JCwRN"
  },
  {
    id: 14,
    name: "Parting Tool - Type 2",
    category: "Lathe Tools - Parting",
    description: "Precision parting and grooving tool",
    image: "https://drive.google.com/uc?export=view&id=1VNj_ube67jwdEf9yPgzzE0n4OyfoIHVM"
  },
  {
    id: 15,
    name: "Parting Tool - Type 3",
    category: "Lathe Tools - Parting",
    description: "Industrial-grade parting tool for workpiece separation",
    image: "https://drive.google.com/uc?export=view&id=19dkNfUTU7LxWychI0ykK7HzKxqU90XNc"
  },
  
  // Milling Machine Tools (4 products)
  {
    id: 16,
    name: "Milling Insert - Type 1",
    category: "Milling Tools",
    description: "Premium milling insert for face milling operations",
    image: "https://drive.google.com/uc?export=view&id=1wY7jUV5V-dKjBiSjpqZAXr4No0g-4-A0"
  },
  {
    id: 17,
    name: "Milling Insert - Type 2",
    category: "Milling Tools",
    description: "High-performance milling tool for precision machining",
    image: "https://drive.google.com/uc?export=view&id=1mowmmn3hLhFZkty6rEt7M5KGQ_H4NaBN"
  },
  {
    id: 18,
    name: "Milling Insert - Type 3",
    category: "Milling Tools",
    description: "Versatile milling insert for various materials",
    image: "https://drive.google.com/uc?export=view&id=1P0N5FHBpEf1XBNjS_emn2Nnk8OM8tmP2"
  },
  {
    id: 19,
    name: "Milling Insert - Type 4",
    category: "Milling Tools",
    description: "Industrial milling tool for heavy-duty operations",
    image: "https://drive.google.com/uc?export=view&id=1e_J6i58zXN4Xj1Ti-V4DfqHfQkH6DI3E"
  },
  
  // Traub Machine Tools (5 products)
  {
    id: 20,
    name: "Traub Machine Tool - Type 1",
    category: "Traub Tools",
    description: "High-precision Traub tool for advanced turning operations",
    image: "https://drive.google.com/uc?export=view&id=1gIyD95dHdLU7KPZlYJA3NolMD-us494U"
  },
  {
    id: 21,
    name: "Traub Machine Tool - Type 2",
    category: "Traub Tools",
    description: "Specialized Traub insert for Swiss-type lathes",
    image: "https://drive.google.com/uc?export=view&id=1aLVdLpYS-PV6rMRb-p3xfXQ6pM4VJcWj"
  },
  {
    id: 22,
    name: "Traub Machine Tool - Type 3",
    category: "Traub Tools",
    description: "Premium Traub tool for complex machining",
    image: "https://drive.google.com/uc?export=view&id=1khUuZFDp24Lf9yhQAl5OodhxivQRAh5i"
  },
  {
    id: 23,
    name: "Traub Machine Tool - Type 4",
    category: "Traub Tools",
    description: "Advanced Traub cutting tool for precision work",
    image: "https://drive.google.com/uc?export=view&id=1Ib8PYKpTrfeecqPWVxQVbDHFbvpjUHeq"
  },
  {
    id: 24,
    name: "Traub Machine Tool - Type 5",
    category: "Traub Tools",
    description: "Professional-grade Traub tool for industrial use",
    image: "https://drive.google.com/uc?export=view&id=1laaH75FnhQdDggeS75yZ7yaPbXc43TNq"
  },
  
  // Carbide Scrap (7 products)
  {
    id: 25,
    name: "Carbide Scrap - Grade 1",
    category: "Carbide Scrap",
    description: "Premium quality carbide scrap - competitive rates",
    image: "https://drive.google.com/uc?export=view&id=16DR18Rf6YDIXoWNSu2sOXgIKeIjDx-Sa"
  },
  {
    id: 26,
    name: "Carbide Scrap - Grade 2",
    category: "Carbide Scrap",
    description: "Industrial carbide scrap collection and purchase",
    image: "https://drive.google.com/uc?export=view&id=1Qx9cHr5sozq3p-hDInAwB_jF_qhllej4"
  },
  {
    id: 27,
    name: "Carbide Scrap - Grade 3",
    category: "Carbide Scrap",
    description: "High-value carbide scrap - best prices offered",
    image: "https://drive.google.com/uc?export=view&id=170sklk04ZphL5Ew__Uv8hd8ZkVkSHPRE"
  },
  {
    id: 28,
    name: "Carbide Scrap - Grade 4",
    category: "Carbide Scrap",
    description: "Mixed carbide scrap purchase service",
    image: "https://drive.google.com/uc?export=view&id=1msxpzGYI-_5PVSpSX5Px-asDqoCad_6P"
  },
  {
    id: 29,
    name: "Carbide Scrap - Grade 5",
    category: "Carbide Scrap",
    description: "Carbide insert scrap - immediate purchase",
    image: "https://drive.google.com/uc?export=view&id=1TQ9VahQclSOVRn7NvFt660n-uHtCQJYo"
  },
  {
    id: 30,
    name: "Carbide Scrap - Grade 6",
    category: "Carbide Scrap",
    description: "Solid carbide scrap - fair market rates",
    image: "https://drive.google.com/uc?export=view&id=1SAeY0J87UodRxkKilqWiZleb71KSXhjC"
  },
  {
    id: 31,
    name: "Carbide Scrap - Grade 7",
    category: "Carbide Scrap",
    description: "Carbide sludge and powder purchase",
    image: "https://drive.google.com/uc?export=view&id=12ZNKRyh79WPFe_t03fhTTa49hBsuavU3"
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
  { id: 1, name: "Lathe Tools - Turning", count: 3 },
  { id: 2, name: "Lathe Tools - Boring", count: 2 },
  { id: 3, name: "Lathe Tools - Threading", count: 4 },
  { id: 4, name: "Lathe Tools - Facing", count: 3 },
  { id: 5, name: "Lathe Tools - Parting", count: 3 },
  { id: 6, name: "Milling Tools", count: 4 },
  { id: 7, name: "Traub Tools", count: 5 },
  { id: 8, name: "Carbide Scrap", count: 7 }
];
