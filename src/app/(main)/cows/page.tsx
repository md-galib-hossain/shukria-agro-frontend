"use client";
import React, { useMemo } from "react";
import { useGetAllCowsQuery } from "@/redux/api/cowApi";
import CowTable from "./components/CowTable";

const Cows = () => {
  const page = 1;
  const limit = 5;
  const query = {};

  // Fetch data with API hook
  const { data, isLoading, isError } = useGetAllCowsQuery({
    page,
    limit,
    ...query,
  });

  // Memoize data to avoid re-renders when data hasn't changed
  const cowsData = useMemo(() => data?.cows || [], [data]);

  // Conditional rendering for loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data</p>;

  return (
    <div className="mx-auto py-10 min-w-full">
      <CowTable cows={cowsData}/>{" "}
    
    </div>
  );
};

export default Cows;
