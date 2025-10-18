// app/pages/Learn.tsx
import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Link, router } from "expo-router";
import {
  ArrowLeft,
  Book,
  Clock,
  Moon,
  Brain,
  Zap,
  CheckCircle,
} from "lucide-react-native";

/** Tiny RN badge */
function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <View className={`px-2 py-1 rounded-md ${className}`}>
      <Text className="text-xs">{children as any}</Text>
    </View>
  );
}

/** Tiny RN card primitives */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <View className={`bg-card border border-border rounded-xl ${className}`}>
      {children}
    </View>
  );
}
function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <View className={`px-4 pb-4 ${className}`}>{children}</View>;
}

/** Simple progress bar (0–100) */
function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View className={`h-2 w-full rounded-full bg-muted ${className}`}>
      <View
        className="h-2 rounded-full bg-sleep-accent"
        style={{ width: `${pct}%` }}
      />
    </View>
  );
}

export default function Learn() {
  const modules = [
    {
      id: 1,
      title: "Sleep Foundations",
      description: "Understanding your sleep cycles and what affects them",
      duration: "15 min",
      progress: 100,
      completed: true,
      topics: ["Sleep stages", "Circadian rhythms", "Three-factor model"],
      icon: Book,
    },
    {
      id: 2,
      title: "Stimulus Control",
      description: "Strengthen the association between your bed and sleep",
      duration: "12 min",
      progress: 75,
      completed: false,
      topics: ["Bed = sleep only", "15-minute rule", "Fixed wake time"],
      icon: Zap,
    },
    {
      id: 3,
      title: "Sleep Window Optimization",
      description: "Find your optimal time in bed for better efficiency",
      duration: "18 min",
      progress: 30,
      completed: false,
      topics: ["Sleep restriction basics", "Safety guidelines", "Weekly adjustments"],
      icon: Clock,
    },
    {
      id: 4,
      title: "Cognitive Techniques",
      description: "Manage racing thoughts and sleep anxiety",
      duration: "20 min",
      progress: 0,
      completed: false,
      topics: ["Thought reframing", "Worry scheduling", "Paradoxical intention"],
      icon: Brain,
    },
    {
      id: 5,
      title: "Sleep Environment",
      description: "Optimize your bedroom for better sleep",
      duration: "10 min",
      progress: 0,
      completed: false,
      topics: ["Temperature control", "Light management", "Noise reduction"],
      icon: Moon,
    },
  ];

  const quickTips = [
    {
      title: "Keep a Fixed Wake Time",
      description:
        "Even on weekends, maintain the same wake time to regulate your circadian rhythm.",
      category: "Schedule",
    },
    {
      title: "The 3-2-1 Rule",
      description:
        "No large meals 3 hours before bed, no liquids 2 hours before, no screens 1 hour before.",
      category: "Evening Routine",
    },
    {
      title: "Cool Temperature",
      description:
        "Keep your bedroom between 65-68°F (18-20°C) for optimal sleep temperature.",
      category: "Environment",
    },
    {
      title: "Wind-Down Buffer",
      description:
        "Start relaxing activities 30-60 minutes before your target bedtime.",
      category: "Routine",
    },
  ];

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="border-b border-border bg-card/50">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Pressable
            onPress={() => router.back()}
            className="rounded-full p-2"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-foreground">Learn</Text>
            <Text className="text-sm text-muted-foreground">
              Evidence-based sleep education
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, rowGap: 16 }}>
        {/* Progress Overview */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <View className="gap-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-lg font-semibold text-foreground">
                    CBT-I Program Progress
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Complete all modules for optimal results
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-2xl font-bold text-sleep-accent">1/5</Text>
                  <Text className="text-xs text-muted-foreground">Modules Done</Text>
                </View>
              </View>
              <ProgressBar value={20} />
              <View className="flex-row justify-between">
                <Text className="text-xs text-muted-foreground">Started</Text>
                <Text className="text-xs text-muted-foreground">Sleep Expert</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Learning Modules */}
        <View className="gap-4">
          <Text className="text-lg font-semibold text-foreground">
            Learning Modules
          </Text>

          {modules.map((module) => {
            const IconComponent = module.icon;
            const badgeStatus = module.completed ? "Complete" : undefined;

            return (
              <Pressable
                key={module.id}
                className={`active:opacity-90`}
                onPress={() => {
                  // Navigate to a module screen if you have one, e.g. /learn/[id]
                  // router.push(`/pages/learn/${module.id}`);
                }}
              >
                <Card
                  className={`shadow-card ${module.completed ? "border-sleep-success/30" : ""}`}
                >
                  <CardContent className="pt-6">
                    <View className="flex-row items-start gap-4">
                      <View
                        className={`w-12 h-12 rounded-xl items-center justify-center ${
                          module.completed
                            ? "bg-sleep-success/20"
                            : module.progress > 0
                            ? "bg-sleep-accent/20"
                            : "bg-muted"
                        }`}
                      >
                        {module.completed ? (
                          <CheckCircle size={24} className="text-sleep-success" />
                        ) : (
                          <IconComponent
                            size={24}
                            className={`${
                              module.progress > 0
                                ? "text-sleep-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        )}
                      </View>

                      <View className="flex-1 gap-3">
                        <View className="gap-1">
                          <View className="flex-row items-center justify-between">
                            <Text className="font-medium text-foreground">
                              {module.title}
                            </Text>
                            <View className="flex-row items-center gap-2">
                              <Badge className="bg-muted text-foreground">
                                {module.duration}
                              </Badge>
                              {badgeStatus && (
                                <Badge className="bg-sleep-success/20">
                                  <Text className="text-xs text-sleep-success">Complete</Text>
                                </Badge>
                              )}
                            </View>
                          </View>
                          <Text className="text-sm text-muted-foreground">
                            {module.description}
                          </Text>
                        </View>

                        <View className="gap-2">
                          <View className="flex-row justify-between">
                            <Text className="text-xs text-muted-foreground">Progress</Text>
                            <Text className="text-xs text-foreground font-medium">
                              {module.progress}%
                            </Text>
                          </View>
                          <ProgressBar value={module.progress} className="h-1.5" />
                        </View>

                        <View className="flex-row flex-wrap gap-1">
                          {module.topics.map((topic, i) => (
                            <Badge
                              key={`${module.id}-${i}`}
                              className="border border-border bg-transparent"
                            >
                              <Text className="text-xs text-foreground">{topic}</Text>
                            </Badge>
                          ))}
                        </View>
                      </View>
                    </View>
                  </CardContent>
                </Card>
              </Pressable>
            );
          })}
        </View>

        {/* Quick Tips */}
        <View className="gap-4">
          <Text className="text-lg font-semibold text-foreground">Quick Sleep Tips</Text>

          <View className="gap-4">
            {quickTips.map((tip, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="pt-4">
                  <View className="gap-2">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-medium text-foreground">{tip.title}</Text>
                      <Badge className="bg-muted text-foreground">{tip.category}</Badge>
                    </View>
                    <Text className="text-sm text-muted-foreground">{tip.description}</Text>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </View>

        {/* Continue Learning CTA */}
        <Card className="border-sleep-accent/30">
          <CardContent className="pt-6 items-center gap-4">
            <View className="w-16 h-16 rounded-full bg-sleep-accent/20 items-center justify-center">
              <Book size={32} className="text-sleep-accent" />
            </View>
            <View className="items-center">
              <Text className="font-medium text-foreground mb-2">Ready for Module 2?</Text>
              <Text className="text-sm text-muted-foreground mb-4 text-center">
                Learn stimulus control techniques to strengthen your sleep associations
              </Text>
              <Pressable
                className="rounded-xl px-4 py-3 bg-accent active:opacity-90"
                onPress={() => {
                  // Navigate to module 2
                  // router.push("/pages/learn/2");
                }}
              >
                <Text className="text-accent-foreground font-medium">Continue Learning</Text>
              </Pressable>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </View>
  );
}
