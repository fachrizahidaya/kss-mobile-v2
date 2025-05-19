import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import jwt_decode from "jwt-decode";

import { Image, SafeAreaView, StyleSheet, View } from "react-native";

import { useDisclosure } from "../../hooks/useDisclosure";
import EULA from "../../layouts/EULA";
import {
  init,
  fetchUser,
  fetchAgreement,
  insertAgreement,
  deleteFirebase,
  deleteAttend,
  deleteGoHome,
  deleteTimeGroup,
} from "../../config/db";
import { login, logout } from "../../redux/reducer/auth";
import { setModule } from "../../redux/reducer/module";
import { Colors } from "../../styles/Color";

const Launch = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);

  const { isOpen: eulaIsOpen, toggle: toggleEula } = useDisclosure(false);

  const loginHandler = async (userData, module) => {
    try {
      const updatedPayload = {
        ...userSelector,
        // ...userData,
      };
      dispatch(login(updatedPayload));
      dispatch(setModule(module));
      // navigation.navigate("Loading", { userData });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      let currentDate = new Date();

      const storedAgreement = await fetchAgreement();
      const storedUser = await fetchUser();
      const userAgreement = storedAgreement[0]?.eula;
      const dataUser = storedUser[0]?.data;
      const dataToken = storedUser[0]?.token;

      if (userAgreement === "agreed") {
        if (dataToken) {
          const decodedToken = jwt_decode(dataToken);
          const isExpired = decodedToken.exp * 1000 < currentDate.getTime();
          if (!decodedToken) {
            navigation.navigate("Login");
          }

          if (!isExpired) {
            const parsedUserData = JSON.parse(dataUser);

            loginHandler(parsedUserData, "TRIBE");
          } else {
            // await deleteUser();
            // await deleteFirebase();
            // await deleteAttend();
            // await deleteGoHome();
            // await deleteTimeGroup();
            navigation.navigate("Login");
            dispatch(logout());
          }
        } else {
          // navigation.navigate("Company");
          navigation.navigate("Login");
        }
      } else {
        toggleEula();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const agreeToTermsHandler = async () => {
    try {
      await insertAgreement("agreed");
      const storedUser = await fetchUser();
      const dataUser = storedUser[0]?.data;

      const parsedUserData = dataUser && JSON.parse(dataUser);

      toggleEula();

      if (!dataUser) {
        navigation.navigate("Login");
      } else {
        loginHandler(parsedUserData, "TRIBE");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init()
      .then(() => {
        getUserData();
      })
      .catch((err) => {
        console.log("initalization error", err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <EULA isOpen={eulaIsOpen} toggle={agreeToTermsHandler} />
      <View style={styles.loadingContainer}>
        <Image
          source={require("../../assets/icons/kss_logo.png")}
          alt="KSS_LOGO"
          style={styles.logo}
        />
      </View>
    </SafeAreaView>
  );
};

export default Launch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  loadingContainer: {
    alignItems: "center",
  },
  logo: {
    width: 67,
    height: 67,
    resizeMode: "contain",
  },
});
