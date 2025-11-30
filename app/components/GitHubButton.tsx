import { getGitHubStars } from "@/app/lib/github";
import { formatNumber } from "@/app/lib/format";
import { siteConfig } from "@/app/config/site";

export default async function GitHubButton() {
  const stars = await getGitHubStars();

  return (
    <a
      href={siteConfig.github.url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-gloss px-5 py-2.5 bg-[var(--color-accent-yellow)] text-[var(--color-dark)] font-semibold text-sm border-2 border-[var(--color-dark)] rounded-lg shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-x-[2px] hover:translate-y-[-2px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
        />
      </svg>
      <span>Star on GitHub</span>
      <span className="w-px h-4 bg-[var(--color-dark)] opacity-30" />
      <span className="flex items-center gap-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        {formatNumber(stars ?? 0)}
      </span>
    </a>
  );
}

export function GitHubButtonFallback() {
  return (
    <div className="px-5 py-2.5 bg-[var(--color-accent-yellow)] border-2 border-[var(--color-dark)] rounded-lg shadow-[var(--shadow-sm)] flex items-center gap-2 animate-pulse">
      <div className="w-5 h-5 bg-[var(--color-dark)] opacity-20 rounded" />
      <div className="w-24 h-4 bg-[var(--color-dark)] opacity-20 rounded" />
    </div>
  );
}
