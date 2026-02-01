import ServiceCard from "./ServiceCard";

const services = Array.from({ length: 12 });

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((_, index) => (
        <ServiceCard key={index} />
      ))}
    </div>
  );
}
