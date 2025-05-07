/* eslint-disable no-unused-vars */
import { get, myDelete, patch, post } from "../utils/requests";

import variables from "../config/variables";

export const getAllCategories = async () => {
  const data = await get(`/${variables.pathAdmin}/categories`);
  return data;
}

export const getCategoriesTree = async () => {
  const data = await get(`/${variables.pathAdmin}/categories/create`);
  return data;
}

export const createCategory = async (dataSubmit) => {
  const data = await post(`/${variables.pathAdmin}/categories`, dataSubmit);
  return data;
}