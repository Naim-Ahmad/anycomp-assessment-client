import Filters from "@/components/home/Filters";
import ServiceGrid from "@/components/home/ServiceGrid";
import Navbar from "@/components/layout/Navbar";
import { HomeIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-6 py-10">
        {/* Breadcrumb */}
        <div className="mb-2 text-sm text-muted-foreground flex items-center gap-1">
          <span>
            <HomeIcon size={14} />
          </span>
          <span className="mx-2">/</span>
          Specialists
          <span className="mx-2">/</span>
          Register a New Company
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-foreground">
          Register a New Company
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Get Your Company Registered with a Trusted Specialists
        </p>

        {/* Filters */}
        <div className="mt-6">
          <Filters />
        </div>

        {/* Grid */}
        <div className="mt-8">
          <ServiceGrid />
        </div>
      </main>
    </div>
  );
}
