import { adminAuth } from "@/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const password = req.nextUrl.searchParams.get("password");

  const result = await adminAuth.createUser({
    email: email as string,
    emailVerified: false,
    password: password as string,
    disabled: false,
  });

  return NextResponse.json({ data: result });
}
