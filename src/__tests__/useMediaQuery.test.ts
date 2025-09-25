import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "../hooks/useMediaQuery";

// Mock window.matchMedia
const mockMatchMedia = vi.fn();

beforeEach(() => {
  mockMatchMedia.mockClear();
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: mockMatchMedia,
  });
});

describe("useMediaQuery", () => {
  it("returns false initially when media query doesn't match", () => {
    const mockMediaQueryList = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(false);
    expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 768px)");
  });

  it("returns true initially when media query matches", () => {
    const mockMediaQueryList = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(true);
    expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 768px)");
  });

  it("adds event listener for media query changes", () => {
    const mockAddEventListener = vi.fn();
    const mockMediaQueryList = {
      matches: false,
      addEventListener: mockAddEventListener,
      removeEventListener: vi.fn(),
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("removes event listener on unmount", () => {
    const mockRemoveEventListener = vi.fn();
    const mockMediaQueryList = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: mockRemoveEventListener,
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("updates matches state when media query changes", () => {
      let changeHandler: ((e: MediaQueryListEvent) => void) | undefined;

      const mockMediaQueryList = {
        matches: false,
        addEventListener: vi.fn((event, handler) => {
          if (event === "change") {
            changeHandler = handler;
          }
        }),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mockMediaQueryList);

      const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

      expect(result.current).toBe(false);

      // Simulate media query change
      if (changeHandler) {
        act(() => {
          changeHandler!({ matches: true } as MediaQueryListEvent);
        });
      }

      expect(result.current).toBe(true);
    });

  it("handles different media queries correctly", () => {
    const mockMediaQueryList = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    const { result: result1 } = renderHook(() =>
      useMediaQuery("(max-width: 767px)")
    );
    const { result: result2 } = renderHook(() =>
      useMediaQuery("(min-width: 1024px)")
    );

    expect(result1.current).toBe(true);
    expect(result2.current).toBe(true);
    expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");
    expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 1024px)");
  });
});
