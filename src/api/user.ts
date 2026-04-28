import { axiosClient } from "../config";

export const deleteUser = async () => {
  return (await axiosClient.delete(`/user/delete`)).data;
};
