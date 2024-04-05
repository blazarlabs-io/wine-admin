import { adminAuth } from "@/lib/firebase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await adminAuth.createUser({
    email: "test@email.com",
    emailVerified: false,
    password: "secretPassword",
    displayName: "John Doe",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false,
  });

  return NextResponse.json({ data: result });
}
