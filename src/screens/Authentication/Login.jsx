import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
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
import { TextProps } from "../../styles/CustomStylings";
import { insertFirebase, insertUser } from "../../config/db";
import AlertModal from "../../styles/modals/AlertModal";
import { useDisclosure } from "../../hooks/useDisclosure";
import { login } from "../../redux/reducer/auth";
import { setModule } from "../../redux/reducer/module";
import { Colors } from "../../styles/Color";
import { logout } from "../../redux/reducer/auth";
import Form from "../../components/Login/Form";

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
      formik.isSubmitting
  );

  /**
   * Handles the login process by sending a POST request to the authentication endpoint.
   * @function handleLogin
   * @param {Object} form - The login form data to be sent in the request.
   */
  const handleLogin = async (form) => {
    await axiosInstance
      .post("/auth/login", form)
      .then(async (res) => {
        // Extract user data from the response
        const userData = res.data.data;
        const userToken = userData.access_token.replace(/"/g, "");

        // Get firebase messaging token for push notification
        const isAllowed = await messaging().hasPermission();

        if (isAllowed === messaging.AuthorizationStatus.AUTHORIZED) {
          const fbtoken = await messaging().getToken();

          await axios
            .post(
              `${process.env.EXPO_PUBLIC_API}/auth/create-firebase-token`,
              { firebase_token: fbtoken },
              { headers: { Authorization: `Bearer ${userToken}` } }
            )
            .then(async () => {
              await insertFirebase(fbtoken, expiredToken);
              handleSetUser(userData, "TRIBE");
            });
        }

        navigation.navigate("Loading", { userData });
        formik.setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error?.response?.data?.message);
        toggleAlert();
        formik.setSubmitting(false);
      });
  };

  const handleSetUser = async (userData, module) => {
    try {
      // Store user data and token in SQLite
      await insertUser(JSON.stringify(userData), userData.access_token, userData.dbc);

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

            <Form
              formik={formik}
              hidePassword={hidePassword}
              handleHidePassword={handleHidePassword}
              handleDisabled={handleDisabled}
              handleForgotPassword={handleForgotPassword}
            />

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
