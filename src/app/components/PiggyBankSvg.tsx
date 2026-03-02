export function PiggyBankSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width="100%"
      height="100%"
      className={className}
    >
      {/* No defs/gradients — flat colors only */}

      <rect x="130" y="100" width="40" height="25" rx="6" fill="#f08b54" stroke="#4a3b2c" strokeWidth="3" />
      <rect x="180" y="105" width="140" height="20" rx="8" fill="#4d58d1" stroke="#4a3b2c" strokeWidth="3" />
      <rect x="340" y="95" width="36" height="30" rx="4" fill="#2d36a3" stroke="#4a3b2c" strokeWidth="3" />
      <line x1="348" y1="95" x2="348" y2="125" stroke="#4a3b2c" strokeWidth="3" />
      <line x1="358" y1="95" x2="358" y2="125" stroke="#4a3b2c" strokeWidth="3" />
      <line x1="368" y1="95" x2="368" y2="125" stroke="#4a3b2c" strokeWidth="3" />

      <rect x="78" y="210" width="22" height="100" rx="10" fill="#b06aba" stroke="#4a3b2c" strokeWidth="3" />
      <rect x="400" y="210" width="22" height="100" rx="10" fill="#b06aba" stroke="#4a3b2c" strokeWidth="3" />

      <rect x="100" y="120" width="300" height="300" rx="20" fill="#e3c4a0" stroke="#4a3b2c" strokeWidth="3" />

      <g stroke="#d1ad84" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M 120 150 Q 180 140 250 160 T 380 145" />
        <path d="M 110 180 Q 140 190 170 175" />
        <path d="M 320 185 Q 360 170 390 190" />
        <path d="M 115 350 Q 150 340 180 360" />
        <path d="M 330 350 Q 360 370 385 345" />
        <path d="M 130 280 Q 150 270 160 290" />
        <path d="M 350 290 Q 370 300 380 280" />
      </g>

      <circle cx="175" cy="210" r="14" fill="#4a3b2c" />
      <circle cx="325" cy="210" r="14" fill="#4a3b2c" />

      <rect x="175" y="245" width="150" height="75" rx="37.5" fill="#e688cc" stroke="#4a3b2c" strokeWidth="3" />
      <circle cx="215" cy="282.5" r="9" fill="#9e4381" stroke="#4a3b2c" strokeWidth="2" />
      <circle cx="285" cy="282.5" r="9" fill="#9e4381" stroke="#4a3b2c" strokeWidth="2" />

      <g fill="#4a3b2c" stroke="none">
        <circle cx="250" cy="339" r="3.5" />
        <circle cx="241" cy="348" r="3.5" /><circle cx="259" cy="348" r="3.5" />
        <circle cx="232" cy="357" r="3.5" /><circle cx="250" cy="357" r="3.5" /><circle cx="268" cy="357" r="3.5" />
        <circle cx="223" cy="366" r="3.5" /><circle cx="241" cy="366" r="3.5" /><circle cx="259" cy="366" r="3.5" /><circle cx="277" cy="366" r="3.5" />
        <circle cx="214" cy="375" r="3.5" /><circle cx="232" cy="375" r="3.5" /><circle cx="250" cy="375" r="3.5" /><circle cx="268" cy="375" r="3.5" /><circle cx="286" cy="375" r="3.5" />
        <circle cx="223" cy="384" r="3.5" /><circle cx="241" cy="384" r="3.5" /><circle cx="259" cy="384" r="3.5" /><circle cx="277" cy="384" r="3.5" />
        <circle cx="232" cy="393" r="3.5" /><circle cx="250" cy="393" r="3.5" /><circle cx="268" cy="393" r="3.5" />
        <circle cx="241" cy="402" r="3.5" /><circle cx="259" cy="402" r="3.5" />
        <circle cx="250" cy="411" r="3.5" />
      </g>
    </svg>
  );
}