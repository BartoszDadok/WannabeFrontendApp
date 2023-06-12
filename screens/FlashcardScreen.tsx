import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { FlashCardScreenRouteProp } from "../types/navigations.types";
import AppLoading from "../components/atoms/AppLoading";
import FrontCard from "../components/organims/FrontCard";
import BackCard from "../components/organims/BackCard";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { FlashcardScreenNavigationProp } from "../types/navigations.types";
import { colors } from "../styles/colors";
import { useGetFlashcardsQuery } from "../store/api/api";
import { useAppSelector } from "../store/hooks";
import { isApiResponse } from "../utils/isApiErrorResponse";
import { prepareFlashcardsToRender } from "../utils/prepareFlashcardsToRender";
import ErrorInternetConnection from "../components/organims/ErrorInternetConnection";
import BeLoggedIn from "../components/organims/BeLoggedIn";
import TypeScriptUnAvailable from "../components/organims/TypeScriptUnAvailable";
import { setFLashcardsData } from "../store/state/flashCardSlice";
import { useAppDispatch } from "../store/hooks";

const FlashcardScreen = () => {
  const route = useRoute<FlashCardScreenRouteProp>();
  const languageName = route.params.languageName.toLowerCase();
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const { activeCardSide, flashcardsData } = useAppSelector(
    (state) => state.flashcard
  );
  const navigation = useNavigation<FlashcardScreenNavigationProp>();

  const { data, isLoading, isSuccess, error } =
    useGetFlashcardsQuery(languageName);

  const isInternetError = error && !isApiResponse(error);

  const areFlashCardsUnavailable =
    error &&
    isApiResponse(error) &&
    error.data &&
    error.data.errors &&
    error.data.errors[0] === "Unauthorized access to flashcards!";

  const areFlashCardsAvailable =
    !isLoading && isSuccess && flashcardsData && flashcardsData.length > 0;
  const isUserLogOut =
    error &&
    isApiResponse(error) &&
    error.data &&
    error.data.message &&
    error.data.message === "Unauthorized access!";

  const navigateToStripePaymentScreen = () => {
    if (areFlashCardsUnavailable) {
      navigation.navigate("StripePaymentScreen", { languageName });
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      const flashcards = data.data;
      const preparedFlashcards = prepareFlashcardsToRender(flashcards);
      dispatch(setFLashcardsData(preparedFlashcards));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (languageName === "typescript") return;
    navigateToStripePaymentScreen();
  }, [error]);

  if (languageName === "typescript") {
    return <TypeScriptUnAvailable />;
  }

  if (isUserLogOut) {
    return <BeLoggedIn languageName={languageName} />;
  }

  if (isInternetError) {
    return <ErrorInternetConnection />;
  }

  if (areFlashCardsAvailable)
    return (
      <Animated.View
        style={{ flex: 1, backgroundColor: colors[mode].backgroundColor }}
      >
        {activeCardSide === "front" ? (
          <FrontCard languageName={languageName} />
        ) : (
          <BackCard />
        )}
      </Animated.View>
    );
  return <AppLoading theme={mode} />;
};

export default FlashcardScreen;
