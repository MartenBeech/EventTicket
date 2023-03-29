import { getItemAsync, setItemAsync } from "expo-secure-store";

export async function setStorePair(key: string, value: string) {
  await setItemAsync(key, value);
}

export async function getStoreValue(key: string) {
  return await getItemAsync(key);
}
