import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
};

const GradientGallery = ({ images }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Track current slide
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scrollNext();
      if (e.key === "ArrowLeft") scrollPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scrollNext, scrollPrev]);

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="overflow-hidden max-w-[400px] w-full rounded shadow group relative"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((filename, i) => (
            <div className="flex-[0_0_100%] min-w-0" key={i}>
              <Image
                src={`/gallery/gradients/${filename}`}
                alt={`Gradient example ${i + 1}`}
                width={400}
                height={400}
                className="w-full h-auto object-cover rounded"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-grey bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          aria-label="Previous"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-grey bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          aria-label="Next"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="flex gap-2 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === selectedIndex ? 'bg-gray-300' : 'bg-gray-600'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GradientGallery; 