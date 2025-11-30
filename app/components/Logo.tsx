import Link from "next/link";

interface LogoProps {
  href?: string;
}

export default function Logo({ href = "/" }: LogoProps) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <div className="w-9 h-9 bg-[var(--color-primary)] border-2 border-[var(--color-dark)] rounded-lg flex items-center justify-center shadow-[var(--shadow-sm)]">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </div>
      <span className="hidden sm:block text-xl font-bold text-[var(--color-dark)]">
        Scrape Style
      </span>
    </Link>
  );
}

