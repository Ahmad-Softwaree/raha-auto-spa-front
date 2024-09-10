import { UserCardProps } from "@/types/auth";
import { FormFinalOperation } from "@/types/global";
import { Fingerprint } from "lucide-react";

const UserDetailCard = ({
  name,
  role_id,
  role_name,
  id,
  phone,
  username,
}: FormFinalOperation & UserCardProps) => {
  return (
    <div className="w-full  overflow-hidden bg-white rounded-lg  ">
      <div className="flex items-center px-3 py-1 bg-gray-900">
        <Fingerprint className="text-white text-md" />
        <h1 className="mx-3 text-md font-semibold text-white">{role_name}</h1>
      </div>

      <div className="px-6 py-4 space-y-2">
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <h1 className="text-md font-semibold text-gray-800 ">ناو:</h1>
          <p className="text-sm font-poppins">{name}</p>
        </div>

        <div className="w-full flex flex-row justify-start items-center gap-2">
          <h1 className="text-md font-semibold text-gray-800 ">
            ناوی بەکارهێنەر:
          </h1>
          <p className="text-sm font-poppins">{username}</p>
        </div>

        <div className="w-full flex flex-row justify-start items-center gap-2">
          <h1 className="text-md font-semibold text-gray-800 ">
            ژمارە تەلەفۆن:
          </h1>
          <p className="text-sm font-poppins">{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
