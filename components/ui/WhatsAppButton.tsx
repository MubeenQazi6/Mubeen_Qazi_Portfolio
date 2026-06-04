"use client";

import { personal } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <a
      href={personal.whatsApp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110",
        "bg-gradient-to-tr from-green-600 to-green-400 text-white",
        "hover:shadow-green-500/20 hover:shadow-2xl"
      )}
    >
      {/* Pulse ring animation */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-25"></span>

      {/* WhatsApp SVG Icon */}
      <svg
        className="h-7 w-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.117.957 12.01.957c-5.439 0-9.862 4.371-9.866 9.8.001 1.96.512 3.878 1.483 5.58l-.979 3.57 3.666-.962zm10.842-7.11c-.329-.165-1.948-.959-2.247-1.069-.299-.11-.517-.165-.736.165-.219.33-.847 1.069-1.037 1.289-.19.22-.38.247-.709.082-1.157-.58-1.9-1.02-2.655-2.316-.2-.343-.07-.529.096-.694.149-.148.33-.385.494-.577.164-.192.219-.33.329-.55.11-.22.055-.412-.027-.577-.082-.165-.736-1.774-1.009-2.433-.267-.64-.539-.553-.736-.563-.19-.01-.409-.012-.628-.012-.219 0-.575.082-.876.412-.3.33-1.15 1.127-1.15 2.748 0 1.62 1.183 3.19 1.347 3.41.164.22 2.328 3.553 5.639 4.981.788.341 1.402.544 1.88.697.791.252 1.512.216 2.081.13.634-.096 1.948-.797 2.221-1.566.273-.769.273-1.43.19-1.565-.083-.134-.3-.22-.63-.385z" />
      </svg>

      {/* Tooltip on hover */}
      <span className="pointer-events-none absolute bottom-16 right-0 scale-0 rounded bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-md transition-all group-hover:scale-100 origin-bottom-right whitespace-nowrap opacity-0 md:group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}
