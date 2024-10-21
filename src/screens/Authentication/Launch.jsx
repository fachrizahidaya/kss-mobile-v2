import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import messaging from "@react-native-firebase/messaging";

import jwt_decode from "jwt-decode";

import { Image, SafeAreaView, StyleSheet, View, AppState } from "react-native";

import { useDisclosure } from "../../hooks/useDisclosure";
import EULA from "../../layouts/EULA";
import { init, fetchUser, fetchAgreement, insertAgreement, fetchFirebase } from "../../config/db";

const Launch = () => {
  const navigation = useNavigation();
  const currentDate = dayjs().format("YYYY-MM-DD");

  const { isOpen: eulaIsOpen, toggle: toggleEula } = useDisclosure(false);

  const loginHandler = async (userData) => {
    try {
      navigation.navigate("Loading", { userData });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      let currentDate = new Date();

      const storedAgreement = await fetchAgreement();
      const storedUser = await fetchUser();
      const storedFirebase = await fetchFirebase();
      const userAgreement = storedAgreement[0]?.eula;
      const dataUser = storedUser[0]?.data;
      const dataToken = storedUser[0]?.token;
      const expiredFirebaseToken = storedFirebase[0]?.expired;
      const expiredFirebaseDate = new Date(expiredFirebaseToken);
      const current_date = new Date(currentDate);
      const timeDifference = expiredFirebaseDate - current_date;
      // const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

      if (userAgreement === "agreed") {
        if (dataToken) {
          const decodedToken = jwt_decode(dataToken);
          const isExpired = decodedToken.exp * 1000 < currentDate.getTime();

          if (!isExpired) {
            const parsedUserData = JSON.parse(dataUser);

            loginHandler(parsedUserData);
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
        loginHandler(parsedUserData);
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
        <Image source={require("../../assets/icons/kss_logo.png")} alt="KSS_LOGO" style={styles.logo} />
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
    backgroundColor: "#ffffff",
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
