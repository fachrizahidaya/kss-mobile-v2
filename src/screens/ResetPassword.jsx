import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useFormik } from "formik";
import * as yup from "yup";

import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axiosInstance from "../config/api";
import Input from "../styles/forms/Input";
import FormButton from "../styles/FormButton";
import { TextProps } from "../styles/CustomStylings";
import AlertModal from "../styles/modals/AlertModal";
import { useDisclosure } from "../hooks/useDisclosure";

const { width, height } = Dimensions.get("window");

const ResetPassword = () => {
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const { token } = route.params;

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const handleHidePassword = (hide, setHide) => {
    setHide(!hide);
  };

  const submitNewPassword = async (form, setStatus, setSubmitting) => {
    try {
      await axiosInstance.post("/auth/reset-password", form);
      setStatus("success");
      setSubmitting(false);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      setStatus("error");
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
      token: token,
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required("New password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Input your new password again"),
    }),
    validateOnChange: true,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      submitNewPassword(values, setStatus, setSubmitting);
    },
  });

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      navigation.navigate("Login");
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <View style={styles.wrapper}>
            <Pressable onPress={() => navigation.navigate("Forgot Password")}>
              <MaterialCommunityIcons name="chevron-left" size={20} color="#3F434A" />
            </Pressable>
            <View style={{ gap: 22, width: "100%" }}>
              <View style={{ gap: 15, alignItems: "center" }}>
                <Image style={styles.icon} source={require("../assets/icons/kss_logo.png")} alt="KSS_LOGO" />
                <Text style={[{ fontSize: 20, fontWeight: "500" }, TextProps]}>Reset Password</Text>
              </View>
            </View>

            <View style={{ gap: 10, width: "100%" }}>
              <Input
                fieldName="password"
                title="New Password"
                formik={formik}
                placeHolder="Insert new password"
                secureTextEntry={hideNewPassword}
                endIcon={hideNewPassword ? "eye-outline" : "eye-off-outline"}
                onPressEndIcon={() => handleHidePassword(hideNewPassword, setHideNewPassword)}
              />

              <Input
                fieldName="confirm_password"
                title="Confirm Password"
                formik={formik}
                placeHolder="Confirm new password"
                secureTextEntry={hideConfirmPassword}
                endIcon={hideConfirmPassword ? "eye-outline" : "eye-off-outline"}
                onPressEndIcon={() => handleHidePassword(hideConfirmPassword, setHideConfirmPassword)}
              />

              <FormButton
                isSubmitting={formik.isSubmitting}
                onPress={formik.handleSubmit}
                fontColor="#FFFFFF"
                disabled={!formik.values.password || !formik.values.confirm_password || formik.isSubmitting}
              >
                <Text style={{ color: "#FFFFFF" }}>Submit</Text>
              </FormButton>
            </View>

            <View style={{ width: "100%" }} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title="Process error!"
        description={errorMessage || "Please try again later"}
        type="danger"
      />
    </>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 16,
    paddingVertical: 100,
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: width,
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
  icon: { height: 55, width: 55, resizeMode: "contain" },
});
