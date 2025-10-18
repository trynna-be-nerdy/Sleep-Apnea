// app/(tabs)/settings/privacy-data.tsx
import React, { useState } from "react";
import { View, Text, Switch, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Shield, Download } from "lucide-react-native";

export default function PrivacyData() {
  const [audioAnalysis, setAudioAnalysis] = useState(true);

  return (
    <View className="flex-1 bg-background">
      <View className="border-b border-border bg-card/50">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Pressable onPress={() => router.back()} className="h-10 w-10 rounded-full items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </Pressable>
          <Text className="text-xl font-bold text-foreground">Privacy & data</Text>
        </View>
      </View>

      <View className="m-4 rounded-xl overflow-hidden border border-border">
        <View className="flex-row items-center justify-between px-4 py-4 bg-card border-b border-border">
          <View className="flex-1 pr-3">
            <Text className="text-[15px] font-semibold text-foreground">Audio sleep analysis</Text>
            <Text className="text-sm text-muted-foreground mt-0.5">Snore detection & noise monitoring (on-device)</Text>
          </View>
          <Switch value={audioAnalysis} onValueChange={setAudioAnalysis} />
        </View>

        <View className="px-4 py-4 bg-card">
          <View className="flex-row items-center gap-2 mb-1">
            <Shield size={16} className="text-foreground" />
            <Text className="font-semibold text-foreground">Privacy first</Text>
          </View>
          <Text className="text-sm text-foreground">
            All audio processing happens on your device. Raw audio is never uploaded or stored.
          </Text>
        </View>
      </View>

      <View className="px-4">
        <Pressable
          onPress={() => Alert.alert("Export started", "We’ll email you a download link.")}
          className="rounded-xl border border-border py-3 items-center justify-center active:opacity-90"
        >
          <View className="flex-row items-center gap-2">
            <Download size={16} className="text-foreground" />
            <Text className="text-foreground font-semibold">Export my data</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
