import { NextRequest, NextResponse } from "next/server";
// Belangrijk: in middleware (edge runtime) kan de path alias "@/..." soms niet resolven,
// dus gebruik een relatieve import naar ./lib/auth
import { parseToken } from "./lib/auth";

/**
 * Role → dashboard mapping.
 * Zodra iemand ingelogd is en een JWT heeft:
 *   role=candidate => /dashboard/candidate
 *   role=assessor => /dashboard/assessor
 *   role=coach    => /dashboard/coach
 *   role=admin    => /dashboard/coach (tijdelijk zelfde als coach)
 */
const dashboardByRole: Record<string, string> = {
  candidate: "/dashboard/candidate",
  assessor: "/dashboard/assessor",
  coach: "/dashboard/coach",
  admin: "/dashboard/coach",
};

/**
 * Alle routes onder deze prefixes zijn "beschermd":
 * - /dashboard/...  (kandidaat / coach / assessor portalen)
 * - /assessment/... (mobiele assessor capture view)
 *
 * In productie: alleen toegankelijk met geldige JWT.
 * In local dev: mag ook zonder JWT zodat je UI-designs kunt bekijken zonder telkens in te loggen.
 */
const PROTECTED_PREFIXES = ["/dashboard", "/assessment"];

/**
 * Local dev mode (NEXT_PUBLIC_APP_ENV=local):
 * - we laten je door naar dashboards zonder token
 * - root "/" stuurt je door naar /dashboard/candidate ook zonder token
 *
 * In non-local mode:
 * - geen token? -> redirect naar /login
 */
const isLocalEnv =
  process.env.NEXT_PUBLIC_APP_ENV === "local" ||
  process.env.NODE_ENV !== "production";

/**
 * Bepaal of we de middleware helemaal moeten overslaan voor deze request.
 * - /_next   => Next internals (bundles, HMR, etc.)
 * - /favicon => favicon etc.
 * - /api     => API routes (hebben vaak hun eigen auth)
 * - /login   => login pagina zelf is natuurlijk open
 */
function shouldBypass(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api") ||
    pathname === "/login"
  );
}

/**
 * Kleine helper om een redirect response te bouwen.
 * We houden de URL origin en host gelijk, maar vervangen alleen het pad en legen de querystring.
 */
function buildRedirect(request: NextRequest, targetPath: string) {
  const url = request.nextUrl.clone();
  url.pathname = targetPath;
  url.search = "";
  return NextResponse.redirect(url);
}

/**
 * De eigenlijke middleware:
 * - leest cookie skillval_token
 * - decodeert de JWT payload client-side zonder verify (alleen base64 decode)
 * - bepaalt op basis van role waar iemand thuis hoort
 * - beschermt dashboards en assessment routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Laat bepaalde paden met rust (assets, login, api calls)
  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  // Haal onze JWT uit de cookie
  const token = request.cookies.get("skillval_token")?.value;
  const decoded = parseToken(token);

  // role komt direct uit de JWT payload (bv. "candidate", "assessor", "coach")
  const role = decoded?.role ? String(decoded.role) : undefined;

  // ROOT "/"
  // - Als we een geldige role hebben: stuur direct door naar zijn/haar dashboard.
  // - Als we geen token hebben maar we zitten in local dev: stuur naar candidate dashboard,
  //   zodat designers en assessoren kunnen kijken zonder eerst in te loggen.
  // - Anders: stuur naar /login
  if (pathname === "/") {
    if (role && dashboardByRole[role]) {
      return buildRedirect(request, dashboardByRole[role]);
    }
    if (!token && isLocalEnv) {
      return buildRedirect(request, dashboardByRole["candidate"]);
    }
    return buildRedirect(request, "/login");
  }

  // Check of de route beschermd is
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtected) {
    // Productiepad: als er een token is met een bekende role -> toegang
    if (role && dashboardByRole[role]) {
      return NextResponse.next();
    }

    // Local dev fallback: als er geen token is maar we zitten in 'local',
    // laat gewoon door zodat je de UI kan zien zonder echte auth.
    if (!token && isLocalEnv) {
      return NextResponse.next();
    }

    // Geen geldige toegang? -> naar login
    return buildRedirect(request, "/login");
  }

  // Alle andere routes laten we door.
  return NextResponse.next();
}

/**
 * Next.js config voor middleware:
 * Dit bepaalt voor welke routes middleware draait.
 *
 * - "/"                  root landing
 * - "/login"             login route
 * - "/dashboard/*"       kandidaat/coach/assessor dashboards
 * - "/assessment/*"      assessor mobile capture view
 */
export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/assessment/:path*"],
};
