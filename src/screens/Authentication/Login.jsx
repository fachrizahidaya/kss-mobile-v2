import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import messaging, {
  getMessaging,
  requestPermission,
  setBackgroundMessageHandler,
  onMessage,
  getToken,
  onNotificationOpenedApp,
  subscribeToTopic,
  hasPermission,
  isDeviceRegisteredForRemoteMessages,
  registerDeviceForRemoteMessages,
} from "@react-native-firebase/messaging";
import Constants from "expo-constants";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import axiosInstance from "../../config/api";
<<<<<<< HEAD
=======
import Input from "../../styles/forms/Input";
import FormButton from "../../styles/buttons/FormButton";
>>>>>>> 2ff06944 (fix: login process)
import { TextProps } from "../../styles/CustomStylings";
import { insertFirebase, insertUser } from "../../config/db";
import AlertModal from "../../styles/modals/AlertModal";
import { useDisclosure } from "../../hooks/useDisclosure";
import { login } from "../../redux/reducer/auth";
import { setModule } from "../../redux/reducer/module";
import { Colors } from "../../styles/Color";
import { logoutHandler } from "./Logout";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const currentDate = dayjs();
  const dispatch = useDispatch();
  const expiredToken = currentDate.add(10, "day").format("YYYY-MM-DD");

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const appVersion = Constants.expoConfig.version;

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleForgotPassword = () => {
    navigation.navigate("Forgot Password");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please use correct email format")
        .required("Email is required"),
      // password: yup.string().required("Password is required"),
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleDisabled = Boolean(
    !formik.values.email ||
    formik.errors.email ||
    formik.errors.password ||
    !formik.values.password ||
    formik.isSubmitting,
  );

  /**
   * Handles the login process by sending a POST request to the authentication endpoint.
   * @function handleLogin
   * @param {Object} form - The login form data to be sent in the request.
   */
<<<<<<< HEAD
  const handleLogin = async (form) => {
=======
  const loginHandler = async (form) => {
>>>>>>> 2ff06944 (fix: login process)
    await axiosInstance
      .post("/auth/login", form)
      .then(async (res) => {
        // Extract user data from the response
        const userData = res.data.data;
        const userToken = userData?.access_token.replace(/"/g, "");

        const messaging = getMessaging();

        if (!(await isDeviceRegisteredForRemoteMessages(messaging))) {
          await registerDeviceForRemoteMessages(messaging);
        }

        // await requestNotificationPermission();

        // Get firebase messaging token for push notification
        // const isAllowed = await messaging().hasPermission();

        // if (isAllowed === messaging.AuthorizationStatus.AUTHORIZED) {
        const fbtoken = await getToken(messaging);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        await axios
          .post(
            `${process.env.EXPO_PUBLIC_API}/auth/create-firebase-token`,
            { firebase_token: fbtoken },
            { headers: { Authorization: `Bearer ${userToken}` } },
          )
          .then(async () => {
            await insertFirebase(fbtoken, expiredToken);
            handleSetUser(userData, "TRIBE");
          });
        // }
=======
=======
          if (!fbtoken) {
            await logoutHandler();
            navigation.navigate("Login");
          }

>>>>>>> d6f5cf86 (fix:)
=======
>>>>>>> 587e2d8b (fix:)
          await axios
            .post(
              `${process.env.EXPO_PUBLIC_API}/auth/create-firebase-token`,
              { firebase_token: fbtoken },
              { headers: { Authorization: `Bearer ${userToken}` } }
            )
            .then(async () => {
              await insertFirebase(fbtoken, expiredToken);
              setUserData(userData, "TRIBE");
            });
        } else {
          setErrorMessage(error.response.data.message);
          toggleAlert();
          formik.setSubmitting(false);
        }
>>>>>>> f8bd7d2f (fix: isLoading indicator, condition login)

        navigation.navigate("Loading", { userData });
        formik.setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
<<<<<<< HEAD
<<<<<<< HEAD
        setErrorMessage(error?.response?.data?.message);
        toggleAlert();
        formik.setSubmitting(false);
=======
        if (
          error.response?.status === 401 ||
          error.response?.data?.message?.toLowerCase().includes("expired") ||
          error.response?.data?.message?.toLowerCase().includes("invalid")
        ) {
          await logoutHandler();
          navigation.navigate("Login");
        } else {
          setErrorMessage(error.response.data.message);
          toggleAlert();
          formik.setSubmitting(false);
        }
>>>>>>> 8e5ba9a2 (fix: evade token expired, invalid)
=======
        setErrorMessage(error.response.data.message);
        toggleAlert();
        formik.setSubmitting(false);
>>>>>>> 587e2d8b (fix:)
      });
  };

  const handleSetUser = async (userData, module) => {
    try {
      // Store user data and token in SQLite
<<<<<<< HEAD
      await insertUser(JSON.stringify(userData), userData?.access_token, userData?.dbc);
=======
      await insertUser(JSON.stringify(userData), userData.access_token, userData.dbc);
>>>>>>> 8e5ba9a2 (fix: evade token expired, invalid)

      // Dispatch a login action with the provided user data
      dispatch(login(userData));

      // Dispatch tribe module to firstly be rendered
      dispatch(setModule(module));
    } catch (error) {
      dispatch(logout());
      // Handle any errors that occur during the process
      throw new Error("Failed to set user data: " + error.message);
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.wrapper}>
            <View style={{ gap: 22, width: "100%" }}>
              <View style={{ gap: 15, alignItems: "center" }}>
                <Image
                  style={styles.icon}
                  source={require("../../assets/icons/kss_logo.png")}
                  alt="KSS_LOGO"
                />
                <Text style={[{ fontSize: 20, fontWeight: 500 }, TextProps]}>Login</Text>
              </View>
            </View>

            <View style={{ gap: 10, width: "100%", alignItems: "center" }}>
              <Input
                fieldName="email"
                title="Email"
                formik={formik}
                placeHolder="Input your email"
              />

              <Input
                fieldName="password"
                title="Password"
                formik={formik}
                placeHolder="Input your password"
                secureTextEntry={hidePassword}
                endIcon={hidePassword ? "eye-outline" : "eye-off-outline"}
                onPressEndIcon={() => handleHidePassword(hidePassword, setHidePassword)}
              />

              <FormButton
                onPress={formik.handleSubmit}
                disabled={
                  !formik.values.email || !formik.values.password || formik.isSubmitting
                }
                width="100%"
                isSubmitting={formik.isSubmitting}
              >
                <Text style={{ color: Colors.fontLight }}>Log In</Text>
              </FormButton>

              <Text
                onPress={() => navigation.navigate("Forgot Password")}
                style={{ color: Colors.primary, fontWeight: "500" }}
              >
                Forgot Password?
              </Text>
            </View>

            <View style={{ width: "100%" }} />

            <Text style={[TextProps, { textAlign: "center", opacity: 0.5 }]}>
              version {appVersion}
            </Text>
          </View>
        </TouchableWithoutFeedback>
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

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
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
  icon: {
    height: 55,
    width: 55,
    resizeMode: "contain",
  },
});
