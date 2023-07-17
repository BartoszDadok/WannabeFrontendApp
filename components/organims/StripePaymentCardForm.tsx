import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, Image, Pressable } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { wait } from "../../utils/wait";
import { useNavigation } from "@react-navigation/native";
import { FlashcardScreenNavigationProp } from "../../types/navigations.types";
import { useRoute } from "@react-navigation/native";
import { FlashCardScreenRouteProp } from "../../types/navigations.types";
import { addLanguage } from "../../store/state/dataUserSlice";
import { colors } from "../../styles/colors";
import { capitalizeLetters } from "../../utils/capitalizeLetters";
import { LANGUAGE_IMAGES } from "../../utils/languagesImagesObject";
import WaitingForStripe from "../molecules/WaitingForStripeForm";
import PaymentProcessed from "../molecules/PaymentProcessed";
import { useLazyGetListOfLanguagesQuery } from "../../store/api/api";
import { useStripePaymentMutation } from "../../store/api/api";

type Error = { message: string } | { data: { errors: string[] } };

const StripePaymentCardForm = () => {
  const route = useRoute<FlashCardScreenRouteProp>();
  const languageName = route.params.languageName.toLowerCase();
  const [getListOfLanguages] = useLazyGetListOfLanguagesQuery();
  const [stripePayment] = useStripePaymentMutation();
  const capitalizedLanguageName = capitalizeLetters(languageName);
  const [isLoadingForStripeForm, setIsLoadingForStripeForm] = useState(false);
  const [isWaitingForPayment, setIsWaitingForPayment] = useState(false);
  const [errorPayment, setErrorPayment] = useState<{
    isError: boolean;
    message: string[];
  }>({
    isError: false,
    message: [],
  });
  const stripe = useStripe();
  const navigation = useNavigation<FlashcardScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const { id, email } = useAppSelector((state) => state.dataUser);
  const { mode } = useAppSelector((state) => state.theme);

  const checkIfLanguageIsOnList = (
    listOfLanguagesData: { languages: string[] },
    language: string
  ) => {
    const { languages } = listOfLanguagesData;
    return languages.includes(language);
  };

  const initStripeSheet = (data: { clientSecret: string; message: string }) => {
    return stripe.initPaymentSheet({
      paymentIntentClientSecret: data.clientSecret,
      merchantDisplayName: "Merchant Name",
    });
  };

  const handleStripeButton = async () => {
    setErrorPayment({ isError: false, message: [] });
    const language = languageName.toLowerCase();
    if (!id || !email) return;
    try {
      setIsLoadingForStripeForm(true);
      const stripeData = await stripePayment({
        id,
        email,
        languageName,
      }).unwrap();
      if (!stripeData || !stripeData.clientSecret) {
        setIsLoadingForStripeForm(false);
        throw Error("Stripe Payment data error occured");
      }
      const initiatedSheet = await initStripeSheet(stripeData);

      if (initiatedSheet.error) {
        throw Error("Initiation stripe sheet error occured.");
      }

      setIsLoadingForStripeForm(false);

      const presentSheet = await stripe.presentPaymentSheet();
      if (presentSheet.error) {
        throw Error("Presentation stripe sheet error occured");
      }

      setIsWaitingForPayment(true);

      await wait(8000);

      const listOfLanguages = (await getListOfLanguages().unwrap()) as {
        languages: string[];
      };

      if (!listOfLanguages || !listOfLanguages.languages) {
        throw Error("Language not found");
      }

      setIsWaitingForPayment(false);

      const isLanguageOnList = checkIfLanguageIsOnList(
        listOfLanguages,
        language
      );
      if (isLanguageOnList) {
        dispatch(addLanguage(language));
        navigation.navigate("DecksScreen");
      }
    } catch (err) {
      const error = err as Error;

      const selectedError =
        "message" in error ? error.message : error.data.errors[0];

      setErrorPayment({
        isError: true,
        message: [
          `Payment failed, please try again or contact us. ${selectedError}`,
        ],
      });
    }
  };

  return (
    <View
      testID='StripePaymentCardContainer'
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {errorPayment.isError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorPayment.message}</Text>
        </View>
      )}
      {isLoadingForStripeForm && <WaitingForStripe />}
      {isWaitingForPayment && <PaymentProcessed />}

      <Text style={[styles.header, { color: colors[mode].textColor }]}>
        {capitalizedLanguageName} interview questions
      </Text>
      <Text style={[styles.subHeader, { color: colors[mode].textColor }]}>
        5$ - lifetime access
      </Text>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 300, height: 200, resizeMode: "contain" }}
          source={(LANGUAGE_IMAGES as any)[languageName].uri}
        />
      </View>

      <Pressable
        testID='StripeButton'
        android_ripple={{ color: "rgba(255,228,0,0,8)" }}
        style={{ backgroundColor: colors[mode].primaryColor500 }}
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
    position: "absolute",
    top: 0,
    flexDirection: "column",
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
  errorContainer: {
    backgroundColor: "rgb(255, 99, 71)",
    position: "absolute",
    top: 0,
    flexDirection: "column",
    width: "100%",
    margin: 10,
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  errorText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
});

export default StripePaymentCardForm;
