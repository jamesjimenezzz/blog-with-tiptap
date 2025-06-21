import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-gray-300/10 backdrop-blur-lg">
      <header className="flex justify-between items-center max-w-[1400px] mx-auto p-4">
        <ul className="flex gap-4 items-center">
          <li className="font-bold text-2xl">
            <Link href="/">TRYBLOGWEBSITE</Link>
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
    </div>
  );
};

export default Header;
