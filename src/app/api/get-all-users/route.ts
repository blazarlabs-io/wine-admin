import { adminAuth } from "@/lib/firebase/admin";
import { ListUsersResult } from "firebase-admin/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const result: ListUsersResult = await adminAuth.listUsers();
  console.log(result);
  return NextResponse.json({ data: result });
}
