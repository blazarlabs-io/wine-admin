import { UserAvatarProps } from "@/typings/components";
import Image from "next/image";

export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <div>
      <Image src={user.photoURL as string} alt={user.displayName as string} />
    </div>
  );
};
