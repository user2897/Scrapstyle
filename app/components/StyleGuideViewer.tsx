"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { copyToClipboard } from "@/app/lib/clipboard";
import { downloadFile } from "@/app/lib/download";

interface StyleGuideViewerProps {
  content: string;
}

export default function StyleGuideViewer({ content }: StyleGuideViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => 
    downloadFile(content, "style-guide.md", "text/markdown");

  return (
    <div className="bg-white border-2 border-[var(--color-dark)] rounded-xl shadow-[var(--shadow-md)] overflow-hidden animate-fade-in">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b-2 border-[var(--color-dark)] bg-[var(--color-gray-100)]">
        <h2 className="font-bold text-[var(--color-dark)] text-center sm:text-left">
          Design System
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-none px-3 py-2 sm:py-1.5 bg-white text-[var(--color-dark)] font-medium border-2 border-[var(--color-dark)] rounded-lg shadow-[-2px_2px_0px_0px_#383838] hover:shadow-[-3px_3px_0px_0px_#383838] hover:translate-x-[1px] hover:translate-y-[-1px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-sm"
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 sm:flex-none px-3 py-2 sm:py-1.5 bg-[var(--color-primary)] text-white font-medium border-2 border-[var(--color-dark)] rounded-lg shadow-[-2px_2px_0px_0px_#383838] hover:shadow-[-3px_3px_0px_0px_#383838] hover:translate-x-[1px] hover:translate-y-[-1px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download</span>
          </button>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <div className="markdown-content max-w-none overflow-x-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

