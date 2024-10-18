import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";

const DeliveryOrderListItem = ({
  id,
  navigation,
  do_no,
  status,
  do_date,
  shipping_address,
  index,
  length,
  customer,
  courier,
}) => {
  const dataArr = [
    { title: "DO Date", value: do_date || "No Data" },
    { title: "Customer", value: customer || "No Data" },
    { title: "Courier", value: courier || "No Data" },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Delivery Order Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{do_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(do_no)} />
        </View>
        <CustomBadge
          description={status}
          backgroundColor="#fff7f2"
          textColor={status === "Delivered" ? "#21a143" : status === "Pending" ? "#43ac59" : "#e56e18"}
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

export default DeliveryOrderListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
