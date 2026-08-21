import { User, UserCircle, LogOut } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserButton = () => {
    const { data: session } = useSession();

    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full p-2">
            <User/>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-64 rounded-xl p-2"
        >
          {!session ? (
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuLabel className="py-3">
                <p className="font-semibold">{session.user?.name}</p>
                <p className="text-muted-foreground text-xs">
                  {session.user?.email}
                </p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
}

export default UserButton;