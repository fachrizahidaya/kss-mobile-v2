import { useEffect, useState } from "react";

// Google authentication and firebase
// import { signOut } from "firebase/auth";
// import { auth } from "../config/firebase";

import { useDispatch, useSelector } from "react-redux";
import { QueryCache } from "react-query";

import { Bar } from "react-native-progress";
import { SafeAreaView, StyleSheet, View, Text, Platform, ActivityIndicator } from "react-native";
import Animated, { useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";

import axiosInstance from "../config/api";
import { logout } from "../redux/reducer/auth";
import { resetModule } from "../redux/reducer/module";
import { remove } from "../redux/reducer/user_menu";
import { deleteGoHome, deleteAttend, deleteFirebase, deleteUser, fetchFirebase, deleteTimeGroup } from "../config/db";

const Logout = () => {
  const queryCache = new QueryCache();
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  const [loadingValue, setLoadingValue] = useState(0);

  // Increment loading value by 1 for certain interval time
  const updateLoadingValue = () => {
    setLoadingValue((prevValue) => prevValue + 1);
  };

  // Animate styling for the kss logo
  const rStyle = useAnimatedStyle(() => ({
    opacity: withTiming(
      loadingValue <= 10
        ? 0
        : loadingValue > 10 && loadingValue <= 20
        ? 0.1
        : loadingValue > 20 && loadingValue <= 50
        ? 0.5
        : loadingValue > 50 && loadingValue <= 80
        ? 0.8
        : 1
    ),
  }));

  // Animate styling for the logo, loading text and the loading bar container
  const tStyle = useAnimatedStyle(() => ({
    opacity: withTiming(loadingValue < 100 ? 1 : 0),
  }));

  // Animate styling for the logo and text after the first loading is 100%
  const yStyle = useAnimatedStyle(() => ({
    opacity: withTiming(loadingValue < 100 ? 0 : 1),
    height: withSpring(loadingValue < 100 ? 0 : 238),
  }));

  // Animate styling for the logo fade in and drop down
  const uStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(loadingValue < 120 ? 0 : -200),
      },
    ],
    opacity: withTiming(loadingValue < 130 ? 1 : 0),
    height: 43,
    width: 43,
  }));

  /**
   * Handles the logout process by sending a POST request to the logout endpoint,
   * and then clearing user data and dispatching a logout action.
   */
  const logoutHandler = async () => {
    try {
      // Send a POST request to the logout endpoint
      const storedFirebase = await fetchFirebase();
      const firebaseData = storedFirebase[0]?.token;
      await axiosInstance.post("/auth/logout", {
        firebase_token: firebaseData,
      });

      // Delete user data and tokens from SQLite
      await deleteUser();
      await deleteFirebase();
      await deleteAttend();
      await deleteGoHome();
      await deleteTimeGroup();
      // await signOut(auth);

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
      console.log(error);
    }
  };

  useEffect(() => {
    // Effect to update loadingValue at regular intervals
    const interval = setInterval(() => {
      if (loadingValue < 130) {
        updateLoadingValue();
      } else {
        clearInterval(interval);
      }
    }, 10);

    // Clean up the interval when the component unmounts or the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, [loadingValue]);

  useEffect(() => {
    // Effect to initiate logout when loadingValue reaches 130
    if (loadingValue === 130) {
      // Delay the logout process using setTimeout
      const timeout = setTimeout(() => {
        logoutHandler();
      }, 0);

      // Clean up the timeout when the component unmounts or the dependencies change
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loadingValue]);

  return (
    <SafeAreaView style={styles.container}>
      {loadingValue < 130 && <ActivityIndicator />}
      {/* {loadingValue < 100 && (
        <Animated.View style={[styles.loadingContainer, tStyle]}>
          <Animated.Image
            resizeMode="contain"
            source={require("../assets/icons/kss_logo.png")}
            alt="KSS_LOGO"
            style={[styles.logo, rStyle]}
          />
          <Text style={{ color: "#979797", marginBottom: 10 }}>
            {loadingValue <= 40
              ? "Stepping out"
              : loadingValue > 40 && loadingValue <= 60
              ? "Clearing cache"
              : "Logging out"}
          </Text>

          <Bar progress={loadingValue / 100} width={300} color="#176688" borderColor="#FFFFFF" />
        </Animated.View>
      )} */}

      {/* {loadingValue >= 100 && (
        <Animated.View style={[styles.profileBox, yStyle]}>
          <View style={styles.profileBox}>
            <Animated.Image
              source={require("../assets/icons/kss_logo.png")}
              alt="KSS_LOGO"
              style={[uStyle, { resizeMode: "contain" }]}
            />

            <View style={{  alignItems: "center" }} alignItems="center">
              <Text style={{ color: "#979797" }}>See you,</Text>
              <Text style={{ fontSize: 16, color: "#176688", textAlign: "center" }}>
                {userSelector.name.length > 30 ? userSelector.name.split(" ")[0] : userSelector.name}
              </Text>
            </View>
          </View>
        </Animated.View>
      )} */}
    </SafeAreaView>
  );
};

export default Logout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingContainer: {
    alignItems: "center",
  },
  logo: {
    width: 67,
    height: 67,
  },
  profileBox: {
    backgroundColor: "#E7E7E7",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    width: 252,
    height: "100%",
    borderRadius: 10,
    gap: 20,
  },
});
