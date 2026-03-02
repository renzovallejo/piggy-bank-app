/**
 * ALCANCIA INTELIGENTE — DESIGN TOKENS (TypeScript)
 *
 * Single source of truth for neumorphic constants, palette, and shadows.
 * Every component must import from here instead of declaring its own
 * `bg`, `shadowOut`, etc.
 *
 * CSS custom properties live in /src/styles/theme.css.
 * This file mirrors the most-used values as JS constants so components
 * can use them in inline `style={}` props.
 */

/* ── Surface ── */
export const bg = "#FFFFFF";

/* ── Brand palette ── */
export const colorBlue = "#2563EB";
export const colorOrange = "#FF7849";
export const colorPurple = "#7C3AED";
export const colorGreen = "#22c55e";

/* ── Text scale ── */
export const textPrimary = "#2d3548";
export const textSecondary = "#8a95a5";
export const textMuted = "#b0b8c4";

/* ── Neumorphic shadows ── */
export const shadowOut =
  "6px 6px 14px #d1d9e6, -6px -6px 14px #ffffff";
export const shadowOutSm =
  "3px 3px 7px #d1d9e6, -3px -3px 7px #ffffff";
export const shadowInset =
  "inset 3px 3px 7px #d1d9e6, inset -3px -3px 7px #ffffff";

/* ── Colored elevation shadows ── */
export const shadowBlue =
  "6px 6px 16px rgba(37,99,235,0.35), -4px -4px 12px #ffffff";
export const shadowOrange =
  "6px 6px 16px rgba(255,120,73,0.3), -4px -4px 12px #ffffff";
export const shadowPurple =
  "6px 6px 16px rgba(124,58,237,0.3), -4px -4px 12px #ffffff";

/* ── Borders ── */
export const borderLight = "#f0f2f5";

/* ── Font ── */
export const fontFamily = "'Nunito Sans', sans-serif";
