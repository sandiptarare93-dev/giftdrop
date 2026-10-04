export const occasionsData = [
  {
    id: "birthday",
    name: "Birthday",
    emoji: "🎂",
    tagline: "Celebrate another year of smiles and memories",
    description: "Interactive birthday cards, photo countdowns, and celebratory music that make their special day magical.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    color: "from-rose-500 to-pink-500"
  },
  {
    id: "anniversary",
    name: "Anniversary",
    emoji: "❤️",
    tagline: "Relive every chapter of your love story",
    description: "Emotional photo timelines, custom love letters, and romantic melodies celebrating your beautiful journey together.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    color: "from-red-500 to-rose-600"
  },
  {
    id: "friendship",
    name: "Friendship",
    emoji: "🫶",
    tagline: "Honor the friends who turned into family",
    description: "Fun photo dumps, inside joke galleries, and nostalgic soundtracks for the bond that never fades.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: "proposal",
    name: "Proposal",
    emoji: "💍",
    tagline: "The most magical question deserves unforgettable storytelling",
    description: "Cinematic reveals, emotional voice/music backdrops, and an interactive question screen they will treasure forever.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: "graduation",
    name: "Graduation",
    emoji: "🎓",
    tagline: "Salute their hard work, late nights, and triumph",
    description: "Memory carousels from freshman days to cap-and-gown pride with custom congratulations from loved ones.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: "celebration",
    name: "Celebration",
    emoji: "🎉",
    tagline: "New jobs, baby showers, housewarmings and life wins",
    description: "Vibrant animated greeting experiences filled with confetti bursts and personalized well-wishes.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-500 to-teal-600"
  }
];

export const productsData = [
  {
    id: "prod-1",
    name: "Birthday Memory",
    slug: "birthday-memory",
    description: "Turn their favorite memories into an interactive digital birthday experience with animated balloons and confetti.",
    price: 199,
    originalPrice: 399,
    occasion: "birthday",
    category: "Birthday",
    rating: 4.9,
    reviewsCount: 142,
    images: [
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Personalized receiver name & custom greeting",
      "Interactive 6-photo memory gallery",
      "Heartfelt letter modal with character animations",
      "Royalty-free celebratory background music",
      "Memory milestone timeline",
      "Custom shareable link & downloadable QR code",
      "Mobile-optimized responsive reveal"
    ],
    estimatedTime: "5 mins to customize",
    active: true,
    popular: true,
    isNew: false
  },
  {
    id: "prod-2",
    name: "Our Story",
    slug: "our-story",
    description: "An emotional visual chronicle of your journey together with date-stamped milestones and gentle romantic melodies.",
    price: 299,
    originalPrice: 599,
    occasion: "anniversary",
    category: "Anniversary",
    rating: 5.0,
    reviewsCount: 98,
    images: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Chronological romance timeline",
      "Up to 12 curated couple photos",
      "Love letter unfolding envelope animation",
      "Acoustic romantic soundtrack",
      "Custom theme palette & romantic ambient glow",
      "Instant WhatsApp sharing card & QR code",
      "Lifetime digital access guarantee"
    ],
    estimatedTime: "7 mins to customize",
    active: true,
    popular: true,
    isNew: false
  },
  {
    id: "prod-3",
    name: "Friendship Forever",
    slug: "friendship-forever",
    description: "Celebrate the unstoppable bond of true friendship with goofy memories, throwback photos, and celebratory energy.",
    price: 199,
    originalPrice: 349,
    occasion: "friendship",
    category: "Friendship",
    rating: 4.8,
    reviewsCount: 84,
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Throwback photo dump carousel",
      "Inside-joke memory milestones",
      "Upbeat friendship soundtrack",
      "Personalized buddy nickname styling",
      "Downloadable digital keepsake poster",
      "Shareable instant web link"
    ],
    estimatedTime: "4 mins to customize",
    active: true,
    popular: true,
    isNew: false
  },
  {
    id: "prod-4",
    name: "Anniversary Journey",
    slug: "anniversary-journey",
    description: "An elegant, cinematic tribute to enduring love with gold-accented typography and heartfelt multimedia chapters.",
    price: 399,
    originalPrice: 699,
    occasion: "anniversary",
    category: "Anniversary",
    rating: 4.9,
    reviewsCount: 115,
    images: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Gold luxury theme with starry night overlay",
      "Multi-chapter memory storyline",
      "High-resolution photo gallery with lightbox",
      "Orchestral romantic background audio",
      "Custom anniversary year badge",
      "Personalized QR printable card"
    ],
    estimatedTime: "8 mins to customize",
    active: true,
    popular: false,
    isNew: false
  },
  {
    id: "prod-5",
    name: "Proposal Experience",
    slug: "proposal-experience",
    description: "A breathtaking interactive proposal with suspenseful slow reveal, romantic questions, and celebration fireworks.",
    price: 499,
    originalPrice: 999,
    occasion: "proposal",
    category: "Proposal",
    rating: 5.0,
    reviewsCount: 76,
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Suspenseful envelope opening animation",
      "Interactive 'Will You Marry Me?' decision button",
      "Explosion of animated confetti & fireworks on Yes",
      "Custom audio note & ambient violin melody",
      "High-definition photo gallery",
      "Instant WhatsApp message link"
    ],
    estimatedTime: "10 mins to customize",
    active: true,
    popular: true,
    isNew: true
  },
  {
    id: "prod-6",
    name: "Graduation Memories",
    slug: "graduation-memories",
    description: "Honor academic excellence, late study nights, and lifelong friendships with this proud graduate showcase.",
    price: 299,
    originalPrice: 499,
    occasion: "graduation",
    category: "Graduation",
    rating: 4.8,
    reviewsCount: 63,
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Degree & alma mater customized badges",
      "Campus life to convocation photo series",
      "Inspiring triumph audio track",
      "Friends and mentors congratulatory notes",
      "Social-ready sharing cards"
    ],
    estimatedTime: "5 mins to customize",
    active: true,
    popular: false,
    isNew: false
  },
  {
    id: "prod-7",
    name: "Golden Milestone",
    slug: "golden-milestone",
    description: "A regal celebratory experience for 25th/50th milestones, retirement triumphs, and prestigious achievements.",
    price: 349,
    originalPrice: 599,
    occasion: "celebration",
    category: "Celebration",
    rating: 4.9,
    reviewsCount: 52,
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Golden shimmer particle animations",
      "Lifetime memory photo album",
      "Honorary tribute message section",
      "Celebratory fanfare audio",
      "Custom printable QR badge"
    ],
    estimatedTime: "6 mins to customize",
    active: true,
    popular: false,
    isNew: false
  },
  {
    id: "prod-8",
    name: "Midnight Birthday Bash",
    slug: "midnight-birthday-bash",
    description: "Designed specifically to be sent at 12:00 AM! Packed with disco lights, virtual cake cutting, and birthday wishes.",
    price: 249,
    originalPrice: 449,
    occasion: "birthday",
    category: "Birthday",
    rating: 4.9,
    reviewsCount: 130,
    images: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Virtual candle blowing interactive micro-app",
      "Midnight birthday greeting audio",
      "Neon night festive theme",
      "10-photo memory carousel",
      "WhatsApp direct delivery integration"
    ],
    estimatedTime: "5 mins to customize",
    active: true,
    popular: true,
    isNew: true
  },
  {
    id: "prod-9",
    name: "Soulmate Symphony",
    slug: "soulmate-symphony",
    description: "An intimate artistic surprise designed for Valentine's Day or expressing deepest heartfelt affection.",
    price: 449,
    originalPrice: 799,
    occasion: "proposal",
    category: "Proposal",
    rating: 4.9,
    reviewsCount: 47,
    images: [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Custom audio track with poetic voiceovers",
      "Interactive memory constellation",
      "Glassmorphism romantic interface",
      "Love letter flip-book"
    ],
    estimatedTime: "8 mins to customize",
    active: true,
    popular: false,
    isNew: true
  },
  {
    id: "prod-10",
    name: "Besties Rewind",
    slug: "besties-rewind",
    description: "A vibrant Gen-Z scrapbook style experience filled with polaroids, emojis, and unforgettable road trips.",
    price: 199,
    originalPrice: 349,
    occasion: "friendship",
    category: "Friendship",
    rating: 4.8,
    reviewsCount: 91,
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Retro polaroid frame layouts",
      "Custom friendship badge generator",
      "Upbeat indie acoustic soundtrack",
      "Interactive stickers and emojis"
    ],
    estimatedTime: "4 mins to customize",
    active: true,
    popular: false,
    isNew: false
  },
  {
    id: "prod-11",
    name: "Scholar's Triumph",
    slug: "scholars-triumph",
    description: "Honor academic degrees, promotions, and new career chapters with sophistication and family congratulations.",
    price: 279,
    originalPrice: 499,
    occasion: "graduation",
    category: "Graduation",
    rating: 4.7,
    reviewsCount: 38,
    images: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Achievement badge & certificate display",
      "Speech/congratulations audio player",
      "Professional portfolio link support",
      "High resolution photo showcase"
    ],
    estimatedTime: "5 mins to customize",
    active: true,
    popular: false,
    isNew: false
  },
  {
    id: "prod-12",
    name: "Festive Spark",
    slug: "festive-spark",
    description: "Spread warmth and joy for Diwali, Christmas, New Year, or family reunions with shimmering festive animations.",
    price: 299,
    originalPrice: 549,
    occasion: "celebration",
    category: "Celebration",
    rating: 4.9,
    reviewsCount: 88,
    images: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Celebratory sparklers & diya animations",
      "Family photo reel with music",
      "Personalized warm festive blessings",
      "Direct WhatsApp festive greeting"
    ],
    estimatedTime: "5 mins to customize",
    active: true,
    popular: true,
    isNew: false
  }
];

export const testimonialsData = [
  {
    id: "t-1",
    name: "Aditi Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    role: "Bangalore",
    occasion: "Birthday Memory",
    quote: "GiftDrop made my friend's birthday unforgettable. She actually cried tears of joy when she opened it on WhatsApp at midnight!",
    rating: 5
  },
  {
    id: "t-2",
    name: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    role: "Mumbai",
    occasion: "Anniversary Journey",
    quote: "I wanted something different from a normal gift, and this was perfect. My wife said it was the most romantic gesture in our 5 years of marriage.",
    rating: 5
  },
  {
    id: "t-3",
    name: "Sneha Nair",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: "Kochi",
    occasion: "Friendship Forever",
    quote: "Creating the surprise took less than 6 minutes, but the reaction video she sent me is something I'll cherish forever. Absolute genius product!",
    rating: 5
  },
  {
    id: "t-4",
    name: "Karan Patel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    role: "Ahmedabad",
    occasion: "Proposal Experience",
    quote: "She said YES! The music cue and envelope reveal build-up had her heart racing. GiftDrop made our engagement moment pure cinematic magic.",
    rating: 5
  },
  {
    id: "t-5",
    name: "Ananya Roy",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    role: "Kolkata",
    occasion: "Graduation Memories",
    quote: "Surprised my younger brother when he graduated from IIT. The whole family gathered around his iPad watching the memories rewind. 10/10!",
    rating: 5
  },
  {
    id: "t-6",
    name: "Vikram Joshi",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    role: "Pune",
    occasion: "Our Story",
    quote: "The QR code card was so classy. I printed it out and slipped it inside a bouquet of roses. When she scanned it, her jaw dropped!",
    rating: 5
  },
  {
    id: "t-7",
    name: "Priya & Rohan",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    role: "Delhi NCR",
    occasion: "Golden Milestone",
    quote: "We made this for our parents' 30th wedding anniversary. Relatives from US, Canada, and India all viewed the link and left messages.",
    rating: 5
  },
  {
    id: "t-8",
    name: "Tanvi Deshmukh",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    role: "Hyderabad",
    occasion: "Besties Rewind",
    quote: "It's so much more personal than gifting a boring gift card. The photo timeline and our favorite college song brought back so many golden memories.",
    rating: 5
  }
];

export const demoUsers = [
  {
    id: "user-admin",
    name: "GiftDrop Administrator",
    email: "admin@giftdrop.com",
    role: "admin",
    passwordHash: "$2a$10$wB5WzK938B2N9hGqXvJvUeV68yM8w6n9f4jC4V3M5Z8jK1qGz8W2K", // admin123
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-01-10T00:00:00.000Z"
  },
  {
    id: "user-1",
    name: "Aarav Sharma",
    email: "user@giftdrop.com",
    role: "customer",
    passwordHash: "$2a$10$f3F8l9K938B2N9hGqXvJvUeV68yM8w6n9f4jC4V3M5Z8jK1qGz8W2", // user123
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-01-15T10:30:00.000Z"
  },
  {
    id: "user-2",
    name: "Aditi Rao",
    email: "aditi@example.com",
    role: "customer",
    passwordHash: "$2a$10$f3F8l9K938B2N9hGqXvJvUeV68yM8w6n9f4jC4V3M5Z8jK1qGz8W2",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-01-20T14:15:00.000Z"
  },
  {
    id: "user-3",
    name: "Rahul Verma",
    email: "rahul@example.com",
    role: "customer",
    passwordHash: "$2a$10$f3F8l9K938B2N9hGqXvJvUeV68yM8w6n9f4jC4V3M5Z8jK1qGz8W2",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-02-01T09:45:00.000Z"
  },
  {
    id: "user-4",
    name: "Sneha Nair",
    email: "sneha@example.com",
    role: "customer",
    passwordHash: "$2a$10$f3F8l9K938B2N9hGqXvJvUeV68yM8w6n9f4jC4V3M5Z8jK1qGz8W2",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-02-05T12:00:00.000Z"
  },
  {
    id: "user-5",
    name: "Karan Patel",
    email: "karan@example.com",
    role: "customer",
    passwordHash: "$2a$10$f3F8l9K938B2N9hGqXvJvUeV68yM8w6n9f4jC4V3M5Z8jK1qGz8W2",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-02-12T16:20:00.000Z"
  },
  {
    id: "user-6",
    name: "Ananya Roy",
    email: "ananya@example.com",
    role: "customer",
    passwordHash: "$2a$10$f3F8l9K938B2N9hGqXvJvUeV68yM8w6n9f4jC4V3M5Z8jK1qGz8W2",
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-02-18T18:00:00.000Z"
  },
  {
    id: "user-7",
    name: "Vikram Joshi",
    email: "vikram@example.com",
    role: "customer",
    passwordHash: "$2a$10$f3F8l9K938B2N9hGqXvJvUeV68yM8w6n9f4jC4V3M5Z8jK1qGz8W2",
    profileImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-02-22T11:10:00.000Z"
  },
  {
    id: "user-8",
    name: "Priya Singhania",
    email: "priya@example.com",
    role: "customer",
    passwordHash: "$2a$10$f3F8l9K938B2N9hGqXvJvUeV68yM8w6n9f4jC4V3M5Z8jK1qGz8W2",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-03-01T15:30:00.000Z"
  },
  {
    id: "user-9",
    name: "Tanvi Deshmukh",
    email: "tanvi@example.com",
    role: "customer",
    passwordHash: "$2a$10$f3F8l9K938B2N9hGqXvJvUeV68yM8w6n9f4jC4V3M5Z8jK1qGz8W2",
    profileImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-03-08T08:50:00.000Z"
  }
];

export const demoSurprises = [
  {
    id: "surp-1",
    userId: "user-1",
    productId: "prod-1",
    receiverName: "Priya",
    senderName: "Aarav",
    relationship: "Partner",
    message: "Happy 24th Birthday to the most amazing person in the world! You bring endless laughter, kindness, and warmth into every single day. I hope this year brings you everything your beautiful heart desires. Love you to the moon and back!",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", caption: "Our sunset walk by the beach" },
      { id: "p2", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80", caption: "That goofy coffee date in Bandra" },
      { id: "p3", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80", caption: "Your radiant smile on Diwali night" },
      { id: "p4", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80", caption: "Hills trip last monsoon" }
    ],
    memories: [
      { id: "m1", date: "15 Oct 2023", title: "The First Hello", description: "When we bumped into each other at the library and spilled cold coffee." },
      { id: "m2", date: "24 Dec 2024", title: "Midnight Marine Drive", description: "Sitting under the starry sky listening to indie music till sunrise." },
      { id: "m3", date: "12 May 2025", title: "Adopting Milo", description: "Bringing our golden puppy home and watching him fall asleep in your arms." }
    ],
    music: "acoustic-celebration",
    theme: "Romantic",
    colorPalette: "#f43f5e",
    publicSlug: "bday-priya",
    status: "published",
    views: 48,
    createdAt: "2026-03-01T12:00:00.000Z"
  },
  {
    id: "surp-2",
    userId: "user-2",
    productId: "prod-2",
    receiverName: "Rohan",
    senderName: "Aditi",
    relationship: "Partner",
    message: "Happy 3rd Anniversary my love! From college cafeteria dates to building a real home together, every second by your side has been a dream. Cheers to forever!",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80", caption: "Where it all began" },
      { id: "p2", url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80", caption: "Our first road trip to Goa" }
    ],
    memories: [
      { id: "m1", date: "14 Feb 2023", title: "First Valentine", description: "A simple rooftop dinner with fairy lights." },
      { id: "m2", date: "20 Nov 2024", title: "New Apartment Keys", description: "Opening champagne sitting on the empty floor." }
    ],
    music: "gentle-piano",
    theme: "Elegant",
    colorPalette: "#e11d48",
    publicSlug: "anniversary-rohan",
    status: "published",
    views: 62,
    createdAt: "2026-03-05T14:30:00.000Z"
  },
  {
    id: "surp-3",
    userId: "user-3",
    productId: "prod-3",
    receiverName: "Neha",
    senderName: "Rahul",
    relationship: "Best Friend",
    message: "Happy Friendship Day to my partner-in-crime! You've heard all my rants and cheered me through every job interview. Never change!",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80", caption: "Best buddies since day 1" }
    ],
    memories: [
      { id: "m1", date: "05 Aug 2022", title: "First Semester Chaos", description: "Bunking chemistry to eat samosas in the canteen." }
    ],
    music: "indie-acoustic",
    theme: "Celebration",
    colorPalette: "#f59e0b",
    publicSlug: "forever-neha",
    status: "published",
    views: 31,
    createdAt: "2026-03-08T09:15:00.000Z"
  },
  {
    id: "surp-4",
    userId: "user-4",
    productId: "prod-5",
    receiverName: "Meera",
    senderName: "Karan",
    relationship: "Partner",
    message: "Meera, from the moment I met you, my world became brighter and fuller. I want to spend every sunrise and sunset loving you. Will you marry me?",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80", caption: "Under the starlight" }
    ],
    memories: [
      { id: "m1", date: "10 Jan 2024", title: "When I Knew", description: "Watching you laugh so hard you cried." }
    ],
    music: "orchestral-strings",
    theme: "Romantic",
    colorPalette: "#be123c",
    publicSlug: "proposal-meera",
    status: "published",
    views: 120,
    createdAt: "2026-03-10T19:00:00.000Z"
  },
  {
    id: "surp-5",
    userId: "user-5",
    productId: "prod-6",
    receiverName: "Kabir",
    senderName: "Sneha",
    relationship: "Family",
    message: "Hearty congratulations on your Graduation Kabir! Dr. Kabir sounds so good! We are all immensely proud of your grit and perseverance.",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80", caption: "Convocation glory" }
    ],
    memories: [
      { id: "m1", date: "02 Jul 2021", title: "Admissions Day", description: "First day stepping into campus with packed suitcases." }
    ],
    music: "triumph-anthem",
    theme: "Minimal",
    colorPalette: "#2563eb",
    publicSlug: "grad-kabir",
    status: "published",
    views: 29,
    createdAt: "2026-03-12T11:20:00.000Z"
  },
  {
    id: "surp-6",
    userId: "user-6",
    productId: "prod-7",
    receiverName: "Arjun",
    senderName: "Ananya",
    relationship: "Friend",
    message: "Congratulations on landing your dream role at Google! Hard work always speaks loudest. Drinks are on you this weekend!",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80", caption: "Celebration time" }
    ],
    memories: [
      { id: "m1", date: "15 Jan 2026", title: "The Offer Letter", description: "The scream you let out when the email arrived!" }
    ],
    music: "upbeat-pop",
    theme: "Celebration",
    colorPalette: "#10b981",
    publicSlug: "cheers-arjun",
    status: "published",
    views: 18,
    createdAt: "2026-03-14T17:40:00.000Z"
  },
  {
    id: "surp-7",
    userId: "user-7",
    productId: "prod-8",
    receiverName: "Aditya",
    senderName: "Vikram",
    relationship: "Best Friend",
    message: "Happy 30th Birthday Adi! Welcome to the dirty thirties. May this decade be your most prosperous, adventurous, and wild one yet!",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80", caption: "Midnight countdown" }
    ],
    memories: [
      { id: "m1", date: "22 Aug 2024", title: "Ladakh Bike Ride", description: "Surviving the pass and sipping hot chai at 17,000 ft." }
    ],
    music: "retro-synth",
    theme: "Dark",
    colorPalette: "#8b5cf6",
    publicSlug: "bday-aditya",
    status: "published",
    views: 45,
    createdAt: "2026-03-16T00:01:00.000Z"
  },
  {
    id: "surp-8",
    userId: "user-8",
    productId: "prod-10",
    receiverName: "Diya",
    senderName: "Priya",
    relationship: "Friend",
    message: "To my soul sister Diya, thank you for being the glue in all our crazy plans. Can't wait for our Euro trip next month!",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80", caption: "Road trips & coffee" }
    ],
    memories: [
      { id: "m1", date: "10 Mar 2025", title: "Spontaneous Jaipur", description: "Booking train tickets at 2 AM and packing in 15 minutes." }
    ],
    music: "indie-acoustic",
    theme: "Dreamy",
    colorPalette: "#ec4899",
    publicSlug: "friendship-diya",
    status: "published",
    views: 39,
    createdAt: "2026-03-18T16:10:00.000Z"
  },
  {
    id: "surp-9",
    userId: "user-9",
    productId: "prod-9",
    receiverName: "Riya",
    senderName: "Tanvi",
    relationship: "Partner",
    message: "Every day with you feels like poetry. Happy 1 year anniversary my sweet girl! Looking forward to creating thousands more memories.",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80", caption: "Candlelight moments" }
    ],
    memories: [
      { id: "m1", date: "19 Mar 2025", title: "First Dinner", description: "Talking for four straight hours until the restaurant closed." }
    ],
    music: "gentle-piano",
    theme: "Romantic",
    colorPalette: "#e11d48",
    publicSlug: "love-riya",
    status: "published",
    views: 57,
    createdAt: "2026-03-20T20:00:00.000Z"
  },
  {
    id: "surp-10",
    userId: "user-1",
    productId: "prod-12",
    receiverName: "The Sharma Family",
    senderName: "Aarav",
    relationship: "Family",
    message: "Wishing my wonderful family a joyous and prosperous festive season! Even though I'm miles away, my heart is always at home with you all.",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80", caption: "Family portrait" }
    ],
    memories: [
      { id: "m1", date: "12 Nov 2024", title: "Diwali Sweets", description: "Mom's homemade gulab jamuns and the courtyard lights." }
    ],
    music: "festive-sitar",
    theme: "Elegant",
    colorPalette: "#f59e0b",
    publicSlug: "festive-family",
    status: "published",
    views: 74,
    createdAt: "2026-03-22T10:15:00.000Z"
  }
];

export const demoOrders = [
  {
    id: "ord-101",
    orderNumber: "GD-2026-1001",
    userId: "user-1",
    userName: "Aarav Sharma",
    userEmail: "user@giftdrop.com",
    surpriseId: "surp-1",
    surpriseTitle: "Birthday Memory for Priya",
    productId: "prod-1",
    productName: "Birthday Memory",
    amount: 149,
    originalAmount: 199,
    discount: 50,
    couponCode: "WELCOME20",
    paymentStatus: "completed",
    paymentMethod: "Razorpay (UPI)",
    paymentId: "pay_N9xGqXvJvUeV68",
    createdAt: "2026-03-01T12:05:00.000Z"
  },
  {
    id: "ord-102",
    orderNumber: "GD-2026-1002",
    userId: "user-2",
    userName: "Aditi Rao",
    userEmail: "aditi@example.com",
    surpriseId: "surp-2",
    surpriseTitle: "Our Story for Rohan",
    productId: "prod-2",
    productName: "Our Story",
    amount: 249,
    originalAmount: 299,
    discount: 50,
    couponCode: "CELEBRATE50",
    paymentStatus: "completed",
    paymentMethod: "Razorpay (Cards)",
    paymentId: "pay_K8vJvUeV68yM8w",
    createdAt: "2026-03-05T14:35:00.000Z"
  },
  {
    id: "ord-103",
    orderNumber: "GD-2026-1003",
    userId: "user-3",
    userName: "Rahul Verma",
    userEmail: "rahul@example.com",
    surpriseId: "surp-3",
    surpriseTitle: "Friendship Forever for Neha",
    productId: "prod-3",
    productName: "Friendship Forever",
    amount: 199,
    originalAmount: 199,
    discount: 0,
    couponCode: null,
    paymentStatus: "completed",
    paymentMethod: "Razorpay (NetBanking)",
    paymentId: "pay_L7w6n9f4jC4V3M",
    createdAt: "2026-03-08T09:20:00.000Z"
  },
  {
    id: "ord-104",
    orderNumber: "GD-2026-1004",
    userId: "user-4",
    userName: "Sneha Nair",
    userEmail: "sneha@example.com",
    surpriseId: "surp-4",
    surpriseTitle: "Proposal Experience for Meera",
    productId: "prod-5",
    productName: "Proposal Experience",
    amount: 399,
    originalAmount: 499,
    discount: 100,
    couponCode: "LOVE100",
    paymentStatus: "completed",
    paymentMethod: "Razorpay (UPI)",
    paymentId: "pay_P4jC4V3M5Z8jK1",
    createdAt: "2026-03-10T19:05:00.000Z"
  },
  {
    id: "ord-105",
    orderNumber: "GD-2026-1005",
    userId: "user-5",
    userName: "Karan Patel",
    userEmail: "karan@example.com",
    surpriseId: "surp-5",
    surpriseTitle: "Graduation Memories for Kabir",
    productId: "prod-6",
    productName: "Graduation Memories",
    amount: 299,
    originalAmount: 299,
    discount: 0,
    couponCode: null,
    paymentStatus: "completed",
    paymentMethod: "Razorpay (UPI)",
    paymentId: "pay_M5Z8jK1qGz8W2K",
    createdAt: "2026-03-12T11:25:00.000Z"
  },
  {
    id: "ord-106",
    orderNumber: "GD-2026-1006",
    userId: "user-6",
    userName: "Ananya Roy",
    userEmail: "ananya@example.com",
    surpriseId: "surp-6",
    surpriseTitle: "Golden Milestone for Arjun",
    productId: "prod-7",
    productName: "Golden Milestone",
    amount: 299,
    originalAmount: 349,
    discount: 50,
    couponCode: "CELEBRATE50",
    paymentStatus: "completed",
    paymentMethod: "Razorpay (Cards)",
    paymentId: "pay_Q1qGz8W2KwB5Wz",
    createdAt: "2026-03-14T17:45:00.000Z"
  },
  {
    id: "ord-107",
    orderNumber: "GD-2026-1007",
    userId: "user-7",
    userName: "Vikram Joshi",
    userEmail: "vikram@example.com",
    surpriseId: "surp-7",
    surpriseTitle: "Midnight Birthday for Aditya",
    productId: "prod-8",
    productName: "Midnight Birthday Bash",
    amount: 199,
    originalAmount: 249,
    discount: 50,
    couponCode: "WELCOME20",
    paymentStatus: "completed",
    paymentMethod: "Razorpay (UPI)",
    paymentId: "pay_R8W2KwB5WzK938",
    createdAt: "2026-03-16T00:05:00.000Z"
  },
  {
    id: "ord-108",
    orderNumber: "GD-2026-1008",
    userId: "user-8",
    userName: "Priya Singhania",
    userEmail: "priya@example.com",
    surpriseId: "surp-8",
    surpriseTitle: "Besties Rewind for Diya",
    productId: "prod-10",
    productName: "Besties Rewind",
    amount: 199,
    originalAmount: 199,
    discount: 0,
    couponCode: null,
    paymentStatus: "completed",
    paymentMethod: "Razorpay (Cards)",
    paymentId: "pay_S5WzK938B2N9hG",
    createdAt: "2026-03-18T16:15:00.000Z"
  },
  {
    id: "ord-109",
    orderNumber: "GD-2026-1009",
    userId: "user-9",
    userName: "Tanvi Deshmukh",
    userEmail: "tanvi@example.com",
    surpriseId: "surp-9",
    surpriseTitle: "Soulmate Symphony for Riya",
    productId: "prod-9",
    productName: "Soulmate Symphony",
    amount: 349,
    originalAmount: 449,
    discount: 100,
    couponCode: "LOVE100",
    paymentStatus: "completed",
    paymentMethod: "Razorpay (UPI)",
    paymentId: "pay_T938B2N9hGqXvJ",
    createdAt: "2026-03-20T20:05:00.000Z"
  },
  {
    id: "ord-110",
    orderNumber: "GD-2026-1010",
    userId: "user-1",
    userName: "Aarav Sharma",
    userEmail: "user@giftdrop.com",
    surpriseId: "surp-10",
    surpriseTitle: "Festive Spark for Family",
    productId: "prod-12",
    productName: "Festive Spark",
    amount: 249,
    originalAmount: 299,
    discount: 50,
    couponCode: "CELEBRATE50",
    paymentStatus: "completed",
    paymentMethod: "Razorpay (UPI)",
    paymentId: "pay_U2N9hGqXvJvUeV",
    createdAt: "2026-03-22T10:20:00.000Z"
  }
];

export const demoCoupons = [
  {
    id: "c-1",
    code: "WELCOME20",
    discountType: "percentage",
    discountValue: 20,
    minOrderAmount: 149,
    expiry: "2026-12-31T23:59:59.000Z",
    usageLimit: 1000,
    usedCount: 215,
    active: true,
    description: "20% off on your first surprise"
  },
  {
    id: "c-2",
    code: "CELEBRATE50",
    discountType: "fixed",
    discountValue: 50,
    minOrderAmount: 199,
    expiry: "2026-12-31T23:59:59.000Z",
    usageLimit: 500,
    usedCount: 142,
    active: true,
    description: "Flat ₹50 off on celebrations & milestones"
  },
  {
    id: "c-3",
    code: "LOVE100",
    discountType: "fixed",
    discountValue: 100,
    minOrderAmount: 399,
    expiry: "2026-12-31T23:59:59.000Z",
    usageLimit: 300,
    usedCount: 98,
    active: true,
    description: "Flat ₹100 off on premium love & proposal experiences"
  },
  {
    id: "c-4",
    code: "GIFTNOW",
    discountType: "percentage",
    discountValue: 15,
    minOrderAmount: 0,
    expiry: "2026-12-31T23:59:59.000Z",
    usageLimit: 1000,
    usedCount: 67,
    active: true,
    description: "15% off instant gift coupon"
  }
];

export const demoReviews = [
  {
    id: "rev-1",
    productId: "prod-1",
    userId: "user-2",
    userName: "Aditi Rao",
    rating: 5,
    comment: "The animations and the music were stunning! My best friend watched it three times in a row.",
    createdAt: "2026-03-02T10:00:00.000Z"
  },
  {
    id: "rev-2",
    productId: "prod-2",
    userId: "user-3",
    userName: "Rahul Verma",
    rating: 5,
    comment: "So much emotional value. The timeline feature is so well done.",
    createdAt: "2026-03-06T15:30:00.000Z"
  },
  {
    id: "rev-3",
    productId: "prod-5",
    userId: "user-4",
    userName: "Sneha Nair",
    rating: 5,
    comment: "She cried, she laughed, and she said YES! Thank you GiftDrop!",
    createdAt: "2026-03-11T12:00:00.000Z"
  },
  {
    id: "rev-4",
    productId: "prod-3",
    userId: "user-5",
    userName: "Karan Patel",
    rating: 5,
    comment: "Super smooth checkout, received link immediately, and the receiver UI works great on mobile phones.",
    createdAt: "2026-03-13T09:40:00.000Z"
  },
  {
    id: "rev-5",
    productId: "prod-6",
    userId: "user-6",
    userName: "Ananya Roy",
    rating: 4,
    comment: "Brilliant concept for long-distance family gifting. Highly recommend.",
    createdAt: "2026-03-15T18:20:00.000Z"
  }
];
