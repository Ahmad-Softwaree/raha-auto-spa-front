import { useToast } from "@/components/ui/use-toast";
import {
  AddUserF,
  AddUserQ,
  DeleteUserQ,
  GetUsersQ,
  UpdateUserF,
  UpdateUserQ,
} from "@/types/auth";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../actions/user.action";
import { QUERY_KEYs } from "../key";
import { Id, NestError, Page, PaginationReturnType } from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";

export const useGetUsers = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.USERS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetUsersQ>> =>
      getUsers(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useAddUser = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: (form: AddUserF): Promise<AddUserQ> => addUser(form),
    onSuccess: (data: AddUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useUpdateUser = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateUserF): Promise<UpdateUserQ> =>
      updateUser(form, id),
    onSuccess: (data: UpdateUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useDeleteUser = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<DeleteUserQ> => deleteUser(id),
    onSuccess: (data: DeleteUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
