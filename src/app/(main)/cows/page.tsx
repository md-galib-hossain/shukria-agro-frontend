"use client";

import React, { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation"; // Next.js hook for search params
import { useCowTableColumns } from "./components/CowTable/useCowTableColumns";
import CreateCow from "./components/CreateCow/CreateCow";
import {
  useGetAllCowsQuery,
} from "@/redux/api/cowApi";

import { useProcessedCowData } from "./hooks/useProcessedCowTable";
import DebouncedSearchInput from "@/components/ReUsableSearchField.tsx/DebouncedSearchInput";
import { PaginationWithLinks } from "@/components/ui/pagination-withlinks";
import { DataTable } from "@/components/ReusableDataTable/data-table";

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




  const columns = useCowTableColumns();

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
      <DataTable columns={columns} data={processedData} />;
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
