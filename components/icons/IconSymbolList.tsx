import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { IconSymbol } from "./icon-symbol";

export interface IconItem {
  name: string;
  color: string;
  size?: number;
}

export interface IconSymbolListProps {
  items: IconItem[];
  style?: StyleProp<ViewStyle>;
  direction?: "row" | "column"; // layout direction
  spacing?: number; // gap between icons
}

/**
 * Renders a list of IconSymbol components.
 */
export function IconSymbolList({
  items,
  style,
  direction = "row",
  spacing = 8,
}: IconSymbolListProps) {
  return (
    <View style={[styles.container, { flexDirection: direction }, style]}>
      {items.map((item, index) => (
        <View
          key={index}
          style={{ marginRight: direction === "row" ? spacing : 0, marginBottom: direction === "column" ? spacing : 0 }}
        >
          <IconSymbol
            name={item.name as any}
            color={item.color}
            size={item.size ?? 24}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
