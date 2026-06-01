export function getApiErrorMessage(error: unknown, fallback = "An unexpected error occurred.") {
  if (!error) return fallback;

  if (typeof error === "string") return error;

  if (typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.trim().length > 0) {
      return message;
    }
  }

  return fallback;
}
