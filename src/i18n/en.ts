const en = {
  metadata: {
    title: "Loomyna — Made for brighter days",
    description: "Cheerful, easy-to-wear pieces for yoga, slow mornings, and sun-filled days.",
  },
  skipToContent: "Skip to content",
  announcement: "A little sunshine, made to move with you ☀",
  navigation: {
    mainLabel: "Main navigation",
    shop: "Shop all",
    tops: "Tops",
    bottoms: "Bottoms",
    mood: "Our mood",
  },
  header: {
    homeLabel: "Loomyna home",
    chatLabel: "Chat with Loomyna on WhatsApp",
    chat: "Let's chat",
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
    menuLabel: "Navigation menu",
    mobileNavigationLabel: "Mobile navigation",
    menuEyebrow: "Find your sunshine",
    chatWithUs: "Chat with us",
  },
  language: {
    label: "Language",
    english: "English",
    indonesian: "Bahasa Indonesia",
  },
  footer: {
    explore: "Explore",
    needHelp: "Need a hand?",
    followUs: "Follow us",
    madeFor: "Made for brighter days.",
  },
  home: {
    campaignLabel: "Loomyna campaigns",
    slide: "slide",
    of: "of",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    goToSlide: "Go to slide",
    heroAlt: "Two women by the sea wearing soft blue and butter yellow Loomyna tops",
    sectionEyebrow: "Freshly picked",
    sectionTitle: "Meet your sunny-day uniform",
    sectionDescription: "Soft colors, sweet silhouettes, and easy pieces to stretch, stroll, and live in.",
    feelingEyebrow: "The Loomyna feeling",
    feelingTitle: "Movement should feel like play.",
    feelingDescription: "We make cheerful little staples for yoga mornings, coffee walks, and wherever the sun takes you next.",
    sunnyEyebrow: "Soft. Sunny. Yours.",
    sunnyTitle: "Wear the good mood.",
    explorePieces: "Explore all pieces",
  },
  productCard: {
    badges: { new: "New", featured: "Our pick", bestseller: "Loved", soldOut: "Sold out" },
    viewPiece: "View piece",
    availableColors: "Available colors",
  },
  productPage: {
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    shop: "Shop",
    relatedEyebrow: "You may also like",
    relatedTitle: "Keep the good mood going",
  },
  productDetail: {
    images: "images",
    previousImage: "Previous image",
    nextImage: "Next image",
    viewImage: "View image",
    color: "Color",
    chooseColor: "Choose a color",
    size: "Size",
    chooseSize: "Choose a size",
    chooseColorFirst: "Choose color first",
    quantity: "Quantity",
    decreaseQuantity: "Decrease quantity",
    increaseQuantity: "Increase quantity",
    piece: "piece",
    pieces: "pieces",
    selectOptions: "Select a color and size to order.",
    preOrder: "Pre-order",
    preOrderNotice: "This color is currently in production.",
    preOrderPreviewNotice: "The current product photo shows White.",
    estimatedShipping: "Estimated shipping",
    orderWhatsApp: "Order via WhatsApp",
    preOrderWhatsApp: "Pre-order via WhatsApp",
    buyShopee: "Buy on Shopee",
    shopeeSoon: "Shopee — coming soon",
    checkoutNote: "Opening WhatsApp starts a chat; your order is confirmed once our team replies.",
    details: "Details",
    sizeFit: "Size & fit",
    care: "Care",
  },
  notFound: {
    eyebrow: "404 — wandered off the mat",
    title: "We couldn't find that piece.",
    description: "Let's take you back to something sunny.",
    action: "Shop all pieces",
  },
} as const;

type DeepStringShape<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends Record<string, unknown>
      ? DeepStringShape<T[K]>
      : T[K];
};

export type Dictionary = DeepStringShape<typeof en>;

export default en;
