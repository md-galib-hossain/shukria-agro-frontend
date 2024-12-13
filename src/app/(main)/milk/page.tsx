// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// // import React, { useCallback, useState } from "react";
// // import { useSearchParams } from "next/navigation";
// // import { useCowTableColumns } from "./components/CowTable/useCowTableColumns";
// // import CreateCow from "./components/CreateCow/CreateCow";
// // import { useGetAllCowsQuery } from "@/redux/api/cowApi";

// // import { useProcessedCowData } from "./hooks/useProcessedCowTable";
// // import DebouncedSearchInput from "@/components/ReUsableSearchField.tsx/DebouncedSearchInput";
// // import { PaginationWithLinks } from "@/components/ui/pagination-withlinks";
// import { DataTable } from "@/components/ReusableDataTable/data-table";
// // import CowStats from "./components/CowStats/CowStats";
// import { useCowMilkTableColumns } from "./components/MilkTable/useCowMilkTableColumns";
// import { useState } from "react";
// import { useGetAllCowsWithoutSpecificQuery } from "@/redux/api/cowApi";
// import SelectCowPopover from "@/components/SelectCowPopover/SelectCowPopover";
// import { useGetAllMilkQuery } from "@/redux/api/milkApi";



// const Milk = () => {
//   const [selectedCowValue, setSelectedCowValue] = useState<string | undefined>(undefined);

//   const { data: allMilk, isLoading: loadingAllMilk } = useGetAllMilkQuery({});
//   if(!loadingAllMilk){
//     console.log({allMilk})
//   }
//   const { data: allCows, isLoading: loadingAllCows } = useGetAllCowsWithoutSpecificQuery(undefined);
//   const processedCows =
//     allCows?.map((cow: any) => ({
//       value: cow._id,
//       label: `${cow.name} - ${cow.cowId}`,
//     })) || [];

//     const processedMilk = allMilk?.milk?.map((milk)=> ({
//       cowId: milk?.cowOID?.cowId,
//       morningCollection: milk.morningYield,
//       date: milk.date,
//       eveningCollection: milk.eveningYield,
//       totalYield: milk.totalYield

//     }))
//   // const searchParams = useSearchParams();
//   // const page = parseInt(searchParams.get("page") || "1");
//   // const limit = parseInt(searchParams.get("limit") || "5");
//   // const [searchTerm, setSearchTerm] = useState<string>("");

//   // const query: Record<string, string | number | Date> = searchTerm
//   //   ? { searchTerm }
//   //   : {};

//   // const { data, isLoading, isError } = useGetAllCowsQuery({
//   //   page,
//   //   limit,
//   //   ...query,
//   // });
//   // const processedData = useProcessedCowData(data?.cows || []);
//   const [selectedCowId, setSelectedCowId] = useState<string | null>(null);

//   const columns = useCowMilkTableColumns(setSelectedCowId);

//   // const handleSearch = useCallback((query: string) => {
//   //   setSearchTerm(query);
//   // }, []);

//   // if (isLoading) return <p>Loading...</p>;
//   // if (isError) return <p>Failed to load data</p>;
// console.log({processedMilk})
//   return (
//     <div className="container mx-auto space-y-6">
//     <div className="py-10 space-y-6 bg-secondary px-10 rounded-2xl">
//       <div className="flex justify-between items-center">
//       <SelectCowPopover
//               label="View For Single Cow"
//               selectedValue={selectedCowValue}
//               onSelect={(value) => {
//                 setSelectedCowValue(value);
//                 // setValue("cowOID", value);
//               }}
//               options={processedCows}
//             />
//       </div>
//       {!selectedCowId && !loadingAllCows ? (
//         <>
//           <DataTable columns={columns} data={processedMilk} />
//         </>
//       ) : (
//         <>
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Milk Data for {selectedCowId}</h2>
//             <button
//               className="px-4 py-2 bg-primary text-white rounded-lg"
//               onClick={() => setSelectedCowId(null)}
//             >
//               Back to All Cows
//             </button>
//           </div>
//           {/* <DataTable columns={specificCowColumns} data={filteredData} /> */}
//           full details
//         </>
//       )}
//     </div>
//   </div>
//   );
// };

// export default Milk;


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/ReusableDataTable/data-table";
import { useCowMilkTableColumns } from "./components/MilkTable/useCowMilkTableColumns";
import { useState } from "react";
import { useGetAllCowsWithoutSpecificQuery } from "@/redux/api/cowApi";
import SelectCowPopover from "@/components/SelectCowPopover/SelectCowPopover";
import { useGetAllMilkQuery } from "@/redux/api/milkApi";

// Function to aggregate milk data by month and cow
const aggregateMilkData = (milkData: any[]) => {
  return milkData.reduce((acc: any, milk: any) => {
    // Extract year and month from the date
    const date = new Date(milk.date);
    const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

    // Create a unique key for each cow and month
    const key = `${milk.cowId}-${yearMonth}`;

    // Check if the key exists, if not initialize it
    if (!acc[key]) {
      acc[key] = {
        cowId: milk.cowId,
        date: yearMonth, // Use year-month as the date
        morningCollection: 0,
        eveningCollection: 0,
        totalYield: 0,
      };
    }

    // Aggregate the values
    acc[key].morningCollection += milk.morningCollection;
    acc[key].eveningCollection += milk.eveningCollection;
    acc[key].totalYield += milk.totalYield;

    return acc;
  }, {});
};

// Convert the aggregated data back to an array
const getAggregatedDataArray = (milkData: any[]) => {
  const aggregatedData = aggregateMilkData(milkData);
  return Object.values(aggregatedData).map((item: any) => ({
    ...item,
    morningCollection: parseFloat(item.morningCollection.toFixed(2)),
    eveningCollection: parseFloat(item.eveningCollection.toFixed(2)),
    totalYield: parseFloat(item.totalYield.toFixed(2)),
  }));
};

const Milk = () => {
  const [selectedCowValue, setSelectedCowValue] = useState<string | undefined>(undefined);

  const { data: allMilk, isLoading: loadingAllMilk } = useGetAllMilkQuery({});
  if (!loadingAllMilk) {
    console.log({ allMilk });
  }
  const { data: allCows, isLoading: loadingAllCows } = useGetAllCowsWithoutSpecificQuery(undefined);
  const processedCows =
    allCows?.map((cow: any) => ({
      value: cow._id,
      label: `${cow.name} - ${cow.cowId}`,
    })) || [];

  const processedMilk = allMilk?.milk?.map((milk: any) => ({
    cowId: milk?.cowOID?.cowId,
    morningCollection: milk.morningYield,
    date: milk.date,
    eveningCollection: milk.eveningYield,
    totalYield: milk.totalYield,
  }));

  const aggregatedMilkData = processedMilk ? getAggregatedDataArray(processedMilk) : [];

  const [selectedCowId, setSelectedCowId] = useState<string | null>(null);

  const columns = useCowMilkTableColumns(setSelectedCowId);

  return (
    <div className="container mx-auto space-y-6">
      <div className="py-10 space-y-6 bg-secondary px-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <SelectCowPopover
            label="View For Single Cow"
            selectedValue={selectedCowValue}
            onSelect={(value) => {
              setSelectedCowValue(value);
            }}
            options={processedCows}
          />
        </div>
        {!selectedCowId && !loadingAllCows ? (
          <>
            <DataTable columns={columns} data={aggregatedMilkData} />
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
