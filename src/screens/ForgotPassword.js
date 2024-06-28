import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import Constants from "expo-constants";

// For iOS
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
// import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
// import { auth as auths } from "../config/firebase";
// For android
// import auth from "@react-native-firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";

import { StyleSheet, Dimensions, KeyboardAvoidingView, Text, View, Image, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axiosInstance from "../config/api";
import { useLoading } from "../hooks/useLoading";
import Input from "../components/shared/Forms/Input";
import FormButton from "../components/shared/FormButton";
import { ErrorToastProps, TextProps } from "../components/shared/CustomStylings";
import { insertFirebase } from "../config/db";

const ForgotPassword = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation();

  const { width, height } = Dimensions.get("window");
  const appVersion = Constants.expoConfig.version;

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Please use correct email format").required("Email is required"),
    }),
    validateOnChange: true,
    onSubmit: (values) => {
      loginHandler(values);
    },
  });

  return (
    <KeyboardAvoidingView behavior="height" style={[styles.container, { height: height, width: width }]}>
      <View style={styles.wrapper}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <MaterialCommunityIcons name="chevron-left" size={20} color="#3F434A" />
        </Pressable>
        <View style={{ gap: 22, width: "100%" }}>
          <View style={{ gap: 15, alignItems: "center" }}>
            <Image
              style={{ height: 55, width: 55, resizeMode: "contain" }}
              source={require("../assets/icons/kss_logo.png")}
              alt="KSS_LOGO"
            />
            <Text style={[{ fontSize: 20, fontWeight: 500 }, TextProps]}>Input Your Email</Text>
          </View>
        </View>

        <View style={{ gap: 10, width: "100%" }}>
          <Input fieldName="email" title="Email" formik={formik} placeHolder="Insert your email..." />

          <FormButton
            isSubmitting={formik.isSubmitting}
            onPress={formik.handleSubmit}
            fontColor="#FFFFFF"
            disabled={!formik.values.email}
          >
            <Text style={{ color: "#FFFFFF" }}>Submit</Text>
          </FormButton>
        </View>

        <View style={{ width: "100%" }} />
      </View>
    </KeyboardAvoidingView>
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
