import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center max-w-[1400px] mx-auto p-4">
      <ul className="flex gap-4 items-center">
        <li className="font-bold text-2xl">
          <Link href="/">Medium</Link>
        </li>
        <li className="flex items-center gap-2">
          <Input className="rounded-full" type="text" placeholder=" Search" />
        </li>
        <li>
          <Link href="/my-stories">Stories</Link>
        </li>
        <li>
          <Link href="/post">Write</Link>
        </li>
      </ul>
      <ul className="flex gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </ul>
    </header>
  );
};

export default Header;
