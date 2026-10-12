interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = "h-8 w-8" }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${className} text-accent`}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="12" fill="currentColor" />
      <path
        d="M8.5 12.4C11.8 9.1 15.3 9.1 18.6 12.4L23.7 17.5C26 19.8 26 23.3 23.7 25.6"
        stroke="white"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      <path
        d="M27.5 23.6C24.2 26.9 20.7 26.9 17.4 23.6L12.3 18.5C10 16.2 10 12.7 12.3 10.4"
        stroke="#F4A261"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
