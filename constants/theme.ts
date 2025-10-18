// theme.ts
import { ColorValue, useColorScheme } from "react-native"

/* =========
   Types
========= */
export type Palette = {
  text: ColorValue | undefined
  danger: ColorValue | undefined
  // Core
  background: string
  foreground: string        // main text color (light gray)
  surface: string
  border: string
  input: string
  ring: string

  // Semantic families
  primary: string
  primaryForeground: string

  secondary: string
  secondaryForeground: string

  destructive: string
  destructiveForeground: string

  muted: string             // secondary/context text
  mutedForeground: string

  accent: string
  accentForeground: string

  popover: string
  popoverForeground: string

  card: string
  cardForeground: string

  // Sleep-specific
  sleepPrimary: string
  sleepAccent: string
  sleepGlow: string
  sleepSuccess: string
  sleepWarning: string

  // Status
  success: string
  warning: string
  info: string
}

export type Theme = {
  colors: Palette
  radius: typeof RADIUS
  spacing: typeof SPACING
  typo: typeof TYPO
  elevation: typeof ELEVATION
  anim: typeof ANIM
  statusBar: {
    style: "light-content" | "dark-content"
    background: string
    translucent: boolean
  }
}

/* =========
   Spacing / Radius
========= */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const

export const RADIUS = {
  sm: 10,
  md: 12,
  lg: 14,
  xl: 24,
  full: 9999,
} as const

/* =========
   Palettes
   (Dark foreground = lighter gray; muted = dimmer gray)
========= */
const COLORS_DARK: Palette = {
  background: "#0D0D0D",
  foreground: "#E5E7EB",   // ★ lighter gray for main text
  surface: "#141414",
  border: "#2A2A2A",
  input: "#1C1C1C",
  ring: "#6E6E6E",

  primary: "#9BA3FF",
  primaryForeground: "#0B0B14",

  secondary: "#2B2B3A",
  secondaryForeground: "#EAEAF9",

  destructive: "#FF4D4F",
  destructiveForeground: "#0B0B0B",

  muted: "#A0A3AD",        // ★ softer gray for contextual/caption text
  mutedForeground: "#D9D9E0",

  accent: "#FFD76A",
  accentForeground: "#0B0B0B",

  popover: "#161616",
  popoverForeground: "#E5E7EB",

  card: "#15151A",
  cardForeground: "#E5E7EB",

  // Sleep-specific
  sleepPrimary: "#8FA7FF",
  sleepAccent: "#FFD76A",
  sleepGlow: "#B7C2FF",
  sleepSuccess: "#4CAF50",
  sleepWarning: "#FFC107",

  // Status
  success: "#4CAF50",
  warning: "#FFC107",
  info: "#60A5FA",

  text: undefined,
  danger: undefined,
}

const COLORS_LIGHT: Palette = {
  background: "#FFFFFF",
  foreground: "#0B0B0B",
  surface: "#F6F7FB",
  border: "#E6E8F0",
  input: "#F1F3F9",
  ring: "#B0B6C3",

  primary: "#4F5DFF",
  primaryForeground: "#FFFFFF",

  secondary: "#E9EAFF",
  secondaryForeground: "#22233A",

  destructive: "#E02424",
  destructiveForeground: "#FFFFFF",

  muted: "#6B7280",
  mutedForeground: "#374151",

  accent: "#FFC241",
  accentForeground: "#0B0B0B",

  popover: "#FFFFFF",
  popoverForeground: "#111827",

  card: "#FFFFFF",
  cardForeground: "#111827",

  // Sleep-specific
  sleepPrimary: "#5E76FF",
  sleepAccent: "#FFC241",
  sleepGlow: "#8FA0FF",
  sleepSuccess: "#22C55E",
  sleepWarning: "#F59E0B",

  // Status
  success: "#22C55E",
  warning: "#F59E0B",
  info: "#3B82F6",

  text: undefined,
  danger: undefined,
}

/* =========
   Typography (uses current palette)
   Use:
   - TYPO.body(theme.colors)    for main text (light gray)
   - TYPO.label(theme.colors)   for secondary/context labels (timestamps, “Sleep Coach”, etc.)
   - TYPO.small(theme.colors)   for tiny captions (“Log last night”, “Start routine”)
========= */
export const TYPO = {
  title:  (c: Palette) => ({ fontSize: 24, fontWeight: "600" as const, color: c.foreground }),
  h1:     (c: Palette) => ({ fontSize: 28, fontWeight: "700" as const, color: c.foreground }),
  h2:     (c: Palette) => ({ fontSize: 22, fontWeight: "600" as const, color: c.foreground }),
  body:   (c: Palette) => ({ fontSize: 16, color: c.foreground }),
  caption:(c: Palette) => ({ fontSize: 12, color: c.muted }),
  // helpers for the circled areas
  label:  (c: Palette) => ({ fontSize: 14, color: c.muted, fontWeight: "500" as const }),
  small:  (c: Palette) => ({ fontSize: 12, color: c.muted }),
}

/* =========
   Elevation
========= */
export const ELEVATION = {
  card:    { shadowColor: "#000", shadowOpacity: 0.18, shadowRadius: 8,  shadowOffset: { width: 0, height: 6 }, elevation: 5 },
  popover: { shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 16, shadowOffset: { width: 0, height: 10 }, elevation: 10 },
} as const

/* =========
   Animation
========= */
export const ANIM = {
  accordion: { in: 200, out: 200 },
  breathe: 4000,
  gentlePulse: 3000,
  glow: 2000,
  fadeInUp: 600,
  scaleIn: 400,
  easing: { out: "ease-out", inOut: "ease-in-out" },
} as const

/* =========
   Themes + helpers
========= */
export const THEME_DARK: Theme = {
  colors: COLORS_DARK,
  radius: RADIUS,
  spacing: SPACING,
  typo: TYPO,
  elevation: ELEVATION,
  anim: ANIM,
  statusBar: {
    style: "light-content",     // white time/battery/icons on iOS
    background: "transparent",
    translucent: true,
  },
}

export const THEME_LIGHT: Theme = {
  colors: COLORS_LIGHT,
  radius: RADIUS,
  spacing: SPACING,
  typo: TYPO,
  elevation: ELEVATION,
  anim: ANIM,
  statusBar: {
    style: "dark-content",
    background: "transparent",
    translucent: true,
  },
}

export function getTheme(mode: "light" | "dark"): Theme {
  return mode === "dark" ? THEME_DARK : THEME_LIGHT
}

/** Hook: pick the correct theme based on device setting */
export function useTheme(): Theme {
  const isDark = useColorScheme() === "dark"
  return isDark ? THEME_DARK : THEME_LIGHT
}

/* Convenience direct tokens (defaults to dark) */
export const COLORS = COLORS_DARK
