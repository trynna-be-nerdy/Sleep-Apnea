import { View, Text, Pressable } from "react-native";
import { router, Link } from "expo-router";

export default function SignIn() {
  return (
    <View style={{ flex: 1, padding: 20, gap: 12, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Sign In</Text>
      <Pressable
        onPress={() => router.replace("/(tabs)/record")}
        style={{ padding: 12, borderRadius: 12, backgroundColor: "#ddd", alignItems: "center" }}
      >
        <Text>Continue</Text>
      </Pressable>
      <Link href="/auth/preferences">Go to Preferences</Link>
    </View>
  );
}
