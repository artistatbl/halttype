"use client";

import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { getDisplayUser } from "@/lib/user-utils";
import { UserDropdownTrigger } from "./UserDropdownTrigger";
import { UserDropdownMenu } from "./UserDropdownMenu";
import { SignInButton } from "./SignInButton";

interface UserDropdownProps {
  className?: string;
}

export function UserDropdown({ className }: UserDropdownProps) {
  const { data: session } = useSession();
  const displayUser = getDisplayUser(session?.user);

  return (
    <div className={cn("relative", className)}>
      {session ? (
        <DropdownMenu>
          <UserDropdownTrigger user={displayUser} />
          <UserDropdownMenu user={displayUser} />
        </DropdownMenu>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
