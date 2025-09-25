import { create } from "zustand";

type ScreenSizeState = {
  screenSize: "mobile" | "tablet" | "desktop" | null;
  setScreenSize: (size: "mobile" | "tablet" | "desktop" | null) => void;
  clearInfo: () => void;
};

export const useScreenSizeStore = create<ScreenSizeState>((set) => ({
  screenSize: null,
  setScreenSize: (size: "mobile" | "tablet" | "desktop" | null) =>
    set({ screenSize: size }),
  clearInfo: () => set({ screenSize: null }),
}));
