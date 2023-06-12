import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";
import { capitalizeLetters } from "../../utils/capitalizeLetters";
import { LANGUAGE_IMAGES } from "../../utils/languagesImagesObject";
import { FlashcardScreenNavigationProp } from "../../types/navigations.types";
import { useNavigation } from "@react-navigation/native";
interface Props {
  languageName: string;
}
const BeLoggedIn = ({ languageName }: Props) => {
  const { mode } = useAppSelector((state) => state.theme);
  const navigation = useNavigation<FlashcardScreenNavigationProp>();

  const capitalizedLetters = capitalizeLetters(languageName);
  return (
    <View
      style={[
        styles.errorContainer,
        { backgroundColor: colors[mode].backgroundColor },
      ]}
    >
      <Text style={[styles.header, { color: colors[mode].textColor }]}>
        {capitalizedLetters} interview questions
      </Text>
      <Text style={[styles.subHeader, { color: colors[mode].textColor }]}>
        5$ - lifetime access
      </Text>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 300, height: 100, resizeMode: "contain" }}
          source={(LANGUAGE_IMAGES as any)[languageName].uri}
        />
      </View>
      <Text style={[styles.subHeader, { color: colors[mode].textColor }]}>
        To get {capitalizedLetters} flashcards first you have to be logged in.
      </Text>
      <Pressable
        style={[
          styles.buttonContainer,
          { backgroundColor: colors[mode].primaryColor500 },
        ]}
        onPress={() => {
          navigation.navigate("LoginScreen", { afterSignup: false });
        }}
        android_ripple={{ color: "rgba(255,228,0,0,8)" }}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
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
export default BeLoggedIn;
