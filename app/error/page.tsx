import Link from "next/link";

export default function ErrorPage() {
  return (
      <main className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="max-w-md w-full text-center">
          <div className="bg-white border-2 border-[var(--color-dark)] rounded-xl shadow-[var(--shadow-lg)] p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-[#ffd8d3] border-2 border-[var(--color-accent-red)] rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-[var(--color-accent-red)]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-[var(--color-dark)] mb-3">
              Something went wrong
            </h1>
            <p className="text-[var(--color-gray-600)] mb-6">
            We encountered an unexpected error. Please try again or contact
            support if the problem persists.
            </p>

            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white font-semibold text-sm border-2 border-[var(--color-dark)] rounded-lg shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-x-[2px] hover:translate-y-[-2px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
  );
}
