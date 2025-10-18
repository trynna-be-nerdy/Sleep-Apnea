import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { router, Stack } from "expo-router"; // ⬅️ add Stack
import { User, Bell, Shield, AlertTriangle, HelpCircle, Trash2, ChevronRight } from "lucide-react-native";
import { useTheme } from "@/constants/theme";

function Row({ title, subtitle, icon, onPress }: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between px-4"
      style={{
        minHeight: 60,
        backgroundColor: theme.colors.card,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
      }}
    >
      <View className="flex-row items-center gap-3 flex-1">
        <View
          className="items-center justify-center rounded-lg"
          style={{
            height: 34,
            width: 34,
            backgroundColor: (theme.colors as any).cardAlt ?? "rgba(127,127,127,0.12)",
          }}
        >
          {icon}
        </View>
        <View className="flex-1">
          <Text style={{ color: theme.colors.foreground, fontSize: 16, fontWeight: "700" }}>{title}</Text>
          {subtitle ? <Text style={{ color: theme.colors.muted, marginTop: 2 }}>{subtitle}</Text> : null}
        </View>
      </View>
      <ChevronRight size={18} color={theme.colors.muted} />
    </Pressable>
  );
}

export default function SettingsMenu() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* ⬇️ Hide the (tabs) header just for this screen */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={{ padding: 16, rowGap: 16 }}>
        {/* Account summary (tap to open full Account screen) */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <Pressable onPress={() => router.push("/(tabs)/settings/account")} className="px-4 py-4 flex-row items-center gap-3">
            <View
              className="items-center justify-center rounded-xl"
              style={{
                height: 44,
                width: 44,
                backgroundColor: (theme.colors as any).accent20 ?? "rgba(254,201,76,0.20)",
              }}
            >
              <User size={22} color={theme.colors.foreground} />
            </View>
            <View className="flex-1">
              <Text style={{ color: theme.colors.foreground, fontWeight: "800", fontSize: 16 }}>Your Name</Text>
              <Text style={{ color: theme.colors.muted, fontSize: 13 }}>you@example.com</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.muted} />
          </Pressable>
        </View>

        {/* Menu sections */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <Row
            title="Notifications"
            subtitle="Reminders, wake alarms, weekly report"
            icon={<Bell size={18} color={theme.colors.foreground} />}
            onPress={() => router.push("/(tabs)/settings/notifications")}
          />
          <Row
            title="Privacy & Data"
            subtitle="Audio analysis, data export"
            icon={<Shield size={18} color={theme.colors.foreground} />}
            onPress={() => router.push("/(tabs)/settings/privacy-data")}
          />
          <Row
            title="Health Monitoring"
            subtitle="What we watch for & disclaimers"
            icon={<AlertTriangle size={18} color={theme.colors.sleepWarning ?? theme.colors.accent} />}
            onPress={() => router.push("/(tabs)/settings/health-monitoring")}
          />
          <Row
            title="Support & Info"
            subtitle="FAQ, policies, terms"
            icon={<HelpCircle size={18} color={theme.colors.foreground} />}
            onPress={() => router.push("/(tabs)/settings/support")}
          />
        </View>

        {/* Danger Zone shortcut */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.destructive,
            borderWidth: 1,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <Row
            title="Danger Zone"
            subtitle="Delete account"
            icon={<Trash2 size={18} color={theme.colors.destructive} />}
            onPress={() => router.push("/(tabs)/settings/danger")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
