"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getUserConfig, clearUserConfig, setUserConfig } from "@/app/lib/storage";
import { scrapeUrl, cleanMarkdown, type ScrapeError } from "@/app/lib/api";
import type { AIProvider } from "@/app/lib/constants";
import DesignSystemLoader from "./DesignSystemLoader";
import EmptyState from "./EmptyState";
import StyleGuideViewer from "./StyleGuideViewer";
import ApiKeyModal from "./api-key-modal";
import SettingsModal from "./settings-modal";
import SettingsButton from "./SettingsButton";

export default function ScraperApp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialUrl = searchParams.get("url") || "";

  const [url, setUrl] = useState(initialUrl);
  const [config, setConfig] = useState(() => getUserConfig());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [styleGuide, setStyleGuide] = useState("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [lastAttemptedUrl, setLastAttemptedUrl] = useState<string | null>(null);

  const processUrl = useCallback(async (targetUrl: string, currentConfig = config) => {
    setLoading(true);
    setError("");
    setShowRetryButton(false);
    setLastAttemptedUrl(targetUrl);

    try {
      const data = await scrapeUrl({
        url: targetUrl,
        apiKey: currentConfig.apiKey,
        provider: currentConfig.provider,
        model: currentConfig.model,
      });
      setStyleGuide(cleanMarkdown(data.styleGuide));
    } catch (err) {
      const error = err as ScrapeError;

      // Handle authentication errors - clear config and show API key modal
      if (error.status === 401) {
        clearUserConfig();
        setConfig(getUserConfig());
        setError(error.message || "Invalid API key. Please enter a valid key for the selected provider.");
        setShowApiKeyModal(true);
        setPendingUrl(targetUrl);
        return;
      }

      // Handle quota/rate limit errors - show retry button and settings option
      if (error.status === 429 || error.status === 402) {
        setError(error.message || "API quota exceeded. Please try again later or switch provider.");
        setShowRetryButton(true);
        return;
      }

      setError(error.message || "Something went wrong");
      setShowRetryButton(true);
    } finally {
      setLoading(false);
    }
  }, [config]);

  const handleRetry = useCallback(() => {
    if (lastAttemptedUrl) {
      processUrl(lastAttemptedUrl, config);
    }
  }, [lastAttemptedUrl, processUrl, config]);

  const handleProcessRequest = useCallback(
    (targetUrl: string) => {
      if (!config.apiKey) {
        setPendingUrl(targetUrl);
        setShowApiKeyModal(true);
        return;
      }

      processUrl(targetUrl, config);
    },
    [processUrl, config]
  );

  useEffect(() => {
    if (initialUrl) {
      handleProcessRequest(initialUrl);
    }
  }, [initialUrl, handleProcessRequest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError("Please enter a URL");
      return;
    }

    router.push(`/app?url=${encodeURIComponent(trimmedUrl)}`, { scroll: false });
    handleProcessRequest(trimmedUrl);
  };

  const handleApiKeySubmit = (next: { provider: AIProvider; apiKey: string; model?: string }) => {
    const saved = setUserConfig(next);
    setConfig(saved);
    setShowApiKeyModal(false);
    if (pendingUrl) {
      processUrl(pendingUrl, saved);
      setPendingUrl(null);
    }
  };

  const handleModalClose = () => {
    setShowApiKeyModal(false);
    setPendingUrl(null);
  };

  const handleSettingsReset = () => {
    clearUserConfig();
    setConfig(getUserConfig());
    setStyleGuide("");
  };

  const handleOpenSettings = () => {
    setShowSettingsModal(true);
  };

  return (
    <>
      <main className="flex-1 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <UrlForm
            url={url}
            loading={loading}
            onUrlChange={(value) => {
              setUrl(value);
              setError("");
              setShowRetryButton(false);
            }}
            onSubmit={handleSubmit}
          />

          {error && (
            <ErrorMessage
              message={error}
              onRetry={showRetryButton ? handleRetry : undefined}
              onOpenSettings={showRetryButton ? handleOpenSettings : undefined}
            />
          )}
          {loading && <DesignSystemLoader />}
          {styleGuide && !loading && <StyleGuideViewer content={styleGuide} />}
          {!styleGuide && !loading && !error && <EmptyState />}
        </div>
      </main>

      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={handleModalClose}
        onSubmit={handleApiKeySubmit}
        initialProvider={config.provider}
        initialApiKey={config.apiKey}
        initialModel={config.model}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        config={config}
        onReset={handleSettingsReset}
      />

      {config.apiKey && (
        <SettingsButton onClick={() => setShowSettingsModal(true)} />
      )}
    </>
  );
}

interface UrlFormProps {
  url: string;
  loading: boolean;
  onUrlChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function UrlForm({ url, loading, onUrlChange, onSubmit }: UrlFormProps) {
  return (
    <form onSubmit={onSubmit} className="w-full mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 px-4 py-2.5 text-sm bg-white border-2 border-[var(--color-dark)] rounded-lg focus:outline-none placeholder:text-[var(--color-gray-500)] shadow-[var(--shadow-sm)]"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-5 py-2.5 bg-[var(--color-primary)] text-white font-medium text-sm border-2 border-[var(--color-dark)] rounded-lg shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-x-[1px] hover:translate-y-[-1px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
        >
          {loading ? "Analyzing..." : "Get Design System"}
        </button>
      </div>
    </form>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onOpenSettings?: () => void;
}

function ErrorMessage({ message, onRetry, onOpenSettings }: ErrorMessageProps) {
  return (
    <div className="mb-6 p-4 border-2 rounded-lg text-sm animate-fade-in bg-[#ffd8d3] border-[var(--color-accent-red)] text-[#78191b]">
      <p>{message}</p>
      {(onRetry || onOpenSettings) && (
        <div className="flex gap-3 mt-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-white text-[#78191b] font-medium text-sm border-2 border-[var(--color-dark)] rounded-lg shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-x-[1px] hover:translate-y-[-1px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all cursor-pointer"
            >
              Try Again
            </button>
          )}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-4 py-2 bg-white text-[var(--color-dark)] font-medium text-sm border-2 border-[var(--color-dark)] rounded-lg shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-x-[1px] hover:translate-y-[-1px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all cursor-pointer"
            >
              Settings
            </button>
          )}
        </div>
      )}
    </div>
  );
}
