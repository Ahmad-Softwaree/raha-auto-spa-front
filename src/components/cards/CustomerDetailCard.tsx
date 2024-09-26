import { CustomerCardProps } from "@/types/customer";
import { FormFinalOperation } from "@/types/global";

import { Key, Phone, User } from "lucide-react";
import InputGroup from "../ui/InputGroup";
import InputAddon from "../ui/InputAddon";
import Label from "../ui/Label";
import Input from "../ui/Input";

const CustomerDetailCard = ({
  onClose,
  first_name,
  last_name,
  created_by,
  updated_by,
  phone,
  id,
}: FormFinalOperation & CustomerCardProps) => {
  return (
    <div className="space-y-4  dark-light  rounded-lg default-border bg-transparent py-2 w-full  shadow-4xl mt-2">
      <div className="w-full flex flex-col justify-start items-start gap-4 my-3 px-3">
        <p className="text-sm">زانیاری کەسی</p>
      </div>

      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>ناوی سەرەتا</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <User />
            </InputAddon>

            <Input
              value={first_name}
              name="first_name"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p> ژمارە تەلەفۆن</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Phone />
            </InputAddon>

            <Input
              value={last_name}
              name="last_name"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>

      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>ژمارە تەلەفۆن</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Key />
            </InputAddon>

            <Input
              value={phone}
              name="phone"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>
      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>داغڵکراوە لەلایەن</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <User />
            </InputAddon>

            <Input
              value={created_by}
              name="created_by"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>چاککراوە لەلایەن</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <User />
            </InputAddon>

            <Input
              value={updated_by}
              name="updated_by"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailCard;
