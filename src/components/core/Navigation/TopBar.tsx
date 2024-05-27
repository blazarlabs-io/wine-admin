"use client";

import Image from "next/image";
import { Container } from "../Container";
import { Button } from "../Button";
import { classNames } from "@/utils/classNames";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export interface TopBarProps {
  className?: string;
}

export const TopBar = ({ className }: TopBarProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogOut = async () => {
    signOut(auth)
      .then(() => {
        router.replace("/sign-in");
      })
      .catch((error) => {});
  };

  return (
    <Container
      px="large"
      py="medium"
      intent="flexRowBetween"
      className={classNames(
        className,
        "bg-surface-light",
        "shadow-md",
        "backdrop-blur-sm",
        "min-h-[80px]",
        "max-h-[80px]",
        "rounded-b-md"
      )}
    >
      <Image
        src="/logo-blazarlabs.png"
        width={124}
        height={56}
        alt="logo"
        style={{ objectFit: "cover" }}
      />
      <Container intent="flexRowRight" gap="medium">
        <Button
          onClick={() => {
            if (!user) {
              router.push("/login");
            } else {
              handleLogOut();
            }
          }}
          intent="primary"
          size="medium"
        >
          {!user ? "Log in as winery owner" : "Log out"}
        </Button>
      </Container>
    </Container>
  );
};
