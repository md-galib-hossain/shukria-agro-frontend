"use client";

import { DataTable } from "@/components/ReusableDataTable/data-table";
import { PaginationWithLinks } from "@/components/ui/pagination-withlinks";
import { useGetAllVaccinesQuery } from "@/redux/api/vaccineApi";
import { useSearchParams } from "next/navigation";
import { useVaccineTableColumns } from "./components/VaccineTable/useVaccineTableColumns";
import CreateVaccine from "./components/CreateVaccine/CreateVaccine";
import { useCallback, useState } from "react";
import DebouncedSearchInput from "@/components/ReUsableSearchField.tsx/DebouncedSearchInput";

const VaccinePage = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  const query: Record<string, string | number | Date> = searchTerm
    ? { searchTerm }
    : {};
  const { data, isLoading } = useGetAllVaccinesQuery({ page, limit, ...query });
  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);
  const columns = useVaccineTableColumns();
  if (isLoading) return "loading...";
  console.log({ data });
  const tableData = data?.vaccines || [];
  return (
    <div className="container mx-auto py-10 space-y-6 bg-secondary px-10 rounded-2xl">
      <div className="flex justify-between items-center">
        <CreateVaccine />
        <DebouncedSearchInput
          onSearch={handleSearch}
          className="w-full max-w-xs text-primary focus:!ring-1 focus:!ring-primary"
        />
      </div>

      <DataTable columns={columns} data={tableData} />

      <PaginationWithLinks
        page={page}
        limit={limit}
        totalCount={data?.meta?.total || 0}
        pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 25, 50] }}
      />
    </div>
  );
};

export default VaccinePage;
