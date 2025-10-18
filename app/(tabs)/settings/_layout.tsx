// app/(tabs)/settings/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function SettingsStackLayout() {
  return (
    <Stack
      screenOptions={{
        // ⬇️ VERY IMPORTANT: don't inherit the root HeaderBrand
        headerLeft: undefined,       // use default back button instead of your logo
        headerTitle: "",             // blank title by default
        headerShadowVisible: true,
      }}
    >
      {/* Settings menu: no header at all (so nothing to show) */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* Subpages keep normal headers (with back chevron, no logo) */}
      <Stack.Screen name="account" options={{ title: "Account details" }} />
      <Stack.Screen name="changepassword" options={{ title: "Change password" }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen name="privacy-data" options={{ title: "Privacy & data" }} />
      <Stack.Screen name="health-monitoring" options={{ title: "Health monitoring" }} />
      <Stack.Screen name="support" options={{ title: "Support & info" }} />
      <Stack.Screen name="danger" options={{ title: "Danger zone" }} />
    </Stack>
  );
}
