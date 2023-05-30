import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

export const fetchAsyncStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    const email = await AsyncStorage.getItem("email");
    const languages = await AsyncStorage.getItem("languages");

    const userData = { token, id, email, languages };

    return userData;
  } catch ({ message }: any) {
    alert(message);
  } finally {
    await setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }
};
