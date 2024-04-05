import { deleteUser } from "@/utils/firebaseAuthUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const result = await deleteUser(
    req.nextUrl.searchParams.get("uid") as string
  );

  return NextResponse.json({ data: result });
}
