import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaMatch = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Set the initial state
    setMatches(mediaMatch.matches);

    // Add event listener
    mediaMatch.addEventListener("change", handler);
    // Clean up event listener on unmount
    return () => mediaMatch.removeEventListener("change", handler);
  }, [query]);

  return matches;
};
