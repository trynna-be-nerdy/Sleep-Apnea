// app/+not-found.tsx  (Expo Router 404 screen in React Native)
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Link, usePathname } from "expo-router";
import { Home, Moon } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <View className="min-h-screen bg-background items-center justify-center p-4">
      <Card className="sleep-card w-full max-w-md">
        <CardContent className="pt-8 items-center gap-6">
          <View className="w-16 h-16 rounded-full bg-sleep-accent/20 items-center justify-center">
            <Moon size={32} className="text-sleep-accent" />
          </View>

          <View className="items-center gap-2">
            <Text className="text-4xl font-bold text-foreground">404</Text>
            <Text className="text-xl font-semibold text-foreground">Page Not Found</Text>
            <Text className="text-center text-muted-foreground">
              Looks like you&apos;ve wandered into the wrong sleep cycle. Let&apos;s get you back to restful territory.
            </Text>
          </View>

          <Link href="/" asChild>
            <Button style={{ flexDirection: "row", alignItems: "center" }}>
              <Home size={16} style={{ marginRight: 8 }} />
              <Text style={{ color: "#fff", fontWeight: "500" }}>Return Home</Text>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </View>
  );
}
