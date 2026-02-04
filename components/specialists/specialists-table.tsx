"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetSpecialistsQuery } from "@/store/api/specialistsApi";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { StatusBadge } from "./status-badge";

const PAGE_SIZE = 10;

export function SpecialistsTable() {
  const router = useRouter();

  const [tab, setTab] = useState<"all" | "drafts" | "published">("all");
  const [page, setPage] = useState(1);

  // search states
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading, isError } = useGetSpecialistsQuery({
    page,
    limit: PAGE_SIZE,
    tab,
    search: debouncedSearch,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const specialists = data?.data ?? [];
  const totalPages = data?.meta.totalPages ?? 1;

  return (
    <div className="space-y-4 rounded-lg bg-white">
      {/* Tabs */}
      <div className="flex items-end justify-between border-b-2">
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v as typeof tab);
            setPage(1);
          }}
        >
          <TabsList className="h-auto bg-transparent p-0" variant="line">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <Input
          placeholder="Search Services"
          className="h-8 w-[220px] rounded-[3px] bg-[#F1F1F1] text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <Link href="/dashboard/specialists/create">
            <Button className="h-8 px-4 text-sm">Create</Button>
          </Link>
          <Button variant="outline" className="h-8 px-4 text-sm">
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            {[
              "Service",
              "Price",
              "Purchases",
              "Approval Status",
              "Publish Status",
              "Action",
            ].map((h) => (
              <TableHead
                key={h}
                className="text-xs uppercase text-muted-foreground"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Loading */}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={7} className="py-6 text-center">
                Loading…
              </TableCell>
            </TableRow>
          )}

          {/* Error */}
          {isError && (
            <TableRow>
              <TableCell colSpan={7} className="py-6 text-center text-red-500">
                Failed to load specialists
              </TableCell>
            </TableRow>
          )}

          {/* Empty state */}
          {!isLoading && !isError && specialists.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                No specialists found
              </TableCell>
            </TableRow>
          )}

          {/* Data */}
          {!isLoading &&
            !isError &&
            specialists.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox className="h-3.5 w-3.5" />
                </TableCell>

                <TableCell className="text-sm font-medium">
                  {item.title}
                </TableCell>

                <TableCell className="text-sm">{item.final_price}</TableCell>

                <TableCell className="text-sm">{item.purchases}</TableCell>

                <TableCell>
                  <StatusBadge type={item.verification_status} />
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded-md">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(
                            `/dashboard/specialists/create?edit=true&id=${item.id}`,
                          )
                        }
                        className="flex gap-2"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="flex gap-2 text-red-600"
                        onClick={() => console.log("Delete", item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-3 text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="disabled:opacity-40"
        >
          Previous
        </button>

        <span className="font-medium">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
