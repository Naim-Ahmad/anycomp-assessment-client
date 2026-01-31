"use client";

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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatusBadge } from "./status-badge";

type Service = {
  id: number;
  service: string;
  price: string;
  purchases: number;
  duration: string;
  approvalStatus: "Approved" | "Under Review" | "Rejected";
  publishStatus: "Published" | "Not Published";
};

const MOCK_DATA: Service[] = [
  {
    id: 1,
    service: "Incorporation of a new company",
    price: "RM 2,000",
    purchases: 20,
    duration: "3 Days",
    approvalStatus: "Approved",
    publishStatus: "Published",
  },
  {
    id: 2,
    service: "Incorporation of a new company",
    price: "RM 2,000",
    purchases: 0,
    duration: "1 Day",
    approvalStatus: "Under Review",
    publishStatus: "Published",
  },
  {
    id: 3,
    service: "Incorporation of a new company",
    price: "RM 2,000",
    purchases: 431,
    duration: "14 Days",
    approvalStatus: "Approved",
    publishStatus: "Not Published",
  },
  {
    id: 4,
    service: "Incorporation of a new company",
    price: "RM 2,000",
    purchases: 0,
    duration: "7 Days",
    approvalStatus: "Under Review",
    publishStatus: "Published",
  },
  {
    id: 5,
    service: "Incorporation of a new company",
    price: "RM 2,000",
    purchases: 1283,
    duration: "4 Days",
    approvalStatus: "Rejected",
    publishStatus: "Not Published",
  },
];

export function SpecialistsTable() {
  const [tab, setTab] = useState("all");
  const router = useRouter();

  return (
    <div className="space-y-4 rounded-lg bg-white">
      {/* Tabs + Actions */}
      <div className="flex items-end justify-between border-b-2">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-auto  bg-transparent p-0" variant="line">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Input
          placeholder="Search Services"
          className=" bg-[#F1F1F1]
      h-8 w-[220px]
      rounded-[3px]
      border border-border
      text-sm
    "
        />

        <div className="flex gap-2">
          <Button
            className="
        h-8 rounded-[4px]
        bg-primary px-4 text-sm
        text-primary-foreground
        hover:opacity-90
      "
          >
            Create
          </Button>

          <Button
            variant="outline"
            className="
        h-8 rounded-[4px]
        px-4 text-sm
      "
          >
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-b">
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
                className="text-xs font-medium uppercase text-muted-foreground"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {MOCK_DATA.map((item) => (
            <TableRow key={item.id} className="border-b last:border-b-0">
              <TableCell className="py-3">
                <Checkbox className="h-3.5 w-3.5 rounded-[3px]" />
              </TableCell>

              <TableCell className="py-3 text-sm font-medium text-brand-text">
                Incorporation of a new company
              </TableCell>

              <TableCell className="py-3 text-sm">RM 2,000</TableCell>
              <TableCell className="py-3 text-sm">20</TableCell>

              <TableCell className="py-3">
                <StatusBadge type="Approved" />
              </TableCell>

              <TableCell className="py-3">
                <StatusBadge type="Published" />
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-md p-1 hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/dashboard/specialists/${item.id}/edit`)
                      }
                      className="flex items-center gap-2"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => console.log("Delete", item.id)}
                      className="flex items-center gap-2 text-red-600 focus:text-red-600"
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

      {/* Pagination (static) */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm">
        <button className="text-muted-foreground">Previous</button>

        <button className="h-5 w-5 bg-primary text-white rounded-full">
          1
        </button>

        <button className="h-5 w-5 rounded-full text-muted-foreground">
          2
        </button>

        <button className="text-muted-foreground">Next</button>
      </div>
    </div>
  );
}
