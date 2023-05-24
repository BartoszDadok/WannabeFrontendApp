import { colors } from "./colors";
export const frontCardTagsStyles = (mode: "dark" | "light") => {
  return {
    h1: {
      color: colors[mode].textColor,
      fontSize: 32,
      textAlign: "center",
      fontWeight: "normal",
      justifyContent: "center",
      alignItems: "center",
    },
    li: {
      fontSize: 18,
      fontWeight: "normal",
      padding: 0,
      margin: 0,
    },
    ul: {
      marginLeft: 10,
      borderLeftColor: "#a3a3a3",
      borderLeftWidth: 3,
      paddingLeft: 5,
      marginVertical: 5,
      listStyleType: "none",
    },
  };
};
