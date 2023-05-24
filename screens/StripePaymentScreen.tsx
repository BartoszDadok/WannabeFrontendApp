import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { colors } from "../styles/colors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { wait } from "../utils/wait";
import { useNavigation } from "@react-navigation/native";
import { FlashcardScreenNavigationProp } from "../types/navigations.types";
import { useRoute } from "@react-navigation/native";
import { FlashCardScreenRouteProp } from "../types/navigations.types";
import { addLanguage } from "../store/state/userDataSlice";

const StripePaymentScreen = () => {
  const route = useRoute<FlashCardScreenRouteProp>();
  const languageName = route.params.languageName.toLowerCase();

  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingForPayment, setIsWaitingForPayment] = useState(false);
  const stripe = useStripe();
  const navigation = useNavigation<FlashcardScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const { id, email, token } = useAppSelector((state) => state.userData);
  const { mode } = useAppSelector((state) => state.theme);
  const handleStripeButton = async () => {
    const language = languageName.toLowerCase();
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://champagne-cockroach-wear.cyclic.app/stripe-react-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            id,
            languageName: language,
          }),
        }
      );
      const data = (await response.json()) as {
        clientSecret: string;
        message: string;
      };
      if (!response.ok) {
        return Alert.alert(data.message);
      }
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Merchant Name",
      });

      if (initSheet.error) {
        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }
      setIsLoading(false);
      const presentSheet = await stripe.presentPaymentSheet();
      if (presentSheet.error) {
        console.log(presentSheet.error);
        return Alert.alert(presentSheet.error.message);
      }
      setIsWaitingForPayment(true);
      await wait(8000);
      setIsWaitingForPayment(false);
      dispatch(addLanguage(language));
      navigation.navigate("DecksScreen");
    } catch (err) {
      console.log(err);
      Alert.alert("Payment failed!");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {isLoading && (
        <View
          style={[
            styles.containerLoading,
            { backgroundColor: colors[mode].backgroundColor },
          ]}
        >
          <ActivityIndicator size={20} color='black' />
          <Text style={styles.textLoading}>Loading payment form...</Text>
        </View>
      )}
      {isWaitingForPayment && (
        <View
          style={[
            styles.containerLoading,
            { backgroundColor: colors[mode].backgroundColor },
          ]}
        >
          <ActivityIndicator size={20} color='black' />
          <Text style={styles.textLoading}>
            Your payment is being processed... It can take few seconds.
          </Text>
          <Text></Text>
        </View>
      )}
      <Text style={[styles.header, { color: colors[mode].textColor }]}>
        React interview questions
      </Text>
      <Text style={[styles.subHeader, { color: colors[mode].textColor }]}>
        10$ - lifetime access
      </Text>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 300, height: 200, resizeMode: "contain" }}
          source={require("../assets/images/react-logo.png")}
        />
      </View>

      <Pressable
        android_ripple={{ color: "rgba(255,228,0,0,8)" }}
        style={{ backgroundColor: colors[mode].backgroundColor }}
        onPress={handleStripeButton}
      >
        <Text style={styles.buttonText}>Get it</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  containerLoading: {
    flexDirection: "row",
    width: "100%",
    margin: 10,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  textLoading: {
    textAlign: "center",
    fontSize: 18,
    marginLeft: 15,
    fontFamily: "open-sans",
  },
  input: {
    borderWidth: 1,
    height: 40,
    fontSize: 16,
    fontFamily: "open-sans",
    paddingLeft: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 30,
    fontFamily: "open-sans",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontFamily: "open-sans",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  buttonText: {
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  imageContainer: {
    marginVertical: 30,
  },
});

export default StripePaymentScreen;
