import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import { StyleSheet, Dimensions, KeyboardAvoidingView, Text, View, Image, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axiosInstance from "../config/api";
import Input from "../styles/forms/Input";
import FormButton from "../styles/FormButton";
import { TextProps } from "../styles/CustomStylings";
import SuccessModal from "../styles/modals/SuccessModal";
import { useDisclosure } from "../hooks/useDisclosure";

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();

  const { width, height } = Dimensions.get("window");

  const { isOpen: isError, toggle: toggleError } = useDisclosure(false);

  const sendResetPasswordEmail = async (form, setStatus, setSubmitting) => {
    try {
      await axiosInstance.post("/auth/forgot-password", form);
      setStatus("success");
      setSubmitting(false);
    } catch (err) {
      console.log(err);
      setStatus("error");
      setSubmitting(false);
      setErrorMessage(err.response.data.message);
      toggleError();
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      from: "mobile",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Please use correct email format").required("Email is required"),
    }),
    validateOnChange: true,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setStatus("processing");
      sendResetPasswordEmail(values, setStatus, setSubmitting);
    },
  });

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
      navigation.navigate("OTP Verification", { email: formik.values.email });
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={[styles.container, { height: height, width: width }]}>
        <View style={styles.wrapper}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={20} color="#3F434A" />
          </Pressable>
          <View style={{ gap: 22, width: "100%" }}>
            <View style={{ gap: 15, alignItems: "center" }}>
              <Image
                style={{ height: 55, width: 55, resizeMode: "contain" }}
                source={require("../assets/icons/kss_logo.png")}
                alt="KSS_LOGO"
              />
              <Text style={[{ fontSize: 20, fontWeight: 500 }, TextProps]}>Find Your Account</Text>
            </View>
          </View>

          <View style={{ gap: 10, width: "100%" }}>
            <Input fieldName="email" title="Email" formik={formik} placeHolder="Input your email" />

            <FormButton
              isSubmitting={formik.isSubmitting}
              onPress={formik.handleSubmit}
              fontColor="#FFFFFF"
              disabled={!formik.values.email || formik.isSubmitting}
            >
              <Text style={{ color: "#FFFFFF" }}>Submit</Text>
            </FormButton>
          </View>

          <View style={{ width: "100%" }} />
        </View>
      </KeyboardAvoidingView>
      <SuccessModal
        isOpen={isError}
        toggle={toggleError}
        title="Process error"
        description={errorMessage}
        type="warning"
      />
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 16,
    paddingVertical: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 38,
    paddingHorizontal: 16,
    gap: 36,
    maxWidth: 500,
    width: "100%",
  },
});
