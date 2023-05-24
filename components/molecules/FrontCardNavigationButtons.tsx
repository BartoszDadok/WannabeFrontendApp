import { View, StyleSheet, Platform, Dimensions } from "react-native";
import NavigationButton from "../atoms/NavigationButton";

interface Props {
  setActiveCardSide: React.Dispatch<React.SetStateAction<string>>;
  questionsHandler: (direction: "next" | "previous") => void;
}

const FrontCardNavigationButtons = ({
  questionsHandler,
  setActiveCardSide,
}: Props) => {
  const deviceWidth = Dimensions.get("window").width;
  const buttonWidth = deviceWidth / 3 - 20;

  return (
    <View>
      <View style={styles.container}>
        <NavigationButton
          handler={() => questionsHandler("previous")}
          width={buttonWidth}
          title={"Previous"}
        />
        <NavigationButton
          handler={() => {
            setActiveCardSide("back");
          }}
          width={buttonWidth}
          title={"Check answer"}
        />
        <NavigationButton
          handler={() => questionsHandler("next")}
          width={buttonWidth}
          title={"Next"}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: Platform.OS === "ios" ? 20 : 5,
  },
});
export default FrontCardNavigationButtons;
