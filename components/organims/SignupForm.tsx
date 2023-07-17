import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import FormContainer from "../atoms/FormContainer";
import FormInput from "../atoms/FormInput";
import FormSubmitButton from "../atoms/FormSubmitButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { useCreateUserMutation } from "../../store/api/api";
import shortid from "shortid";
import { addVeryficationToken } from "../../store/state/veificationTokenSlice";
import { api } from "../../store/api/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";
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
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
});

const SignupForm = () => {
  const dispatch = useAppDispatch();

  const { veryficationToken } = useAppSelector(
    (state) => state.veryficationToken
  );
  const { mode } = useAppSelector((state) => state.theme);

  const [createUser, { data, isLoading, error, isSuccess }] =
    useCreateUserMutation();

  const [trigger, result] = api.endpoints.newVeryficationToken.useLazyQuery();
  const isSuccessResendEmail = result.isSuccess;
  const isLoadingResendEmail = result.isLoading;
  const isErrorResendEmail = result.isError;

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addVeryficationToken(data.verificationToken));
    }
  }, [isSuccess]);

  const userInfo = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <View testID='SignUpContainer'>
      <FormContainer>
        {isSuccess && (
          <View
            style={[
              styles.messageContainer,
              { backgroundColor: colors[mode].primaryColor500 },
            ]}
          >
            <Text style={[styles.messageContainerText, { marginBottom: 7 }]}>
              Veryfication email has been sent. Please, go to your mailbox and
              verify your email.
            </Text>
            <Text style={[styles.messageContainerText, { marginBottom: 7 }]}>
              After that you can login and enjoy full access of Wannabe app!
            </Text>
            <Text style={styles.messageContainerText}>
              If you didn't get the veryfication link, click this link and email
              will be sent again.
            </Text>
            <Pressable
              testID='NewVeryficationTokenButton'
              onPress={() => {
                if (veryficationToken) {
                  trigger(veryficationToken);
                }
              }}
              android_ripple={{ color: "rgba(255,228,0,0,8)" }}
            >
              <Text
                style={[
                  styles.messageContainerText,
                  { marginVertical: 5, color: "blue" },
                ]}
              >
                Send link again
              </Text>
            </Pressable>
            {isSuccessResendEmail && (
              <Text style={styles.messageContainerTextBold}>
                Perfect! Email has been sent!
              </Text>
            )}
            {isLoadingResendEmail && (
              <ActivityIndicator
                testID='LoadingIndicator'
                size={30}
                color={"black"}
              />
            )}
            {isErrorResendEmail && <Text>Error occured</Text>}
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
          onSubmit={(values, formikActions) => {
            createUser(values);
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
            const { email, password, confirmPassword } = values;
            return (
              <View>
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
                <FormInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={password}
                  secureTextEntry
                  error={touched.password && errors.password}
                  autoCapitalize='none'
                  label='Password'
                  placeholder='***********'
                  testID='passwordInput'
                />
                <FormInput
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  error={touched.confirmPassword && errors.confirmPassword}
                  secureTextEntry
                  autoCapitalize='none'
                  value={confirmPassword}
                  label='Confirm password'
                  placeholder='***********'
                  testID='confirmPasswordInput'
                />
                <FormSubmitButton
                  submitting={isSubmitting}
                  pressFunc={handleSubmit}
                  title='Sign up'
                />
              </View>
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
export default SignupForm;
