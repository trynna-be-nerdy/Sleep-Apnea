// app/(tabs)/settings/support.tsx
import React from "react";
import { View, Text, Pressable, ScrollView, Linking } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, HelpCircle, Shield } from "lucide-react-native";

export default function SupportInfo() {
  const Row = ({ title, onPress }: any) => (
    <Pressable onPress={onPress} className="px-4 py-4 active:opacity-90 bg-card border-b border-border">
      <Text className="text-[15px] font-semibold text-foreground">{title}</Text>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="border-b border-border bg-card/50">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Pressable onPress={() => router.back()} className="h-10 w-10 rounded-full items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </Pressable>
          <Text className="text-xl font-bold text-foreground">Support & info</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, rowGap: 16 }}>
        <View className="rounded-xl overflow-hidden border border-border">
          <Row title="Help & FAQ" onPress={() => { /* navigate to your help center */ }} />
          <Row title="Privacy policy" onPress={() => Linking.openURL("https://example.com/privacy")} />
          <Row title="Terms of service" onPress={() => Linking.openURL("https://example.com/terms")} />
        </View>

        <View className="items-center gap-1">
          <Text className="text-sm text-muted-foreground">APNEA Sleep Coach v1.0</Text>
          <Text className="text-xs text-muted-foreground">Built with evidence-based CBT-I principles</Text>
        </View>
      </ScrollView>
    </View>
  );
}
