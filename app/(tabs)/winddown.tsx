// app/pages/WindDown.tsx
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle } from "lucide-react-native";

/** Minimal RN primitives (NativeWind-ready) */
function Button({
  children,
  className = "",
  onPress,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      className={`rounded-xl px-4 py-3 active:opacity-90 ${disabled ? "opacity-50" : ""} ${className}`}
      onPress={onPress}
      disabled={disabled}
    >
      {typeof children === "string" ? <Text className="text-foreground">{children}</Text> : children}
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

/** Simple progress bar */
function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View className={`h-2 w-full rounded-full bg-muted ${className}`}>
      <View className="h-2 rounded-full bg-sleep-accent" style={{ width: `${pct}%` }} />
    </View>
  );
}

type ActivityKey = "breathing" | "journaling" | "meditation";

export default function WindDown() {
  const [currentActivity, setCurrentActivity] = useState<ActivityKey>("breathing");
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(240); // seconds
  const [completedActivities, setCompletedActivities] = useState<ActivityKey[]>([]);

  const activities = useMemo(
    () => ({
      breathing: {
        name: "Box Breathing",
        duration: 240,
        description: "Inhale 4s • Hold 4s • Exhale 4s • Hold 4s",
      },
      journaling: {
        name: "Gratitude Journal",
        duration: 300,
        description: "Reflect on 3 positive moments from today.",
      },
      meditation: {
        name: "Body Scan",
        duration: 600,
        description: "Progressive relaxation from toes to head.",
      },
    }),
    []
  );

  // Main countdown
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isActive, timeLeft]);

  // Handle completion once
  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setCompletedActivities((prev) =>
        prev.includes(currentActivity) ? prev : [...prev, currentActivity]
      );
    }
  }, [timeLeft, isActive, currentActivity]);

  const toggleTimer = () => setIsActive((v) => !v);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(activities[currentActivity].duration);
  };

  const switchActivity = (activity: ActivityKey) => {
    setCurrentActivity(activity);
    setIsActive(false);
    setTimeLeft(activities[activity].duration);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressPct = (() => {
    const total = activities[currentActivity].duration;
    return ((total - timeLeft) / total) * 100;
  })();

  /** Breathing guide ring */
  const BreathingGuide = () => {
    const [phase, setPhase] = useState<"inhale" | "hold1" | "exhale" | "hold2">("inhale");
    const [phaseTimer, setPhaseTimer] = useState(4);

    useEffect(() => {
      if (!isActive) return;
      const id = setInterval(() => {
        setPhaseTimer((t) => {
          if (t <= 1) {
            setPhase((p) => {
              switch (p) {
                case "inhale":
                  return "hold1";
                case "hold1":
                  return "exhale";
                case "exhale":
                  return "hold2";
                case "hold2":
                default:
                  return "inhale";
              }
            });
            return 4;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }, [isActive]);

    const phaseText =
      phase === "inhale" ? "Breathe In" : phase === "exhale" ? "Breathe Out" : "Hold";

    const scale =
      !isActive ? 1 : phase === "inhale" ? 1.1 : phase === "exhale" ? 0.9 : 1.0;

    return (
      <View className="items-center gap-6">
        <View className="w-32 h-32 items-center justify-center">
          <View
            className="w-32 h-32 rounded-full border-4 border-sleep-accent items-center justify-center"
            style={{
              transform: [{ scale }],
              backgroundColor:
                phase === "inhale"
                  ? "hsla(42,100%,65%,0.20)"
                  : phase === "exhale"
                  ? "hsla(42,100%,65%,0.10)"
                  : "hsla(42,100%,65%,0.15)",
            }}
          />
          <View className="absolute inset-0 items-center justify-center">
            <Text className="text-2xl font-bold text-sleep-accent">{phaseTimer}</Text>
            <Text className="text-sm text-muted-foreground">{phaseText}</Text>
          </View>
        </View>
        <Text className="text-muted-foreground text-center">
          Follow the rhythm: breathe in 4s, hold 4s, out 4s, hold 4s.
        </Text>
      </View>
    );
  };

  const allDone = completedActivities.length === 3;

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="border-b border-border bg-card/50">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Button className="rounded-full" onPress={() => router.back()}>
            <ArrowLeft size={20} className="text-foreground" />
          </Button>
          <View>
            <Text className="text-xl font-bold text-foreground">Wind Down</Text>
            <Text className="text-sm text-muted-foreground">Prepare for restful sleep</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 px-4 py-6 gap-6">
        {/* Progress Overview */}
        <Card className="sleep-card">
          <CardContent className="pt-6 gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-muted-foreground">Wind-down Progress</Text>
              <Text className="text-sm font-medium text-foreground">
                {completedActivities.length}/3 Complete
              </Text>
            </View>
            <ProgressBar value={(completedActivities.length / 3) * 100} />
            <View className="flex-row justify-between">
              <Text
                className={`text-xs ${
                  completedActivities.includes("breathing") ? "text-sleep-success" : "text-muted-foreground"
                }`}
              >
                Breathing {completedActivities.includes("breathing") ? "✓" : ""}
              </Text>
              <Text
                className={`text-xs ${
                  completedActivities.includes("journaling") ? "text-sleep-success" : "text-muted-foreground"
                }`}
              >
                Journal {completedActivities.includes("journaling") ? "✓" : ""}
              </Text>
              <Text
                className={`text-xs ${
                  completedActivities.includes("meditation") ? "text-sleep-success" : "text-muted-foreground"
                }`}
              >
                Meditation {completedActivities.includes("meditation") ? "✓" : ""}
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Activity Selector (Segmented) */}
        <View className="flex-row rounded-xl overflow-hidden border border-border">
          {(["breathing", "journaling", "meditation"] as ActivityKey[]).map((key) => {
            const selected = currentActivity === key;
            return (
              <Pressable
                key={key}
                onPress={() => switchActivity(key)}
                className={`flex-1 items-center py-2 ${
                  selected ? "bg-accent" : "bg-card"
                }`}
              >
                <Text className={`${selected ? "text-accent-foreground" : "text-foreground"} font-medium`}>
                  {key === "breathing" ? "Breathing" : key === "journaling" ? "Journal" : "Meditation"}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Timer Card */}
        <Card className="sleep-card">
          <CardHeader>
            <CardTitle className="flex-row items-center justify-between">
              <Text className="text-foreground">{activities[currentActivity].name}</Text>
              {completedActivities.includes(currentActivity) && (
                <CheckCircle size={20} className="text-sleep-success" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-6">
            <View className="items-center gap-4">
              <Text className="text-4xl font-bold text-sleep-accent">{formatTime(timeLeft)}</Text>
              <ProgressBar value={progressPct} />
              <Text className="text-sm text-muted-foreground text-center">
                {activities[currentActivity].description}
              </Text>
            </View>

            {/* Activity-specific content */}
            {currentActivity === "breathing" && <BreathingGuide />}

            {currentActivity === "journaling" && (
              <View className="items-center gap-4">
                <View className="w-16 h-16 rounded-full bg-sleep-accent/20 items-center justify-center">
                  <Text style={{ fontSize: 24 }}>📝</Text>
                </View>
                <Text className="text-muted-foreground text-center">
                  Write three things you&apos;re grateful for today. Focus on specific moments, people, or experiences.
                </Text>
              </View>
            )}

            {currentActivity === "meditation" && (
              <View className="items-center gap-4">
                <View className="w-16 h-16 rounded-full bg-sleep-accent/20 items-center justify-center">
                  <Text style={{ fontSize: 24 }}>🧘</Text>
                </View>
                <Text className="text-muted-foreground text-center">
                  Lie down comfortably. Starting with your toes, notice each part of your body and release tension as you
                  move upward to your head.
                </Text>
              </View>
            )}

            {/* Timer Controls */}
            <View className="flex-row justify-center gap-4">
              <Button onPress={toggleTimer} className="bg-accent">
                <View className="flex-row items-center">
                  {isActive ? <Pause size={20} className="mr-2 text-accent-foreground" /> : <Play size={20} className="mr-2 text-accent-foreground" />}
                  <Text className="text-accent-foreground font-medium">{isActive ? "Pause" : "Start"}</Text>
                </View>
              </Button>
              <Button onPress={resetTimer} className="border border-border bg-transparent">
                <View className="flex-row items-center">
                  <RotateCcw size={20} className="mr-2 text-foreground" />
                  <Text className="text-foreground">Reset</Text>
                </View>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Completion */}
        {allDone && (
          <Card className="sleep-card border-sleep-success/30">
            <CardContent className="pt-6 items-center gap-4">
              <View className="w-16 h-16 rounded-full bg-sleep-success/20 items-center justify-center">
                <CheckCircle size={32} className="text-sleep-success" />
              </View>
              <View className="items-center">
                <Text className="font-medium text-foreground mb-2">Wind-down Complete!</Text>
                <Text className="text-sm text-muted-foreground mb-4 text-center">
                  You&apos;re now ready for restful sleep. Sweet dreams!
                </Text>
                <Button className="bg-accent" onPress={() => router.push("/")}>
                  <Text className="text-accent-foreground font-medium">Done</Text>
                </Button>
              </View>
            </CardContent>
          </Card>
        )}
      </View>
    </View>
  );
}
