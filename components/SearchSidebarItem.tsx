"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Loader2, Search } from "lucide-react";

import Link from "next/link";
import { User } from "./User";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { getUsersByUsername } from "@/actions/mutations/user action/getUsersByUsername";
import { Skeleton } from "./ui/skeleton";
import { usePathname } from "next/navigation";

export default function SearchSidebarItem() {
  const [users, setUsers] = useState<any[] | null>();
  const [value, setvalue] = useState("");
  const [error, setError] = useState<string | null>();
  const [isFetching, setIsFetching] = useState(false);
  const debouncedValue = useDebounce(value);
  const pathname = usePathname();
  const [open, setopen] = useState(false);

  useEffect(() => {
    setUsers(null);

    if (debouncedValue.length !== 0) {
      const fetchUsers = async () => {
        setIsFetching(true);
        const { users: data, error } = await getUsersByUsername(debouncedValue);
        setIsFetching(false);
        if (error) {
          setError(error);
        } else {
          setError(null);
          setUsers(data);
        }
      };

      fetchUsers();
    }
  }, [debouncedValue]);

  const onOpenChange = () => {
    setopen((prev) => !prev);
    setTimeout(() => setvalue(""), 100);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger className="flex gap-x-3 text-lg text-neutral-400 hover:text-white items-center">
        <Search />
        Search
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Search Page</SheetTitle>
        </SheetHeader>
        <Input
          className="mt-2"
          placeholder="search..."
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
        {error && <div>{error}</div>}
        {isFetching && (
          <div className="flex items-center space-x-4 mt-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
        {users &&
          (users?.length === 0 ? (
            <div className="mt-4 text-neutral-400">No users found.</div>
          ) : (
            <div className="flex flex-col gap-y-2 mt-4">
              {users?.map((user: any) => (
                <Link
                  href={
                    pathname.includes("messages")
                      ? `/messages/${user.id}`
                      : `/profile/${user.id}`
                  }
                  key={user.id}
                  onClick={onOpenChange}
                >
                  <User user={user} />
                </Link>
              ))}
            </div>
          ))}
      </SheetContent>
    </Sheet>
  );
}
