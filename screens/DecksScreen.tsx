import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DeckTab from "../components/organims/DeckTab";
import { useNavigation } from "@react-navigation/native";
import { FlashcardScreenNavigationProp } from "../types/navigations.types";
import { useAppSelector } from "../store/hooks";
import { colors } from "../styles/colors";
import { useAppDispatch } from "../store/hooks";
import { resetFlashcards } from "../store/state/flashCardSlice";

const DecksScreen = () => {
  const navigation = useNavigation<FlashcardScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const pressHandler = (languageName: string) => {
    dispatch(resetFlashcards());
    navigation.navigate("FlashcardScreen", {
      languageName: languageName,
    });
  };

  const { mode } = useAppSelector((state) => state.theme);
  return (
    <View
      style={[
        styles.decksContainer,
        { backgroundColor: colors[mode].backgroundColor },
      ]}
    >
      <View
        style={[
          { backgroundColor: colors[mode].notificationColor },
          styles.notificationBar,
        ]}
      >
        <Text
          style={[
            { color: colors[mode].textColor },
            styles.textNotificationBar,
          ]}
        >
          Wannabe is a new project. Every day new interview questions are added.
        </Text>
      </View>
      <Text style={[{ color: colors[mode].textColor }, styles.header]}>
        Pick the deck:
      </Text>
      <View style={styles.deckContainer}>
        <DeckTab
          language={"JavaScript"}
          isfreeLanguage={true}
          onPress={pressHandler}
          amountOfCards={121}
        />
        <DeckTab
          language={"HTML"}
          isfreeLanguage={true}
          onPress={pressHandler}
          amountOfCards={20}
        />
        <DeckTab
          language={"CSS"}
          isfreeLanguage={true}
          onPress={pressHandler}
          amountOfCards={20}
        />
        <DeckTab
          language={"React"}
          isfreeLanguage={true}
          onPress={pressHandler}
          amountOfCards={49}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  decksContainer: {
    flex: 1,
  },
  notificationBar: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textNotificationBar: {
    textAlign: "center",
  },
  deckContainer: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    fontFamily: "open-sans-bold",
    marginTop: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default DecksScreen;
