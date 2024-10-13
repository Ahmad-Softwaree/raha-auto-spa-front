import HomeCard from "@/components/cards/HomeCard";
import { formatMoney } from "@/components/shared/FormatMoney";
import Container from "@/components/ui/Container";
import Loading from "@/components/ui/Loading";
import { useAuthContext } from "@/context/AuthContext";
import { useGetDashboardData } from "@/lib/react-query/query/dashboard.query";
import { Archive, Box, FileBox, ReceiptText, UserCog } from "lucide-react";
import { TailSpin } from "react-loader-spinner";
import Stack from "@mui/material/Stack";
import { Box as MUIBox } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { Reservation } from "@/types/reservation";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  startOfDay,
  parseISO,
} from "date-fns"; // Importing date-fns for date calculations
import { Sell } from "@/types/sell";
import { ItemQuantityHistory } from "@/types/items";

const Home = () => {
  const {
    state: { user },
  } = useAuthContext();
  const { data, isLoading } = useGetDashboardData();
  // Get the start and end of the current week
  const currentDate = new Date();
  const weekStart = startOfWeek(currentDate); // Start of the week (Sunday)
  const weekEnd = endOfWeek(currentDate); // End of the week (Saturday)

  // Generate an array of dates from start to end of the week
  const weekDates = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  });

  const completedReservationsPerDay = weekDates.map((date) => {
    return data?.reservations.filter((reservation: Reservation) => {
      return (
        isSameDay(
          startOfDay(new Date(reservation.date_time)),
          startOfDay(date)
        ) && reservation.completed
      );
    }).length;
  });
  const sellsPerDay = weekDates.map((date) => {
    const filteredSells = data?.sells.filter((sell: Sell) => {
      if (sell.created_at) {
        const createdAtDate = parseISO(sell.created_at.toString());
        return isSameDay(startOfDay(createdAtDate), startOfDay(date));
      }
      return false;
    });
    return filteredSells?.length;
  });
  return (
    <Container className="w-full" as={`div`}>
      <h1 className="my-2 mb-10 text-lg md:text-2xl">
        بەخێربێیتەوە : {user?.name}
      </h1>
      {isLoading ? (
        <Loading>
          <TailSpin />
        </Loading>
      ) : data ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-15 gap-5 md:gap-10 flex-wrap col-span-full w-full">
            <HomeCard
              icon={
                <UserCog className="h-[20px] md:h-[30px] w-[20px] md:w-[30px]" />
              }
              text="بەکارهێنەران"
              data={data.users}
            />

            <HomeCard icon={<ReceiptText />} text="وەصڵ" data={data.sell} />

            <HomeCard icon={<Box />} text="کاڵا" data={data.item} />

            <HomeCard
              icon={<FileBox />}
              text="جوڵەی کۆگا"
              data={data.item_quantity_history}
            />

            <HomeCard icon={<Archive />} text="باکئەپ" data={data.backup} />
          </div>
          <div className="col-span-full lg:col-span-4 shadow-xl rounded-lg !bg-[#0e1214] !text-white  flex flex-col justify-start items-start gap-5 p-4">
            <h1>دوایین نۆرەکان</h1>
            <article className="w-full rounded-lg shadow-md bg-opacity-20 bg-[#CB80AB] flex flex-col justify-between items-start gap-10 p-4 h-fit">
              <div className="w-full flex flex-row justify-between items-start">
                <div className="flex flex-col justify-start items-end gap-5">
                  <h1 className="text-lg">قازانجی نۆرە</h1>
                </div>
                <h1 className="text-lg">
                  {formatMoney(data.total_reservation_price)} IQD
                </h1>
              </div>

              {/* <Stack direction="row" sx={{ minWidth: "100%" }}>
                <MUIBox sx={{ flexGrow: 1, minWidth: "100%" }}>
                  <SparkLineChart
                    sx={{ minWidth: "100%" }}
                    data={completedReservationsPerDay}
                    height={100}
                    curve="natural"
                    area
                    xAxis={{
                      scaleType: "time",
                      data: weekDates, // Use dynamically generated week dates
                      valueFormatter: (value) =>
                        value.toISOString().slice(0, 10), // Format the date to 'YYYY-MM-DD'
                    }}
                    showTooltip
                    showHighlight
                  />
                </MUIBox>
              </Stack> */}
            </article>
            <div className="w-full flex flex-col justify-start items-start gap-5 my-5 max-h-[300px] overflow-y-auto">
              {data.reservations.map((val: Reservation, _index: number) => (
                <div
                  key={val.id}
                  className="w-full p-2 flex flex-row justify-between items-center gap-10 text-white border-b-2 border-solid border-gray-500 border-opacity-50"
                >
                  <p
                    className={`font-bold text-md  ${
                      val.price < 0
                        ? "text-red-500"
                        : val.price > 0
                        ? "text-green-500"
                        : "text-white"
                    }`}
                  >
                    {formatMoney(val.price)} IQD
                  </p>
                  <p className="font-bold text-md">
                    {val.customer_first_name}
                    {"  "} {val.customer_last_name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-full lg:col-span-4 shadow-xl rounded-lg !bg-[#0e1214] !text-white  flex flex-col justify-start items-start gap-5 p-4">
            <h1>دوایین مامەڵەکان</h1>
            <article className="w-full rounded-lg shadow-md bg-opacity-20 bg-[#CB80AB] flex flex-col justify-between items-start gap-10 p-4 h-fit">
              <div className="w-full flex flex-row justify-between items-start">
                <div className="flex flex-col justify-start items-end gap-5">
                  <h1 className="text-lg">قازانجی گشت مامەڵەکان</h1>
                </div>
                <h1 className="text-lg">
                  {formatMoney(data.total_sell_price)} IQD
                </h1>
              </div>

              {/* <Stack direction="row" sx={{ minWidth: "100%" }}>
                <MUIBox sx={{ flexGrow: 1, minWidth: "100%" }}>
                  <SparkLineChart
                    sx={{ minWidth: "100%" }}
                    data={sellsPerDay}
                    height={100}
                    curve="natural"
                    area
                    xAxis={{
                      scaleType: "time",
                      data: weekDates, // Use dynamically generated week dates
                      valueFormatter: (value) =>
                        value.toISOString().slice(0, 10), // Format the date to 'YYYY-MM-DD'
                    }}
                    showTooltip
                    showHighlight
                  />
                </MUIBox>
              </Stack> */}
            </article>
            <div className="w-full flex flex-col justify-start items-start gap-5 my-5 max-h-[300px] overflow-y-auto">
              {data.sells.map((val: Sell, _index: number) => (
                <div
                  key={val.id}
                  className="w-full p-2 flex flex-row justify-between items-center gap-10 text-white border-b-2 border-solid border-gray-500 border-opacity-50"
                >
                  <p
                    className={`font-bold text-md  ${
                      val.total_sell_price < 0
                        ? "text-red-500"
                        : val.total_sell_price > 0
                        ? "text-green-500"
                        : "text-white"
                    }`}
                  >
                    {formatMoney(val.total_sell_price)} IQD
                  </p>
                  <p className="font-bold text-md">{val.id}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-full lg:col-span-4 shadow-xl rounded-lg !bg-[#0e1214] !text-white  flex flex-col justify-start items-start gap-5 p-4">
            <h1>دوایین جوڵەکان</h1>
            <article className="w-full rounded-lg shadow-md bg-opacity-20 bg-[#CB80AB] flex flex-col justify-between items-start gap-10 p-4 h-fit">
              <div className="w-full flex flex-row justify-between items-start">
                <div className="flex flex-col justify-start items-end gap-5">
                  <h1 className="text-lg">زیادکردن</h1>
                </div>
                <h1 className="text-lg text-green-500">
                  {formatMoney(data.total_increase_history)}
                </h1>
              </div>
              <div className="w-full flex flex-row justify-between items-start">
                <div className="flex flex-col justify-start items-end gap-5">
                  <h1 className="text-lg">دەرهێنان</h1>
                </div>
                <h1 className="text-lg text-red-500">
                  {formatMoney(data.total_decrease_history)}
                </h1>
              </div>
              {/* <Stack direction="row" sx={{ minWidth: "100%" }}>
                <MUIBox sx={{ flexGrow: 1, minWidth: "100%" }}>
                  <SparkLineChart
                    sx={{ minWidth: "100%" }}
                    data={sellsPerDay}
                    height={100}
                    curve="natural"
                    area
                    xAxis={{
                      scaleType: "time",
                      data: weekDates, // Use dynamically generated week dates
                      valueFormatter: (value) =>
                        value.toISOString().slice(0, 10), // Format the date to 'YYYY-MM-DD'
                    }}
                    showTooltip
                    showHighlight
                  />
                </MUIBox>
              </Stack> */}
            </article>
            <div className="w-full flex flex-col justify-start items-start gap-5 my-5 max-h-[300px] overflow-y-auto">
              {data.item_history.map(
                (val: ItemQuantityHistory, _index: number) => (
                  <div
                    key={val.id}
                    className="w-full p-2 flex flex-row justify-between items-center gap-10 text-white border-b-2 border-solid border-gray-500 border-opacity-50"
                  >
                    <p
                      className={`font-bold text-md  ${
                        val.quantity < 0
                          ? "text-red-500"
                          : val.quantity > 0
                          ? "text-green-500"
                          : "text-white"
                      }`}
                    >
                      {formatMoney(val.quantity)}
                    </p>
                    <p className="font-bold text-md">{val.item_name}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ) : null}
    </Container>
  );
};

export default Home;
