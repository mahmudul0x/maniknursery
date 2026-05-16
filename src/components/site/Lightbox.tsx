import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const open = index !== null;

  useEffect(() => { if (open) setZoom(1); }, [index, open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index! + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index! - 1 + images.length) % images.length);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.25));
      if (e.key === "-") setZoom((z) => Math.max(1, z - 0.25));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, index, images.length, onClose, onIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-primary-deep/95 backdrop-blur-md flex items-center justify-center"
          onClick={onClose}
        >
          <button onClick={onClose} className="absolute top-6 right-6 h-11 w-11 rounded-full glass-dark text-primary-foreground flex items-center justify-center hover:scale-110 transition z-10" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <div className="absolute top-6 left-6 flex gap-2 z-10">
            <button onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(1, z - 0.25)); }} className="h-11 w-11 rounded-full glass-dark text-primary-foreground flex items-center justify-center hover:scale-110 transition" aria-label="Zoom out">
              <ZoomOut className="h-5 w-5" />
            </button>
            <div className="h-11 px-4 rounded-full glass-dark text-primary-foreground flex items-center text-sm font-semibold">{Math.round(zoom * 100)}%</div>
            <button onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(3, z + 0.25)); }} className="h-11 w-11 rounded-full glass-dark text-primary-foreground flex items-center justify-center hover:scale-110 transition" aria-label="Zoom in">
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

          <button onClick={(e) => { e.stopPropagation(); onIndex((index! - 1 + images.length) % images.length); }} className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full glass-dark text-primary-foreground flex items-center justify-center hover:scale-110 transition z-10" aria-label="Previous">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onIndex((index! + 1) % images.length); }} className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full glass-dark text-primary-foreground flex items-center justify-center hover:scale-110 transition z-10" aria-label="Next">
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.img
            key={index}
            src={images[index!]}
            alt=""
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: zoom }}
            transition={{ scale: { duration: 0.25 }, opacity: { duration: 0.25 } }}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-elegant cursor-zoom-in"
            onClick={(e) => { e.stopPropagation(); setZoom((z) => (z >= 2.5 ? 1 : z + 0.5)); }}
            style={{ transformOrigin: "center" }}
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 max-w-[90vw] overflow-x-auto px-4 py-2 rounded-2xl glass-dark">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); onIndex(i); }}
                className={`h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${i === index ? "border-leaf scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
