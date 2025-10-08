"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log to your observability tool here if desired
    // console.error(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen grid place-items-center bg-black text-white p-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-400 mb-6">An unexpected error occurred. Please try again.</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

