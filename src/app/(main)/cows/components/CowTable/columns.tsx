/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";


export const SortableHeader = ({ column, title }: { column: any; title: string }) => (
  <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
    {title}
    <ArrowUpDown
      className={column.getIsSorted() ? (column.getIsSorted() === "asc" ? "rotate-180" : "") : ""}
    />
  </Button>
);
