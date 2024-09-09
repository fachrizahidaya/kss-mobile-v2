import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import { CopyToClipboard } from "../../../styles/CopyToClipboard";

const BankTransferListItem = ({
  id,
  navigation,
  date,
  transfer_no,
  input_no,
  output_no,
  input_name,
  output_name,
  index,
  length,
}) => {
  const dataArr = [
    { title: "Bank (In)", value: `${input_no} - ${input_name}` },
    { title: "Bank (Out)", value: `${output_no} - ${output_name}` },
  ];

  return (
    <Pressable
      style={[card.card, styles.content, { marginBottom: index === length - 1 ? 14 : null }]}
      onPress={() => navigation.navigate("Bank Transfer Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{transfer_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(transfer_no)} />
        </View>
        <Text style={[TextProps]}>{date}</Text>
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

export default BankTransferListItem;

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
});
