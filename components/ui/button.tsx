// components/ui/button.tsx
import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
} from "react-native";
import { useTheme } from "@/constants/theme";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

export type ButtonProps = {
  children: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  disabled?: boolean;
  hitSlop?: number | { top?: number; right?: number; bottom?: number; left?: number };
  accessibilityLabel?: string;
};

export function Button({
  children,
  onPress,
  variant = "default",
  size = "default",
  style,
  textStyle,
  disabled,
  hitSlop,
  accessibilityLabel,
}: ButtonProps): React.JSX.Element {
  const theme = useTheme();
  const styles = React.useMemo(() => makeStyles(theme), [theme]);
  const container = [
    styles.base,
    sizeStyles(theme, size),
    variantContainer(theme, variant),
    disabled && { opacity: 0.5 },
    style,
  ];
  const label = [styles.label, variantLabel(theme, variant), textStyle];

  const content =
    typeof children === "string" ? (
      <Text style={label} numberOfLines={1}>
        {children}
      </Text>
    ) : (
      children
    );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={hitSlop ?? 6}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [container, pressed && styles.pressed]}
    >
      {/* keep icons/text centered */}
      <View style={styles.contentRow}>{content}</View>
    </Pressable>
  );
}

/* ---------------- Switch (RN-native, themed) ---------------- */
import { Switch as RNSwitch } from "react-native";

export type ThemedSwitchProps = React.ComponentProps<typeof RNSwitch>;

export function Switch(props: ThemedSwitchProps): React.JSX.Element {
  const theme = useTheme();
  return (
    <RNSwitch
      ios_backgroundColor={theme.colors.input}
      trackColor={{ false: theme.colors.input, true: theme.colors.primary }}
      thumbColor={theme.colors.popover}
      {...props}
    />
  );
}

/* ---------------- Styles ---------------- */
const makeStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    base: {
      borderRadius: theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.primaryForeground, // will be overridden by variantLabel
    },
    pressed: { transform: [{ scale: 0.99 }] },
    contentRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8, // RN 0.73+ supports gap; if not, wrap children in a small spacer
    },
  });

function sizeStyles(theme: ReturnType<typeof useTheme>, size: Size): ViewStyle {
  const padY = { default: 10, sm: 8, lg: 12, icon: 10 }[size];
  const padX = { default: 16, sm: 12, lg: 20, icon: 10 }[size];
  const dim = size === "icon" ? 40 : undefined;
  return {
    paddingVertical: padY,
    paddingHorizontal: padX,
    height: dim,
    width: size === "icon" ? 40 : undefined,
    borderRadius: size === "sm" ? theme.radius.sm : size === "lg" ? theme.radius.lg : theme.radius.md,
  };
}

function variantContainer(theme: ReturnType<typeof useTheme>, variant: Variant): ViewStyle {
  switch (variant) {
    case "default":
      return { backgroundColor: theme.colors.primary };
    case "destructive":
      return { backgroundColor: theme.colors.destructive };
    case "secondary":
      return { backgroundColor: theme.colors.secondary };
    case "outline":
      return {
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.border,
      };
    case "ghost":
      return { backgroundColor: "transparent" };
    case "link":
      return { backgroundColor: "transparent", paddingHorizontal: 0, paddingVertical: 0 };
    default:
      return { backgroundColor: theme.colors.primary };
  }
}

function variantLabel(theme: ReturnType<typeof useTheme>, variant: Variant): TextStyle {
  switch (variant) {
    case "default":
      return { color: theme.colors.primaryForeground };
    case "destructive":
      return { color: theme.colors.destructiveForeground };
    case "secondary":
      return { color: theme.colors.secondaryForeground };
    case "outline":
      return { color: theme.colors.foreground };
    case "ghost":
      return { color: theme.colors.foreground };
    case "link":
      return { color: theme.colors.primary, textDecorationLine: "underline" };
    default:
      return { color: theme.colors.primaryForeground };
  }
}
