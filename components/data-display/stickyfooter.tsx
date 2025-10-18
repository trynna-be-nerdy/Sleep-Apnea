import React, { useCallback, useRef } from "react";
import { View, Text, Pressable, LayoutChangeEvent, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

type StickyFooterProps = {
  // shared “shouldShow” flag from the scroll container
  show: boolean;
  // height callback so the parent can pad the ScrollView accordingly
  onMeasured?: (h: number) => void;
  children?: React.ReactNode;
};

export default function StickyFooter({ show, onMeasured, children }: StickyFooterProps) {
  const insets = useSafeAreaInsets();
  const heightRef = useRef(0);
  const translateY = useSharedValue(200);

  // animate when show changes
  translateY.value = withTiming(show ? 0 : heightRef.current + insets.bottom + 12, { duration: 220 });

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      heightRef.current = h;
      onMeasured?.(h);
    },
    [onMeasured]
  );

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        styles.container,
        { paddingBottom: insets.bottom + 6 },
        rStyle,
      ]}
      pointerEvents="box-none"
    >
      {/* Your footer content */}
      <View style={styles.footerCard}>
        {children ?? (
          <View style={styles.row}>
            <Pressable style={styles.item}>
              <Text style={styles.label}>AI Coach</Text>
            </Pressable>
            <Pressable style={styles.item}>
              <Text style={styles.label}>Progress</Text>
            </Pressable>
            <Pressable style={styles.item}>
              <Text style={styles.label}>Learn</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  footerCard: {
    minWidth: 280,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  row: { flexDirection: "row", gap: 24, justifyContent: "space-between" },
  item: { paddingVertical: 6, paddingHorizontal: 6, borderRadius: 12 },
  label: { fontSize: 14, fontWeight: "600", color: "#111827" },
});
