# Loomyna Fashion Storefront Plan

## 1. Project goal

Build a fast, responsive fashion catalogue for Loomyna with a visual direction inspired by Arus the Brand, while using Loomyna's own brand colors, typography, photography, copy, and identity.

The first release is a catalogue and assisted-checkout website. Customers browse products, select a color and size, and then continue to either WhatsApp or Shopee. The first release will not process payments or manage orders directly.

## 2. Agreed technology

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel for deployment and hosting
- Vercel Web Analytics for page and visitor analytics
- `next/image` for responsive, optimized images
- Embla Carousel for the hero and product-image carousels
- Local TypeScript files as the initial product and homepage data source
- Git/GitHub plus Vercel automatic deployments for product updates

### Not required for the first release

- WordPress or WooCommerce
- A database
- A headless CMS
- Customer accounts or authentication
- A custom Node/Express backend
- Native payment processing
- Inventory reservation
- Redux or another global state library
- A large UI component library

React local state is sufficient for the mobile menu, carousels, selected color, selected size, quantity, and checkout link generation.

## 3. Site architecture

Suggested project structure:

```text
src/
  app/
    layout.tsx
    page.tsx
    products/
      [slug]/
        page.tsx
    not-found.tsx
    robots.ts
    sitemap.ts
  components/
    layout/
      AnnouncementBar.tsx
      Header.tsx
      MobileMenu.tsx
      Footer.tsx
    home/
      HeroCarousel.tsx
      ProductSection.tsx
    product/
      ProductCard.tsx
      ProductGrid.tsx
      ProductGallery.tsx
      ProductOptions.tsx
      CheckoutActions.tsx
    ui/
  config/
    site.ts
    home.ts
  data/
    products.ts
  types/
    product.ts
public/
  assets/
    brand/
    banners/
      desktop/
      mobile/
    products/
      product-slug/
```

Files inside `public/assets` will be referenced from the website as `/assets/...`.

## 4. Pages and features

### Global layout

- Responsive announcement bar, header, navigation, and footer
- Desktop navigation and compact mobile navigation drawer
- Loomyna logo linked to the homepage
- Consistent spacing, colors, typography, buttons, and focus states
- Footer links to WhatsApp, Instagram, TikTok, and Shopee
- Optional email address, shipping information, returns information, and copyright text

### Landing page

- Large responsive hero carousel
- Separate desktop and mobile banner images
- Swipe support on touch devices
- Previous/next controls and accessible slide indicators
- Optional autoplay that pauses on hover, focus, or user interaction
- Respect `prefers-reduced-motion`
- Configurable banner heading, text, CTA label, and CTA destination
- Product sections such as New Arrivals, Featured, and Best Sellers
- Responsive product-card grid/carousel
- Product card contains:
  - Primary product image
  - Optional alternate image on hover for desktop
  - Product name
  - Formatted price
  - Available color swatches
  - Optional New, Featured, Bestseller, or Sold Out label
  - Link to the product-detail page

### Product-detail page

- Route format: `/products/[slug]`
- Responsive product image gallery
- Images update when a customer selects a color
- Thumbnail navigation on desktop
- Swipeable gallery on mobile
- Product name and formatted IDR price
- Description, material, care instructions, and size information
- Accessible color selection
- Accessible size selection
- Unavailable color/size combinations are disabled
- Optional quantity selector, initially defaulting to one
- Selected variation summary
- Buy on Shopee button
- Order via WhatsApp button
- Checkout buttons remain disabled until all required selections are made
- Optional related-products section
- Per-product metadata and social-sharing image
- Product structured data for search engines where applicable
- Graceful 404 page for unknown or unpublished product slugs

## 5. Product data model

Products will be defined in TypeScript and rendered through one reusable dynamic product page. A separate React page must not be created for every product.

Recommended types:

```ts
export type ProductBadge = "new" | "featured" | "bestseller" | "sold-out";

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductVariant = {
  sku: string;
  color: string;
  colorSlug: string;
  colorHex: string;
  size: string;
  available: boolean;
  shopeeUrl?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: "IDR";
  shortDescription: string;
  description: string;
  category: string;
  material?: string;
  careInstructions?: string[];
  sizeGuide?: string[];
  badges?: ProductBadge[];
  published: boolean;
  featured: boolean;
  imagesByColor: Record<string, ProductImage[]>;
  variants: ProductVariant[];
  shopeeUrl: string;
};
```

Example product:

```ts
export const products: Product[] = [
  {
    id: "luna-midi-dress",
    slug: "luna-midi-dress",
    name: "Luna Midi Dress",
    price: 349000,
    currency: "IDR",
    shortDescription: "A lightweight everyday midi dress.",
    description: "Full product description goes here.",
    category: "Dresses",
    material: "Material information goes here.",
    careInstructions: ["Care instruction goes here."],
    sizeGuide: ["S: measurement", "M: measurement"],
    badges: ["new"],
    published: true,
    featured: true,
    imagesByColor: {
      black: [
        {
          src: "/assets/products/luna-midi-dress/black-front.webp",
          alt: "Loomyna Luna Midi Dress in Black, front view",
          width: 1600,
          height: 2000,
        },
        {
          src: "/assets/products/luna-midi-dress/black-back.webp",
          alt: "Loomyna Luna Midi Dress in Black, back view",
          width: 1600,
          height: 2000,
        },
      ],
    },
    variants: [
      {
        sku: "LUNA-BLACK-S",
        color: "Black",
        colorSlug: "black",
        colorHex: "#171717",
        size: "S",
        available: true,
      },
      {
        sku: "LUNA-BLACK-M",
        color: "Black",
        colorSlug: "black",
        colorHex: "#171717",
        size: "M",
        available: true,
      },
    ],
    shopeeUrl: "https://shopee.co.id/...",
  },
];
```

### Product data rules

- `price` is an integer in Indonesian rupiah, for example `349000`, not a formatted string.
- Each product must have a unique `id` and URL-safe `slug`.
- Each sellable color/size combination must have a unique SKU.
- `colorSlug` must match a key in `imagesByColor`.
- Use `available: false` for combinations that should be visible but disabled.
- Use `published: false` to keep unfinished products out of the website.
- Image `alt` text must describe the product, color, and view rather than repeat the filename.
- A variant-specific `shopeeUrl` may override the general product Shopee URL when available.
- Product data should be checked at build time so invalid products cannot be deployed.

## 6. Homepage banner data

Homepage banners should also be data-driven. Recommended shape:

```ts
export type HeroSlide = {
  id: string;
  desktopImage: string;
  mobileImage: string;
  imageAlt: string;
  heading?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
};
```

The homepage section order and selected products should live in `src/config/home.ts`, not be hardcoded across multiple components.

## 7. Checkout flow

### WhatsApp checkout

1. Customer selects a color and size.
2. Customer optionally changes the quantity.
3. The website builds a prefilled WhatsApp message.
4. WhatsApp opens in a new tab or app.

Proposed message:

```text
Hi Loomyna, I would like to order:

Product: Luna Midi Dress
Color: Black
Size: M
Quantity: 1
Price: Rp349.000
Product: https://loomyna.id/products/luna-midi-dress
```

The WhatsApp link will use:

```ts
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
```

The configured number must include the country code and contain digits only, for example `6281234567890`.

### Shopee checkout

- The product's Shopee URL opens in a new tab.
- The customer is reminded to confirm the same color and size on Shopee.
- Loomyna must not assume that a Shopee URL preserves the variation selected on the Loomyna website.

### First-release limitations

- The website does not reserve inventory.
- Opening WhatsApp or Shopee does not confirm an order.
- No customer or payment data is stored by Loomyna.
- A cart is not required initially.
- A lightweight `localStorage` cart can be added later if multi-product WhatsApp checkout becomes necessary.

## 8. Analytics plan

Use Vercel Web Analytics in the first release.

### Automatically tracked

- Product-page views
- Most-viewed product URLs
- Approximate visitors
- Referrers and traffic sources
- Country, device type, browser, and operating system
- Desktop versus mobile traffic

Because each product has a unique `/products/[slug]` URL, the Top Pages report can identify the most-viewed products without adding a custom event.

### Recommended custom events

- `product_card_click`
- `checkout_click` with `product` and `channel`
- `hero_banner_click`
- `social_link_click`

Example:

```ts
track("checkout_click", {
  product: product.slug,
  channel: "whatsapp",
});
```

Vercel custom events currently require a supported paid plan. Page-view analytics can be used first, with custom events enabled later. Analytics events must never contain names, phone numbers, email addresses, WhatsApp messages, or other personal information.

The key business report should compare product views with WhatsApp/Shopee checkout clicks so Loomyna can distinguish popular products from products that generate buying intent.

Google Analytics 4 is not required initially. It may be added later if Loomyna needs advertising attribution, standardized e-commerce events, or more advanced marketing reports.

## 9. Performance requirements

- Prefer Server Components by default.
- Use Client Components only where browser interaction is required.
- Statically generate published product pages using `generateStaticParams`.
- Use `next/image` for product and banner imagery.
- Prioritize only the first visible hero image.
- Lazy-load below-the-fold and non-active carousel images.
- Provide explicit image width and height to prevent layout shifts.
- Use responsive `sizes` values so mobile devices do not download desktop-sized product images.
- Use `next/font` or locally hosted, subsetted fonts.
- Avoid unnecessary third-party scripts.
- Avoid an animation framework unless later motion requirements justify it.
- Keep analytics limited to one provider initially.
- Keep components and Tailwind styles reusable instead of duplicating page markup.
- Test production builds with Lighthouse and real mobile breakpoints.
- Target strong Core Web Vitals, especially Largest Contentful Paint and Cumulative Layout Shift.

## 10. Accessibility and responsive behavior

- Build mobile-first and test common phone, tablet, laptop, and wide-desktop widths.
- All controls must work with keyboard navigation.
- Use visible focus states.
- Use semantic headings, buttons, links, lists, and landmarks.
- Give meaningful alt text to informative images.
- Give decorative images empty alt text.
- Ensure color and size selection is understandable without relying on color alone.
- Ensure touch targets are comfortably sized.
- Ensure text and controls have sufficient contrast.
- Carousels must have accessible labels and controls.
- Autoplay must be pausable and respect reduced-motion preferences.

## 11. SEO and social sharing

- Generate unique product titles and descriptions.
- Add canonical URLs.
- Generate `sitemap.xml` and `robots.txt` through Next.js.
- Add Open Graph and social-sharing metadata.
- Use a product image as the social-sharing image.
- Add Product structured data where the available data supports it.
- Keep product URLs stable after publication.
- Do not index unpublished product pages.

## 12. Deployment and product-update workflow

Initial workflow:

1. Add product images under `public/assets/products/[product-slug]/`.
2. Add or update the product entry in `src/data/products.ts`.
3. Run type checking, validation, linting, tests, and a production build.
4. Commit and push the change to GitHub.
5. Vercel automatically builds and deploys the new version.

A headless CMS is unnecessary at launch. It can be introduced later if nontechnical team members need to publish products without editing the repository. The product components should depend on a small data-access layer so the local TypeScript source can later be replaced by Sanity, Supabase, or another system without redesigning the UI.

## 13. Materials Loomyna needs to provide

### Required brand assets

- [ ] Primary Loomyna logo, preferably SVG
- [ ] Compact logo mark or favicon, preferably SVG or a large PNG
- [ ] Brand color palette, including background, text, accent, and button colors
- [ ] Preferred fonts or approval to select suitable fonts
- [ ] Short description of the intended brand personality
- [ ] Any existing brand guidelines

### Required banner content

- [ ] Approximately three desktop hero images, ideally around `1920 x 1000`
- [ ] Matching mobile hero images, ideally around `1080 x 1350`
- [ ] Alt text or a description of each banner image
- [ ] Optional heading for each slide
- [ ] Optional supporting text for each slide
- [ ] Optional CTA label for each slide
- [ ] CTA destination for each slide
- [ ] Desired slide order

Banner images should ideally contain no baked-in text so the website can render responsive, accessible HTML text over the image.

### Required product photography

- [ ] Consistent main/catalog image for each product
- [ ] Front view
- [ ] Back view
- [ ] Detail or close-up view
- [ ] Optional lifestyle image
- [ ] Images for every color whose appearance differs
- [ ] Meaningful image descriptions for alt text, or approval to write them

A consistent `4:5` ratio such as `1600 x 2000` is recommended. High-quality JPG, PNG, AVIF, or WebP source images are acceptable; avoid screenshots and heavily compressed social-media downloads.

### Required product data

- [ ] Unique product ID
- [ ] URL slug
- [ ] Product name
- [ ] Price in IDR
- [ ] Short description for cards and metadata
- [ ] Full product description
- [ ] Category
- [ ] Materials/fabric information
- [ ] Care instructions
- [ ] Size guide or garment measurements
- [ ] List of colors
- [ ] Hex value for each color swatch
- [ ] List of sizes
- [ ] Every valid color/size combination
- [ ] Unique SKU for every variation
- [ ] Availability for every variation
- [ ] Image mapping for every color
- [ ] Shopee product URL
- [ ] Variant-specific Shopee URL when available
- [ ] New, Featured, Bestseller, or Sold Out labels when applicable
- [ ] Whether the product is published
- [ ] Whether the product appears in featured homepage sections

### Required business and footer information

- [ ] WhatsApp number with country code
- [ ] Instagram profile URL
- [ ] TikTok profile URL
- [ ] Shopee store URL
- [ ] Customer-support email, if displayed
- [ ] Customer-support hours, if displayed
- [ ] Business location, if displayed
- [ ] Shipping information or shipping-policy URL
- [ ] Returns/exchanges information or policy URL
- [ ] Privacy-policy content or URL
- [ ] Final domain name when available

### Required homepage decisions

- [ ] Announcement-bar message, if used
- [ ] Navigation categories
- [ ] Homepage product sections and their order
- [ ] Products included in New Arrivals
- [ ] Products included in Featured or Best Sellers
- [ ] Preferred product-card image behavior
- [ ] Footer text and link order

### Optional launch content

- [ ] About Loomyna copy
- [ ] Contact page content
- [ ] Size-guide page content
- [ ] Shipping page content
- [ ] Returns/exchanges page content
- [ ] Privacy policy
- [ ] Social-sharing image
- [ ] Instagram or campaign photography

## 14. Minimum content needed to begin implementation

Implementation can begin with placeholders, but the minimum real-content package for a representative first version is:

- Loomyna logo
- Initial colors or permission to select a temporary palette
- WhatsApp, Instagram, TikTok, and Shopee links
- At least one desktop and one mobile banner image
- Four to eight products
- For every initial product: name, price, main images, colors, sizes, availability, and Shopee URL

## 15. Implementation phases

### Phase 1: Foundation

- Create Next.js/TypeScript/Tailwind project
- Define design tokens and responsive layout
- Add header, mobile navigation, announcement bar, and footer
- Define TypeScript product and banner models
- Add build-time content validation

### Phase 2: Catalogue UI

- Build hero carousel
- Build reusable product card and product sections
- Build dynamic product-detail route
- Build image gallery and variation-selection behavior
- Add responsive and accessibility behavior

### Phase 3: Checkout and analytics

- Build WhatsApp message generator
- Add Shopee checkout link and selection reminder
- Install Vercel Web Analytics
- Add paid-plan custom events only if enabled

### Phase 4: Quality and launch

- Add metadata, sitemap, robots, and structured data
- Validate product data and broken image paths
- Test responsive layouts and real devices
- Test keyboard and reduced-motion behavior
- Run Lighthouse and production-build checks
- Connect the domain and deploy to Vercel

## 16. First-release acceptance criteria

- The landing page and product pages work at mobile, tablet, and desktop widths.
- Hero banners use appropriate desktop and mobile images.
- Product cards show image, name, price, and available colors.
- Every published product has a working detail URL.
- Product images change correctly when a color is selected.
- Invalid color/size combinations cannot be selected.
- WhatsApp checkout includes the chosen product, color, size, quantity, price, and URL.
- Shopee checkout opens the correct product listing.
- Footer social and marketplace links work.
- Vercel Analytics records product-page views.
- Product data is maintained from the TypeScript catalogue rather than duplicated in page components.
- A production build succeeds with no invalid product records or missing required content.
- The website is keyboard accessible and respects reduced-motion preferences.
- The design is inspired by the reference site's structure but uses original Loomyna branding and content.
