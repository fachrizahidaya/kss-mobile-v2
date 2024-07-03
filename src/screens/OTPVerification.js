import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";

import { StyleSheet, Dimensions, KeyboardAvoidingView, Text, View, Image, Pressable, Clipboard } from "react-native";
import OTPTextView from "react-native-otp-textinput";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axiosInstance from "../config/api";
import { useLoading } from "../hooks/useLoading";
import Input from "../components/shared/Forms/Input";
import FormButton from "../components/shared/FormButton";
import { ErrorToastProps, TextProps } from "../components/shared/CustomStylings";

const OTPVerification = () => {
  const [otpInput, setOTPInput] = useState("");
  const [countdownTimer, setCountdownTimer] = useState(60);
  const [resendButton, setResendButton] = useState(true);
  const [startCountdown, setStartCountdown] = useState(false);

  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const input = useRef(null);

  const handleCellTextChange = async (text, integer) => {
    if (integer === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

  const submitResetPasswordOTP = async (form, setStatus, setSubmitting) => {
    try {
      // setStatus("success");
      // setSubmitting(false);
      navigation.navigate("Reset Password");
    } catch (err) {
      console.log(err);
      // setStatus("error");
      // setSubmitting(false);
    }
  };

  const resendOTPCode = async () => {
    try {
      // const res = await axiosInstance.post()
      setCountdownTimer(60);
      setStartCountdown(true);
      setResendButton(false);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: (values, { setStatus, setSubmitting }) => {
      submitResetPasswordOTP(values, setStatus, setSubmitting);
    },
  });

  useEffect(() => {
    if (startCountdown) {
      let interval = setInterval(() => {
        setCountdownTimer((lasTimerCount) => {
          if (lasTimerCount === 0) {
            clearInterval(interval);
            setStartCountdown(false);
            setResendButton(true);
          } else {
            return lasTimerCount - 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startCountdown]);

  // useEffect(() => {
  //   if (!formik.isSubmitting && formik.status === "success") {
  //     navigation.navigate("Reset Password");
  //   }
  // }, [formik.isSubmitting, formik.status]);

  return (
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
            <Text style={[{ fontSize: 20, fontWeight: 500 }, TextProps]}>Input OTP</Text>
          </View>
        </View>

        <View style={{ gap: 10, width: "100%" }}>
          <OTPTextView
            containerStyle={styles.textInputContainer}
            ref={input}
            handleTextChange={setOTPInput}
            handleCellTextChange={handleCellTextChange}
            inputCount={4}
            keyboardType="numeric"
          />
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}>
            <Text style={[TextProps]}>Didn't receive the code?</Text>
            <Pressable onPress={resendOTPCode}>
              <Text style={[{ color: resendButton ? "#176688" : "gray" }]}>Resend</Text>
            </Pressable>
          </View>
          {startCountdown && (
            <Text style={[TextProps, { textAlign: "center" }]}>{`in ${countdownTimer} second${
              countdownTimer > 1 ? "s" : ""
            }`}</Text>
          )}

          <FormButton onPress={submitResetPasswordOTP} fontColor="#FFFFFF" disabled={!otpInput}>
            <Text style={{ color: "#FFFFFF" }}>Submit</Text>
          </FormButton>
        </View>

        <View style={{ width: "100%" }} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPVerification;

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
  textInputContainer: {
    marginBottom: 20,
  },
});
