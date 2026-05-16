import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/8801799116889"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-leaf animate-ping opacity-30" />
      <span className="relative flex items-center gap-2 rounded-full bg-leaf text-primary-deep px-4 py-3 shadow-glow font-semibold text-sm hover:scale-105 transition-transform">
        <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
        <span className="hidden sm:inline">WhatsApp</span>
      </span>
    </a>
  );
}
