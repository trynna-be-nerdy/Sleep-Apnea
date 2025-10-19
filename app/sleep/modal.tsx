// app/modal.tsx
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { COLORS, SPACING, TYPO } from "../../constants/theme";

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
   ``     <ThemedText style={styles.linkText}>Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface, // comes from theme.ts
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
  },
  title: {
    ...TYPO.title,
    marginBottom: SPACING.lg,
  },
  link: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  linkText: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: "500",
  },
});
