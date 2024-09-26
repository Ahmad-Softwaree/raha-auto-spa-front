import Container from "@/components/ui/Container";
import { lazy, useMemo, useRef, useState } from "react";
const Dialog = lazy(() => import("@/components/shared/Dialog"));
const SellCard = lazy(() => import("@/components/cards/SellCard"));

import {
  useDeleteSell,
  useGetDeletedSells,
  useGetSelfDeletedSellItems,
  useGetSells,
  useRestoreSelfDeletedSellItem,
  useSearchDeletedSells,
  useSearchSelfDeletedSellItems,
  useSearchSells,
} from "@/lib/react-query/query/sell.query";
import Pagination from "@/components/providers/Pagination";
import { Sell, SellItem } from "@/types/sell";
import TBody from "@/components/ui/TBody";
import { Table, Td, Th, THead, Tr } from "@/components/ui";

import Input from "@/components/ui/Input";
import { InputGroup } from "@chakra-ui/react";

import { CONTEXT_TYPEs } from "@/context/types";
import { useGlobalContext } from "@/context/GlobalContext";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";

import DeleteModal from "@/components/ui/DeleteModal";
import TFoot from "@/components/ui/TFoot";
import useCheckDeletedPage from "@/hooks/useCheckDeletedPage";
import DeleteChip from "@/components/shared/DeleteChip";
import RestoreChip from "@/components/shared/RestoreChip";
import Search from "@/components/shared/Search";
import DatePicker from "@/components/shared/DatePicker";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import SellItemCard from "@/components/cards/SellItemCard";
import RestoreModal from "@/components/ui/RestoreModal";
const Sells = () => {
  const [index, setIndex] = useState(0);

  const { deleted_page } = useCheckDeletedPage();
  const { mutateAsync, isPending } = useDeleteSell();
  const tableRef = useRef<HTMLDivElement>(null);

  const [searchParam, setSearchParam] = useSearchParams();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isRestore, setIsRestore] = useState<boolean>(false);
  const { mutateAsync: restoreSelfDeleted, isPending: selfRestoreLoading } =
    useRestoreSelfDeletedSellItem();
  const {
    dispatch,
    state: { checked, check_type, theme },
  } = useGlobalContext();
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start">
        <div className="w-full gap-5 flex flex-row justify-between ">
          <div className=" flex flex-row justify-start items-center gap-3 flex-wrap md:flex-nowrap">
            <Search />
          </div>
          {index == 0 && <DatePicker />}

          <div className=" flex flex-row justify-end items-center gap-3">
            {checked?.length > 0 && (
              <div className="flex flex-row justify-center items-center gap-2 dark-light">
                {deleted_page ? (
                  <RestoreChip onClick={() => setIsRestore(true)} />
                ) : (
                  <DeleteChip onClick={() => setIsDelete(true)} />
                )}
                <p dir="ltr">
                  {checked.length} / {ENUMs.CHECK_LIMIT}
                </p>
              </div>
            )}
          </div>
        </div>

        {deleted_page && (
          <Tabs
            defaultValue={0}
            value={index}
            onChange={(event, value) => setIndex(value as number)}
            className="w-full !dark-light"
            aria-label="Flex auto tabs">
            <TabList
              sx={{
                gap: "10px",
              }}
              tabFlex="auto">
              <Tab
                sx={{
                  borderColor: "gray",
                  width: "40%",
                  transition: "color 300ms ease", // Adding transition for color change
                  fontFamily: "bukra",
                  borderRadius: "10px",
                  color: theme == "dark" ? "white" : "black",
                  "&.Mui-selected": {
                    color: theme === "dark" ? "black" : "black", // Active text color
                  },
                }}>
                وەصڵە سڕاوەکان
              </Tab>
              <Tab
                sx={{
                  borderColor: "gray",
                  width: "40%",
                  transition: "color 300ms ease", // Adding transition for color change
                  fontFamily: "bukra",
                  borderRadius: "10px",
                  color: theme == "dark" ? "white" : "black",
                  "&.Mui-selected": {
                    color: theme === "dark" ? "black" : "black", // Active text color
                  },
                }}>
                موادە سڕآوەکان کە وەصڵیان هەیە
              </Tab>
            </TabList>
          </Tabs>
        )}

        {index == 0 && (
          <Pagination<Sell[]>
            queryFn={() =>
              deleted_page
                ? useGetDeletedSells(
                    searchParam.get(ENUMs.FROM_PARAM as string) || "",
                    searchParam.get(ENUMs.TO_PARAM as string) || ""
                  )
                : useGetSells(
                    searchParam.get(ENUMs.FROM_PARAM as string) || "",
                    searchParam.get(ENUMs.TO_PARAM as string) || ""
                  )
            }
            searchQueryFn={() =>
              deleted_page
                ? useSearchDeletedSells(
                    searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
                  )
                : useSearchSells(
                    searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
                  )
            }>
            {({
              isFetchingNextPage,
              hasNextPage,
              isLoading,
              ref,
              data,
              refetch,
              isSearched,
              searchData,
              searchRefetch,
              fetchNextPage,
            }) => {
              const allData = useMemo(
                () =>
                  !isSearched
                    ? data?.pages && data?.pages?.length > 0
                      ? data.pages.map((page) => page.paginatedData).flat()
                      : []
                    : searchData && searchData.length > 0
                    ? searchData
                    : [],
                [data, searchData, isSearched]
              );

              return (
                <div
                  ref={tableRef}
                  className="w-full max-w-full overflow-x-auto max-h-[700px] hide-scroll">
                  <Table className="relative  w-full table-dark-light !text-primary-800 dark:!text-white  default-border">
                    <THead className="sticky -top-1   table-dark-light z-10 w-full  default-border">
                      <Tr>
                        {!deleted_page && (
                          <Th className="text-right text-sm !p-4 !min-w-[100px]">
                            <InputGroup className="checkbox-input">
                              <Input
                                onChange={() => {
                                  tableRef.current?.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                  if (checked.length == 0) {
                                    dispatch({
                                      type: CONTEXT_TYPEs.CHECK,
                                      payload: allData
                                        .slice(0, ENUMs.CHECK_LIMIT as number)
                                        .map(
                                          (val: Sell, _index: number) => val.id
                                        ),
                                    });
                                  } else {
                                    dispatch({
                                      type: CONTEXT_TYPEs.CHECK,
                                      payload: [],
                                    });
                                  }
                                }}
                                checked={check_type == "all"}
                                type="checkbox"
                                className="cursor-pointer"
                              />
                            </InputGroup>
                          </Th>
                        )}
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-1">#</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">ژمارەی وەصڵ</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">بەروار</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">داشکاندن</p>
                        </Th>{" "}
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">داغڵکار</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">چاککار</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">کرادرەکان</p>
                        </Th>
                      </Tr>
                    </THead>
                    <TBody className="w-full ">
                      <>
                        {allData?.map((val: Sell, index: number) => (
                          <SellCard key={val.id} index={index} {...val} />
                        ))}

                        {!isFetchingNextPage && hasNextPage && !isSearched && (
                          <div className="h-[20px]" ref={ref}></div>
                        )}
                      </>
                    </TBody>
                    <TFoot className="sticky -bottom-1 z-[100]  table-dark-light w-full  default-border">
                      <Tr>
                        <Td className="text-center" colSpan={9}>
                          ژمارەی داتا {allData.length}
                        </Td>
                      </Tr>
                    </TFoot>
                  </Table>
                </div>
              );
            }}
          </Pagination>
        )}
        {index == 1 && (
          <Pagination<SellItem[]>
            queryFn={() => useGetSelfDeletedSellItems()}
            searchQueryFn={() =>
              useSearchSelfDeletedSellItems(
                searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
              )
            }>
            {({
              isFetchingNextPage,
              hasNextPage,
              isLoading,
              ref,
              data,
              refetch,
              isSearched,
              searchData,
              searchRefetch,
              fetchNextPage,
            }) => {
              const allData = useMemo(
                () =>
                  !isSearched
                    ? data?.pages && data?.pages?.length > 0
                      ? data.pages.map((page) => page.paginatedData).flat()
                      : []
                    : searchData && searchData.length > 0
                    ? searchData
                    : [],
                [data, searchData, isSearched]
              );
              return (
                <div className="w-full max-w-full overflow-x-auto max-h-[700px] hide-scroll">
                  <Table className="relative  w-full table-dark-light !text-primary-800 dark:!text-white  default-border">
                    <THead className="sticky -top-1   table-dark-light z-10 w-full  default-border">
                      <Tr>
                        <Th className="text-right text-sm !p-4 !min-w-[100px]">
                          <InputGroup className="checkbox-input">
                            <Input
                              onChange={() => {
                                if (checked.length == 0) {
                                  dispatch({
                                    type: CONTEXT_TYPEs.CHECK,
                                    payload: allData
                                      .slice(0, ENUMs.CHECK_LIMIT as number)
                                      .map(
                                        (val: SellItem, _index: number) =>
                                          val.item_id
                                      ),
                                  });
                                } else {
                                  dispatch({
                                    type: CONTEXT_TYPEs.CHECK,
                                    payload: [],
                                  });
                                }
                              }}
                              checked={check_type == "all"}
                              type="checkbox"
                              className="cursor-pointer"
                            />
                          </InputGroup>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-1">#</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">ناوی کاڵا</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">ژمارەی وەصڵ</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">عەدەد</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">نرخ</p>
                        </Th>{" "}
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">داشکاندن</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">کردارەکان</p>
                        </Th>
                      </Tr>
                    </THead>
                    <TBody className="w-full ">
                      <>
                        {allData?.map((val: SellItem, index: number) => (
                          <SellItemCard
                            self_delete={true}
                            key={val.id}
                            index={index}
                            {...val}
                          />
                        ))}

                        {!isFetchingNextPage && hasNextPage && !isSearched && (
                          <div className="h-[20px]" ref={ref}></div>
                        )}
                      </>
                    </TBody>
                    <TFoot className="sticky -bottom-1 z-[100]  table-dark-light w-full  default-border">
                      <Tr>
                        <Td className="text-center" colSpan={9}>
                          ژمارەی داتا {allData.length}
                        </Td>
                      </Tr>
                    </TFoot>
                  </Table>
                </div>
              );
            }}
          </Pagination>
        )}
      </Container>
      {isDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}>
          <DeleteModal
            deleteFunction={() => mutateAsync(checked)}
            loading={isPending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
      {isRestore && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isRestore}
          onClose={() => setIsRestore(false)}>
          <RestoreModal
            deleteFunction={() => restoreSelfDeleted(checked)}
            loading={selfRestoreLoading}
            onClose={() => setIsRestore(false)}
          />
        </Dialog>
      )}
    </>
  );
};

export default Sells;
