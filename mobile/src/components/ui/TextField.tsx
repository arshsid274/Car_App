import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from "react-native";

import { palette, radii, spacing, typography } from "@/constants/theme";

type TextFieldProps = TextInputProps & {
  label: string;
};

export const TextField = ({ label, ...props }: TextFieldProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholderTextColor={palette.textMuted}
      style={styles.input}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs
  },
  label: {
    fontFamily: typography.body,
    color: palette.textSecondary,
    fontSize: 13
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radii.md,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    color: palette.textPrimary,
    fontFamily: typography.body,
    fontSize: 15
  }
});

