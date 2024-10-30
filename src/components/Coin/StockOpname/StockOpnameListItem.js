import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../layouts/CustomCard";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomBadge from "../../../styles/CustomBadge";
import { TextProps } from "../../../styles/CustomStylings";

const StockOpnameListItem = ({ id, so_no, soo_no, date, status, navigation, index, length }) => {
  const dataArr = [
    { title: "SO Date", value: date || "No Data" },
    { title: "SOO No.", value: soo_no || "No Data" },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Stock Opname Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {so_no || "-"}
        </Text>
        <CustomBadge
          description={status}
          backgroundColor={status === "Pending" ? "#e2e3e5" : status === "Partially" ? "#fef9c3" : "#dcfce6"}
          textColor={status === "Pending" ? "#65758c" : status === "Partially" ? "#cb8c09" : "#16a349"}
        />
      </View>
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{date || "No Data"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Stock Opname Order: {soo_no || "-"}</Text>
      </View>
    </CustomCard>
  );
};

export default StockOpnameListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
