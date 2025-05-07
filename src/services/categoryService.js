/* eslint-disable no-unused-vars */
import { get, myDelete, patch, post } from "../utils/requests";

import variables from "../config/variables";

export const getAllCategories = async () => {
  const data = await get(`/${variables.pathAdmin}/categories`);
  return data;
}