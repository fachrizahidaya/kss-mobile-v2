import dayjs from "dayjs";

import { View, Text, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";

const PayslipItem = ({ id, month, year, openSelectedPayslip, index, length, downloadAccess }) => {
  console.log(month, year);
  const handleOpenPayslip = () => openSelectedPayslip(id);

  return (
    <CustomCard index={index} length={length} gap={10}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        {(month || year) && (
          <Text style={[TextProps]}>
            {dayjs()
              .month(month - 1)
              .year(year)
              .format("MMM YYYY")}
          </Text>
        )}

        {downloadAccess && (
          <Pressable onPress={handleOpenPayslip}>
            <MaterialCommunityIcons name="tray-arrow-down" size={20} color={Colors.iconDark} />
          </Pressable>
        )}
      </View>
    </CustomCard>
  );
};

export default PayslipItem;
