"use client";

import { useState, useEffect } from "react";

const LOADING_MESSAGES = [
  "Scraping HTML and CSS",
  "Extracting color palette",
  "Analyzing typography",
  "Finding spacing patterns",
  "Detecting components",
  "Generating style guide",
];

export default function DesignSystemLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border-2 border-[var(--color-dark)] rounded-lg shadow-[var(--shadow-md)] p-12 text-center animate-fade-in min-h-[280px] flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div 
          className="w-8 h-8 bg-[#007aff] border-2 border-[var(--color-dark)]"
          style={{ 
            boxShadow: '-3px 3px 0px 0px #383838',
            animation: 'loadingBounce 1.4s ease-in-out infinite',
          }}
        />
        <div 
          className="w-8 h-8 bg-[#FFDE00] border-2 border-[var(--color-dark)]"
          style={{ 
            boxShadow: '-3px 3px 0px 0px #383838',
            animation: 'loadingBounce 1.4s ease-in-out infinite',
            animationDelay: '0.2s'
          }}
        />
        <div 
          className="w-8 h-8 bg-[#53DBC9] border-2 border-[var(--color-dark)]"
          style={{ 
            boxShadow: '-3px 3px 0px 0px #383838',
            animation: 'loadingBounce 1.4s ease-in-out infinite',
            animationDelay: '0.4s'
          }}
        />
        <div 
          className="w-8 h-8 bg-[#FF7169] border-2 border-[var(--color-dark)]"
          style={{ 
            boxShadow: '-3px 3px 0px 0px #383838',
            animation: 'loadingBounce 1.4s ease-in-out infinite',
            animationDelay: '0.6s'
          }}
        />
      </div>
      
      <h3 className="text-xl font-bold text-[var(--color-dark)] mb-2">
        {LOADING_MESSAGES[messageIndex]}...
      </h3>
      <p className="text-[var(--color-gray-500)] text-sm">
        This usually takes 10-20 seconds
      </p>
    </div>
  );
}
