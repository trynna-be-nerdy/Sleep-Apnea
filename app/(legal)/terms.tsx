// app/(legal)/terms.tsx
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { Stack, Link } from "expo-router";
import { useTheme as useAppTheme } from "@/constants/theme";

export default function Terms() {
  const theme = useAppTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Terms of Service" }} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 26, fontWeight: "800", color: theme.colors.foreground }}>
          Terms of Service
        </Text>
        <Text style={{ color: theme.colors.muted }}>
          By using Apnea, you agree to these terms. Replace this placeholder with your legal copy.
        </Text>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.foreground }}>
            1. Use of Service
          </Text>
          <Text style={{ color: theme.colors.foreground }}>
            Don’t misuse the app. We may update features and policies over time.
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.foreground }}>
            2. Subscriptions
          </Text>
          <Text style={{ color: theme.colors.foreground }}>
            Plans renew automatically unless canceled per your store’s rules.
          </Text>
        </View>

        <Link href="/(legal)/privacy">
          <Text style={{ color: theme.colors.accent, textDecorationLine: "underline", marginTop: 8 }}>
            View Privacy Policy →
          </Text>
        </Link>
      </ScrollView>
    </>
  );
}
