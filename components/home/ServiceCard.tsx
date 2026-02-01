import Image from "next/image";

export default function ServiceCard() {
  return (
    <div
      className="group rounded-xl 
  border border-neutral-100
  bg-white
  transition-shadow
  hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
        <Image
          src="/placeholder.jpg" // replace with real image
          alt="Service"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="space-y-1.5 p-4">
        <p className="text-xs text-muted-foreground">
          Adam Low – Company Secretary
        </p>

        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          Register your Company with the best Company Secretary in KL
        </h3>

        <p className="pt-1 text-sm font-semibold text-foreground">RM 1,600</p>
      </div>
    </div>
  );
}
