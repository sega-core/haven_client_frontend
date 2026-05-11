import { axiosClient } from "../config";

export const deleteUser = async () => {
  return (await axiosClient.delete(`/user/delete`)).data;
};

export const updateUser = async (body: { onboardingCompleted: boolean }) => {
  return (await axiosClient.put(`/user/update`, { ...body })).data;
};
