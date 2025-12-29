import { proxy } from "valtio";

export const cakeState = proxy({
  color: "#ffffff",
  shape: "round",
  layers: 1,
  toppings: [],
  adminCakeTexture: "", // This will hold the dynamic URL from your backend
  aiDesign: { message: "Happy Birthday" }
});