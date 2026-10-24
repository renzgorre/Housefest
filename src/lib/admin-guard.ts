import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// An admin is either signed in with a Google account listed in ADMIN_EMAILS,
// or has the admin_auth cookie set by POST /api/admin after entering
// ADMIN_PASSWORD. This mirrors the two ways the admin panel lets people in.
export async function isAdminRequest(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  if (session?.user?.isAdmin) return true;

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const provided = (await cookies()).get("admin_auth")?.value;
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Returns a 401 response for non-admins, or null when the request may proceed.
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdminRequest()) return null;
  return NextResponse.json({ error: "Admin only" }, { status: 401 });
}
