export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const defaults = { size: 24, color: "currentColor", strokeWidth: 2 };

export function PiggyIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19 10c0-1-0.5-2-1.5-2.5C17 6 16 5 14 4.5c-1-.25-2-.25-3 0L9 5.5C7 6.5 5.5 8 5 10c-.5 2-.5 3.5 0 5 .5 1.5 1.5 2.5 3 3l1 2h2l.5-1.5c.5.1 1 .1 1.5 0L13.5 20h2l1-2c1.5-.5 2.5-1.5 3-3 .5-1.5.5-3 0-5z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="14.5" cy="9.5" r="1" fill={color}/>
      <path d="M5 11H3.5c-.5 0-1 .5-1 1v1c0 .5.5 1 1 1H5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 7.5L19.5 5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function WaveIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M7 12l1.5-8c.2-.8 1.3-1 1.8-.3L11 5l2-4c.3-.7 1.2-.7 1.5 0l1 3 1.5-2c.3-.5 1-.5 1.3 0L19 4v3c0 5-2 8-5 10H9c-2-1-3.5-3-4-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 17v4M14 17v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function LightbulbIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21h6M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 17h4v1.5a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5V17z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function HomeIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10L12 4l8 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 20v-6h6v6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function HistoryIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 7h8M8 11h8M8 15h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function FamilyIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="3" stroke={color} strokeWidth={strokeWidth}/>
      <circle cx="5" cy="9" r="2.5" stroke={color} strokeWidth={strokeWidth}/>
      <circle cx="19" cy="9" r="2.5" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M8 20v-2a4 4 0 0 1 8 0v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M2 20v-1.5a3 3 0 0 1 4.5-2.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M22 20v-1.5a3 3 0 0 0-4.5-2.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function GearIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function TrendUpIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17l5-5 4 4 9-9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 7h5v5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function TargetIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth}/>
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth={strokeWidth}/>
      <circle cx="12" cy="12" r="1.5" fill={color}/>
    </svg>
  );
}

export function BikeIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="16" r="3.5" stroke={color} strokeWidth={strokeWidth}/>
      <circle cx="18" cy="16" r="3.5" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M6 16l4-8h4l2 4h2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 8l4 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M10 8h3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function GamepadIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 11h4M8 9v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <circle cx="15" cy="10" r="1" fill={color}/>
      <circle cx="17" cy="12" r="1" fill={color}/>
      <path d="M4 13V9a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function FlameIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2c0 4-4 6-4 10a6 6 0 0 0 12 0c0-4-4-6-4-10-1 2-3 3-4 3s-3-1-4-3z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22a3 3 0 0 1-3-3c0-2 3-4 3-4s3 2 3 4a3 3 0 0 1-3 3z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CartIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h2l1.5 9h11L20 6H7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="18" r="1.5" stroke={color} strokeWidth={strokeWidth}/>
      <circle cx="16" cy="18" r="1.5" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M6.5 12h11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function CompassIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth}/>
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="1.2" fill={color}/>
    </svg>
  );
}

export function StarIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.8 3-1.1-6.5L.4 8.8l6.5-.9L12 2z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    </svg>
  );
}

export function MapPinIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
      <circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth={strokeWidth}/>
    </svg>
  );
}

export function HandshakeIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M7 11l-4 4 4 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 11l4 4-4 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 15h6l3-3 3 3h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 7h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <circle cx="9" cy="5" r="2" stroke={color} strokeWidth={strokeWidth}/>
      <circle cx="15" cy="5" r="2" stroke={color} strokeWidth={strokeWidth}/>
    </svg>
  );
}

export function SeedlingIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22V12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M12 12C12 8 8 4 4 4c0 4 4 8 8 8z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
      <path d="M12 15c0-3 3-6 6-6 0 3-3 6-6 6z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    </svg>
  );
}

export function ChevronLeftIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18l-6-6 6-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function WifiIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="20" r="1" fill={color}/>
    </svg>
  );
}

export function BatteryIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="18" height="10" rx="2" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M22 11v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <rect x="5" y="10" width="8" height="4" rx="1" fill={color} opacity="0.4"/>
    </svg>
  );
}

export function SmartphoneIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="2" width="14" height="20" rx="3" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M10 18h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function VolumeIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5L6 9H2v6h4l5 4V5z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ShieldCheckIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l7 4v5c0 5.25-3.5 8.5-7 10-3.5-1.5-7-4.75-7-10V6l7-4z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function DatabaseIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="5" rx="8" ry="3" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke={color} strokeWidth={strokeWidth}/>
    </svg>
  );
}

export function EditIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function LinkIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CheckCircleIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M9 12l2 2 4-4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CoinIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M12 7v10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M15 9.5c0-1.38-1.34-2.5-3-2.5s-3 1.12-3 2.5 1.34 2.5 3 2.5 3 1.12 3 2.5-1.34 2.5-3 2.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function MedalIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="9" r="6" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function BookIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function GiftIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="8" width="18" height="4" rx="1" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M12 8v13" stroke={color} strokeWidth={strokeWidth}/>
      <rect x="5" y="12" width="14" height="9" rx="1" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M12 8c-1.5-2-4-3-4-3s1-3 4-3 4 3 4 3-2.5 1-4 3z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    </svg>
  );
}

export function ChildIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function ClipboardIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="12" height="17" rx="2" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M9 2h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V2z" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M9 12h6M9 16h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function LemonIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5 6.5C20 9 20 14 17 17S9 20 6.5 17.5 4 9 7 7s7.5-3.5 10.5-.5z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    </svg>
  );
}

export function HeartHandIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 7c-1.5-2.5-5-3-6.5-1S4 11 12 17c8-6 8.5-8.5 7-10.5S13.5 4.5 12 7z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SparklesIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
      <path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    </svg>
  );
}

export function TreeIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22V12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M5 12l7-10 7 10H5z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
      <path d="M7 16l5-7 5 7H7z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    </svg>
  );
}

export function MusicNoteIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18V5l12-2v13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="18" r="3" stroke={color} strokeWidth={strokeWidth}/>
      <circle cx="18" cy="16" r="3" stroke={color} strokeWidth={strokeWidth}/>
    </svg>
  );
}

export function ClockIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M12 7v5l3 3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function RocketIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2c3 4 4 8 4 12l-4 4-4-4c0-4 1-8 4-12z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
      <circle cx="12" cy="11" r="2" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M5 18l3-3M19 18l-3-3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function PuzzleIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9h-1a2 2 0 0 1 0-4h1V3h-6v1a2 2 0 0 1-4 0V3H3v6h1a2 2 0 0 1 0 4H3v6h6v-1a2 2 0 0 1 4 0v1h6v-6h-1a2 2 0 0 1 0-4h1V9z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    </svg>
  );
}

export function BellIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}