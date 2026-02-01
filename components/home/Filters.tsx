import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Filters() {
  return (
    <div className="flex items-center gap-3">
      {/* Price Select */}
      <Select>
        <SelectTrigger
          className=" h-8
    w-[120px]
    rounded-md
    border-neutral-200
    px-3
    text-sm
    font-medium
    text-neutral-700
    shadow-none"
        >
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low-high">Low to High</SelectItem>
          <SelectItem value="high-low">High to Low</SelectItem>
          <SelectItem value="under-1000">Under RM 1,000</SelectItem>
          <SelectItem value="1000-2000">RM 1,000 – RM 2,000</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Select */}
      <Select>
        <SelectTrigger
          className=" h-8
    w-[120px]
    rounded-md
    border-neutral-200
    px-3
    text-sm
    font-medium
    text-neutral-700
    shadow-none"
        >
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevant">Most Relevant</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="rating">Best Rated</SelectItem>
          <SelectItem value="price">Price</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
