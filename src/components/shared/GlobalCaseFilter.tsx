import { useSearchParams } from "react-router-dom";
import Label from "../ui/Label";
import DatePicker from "./DatePicker";
import MyButton from "../ui/MyButton";
import { ENUMs } from "@/lib/enum";
import { useState } from "react";
import { parseDateToTimestamp } from "@/lib/functions";

type NullableDate = Date | null;

const GlobalCaseFilter = ({ onClose }: { onClose: () => void }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [selectedStartDate, setSelectedStartDate] = useState<NullableDate>(
    searchParam.get(ENUMs.FROM_PARAM as string)
      ? new Date(Number(searchParam.get(ENUMs.FROM_PARAM as string)) || "")
      : null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<NullableDate>(
    searchParam.get(ENUMs.TO_PARAM as string)
      ? new Date(Number(searchParam.get(ENUMs.TO_PARAM as string)) || "")
      : null
  );
  return (
    <div className="mt-4 space-y-6">
      <Label className="text-xs">فلتەر بەپێی بەروار</Label>

      <DatePicker
        selectedEndDate={selectedEndDate}
        selectedStartDate={selectedStartDate}
        setSelectedEndDate={setSelectedEndDate}
        setSelectedStartDate={setSelectedStartDate}
      />
      <MyButton
        type="button"
        onClick={() => {
          if (!selectedStartDate || !selectedEndDate) {
            setSearchParam((prev: any) => {
              const params = new URLSearchParams(prev);
              params.delete(ENUMs.SEARCH_PARAM as string);
              params.delete(ENUMs.FROM_PARAM as string);
              params.delete(ENUMs.TO_PARAM as string);
              return params;
            });
          } else {
            setSearchParam((prev: any) => {
              const params = new URLSearchParams(prev);
              params.delete(ENUMs.SEARCH_PARAM as string);
              params.set(
                ENUMs.FROM_PARAM as string,
                parseDateToTimestamp(selectedStartDate?.toString() || "") || ""
              );
              params.set(
                ENUMs.TO_PARAM as string,
                parseDateToTimestamp(selectedEndDate?.toString() || "") || ""
              );
              return params;
            });
          }
          onClose();
        }}
        className="p-2 px-4 rounded-md text-xs bg-sky-600 text-white mt-5"
      >
        جێبەجێکردن
      </MyButton>
    </div>
  );
};

export default GlobalCaseFilter;
