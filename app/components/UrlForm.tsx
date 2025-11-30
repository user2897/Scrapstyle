"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UrlForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    router.push(`/app?url=${encodeURIComponent(url.trim())}`);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl mx-auto opacity-0"
      style={{
        animation: 'slideUp 0.6s ease forwards',
        animationDelay: '0.7s'
      }}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-5 py-4 text-base bg-white border-2 border-[var(--color-dark)] rounded-lg focus:outline-none placeholder:text-[var(--color-gray-500)] shadow-[var(--shadow-sm)]"
          />
        </div>
        <button
          type="submit"
          className="px-7 py-4 bg-[var(--color-primary)] text-white font-semibold text-base border-2 border-[var(--color-dark)] rounded-lg shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-x-[2px] hover:translate-y-[-2px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap"
        >
          Get Design System
        </button>
      </div>
    </form>
  );
}
