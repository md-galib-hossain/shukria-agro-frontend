import React from "react";
import { ILactationTableProps } from "../../../hooks/useProcessedLactationTable";

const LactationDetailView = ({ lactation }: { lactation: ILactationTableProps }) => {
  console.log("LactationDetailView");

  return (
    <div className="bg-white rounded-md p-6 space-y-6">
      {/* Lactation Basic Info */}
      <div className="space-y-4">
        <p className="flex items-center">
          <strong className="w-48 text-gray-700">Cow ID:</strong>
          <span className="text-gray-600">{lactation.cowOID?.cowId ?? "No Data"}</span>
        </p>
        <p className="flex items-center">
          <strong className="w-48 text-gray-700">Lactation Number:</strong>
          <span className="text-gray-600">
            {lactation.lactationNumber ?? "No Data"}
          </span>
        </p>
        <p className="flex items-center">
          <strong className="w-48 text-gray-700">Start Date:</strong>
          <span className="text-gray-600">
            {lactation.lactationStartDate
              ? new Date(lactation.lactationStartDate).toLocaleDateString()
              : "No Data"}
          </span>
        </p>
        <p className="flex items-center">
          <strong className="w-48 text-gray-700">End Date:</strong>
          <span className="text-gray-600">
            {lactation.lactationEndDate
              ? new Date(lactation.lactationEndDate).toLocaleDateString()
              : "No Data"}
          </span>
        </p>
        <p className="flex items-center">
          <strong className="w-48 text-gray-700">Milk Yield:</strong>
          <span className="text-gray-600">
            {lactation.milkYield ?? 0} liters
          </span>
        </p>
      </div>
    </div>
  );
};

export default LactationDetailView;
