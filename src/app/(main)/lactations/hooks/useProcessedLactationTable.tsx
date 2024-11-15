import { useMemo } from "react";
export interface ILactationTableProps {
    _id: string;
    lactationNumber: number;
    lactationStartDate: Date;
    lactationEndDate: Date ;
    milkYield: number;
    cowOID: {
      _id: string;
      cowId: string;
      name: string;
    };
  
  }
export const useProcessedLactationData = (rawData: ILactationTableProps[]) => {
  const processedData = useMemo(
    () =>
      rawData.map((lactation) => ({
        _id: lactation._id,
        lactationNumber: lactation.lactationNumber,
        lactationStartDate: lactation.lactationStartDate,
        lactationEndDate: lactation.lactationEndDate,
        milkYield: lactation.milkYield,
        cowOID:  {
              _id: lactation?.cowOID._id || "Unknown",
              cowId: lactation?.cowOID.cowId || "Unknown",
              name: lactation?.cowOID.name || "Unnamed",
            }
         
  
      })),
    [rawData]
  );

  return processedData;
};
