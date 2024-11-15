"use client";

import React, { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation"; // Next.js hook for search params
import { toast } from "@/hooks/use-toast";
import CowTable from "./components/CowTable/CowTable";
import { useCowTableColumns } from "./components/CowTable/useCowTableColumns";
import CreateCow from "./components/CreateCow/CreateCow";
import {
  useGetAllCowsQuery,
  useSoftDeleteCowMutation,
} from "@/redux/api/cowApi";

import { useProcessedCowData } from "./hooks/useProcessedCowTable";
import DebouncedSearchInput from "@/components/ReUsableSearchField.tsx/DebouncedSearchInput";
import { PaginationWithLinks } from "@/components/ui/pagination-withlinks";

const Cows = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const query: Record<string, string | number | Date> = searchTerm
    ? { searchTerm }
    : {};

  const { data, isLoading, isError } = useGetAllCowsQuery({ page, limit,...query });
  const processedData = useProcessedCowData(data?.cows || []);

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

  const columns = useCowTableColumns(handleDelete);

  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data</p>;

  console.log(query);
  console.log("Current page:", page);
  console.log("Items per page limit:", limit);

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <CreateCow />
        <DebouncedSearchInput
          onSearch={handleSearch}
          className="w-full max-w-xs"
        />
      </div>
      <CowTable columns={columns} cows={processedData} />

      <PaginationWithLinks
        page={page}
        limit={limit}
        totalCount={data?.meta?.total as number}
        pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 25, 50] }}
      />
    </div>
  );
};

export default Cows;
