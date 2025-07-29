import React from 'react';

export const Logo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <g transform="matrix(1 0 0 -1 0 100)">
        <path d="M20,10 L20,90 L40,90 L40,55 L60,55 L60,90 L80,90 L80,10 L60,10 L60,45 L40,45 L40,10 L20,10 Z M30,20 L30,35 L50,35 L50,20 L30,20 Z M70,55 L70,80 L50,80 L50,65 L70,65 L70,55 Z" />
    </g>
  </svg>
);
    