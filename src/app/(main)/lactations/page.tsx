"use client";

import React, { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLactationTableColumns } from "./components/LactationTable/useLactationTableColumns";
import CreateLactation from "./components/CreateLactation/CreateLactation";
import { useGetAllLactationsQuery } from "@/redux/api/lactationApi";
import DebouncedSearchInput from "@/components/ReUsableSearchField.tsx/DebouncedSearchInput";
import { PaginationWithLinks } from "@/components/ui/pagination-withlinks";
import { DataTable } from "@/components/ReusableDataTable/data-table";
import { useProcessedLactationData } from "./hooks/useProcessedLactationTable";

const LactationPage = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const query: Record<string, string | number | Date> = searchTerm
    ? { searchTerm }
    : {};

  const { data, isLoading, isError } = useGetAllLactationsQuery({ page, limit, ...query });
  const processedData = useProcessedLactationData(data?.lactations || []);

  const columns = useLactationTableColumns();

  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data</p>;

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <CreateLactation />
        <DebouncedSearchInput
          onSearch={handleSearch}
          className="w-full max-w-xs"
        />
      </div>
      <DataTable columns={columns} data={processedData} />
      <PaginationWithLinks
        page={page}
        limit={limit}
        totalCount={data?.meta?.total as number}
        pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 25, 50] }}
      />
    </div>
  );
};

export default LactationPage;
