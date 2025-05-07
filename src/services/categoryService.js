/* eslint-disable no-unused-vars */
import { get, del, patch, post } from "../utils/requests";

import variables from "../config/variables";

export const getAllCategories = async () => {
  const data = await get(`/${variables.pathAdmin}/categories`);
  return data;
}

export const getCategoryById = async (categoryId) => {
  const data = await get(`/${variables.pathAdmin}/categories/${categoryId}`);
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

export const editCategory = async (itemId, dataSubmit) => {
  const data = await patch(`/${variables.pathAdmin}/categories/${itemId}`, dataSubmit);
  return data;
}

export const deleteCategorySoft = async (itemId) => {
  const data = await del(`/${variables.pathAdmin}/categories/${itemId}`);
  return data;
}