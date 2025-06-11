import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { QueryCache } from "react-query";

import jwt_decode from "jwt-decode";

import { Image, SafeAreaView, StyleSheet, View } from "react-native";
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
<<<<<<< HEAD
} from "../../config/db";
import { login, logout } from "../../redux/reducer/auth";
<<<<<<< HEAD
<<<<<<< HEAD
import { resetModule, setModule } from "../../redux/reducer/module";
=======
import { setModule } from "../../redux/reducer/module";
>>>>>>> 75e1c2fd (fix: token expired)
import { Colors } from "../../styles/Color";
<<<<<<< HEAD
import axiosInstance from "../../config/api";
import { remove } from "../../redux/reducer/user_menu";
=======
import { handleLogout } from "./Logout";
>>>>>>> 9d92ccfc (fix:)
=======
import { resetModule, setModule } from "../../redux/reducer/module";
import { Colors } from "../../styles/Color";
import axiosInstance from "../../config/api";
import { remove } from "../../redux/reducer/user_menu";
>>>>>>> 452dd131 (fix:)
=======
  deleteTimeGroup,
} from "../../config/db";
import { login, logout } from "../../redux/reducer/auth";
import { resetModule, setModule } from "../../redux/reducer/module";
import { Colors } from "../../styles/Color";
import axiosInstance from "../../config/api";
import { remove } from "../../redux/reducer/user_menu";
>>>>>>> 478ff178 (fix: expired token new)

const Launch = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  const queryCache = new QueryCache();
<<<<<<< HEAD
=======

  const fetchStored = async () => {
    try {
      const storedFirebase = await fetchUser();
      console.log("s", storedFirebase);
    } catch (error) {
      console.log(error);
    }
  };
>>>>>>> 478ff178 (fix: expired token new)

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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 452dd131 (fix:)
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

=======
  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      await axiosInstance.post("/auth/logout");

      // Delete user data and tokens from SQLite
>>>>>>> 478ff178 (fix: expired token new)
      await deleteUser();
      await deleteFirebase();
      await deleteAttend();
      await deleteGoHome();
<<<<<<< HEAD

      queryCache.clear();
      dispatch(remove());
      dispatch(resetModule());
      dispatch(logout());
    } catch (error) {
=======
      await deleteTimeGroup();

      // Clear react query caches
      queryCache.clear();
      // Dispatch user menu back to empty object
      dispatch(remove());
      // Dispatch module to empty string again
      dispatch(resetModule());
      // Dispatch a logout action
      dispatch(logout());
    } catch (error) {
      // Log any errors that occur during the logout process
>>>>>>> 478ff178 (fix: expired token new)
      console.log(error);
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c4896fc0 (fix: authentication)
=======
>>>>>>> 452dd131 (fix:)
=======
>>>>>>> 478ff178 (fix: expired token new)
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

<<<<<<< HEAD
<<<<<<< HEAD
            handleLogin(parsedUserData, "TRIBE");
          } else {
<<<<<<< HEAD
<<<<<<< HEAD
            handleLogout();
            navigation.navigate("Login");
=======
            loginHandler(parsedUserData, "TRIBE");
=======
            handleLogin(parsedUserData, "TRIBE");
>>>>>>> c4896fc0 (fix: authentication)
          } else {
            navigation.navigate("Login");
            handleLogout();
            dispatch(logout());
>>>>>>> 75e1c2fd (fix: token expired)
=======
            handleLogout();
            navigation.navigate("Login");
>>>>>>> 452dd131 (fix:)
=======
            handleLogout();
            navigation.navigate("Login");
>>>>>>> 478ff178 (fix: expired token new)
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

  useEffect(() => {
    fetchStored();
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
