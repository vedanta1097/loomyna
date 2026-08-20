# Loomyna storefront

A responsive, data-driven catalogue built with Next.js, TypeScript, Tailwind CSS, Embla Carousel, and Vercel Analytics.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content updates

- Products: `src/data/products.ts`
- Homepage sections and banners: `src/config/home.ts`
- Store settings: `src/config/site.ts`
- Public images: `public/assets`

Run `npm run check` before deployment. The production build validates unique product IDs, slugs and SKUs, variation image mappings, homepage references, and required asset files.

Set `NEXT_PUBLIC_SITE_URL` in Vercel if the production domain differs from `https://loomyna.id`.
