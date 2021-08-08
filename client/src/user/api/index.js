import axios from "axios";
import authHelper from "../../auth/auth-helper";

export const update = async (data) => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.put(`/api/users/${user._id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrderHistory = async () => {
  let { token, user } = authHelper.extractAuth();
  try {
    let response = await axios.get(`/api/${user._id}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
