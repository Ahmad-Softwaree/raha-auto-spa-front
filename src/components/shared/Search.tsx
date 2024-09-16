import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import InputAddon from "../ui/InputAddon";
import { Search as SearchIcon } from "lucide-react";
import CustomClose from "./CustomClose";

const Search = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  let search = searchParam.get(ENUMs.SEARCH_PARAM as string) || "";

  return (
    <InputGroup className="text-input w-[200px] md:w-[300px] dark-light">
      <Input
        onChange={(e) =>
          setSearchParam((prev) => {
            const params = new URLSearchParams(prev);
            params.set(ENUMs.SEARCH_PARAM as string, e.target.value);
            return params;
          })
        }
        value={search}
        placeholder="گەڕان"
        className="w-[85%] text-xs"
        type="input"
      />
      {search == "" ? (
        <InputAddon className="w-fit">
          <SearchIcon />
        </InputAddon>
      ) : (
        <CustomClose
          onClick={() => {
            setSearchParam((prev) => {
              const params = new URLSearchParams(prev);
              params.delete(ENUMs.SEARCH_PARAM as string);
              return params;
            });
          }}
        />
      )}
    </InputGroup>
  );
};

export default Search;