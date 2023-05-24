import React from "react";
import FormSubmitButton from "../atoms/FormSubmitButton";
import { Formik } from "formik";
import * as Yup from "yup";
import shortid from "shortid";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSendMessageMutation } from "../../store/api/api";
import { colors } from "../../styles/colors";
import { ScrollView } from "react-native-gesture-handler";
import { useAppSelector } from "../../store/hooks";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  name: Yup.string().required("Name is required!"),
  message: Yup.string().required("Message is required!"),
});

const ContactForm = () => {
  const [sendMessage, { isSuccess, isLoading, error, isError }] =
    useSendMessageMutation();
  const headerHeight = useHeaderHeight();
  const { mode } = useAppSelector((state) => state.theme);

  const userInfo = {
    name: "",
    email: "",
    message: "",
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={headerHeight}
    >
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={[styles.header, { color: colors[mode].textColor }]}>
              Contact
            </Text>
            <Text style={[styles.subHeader, { color: colors[mode].textColor }]}>
              You can contact directly via email:{" "}
            </Text>
            <Text
              style={[
                styles.subHeader,
                { fontFamily: "open-sans-bold", color: colors[mode].textColor },
              ]}
            >
              bart@forwannabe.com
            </Text>
            <Text style={[styles.subHeader, { color: colors[mode].textColor }]}>
              or via the form below:
            </Text>
            <View>
              {isLoading && (
                <ActivityIndicator size={40} color='rgba(255,228,0,1)' />
              )}
            </View>
            <View style={styles.errorContainer}>
              {isSuccess && (
                <View
                  style={[
                    styles.messageContainer,
                    { backgroundColor: colors[mode].backgroundColor },
                  ]}
                >
                  <Text
                    style={[
                      styles.messageContainerText,
                      { color: colors[mode].textColor },
                    ]}
                  >
                    Email sent successfully
                  </Text>
                </View>
              )}
              {error && !("data" in error) && (
                <Text style={[styles.error, { color: colors[mode].textColor }]}>
                  Server error, check your internet connection!
                </Text>
              )}
              {error &&
                "data" in error &&
                error.data &&
                error.data.errors &&
                error.data.errors.map((err: string) => {
                  return (
                    <Text
                      key={shortid()}
                      style={[styles.error, { color: colors[mode].textColor }]}
                    >
                      {err}
                    </Text>
                  );
                })}
            </View>
            <Formik
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={async (values, formikActions) => {
                formikActions.setSubmitting(true);
                await sendMessage(values);
                formikActions.setSubmitting(false);
                formikActions.resetForm();
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
                const { name, email, message } = values;

                return (
                  <ScrollView>
                    <Text
                      style={{
                        fontFamily: "open-sans-bold",
                        color: colors[mode].textColor,
                      }}
                    >
                      Name
                    </Text>
                    {touched.name && errors.name ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: 14,
                          fontFamily: "open-sans",
                        }}
                      >
                        {errors.name}
                      </Text>
                    ) : null}
                    <TextInput
                      onChangeText={handleChange("name")}
                      style={[
                        styles.input,
                        { backgroundColor: colors[mode].inputColor },
                      ]}
                      value={name}
                      onBlur={handleBlur("name")}
                    />
                    <Text
                      style={{
                        fontFamily: "open-sans-bold",
                        color: colors[mode].textColor,
                      }}
                    >
                      Email
                    </Text>
                    {touched.email && errors.email ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: 14,
                          fontFamily: "open-sans",
                        }}
                      >
                        {errors.email}
                      </Text>
                    ) : null}
                    <TextInput
                      onChangeText={handleChange("email")}
                      value={email}
                      onBlur={handleBlur("email")}
                      autoCapitalize='none'
                      style={[
                        styles.input,
                        { backgroundColor: colors[mode].inputColor },
                      ]}
                    />

                    <Text
                      style={{
                        fontFamily: "open-sans-bold",
                        color: colors[mode].textColor,
                      }}
                    >
                      Message
                    </Text>
                    {touched.message && errors.message ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: 14,
                          fontFamily: "open-sans",
                        }}
                      >
                        {errors.message}
                      </Text>
                    ) : null}
                    <TextInput
                      onChangeText={handleChange("message")}
                      style={[
                        styles.textarea,
                        { backgroundColor: colors[mode].inputColor },
                      ]}
                      value={message}
                      onBlur={handleBlur("message")}
                      multiline={true}
                      numberOfLines={3}
                    />

                    <FormSubmitButton
                      submitting={isSubmitting}
                      onPress={handleSubmit}
                      title='Send message'
                    />
                  </ScrollView>
                );
              }}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "open-sans-bold",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "open-sans",
  },
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    height: 40,
    fontSize: 16,
    fontFamily: "open-sans",
    paddingLeft: 10,
    marginBottom: 10,
  },
  textarea: {
    borderWidth: 1,
    fontSize: 16,
    fontFamily: "open-sans",
    paddingTop: 8,
    paddingLeft: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    height: 170,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
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
});

export default ContactForm;
