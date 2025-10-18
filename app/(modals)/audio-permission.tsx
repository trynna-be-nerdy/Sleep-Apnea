import { View, Text, Pressable } from "react-native";
import { Stack, router } from "expo-router";

export default function AudioPermissionModal() {
  return (
    <>
      <Stack.Screen options={{ title: "Microphone Permission" }} />
      <View style={{ flex: 1, padding: 20, gap: 12, justifyContent: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>We need mic access</Text>
        <Text>Allow microphone access to record sleep audio.</Text>
        <Pressable onPress={() => router.back()} style={{ padding: 12, borderRadius: 12, backgroundColor: "#ccc", alignItems: "center" }}>
          <Text>OK</Text>
        </Pressable>
      </View>
    </>
  );
}
