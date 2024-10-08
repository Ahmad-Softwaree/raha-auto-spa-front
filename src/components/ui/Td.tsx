import { cn } from "@/lib/utils";
import { TdProps } from "@/types/global";

const Td = ({ children, ...props }: TdProps) => {
  return (
    <td {...props} className={cn(props.className, ["p-2 !text-center"])}>
      {children}
    </td>
  );
};

export default Td;
