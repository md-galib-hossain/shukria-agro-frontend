
import { useGetAllCowStatsQuery } from "@/redux/api/cowApi";
import React from "react";
import { PiCowBold } from "react-icons/pi";
import { IoIosExpand } from "react-icons/io";
import { FaCow } from "react-icons/fa6";

const CowStats = () => {
  const { data, isLoading } = useGetAllCowStatsQuery({});

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="flex gap-6 items-center justify-center w-full">
      {/* Total Cows */}
      <div className="group rounded-2xl h-40 w-1/3 bg-secondary hover:bg-primary text-white p-4 flex flex-col justify-between">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:bg-secondary">
            <PiCowBold size={20} className="text-black group-hover:text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold group-hover:text-black">
              Total Cows
            </h4>
            <p className="text-sm text-gray-300 group-hover:text-gray-500">
              Total number of cows in the system.
            </p>
          </div>
        </div>
        <h4 className="text-6xl font-bold text-white group-hover:text-black">
          {data?.totalCowsCount}
        </h4>
      </div>

      {/* Cows By Gender */}
      <div className="group rounded-2xl h-40 w-1/3 bg-secondary hover:bg-primary text-white p-4 flex flex-col justify-between">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:bg-secondary">
            <IoIosExpand size={20} className="text-black group-hover:text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold group-hover:text-black">
              Cows By Gender
            </h4>
            <p className="text-sm text-gray-300 group-hover:text-gray-500">
              Distribution by male and female cows.
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-semibold group-hover:text-black">
            Male: {data?.genderStats?.male || 0}
          </p>
          <p className="text-lg font-semibold group-hover:text-black">
            Female: {data?.genderStats?.female || 0}
          </p>
        </div>
      </div>

      {/* Pregnant Cows */}
      <div className="group rounded-2xl h-40 w-1/3 bg-secondary hover:bg-primary text-white p-4 flex flex-col justify-between">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:bg-secondary">
            <FaCow size={20} className="text-black group-hover:text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold group-hover:text-black">
              Pregnant Cows
            </h4>
            <p className="text-sm text-gray-300 group-hover:text-gray-500">
              Total cows currently pregnant.
            </p>
          </div>
        </div>
        <h4 className="text-6xl font-bold text-white group-hover:text-black">
          {data?.pregnancyTrueCount}
        </h4>
      </div>
    </div>
  );
};

export default CowStats;
