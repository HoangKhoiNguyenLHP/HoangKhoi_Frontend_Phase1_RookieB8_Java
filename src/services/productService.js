/* eslint-disable no-unused-vars */
import { get, myDelete, patch, post } from "../utils/requests";

import variables from "../config/variables";

export const getAllProducts = async () => {
  const data = await get(`/${variables.pathAdmin}/products`);
  return data;
}