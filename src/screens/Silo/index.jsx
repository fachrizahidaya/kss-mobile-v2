import { useState, useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";

import { BackHandler, Dimensions, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { TextProps } from "../../styles/CustomStylings";
import EmptyPlaceholder from "../../styles/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;

const SiloDashboard = () => {
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  const route = useRoute();
  const isFocused = useIsFocused();

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#176688" }}>Warehouse</Text>
        </View>
        <Text style={[{ fontWeight: "700" }, TextProps]}>PT Kolabora Group Indonesia</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <EmptyPlaceholder text="No Data" height={250} width={250} padding={150} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SiloDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
