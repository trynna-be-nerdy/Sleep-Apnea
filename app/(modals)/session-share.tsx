import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function SessionShareModal() {
  return (
    <>
      <Stack.Screen options={{ title: "Share Session" }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Text>Share options go here.</Text>
      </View>
    </>
  );
}
