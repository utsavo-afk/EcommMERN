import axios from "axios";
const baseUrl = "/auth";

export const signin = async (payload) => {
  try {
    let response = await axios.post(`${baseUrl}/signin`, payload);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (payload) => {
  try {
    let response = await axios.post(`${baseUrl}/register`, payload);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
