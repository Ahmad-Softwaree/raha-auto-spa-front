import Container from "@/components/ui/Container";
import useScreenSize from "@/hooks/useScreenSize";
import { ENUMs } from "@/lib/enum";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { size } = useScreenSize();
  return (
    <Container
      as={`div`}
      className="w-full flex flex-col justify-center items-center gap-5 h-screen dark-light">
      <span className="w-full text-[100px] md:text-[200px] lg:text-[250px] font-bold opacity-10 text-center z-20 font">
        404
      </span>
      <span className="text-[25px] md:text-[35px] lg:text-[50px] text-center z-50 font-bukra">
        ئەم پەڕەیە نەدۆزرایەوە
      </span>

      <Link
        to={`${ENUMs.GENERAL_SECTION}/${ENUMs.DASHBOARD_PART}`}
        className="dark-light rounded-lg cursor-pointer py-2 md:py-3 px-5 md:px-10 z-50 font-bukra text-sm md:text-lg">
        گەڕانەوە بۆ پەرەی سەرەکی
      </Link>
      <DNA
        visible={true}
        height={size === "xs" || size === "sm" ? 40 : 80}
        width={size === "xs" || size === "sm" ? 40 : 80}
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </Container>
  );
}
