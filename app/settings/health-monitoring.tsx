// app/(tabs)/settings/health-monitoring.tsx
import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, AlertTriangle } from "lucide-react-native";

export default function HealthMonitoring() {
  return (
    <View className="flex-1 bg-background">
      <View className="border-b border-border bg-card/50">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Pressable onPress={() => router.back()} className="h-10 w-10 rounded-full items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </Pressable>
          <Text className="text-xl font-bold text-foreground">Health monitoring</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, rowGap: 12 }}>
        <Text className="text-sm text-foreground">
          APNEA watches for signals that may indicate clinically concerning sleep issues:
        </Text>
        <View className="gap-1 pl-3">
          <Text className="text-sm text-muted-foreground">• Witnessed pauses or gasping</Text>
          <Text className="text-sm text-muted-foreground">• Excessive daytime sleepiness</Text>
          <Text className="text-sm text-muted-foreground">• Morning headaches / choking sensations</Text>
          <Text className="text-sm text-muted-foreground">• Mood or cognitive impacts</Text>
        </View>

        <View className="rounded-xl border border-sleep-warning/50 bg-sleep-warning/10 p-4 mt-4">
          <View className="flex-row items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-sleep-warning" />
            <Text className="text-sleep-warning font-semibold">Medical disclaimer</Text>
          </View>
          <Text className="text-sm text-foreground">
            APNEA is not a medical device and cannot diagnose sleep disorders. Seek professional care for concerns.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
