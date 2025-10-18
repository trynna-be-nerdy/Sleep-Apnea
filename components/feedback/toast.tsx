// components/feedback/toast.tsx
import * as React from "react";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
  ToastShowParams,
} from "react-native-toast-message";
import { COLORS } from "../../constants/theme";

type Props = React.PropsWithChildren<{}>;

/**
 * Mount this once in app/_layout.tsx and wrap your app:
 * <ToastProvider><Stack .../></ToastProvider>
 */
export function ToastProvider({ children }: Props) {
  const toastConfig = React.useMemo<ToastConfig>(
    () => ({
      success: (props) => (
        <BaseToast
          {...props}
          style={{ borderLeftColor: COLORS.success, backgroundColor: COLORS.surface }}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          text1Style={{ color: COLORS.text, fontSize: 16, fontWeight: "600" }}
          text2Style={{ color: COLORS.muted, fontSize: 14 }}
        />
      ),
      error: (props) => (
        <ErrorToast
          {...props}
          style={{ borderLeftColor: COLORS.danger, backgroundColor: COLORS.surface }}
          text1Style={{ color: COLORS.text, fontSize: 16, fontWeight: "700" }}
          text2Style={{ color: COLORS.muted, fontSize: 14 }}
        />
      ),
    }),
    []
  );

  return (
    <>
      {children}
      <Toast position="bottom" visibilityTime={2500} config={toastConfig} />
    </>
  );
}

/** Simple helpers for showing toast messages */
export const showToast = {
  success: (text1: string, text2?: string) => {
    const params: ToastShowParams = { type: "success", text1, text2 };
    Toast.show(params);
  },
  error: (text1: string, text2?: string) => {
    const params: ToastShowParams = { type: "error", text1, text2 };
    Toast.show(params);
  },
};

export default Toast;
