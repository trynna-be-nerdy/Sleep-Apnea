import { View, Text } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

export default function SleepDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <>
      <Stack.Screen options={{ title: `Session ${id ?? ""}` }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
        <Text>Sleep session detail for: {id}</Text>
      </View>
    </>
  );
}
