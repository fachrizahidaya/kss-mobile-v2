import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../styles/CustomCard";

const ReminderListItem = ({ status, transaction_no, date, description, index, length }) => {
  const dataArr = [{ title: "Transaction Date", value: date }];

  return (
    <CustomCard index={index} length={length} gap={8}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{transaction_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(transaction_no)} />
        </View>
        <View style={styles.status}>
          <Text style={[TextProps, { color: status === "Overdue" ? "#21a143" : "#e56e18" }]}>{status}</Text>
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
      <Text style={[TextProps]}>{description}</Text>
    </CustomCard>
  );
};

export default ReminderListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  status: {
    backgroundColor: "#fff7f2",
    borderRadius: 10,
    padding: 8,
    alignSelf: "flex-end",
  },
});
