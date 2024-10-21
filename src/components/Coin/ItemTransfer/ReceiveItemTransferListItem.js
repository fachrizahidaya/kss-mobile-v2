import { StyleSheet, Text, View } from "react-native";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../layouts/CustomCard";
import { TextProps } from "../../../styles/CustomStylings";
import CustomBadge from "../../../styles/CustomBadge";

const ReceiveItemTransferListItem = ({
  id,
  index,
  length,
  navigation,
  date,
  origin,
  target,
  status,
  transfer_no,
  receive_no,
}) => {
  const dataArr = [
    { title: "Transfer No.", value: transfer_no || "No Data" },
    { title: "Receive Date", value: date || "No Data" },
    { title: "Origin", value: origin || "No Data" },
    { title: "Target", value: target || "No Data" },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Item Transfer Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text
            style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {receive_no}
          </Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(receive_no)} />
        </View>
        <CustomBadge
          description={status}
          backgroundColor={status === "Pending" ? "#e2e3e5" : status === "Partially" ? "#fef9c3" : "#dcfce6"}
          textColor={status === "Pending" ? "#65758c" : status === "Partially" ? "#cb8c09" : "#16a349"}
        />
      </View>
      <View style={{ marginTop: 8, gap: 8 }}>
        {dataArr.map((item, index) => {
          return (
            <View key={index} style={styles.data}>
              <Text style={[TextProps]}>{item.title}</Text>
              <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%" }]}>{item.value}</Text>
            </View>
          );
        })}
      </View>
    </CustomCard>
  );
};

export default ReceiveItemTransferListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
