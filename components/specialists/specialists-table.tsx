"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

  return (
    <div className="space-y-4 rounded-lg border bg-white p-4">
      {/* Tabs + Actions */}
      <div className="flex items-center justify-between">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button size="sm">Create</Button>
          <Button size="sm" variant="outline">
            Export
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-xs">
        <Input placeholder="Search Services" />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Service</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Purchases</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Approval Status</TableHead>
            <TableHead>Publish Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {MOCK_DATA.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">
                {item.service}
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.purchases}</TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell>
                <StatusBadge type={item.approvalStatus} />
              </TableCell>
              <TableCell>
                <StatusBadge type={item.publishStatus} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination (static) */}
      <div className="flex items-center justify-center gap-2 pt-4 text-sm">
        <Button variant="ghost" size="sm">
          Previous
        </Button>
        <Button size="sm">1</Button>
        <Button variant="ghost" size="sm">
          2
        </Button>
        <Button variant="ghost" size="sm">
          3
        </Button>
        <Button variant="ghost" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
}
