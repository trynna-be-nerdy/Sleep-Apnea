// app/(tabs)/settings/changepassword.tsx
import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, KeyRound } from "lucide-react-native";

export default function ChangePassword() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const rules = useMemo(() => {
    const length = newPw.length >= 8;
    const upper = /[A-Z]/.test(newPw);
    const lower = /[a-z]/.test(newPw);
    const digit = /[0-9]/.test(newPw);
    const special = /[^A-Za-z0-9]/.test(newPw);
    const match = newPw.length > 0 && newPw === confirmPw;
    return { length, upper, lower, digit, special, match };
  }, [newPw, confirmPw]);

  const canSubmit =
    currentPw.length > 0 && rules.length && rules.upper && rules.lower && rules.digit && rules.special && rules.match;

  return (
    <View className="flex-1 bg-background">
      <View className="border-b border-border bg-card/50">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Pressable onPress={() => router.back()} className="h-10 w-10 rounded-full items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </Pressable>
          <Text className="text-xl font-bold text-foreground">Change password</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, rowGap: 14 }}>
        {[
          ["Current password", currentPw, setCurrentPw, "password"],
          ["New password", newPw, setNewPw, "new-password"],
          ["Confirm new password", confirmPw, setConfirmPw, "password"],
        ].map(([label, val, setVal, t], i) => (
          <View key={i} className="gap-2">
            <Text className="text-xs text-muted-foreground">{label as string}</Text>
            <View className="flex-row items-center gap-2 bg-card border border-border rounded-xl px-3">
              <KeyRound size={18} className="text-muted-foreground" />
              <TextInput
                value={val as string}
                onChangeText={setVal as any}
                secureTextEntry
                textContentType={t as any}
                placeholder="••••••••"
                className="flex-1 py-3 text-foreground"
              />
            </View>
          </View>
        ))}

        {/* Strength + rules */}
        <View className="gap-2">
          <Text className="text-xs text-muted-foreground">Requirements</Text>
          {[
            ["At least 8 characters", rules.length],
            ["Uppercase letter", rules.upper],
            ["Lowercase letter", rules.lower],
            ["Number", rules.digit],
            ["Special character", rules.special],
            ["Passwords match", rules.match],
          ].map(([k, ok], i) => (
            <View key={i} className="flex-row items-center gap-2">
              <View className={`h-2 w-2 rounded-full ${ok ? "bg-accent" : "bg-muted"}`} />
              <Text className={`${ok ? "text-foreground" : "text-muted-foreground"} text-sm`}>{k as string}</Text>
            </View>
          ))}
        </View>

        <Pressable
          disabled={!canSubmit}
          onPress={() => {
            Alert.alert("Password changed", "Your password has been updated.");
            router.back();
          }}
          className={`mt-2 rounded-xl py-3 items-center ${canSubmit ? "bg-accent" : "bg-muted"}`}
        >
          <Text className="font-semibold text-foreground">Save password</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
