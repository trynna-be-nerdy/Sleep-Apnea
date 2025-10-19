// app/(tabs)/settings/account.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, User, Mail } from "lucide-react-native";

export default function SettingsAccount() {
  const [name, setName] = useState("Your Name");
  const [email, setEmail] = useState("you@example.com");

  return (
    <View className="flex-1 bg-background">
      {/* header */}
      <View className="border-b border-border bg-card/50">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Pressable onPress={() => router.back()} className="h-10 w-10 rounded-full items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </Pressable>
          <Text className="text-xl font-bold text-foreground">Account details</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, rowGap: 14 }}>
        <View className="gap-2">
          <Text className="text-xs text-muted-foreground">NAME</Text>
          <View className="flex-row items-center gap-2 bg-card border border-border rounded-xl px-3">
            <User size={18} className="text-muted-foreground" />
            <TextInput value={name} onChangeText={setName} placeholder="Name" className="flex-1 py-3 text-foreground" />
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-xs text-muted-foreground">EMAIL</Text>
          <View className="flex-row items-center gap-2 bg-card border border-border rounded-xl px-3">
            <Mail size={18} className="text-muted-foreground" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              className="flex-1 py-3 text-foreground"
            />
          </View>
        </View>

        <Pressable
          className="mt-2 rounded-xl bg-accent items-center justify-center py-3 active:opacity-90"
          onPress={() => Alert.alert("Saved", "Your details have been updated.")}
        >
          <Text className="font-semibold text-foreground">Save changes</Text>
        </Pressable>

        <Pressable
          className="rounded-xl border border-border items-center justify-center py-3 active:opacity-90"
          onPress={() => router.push("/(tabs)/settings/changepassword")}
        >
          <Text className="font-semibold text-foreground">Change password</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
