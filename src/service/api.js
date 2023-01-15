import axios from "axios";

export default () => {
  let currentUser;
  try {
    currentUser = JSON.parse(window.localStorage.currentUser);
  } catch (e) {
    currentUser = null;
  }

  return axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: currentUser && currentUser.token,
    },
  });
};
