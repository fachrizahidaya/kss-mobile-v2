import { useEffect, useState } from "react";

import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import InvoiceList from "./InvoiceList";
import { TextProps } from "../../../styles/CustomStylings";
import Tabs from "../../../styles/Tabs";

const Invoice = ({ data, tabs, tabValue, onChangeTab, onChangeNumber, number, navigation }) => {
  const [previousTabValue, setPreviousTabValue] = useState(0);
  const screenHeight = Dimensions.get("window").height;

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const renderContent = () => {
    switch (tabValue) {
      case "Partial":
        return <InvoiceList data={data} />;

      default:
        return <InvoiceList data={data} />;
    }
  };

  useEffect(() => {
    if (previousTabValue !== number) {
      const direction = previousTabValue < number ? -1 : 1;
      translateX.value = withTiming(direction * width, { duration: 300, easing: Easing.out(Easing.cubic) }, () => {
        translateX.value = 0;
      });
    }
    setPreviousTabValue(number);
  }, [number]);

  return (
    <View style={[card.card, { height: screenHeight - 380, gap: 5 }]}>
      <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>Invoice</Text>
      <View style={{ flex: 1, marginTop: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} onChangeNumber={onChangeNumber} />
          <Pressable onPress={() => navigation.navigate("Invoice")} style={styles.showMore}>
            <Text style={[TextProps, { fontSize: 11, marginTop: 0 }]}>Show more</Text>
            <MaterialCommunityIcons name="chevron-right" size={15} color="#3F434A" />
          </Pressable>
        </View>
        <View style={styles.container}>
          <Animated.View style={[styles.animatedContainer, animatedStyle]}>{renderContent()}</Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  categoryWrapper: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    padding: 0.5,
    borderColor: "#E8E9EB",
  },
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
  },
  animatedContainer: {
    flex: 1,
    width: "100%",
  },
  showMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderRadius: 15,
    padding: 6,
    borderColor: "#E8E9EB",
  },
});
