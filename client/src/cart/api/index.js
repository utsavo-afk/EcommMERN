import axios from "axios";
import authHelper from "../../auth/auth-helper";
const baseUrl = "/api/payments";

export const getPaymentToken = async () => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.get(`${baseUrl}/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const processClientPayment = async (paymentObject) => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.post(`${baseUrl}/${user._id}`, paymentObject, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createOrder = async (orderObject) => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.post(`api/orders/${user._id}`, orderObject, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
