import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";

const SalesOrderListItem = ({
  id,
  so_no,
  navigation,
  status,
  so_date,
  shipping_address,
  index,
  length,
  customer,
  amount,
  currencyConverter,
}) => {
  const dataArr = [
    { title: "SO Date", value: so_date || "No Data" },
    { title: "Customer", value: customer || "No Data" },
    { title: "Amount", value: currencyConverter.format(amount) || "No Data" },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Sales Order Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{so_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(so_no)} />
        </View>
        <CustomBadge
          description={status}
          backgroundColor="#fff7f2"
          textColor={status === "Finish" ? "#21a143" : status === "In Progress" ? "#43ac59" : "#e56e18"}
        />
      </View>
      {dataArr.map((item, index) => {
        return (
          <View key={index} style={styles.data}>
            <Text style={[TextProps]}>{item.title}</Text>
            <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%" }]}>{item.value}</Text>
          </View>
        );
      })}
    </CustomCard>
  );
};

export default SalesOrderListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
