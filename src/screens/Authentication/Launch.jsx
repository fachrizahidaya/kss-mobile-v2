import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { QueryCache } from "react-query";

import jwt_decode from "jwt-decode";

import { Image, SafeAreaView, StyleSheet, View } from "react-native";

import { useDisclosure } from "../../hooks/useDisclosure";
import EULA from "../../layouts/EULA";
import {
  init,
  fetchUser,
  fetchAgreement,
  insertAgreement,
  deleteUser,
  deleteFirebase,
  deleteAttend,
  deleteGoHome,
} from "../../config/db";
import { login, logout } from "../../redux/reducer/auth";
import { resetModule, setModule } from "../../redux/reducer/module";
import { Colors } from "../../styles/Color";
import axiosInstance from "../../config/api";
import { remove } from "../../redux/reducer/user_menu";

const Launch = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  const queryCache = new QueryCache();

  const { isOpen: eulaIsOpen, toggle: toggleEula } = useDisclosure(false);

  const handleLogin = async (userData, module) => {
    try {
      const updatedPayload = {
        ...userSelector,
      };
      dispatch(login(updatedPayload));
      dispatch(setModule(module));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      await deleteUser();
      await deleteFirebase();
      await deleteAttend();
      await deleteGoHome();

      queryCache.clear();
      dispatch(remove());
      dispatch(resetModule());
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUser = async () => {
    try {
      let currentDate = new Date();

      const storedAgreement = await fetchAgreement();
      const storedUser = await fetchUser();
      const userToFetch = storedUser[storedUser?.length - 1];
      const agreementToFetch = storedAgreement[storedAgreement?.length - 1];
      const userAgreement = agreementToFetch?.eula;
      const dataUser = userToFetch?.data;
      const dataToken = userToFetch?.token;

      if (userAgreement === "agreed") {
        if (dataToken) {
          const decodedToken = jwt_decode(dataToken);
          const isExpired = decodedToken.exp * 1000 < currentDate.getTime();
          if (!decodedToken) {
            navigation.navigate("Login");
          }

          if (!isExpired) {
            const parsedUserData = JSON.parse(dataUser);

            handleLogin(parsedUserData, "TRIBE");
          } else {
            handleLogout();
            navigation.navigate("Login");
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

  const handleAgreeToTerms = async () => {
    try {
      await insertAgreement("agreed");
      const storedUser = await fetchUser();
      const dataToFetch = storedUser[storedUser?.length - 1];
      const dataUser = dataToFetch?.data;

      const parsedUserData = dataUser && JSON.parse(dataUser);

      toggleEula();

      if (!dataUser) {
        navigation.navigate("Login");
      } else {
        handleLogin(parsedUserData, "TRIBE");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init()
      .then(() => {
        handleGetUser();
      })
      .catch((err) => {
        console.log("initalization error", err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <EULA isOpen={eulaIsOpen} toggle={handleAgreeToTerms} />
      <View style={styles.loading}>
        <Image
          source={require("../../assets/icons/kss_logo.png")}
          alt="KSS_LOGO"
          style={styles.icon}
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
  loading: {
    alignItems: "center",
  },
  icon: {
    width: 67,
    height: 67,
    resizeMode: "contain",
  },
});
