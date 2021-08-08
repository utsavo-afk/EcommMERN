import axios from "axios";
import authHelper from "../../auth/auth-helper";

export const listProducts = async () => {
  try {
    let response = await axios.get("/api/products");
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const listCategories = async () => {
  try {
    let response = await axios.get("/api/categories");
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createCategory = async (token, uid, data) => {
  try {
    let response = await axios.post(`/api/categories/create/${uid}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProduct = async (token, uid, data) => {
  try {
    let response = await axios.post(`/api/products/${uid}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const listOrders = async () => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.get(`/api/orders/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const readOrder = async (oid) => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.get(`/api/${user._id}/order/${oid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getStatusOptions = async () => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.get(`/api/${user._id}/orders/getStatusValues`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateOrderStatus = async (status, orderId) => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.put(
      `/api/${user._id}/order/${orderId}`,
      status,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const listAllProducts = async () => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.get(`/api/products/listAll/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProduct = async (id) => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.delete(`/api/products/${user._id}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProduct = async (pid, data) => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.put(`/api/products/${user._id}/${pid}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
