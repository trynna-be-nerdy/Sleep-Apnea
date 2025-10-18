// app/(tabs)/index.tsx
import React, { useEffect, useMemo, useState, useCallback, ReactNode, JSX } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Moon, MessageCircle, Book, BarChart3, Plus } from "lucide-react-native";
import { Svg, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedScrollHandler, runOnJS } from "react-native-reanimated";

import StickyFooter from "@/components/data-display/stickyfooter";
import { Palette, useTheme } from "@/constants/theme";
import { useTheme as useNavTheme } from "@react-navigation/native";
import type { Theme } from "@react-navigation/native";


/* ---------- Theme Types (local, minimal) ---------- */

type Colors = {
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
};

type AppTheme = {
  colors: Colors;
  radius?: { readonly sm: 10; readonly md: 12; readonly lg: 14; readonly xl: 24; readonly full: 9999 };
  spacing?: { readonly xs: 4; readonly sm: 8; readonly md: 12; readonly lg: 16; readonly xl: 24; readonly xxl: 32 };
  typo?: {
    title: (c: Palette) => { fontSize: number; fontWeight: "600"; color: string };
    h1: (c: Palette) => { fontSize: number; fontWeight: "700"; color: string };
    h2: (c: Palette) => { fontSize: number; fontWeight: "600"; color: string };
    body: (c: Palette) => { fontSize: number; color: string };
    caption: (c: Palette) => { fontSize: number; color: string };
    label: (c: Palette) => { fontSize: number; color: string; fontWeight: "500" };
    small: (c: Palette) => { fontSize: number; color: string };
  };
  elevation?: {
    readonly card: {
      readonly shadowColor: "#000";
      readonly shadowOpacity: 0.18;
      readonly shadowRadius: 8;
      readonly shadowOffset: { readonly width: 0; readonly height: 6 };
      readonly elevation: 5;
    };
    readonly popover: {
      readonly shadowColor: "#000";
      readonly shadowOpacity: 0.25;
      readonly shadowRadius: 16;
      readonly shadowOffset: { readonly width: 0; readonly height: 10 };
      readonly elevation: 10;
    };
  };
  anim?: {
    readonly accordion: { readonly in: 200; readonly out: 200 };
    readonly breathe: 4000;
    readonly gentlePulse: 3000;
    readonly glow: 2000;
    readonly fadeInUp: 600;
    readonly scaleIn: 400;
    readonly easing: { readonly out: "ease-out"; readonly inOut: "ease-in-out" };
  };
  statusBar?: { style: "light-content" | "dark-content"; background: string; translucent: boolean };
};

/* ---------- Buttons, Cards, Progress ---------- */

type ButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  variant?: "solid" | "ghost";
  size?: "md" | "icon";
  style?: StyleProp<ViewStyle>;
};

function Button({ children, onPress, variant = "solid", size = "md", style }: ButtonProps) {
  const theme = useTheme() as AppTheme;
  const isIcon = size === "icon";
  return (
    <Pressable
      onPress={onPress}
      style={[
        isIcon ? s(theme).btnIcon : s(theme).btnMd,
        variant === "ghost" ? s(theme).btnGhost : s(theme).btnSolid,
        style,
      ]}
    >
      {typeof children === "string" ? <Text style={s(theme).btnText}>{children}</Text> : children}
    </Pressable>
  );
}

type CardProps = { children: ReactNode; style?: StyleProp<ViewStyle> };
function Card({ children, style }: CardProps) {
  const theme = useTheme() as AppTheme;
  return <View style={[s(theme).card, style]}>{children}</View>;
}

type CardHeaderProps = { children: ReactNode; style?: StyleProp<ViewStyle> };
function CardHeader({ children, style }: CardHeaderProps) {
  const theme = useTheme() as AppTheme;
  return <View style={[s(theme).cardHeader, style]}>{children}</View>;
}

function CardTitle({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const theme = useTheme() as AppTheme;
  return <Text style={[s(theme).cardTitle, style]}>{children}</Text>;
}

function CardContent({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const theme = useTheme() as AppTheme;
  return <View style={[s(theme).cardContent, style]}>{children}</View>;
}

type ProgressBarProps = { value: number; style?: StyleProp<ViewStyle> };
function ProgressBar({ value, style }: ProgressBarProps) {
  const theme = useTheme() as AppTheme;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={[s(theme).progressTrack, style]}>
      <View style={[s(theme).progressFill, { width: `${pct}%` }]} />
    </View>
  );
}

/* ---------- Screen ---------- */

export default function Index(): JSX.Element {
  const theme = useTheme() as AppTheme;
  const nav = useNavTheme() as Theme; // colors.card / text / border
  const insets = useSafeAreaInsets();

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [sleepScore] = useState<number>(78);
  const [nextBedtime] = useState<string>("22:30");
  const [targetWakeTime] = useState<string>("06:30");

  // footer measurement + visibility
  const [footerH, setFooterH] = useState<number>(70);
  const [showFooter, setShowFooter] = useState<boolean>(false);
  const onFooterMeasured = useCallback((h: number) => setFooterH(h), []);
  const updateShow = useCallback((v: boolean) => setShowFooter(v), []);

  type ScrollEvt = {
    contentSize: { height: number };
    contentOffset: { y: number };
    layoutMeasurement: { height: number };
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e: ScrollEvt) => {
      const distanceFromBottom = e.contentSize.height - (e.contentOffset.y + e.layoutMeasurement.height);
      const shouldShow = distanceFromBottom <= 12;
      runOnJS(updateShow)(shouldShow);
    },
  });

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const isNightTime = currentTime.getHours() >= 20 || currentTime.getHours() <= 6;
  const greeting = isNightTime ? "Good evening" : currentTime.getHours() < 12 ? "Good morning" : "Good afternoon";

  const timeUntilBedtime = useMemo<string>(() => {
    const bedtime = new Date(currentTime);
    const [hRaw, mRaw] = nextBedtime.split(":");
    const h = Number(hRaw);
    const m = Number(mRaw);
    bedtime.setHours(Number.isNaN(h) ? 0 : h, Number.isNaN(m) ? 0 : m, 0, 0);
    if (bedtime < currentTime) bedtime.setDate(bedtime.getDate() + 1);
    const diff = bedtime.getTime() - currentTime.getTime();
    const hoursLeft = Math.floor(diff / 3600000);
    const minutesLeft = Math.floor((diff % 3600000) / 60000);
    return `${hoursLeft}h ${minutesLeft}m`;
  }, [currentTime, nextBedtime]);

  // SVG ring
  const r = 45;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - sleepScore / 100);

  return (
    <SafeAreaView style={s(theme).screen} edges={["top"]}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[s(theme).content, { paddingBottom: footerH + insets.bottom + 16 }]}
      >
        {/* Greeting & Time */}
        <View style={s(theme).center}>
          <Text style={s(theme).greeting}>{greeting}</Text>
          <Text style={s(theme).timeText}>
            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </View>

        {/* Sleep Score Ring */}
        <Card>
          <CardContent style={{ paddingTop: 24 }}>
            <View style={s(theme).center}>
              <View style={s(theme).ringWrap}>
                <Svg width="128" height="128" viewBox="0 0 100 100" style={{ transform: [{ rotate: "-90deg" }] }}>
                  <Circle cx="50" cy="50" r={r} stroke={theme.colors.muted} strokeWidth={8} fill="none" />
                  <Circle
                    cx="50"
                    cy="50"
                    r={r}
                    stroke={theme.colors.accent}
                    strokeWidth={8}
                    fill="none"
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={`${offset}`}
                    strokeLinecap="round"
                  />
                </Svg>
                <View style={s(theme).ringCenter}>
                  <Text style={s(theme).ringScore}>{sleepScore}</Text>
                  <Text style={s(theme).ringLabel}>Sleep Score</Text>
                </View>
              </View>

              <View style={[s(theme).center, { marginTop: 12 }]}>
                <Text style={s(theme).metaLabel}>Sleep Efficiency</Text>
                <Text style={s(theme).metaValue}>{sleepScore}% - Good Progress</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Tonight's Plan */}
        <Card style={{ marginTop: 20 }}>
          <CardHeader>
            <View style={s(theme).rowCenter}>
              <Moon size={20} color={theme.colors.accent} />
              <CardTitle style={{ marginLeft: 8 }}>Tonight's Plan</CardTitle>
            </View>
          </CardHeader>
          <CardContent>
            <View style={s(theme).rowBetween}>
              <View>
                <Text style={s(theme).metaLabel}>Target Bedtime</Text>
                <Text style={s(theme).metaValueLg}>{nextBedtime}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={s(theme).metaLabel}>Wake Time</Text>
                <Text style={s(theme).metaValueLg}>{targetWakeTime}</Text>
              </View>
            </View>

            <View style={{ marginTop: 16 }}>
              <View style={s(theme).rowBetween}>
                <Text style={s(theme).metaLabel}>Time until bedtime</Text>
                <Text style={s(theme).metaValueSm}>{timeUntilBedtime}</Text>
              </View>
              <ProgressBar value={65} style={{ marginTop: 10 }} />
            </View>
          </CardContent>
        </Card>



       {/* Record Sleep Section */}
<Card
  style={[
    s(theme).recordCard,
    {
      backgroundColor: "transparent", // no fill color
      borderWidth: 1.5,
      borderColor: theme.colors.border, // adaptive border
    },
  ]}
>
  <CardContent style={{ paddingVertical: 30, alignItems: "center" }}>
    <Pressable
      onPress={() => {
        // TODO: handle record tap
      }}
      accessibilityRole="button"
    >
      <LinearGradient
        colors={["#F6C85F", "#EFB847"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s(theme).recordPill}
      >
        <Text style={s(theme).recordPillText}>Record</Text>
      </LinearGradient>
    </Pressable>

    <Text style={[s(theme).recordSubtitle, { textAlign: "center" }]}>
      Record tonights sleep!
    </Text>
  </CardContent>
</Card>




        {/* Quick Actions */}
        <View style={[s(theme).row, { marginTop: 20 }]}>
          <Link href="/(tabs)/sleepdiary" asChild>
            <Pressable style={s(theme).quickItemLeft}>
              <Card>
                <CardContent style={[s(theme).center, s(theme).quickCardContent]}>
                  <Plus size={32} color={theme.colors.accent} />
                  <Text style={[s(theme).metaValueSm, { marginTop: 12 }]}>Sleep Diary</Text>
                  <Text style={[s(theme).metaLabel, { marginTop: 6 }]}>Log last night</Text>
                </CardContent>
              </Card>
            </Pressable>
          </Link>

          <Link href="/(tabs)/winddown" asChild>
            <Pressable style={s(theme).quickItemRight}>
              <Card>
                <CardContent style={[s(theme).center, s(theme).quickCardContent]}>
                  <View style={s(theme).dotOuter}>
                    <View style={s(theme).dotInner} />
                  </View>
                  <Text style={[s(theme).metaValueSm, { marginTop: 12 }]}>Wind Down</Text>
                  <Text style={[s(theme).metaLabel, { marginTop: 6 }]}>Start routine</Text>
                </CardContent>
              </Card>
            </Pressable>
          </Link>
        </View>
      </Animated.ScrollView>

      {/* THEME-AWARE FLOATING BOTTOM BAR */}
      <StickyFooter show={showFooter} onMeasured={onFooterMeasured}>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 2,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            height: 52,
            backgroundColor: nav.colors.card,
            borderTopColor: nav.colors.border,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            shadowColor: "#080808ff",
            shadowOpacity: nav.dark ? 0.4 : 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: -2 },
            elevation: 10,
          }}
        >
          <Link href="/(tabs)/coach" asChild>
            <Button variant="ghost" style={{ flex: 1, alignItems: "center" }}>
              <MessageCircle size={24} color={nav.colors.text} />
              <Text style={{ fontSize: 13, marginTop: 4, color: nav.colors.text }}>AI Coach</Text>
            </Button>
          </Link>

          <Link href="/(tabs)/progress" asChild>
            <Button variant="ghost" style={{ flex: 1, alignItems: "center" }}>
              <BarChart3 size={24} color={nav.colors.text} />
              <Text style={{ fontSize: 13, marginTop: 4, color: nav.colors.text, opacity: 0.6 }}>
                Progress
              </Text>
            </Button>
          </Link>

          <Link href="/(tabs)/learn" asChild>
            <Button variant="ghost" style={{ flex: 1, alignItems: "center" }}>
              <Book size={24} color={nav.colors.text} />
              <Text style={{ fontSize: 13, marginTop: 4, color: nav.colors.text, opacity: 0.6 }}>
                Learn
              </Text>
            </Button>
          </Link>
        </View>
      </StickyFooter>
    </SafeAreaView>
  );
}

/* =========
   STYLES
========= */
const s = (theme: AppTheme) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.colors.background },
    content: { padding: 20 },
    center: { alignItems: "center", justifyContent: "center" },

    row: { flexDirection: "row", alignItems: "center" },
    rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    rowCenter: { flexDirection: "row", alignItems: "center" },

    greeting: { color: theme.colors.foreground, fontSize: 24, fontWeight: "600", marginTop: 20, marginBottom: 6 },
    timeText: { color: theme.colors.muted, fontSize: 14, marginBottom: 16 },

    card: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 16,
    },
    cardHeader: { paddingHorizontal: 16, paddingTop: 16 },
    cardTitle: { fontSize: 16, fontWeight: "600", color: theme.colors.foreground },
    cardContent: { paddingHorizontal: 16, paddingBottom: 16 },

    progressTrack: { height: 8, width: "100%", borderRadius: 999, backgroundColor: theme.colors.muted },
    progressFill: { height: 8, borderRadius: 999, backgroundColor: theme.colors.accent },

    ringWrap: { width: 128, height: 128, alignItems: "center", justifyContent: "center" },
    ringCenter: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center" },
    ringScore: { color: theme.colors.accent, fontSize: 34, fontWeight: "700" },
    ringLabel: { color: theme.colors.muted, fontSize: 13, marginTop: 4 },

    metaLabel: { color: theme.colors.muted, fontSize: 13 },
    metaValue: { color: theme.colors.foreground, fontSize: 16, fontWeight: "500", marginTop: 4 },
    metaValueSm: { color: theme.colors.foreground, fontSize: 14, fontWeight: "500" },
    metaValueLg: { color: theme.colors.foreground, fontSize: 18, fontWeight: "600", marginTop: 4 },

    dotOuter: {
      width: 32,
      height: 32,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(254,201,76,0.20)",
    },
    dotInner: { width: 16, height: 16, borderRadius: 999, backgroundColor: theme.colors.accent },

    navLabel: { color: theme.colors.foreground, fontSize: 13, marginTop: 6 },

    btnIcon: { height: 40, width: 40, borderRadius: 999, alignItems: "center", justifyContent: "center" },
    btnMd: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 999 },
    btnSolid: { backgroundColor: theme.colors.accent },
    btnGhost: { backgroundColor: "transparent" },
    btnText: { color: theme.colors.foreground, fontSize: 14, fontWeight: "600" },

    quickItemLeft: { flex: 1, marginRight: 8 },
    quickItemRight: { flex: 1, marginLeft: 8 },
    quickCardContent: { paddingVertical: 28, minHeight: 120 },
    /* NEW styles for the Record section */
    recordCard: {
      marginTop: 20,
      backgroundColor: "#FFF7CC", // light yellow background
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 16,
    },
    recordTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#EAB308",           // yellow text
      letterSpacing: 0.2,
    },
    recordSubtitle: {
      fontSize: 13,
      color: "#9CA3AF",           // light grey
      marginTop: 6,
    },
    recordPill: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 140,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    recordPillText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#4B5563",           // dark gray for contrast on yellow
    },
    },
  );
