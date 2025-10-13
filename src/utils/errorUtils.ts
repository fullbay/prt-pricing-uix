/**
 * Extracts a user-friendly error message from various error types
 */
export function getErrorMessage(error: unknown, defaultMessage = "An error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  // For objects with a message property
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return defaultMessage;
}