import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlashCardScreenRouteProp } from "../types/navigations.types";
import AppLoading from "../components/atoms/AppLoading";
import FrontCard from "../components/organims/FrontCard";
import BackCard from "../components/organims/BackCard";
import Animated, { log } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { FlashcardScreenNavigationProp } from "../types/navigations.types";
import { colors } from "../styles/colors";
import Hjson from "hjson";
import { useGetFlashcardsQuery } from "../store/api/api";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { useAppSelector } from "../store/hooks";
import { isApiResponse } from "../utils/isApiErrorResponse";

type FlashCards = {
  _id: string;
  flashcard: string[];
}[];

// const LANGUAGE_IMAGES = {
//   react: {
//     uri: require("../assets/images/react-logo.png"),
//   },
// };

const FlashcardScreen = () => {
  const route = useRoute<FlashCardScreenRouteProp>();
  const languageName = route.params.languageName.toLowerCase();
  const { mode } = useAppSelector((state) => state.theme);

  const navigation = useNavigation<FlashcardScreenNavigationProp>();

  const { data, isLoading, isSuccess, error } =
    useGetFlashcardsQuery(languageName);
  const [flashcards, setFLashcards] = useState<{ html: string }[][][] | null>(
    null
  );

  const [flashcardNumber, setFlashcardNumber] = useState(0);
  const [activeCardSide, setActiveCardSide] = useState("front");
  useEffect(() => {
    if (isSuccess && data) {
      const flashcards = data.data;

      const prepareFlashcardsToRender = () => {
        return flashcards.map(({ flashcard }) => {
          const frontCard = Hjson.parse(flashcard[0]) as { html: string }[];
          const backCard = Hjson.parse(flashcard[1]) as { html: string }[];
          return [frontCard, backCard];
        });
      };
      const preparedFlashcards = prepareFlashcardsToRender();

      setFLashcards(preparedFlashcards);
    }
  }, [data, isSuccess]);

  // useEffect(() => {
  //   if (
  //     error &&
  //     (error as any).data &&
  //     (error as any).data.message &&
  //     (error as any).data.message === "Unauthorized access to flashcards!"
  //   ) {
  //     navigation.navigate("StripePaymentScreen", { languageName });
  //   }
  // }, [error, isError]);

  // const capitalizedFirstLetterLanguage = capitalizeFirstLetter(languageName);

  // if (
  //   error &&
  //   (error as any).data &&
  //   (error as any).data.message &&
  //   (error as any).data.message === "Unauthorized access!"
  // ) {
  //   return (
  //     <View
  //       style={[
  //         styles.errorContainer,
  //         { backgroundColor: colors[mode].backgroundColor },
  //       ]}
  //     >
  //       {/* <Text style={[styles.header, { color: colors[mode].textColor }]}>
  //         {capitalizedFirstLetterLanguage} interview questions
  //       </Text>
  //       <Text style={[styles.subHeader, { color: colors[mode].textColor }]}>
  //         10$ - lifetime access
  //       </Text>
  //       <View style={styles.imageContainer}>
  //         <Image
  //           style={{ width: 300, height: 100, resizeMode: "contain" }}
  //           source={(LANGUAGE_IMAGES as any)[languageName].uri}
  //         />
  //       </View>
  //       <Text style={[styles.subHeader, { color: colors[mode].textColor }]}>
  //         To get {capitalizedFirstLetterLanguage} flashcards first you have to
  //         be logged in.
  //       </Text>
  //       <Pressable
  //         style={[
  //           styles.buttonContainer,
  //           { backgroundColor: colors[mode].backgroundColor },
  //         ]}
  //         onPress={() => {
  //           navigation.navigate("LoginScreen", { afterSignup: false });
  //         }}
  //         android_ripple={{ color: "rgba(255,228,0,0,8)" }}
  //       >
  //         <Text style={styles.buttonText}>Log in</Text>
  //       </Pressable> */}
  //       <Text style={[styles.header, { color: colors[mode].textColor }]}>
  //         Not available yet. We are working on that.
  //       </Text>
  //     </View>
  //   );
  // }
  if (error) {
    return (
      <View
        style={[
          styles.errorContainer,
          { backgroundColor: colors[mode].backgroundColor },
        ]}
      >
        <Text style={[styles.header, { color: colors[mode].textColor }]}>
          {isApiResponse(error)
            ? "Not available yet. We are working on that."
            : "Something went wrong, check your internet connection."}
        </Text>
      </View>
    );
  }

  if (!isLoading && isSuccess && flashcards)
    return (
      <Animated.View
        style={{ flex: 1, backgroundColor: colors[mode].backgroundColor }}
      >
        {activeCardSide === "front" ? (
          <FrontCard
            languageName={languageName}
            flashcard={flashcards && flashcards[flashcardNumber]}
            flashcardNumber={flashcardNumber}
            setFlashcardNumber={setFlashcardNumber}
            setActiveCardSide={setActiveCardSide}
            flashcardsAmount={flashcards && (flashcards as []).length}
          />
        ) : (
          <BackCard
            flashcard={flashcards && flashcards[flashcardNumber]}
            flashcardNumber={flashcardNumber}
            setFlashcardNumber={setFlashcardNumber}
            setActiveCardSide={setActiveCardSide}
            flashcardsAmount={flashcards && (flashcards as []).length}
          />
        )}
      </Animated.View>
    );
  return <AppLoading theme={mode} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  buttonContainer: { marginTop: 20 },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  imageContainer: {
    marginVertical: 30,
  },
});

export default FlashcardScreen;
