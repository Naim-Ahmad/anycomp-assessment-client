import { CompanySecretary } from "./company-secretary";
import { ImageSection } from "./image-section";
import { TextSection } from "./text-section";

export function MainContent() {
  return (
    <div className="space-y-6">
      <ImageSection />

      <TextSection title="Description" text="Describe your service here" />

      <TextSection
        title="Additional Offerings"
        text="Enhance your service by adding additional offerings"
      />

      <CompanySecretary />
    </div>
  );
}
