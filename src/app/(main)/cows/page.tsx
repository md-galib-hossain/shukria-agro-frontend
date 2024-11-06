"use client"
import React, { useMemo, useCallback } from "react";
import { useGetAllCowsQuery } from "@/redux/api/cowApi";

import { Cow, ProcessedCow, useCowTableColumns } from "./components/columns";
import { Row } from "@tanstack/react-table";
import { DataTable } from "./components/data-table";

const Dashboard = () => {
  const page = 1;
  const limit = 5;

  const { data, isLoading, isError } = useGetAllCowsQuery({ page, limit });
  const processedData : ProcessedCow= useMemo(() => 
    (data?.cows || []).map((cow) => ({
      _id: cow._id,
      name: cow.name,
      cowId: cow.cowId,
      sex: cow.sex,
      category: cow?.categoryId?.name,
      dateOfBirth: cow.dateOfBirth,
      sire: cow.sire || null,
      dam: cow.dam || null,
      currentPregnancyStatus: cow.currentPregnancyStatus ?? null,
      vaccinations: cow.vaccinations?.map((vaccine) => ({
        name: vaccine.vaccineId.name,
        interval: vaccine.vaccineId.interval,
        info: vaccine.vaccineId.info,
        vaccinatedDate: vaccine.vaccinatedDate,
        nextVaccinationDate: vaccine.nextVaccinationDate,
      })) || [],
    }))
  , [data]);
  

  const handleUpdate = useCallback((id: string) => console.log("Updating cow with ID:", id), []);
  const handleDelete = useCallback((id: string) => console.log("Deleting cow with ID:", id), []);

  const handleRowSelection = useCallback((row:Row<Cow>, isSelected: boolean) => {
    const cowId = row.original._id;
    console.log(isSelected ? "Selected Cow ID:" : "Deselected Cow ID:", cowId);
  }, []);

  const handleSelectAll = useCallback((isSelected: boolean, rows:Row<Cow>[]) => {
    rows.forEach((row:Row<Cow>) => console.log(isSelected ? "Selected Cow ID:" : "Deselected Cow ID:", row.original._id));
  }, []);

  const columns = useCowTableColumns(handleUpdate, handleDelete, handleRowSelection, handleSelectAll);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data</p>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={processedData} />
    </div>
  );
};

export default Dashboard;
