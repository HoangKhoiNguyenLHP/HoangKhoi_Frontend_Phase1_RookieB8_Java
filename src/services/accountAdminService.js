/* eslint-disable no-unused-vars */
import { get, myDelete, patch, post } from "../utils/requests";

export const loginAccount = async (dataSubmit) => {
  const data = await post(`/admin333/account/login`, dataSubmit);
  return data;
}

export const logoutAccount = async (dataSubmit) => {
  const data = await post(`/admin333/account/logout`, dataSubmit);
  return data;
}

export const registerAccount = async (dataSubmit) => {
  const data = await post(`/admin333/account/register`, dataSubmit);
  return data;
}