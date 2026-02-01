"use client";

import { EditServiceDrawer } from "@/components/services/register/edit-service-drawer";
import { MainContent } from "@/components/services/register/main-content";
import { PricingAside } from "@/components/services/register/pricing-aside";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterCompanyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isEdit = searchParams.get("edit") === "true";
  const id = searchParams.get("id");

  const openEdit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("edit", "true");

    if (id) {
      params.set("id", id);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const closeEdit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("edit");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between mb-3">
        <h1 className="font-heading text-[18px] font-bold text-brand-text">
          Register a New Company | Private Limited - Sdn Bhd
        </h1>

        <div className="flex gap-2">
          <Button variant="outline" onClick={openEdit}>
            Edit
          </Button>
          <Button>Publish</Button>
        </div>
      </div>

      {/* Page Content */}
      <div className="grid grid-cols-[1fr_360px] gap-6">
        <MainContent />
        <PricingAside />
      </div>

      {/* Edit Drawer (URL-driven) */}
      <EditServiceDrawer open={isEdit} onClose={closeEdit} />
    </>
  );
}
