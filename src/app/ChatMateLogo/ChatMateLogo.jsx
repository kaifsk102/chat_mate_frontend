export default function ChatMateLogo({ width = 220, height = 80 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 80"
      width={width}
      height={height}
    >
      <defs>
        <linearGradient id="chatMateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      <rect x="10" y="15" width="50" height="40" rx="10" fill="url(#chatMateGradient)" />
      <path d="M50 55 l-10 10 v-10z" fill="url(#chatMateGradient)" />
      <circle cx="35" cy="30" r="7" fill="#FFFFFF" />
      <path
        d="M22 48 c0-8 26-8 26 0"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
      />

      <text
        x="75"
        y="52"
        fontFamily="Arial, sans-serif"
        fontSize="34"
        fontWeight="bold"
        fill="#333"
      >
        Chat
        <tspan fill="url(#chatMateGradient)">Mate</tspan>
      </text>
    </svg>
  );
}
