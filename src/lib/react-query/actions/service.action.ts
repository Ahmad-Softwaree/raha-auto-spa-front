import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  AddServiceF,
  AddServiceQ,
  DeleteServiceQ,
  GetServicesQ,
  UpdateServiceF,
  UpdateServiceQ,
} from "@/types/service";
import {
  From,
  Id,
  Limit,
  Page,
  PaginationReturnType,
  Search,
  To,
  ToastType,
} from "@/types/global";

export const getServices = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetServicesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetServicesQ>
    >(
      `${URLs.GET_SERVICES}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getServicesSelection = async (
  toast: ToastType
): Promise<GetServicesQ> => {
  try {
    const { data, status } = await authApi.get<GetServicesQ>(
      `${URLs.GET_SERVICES_SELECTION}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getDeletedService = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  from: From,
  to: To
): Promise<PaginationReturnType<GetServicesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetServicesQ>
    >(
      `${URLs.GET_DELETED_SERVICES}?page=${page}&limit=${limit}&from=${
        from != "" ? from : ""
      }&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const searchServices = async (
  toast: ToastType,
  search: Search
): Promise<GetServicesQ> => {
  try {
    const { data, status } = await authApi.get<GetServicesQ>(
      `${URLs.SEARCH_SERVICES}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const searchDeletedServices = async (
  toast: ToastType,
  search: Search
): Promise<GetServicesQ> => {
  try {
    const { data, status } = await authApi.get<GetServicesQ>(
      `${URLs.SEARCH_DELETED_SERVICES}?search=${search}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const addService = async (form: AddServiceF): Promise<AddServiceQ> => {
  try {
    const { data, status } = await authApi.post<AddServiceQ>(
      `${URLs.ADD_SERVICE}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateService = async (
  form: UpdateServiceF,
  id: Id
): Promise<UpdateServiceQ> => {
  try {
    const { data, status } = await authApi.put<UpdateServiceQ>(
      `${URLs.UPDATE_SERVICE}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const deleteService = async (ids: Id[]): Promise<DeleteServiceQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.delete(
        `${URLs.DELETE_SERVICE}/${id}`
      );
      return id;
    } catch (error) {
      throw error;
    }
  });

  // Wait for all requests to complete
  const results = await Promise.all(requests);

  return results.filter((result) => result !== null);
};
export const restoreService = async (ids: Id[]): Promise<DeleteServiceQ> => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const requests = idArray.map(async (id, index) => {
    try {
      // Add a timeout between requests
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout duration as needed
      }
      const { data, status } = await authApi.put(
        `${URLs.RESTORE_SERVICE}/${id}`
      );
      return id;
    } catch (error) {
      throw error;
    }
  });

  // Wait for all requests to complete
  const results = await Promise.all(requests);

  return results.filter((result) => result !== null);
};
