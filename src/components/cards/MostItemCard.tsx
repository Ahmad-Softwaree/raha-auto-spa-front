import { MostItemCardProps } from "@/types/items";
import Image from "../ui/Image";

const MostItemCard = ({
  image_name,
  image_url,
  title,
  cost,
  frosh,
  sold,
}: MostItemCardProps) => {
  return (
    <article className="w-[210px] h-[360px]  bg-secondary-100 shadow-lg rounded-xl items-center gap-2 flex flex-col">
      <Image
        height={`80%`}
        width={`100%`}
        loading="lazy"
        className="object-contain rounded-t-xl relative row-span-3 col-span-full"
        image={
          typeof image_url === "object"
            ? URL.createObjectURL(image_url)
            : image_url
        }
        alt={image_name}
      />
      <p className="text-center w-full text-md font-bold font-bukra">{title}</p>
      <p className="text-center w-full text-md font-light text-opacity-50 opacity-50">
        {cost}
      </p>
      <p className="text-center w-full text-md font-bold font-bukra">{frosh}</p>
      <p className="text-center w-full text-md font-bold font-bukra text-primary-500 text-xl">
        {sold}
      </p>
    </article>
  );
};

export default MostItemCard;
