import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import RenderHtml, { HTMLSource } from "react-native-render-html";
import Animated, { FadeIn } from "react-native-reanimated";
import { codeBlockThemeLight } from "../../styles/codeBlockTheme";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";
import { backCardTagsStyles } from "../../styles/backCardTagsStyles";

interface Props {
  backCard: HTMLSource[];
}

const BackCardQuestion = ({ backCard }: Props) => {
  const deviceWidth = Dimensions.get("window").width;
  const { mode } = useAppSelector((state) => state.theme);

  const codeThemeColor = colors[mode].codeColor;
  const codeThemeClases = codeBlockThemeLight(codeThemeColor);

  const tagsStyles = backCardTagsStyles(mode);

  return (
    <View style={styles.backCard}>
      <FlashList
        data={backCard}
        renderItem={({ item }: { item: HTMLSource }) => {
          return (
            <Animated.View entering={FadeIn} style={{ flex: 1 }}>
              <RenderHtml
                containerStyle={{ fontColor: "white" }}
                classesStyles={codeThemeClases}
                // @ts-ignore
                tagsStyles={tagsStyles}
                contentWidth={deviceWidth}
                source={item}
              />
            </Animated.View>
          );
        }}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backCard: {
    flex: 1,
    marginVertical: 10,
    fontFamily: "open-sans",
    fontColor: "white",
  },
});

export default BackCardQuestion;
