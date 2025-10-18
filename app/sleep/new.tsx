import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function SleepNew() {
  return (
    <>
      <Stack.Screen options={{ title: "New Session" }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
        <Text>Create a new sleep session (placeholder)</Text>
      </View>
    </>
  );
}
