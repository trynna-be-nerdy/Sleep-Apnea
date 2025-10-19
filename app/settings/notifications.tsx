// app/(tabs)/settings/notifications.tsx
import React, { useState } from "react";
import { View, Text, Switch, Pressable } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function NotificationsSettings() {
  const [winddown, setWinddown] = useState(true);
  const [wakeAlarm, setWakeAlarm] = useState(true);
  const [weekly, setWeekly] = useState(true);

  const Row = ({ title, subtitle, value, onValueChange }: any) => (
    <View className="flex-row items-center justify-between px-4 py-4 bg-card border-b border-border">
      <View className="flex-1 pr-3">
        <Text className="text-[15px] font-semibold text-foreground">{title}</Text>
        {subtitle ? <Text className="text-sm text-muted-foreground mt-0.5">{subtitle}</Text> : null}
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="border-b border-border bg-card/50">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Pressable onPress={() => router.back()} className="h-10 w-10 rounded-full items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </Pressable>
          <Text className="text-xl font-bold text-foreground">Notifications</Text>
        </View>
      </View>

      <View className="m-4 rounded-xl overflow-hidden border border-border">
        <Row title="Wind-down reminder" subtitle="45 minutes before bedtime" value={winddown} onValueChange={setWinddown} />
        <Row title="Gentle wake alarm" subtitle="Wake during lighter sleep" value={wakeAlarm} onValueChange={setWakeAlarm} />
        <Row title="Weekly report" subtitle="Progress every Sunday" value={weekly} onValueChange={setWeekly} />
      </View>
    </View>
  );
}
