import { Container, Text } from "@/components";
import { UserAvatarProps } from "@/typings/components";
import Image from "next/image";

export const UserAvatar = ({ imageUrl, initials }: UserAvatarProps) => {
  return (
    <Container intent="flexRowCenter">
      {imageUrl ? (
        <Image src={imageUrl} alt={imageUrl} />
      ) : (
        <div className="border-2 border-primary-light flex items-center justify-center rounded-full h-[48px] w-[48px]">
          <div className="flex items-center justify-center rounded-full bg-primary-light h-[36px] w-[36px]">
            <Text intent="h5">{initials.toUpperCase()}</Text>
          </div>
        </div>
      )}
    </Container>
  );
};
