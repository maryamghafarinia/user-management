import type { IAPISuccessResponse } from "types";
import { restAPI } from "./config";

const getData = (res: any) => (res.data as IAPISuccessResponse).data;

export function getUsersRequest(page: number, limit: number) {
  return restAPI
    .get<IAPISuccessResponse>("/users", {
      params: { limit, page },
    })
    .then(getData);
}

export function addUserRequest(data: FormData) {
  return restAPI
    .post<IAPISuccessResponse>("/users", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(getData);
}

export function updateUserRequest(id: number, data: FormData) {
  return restAPI
    .patch<IAPISuccessResponse>(`/users/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(getData);
}

export function deleteUserRequest(id: number) {
  return restAPI.delete<IAPISuccessResponse>(`/users/${id}`).then(getData);
}
