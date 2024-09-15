import { useEffect, useRef } from "react";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { CircleFadingPlus, CircleX, PenLine } from "lucide-react";
import Textarea from "../ui/Textarea";
import { AddItemInputs } from "@/types/items";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGlobalContext } from "@/context/GlobalContext";
import InputGroup from "@/components/ui/InputGroup";
import Label from "../ui/Label";
import MyButton from "@/components/ui/MyButton";
import { useAddItem, useUpdateItem } from "@/lib/react-query/query/item.query";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
  ImageTypeInForm,
} from "@/types/global";
import Image from "../ui/Image";
import { useGetItemTypesSelection } from "@/lib/react-query/query/item-type.query";
import Loading from "../ui/Loading";
import { TailSpin } from "react-loader-spinner";
import Select from "../ui/Select";
import Option from "../ui/Option";
import { ItemType } from "@/types/item-type";

const ItemForm = ({
  state = "insert",
  onClose,
}: GlobalFormProps & FormFinalOperation) => {
  const { state: globalState } = useGlobalContext();
  const form = useRef<FormHandle>(null);
  const { mutateAsync, isPending } = useAddItem();
  const { data: itemTypes, isLoading: itemTypesLoading } =
    useGetItemTypesSelection();

  const { mutateAsync: updateMutate, isPending: updatePending } = useUpdateItem(
    globalState?.oldData?.id
  );

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<AddItemInputs & ImageTypeInForm>({});

  const onSubmit: SubmitHandler<AddItemInputs & ImageTypeInForm> = async (
    data
  ) => {
    const transformedData = {
      ...data,
      type_id: Number(data.type_id),
      item_purchase_price: Number(data.item_purchase_price),
      item_sell_price: Number(data.item_sell_price),
      quantity: Number(data.quantity),
    };
    try {
      if (state == "insert") await mutateAsync(transformedData);
      else if (state == "update")
        await updateMutate({
          old_image_name: globalState.oldData?.image_name,
          old_image_url: globalState.oldData?.image_url,
          ...transformedData,
        });
    } catch (error) {
      //nothing
    } finally {
      resetField("image");
    }
    form.current?.clear();
    if (onClose) onClose();
  };

  useEffect(() => {
    if (globalState.oldData) {
      let { image_name, image_url, ...others } = globalState.oldData;
      reset(others);
    }
  }, [state]);

  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-10 min-w-none mt-2"
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <p className="font-bold font-bukra text-lg">زیادکردنی مواد</p>
      <div className="w-full grid grid-cols-1 lg:grid-cols-17 gap-10 place-items-start">
        <div className="col-span-full lg:col-span-5 flex flex-col justify-center items-start gap-5 py-5 w-full">
          {itemTypesLoading ? (
            <Loading>
              <TailSpin />
            </Loading>
          ) : (
            <>
              <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="w-full text-sm  flex flex-row gap-2">
                  <p>ناوی کاڵا</p>
                </Label>{" "}
                <InputGroup error={errors.name} className="w-full text-input">
                  <Input
                    type="text"
                    id="name"
                    placeholder="ناوی کاڵا"
                    className="w-full text-sm"
                    {...register("name", { required: true })}
                  />
                </InputGroup>
              </div>
              <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label
                  htmlFor="barcode"
                  className="w-full text-sm  flex flex-row gap-2">
                  <p>بارکۆد</p>
                </Label>{" "}
                <InputGroup
                  error={errors.barcode}
                  className="w-full text-input">
                  <Input
                    type="text"
                    id="barcode"
                    placeholder="بارکۆد"
                    className="w-full text-sm"
                    {...register("barcode", { required: true })}
                  />
                </InputGroup>
              </div>
              <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label
                  htmlFor="type_id"
                  className="w-full text-sm  flex flex-row gap-2">
                  <p>جۆری کاڵا</p>
                </Label>{" "}
                <InputGroup
                  error={errors.type_id}
                  className="w-full text-input">
                  <Select
                    title="type_id"
                    {...register("type_id", { required: true })}
                    name="type_id"
                    id="type_id"
                    className="w-full bg-transparent !text-sm">
                    <Option className="!text-sm dark-light" value={-1}>
                      جۆر هەڵبژێرە
                    </Option>
                    {itemTypes?.map((val: ItemType, _index: number) => (
                      <Option
                        className="!text-sm dark-light"
                        key={val.id}
                        value={val.id}>
                        {val.name}
                      </Option>
                    ))}
                  </Select>
                </InputGroup>
              </div>
              <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label
                  htmlFor="quantity"
                  className="w-full text-sm  flex flex-row gap-2">
                  <p>عەدەد</p>
                </Label>{" "}
                <InputGroup
                  error={errors.quantity}
                  className="w-full text-input">
                  <Input
                    type="text"
                    id="quantity"
                    placeholder="عەدەد"
                    className="w-full text-sm"
                    {...register("quantity", { required: true })}
                  />
                </InputGroup>
              </div>
            </>
          )}
        </div>
        <div className="col-span-full lg:col-span-1 h-[2px] lg:h-full w-full lg:w-[2px] bg-gray-500 bg-opacity-50 rounded-lg "></div>

        <div className="col-span-full lg:col-span-5 flex flex-col justify-start items-start gap-5 py-5 w-full h-full">
          <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
            <Label
              htmlFor="item_purchase_price"
              className="w-full text-sm  flex flex-row gap-2">
              <p>بڕی تێچوو</p>
            </Label>{" "}
            <InputGroup
              error={errors.item_purchase_price}
              className="w-full text-input">
              <Input
                type="text"
                id="item_purchase_price"
                placeholder="بڕی تێچوو"
                className="w-full text-sm"
                {...register("item_purchase_price", { required: true })}
              />{" "}
            </InputGroup>
          </div>
          <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
            <Label
              htmlFor="item_sell_price"
              className="w-full text-sm  flex flex-row gap-2">
              <p>نرخی فرۆشتن</p>
            </Label>{" "}
            <InputGroup
              error={errors.item_sell_price}
              className="w-full text-input">
              <Input
                type="text"
                id="item_sell_price"
                placeholder="نرخی فرۆشتن"
                className="w-full text-sm"
                {...register("item_sell_price", { required: true })}
              />{" "}
            </InputGroup>
          </div>

          <InputGroup error={errors.image} className="w-full space-y-2">
            <Label
              className="mb-1 block text-sm font-medium !text-white"
              htmlFor={`item_image`}>
              وێنە
            </Label>
            <Label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
              <div className="space-y-1 text-center">
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-500">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </div>
                <div className="text-white">
                  <a href="#" className="font-medium text-white ">
                    وێنە داگرە
                  </a>{" "}
                  یان وێنەکە لێرە دابنێ
                </div>
                <p className="text-sm text-gray-500 font-poppins">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
              <Input
                className="sr-only"
                id="item_image"
                type="file"
                {...register("image", {
                  required:
                    state == "insert"
                      ? true
                      : !globalState.oldData?.image_url
                      ? true
                      : false,
                })}
                name="image"
              />
            </Label>
          </InputGroup>
          {watch("image") && watch("image")[0] && (
            <div className="w-full relative">
              <CircleX
                className="bg-white rounded-md absolute -right-2 -top-2 z-10 text-red-500 cursor-pointer w-[30px] h-[30px]"
                onClick={() => resetField("image")}
              />
              <Image image={watch("image")[0]} />
            </div>
          )}
          {globalState.oldData?.image_url && !watch("image") && (
            <Image image={globalState.oldData?.image_url} />
          )}
        </div>
        <div className="col-span-full lg:col-span-1 h-[2px] lg:h-full w-full lg:w-[2px] bg-gray-500 bg-opacity-50 rounded-lg"></div>
        <div className="col-span-full lg:col-span-5 flex flex-col justify-start items-start gap-2 py-5 w-full h-full">
          <Label htmlFor="note" className="w-full text-sm  flex flex-row gap-2">
            <p>تێبینی</p>
          </Label>{" "}
          <InputGroup error={errors.note} className="w-full text-input">
            <Textarea
              rows={12}
              id="note"
              placeholder="تێبینی (ئارەزوومەندانە)"
              className="w-full h-full text-sm !bg-transparent"
              {...register("note", { required: true })}
            />
          </InputGroup>
        </div>
      </div>
      <MyButton
        loading={isPending || updatePending}
        name="addItemButton"
        type="submit"
        className=" bg-sky-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-light text-sm font-bukra">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default ItemForm;
