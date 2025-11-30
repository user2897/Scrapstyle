import { siteConfig } from "@/app/config/site";

export async function getGitHubStars(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${siteConfig.github.repo}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

