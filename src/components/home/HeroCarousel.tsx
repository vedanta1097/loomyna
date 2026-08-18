"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { HeroSlide } from "@/types/product";

export function HeroCarousel({
  labels,
  slides,
}: {
  labels: Dictionary["home"];
  slides: HeroSlide[];
}) {
  const isMobile = useMobileHeroLayout();
  const visibleSlides = isMobile ? slides : slides.filter((slide) => !slide.mobileOnly);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: visibleSlides.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.reInit({ loop: visibleSlides.length > 1 });
  }, [emblaApi, visibleSlides.length]);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label={labels.campaignLabel}>
      <div className="hero-viewport" ref={emblaRef}>
        <div className="hero-container">
          {visibleSlides.map((slide, index) => {
            const desktopSrcSet = slide.desktopImage
              ? getImageProps({
                  src: slide.desktopImage.src,
                  alt: slide.imageAlt,
                  width: slide.desktopImage.width,
                  height: slide.desktopImage.height,
                  sizes: "100vw",
                }).props.srcSet
              : undefined;
            const {
              props: { srcSet: mobileSrcSet, ...mobileImageProps },
            } = getImageProps({
              src: slide.mobileImage.src,
              alt: slide.imageAlt,
              width: slide.mobileImage.width,
              height: slide.mobileImage.height,
              sizes: "100vw",
              fetchPriority: index === 0 ? "high" : undefined,
              loading: index === 0 ? "eager" : "lazy",
            });

            return (
              <div
                className="hero-slide"
                key={slide.id}
                role="group"
                aria-roledescription={labels.slide}
                aria-label={`${index + 1} ${labels.of} ${visibleSlides.length}`}
              >
                <picture>
                  {desktopSrcSet ? <source media="(min-width: 700px)" srcSet={desktopSrcSet} /> : null}
                  <img {...mobileImageProps} alt={slide.imageAlt} srcSet={mobileSrcSet} />
                </picture>
                {slide.ctaLabel && slide.ctaHref ? (
                  <Link className="button hero-cta" href={slide.ctaHref}>
                    {slide.ctaLabel}
                    <ArrowIcon />
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      {visibleSlides.length > 1 ? (
        <div className="hero-controls">
          <button type="button" onClick={() => emblaApi?.scrollPrev()} aria-label={labels.previousSlide}>
            <ArrowIcon direction="left" />
          </button>
          <div className="hero-dots">
            {visibleSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                className={selectedIndex === index ? "active" : ""}
                aria-label={`${labels.goToSlide} ${index + 1}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
          <button type="button" onClick={() => emblaApi?.scrollNext()} aria-label={labels.nextSlide}>
            <ArrowIcon />
          </button>
        </div>
      ) : null}
    </section>
  );
}

function useMobileHeroLayout() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia("(max-width: 699px)");
      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(max-width: 699px)").matches,
    () => false,
  );
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg className={direction === "left" ? "flip" : ""} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
