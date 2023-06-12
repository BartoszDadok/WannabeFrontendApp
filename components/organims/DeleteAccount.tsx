import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useDeleteAccountMutation } from "../../store/api/api";
import { useNavigation } from "@react-navigation/native";
import { logOut } from "../../store/state/userDataSlice";
import { DecksScreenNavigationProp } from "../../types/navigations.types";
import { isApiResponse } from "../../utils/isApiErrorResponse";
import { ActivityIndicator } from "react-native";
import DeleteAccountButton from "../atoms/DeleteAccountButton";
import shortid from "shortid";

const DeleteAccount = () => {
  const dispatch = useAppDispatch();

  const [deleteAccount, { isSuccess, isLoading, error }] =
    useDeleteAccountMutation();

  const navigation = useNavigation<DecksScreenNavigationProp>();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logOut());
      navigation.navigate("DecksScreen");
    }
  }, [isSuccess]);

  const isInternetError = error && !isApiResponse(error);
  const isApiError =
    error && isApiResponse(error) && error.data && error.data.errors;
  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size={40} color='rgba(255,228,0,1)' />}

      <View style={styles.errorContainer}>
        {isInternetError && (
          <Text style={styles.error}>
            Server error, check your internet connection!
          </Text>
        )}

        {isApiError &&
          error.data.errors.map((err: string) => {
            return (
              <Text key={shortid()} style={styles.error}>
                {err}
              </Text>
            );
          })}
      </View>
      <DeleteAccountButton deleteAccount={deleteAccount} />
    </View>
  );
};

export default DeleteAccount;

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
