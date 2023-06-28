import React, { useEffect } from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import FormContainer from "../atoms/FormContainer";
import FormInput from "../atoms/FormInput";
import FormSubmitButton from "../atoms/FormSubmitButton";
import { Formik } from "formik";
import * as Yup from "yup";
import FormForgotButton from "../atoms/FormForgotButton";
import { useLoginMutation } from "../../store/api/api";
import { logIn } from "../../store/state/dataUserSlice";
import { colors } from "../../styles/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  LoginScreenNavigationProp,
  LoginScreenScreenRouteProp,
} from "../../types/navigations.types";
import shortid from "shortid";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isApiResponse } from "../../utils/isApiErrorResponse";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .trim()
    .required("Password is required!")
    .min(10, "Password is too short - min 10 characters")
    .max(20, "Password is too long - max 20 characters")
    .matches(
      /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 10 characters, one uppercase, one number and one special case character"
    ),
});

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const route = useRoute<LoginScreenScreenRouteProp>();
  const afterResetPassword = route?.params?.afterResetPassword;
  const { mode } = useAppSelector((state) => state.theme);
  const [login, { data, isLoading, error, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
      const { token, id, email, languages: languagesArrayToStringify } = data;
      const languages = languagesArrayToStringify.toString();
      const userData = { token, id, email, languages };
      dispatch(logIn(userData));
      navigation.navigate("DecksScreen");
    }
  }, [isSuccess]);

  const userInfo = {
    email: "",
    password: "",
  };

  return (
    <View testID='LoginForm'>
      <FormContainer>
        {afterResetPassword && (
          <View
            style={[
              styles.messageContainer,
              { backgroundColor: colors[mode].primaryColor500 },
            ]}
          >
            <Text
              style={[
                styles.messageContainerText,
                { marginBottom: 7, color: colors[mode].textColor },
              ]}
            >
              Email with a reset link has been sent. Please, go to your mailbox
              and change your password.
            </Text>
          </View>
        )}
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
          onSubmit={async (values, formikActions) => {
            await login(values);
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
            const { email, password } = values;
            return (
              <>
                <FormInput
                  onChangeText={handleChange("email")}
                  value={email}
                  onBlur={handleBlur("email")}
                  label='Email'
                  error={touched.email && errors.email}
                  testID='emailInput'
                  autoCapitalize='none'
                  placeholder='example@email.com'
                />
                <FormInput
                  onChangeText={handleChange("password")}
                  value={password}
                  autoCapitalize='none'
                  label='Password'
                  placeholder='***********'
                  secureTextEntry
                  testID='passwordInput'
                  error={touched.password && errors.password}
                />
                <FormSubmitButton
                  submitting={isSubmitting}
                  pressFunc={handleSubmit}
                  title='Login'
                />
                <FormForgotButton />
              </>
            );
          }}
        </Formik>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    textAlign: "center",
  },
  messageContainer: {
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 15,
    borderWidth: 1,
    padding: 5,
  },
  messageContainerText: {
    fontFamily: "open-sans",
    fontSize: 15,
  },
  messageContainerTextBold: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
  },
});
export default LoginForm;
