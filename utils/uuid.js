import { v4 as uuidv4 } from "uuid";

export function generateUuid() {
  const uuid = uuidv4();
  localStorage.setItem("uuid", uuid);
}

export function checkUuid() {
  return window.localStorage.getItem("uuid");
}

export function removeUuid() {
  window.localStorage.removeItem("uuid");
}
