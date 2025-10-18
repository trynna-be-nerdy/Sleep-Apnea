// app/pages/Coach.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Link, router } from "expo-router";
import { ArrowLeft, Send, MessageCircle, Lightbulb } from "lucide-react-native";


type ChatRole = "user" | "assistant";

interface Message {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
}

export default function Coach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI sleep coach. I'm here to help you improve your sleep using evidence-based CBT-I techniques. How can I support your sleep journey today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const quickQuestions = useMemo(
    () => [
      "Why do I wake up at 3am?",
      "How can I fall asleep faster?",
      "Should I change my bedtime?",
      "What's sleep restriction therapy?",
    ],
    []
  );

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageContent?: string) => {
    const content = (messageContent ?? inputMessage).trim();
    if (!content || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("wake up") && lowerMessage.includes("3am")) {
      return (
        "Waking up at 3am is common and can be caused by several factors:\n\n" +
        "• Natural sleep cycles – You may be transitioning between stages\n" +
        "• Stress or anxiety – Your mind might be processing concerns\n" +
        "• Environment – Temperature, noise, or light changes\n" +
        "• Lifestyle – Late meals, caffeine, or screen time\n\n" +
        "Try these strategies:\n" +
        "1) Don't check the time\n" +
        "2) Stay in bed unless awake for 15+ minutes\n" +
        "3) 4-7-8 breathing\n" +
        "4) Progressive muscle relaxation\n\n" +
        "Want me to guide you through one now?"
      );
    }

    if (lowerMessage.includes("fall asleep") || lowerMessage.includes("sleep faster")) {
      return (
        "Techniques to fall asleep faster:\n\n" +
        "Stimulus Control:\n" +
        "• Bed only for sleep/intimacy\n" +
        "• If not asleep in ~20 min, get up, do a quiet activity, return when sleepy\n\n" +
        "Wind-down (30–60m): dim lights, avoid screens, relax\n" +
        "Environment: cool (65–68°F), dark, quiet, comfy\n" +
        "Cognitive: gratitude, positive imagery, paradoxical intention\n\n" +
        "Your sleep efficiency target is 85%. Want suggestions to optimize your sleep window?"
      );
    }

    if (lowerMessage.includes("bedtime") || lowerMessage.includes("sleep schedule")) {
      return (
        "Sleep window optimization can help consolidate sleep:\n\n" +
        "• Move bedtime ~15 min later\n" +
        "• Keep wake time fixed (e.g., 6:30 AM)\n" +
        "• Adjust weekly based on sleep efficiency\n\n" +
        "We won't go below 6h time-in-bed. Want a proposed window for this week?"
      );
    }

    if (lowerMessage.includes("sleep restriction") || lowerMessage.includes("srt")) {
      return (
        "Sleep Restriction Therapy (SRT):\n\n" +
        "How it works:\n" +
        "• Limit time-in-bed to actual sleep time (min 6h)\n" +
        "• Fixed wake time; adjust bedtime weekly\n" +
        "• Builds sleep drive; consolidates sleep\n\n" +
        "Expected:\n" +
        "• Week 1–2: more tired\n" +
        "• Week 3–4: consolidation\n" +
        "• Week 4–6: gradually increase TIB as efficiency improves\n\n" +
        "Safety: avoid driving if very sleepy; monitor mood. Want a gentle SRT plan?"
      );
    }

    return (
      "I can help with CBT-I strategies:\n\n" +
      "• Sleep hygiene & environment\n" +
      "• Stimulus control\n" +
      "• Sleep window optimization\n" +
      "• Cognitive strategies for racing thoughts\n" +
      "• Relaxation for wind-down\n\n" +
      "Tell me more: trouble falling asleep, night wakings, early awakening, or poor quality?"
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      {/* Header */}
      <View className="border-b border-border bg-card/50 backdrop-blur-sm">
        <View className="px-4 py-4 flex-row items-center gap-4">
          <Link href="/" asChild>
            <Pressable className="rounded-full p-2" onPress={() => router.back()}>
              <ArrowLeft size={20} className="text-foreground" />
            </Pressable>
          </Link>

          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-accent items-center justify-center">
              <MessageCircle size={20} className="text-accent-foreground" />
            </View>
            <View>
              <Text className="text-xl font-bold text-foreground">AI Sleep Coach</Text>
              <Text className="text-sm text-muted-foreground">Evidence-based guidance</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <View className="px-4 py-4">
          <View className="bg-card border border-border rounded-xl p-4">
            <View className="flex-row items-center gap-2 mb-3">
              <Lightbulb size={16} className="text-sleep-accent" />
              <Text className="text-sm font-medium text-foreground">Quick Questions</Text>
            </View>
            <View className="gap-2">
              {quickQuestions.map((q) => (
                <Pressable
                  key={q}
                  className="border border-border rounded-xl px-3 py-2 bg-secondary/20"
                  onPress={() => handleSendMessage(q)}
                >
                  <Text className="text-foreground">{q}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Messages */}
      <View className="flex-1 px-4 pb-4">
        <ScrollView ref={scrollRef} contentContainerStyle={{ paddingVertical: 16 }}>
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <View key={m.id} className={`mb-3 flex ${isUser ? "items-end" : "items-start"}`}>
                <View
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    isUser
                      ? "bg-sleep-accent"
                      : "bg-card border border-border"
                  }`}
                >
                  <Text className={`${isUser ? "text-accent-foreground" : "text-foreground"} text-sm leading-relaxed`}>
                    {m.content}
                  </Text>
                  <Text
                    className={`text-xs mt-2 ${
                      isUser ? "text-accent-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <View className="items-start">
              <View className="bg-card border border-border rounded-2xl px-4 py-3">
                <Text className="text-muted-foreground">Coach is typing…</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Composer */}
      <View className="border-t border-border bg-card/50 p-4">
        <View className="flex-row gap-2 items-center">
          <TextInput
            value={inputMessage}
            onChangeText={setInputMessage}
            onSubmitEditing={() => handleSendMessage()}
            placeholder="Ask about sleep techniques, schedules, or challenges..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            className="flex-1 bg-background text-foreground border border-border rounded-xl px-3 py-3"
            editable={!isTyping}
            returnKeyType="send"
          />
          <Pressable
            onPress={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isTyping}
            className={`rounded-xl px-4 py-3 ${!inputMessage.trim() || isTyping ? "opacity-50" : ""} bg-accent`}
          >
            <Send size={18} className="text-accent-foreground" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
