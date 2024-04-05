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
      .then(async () => {
        redirect("/");
      })
      .catch((error) => {});
  };

  return (
    <Container
      px="large"
      py="small"
      intent="flexRowBetween"
      className={classNames(
        className,
        "bg-transparent",
        "backdrop-blur-sm",
        "min-h-[80px]",
        "max-h-[80px]"
      )}
    >
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
