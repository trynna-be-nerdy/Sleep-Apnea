// components/feedback/use-toast.ts
import * as React from "react";
import Toast, { ToastShowParams } from "react-native-toast-message";

/** Types that map to RN toast */
export type ToastType = "success" | "error" | "info";

export type ToastOptions = {
  type?: ToastType;
  title?: string;        // maps to text1
  description?: string;  // maps to text2
  position?: "top" | "bottom";
  visibilityTime?: number; // ms
};

type ToastHandle = {
  id: string;
  dismiss: () => void;
  update: (opts: Partial<ToastOptions>) => void;
};

// Simple id generator (RN toast doesn't use ids, but we keep the shape)
let _count = 0;
function genId() {
  _count = (_count + 1) % Number.MAX_SAFE_INTEGER;
  return String(_count);
}

/** Show a toast immediately (RN-style). Returns a handle with dismiss/update */
export function toast(opts: ToastOptions = {}): ToastHandle {
  const id = genId();
  const {
    type = "success",
    title,
    description,
    position = "bottom",
    visibilityTime = 2500,
  } = opts;

  const params: ToastShowParams = {
    type,
    text1: title,
    text2: description,
    position,
    visibilityTime,
  };

  Toast.show(params);

  return {
    id,
    dismiss: () => Toast.hide(),
    update: (next: Partial<ToastOptions>) => {
      // RN toast doesn't update in place — we hide and re-show
      Toast.hide();
      const merged: ToastOptions = {
        type,
        title,
        description,
        position,
        visibilityTime,
        ...next,
      };
      Toast.show({
        type: merged.type,
        text1: merged.title,
        text2: merged.description,
        position: merged.position,
        visibilityTime: merged.visibilityTime,
      });
    },
  };
}

/** Hook API compatible with your previous usage */
export function useToast() {
  // Keep a tiny state only if you need to reflect something in UI (optional)
  const [lastId, setLastId] = React.useState<string | null>(null);

  const show = React.useCallback((opts: ToastOptions = {}) => {
    const handle = toast(opts);
    setLastId(handle.id);
    return handle;
  }, []);

  const dismiss = React.useCallback((_toastId?: string) => {
    // RN toast hides the currently visible toast; ids are not tracked internally
    Toast.hide();
  }, []);

  return {
    toasts: [],        // kept for API parity (no internal list in RN lib)
    toast: show,       // call: toast({ type: "success", title: "Saved", description: "All set!" })
    dismiss,           // call: dismiss()
    lastId,            // optional: last shown id
  };
}
