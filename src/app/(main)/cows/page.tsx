"use client";
import React, { useMemo, useCallback } from "react";
import {
  useGetAllCowsQuery,
  useSoftDeleteCowMutation,
} from "@/redux/api/cowApi";

import { Row } from "@tanstack/react-table";
import ICow from "@/types";
import { toast } from "@/hooks/use-toast";
import CowTable from "./components/CowTable/CowTable";
import { useCowTableColumns } from "./components/CowTable/useCowTableColumns";

const Dashboard = () => {
  const page = 1;
  const limit = 5;

  const { data, isLoading, isError } = useGetAllCowsQuery({ page, limit });
  const [softDeleteCow] = useSoftDeleteCowMutation();
  const processedData: ICow[] = useMemo(
    () =>
      (data?.cows || []).map((cow) => ({
        _id: cow._id,
        cowId: cow.cowId,
        name: cow.name,
        sex: cow.sex,
        categoryId: {
          _id: cow.categoryId?._id,
          name: cow.categoryId?.name,
          description: cow.categoryId?.description || "",
          isDeleted: cow.categoryId?.isDeleted || false,
          createdAt: cow.categoryId?.createdAt || new Date(),
          updatedAt: cow.categoryId?.updatedAt || new Date(),
        },
        dateOfBirth: cow.dateOfBirth,
        sire: cow.sire || null,
        dam: cow.dam || null,
        currentPregnancyStatus: cow.currentPregnancyStatus ?? false,
        vaccinations:
          cow.vaccinations?.map((vaccine) => ({
            vaccineId: vaccine.vaccineId,
            vaccinatedDate: vaccine.vaccinatedDate,
            nextVaccinationDate: vaccine.nextVaccinationDate,
            isDeleted: vaccine.isDeleted,
          })) || [],
        lactations: cow.lactations || [],
        pregnancyRecords: cow.pregnancyRecords || [],
        isDeleted: cow.isDeleted || false,
        createdAt: cow.createdAt || new Date(),
        updatedAt: cow.updatedAt || new Date(),
      })),
    [data]
  );

  // const handleUpdate = useCallback((id: string) => console.log("Updating cow with ID:", id), []);
  const handleDelete = useCallback(async (id: string) => {
    try {
      await softDeleteCow(id);
      toast({ title: "Deleted" });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRowSelection = useCallback(
    (row: Row<ICow>, isSelected: boolean) => {
      const cowId = row.original._id;
      console.log(
        isSelected ? "Selected Cow ID:" : "Deselected Cow ID:",
        cowId
      );
    },
    []
  );

  const handleSelectAll = useCallback(
    (isSelected: boolean, rows: Row<ICow>[]) => {
      rows.forEach((row: Row<ICow>) =>
        console.log(
          isSelected ? "Selected Cow ID:" : "Deselected Cow ID:",
          row.original._id
        )
      );
    },
    []
  );

  const columns = useCowTableColumns(
    // handleUpdate,
    handleDelete,
    handleRowSelection,
    handleSelectAll
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data</p>;

  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={processedData} /> */}
      <CowTable columns={columns} cows={processedData} />
    </div>
  );
};

export default Dashboard;
