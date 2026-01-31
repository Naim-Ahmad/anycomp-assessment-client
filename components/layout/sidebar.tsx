"use client";

import { cn } from "@/lib/utils";
import {
  Briefcase,
  ClipboardList,
  FileText,
  HelpCircle,
  MessageSquare,
  PenTool,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Specialists", href: "/dashboard/specialists", icon: Briefcase },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Service Orders", href: "/dashboard/orders", icon: ClipboardList },
  { label: "eSignature", href: "/dashboard/esignature", icon: PenTool },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Invoices & Receipts", href: "/dashboard/invoices", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[260px] flex-col border-r bg-sidebar px-4 py-5">
      {/* Profile */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Profile
        </p>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-muted" />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">Gwen Lam</p>
            <p className="text-xs text-muted-foreground">
              ST Corp Holdings Sdn Bhd
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard label */}
      <p className="mb-2 text-xs font-medium text-muted-foreground">
        Dashboard
      </p>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-6 space-y-1">
        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <HelpCircle className="h-4 w-4" />
          Help
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
