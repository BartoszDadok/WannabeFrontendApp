import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { colors } from "../styles/colors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigation } from "@react-navigation/native";
import { DecksScreenNavigationProp } from "../types/navigations.types";
import { useDeleteAccountMutation } from "../store/api/api";
import shortid from "shortid";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { logOut } from "../store/state/userDataSlice";

const DeleteAccountScreen = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);
  const { id } = useAppSelector((state) => state.userData);

  const [deleteAccount, { isSuccess, isLoading, error }] =
    useDeleteAccountMutation();

  const navigation = useNavigation<DecksScreenNavigationProp>();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logOut());
      navigation.navigate("DecksScreen");
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator size={40} color={Colors.primaryColor500} />
      )}
      <View style={styles.errorContainer}>
        {error && !("data" in error) && (
          <Text style={styles.error}>
            Server error, check your internet connection!
          </Text>
        )}
        {error &&
          "data" in error &&
          error.data &&
          error.data.errors &&
          error.data.errors.map((err: string) => {
            return (
              <Text key={shortid()} style={styles.error}>
                {err}
              </Text>
            );
          })}
      </View>
      <Pressable
        style={[
          styles.buttonContainer,
          { backgroundColor: colors[mode].primaryColor500 },
        ]}
        onPress={() => {
          deleteAccount(id);
        }}
        android_ripple={{ color: "rgba(255,228,0,0,8)" }}
      >
        <Text>Delete account</Text>
      </Pressable>
    </View>
  );
};

export default DeleteAccountScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonContainer: {
    width: "60%",
    padding: 15,
    alignItems: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  errorContainer: {
    marginBottom: 10,
  },
});
