import { View, StyleSheet, Platform, Dimensions } from "react-native";
import NavigationButton from "../atoms/NavigationButton";
import { setActiveCardSide, swapCard } from "../../store/state/flashCardSlice";
import { useAppDispatch } from "../../store/hooks";

const FrontCardNavigationButtons = () => {
  const deviceWidth = Dimensions.get("window").width;
  const buttonWidth = deviceWidth / 3 - 20;
  const dispatch = useAppDispatch();
  return (
    <View>
      <View style={styles.container}>
        <NavigationButton
          handler={() => dispatch(swapCard("previous"))}
          width={buttonWidth}
          title={"Previous"}
        />
        <NavigationButton
          handler={() => dispatch(setActiveCardSide("back"))}
          width={buttonWidth}
          title={"Check answer"}
        />
        <NavigationButton
          handler={() => dispatch(swapCard("next"))}
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
