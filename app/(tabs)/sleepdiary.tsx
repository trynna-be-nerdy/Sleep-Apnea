// app/pages/SleepDiary.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Clock, Eye, Star } from "lucide-react-native";

/** Tiny RN UI primitives (NativeWind className ready) */
function Button({
  children,
  className = "",
  onPress,
  type,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <Pressable
      className={`rounded-xl px-4 py-3 active:opacity-90 ${disabled ? "opacity-50" : ""} ${className}`}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
    >
      {typeof children === "string" ? (
        <Text className="text-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <View className={`bg-card border border-border rounded-xl ${className}`}>{children}</View>;
}
function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <View className={`px-4 pt-4 ${className}`}>{children}</View>;
}
function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <Text className={`text-base font-semibold text-foreground ${className}`}>{children}</Text>;
}
function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <View className={`px-4 pb-4 ${className}`}>{children}</View>;
}
function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <Text className={`text-sm text-foreground ${className}`}>{children}</Text>;
}

/** Helper: parse "HH:MM" safely */
function parseHHMM(val: string) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(val?.trim() ?? "");
  if (!m) return null;
  let h = Math.min(23, Math.max(0, Number(m[1])));
  let min = Math.min(59, Math.max(0, Number(m[2])));
  return { h, min };
}

export default function SleepDiary() {
  const [formData, setFormData] = useState({
    bedTime: "23:00",
    sleepTime: "23:30",
    wakeTime: "06:30",
    outOfBedTime: "07:00",
    nightWakeups: 1,
    wakeDuration: 15,
    sleepQuality: 3 as number, // 0..4
  });

  const qualityLabels = useMemo(
    () => ["Poor", "Fair", "Good", "Very Good", "Excellent"],
    []
  );

  const calculateSleepEfficiency = () => {
    const bed = parseHHMM(formData.bedTime);
    const wake = parseHHMM(formData.wakeTime);
    if (!bed || !wake) return 0;

    const base = new Date(2024, 0, 1, bed.h, bed.min, 0, 0);
    const wakeBase = new Date(2024, 0, 1, wake.h, wake.min, 0, 0);
    // If wake <= bed, assume next day.
    if (wakeBase <= base) wakeBase.setDate(wakeBase.getDate() + 1);

    const totalTimeInBedMin = Math.max(1, Math.round((wakeBase.getTime() - base.getTime()) / 60000));
    const timeAwakeMin = Math.max(0, Number(formData.wakeDuration) || 0);
    const sleepTimeMin = Math.max(0, totalTimeInBedMin - timeAwakeMin);
    const eff = Math.round((sleepTimeMin / totalTimeInBedMin) * 100);
    return Math.max(0, Math.min(100, eff));
  };

  const efficiency = calculateSleepEfficiency();

  const handleSubmit = () => {
    // Save to backend here if desired
    // Simple success feedback then navigate home
    router.push("/");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      {/* Header */}
      <View className="border-b border-border bg-card/50">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Button className="rounded-full" onPress={() => router.back()}>
            <ArrowLeft size={20} className="text-foreground" />
          </Button>
          <View>
            <Text className="text-xl font-bold text-foreground">Sleep Diary</Text>
            <Text className="text-sm text-muted-foreground">How did you sleep last night?</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, rowGap: 16 }}>
        {/* Sleep Times */}
        <Card>
          <CardHeader>
            <CardTitle className="flex-row items-center gap-2">
              <Clock size={20} className="text-sleep-accent" />
              <Text className="text-foreground font-semibold">Sleep Times</Text>
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <View className="flex-row gap-4">
              <View className="flex-1 gap-2">
                <Label>Went to bed</Label>
                <TextInput
                  value={formData.bedTime}
                  onChangeText={(v) => setFormData((s) => ({ ...s, bedTime: v }))}
                  placeholder="HH:MM"
                  className="rounded-xl px-3 py-3 bg-secondary border border-border text-foreground"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  keyboardType="numbers-and-punctuation"
                  autoCapitalize="none"
                />
              </View>
              <View className="flex-1 gap-2">
                <Label>Fell asleep</Label>
                <TextInput
                  value={formData.sleepTime}
                  onChangeText={(v) => setFormData((s) => ({ ...s, sleepTime: v }))}
                  placeholder="HH:MM"
                  className="rounded-xl px-3 py-3 bg-secondary border border-border text-foreground"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  keyboardType="numbers-and-punctuation"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1 gap-2">
                <Label>Woke up</Label>
                <TextInput
                  value={formData.wakeTime}
                  onChangeText={(v) => setFormData((s) => ({ ...s, wakeTime: v }))}
                  placeholder="HH:MM"
                  className="rounded-xl px-3 py-3 bg-secondary border border-border text-foreground"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  keyboardType="numbers-and-punctuation"
                  autoCapitalize="none"
                />
              </View>
              <View className="flex-1 gap-2">
                <Label>Got out of bed</Label>
                <TextInput
                  value={formData.outOfBedTime}
                  onChangeText={(v) => setFormData((s) => ({ ...s, outOfBedTime: v }))}
                  placeholder="HH:MM"
                  className="rounded-xl px-3 py-3 bg-secondary border border-border text-foreground"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  keyboardType="numbers-and-punctuation"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Night Disruptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex-row items-center gap-2">
              <Eye size={20} className="text-sleep-accent" />
              <Text className="text-foreground font-semibold">Night Disruptions</Text>
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <View className="gap-2">
              <Label>Number of times awake</Label>
              <TextInput
                value={String(formData.nightWakeups)}
                onChangeText={(v) =>
                  setFormData((s) => ({ ...s, nightWakeups: Math.max(0, parseInt(v || "0", 10) || 0) }))
                }
                keyboardType="number-pad"
                className="rounded-xl px-3 py-3 bg-secondary border border-border text-foreground"
              />
            </View>

            <View className="gap-2">
              <Label>Total time awake (minutes)</Label>
              <TextInput
                value={String(formData.wakeDuration)}
                onChangeText={(v) =>
                  setFormData((s) => ({
                    ...s,
                    wakeDuration: Math.max(0, Math.min(480, parseInt(v || "0", 10) || 0)),
                  }))
                }
                keyboardType="number-pad"
                className="rounded-xl px-3 py-3 bg-secondary border border-border text-foreground"
              />
            </View>
          </CardContent>
        </Card>

        {/* Sleep Quality (star rating 0..4) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex-row items-center gap-2">
              <Star size={20} className="text-sleep-accent" />
              <Text className="text-foreground font-semibold">Sleep Quality</Text>
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <Label>How would you rate your sleep quality?</Label>

            <View className="flex-row items-center justify-between px-2">
              {[0, 1, 2, 3, 4].map((i) => {
                const filled = formData.sleepQuality >= i;
                return (
                  <Pressable
                    key={i}
                    hitSlop={8}
                    onPress={() => setFormData((s) => ({ ...s, sleepQuality: i }))}
                    className="p-1"
                  >
                    <Star
                      size={28}
                      className={filled ? "text-sleep-accent" : "text-muted-foreground"}
                      fill={filled ? "hsl(var(--sleep-accent))" : "transparent"}
                    />
                  </Pressable>
                );
              })}
            </View>

            <View className="flex-row justify-between">
              {qualityLabels.map((q, idx) => (
                <Text key={q} className="text-xs text-muted-foreground">
                  {idx === 0 || idx === 4 ? q : ""}
                </Text>
              ))}
            </View>

            <View className="items-center">
              <Text className="text-lg font-medium text-sleep-accent">
                {qualityLabels[formData.sleepQuality]}
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Sleep Efficiency Preview */}
        <Card className="border-sleep-accent/30">
          <CardContent className="pt-6 items-center gap-2">
            <Text className="text-3xl font-bold text-sleep-accent">{efficiency}%</Text>
            <Text className="text-sm text-muted-foreground">Estimated Sleep Efficiency</Text>
            <Text className="text-xs text-muted-foreground">Based on your reported times</Text>
          </CardContent>
        </Card>

        {/* Submit / Cancel */}
        <View className="gap-4">
          <Button className="w-full bg-accent" onPress={handleSubmit}>
            <Text className="text-accent-foreground font-medium">Save Sleep Diary</Text>
          </Button>
          <Button className="w-full" onPress={() => router.push("/")}>
            <Text className="text-foreground">Cancel</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
