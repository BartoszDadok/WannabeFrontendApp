import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import RenderHtml, { HTMLSource } from "react-native-render-html";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeIn } from "react-native-reanimated";
import { codeBlockThemeLight } from "../../styles/codeBlockTheme";
import { frontCardTagsStyles } from "../../styles/frontCardTagsStyles";

interface Props {
  frontCard: HTMLSource[];
}
const FrontCardQuestion = ({ frontCard }: Props) => {
  const frontCardData = frontCard[0];
  const hasCodeBlock = frontCard.length > 1;

  const { mode } = useAppSelector((state) => state.theme);

  const deviceWidth = Dimensions.get("window").width;

  const codeThemeColor = colors[mode].codeColor;
  const codeTheme = codeBlockThemeLight(codeThemeColor);
  const tagStyles = frontCardTagsStyles(mode);

  if (hasCodeBlock) {
    return (
      <View
        style={{
          flex: 1,
          width: Dimensions.get("screen").width,
          paddingHorizontal: 15,
        }}
      >
        <FlashList
          data={frontCard}
          renderItem={({ item }: { item: HTMLSource }) => {
            return (
              <Animated.View entering={FadeIn} style={{ flex: 1 }}>
                <RenderHtml
                  classesStyles={codeTheme}
                  // @ts-ignore
                  tagsStyles={tagStyles}
                  contentWidth={deviceWidth}
                  source={item}
                />
              </Animated.View>
            );
          }}
          estimatedItemSize={100}
        />
      </View>
    );
  }
  return (
    <View style={styles.frontCard}>
      <RenderHtml
        // @ts-ignore
        tagsStyles={tagStyles}
        contentWidth={deviceWidth}
        source={frontCardData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frontCard: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FrontCardQuestion;
