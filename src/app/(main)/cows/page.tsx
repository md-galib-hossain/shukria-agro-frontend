"use client";
import { useGetAllCowsQuery } from "@/redux/api/cowApi";
import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

const Cows = () => {
  const page = 1;
  const limit = 5;
  const query = {};
  const { data, isLoading } = useGetAllCowsQuery({ page, limit, ...query });
  if (!isLoading) console.log(data);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data.cows} />
    </div>
  );
};

export default Cows;
