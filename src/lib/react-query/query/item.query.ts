import { useToast } from "@/components/ui/use-toast";
import {
  AddItemF,
  AddItemQ,
  CountItemF,
  CountItemQ,
  DeleteItemQ,
  GetItemByIdQ,
  GetItemsInAddQ,
  GetItemsLessQ,
  GetItemsQ,
  UpdateItemF,
  UpdateItemQ,
} from "@/types/items";
import {
  Filter,
  From,
  Id,
  NestError,
  Page,
  PaginationReturnType,
  To,
} from "@/types/global";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import {
  addItem,
  countItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
  searchItems,
  getDeletedItems,
  searchDeletedItems,
} from "../actions/item.action";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";
import { deleteImage, insertImage } from "../actions/firebase.action";
import { ref, StorageReference } from "firebase/storage";
import { firebaseStorage } from "@/lib/config/firebase.config";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { Search } from "react-router-dom";

export const useGetItems = (filter: Filter, from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.ITEMS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsQ>> =>
      getItems(toast, pageParam, ENUMs.LIMIT as number, filter, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetDeletedItems = (filter: Filter, from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_ITEMS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetItemsQ>> =>
      getDeletedItems(
        toast,
        pageParam,
        ENUMs.LIMIT as number,
        filter,
        from,
        to
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useSearchItems = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_ITEMS],
    queryFn: (): Promise<GetItemsQ> => searchItems(toast, search),
    enabled: !!search,
    retry: 0,
  });
};
export const useSearchDeletedItems = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_ITEMS],
    queryFn: (): Promise<GetItemsQ> => searchDeletedItems(toast, search),
    enabled: !!search,
    retry: 0,
  });
};
export const useGetItemById = (id: Id | null) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.ITEM_BY_ID, id],
    queryFn: (): Promise<GetItemByIdQ> => getItemById(toast, id),
    retry: 0,
    enabled: !!id,
  });
};

export const useAddItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: AddItemF): Promise<AddItemQ> => {
      let imageRef: StorageReference | null = null;

      try {
        const {
          image_url,
          image_name,
          imageRef: ref,
        } = await insertImage(
          form.image[0],
          ENUMs.ITEM_BUCKET as string,
          toast
        );
        imageRef = ref;
        let { image, ...others } = form;
        let finalForm = { image_url, image_name, ...others };

        const result = await addItem(finalForm);

        return result;
      } catch (error: any) {
        if (imageRef) {
          await deleteImage(imageRef, toast);
        }
        throw error;
      }
    },
    onSuccess: (data: AddItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEMS_IN_ADD],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
export const useUpdateItem = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateItemF): Promise<UpdateItemQ> => {
      let imageRef: StorageReference | null = null;
      let oldImageRef: StorageReference | null = null;

      //if new image uploaded -> delete old -> upload new
      if (form.image && form.image[0]) {
        if (form.old_image_url != "") {
          oldImageRef = ref(firebaseStorage, form.old_image_url);
          await deleteImage(oldImageRef, toast);
        }
        try {
          const {
            image_url,
            image_name,
            imageRef: ref,
          } = await insertImage(
            form.image[0],
            ENUMs.ITEM_BUCKET as string,
            toast
          );

          imageRef = ref;
          let { image, ...others } = form;
          let finalForm = { image_url, image_name, ...others };
          let { old_image_name, old_image_url, ...final } = finalForm;

          const result = await updateItem(final, id);

          return result;
        } catch (error: any) {
          if (imageRef) {
            await deleteImage(imageRef, toast);
          }
          throw error;
        }
      } else {
        let image_url = form.old_image_url;
        let image_name = form.old_image_name;
        let finalForm = { image_url, image_name, ...form };
        let { old_image_name, old_image_url, ...final } = finalForm;

        return await updateItem(final, id);
      }
    },
    onSuccess: (data: UpdateItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEM_BY_ID, id],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEMS_IN_ADD],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
export const useCountItem = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: CountItemF): Promise<CountItemQ> =>
      countItem(form, id),
    onSuccess: (data: CountItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEMS],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
export const useDeleteItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteItemQ> => deleteItem(ids),
    onSuccess: (data: DeleteItemQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEM_BY_ID],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.ITEMS],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};

export const useRestoreItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteUserQ> => restoreUser(ids),
    onSuccess: (data: DeleteUserQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_DELETED_USERS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_USERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
