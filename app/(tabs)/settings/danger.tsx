// app/(tabs)/settings/danger.tsx
import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Trash2 } from "lucide-react-native";

export default function DangerZone() {
  const confirmDelete = () =>
    Alert.alert("Delete account?", "This permanently removes your data.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => Alert.alert("Deleted", "Your account was removed.") },
    ]);

  return (
    <View className="flex-1 bg-background">
      <View className="border-b border-border bg-card/50">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Pressable onPress={() => router.back()} className="h-10 w-10 rounded-full items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </Pressable>
          <Text className="text-xl font-bold text-foreground">Danger zone</Text>
        </View>
      </View>

      <View className="m-4 rounded-xl border border-destructive/40 bg-card p-4">
        <Text className="text-foreground font-semibold mb-2">Delete account</Text>
        <Text className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </Text>
        <Pressable onPress={confirmDelete} className="rounded-xl bg-destructive py-3 items-center active:opacity-90">
          <View className="flex-row items-center gap-2">
            <Trash2 size={16} className="text-destructive-foreground" />
            <Text className="text-destructive-foreground font-semibold">Delete my account</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
