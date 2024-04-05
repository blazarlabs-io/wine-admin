import { deleteDocInCollection } from "@/utils/firestoreUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");

  const result = await deleteDocInCollection("wineries", uid as string);

  return NextResponse.json({ data: result });
}
