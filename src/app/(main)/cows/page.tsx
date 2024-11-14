/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useState } from "react";
import { Row } from "@tanstack/react-table";
import { toast } from "@/hooks/use-toast";
import CowTable from "./components/CowTable/CowTable";
import { useCowTableColumns } from "./components/CowTable/useCowTableColumns";
import CreateCow from "./components/CreateCow/CreateCow";
import { useSoftDeleteCowMutation } from "@/redux/api/cowApi";
import { useProcessedCowData } from "./hooks/useProcessedCowTable";
import ICow from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const Cows = () => {
  const page = 1;
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });
  const query: Record<string, any> = debouncedTerm
    ? { searchTerm: debouncedTerm }
    : {};
  const { processedData, isLoading, isError } = useProcessedCowData(
    page,
    limit
  );
  const [softDeleteCow] = useSoftDeleteCowMutation();

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await softDeleteCow(id);
        toast({ title: "Deleted" });
      } catch (error) {
        console.log(error);
      }
    },
    [softDeleteCow]
  );

  const handleRowSelection = useCallback(
    (row: Row<ICow>, isSelected: boolean) => {
      const cowId = row.original._id;
      console.log(
        isSelected ? "Selected Cow ID:" : "Deselected Cow ID:",
        cowId
      );
    },
    []
  );

  const handleSelectAll = useCallback(
    (isSelected: boolean, rows: Row<ICow>[]) => {
      rows.forEach((row: Row<ICow>) =>
        console.log(
          isSelected ? "Selected Cow ID:" : "Deselected Cow ID:",
          row.original._id
        )
      );
    },
    []
  );

  const columns = useCowTableColumns(
    handleDelete,
    handleRowSelection,
    handleSelectAll
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data</p>;

  return (
    <div className="container mx-auto py-10 space-y-6">
      <CreateCow />
      <CowTable columns={columns} cows={processedData} />

      <div className="w-[150px]">
      <Select defaultValue={"5"} onValueChange={(value) => console.log(value)}>
        <SelectTrigger>{"Cows per page"}</SelectTrigger>
        <SelectContent>
          {["5", "10", "15", "20"].map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>

    </div>
  );
};

export default Cows;
