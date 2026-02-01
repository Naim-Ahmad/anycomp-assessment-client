import { MainContent } from "@/components/services/register/main-content";
import { PricingAside } from "@/components/services/register/pricing-aside";

export default function RegisterCompanyPage() {
  return (
    <div className="grid grid-cols-[1fr_360px] gap-6">
      <MainContent />
      <PricingAside />
    </div>
  );
}
