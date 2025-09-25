import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useScreenSizeStore } from "../stores/screenSizeStore";

describe("screenSizeStore", () => {
  it("initializes with null screen size", () => {
    const { result } = renderHook(() => useScreenSizeStore());

    expect(result.current.screenSize).toBe(null);
  });

  it("sets screen size to mobile", () => {
    const { result } = renderHook(() => useScreenSizeStore());

    act(() => {
      result.current.setScreenSize("mobile");
    });

    expect(result.current.screenSize).toBe("mobile");
  });

  it("sets screen size to tablet", () => {
    const { result } = renderHook(() => useScreenSizeStore());

    act(() => {
      result.current.setScreenSize("tablet");
    });

    expect(result.current.screenSize).toBe("tablet");
  });

  it("sets screen size to desktop", () => {
    const { result } = renderHook(() => useScreenSizeStore());

    act(() => {
      result.current.setScreenSize("desktop");
    });

    expect(result.current.screenSize).toBe("desktop");
  });

  it("clears screen size info", () => {
    const { result } = renderHook(() => useScreenSizeStore());

    // First set a screen size
    act(() => {
      result.current.setScreenSize("mobile");
    });

    expect(result.current.screenSize).toBe("mobile");

    // Then clear it
    act(() => {
      result.current.clearInfo();
    });

    expect(result.current.screenSize).toBe(null);
  });

  it("updates screen size multiple times", () => {
    const { result } = renderHook(() => useScreenSizeStore());

    // Set to mobile
    act(() => {
      result.current.setScreenSize("mobile");
    });
    expect(result.current.screenSize).toBe("mobile");

    // Change to tablet
    act(() => {
      result.current.setScreenSize("tablet");
    });
    expect(result.current.screenSize).toBe("tablet");

    // Change to desktop
    act(() => {
      result.current.setScreenSize("desktop");
    });
    expect(result.current.screenSize).toBe("desktop");

    // Clear
    act(() => {
      result.current.clearInfo();
    });
    expect(result.current.screenSize).toBe(null);
  });

  it("handles setting screen size to null", () => {
    const { result } = renderHook(() => useScreenSizeStore());

    act(() => {
      result.current.setScreenSize("mobile");
    });

    act(() => {
      result.current.setScreenSize(null);
    });

    expect(result.current.screenSize).toBe(null);
  });

  it("provides correct function types", () => {
    const { result } = renderHook(() => useScreenSizeStore());

    expect(typeof result.current.setScreenSize).toBe("function");
    expect(typeof result.current.clearInfo).toBe("function");
  });
});
