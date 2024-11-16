import React from "react";
import { useRouter } from "next/navigation";
import SelectCowPopover from "@/app/(main)/cows/components/CowTable/components/SelectCow";
import { Button } from "@/components/ui/button";
import { LuFilterX } from "react-icons/lu";

interface CowFilterWithResetProps {
  selectedCowOID: string | undefined;
  onCowSelect: (value: string) => void;
  onReset: () => void;
  limit: number;
  options: { value: string; label: string }[];
}

const LactationFilter: React.FC<CowFilterWithResetProps> = ({
  selectedCowOID,
  onCowSelect,
  onReset,
  limit,
  options,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-4">
      <div className="w-64">
        <SelectCowPopover
          label="Filter by Cow"
          selectedValue={selectedCowOID}
          onSelect={(value) => {
            onCowSelect(value);
            router.push(`?page=1&limit=${limit}&cowOID=${value}`);
          }}
          options={options}
        />
      </div>
      <Button
        variant="outline"
        onClick={() => {
          onReset();
          router.push(`?page=1&limit=${limit}`);
        }}
      >
        <LuFilterX size={20} />
      </Button>
    </div>
  );
};

export default LactationFilter;
