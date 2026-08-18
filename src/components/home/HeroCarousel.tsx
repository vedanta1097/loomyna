"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { HeroSlide } from "@/types/product";

export function HeroCarousel({
  labels,
  slides,
}: {
  labels: Dictionary["home"];
  slides: HeroSlide[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: slides.length > 1 });
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

  return (
    <section className="hero" aria-roledescription="carousel" aria-label={labels.campaignLabel}>
      <div className="hero-viewport" ref={emblaRef}>
        <div className="hero-container">
          {slides.map((slide, index) => (
            <div
              className="hero-slide"
              key={slide.id}
              role="group"
              aria-roledescription={labels.slide}
              aria-label={`${index + 1} ${labels.of} ${slides.length}`}
            >
              <picture>
                <source media="(max-width: 699px)" srcSet={slide.mobileImage} />
                <Image
                  src={slide.desktopImage}
                  alt={slide.imageAlt}
                  fill
                  preload={index === 0}
                  sizes="100vw"
                />
              </picture>
              {slide.ctaLabel && slide.ctaHref ? (
                <Link className="button hero-cta" href={slide.ctaHref}>
                  {slide.ctaLabel}
                  <ArrowIcon />
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 ? (
        <div className="hero-controls">
          <button type="button" onClick={() => emblaApi?.scrollPrev()} aria-label={labels.previousSlide}>
            <ArrowIcon direction="left" />
          </button>
          <div className="hero-dots">
            {slides.map((slide, index) => (
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

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg className={direction === "left" ? "flip" : ""} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
