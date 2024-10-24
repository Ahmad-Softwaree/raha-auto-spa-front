import { useToast } from "@/components/ui/use-toast";
import {
  AddColorF,
  AddColorQ,
  DeleteColorQ,
  GetColorsQ,
  UpdateColorF,
  UpdateColorQ,
} from "@/types/color";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addColor,
  deleteColor,
  getDeletedColor,
  getColors,
  restoreColor,
  searchDeletedColors,
  searchColors,
  updateColor,
  getColorsSelection,
} from "../actions/color.action";
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

export const useGetColors = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.COLORS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetColorsQ>> =>
      getColors(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetColorsSelection = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.COLORS_SELECTION],
    queryFn: () => getColorsSelection(toast),
    retry: 0,
  });
};
export const useGetDeletedColors = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_COLORS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetColorsQ>> =>
      getDeletedColor(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};

export const useSearchColors = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_COLORS],
    queryFn: (): Promise<GetColorsQ> => searchColors(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useSearchDeletedColors = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_COLORS],
    queryFn: (): Promise<GetColorsQ> => searchDeletedColors(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useAddColor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: AddColorF): Promise<AddColorQ> => addColor(form),
    onSuccess: (data: AddColorQ) => {
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
        queryKey: [QUERY_KEYs.COLORS_SELECTION],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.COLORS],
      });
    },
  });
};
export const useUpdateColor = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateColorF): Promise<UpdateColorQ> =>
      updateColor(form, id),
    onSuccess: (data: UpdateColorQ) => {
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
        queryKey: [QUERY_KEYs.COLORS],
      });
    },
  });
};
export const useDeleteColor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteColorQ> => deleteColor(ids),
    onSuccess: (data: DeleteColorQ) => {
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
        queryKey: [QUERY_KEYs.SEARCH_COLORS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.COLORS],
      });
    },
  });
};
export const useRestoreColor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteColorQ> => restoreColor(ids),
    onSuccess: (data: DeleteColorQ) => {
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
        queryKey: [QUERY_KEYs.SEARCH_DELETED_COLORS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_COLORS],
      });
    },
  });
};
