"use client";

import { cn } from "@/lib/utils";
import {
  Briefcase,
  ClipboardList,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  PenTool,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Specialists",
    href: "/dashboard/specialists",
    icon: Briefcase,
  },
  {
    label: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    label: "Service Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    label: "eSignature",
    href: "/dashboard/esignature",
    icon: PenTool,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    label: "Invoices & Receipts",
    href: "/dashboard/invoices",
    icon: FileText,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r bg-white">
      {/* Profile */}
      <div className="border-b p-4">
        <p className="text-sm font-medium">Gwen Lam</p>
        <p className="text-xs text-muted-foreground">
          ST Corp Holdings Sdn Bhd
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 space-y-1 border-t">
        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          <HelpCircle className="h-4 w-4" />
          Help
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
