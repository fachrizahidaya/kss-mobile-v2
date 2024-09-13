import dayjs from "dayjs";

import { View, Text, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../styles/CustomCard";

const PayslipItem = ({ id, month, year, openSelectedPayslip, index, length }) => {
  const handleOpenPayslip = () => openSelectedPayslip(id);

  return (
    <CustomCard index={index} length={length} gap={10}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[{ fontSize: 14, color: "#3F434A" }, TextProps]}>
          {dayjs()
            .month(month - 1)
            .year(year)
            .format("MMM YYYY")}
        </Text>

        <Pressable onPress={handleOpenPayslip}>
          <MaterialCommunityIcons name="tray-arrow-down" size={20} color="#3F434A" />
        </Pressable>
      </View>
    </CustomCard>
  );
};

export default PayslipItem;
