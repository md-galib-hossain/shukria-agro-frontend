import ICow, { IVaccination } from "@/types";
import { useMemo } from "react";

export const useProcessedCowData = (rawData: ICow[]) => {
  const processedData = useMemo(
    () =>
      rawData.map((cow) => ({
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
          cow.vaccinations?.map((vaccine:IVaccination) => ({
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
    [rawData]
  );

  return processedData;
};
