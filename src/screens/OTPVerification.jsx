import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";

import { StyleSheet, Dimensions, KeyboardAvoidingView, Text, View, Image, Pressable, Clipboard } from "react-native";
import OTPTextView from "react-native-otp-textinput";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axiosInstance from "../config/api";
import { useLoading } from "../hooks/useLoading";
import Input from "../styles/forms/Input";
import FormButton from "../styles/FormButton";
import { ErrorToastProps, TextProps } from "../styles/CustomStylings";
import SuccessModal from "../styles/modals/SuccessModal";
import { useDisclosure } from "../hooks/useDisclosure";

const OTPVerification = () => {
  const [otpInput, setOTPInput] = useState("");
  const [countdownTimer, setCountdownTimer] = useState(60);
  const [resendButton, setResendButton] = useState(true);
  const [startCountdown, setStartCountdown] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const input = useRef(null);
  const route = useRoute();

  const { email } = route.params;

  const { isOpen: isError, toggle: toggleError } = useDisclosure(false);

  const handleCellTextChange = async (text, integer) => {
    if (integer === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

  const submitResetPasswordOTP = async () => {
    try {
      const form = { email: email, otp: otpInput };

      const res = await axiosInstance.post("/auth/check-otp", form);
      navigation.navigate("Reset Password", { token: res.data?.token });
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleError();
    }
  };

  const resendOTPCode = async () => {
    try {
      const form = {
        email: email,
        from: "mobile",
      };

      const res = await axiosInstance.post("/auth/forgot-password", form);
      setCountdownTimer(60);
      setStartCountdown(true);
      setResendButton(false);
    } catch (err) {
      console.log(err);
    }
  };

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
