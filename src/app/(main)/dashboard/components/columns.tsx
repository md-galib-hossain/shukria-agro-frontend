"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Cow = {
  cowId: string
  name: string
  dateOfBirth: Date
  sex: "male" | "female"
  category: string
}

export const columns: ColumnDef<Cow>[] = [
  {
    accessorKey: "cowId",
    header: "Cow Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date Of Birth",
  },
  {
    accessorKey: "sex",
    header: "Sex",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
]
