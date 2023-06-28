import { Formik } from "formik";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import FormContainer from "../atoms/FormContainer";
import FormInput from "../atoms/FormInput";
import FormSubmitButton from "../atoms/FormSubmitButton";
import * as Yup from "yup";
import { useResetPasswordMutation } from "../../store/api/api";
import { useNavigation } from "@react-navigation/native";
import { FlashcardScreenNavigationProp } from "../../types/navigations.types";
import { isApiResponse } from "../../utils/isApiErrorResponse";
import shortid from "shortid";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
});

const ResetPasswordForm = () => {
  const navigation = useNavigation<FlashcardScreenNavigationProp>();
  const [resetPassword, { isSuccess, error, isLoading }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate("LoginScreen", { afterResetPassword: true });
    }
  }, [isSuccess]);

  const userInfo = {
    email: "",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reset password</Text>
      <FormContainer>
        {isLoading && (
          <ActivityIndicator
            testID='LoadingIndicator'
            size={40}
            color='rgba(255,228,0,1)'
          />
        )}
        {error && !isApiResponse(error) && (
          <Text style={styles.error}>
            Server error, check your internet connection!
          </Text>
        )}
        {error &&
          isApiResponse(error) &&
          error.data &&
          error.data.errors &&
          error.data.errors.map((err: string) => {
            return (
              <Text key={shortid()} style={styles.error}>
                {err}
              </Text>
            );
          })}
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            resetPassword(values);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            isSubmitting,
          }) => {
            const { email } = values;
            return (
              <>
                <FormInput
                  onChangeText={handleChange("email")}
                  value={email}
                  onBlur={handleBlur("email")}
                  label='Email'
                  error={touched.email && errors.email}
                  autoCapitalize='none'
                  placeholder='example@email.com'
                  testID='emailInput'
                />
                <FormSubmitButton
                  submitting={isSubmitting}
                  pressFunc={handleSubmit}
                  title='Reset password'
                />
              </>
            );
          }}
        </Formik>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 30 },
  error: {
    color: "red",
    textAlign: "center",
  },
  header: {
    fontSize: 30,
    fontFamily: "open-sans-bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 10,
  },
});
export default ResetPasswordForm;
