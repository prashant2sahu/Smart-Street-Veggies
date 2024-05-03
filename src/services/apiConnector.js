import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true, // Ensure credentials are included with requests
});

export const apiConnector = (method, url, bodyData, header, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: header ? { ...header } : null, // Spread the header object
    params: params ? params : null,
  });
};
