import { useState, useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { BackHandler, Dimensions, StyleSheet, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../styles/EmptyPlaceholder";
import Screen from "../../layouts/Screen";

const height = Dimensions.get("screen").height - 300;

const SiloDashboard = () => {
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  const route = useRoute();
  const isFocused = useIsFocused();
  const userSelector = useSelector((state) => state.auth);

  /**
   * Handle double press back to exit app
   */
  useEffect(() => {
    if (route.name === "Dashboard" && isFocused) {
      const backAction = () => {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }
        setBackPressedOnce(true);
        ToastAndroid.show("Press again to exit", ToastAndroid.SHORT);
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000); // Reset backPressedOnce after 2 seconds
        return true;
      };
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => backHandler.remove();
    }
  }, [backPressedOnce, route, isFocused]);

  return (
    <Screen screenTitle="Warehouse" mainScreen={true} companyName={userSelector?.company}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <EmptyPlaceholder text="No Data" height={250} width={250} padding={150} />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default SiloDashboard;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
