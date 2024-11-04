"use client";

import { ColumnDef } from "@tanstack/react-table";

// Define the shape of cow data
export type Cow = {
  _id: string;
  cowId: string;
  name: string;
  dateOfBirth: string;
  sex: string;
};

export const columns: ColumnDef<Cow>[] = [
  {
    accessorKey: "cowId",
    header: "Cow ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "sex",
    header: "Sex",
  },
];
