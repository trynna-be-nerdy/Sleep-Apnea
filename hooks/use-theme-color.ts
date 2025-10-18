/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

// Colors definition moved local to fix missing module import
const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: '#2f95dc'
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: '#2f95dc'
  }
} as const;
import { useColorScheme } from './use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
