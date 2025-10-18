// app/(legal)/privacy.tsx
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { Stack, Link } from "expo-router";
import { useTheme as useAppTheme } from "@/constants/theme";

export default function Privacy() {
  const theme = useAppTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Privacy Policy" }} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 26, fontWeight: "800", color: theme.colors.foreground }}>
          Privacy Policy
        </Text>
        <Text style={{ color: theme.colors.muted }}>
          Welcome to Apnea. This policy explains what data we collect, how we use it, and your choices.
        </Text>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.foreground }}>
            1. Information We Collect
          </Text>
          <Text style={{ color: theme.colors.foreground }}>
            Sleep session metadata, optional audio-derived features, and basic app analytics.
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.foreground }}>
            2. How We Use Information
          </Text>
          <Text style={{ color: theme.colors.foreground }}>
            To generate insights, improve accuracy, and provide coaching. We do not sell your data.
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.foreground }}>
            3. Your Rights
          </Text>
          <Text style={{ color: theme.colors.foreground }}>
            You can request export or deletion of your data from the Account screen.
          </Text>
        </View>

        <Text style={{ color: theme.colors.muted }}>
          Questions? Contact support@apneaapp.com
        </Text>

        <Link href="/(legal)/terms">
          <Text style={{ color: theme.colors.accent, textDecorationLine: "underline", marginTop: 8 }}>
            Read our Terms of Service →
          </Text>
        </Link>
      </ScrollView>
    </>
  );
}
