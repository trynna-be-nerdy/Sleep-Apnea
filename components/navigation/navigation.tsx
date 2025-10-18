// components/navigation/navigation.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { COLORS, SPACING } from "@/hooks/theme";
import { Home, BarChart3, Book, Settings } from "lucide-react-native";

type Tab = {
  name: "home" | "progress" | "learn" | "settings";
  label: string;
  icon: React.ReactNode;
  route: "/" | "/progress" | "/learn" | "/settings";
};

const tabs: readonly Tab[] = [
  { name: "home",     label: "Home",     icon: <Home size={22} color={COLORS.text} />,      route: "/" },
  { name: "progress", label: "Progress", icon: <BarChart3 size={22} color={COLORS.text} />, route: "/progress" },
  { name: "learn",    label: "Learn",    icon: <Book size={22} color={COLORS.text} />,      route: "/learn" },
  { name: "settings", label: "Settings", icon: <Settings size={22} color={COLORS.text} />,  route: "/settings" },
] as const;

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname(); // e.g. "/", "/learn"

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <Pressable
            key={tab.name}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => router.push(tab.route as any)}
          >
            {tab.icon}
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.muted,
  },
  tab: {
    alignItems: "center",
    padding: SPACING.xs,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: COLORS.accent,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.muted,
  },
  activeLabel: {
    color: COLORS.accent,
    fontWeight: "600",
  },
});
