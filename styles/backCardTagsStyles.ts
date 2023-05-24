import { colors } from "./colors";

export const backCardTagsStyles = (mode: "dark" | "light") => {
  return {
    h1: {
      color: colors[mode].textColor,
      fontSize: 18,
      fontWeight: "normal",
      marginVertical: 5,
    },
    li: {
      color: colors[mode].textColor,
      fontSize: 18,
      fontWeight: "normal",
      padding: 0,
      margin: 0,
    },
    ul: {
      color: colors[mode].textColor,
      marginLeft: 10,
      borderLeftColor: "#a3a3a3",
      borderLeftWidth: 3,
      paddingLeft: 5,
      marginVertical: 5,
      listStyleType: "none",
    },
    thead: {
      color: colors[mode].textColor,
      textAlign: "center",
      borderBottomColor: "#a3a3a3",
      borderBottomWidth: 2,
    },
    table: {
      backgroundColor: colors[mode].tableColor,
      padding: 8,
      marginVertical: 5,
    },

    th: {
      color: colors[mode].textColor,
      textAlign: "center",
    },
    tr: {
      color: colors[mode].textColor,
      textAlign: "center",
    },
    blockquote: {
      borderRadius: 5,
      paddingHorizontal: 20,
      margin: 0,
      backgroundColor: colors[mode].tableColor,
      color: colors[mode].textColor,
    },
    hr: {
      marginTop: 20,
    },
  };
};
