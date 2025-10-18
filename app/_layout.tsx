// app/_layout.tsx 
import "react-native-reanimated";
import React, { useState } from "react";
import { View, Text, Image, Pressable, Modal, useColorScheme, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Menu as MenuIcon, Settings as SettingsIcon } from "lucide-react-native"; // ← added SettingsIcon
import { StatusBar } from "expo-status-bar";
import {
  ThemeProvider as NavThemeProvider,
  DarkTheme as NavDark,
  DefaultTheme as NavLight,
  useTheme as useNavTheme,
} from "@react-navigation/native";

/* ---------- Brand (logo + text) shown on the LEFT ---------- */
function HeaderBrand() {
  const router = useRouter();
  const { colors } = useNavTheme();

  return (
    <Pressable
      onPress={() => router.push("/")}
      accessibilityRole="button"
      hitSlop={10}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      {/* Logo chip */}
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 20,
          backgroundColor: colors.card,       // adaptive
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
          borderWidth: 1,
          borderColor: colors.border,         // adaptive
        }}
      >
        <Image
          source={require("assets/apnea-moon.png")}
          style={{ width: 35, height: 35, borderRadius: 35, resizeMode: "contain" }}
        />
      </View>

      {/* Text block */}
      <View style={{ justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "800",
            letterSpacing: 0.2,
            color: colors.text,               // adaptive
          }}
        >
          APNEA
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: colors.text,               // adaptive (muted via opacity)
            opacity: 0.7,
          }}
        >
          Sleep Diagnosis
        </Text>
      </View>
    </Pressable>
  );
}

/* ---------- Right side settings button (replaces hamburger) ---------- */
function HeaderHamburger() {
  // repurpose this component to be the Settings button so headerRight stays unchanged
  const router = useRouter();
  const { colors } = useNavTheme();

  return (
    <Pressable
      onPress={() => router.push("/(tabs)/settings")}
      hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 0, // keep width fixed
        backgroundColor: "rgba(255,255,255,0.06)",
      }}
      accessibilityLabel="Open settings"
    >
      <SettingsIcon size={24} color={colors.text} />
    </Pressable>
  );
}

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";
  const theme = isDark ? NavDark : NavLight;

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavThemeProvider value={theme}>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTransparent: false,
            headerShadowVisible: true,
           headerTitle: () => null,
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: theme.colors.background, // adaptive
              ...Platform.select({ android: { elevation: 1 } }),
            },
            headerTintColor: theme.colors.text,         // adaptive icons/back button
            headerLeft: () => (
              <View style={{ paddingLeft: 4 }}>
                <HeaderBrand />
              </View>
            ),
            headerRight: () => (
              <View style={{ paddingRight: 0 }}>
                <HeaderHamburger /> {/* now a Settings button */}
              </View>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "" }} />
        </Stack>
      </NavThemeProvider>
    </>
  );
}
