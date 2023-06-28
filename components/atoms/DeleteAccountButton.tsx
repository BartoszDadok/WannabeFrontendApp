import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { CustomError } from "../../store/api/types";

export type DeleteAccountRequsetType = MutationTrigger<
  MutationDefinition<
    any,
    BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
    "Users",
    any,
    "api"
  >
>;

interface DeleteAccountProps {
  deleteAccount: DeleteAccountRequsetType;
}

const DeleteAccountButton = ({ deleteAccount }: DeleteAccountProps) => {
  const { mode } = useAppSelector((state) => state.theme);
  const { id } = useAppSelector((state) => state.dataUser);
  return (
    <Pressable
      testID='DeleteAccount'
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
  );
};

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

export default DeleteAccountButton;
