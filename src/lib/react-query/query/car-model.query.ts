import { useToast } from "@/components/ui/use-toast";
import {
  AddCarModelF,
  AddCarModelQ,
  DeleteCarModelQ,
  GetCarModelsQ,
  UpdateCarModelF,
  UpdateCarModelQ,
} from "@/types/car-model";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addCarModel,
  deleteCarModel,
  getDeletedCarModel,
  getCarModels,
  restoreCarModel,
  searchDeletedCarModels,
  searchCarModels,
  updateCarModel,
  getCarModelsSelection,
} from "../actions/car-model.action";
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

export const useGetCarModels = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.CAR_MODELS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetCarModelsQ>> =>
      getCarModels(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetCarModelsSelection = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CAR_MODELS_SELECTION],
    queryFn: () => getCarModelsSelection(toast),
    retry: 0,
  });
};
export const useGetDeletedCarModels = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_CAR_MODELS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetCarModelsQ>> =>
      getDeletedCarModel(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};

export const useSearchCarModels = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_CAR_MODELS],
    queryFn: (): Promise<GetCarModelsQ> => searchCarModels(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useSearchDeletedCarModels = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_CAR_MODELS],
    queryFn: (): Promise<GetCarModelsQ> =>
      searchDeletedCarModels(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useAddCarModel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: AddCarModelF): Promise<AddCarModelQ> =>
      addCarModel(form),
    onSuccess: (data: AddCarModelQ) => {
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
        queryKey: [QUERY_KEYs.CAR_MODELS_SELECTION],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_MODELS],
      });
    },
  });
};
export const useUpdateCarModel = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateCarModelF): Promise<UpdateCarModelQ> =>
      updateCarModel(form, id),
    onSuccess: (data: UpdateCarModelQ) => {
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
        queryKey: [QUERY_KEYs.CAR_MODELS],
      });
    },
  });
};
export const useDeleteCarModel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteCarModelQ> => deleteCarModel(ids),
    onSuccess: (data: DeleteCarModelQ) => {
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
        queryKey: [QUERY_KEYs.SEARCH_CAR_MODELS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CAR_MODELS],
      });
    },
  });
};
export const useRestoreCarModel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteCarModelQ> => restoreCarModel(ids),
    onSuccess: (data: DeleteCarModelQ) => {
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
        queryKey: [QUERY_KEYs.SEARCH_DELETED_CAR_MODELS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_CAR_MODELS],
      });
    },
  });
};
