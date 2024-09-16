import { Minus, PenTool, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Dialog from "../shared/Dialog";
import DeleteModal from "../ui/DeleteModal";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { Td, Tr } from "../ui";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import Tooltip from "@mui/joy/Tooltip";
import Chip from "@mui/joy/Chip";
import { SellItemCardProps } from "@/types/sell";
import {
  useDecreaseItemInSell,
  useDeleteItemInSell,
  useIncreaseItemInSell,
  useUpdateItemInSell,
} from "@/lib/react-query/query/sell.query";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import SellItemForm from "../forms/SellItemForm";
import CustomClose from "../shared/CustomClose";

const SellItemCard = ({
  id,
  quantity,
  item_id,
  sell_id,
  item_purchase_price,
  item_sell_price,
  item_name,
  index = -1,
  ...others
}: SellItemCardProps) => {
  const [quantityInput, setQuantityInput] = useState<string>(
    quantity.toString()
  );
  const {
    dispatch,
    state: { checked },
  } = useGlobalContext();
  const [searchParam, setSearchParam] = useSearchParams();
  let sell_id_param = searchParam.get(ENUMs.SELL_PARAM as string);

  const {
    mutateAsync: updateItem,
    isPending: updateLoading,
    isError,
  } = useUpdateItemInSell(Number(sell_id_param), item_id);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const { mutateAsync, isPending } = useDeleteItemInSell(Number(sell_id_param));
  useEffect(() => {
    setQuantityInput(quantity.toString());
  }, [quantity]);
  useEffect(() => {
    console.log(isError);
    if (isError) {
      setQuantityInput(quantity.toString());
    }
  }, [isError]);

  const { mutateAsync: increase, isPending: increasePending } =
    useIncreaseItemInSell(Number(sell_id_param), item_id);

  const { mutateAsync: decrease, isPending: decreasePending } =
    useDecreaseItemInSell(Number(sell_id_param), item_id);

  return (
    <>
      <Tr
        className={`default-border table-row-hover  ${
          checked?.includes(item_id) ? "table-row-include" : "table-row-normal"
        }`}
        key={id}>
        <Td className="!p-3">
          <InputGroup className="checkbox-input">
            <Input
              onClick={() => {
                if (checked?.includes(item_id)) {
                  dispatch({
                    type: CONTEXT_TYPEs.UNCHECK,
                    payload: item_id,
                  });
                } else {
                  dispatch({
                    type: CONTEXT_TYPEs.CHECK,
                    payload: item_id,
                  });
                }
              }}
              checked={checked.includes(item_id)}
              type="checkbox"
              className="cursor-pointer"
            />
          </InputGroup>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-poppins text-sm">
            {index != -1 ? index + 1 : 0}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {item_name}
          </p>
        </Td>

        <Td className="!p-3 flex flex-row justify-start items-center gap-1">
          <Tooltip
            placement="top"
            title="زیادکردن"
            color="success"
            variant="soft">
            <Chip
              disabled={increasePending}
              onClick={() => increase()}
              variant="soft"
              color="success">
              <Plus className="w-4 h-4 cursor-pointer" />
            </Chip>
          </Tooltip>

          <Chip
            sx={{
              minWidth: "40px",
              textAlign: "center",
            }}
            variant="soft"
            color={"neutral"}>
            <Input
              onBlur={() =>
                updateItem({
                  quantity: Number(quantityInput) - Number(quantity),
                })
              }
              className="w-[40px] text-center !font-bukra"
              value={quantityInput}
              name="quantityInput"
              onChange={(e) => setQuantityInput(e.target.value)}
            />
          </Chip>

          <Tooltip
            placement="top"
            title="کەمکردن"
            color="danger"
            variant="soft">
            <Chip
              disabled={decreasePending}
              onClick={() => decrease()}
              variant="soft"
              color="danger">
              <Minus className="w-4 h-4 cursor-pointer" />
            </Chip>
          </Tooltip>
        </Td>

        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {item_sell_price}
          </p>
        </Td>
        <Td className="!p-3">
          <p className="text-right font-light font-bukra text-sm">
            {quantity * item_sell_price}
          </p>
        </Td>

        <Td className="!p-3 cup flex flex-row gap-2">
          <Tooltip
            placement="top"
            title="سڕینەوە"
            color="danger"
            variant="soft">
            <Chip
              onClick={() => setIsDelete(true)}
              variant="soft"
              color="danger">
              <Trash2 className="w-7 h-7 p-1 cursor-pointer" />
            </Chip>
          </Tooltip>
          <Tooltip
            placement="top"
            title="چاککردن"
            color="success"
            variant="soft">
            <Chip
              onClick={() => {
                dispatch({
                  type: CONTEXT_TYPEs.SET_OLD_DATA,
                  payload: {
                    item_id,
                    quantity,
                    item_sell_price,
                  },
                });
                setUpdate(true);
              }}
              variant="soft"
              color="success">
              <PenTool className="w-7 h-7 p-1 cursor-pointer" />
            </Chip>
          </Tooltip>
        </Td>
      </Tr>

      {isDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}>
          <DeleteModal
            deleteFunction={() => mutateAsync([item_id])}
            loading={isPending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
      {update && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={update}
          onClose={() => setUpdate(false)}>
          <CustomClose onClick={() => setUpdate(false)} />
          <SellItemForm onClose={() => setUpdate(false)} />
        </Dialog>
      )}
    </>
  );
};

export default SellItemCard;