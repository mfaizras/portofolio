import React, { useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

export default function LogoMarquee({ logos = [] }) {
  // Duplikasi list biar loop terasa seamless (tanpa jeda kosong)
  const doubled = useMemo(() => [...logos, ...logos], [logos]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [
      AutoScroll({
        speed: 1.2,            
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ]
  );

  return (
    <div className="relative">
      {/* fade kiri/kanan biar kelihatan modern */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16" />

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex items-center gap-10">
          {doubled.map((item, idx) => (
            <div
              key={`${item.alt}-${idx}`}
              className="flex-[0_0_auto] opacity-80 hover:opacity-100 transition"
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`h-15 w-auto grayscale hover:grayscale-0 transition ${item.className}`}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
