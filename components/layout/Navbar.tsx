import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center gap-6 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="ANYCOMP"
            width={110}
            height={28}
            priority
          />
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-700">
          <Link href="#" className="hover:text-neutral-900">
            Register a company
          </Link>
          <Link href="#" className="hover:text-neutral-900">
            Appoint a Company Secretary
          </Link>
          <Link href="#" className="hover:text-neutral-900">
            Company Secretarial Services
          </Link>
          <Link href="#" className="hover:text-neutral-900">
            How Anycomp Works
          </Link>
        </nav>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative w-[260px]">
          <Input
            placeholder="Search for services"
            className="h-9 rounded-md pr-9 text-sm"
          />
          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 hover:bg-neutral-100">
            <MessageSquare size={18} />
          </button>

          <button className="rounded-full p-2 hover:bg-neutral-100">
            <Bell size={18} />
          </button>

          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 overflow-hidden rounded-full bg-neutral-200 focus:outline-none">
                <Image src="/avatar.jpg" alt="User" width={32} height={32} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/specialists"
                  className="flex items-center gap-2"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <LogOut size={16} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
