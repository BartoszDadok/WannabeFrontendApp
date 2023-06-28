import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles/colors";
import { useAppSelector } from "../../store/hooks";
import LockIcon from "../atoms/LockIcon";
import DeckFreeMark from "../atoms/DeckFreeMark";

interface Props {
  language: string;
  amountOfCards: number;
  onPress: (id: string) => void;
  isfreeLanguage: boolean;
}

const DeckTab = ({
  language,
  amountOfCards,
  onPress,
  isfreeLanguage,
}: Props) => {
  const languageName = language;
  const { isLoggedIn, languages } = useAppSelector((state) => state.dataUser);
  const { mode } = useAppSelector((state) => state.theme);

  const isActiveLanguage =
    isfreeLanguage ||
    (isLoggedIn &&
      languages &&
      languages.includes(languageName.toLocaleLowerCase()));

  const backgroundColor = isActiveLanguage
    ? colors[mode].secondaryColor500
    : colors[mode].secondaryColor200;

  return (
    <View
      testID='Container'
      style={[
        styles.deckTabContainer,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      {isfreeLanguage && <DeckFreeMark />}
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.pressableContainer, styles.pressed]
            : styles.pressableContainer
        }
        onPress={() => onPress(languageName)}
        android_ripple={{ color: "rgba(255,228,0,0,8)" }}
      >
        <View style={styles.decTitle}>
          {isActiveLanguage ? (
            <LockIcon lockOpen={true} />
          ) : (
            <LockIcon lockOpen={false} />
          )}
          <Text style={styles.textTab}>{languageName}</Text>
        </View>
        <Text style={styles.textDescription}>{amountOfCards} questions</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  deckTabContainer: {
    marginVertical: 5,
    height: 60,
  },
  pressableContainer: {
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textTab: {
    fontFamily: "open-sans-bold",
    marginRight: 10,
  },
  textDescription: {
    fontFamily: "open-sans",
  },
  decTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default DeckTab;
