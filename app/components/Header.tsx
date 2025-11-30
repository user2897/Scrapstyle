import { Suspense } from "react";
import Logo from "./Logo";
import GitHubButton, { GitHubButtonFallback } from "./GitHubButton";
import SupportButton from "./SupportButton";

export default function Header() {
  return (
      <header className="w-full py-5 px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Logo />
            <div className="flex items-center gap-3">
          <SupportButton />
          <Suspense fallback={<GitHubButtonFallback />}>
            <GitHubButton />
          </Suspense>
        </div>
        </div>
      </header>
  );
}
