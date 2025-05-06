import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
};

const ImageCarousel = ({ images }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const getPromptFromFilename = (filename: string) => {
    return filename
      .replace(/^DALL·E\s\d{4}-\d{2}-\d{2}\s\d{2}\.\d{2}\.\d{2}\s-\s/, "")
      .replace(/\.(jpg|jpeg|png)$/, "");
  };

  // Restart autoplay timeout
  const restartAutoplay = useCallback(() => {
    if (!isPlaying || !emblaApi) return;
    if (autoplayRef.current) clearTimeout(autoplayRef.current);

    autoplayRef.current = setTimeout(() => {
      emblaApi.scrollNext();
      restartAutoplay();
    }, 10000);
  }, [emblaApi, isPlaying]);

  // Keyboard nav
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    restartAutoplay();
  }, [emblaApi, restartAutoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    restartAutoplay();
  }, [emblaApi, restartAutoplay]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scrollNext();
      if (e.key === "ArrowLeft") scrollPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scrollNext, scrollPrev]);

  //  Start autoplay
  useEffect(() => {
    if (!isPlaying || !emblaApi) return;
    restartAutoplay();
    return () => clearTimeout(autoplayRef.current as NodeJS.Timeout);
  }, [isPlaying, emblaApi, restartAutoplay]);

  // Track current slide
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect(); // Initialize
  }, [emblaApi]);

  return (
    <div className="w-full flex flex-col items-center relative">
      <div
        className="overflow-hidden max-w-[700px] w-full rounded shadow group relative"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((filename, i) => (
            <div className="flex-[0_0_100%] min-w-0" key={i}>
              <Image
                src={`/gallery/${filename}`}
                alt={getPromptFromFilename(filename)}
                width={800}
                height={800}
                className="w-full h-auto object-cover"
                loading="eager"
                priority={i === 0}
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
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-grey bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>

        {/* Play/Pause toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-2 left-2 bg-grey bg-opacity-600 p-2 rounded-full text-white hover:bg-opacity-80 transition"
          aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-400 italic max-w-lg px-4">
        {getPromptFromFilename(images[selectedIndex])}
      </p>
    </div>
  );
};

export default ImageCarousel;
