import { Suspense } from "react";
import ScraperApp from "../components/ScraperApp";

function ScraperAppFallback() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[var(--color-gray-200)] border-t-[var(--color-primary)] rounded-full animate-spin" />
    </main>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={<ScraperAppFallback />}>
      <ScraperApp />
    </Suspense>
  );
}
