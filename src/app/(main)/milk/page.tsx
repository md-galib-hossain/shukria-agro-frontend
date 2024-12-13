/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import React, { useCallback, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useCowTableColumns } from "./components/CowTable/useCowTableColumns";
// import CreateCow from "./components/CreateCow/CreateCow";
// import { useGetAllCowsQuery } from "@/redux/api/cowApi";

// import { useProcessedCowData } from "./hooks/useProcessedCowTable";
// import DebouncedSearchInput from "@/components/ReUsableSearchField.tsx/DebouncedSearchInput";
// import { PaginationWithLinks } from "@/components/ui/pagination-withlinks";
import { DataTable } from "@/components/ReusableDataTable/data-table";
// import CowStats from "./components/CowStats/CowStats";
import { useCowMilkTableColumns } from "./components/MilkTable/useCowMilkTableColumns";
import { useState } from "react";
import { useGetAllCowsWithoutSpecificQuery } from "@/redux/api/cowApi";
import SelectCowPopover from "@/components/SelectCowPopover/SelectCowPopover";
import { useGetAllMilkQuery } from "@/redux/api/milkApi";

const cowMilkData = [
  {
    cowId: "COW001",
    createdAt: "2024-12-05",
    morningCollection: 10,
    eveningCollection: 8,
    totalYield: 18
  },
  {
    cowId: "COW002",
    createdAt: "2024-12-05",
    morningCollection: 12,
    eveningCollection: 10,
    totalYield: 22

  },
  {
    cowId: "COW001",
    createdAt: "2024-12-06",
    morningCollection: 11,
    eveningCollection: 9,
    totalYield: 20

  },
  {
    cowId: "COW003",
    createdAt: "2024-12-05",
    morningCollection: 9,
    eveningCollection: 7,
    totalYield: 16

  },
  {
    cowId: "COW002",
    createdAt: "2024-12-06",
    morningCollection: 10,
    eveningCollection: 9,
    totalYield: 19

  },
  {
    cowId: "COW001",
    createdAt: "2024-12-07",
    morningCollection: 10,
    eveningCollection: 8,
    totalYield: 18

  },
  {
    cowId: "COW003",
    createdAt: "2024-12-06",
    morningCollection: 8,
    eveningCollection: 7,
    totalYield: 15

  },
  {
    cowId: "COW002",
    createdAt: "2024-12-07",
    morningCollection: 11,
    eveningCollection: 10,
    totalYield: 21

  },
];

const Milk = () => {
  const [selectedCowValue, setSelectedCowValue] = useState<string | undefined>(undefined);

  const { data: allMilk, isLoading: loadingAllMilk } = useGetAllMilkQuery({});
  if(!loadingAllMilk){
    console.log({allMilk})
  }
  const { data: allCows, isLoading: loadingAllCows } = useGetAllCowsWithoutSpecificQuery(undefined);
  const processedCows =
    allCows?.map((cow: any) => ({
      value: cow._id,
      label: `${cow.name} - ${cow.cowId}`,
    })) || [];

    const processedMilk = allMilk?.milk?.map((milk)=> ({
      cowId: milk?.cowOID?.cowId,
      morningCollection: milk.morningYield,
      date: milk.date,
      eveningCollection: milk.eveningYield,
      totalYield: milk.totalYield

    }))
  // const searchParams = useSearchParams();
  // const page = parseInt(searchParams.get("page") || "1");
  // const limit = parseInt(searchParams.get("limit") || "5");
  // const [searchTerm, setSearchTerm] = useState<string>("");

  // const query: Record<string, string | number | Date> = searchTerm
  //   ? { searchTerm }
  //   : {};

  // const { data, isLoading, isError } = useGetAllCowsQuery({
  //   page,
  //   limit,
  //   ...query,
  // });
  // const processedData = useProcessedCowData(data?.cows || []);
  const [selectedCowId, setSelectedCowId] = useState<string | null>(null);

  const columns = useCowMilkTableColumns(setSelectedCowId);

  // const handleSearch = useCallback((query: string) => {
  //   setSearchTerm(query);
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Failed to load data</p>;
console.log({processedMilk})
  return (
    <div className="container mx-auto space-y-6">
    <div className="py-10 space-y-6 bg-secondary px-10 rounded-2xl">
      <div className="flex justify-between items-center">
      <SelectCowPopover
              label="View For Single Cow"
              selectedValue={selectedCowValue}
              onSelect={(value) => {
                setSelectedCowValue(value);
                // setValue("cowOID", value);
              }}
              options={processedCows}
            />
      </div>
      {!selectedCowId && !loadingAllCows ? (
        <>
          <DataTable columns={columns} data={processedMilk} />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Milk Data for {selectedCowId}</h2>
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg"
              onClick={() => setSelectedCowId(null)}
            >
              Back to All Cows
            </button>
          </div>
          {/* <DataTable columns={specificCowColumns} data={filteredData} /> */}
          full details
        </>
      )}
    </div>
  </div>
  );
};

export default Milk;
