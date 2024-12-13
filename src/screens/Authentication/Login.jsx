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
  Dimensions,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import axiosInstance from "../../config/api";
import { useLoading } from "../../hooks/useLoading";
import Input from "../../styles/forms/Input";
import FormButton from "../../styles/buttons/FormButton";
import { TextProps } from "../../styles/CustomStylings";
import { insertFirebase, insertUser } from "../../config/db";
import AlertModal from "../../styles/modals/AlertModal";
import { useDisclosure } from "../../hooks/useDisclosure";
import { login } from "../../redux/reducer/auth";
import { setModule } from "../../redux/reducer/module";
import { Colors } from "../../styles/Color";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const currentDate = dayjs();
  const dispatch = useDispatch();
  const expiredToken = currentDate.add(10, "day").format("YYYY-MM-DD");

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { isLoading, toggle: toggleLoading } = useLoading(false);

  const appVersion = Constants.expoConfig.version;

  const handleHidePassword = (hide, setHide) => {
    setHide(!hide);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Please use correct email format").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    validateOnChange: true,
    onSubmit: (values) => {
      loginHandler(values);
    },
  });

  /**
   * Handles the login process by sending a POST request to the authentication endpoint.
   * @function loginHandler
   * @param {Object} form - The login form data to be sent in the request.
   */
  const loginHandler = async (form) => {
    let timeoutId; // To track the timeout

    // Start a timeout for 5 seconds
    // timeoutId = setTimeout(() => {
    //   formik.setSubmitting(false); // Stop the form submission
    //   setErrorMessage("The login process took too long. Please try again."); // Set an appropriate error message
    //   toggleAlert(); // Show the alert modal
    // }, 8000); // 5 seconds timeout

    await axiosInstance
      .post("/auth/login", form)
      .then(async (res) => {
        // If successful, clear the timeout
        // clearTimeout(timeoutId);

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
              setUserData(userData, "TRIBE");
            });
        }

        // navigation.navigate("Loading", { userData });
        formik.setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
        toggleAlert();
        formik.setSubmitting(false);
      });
  };

  const setUserData = async (userData, module) => {
    try {
      // Store user data and token in SQLite
      await insertUser(JSON.stringify(userData), userData.access_token);

      // Dispatch a login action with the provided user data
      dispatch(login(userData));

      // Dispatch band module to firstly be rendered
      dispatch(setModule(module));
    } catch (error) {
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
                <Image style={styles.icon} source={require("../../assets/icons/kss_logo.png")} alt="KSS_LOGO" />
                <Text style={[{ fontSize: 20, fontWeight: 500 }, TextProps]}>Login</Text>
              </View>
            </View>

            <View style={{ gap: 10, width: "100%", alignItems: "center" }}>
              <Input fieldName="email" title="Email" formik={formik} placeHolder="Input your email" />

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
                isSubmitting={formik.isSubmitting}
                onPress={formik.handleSubmit}
                disabled={!formik.values.email || !formik.values.password || formik.isSubmitting}
                width="100%"
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

            <Text style={[TextProps, { textAlign: "center", opacity: 0.5 }]}>version {appVersion}</Text>
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
