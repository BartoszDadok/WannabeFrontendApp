import { Formik } from "formik";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import FormContainer from "../atoms/FormContainer";
import FormInput from "../atoms/FormInput";
import FormSubmitButton from "../atoms/FormSubmitButton";
import * as Yup from "yup";
import { useResetPasswordMutation } from "../../store/api/api";
import { useNavigation } from "@react-navigation/native";
import { FlashcardScreenNavigationProp } from "../../types/navigations.types";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
});

const ResetPasswordForm = () => {
  const navigation = useNavigation<FlashcardScreenNavigationProp>();
  const [resetPassword, { isSuccess }] = useResetPasswordMutation();

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
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={async (values, formikActions) => {
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
                />
                <FormSubmitButton
                  submitting={isSubmitting}
                  onPress={handleSubmit}
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
