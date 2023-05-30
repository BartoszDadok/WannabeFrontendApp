import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchAsyncStorageTheme = async () => {
  const themeMode = (await AsyncStorage.getItem("mode")) as
    | "light"
    | "dark"
    | null;

  return themeMode;
};
