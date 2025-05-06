/* eslint-disable no-unused-vars */
import { get, myDelete, patch, post } from "../utils/requests";

export const loginAccount = async (dataSubmit) => {
  const data = await post(`/admin333/account/login`, dataSubmit);
  return data
}