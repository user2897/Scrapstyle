export default function EmptyState() {
  return (
    <div className="bg-white border-2 border-[var(--color-dark)] rounded-xl shadow-[var(--shadow-md)] p-8 md:p-12 animate-fade-in min-h-[280px] flex items-center justify-center relative overflow-hidden">
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-[var(--color-accent-yellow)] border-2 border-[var(--color-dark)]" style={{ boxShadow: '-2px 2px 0px 0px #383838' }} />
      <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[var(--color-primary)] border-2 border-[var(--color-dark)]" style={{ boxShadow: '-2px 2px 0px 0px #383838' }} />
      <div className="absolute top-6 -right-2 w-5 h-5 bg-[var(--color-accent-teal)] border-2 border-[var(--color-dark)]" />
      
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="relative flex-shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-12 h-12 bg-[var(--color-primary)] border-2 border-[var(--color-dark)] rounded-lg flex items-center justify-center shadow-[-3px_3px_0px_0px_#383838]">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
              </svg>
            </div>
            <div className="w-12 h-12 bg-[var(--color-accent-yellow)] border-2 border-[var(--color-dark)] rounded-lg flex items-center justify-center shadow-[-3px_3px_0px_0px_#383838]">
              <span className="text-lg font-bold text-[var(--color-dark)]">Aa</span>
            </div>
            <div className="w-12 h-12 bg-[var(--color-accent-teal)] border-2 border-[var(--color-dark)] rounded-lg flex items-center justify-center shadow-[-3px_3px_0px_0px_#383838]">
              <svg className="w-6 h-6 text-[var(--color-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-[var(--color-accent-red)] border-2 border-[var(--color-dark)] rounded-lg flex items-center justify-center shadow-[-3px_3px_0px_0px_#383838]">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-dark)] mb-3">
            Extract any design system
          </h3>
          <p className="text-[var(--color-gray-600)] max-w-sm mb-4">
            Paste a URL above to instantly extract colors, typography, spacing, and components.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
            <span className="px-3 py-1.5 bg-[var(--color-gray-100)] border-2 border-[var(--color-dark)] rounded-full font-medium text-[var(--color-dark)]">
              🎨 Colors
            </span>
            <span className="px-3 py-1.5 bg-[var(--color-gray-100)] border-2 border-[var(--color-dark)] rounded-full font-medium text-[var(--color-dark)]">
              ✏️ Typography
            </span>
            <span className="px-3 py-1.5 bg-[var(--color-gray-100)] border-2 border-[var(--color-dark)] rounded-full font-medium text-[var(--color-dark)]">
              📐 Spacing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

