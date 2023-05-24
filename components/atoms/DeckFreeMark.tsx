import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DeckFreeMark = () => {
  return <Text style={styles.text}>Free</Text>;
};

export default DeckFreeMark;

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: 13,
    position: "absolute",
    backgroundColor: "#f76a6a",
    color: "white",
    right: 0,
    paddingHorizontal: 10,
    marginTop: 0,
  },
});
