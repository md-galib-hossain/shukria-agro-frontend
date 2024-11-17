"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLactationTableColumns } from "./components/LactationTable/useLactationTableColumns";
import CreateLactation from "./components/CreateLactation/CreateLactation";
import { useGetAllLactationsQuery } from "@/redux/api/lactationApi";
import { PaginationWithLinks } from "@/components/ui/pagination-withlinks";
import { DataTable } from "@/components/ReusableDataTable/data-table";
import { useProcessedLactationData } from "./hooks/useProcessedLactationTable";
import { useGetAllCowsQuery } from "@/redux/api/cowApi";
import { ICow } from "@/types";
import LactationFilter from "./components/LactationTable/components/LactationFilter";

const LactationPage = () => {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const initialCowOID = searchParams.get("cowOID");

  const [selectedCowOID, setSelectedCowOID] = useState<string | undefined>(
    initialCowOID || undefined
  );

  const { data: cowsData, isLoading: loadingAllCows } = useGetAllCowsQuery({});

  const query = { page, limit, ...(selectedCowOID && { cowOID: selectedCowOID }) };
  const { data, isLoading, isError } = useGetAllLactationsQuery(query);

  const processedData = useProcessedLactationData(data?.lactations || []);
  const columns = useLactationTableColumns();

  const processedCows =
    cowsData?.cows?.map((cow: ICow) => ({
      value: cow._id,
      label: `${cow.name} - ${cow.cowId}`,
    })) || [];

  useEffect(() => {
    setSelectedCowOID(initialCowOID || undefined);
  }, [initialCowOID]);

  const handleCowSelect = (value: string) => {
    setSelectedCowOID(value);
  };

  const handleReset = () => {
    setSelectedCowOID(undefined);
  };

  if (loadingAllCows || isLoading) return <p>Loading data...</p>;
  if (isError) return <p>Failed to load lactation data. Please try again.</p>;

  return (
    <div className="container mx-auto py-10 space-y-6 bg-secondary px-10 rounded-2xl">
      <div className="flex justify-between items-center">
        <CreateLactation />

        <LactationFilter
          selectedCowOID={selectedCowOID}
          onCowSelect={handleCowSelect}
          onReset={handleReset}
          limit={limit}
          options={processedCows}
        />
      </div>

      <DataTable columns={columns} data={processedData} />

      <PaginationWithLinks
        page={page}
        limit={limit}
        totalCount={data?.meta?.total || 0}
        pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 25, 50] }}
      />
    </div>
  );
};

export default LactationPage;
