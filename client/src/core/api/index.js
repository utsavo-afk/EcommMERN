import axios from "axios";
import queryString from "query-string";

export const listProductsHome = async (sortBy) => {
  try {
    let response = await axios.get(
      `/api/products?sortBy=${sortBy}&order=desc&limit=6`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const listProductsByFilter = async (
  skip = 0,
  limit = 6,
  filters = {}
) => {
  try {
    let response = await axios.post(`/api/products/search`, {
      skip,
      limit,
      filters,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const listProductsBySearch = async (params) => {
  const query = queryString.stringify(params);
  try {
    let response = await axios.get(`/api/products/search?${query}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const readProduct = async (id) => {
  try {
    let response = await axios.get(`/api/products/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const suggestProducts = async (id) => {
  try {
    let response = await axios.get(`/api/related-products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
