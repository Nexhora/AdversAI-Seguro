import * as React from 'react';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--destructive))', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M12 2L2.5 20.5a1 1 0 00.866 1.5H20.634a1 1 0 00.866-1.5L12 2z"
      fill="url(#logoGradient)"
      stroke="none"
    />
  </svg>
);
