import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colors } from "../../styles/colors";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateTheme } from "../../store/state/themeSlice";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ThemePanel = () => {
  const dispatch = useAppDispatch();

  const { mode } = useAppSelector((state) => state.theme);
  return (
    <View testID='ThemePanelContainer' style={styles.themeModesContainer}>
      <Text
        style={[styles.themeModesHeader, { color: colors[mode].textColor }]}
      >
        Themes:
      </Text>
      <View style={styles.themeModesButtonContainer}>
        <Pressable
          testID='DarkModeButton'
          onPress={() => {
            dispatch(updateTheme("dark"));
          }}
          style={styles.themeModesButton}
        >
          <Entypo name='moon' size={20} color={colors[mode].textColor} />
          <Text
            style={[
              styles.themeModesTextButton,
              { color: colors[mode].textColor },
            ]}
          >
            Dark
          </Text>
          {mode === "dark" && (
            <Ionicons name='checkmark' size={15} color='rgb(255, 228, 0)' />
          )}
        </Pressable>
        <Pressable
          testID='LightModeButton'
          onPress={() => {
            dispatch(updateTheme("light"));
          }}
          style={styles.themeModesButton}
        >
          <Entypo name='light-up' size={20} color={colors[mode].textColor} />
          <Text
            style={[
              styles.themeModesTextButton,
              { color: colors[mode].textColor },
            ]}
          >
            Light
          </Text>
          {mode === "light" && (
            <Ionicons name='checkmark' size={15} color='black' />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  themeModesContainer: {
    marginTop: 30,
    padding: 20,
  },
  themeModesHeader: {
    fontFamily: "open-sans",
    borderBottomColor: "rgb(255, 228, 0)",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },

  themeModesButtonContainer: {},

  themeModesButton: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  themeModesTextButton: {
    marginHorizontal: 15,
    fontFamily: "open-sans",
  },
});
export default ThemePanel;
