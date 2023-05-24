import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import SignupForm from "../components/organims/SignupForm";
import FormHeader from "../components/atoms/FormHeader";
import FormButton from "../components/atoms/FormButton";
import LoginForm from "../components/organims/LoginForm";
import { useRoute } from "@react-navigation/native";
import { AuthScreenScreenRouteProp } from "../types/navigations.types";

const AuthScreen = () => {
  const route = useRoute<AuthScreenScreenRouteProp>();
  const signupPage = route?.params?.signupScreen;
  const scrollView = useRef<ScrollView | null>(null);
  const animation = useRef(new Animated.Value(0)).current;

  const { width } = Dimensions.get("window");

  const loginColor = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgb(255,228,0)", "rgba(225, 228, 0, 0.2)"],
  });

  const signupColor = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(255, 228, 0, 0.2)", "rgb(255,228,0)"],
  });

  useEffect(() => {
    signupPage &&
      scrollView.current &&
      scrollView.current.scrollTo({ x: width });
  }, [scrollView, scrollView.current]);

  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      <View>
        <FormHeader
          firstRowHeading='Flashcards'
          secondRowHeading='IT Interview Questions'
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <FormButton
          onPress={() =>
            scrollView.current && scrollView.current.scrollTo({ x: 0 })
          }
          backgroundColor={loginColor}
          title={"Login"}
        />
        <FormButton
          onPress={() =>
            scrollView.current && scrollView.current.scrollTo({ x: width })
          }
          backgroundColor={signupColor}
          title={"Sign up"}
        />
      </View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }],
          { useNativeDriver: false }
        )}
        ref={scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollToOverflowEnabled={true}
      >
        <ScrollView>
          <LoginForm />
        </ScrollView>
        <ScrollView>
          <SignupForm />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthScreen;
