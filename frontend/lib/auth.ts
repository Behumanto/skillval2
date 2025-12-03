export type TrajectType = "jeugdzorg" | "automotive" | "algemeen";

export type DecodedToken = {
  userId?: string;
  role?: "candidate" | "assessor" | "coach" | "admin";
  tenantId?: string;
  trajectType?: TrajectType;
  specialisatie?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
};

const textDecoder =
  typeof globalThis !== "undefined" && typeof globalThis.TextDecoder !== "undefined"
    ? new globalThis.TextDecoder("utf-8")
    : undefined;

function decodeWithAtob(base64: string): string {
  const atobFn = (globalThis as typeof globalThis & { atob?: (data: string) => string }).atob;
  if (!atobFn) {
    return "";
  }
  const binary = atobFn(base64);
  if (!textDecoder) {
    return binary;
  }
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return textDecoder.decode(bytes);
}

/** Base64url decode die werkt in middleware (Edge runtime) én in de browser. */
function base64UrlDecode(input: string): string {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + (4 - (normalized.length % 4)) % 4, "=");

  if (typeof (globalThis as any).atob === "function") {
    try {
      return decodeWithAtob(padded);
    } catch {
      return "";
    }
  }

  const BufferCtor = (globalThis as any).Buffer;
  if (BufferCtor) {
    try {
      return BufferCtor.from(padded, "base64").toString("utf8");
    } catch {
      return "";
    }
  }

  return "";
}

export function parseToken(token: string | undefined | null): DecodedToken | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const payload = base64UrlDecode(parts[1]);
  if (!payload) return null;

  try {
    return JSON.parse(payload) as DecodedToken;
  } catch {
    return null;
  }
}
