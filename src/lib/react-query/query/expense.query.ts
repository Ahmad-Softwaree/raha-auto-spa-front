import { useToast } from "@/components/ui/use-toast";
import {
  AddExpenseF,
  AddExpenseQ,
  DeleteExpenseQ,
  GetExpensesQ,
  UpdateExpenseF,
  UpdateExpenseQ,
} from "@/types/expense";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addExpense,
  deleteExpense,
  getDeletedExpense,
  getExpenses,
  restoreExpense,
  searchDeletedExpenses,
  searchExpenses,
  updateExpense,
} from "../actions/expense.action";
import { QUERY_KEYs } from "../key";
import {
  Filter,
  From,
  Id,
  NestError,
  Page,
  PaginationReturnType,
  To,
} from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { Search } from "react-router-dom";

export const useGetExpenses = (
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.EXPENSES],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetExpensesQ>> =>
      getExpenses(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        filter,
        from,
        to,
        userFilter
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};
export const useGetDeletedExpenses = (
  filter: Filter,
  from: From,
  to: To,
  userFilter: Filter
) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_EXPENSES],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetExpensesQ>> =>
      getDeletedExpense(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        filter,
        from,
        to,
        userFilter
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};

export const useSearchExpenses = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_EXPENSES],
    queryFn: (): Promise<GetExpensesQ> => searchExpenses(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useSearchDeletedExpenses = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_EXPENSES],
    queryFn: (): Promise<GetExpensesQ> => searchDeletedExpenses(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};

export const useAddExpense = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: AddExpenseF): Promise<AddExpenseQ> => addExpense(form),
    onSuccess: (data: AddExpenseQ) => {
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
        queryKey: [QUERY_KEYs.EXPENSES],
      });
    },
  });
};
export const useUpdateExpense = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateExpenseF): Promise<UpdateExpenseQ> =>
      updateExpense(form, id),
    onSuccess: (data: UpdateExpenseQ) => {
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
        queryKey: [QUERY_KEYs.EXPENSES],
      });
    },
  });
};
export const useDeleteExpense = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteExpenseQ> => deleteExpense(ids),
    onSuccess: (data: DeleteExpenseQ) => {
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
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.EXPENSES],
      });
    },
  });
};
export const useRestoreExpense = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteExpenseQ> => restoreExpense(ids),
    onSuccess: (data: DeleteExpenseQ) => {
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
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_EXPENSES],
      });
    },
  });
};
