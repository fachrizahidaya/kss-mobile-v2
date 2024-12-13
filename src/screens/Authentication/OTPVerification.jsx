import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { StyleSheet, KeyboardAvoidingView, Text, View, Image, Pressable, Clipboard } from "react-native";
import OTPTextView from "react-native-otp-textinput";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axiosInstance from "../../config/api";
import FormButton from "../../styles/buttons/FormButton";
import { TextProps } from "../../styles/CustomStylings";
import AlertModal from "../../styles/modals/AlertModal";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useLoading } from "../../hooks/useLoading";
import { Colors } from "../../styles/Color";

const OTPVerification = () => {
  const [otpInput, setOTPInput] = useState("");
  const [countdownTimer, setCountdownTimer] = useState(60);
  const [resendButtonActive, setResendButtonActive] = useState(false);
  const [startCountdown, setStartCountdown] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const input = useRef(null);
  const route = useRoute();

  const { email } = route.params;

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { isLoading: isProcessing, toggle: toggleProcess } = useLoading();

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
      toggleProcess();
      const form = { email: email, otp: otpInput };

      const res = await axiosInstance.post("/auth/check-otp", form);
      toggleProcess();
      navigation.navigate("Reset Password", { token: res.data?.token });
    } catch (err) {
      console.log(err);
      toggleProcess();
      toggleAlert();
      setErrorMessage(err.response.data.message);
    }
  };

  const resendOTPCode = async () => {
    try {
      const form = {
        email: email,
        from: "mobile",
      };

      await axiosInstance.post("/auth/forgot-password", form);
      setCountdownTimer(60);
      setStartCountdown(true);
      setResendButtonActive(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResendOTPCode = () => {
    if (resendButtonActive) {
      resendOTPCode();
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (startCountdown) {
      let interval = setInterval(() => {
        setCountdownTimer((lasTimerCount) => {
          if (lasTimerCount === 0) {
            clearInterval(interval);
            setStartCountdown(false);
            setResendButtonActive(true);
            return lasTimerCount;
          } else {
            return lasTimerCount - 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startCountdown]);

  useEffect(() => {
    setStartCountdown(true);
  }, []);

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <View style={styles.wrapper}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={20} color={Colors.primary} />
          </Pressable>
          <View style={{ gap: 22, width: "100%" }}>
            <View style={{ gap: 15, alignItems: "center" }}>
              <Image style={styles.icon} source={require("../../assets/icons/kss_logo.png")} alt="KSS_LOGO" />
              <Text style={[{ fontSize: 20, fontWeight: "500" }, TextProps]}>Input OTP</Text>
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
              <Pressable onPress={handleResendOTPCode} disabled={!resendButtonActive}>
                <Text style={[{ color: resendButtonActive ? Colors.primary : Colors.borderGrey }]}>Resend</Text>
              </Pressable>
            </View>
            {startCountdown && (
              <Text style={[TextProps, { textAlign: "center" }]}>{`in ${countdownTimer} second${
                countdownTimer > 1 ? "s" : ""
              }`}</Text>
            )}

            <FormButton onPress={submitResetPasswordOTP} disabled={!otpInput} isSubmitting={isProcessing}>
              <Text style={{ color: Colors.fontLight }}>Submit</Text>
            </FormButton>
          </View>

          <View style={{ width: "100%" }} />
        </View>
      </KeyboardAvoidingView>
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

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  wrapper: {
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    paddingVertical: 40,
    paddingHorizontal: 16,
    gap: 36,
    width: "100%",
  },
  textInputContainer: {
    marginBottom: 20,
  },
  icon: {
    height: 55,
    width: 55,
    resizeMode: "contain",
  },
});
