import { CompanySecretary } from "./company-secretary";
import { FormSection } from "./form-section";
import { ImageSection } from "./image-section";

export function MainContent() {
  return (
    <div className="space-y-8">
      <ImageSection />

      <FormSection
        title="Description"
        placeholder="Describe your service here"
      />

      <FormSection
        title="Additional Offerings"
        placeholder="Enhance your service by adding additional offerings"
      />

      <CompanySecretary />
    </div>
  );
}
