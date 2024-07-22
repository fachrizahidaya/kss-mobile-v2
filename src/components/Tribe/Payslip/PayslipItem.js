import dayjs from "dayjs";

import { View, Text, Pressable, StyleSheet } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";

const PayslipItem = ({ id, month, year, openSelectedPayslip }) => {
  const handleOpenPayslip = () => openSelectedPayslip(id);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[{ fontSize: 14, color: "#3F434A" }, TextProps]}>
          {dayjs()
            .month(month - 1)
            .year(year)
            .format("MMMM YYYY")}
        </Text>

        <Pressable onPress={handleOpenPayslip}>
          <MaterialCommunityIcons name="tray-arrow-down" size={20} color="#3F434A" />
        </Pressable>
      </View>
    </View>
  );
};

export default PayslipItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    gap: 10,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginVertical: 4,
  },
});
