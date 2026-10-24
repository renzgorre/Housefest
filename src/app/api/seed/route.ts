import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

// GET /api/seed — seeds the 4 default teams (run once)
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const teams = [
    { name: "MUTIEN", color: "white" },
    { name: "BENILDE", color: "black" },
    { name: "JAIME", color: "lime" },
    { name: "MIGUEL", color: "darkgreen" },
  ];

  for (const team of teams) {
    await prisma.team.upsert({
      where: { name: team.name },
      update: {},
      create: team,
    });
  }

  return NextResponse.json({ ok: true, message: "Teams seeded." });
}
