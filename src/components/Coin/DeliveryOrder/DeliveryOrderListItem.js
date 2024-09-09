import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/CopyToClipboard";

const DeliveryOrderListItem = ({ id, navigation, do_no, status, do_date, shipping_address, index, length }) => {
  const dataArr = [
    { title: "SO Date", value: do_date },
    { title: "Shipping Address", value: shipping_address },
  ];

  return (
    <Pressable
      style={[card.card, styles.content, { marginBottom: index === length - 1 ? 14 : null }]}
      onPress={() => navigation.navigate("Delivery Order Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{do_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(do_no)} />
        </View>
        <View style={styles.status}>
          <Text
            style={[
              TextProps,
              {
                color: status === "Finish" ? "#21a143" : status === "In Progress" ? "#43ac59" : "#e56e18",
                fontSize: 12,
              },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
      {dataArr.map((item, index) => {
        return (
          <View key={index} style={styles.data}>
            <Text style={[TextProps]}>{item.title}</Text>
            <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%" }]}>{item.value}</Text>
          </View>
        );
      })}
    </Pressable>
  );
};

export default DeliveryOrderListItem;

const styles = StyleSheet.create({
  content: {
    marginTop: 14,
    marginHorizontal: 16,
    justifyContent: "space-between",
    gap: 8,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  status: {
    backgroundColor: "#fff7f2",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-end",
  },
});
