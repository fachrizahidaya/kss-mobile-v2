import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { QueryCache } from "react-query";

import { Bar } from "react-native-progress";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import axiosInstance from "../../config/api";
import { logout } from "../../redux/reducer/auth";
import { resetModule } from "../../redux/reducer/module";
import { remove } from "../../redux/reducer/user_menu";
import { deleteGoHome, deleteAttend, deleteFirebase, deleteUser } from "../../config/db";
import { Colors } from "../../styles/Color";

const Logout = () => {
  const queryCache = new QueryCache();
  const dispatch = useDispatch();
  const [loadingValue, setLoadingValue] = useState(0);

  // Increment loading value by 1 for certain interval time
  const handleLoadingValue = () => {
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
  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      await axiosInstance.post("/auth/logout");

      // Delete user data and tokens from SQLite
      await deleteUser();
      await deleteFirebase();
      await deleteAttend();
      await deleteGoHome();

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
        handleLoadingValue();
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
        handleLogout();
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
    backgroundColor: Colors.secondary,
  },
});
