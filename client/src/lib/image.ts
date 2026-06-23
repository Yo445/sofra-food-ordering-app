const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const SERVER_ORIGIN = API_URL.replace("/api", "");

export function getImageUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  return `${SERVER_ORIGIN}${path}`;
}
