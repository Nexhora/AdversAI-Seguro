import * as React from 'react';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinejoin="round"
    strokeLinecap="round"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--destructive))', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M12 2L2 22h20L12 2z"
      stroke="url(#logoGradient)"
      strokeWidth="3"
    />
  </svg>
);
