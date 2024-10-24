import { useToast } from "@/components/ui/use-toast";
import {
  AddCarTypeF,
  AddCarTypeQ,
  DeleteCarTypeQ,
  GetCarTypesQ,
  UpdateCarTypeF,
  UpdateCarTypeQ,
} from "@/types/car-type";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addCarType,
  deleteCarType,
  getDeletedCarType,
  getCarTypes,
  restoreCarType,
  searchDeletedCarTypes,
  searchCarTypes,
  updateCarType,
  getCarTypesSelection,
} from "../actions/car-type.action";
import { QUERY_KEYs } from "../key";
import {
  From,
  Id,
  NestError,
  Page,
  PaginationReturnType,
  Search,
  To,
} from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";

export const useGetCarTypes = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.CAR_TYPES],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetCarTypesQ>> =>
      getCarTypes(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetCarTypesSelection = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CAR_TYPES_SELECTION],
    queryFn: () => getCarTypesSelection(toast),
    retry: 0,
  });
};
export const useGetDeletedCarTypes = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_CAR_TYPES],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetCarTypesQ>> =>
      getDeletedCarType(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};

export const useSearchCarTypes = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_CAR_TYPES],
    queryFn: (): Promise<GetCarTypesQ> => searchCarTypes(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useSearchDeletedCarTypes = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_CAR_TYPES],
    queryFn: (): Promise<GetCarTypesQ> => searchDeletedCarTypes(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useAddCarType = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: AddCarTypeF): Promise<AddCarTypeQ> => addCarType(form),
    onSuccess: (data: AddCarTypeQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_TYPES_SELECTION],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_TYPES],
      });
    },
  });
};
export const useUpdateCarType = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateCarTypeF): Promise<UpdateCarTypeQ> =>
      updateCarType(form, id),
    onSuccess: (data: UpdateCarTypeQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_TYPES],
      });
    },
  });
};
export const useDeleteCarType = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteCarTypeQ> => deleteCarType(ids),
    onSuccess: (data: DeleteCarTypeQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
    onSettled: () => {
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_CAR_TYPES],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_TYPES],
      });
    },
  });
};
export const useRestoreCarType = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteCarTypeQ> => restoreCarType(ids),
    onSuccess: (data: DeleteCarTypeQ) => {
      return toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
    },
    onSettled: () => {
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_DELETED_CAR_TYPES],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_CAR_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
