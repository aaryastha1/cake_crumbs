import axiosClient from "../api/axiosClient";

export const registerUser = (data) => axiosClient.post("/users/register", data);
export const loginUser = (data) => axiosClient.post("/users/login", data);

// export const googleLogin = (credential) => axiosClient.post("/users/google", { credential });
// export const getProfile = () => axiosClient.get("/user/profile");
// export const updateProfile = (data) => axiosClient.put("/user/profile", data);
