import { adminAuth } from "@/lib/firebase/admin";
import { LevelType, TierType } from "@/typings/data";
import { createDocInCollection } from "@/utils/firestoreUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");
  const tier = req.nextUrl.searchParams.get("tier");
  const level = req.nextUrl.searchParams.get("level");

  const result = await createDocInCollection("wineries", uid as string, {
    tier: tier as TierType,
    level: level as LevelType,
  });

  return NextResponse.json({ data: result });
}
