// app/_layout.tsx
import "react-native-reanimated"; // must be first
import * as React from "react";
import { StatusBar } from "react-native";
import { Stack } from "expo-router";
import {
  DarkTheme as NavDark,
  DefaultTheme as NavLight,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme as useAppTheme } from "@/constants/theme";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const appTheme = useAppTheme();

  // Custom navigation theme synced with your app colors
  const navTheme = React.useMemo(
    () => ({
      ...(isDark ? NavDark : NavLight),
      colors: {
        ...(isDark ? NavDark.colors : NavLight.colors),
        background: appTheme.colors.background,
        card: appTheme.colors.card,
        text: appTheme.colors.foreground,
        border: appTheme.colors.border,
        primary: appTheme.colors.primary,
        notification: appTheme.colors.accent,
      },
    }),
    [isDark, appTheme]
  );

  return (
    <NavThemeProvider value={navTheme}>
      <QueryClientProvider client={queryClient}>
        {/* Global status bar that adapts to light/dark mode */}
        <StatusBar
          barStyle={isDark ? "light-content" : "dark-content"}
          backgroundColor={appTheme.colors.background}
        />

        {/* Main navigation stack — no tab layout anymore */}
        <Stack
          screenOptions={{
            headerShown: false, // You can enable this if you want headers globally
          }}
        >
          {/* Keep only your real screens here */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(legal)" options={{ headerShown: true, title: "" }} />
          <Stack.Screen
            name="(modals)"
            options={{ presentation: "modal", headerShown: true }}
          />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen
            name="sleep/[id]"
            options={{ headerShown: true, title: "Session" }}
          />
        </Stack>
      </QueryClientProvider>
    </NavThemeProvider>
  );
}
