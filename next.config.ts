import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "no-referrer" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "browsing-topics=()",
      "accelerometer=()",
      "autoplay=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "payment=()",
    ].join(", "),
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      // Allow embedding Browserbase viewer and other HTTPS frames
      "frame-src 'self' https:",
      "img-src 'self' blob: data:",
      "font-src 'self' data:",
      // Allow inline styles for Tailwind and Next styles injection
      "style-src 'self' 'unsafe-inline'",
      // Allow needed scripts; keep https to support third-party analytics if configured
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
      // Allow HTTPS and WebSocket connections to APIs and Browserbase
      "connect-src 'self' https: wss: https://api.openai.com https://api.browserbase.com https://*.posthog.com https://vitals.vercel-insights.com https://*.vercel-insights.com wss://*.browserbase.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
