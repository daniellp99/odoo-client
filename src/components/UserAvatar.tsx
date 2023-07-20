import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage src={user.image!} alt={user.name!} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
