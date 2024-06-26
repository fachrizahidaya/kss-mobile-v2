import { useFormik } from "formik";
import * as yup from "yup";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import Input from "../components/shared/Forms/Input";
import FormButton from "../components/shared/FormButton";
import { TextProps } from "../components/shared/CustomStylings";
import axiosInstance from "../config/api";

const CompanyScreen = () => {
  const { width, height } = Dimensions.get("window");
  const appVersion = Constants.expoConfig.version;
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: yup.object().shape({
      code: yup.string().required("Code is required"),
    }),
    validateOnChange: true,
    onSubmit: (values) => {
      codeHandler(values);
    },
  });

  const codeHandler = async (form) => {
    await axiosInstance
      .post("/auth/login", form)
      .then(async (res) => {
        // Extract user data from the response
        const userData = res.data.data;
        const userToken = userData.access_token.replace(/"/g, "");

        // Get firebase messaging token for push notification
        const isAllowed = await messaging().hasPermission();

        navigation.navigate("Login");
        formik.setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        formik.setSubmitting(false);

        Toast.show(error.response.data.message, ErrorToastProps);
      });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={[styles.container, { height: height, width: width }]}>
      <View style={styles.wrapper}>
        <View style={{ gap: 22, width: "100%" }}>
          <View style={{ gap: 15, alignItems: "center" }}>
            <Image
              style={{ height: 55, width: 55, resizeMode: "contain" }}
              source={require("../assets/icons/kss_logo.png")}
              alt="KSS_LOGO"
            />
            <Text style={[{ fontSize: 20, fontWeight: 500 }, TextProps]}>Enter Company</Text>
          </View>

          {/* <View style={{ position: "relative", borderWidth: 1, borderRadius: 10, borderColor: "#E8E9EB" }}>
            <Image
              source={require("../assets/icons/google.png")}
              alt="KSS_LOGO"
              style={{
                height: 16,
                width: 15,
                resizeMode: "contain",
                position: "absolute",
                zIndex: 1,
                left: 14,
                bottom: 12,
              }}
            />
            <FormButton disabled={isLoading} backgroundColor="#FFFFFF" fontSize={12} fontColor="#595F69">
              <Text style={TextProps}>{isLoading ? "Checking google account..." : "Login with Google"}</Text>
            </FormButton>

            <Button
              disabled={isLoading}
              variant="ghost"
              borderWidth={1}
              borderColor="#E8E9EB"
              bg="#FFFFFF"
              onPress={() => {
                if (Platform.OS === "android") {
                  onGoogleButtonPress();
                } else {
                  promptAsync();
                }
                toggleLoading();
              }}
              onPress={() => {
                Platform.OS === "ios" && promptAsync();
              }}
            >
              <Text fontSize={12} color="#595F69">
                {isLoading ? "Checking google account..." : "Login with Google"}
              </Text>
            </Button>
          </View> */}
        </View>

        {/* <View
          style={{
            position: "relative",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ borderWidth: 1, borderColor: "#E8E9EB", width: "100%" }} />

          <View style={{ paddingHorizontal: 16, position: "absolute", top: -8, backgroundColor: "#FFFFFF" }}>
            <Text style={{ color: "#8A9099", fontWeight: 400 }}>OR LOGIN WITH EMAIL</Text>
          </View>
        </View> */}

        <View style={{ gap: 10, width: "100%" }}>
          <Input fieldName="code" title="Code" formik={formik} placeHolder="Insert your code..." />

          <FormButton isSubmitting={formik.isSubmitting} onPress={formik.handleSubmit} fontColor="#FFFFFF">
            <Text style={{ color: "#FFFFFF" }}>Submit</Text>
          </FormButton>

          {/* <View
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#176688", fontWeight: 400 }}>Forgot Password?</Text>
          </View> */}
        </View>

        <View style={{ width: "100%" }} />

        {/* <View style={{ flexDirection: "row", width: "100%", gap: 2, justifyContent: "center" }}>
          <Text style={TextProps}>Don't have an account?</Text>
          <Text style={{ color: "#176688" }}>Sign Up</Text>
        </View> */}
        <Text style={[TextProps, { textAlign: "center", opacity: 0.5 }]}>version {appVersion}</Text>
      </View>

      {/* <View>
              <Checkbox color="primary.600">
                <Text fontWeight={400}>Remember Me</Text>
              </Checkbox>
            </View> */}
    </KeyboardAvoidingView>
  );
};

export default CompanyScreen;

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
