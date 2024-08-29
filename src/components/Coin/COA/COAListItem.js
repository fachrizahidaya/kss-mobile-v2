import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import { CopyToClipboard } from "../../../styles/CopyToClipboard";

const COAListItem = ({ parent, name, code, type, balance, navigation, id, childCount, formatter }) => {
  const dataArr = [
    { title: "Account Type", value: type || "No Data", color: null, opacity: 0.5 },
    {
      title: "Balance",
      value: balance < 0 ? `(${formatter.format(Math.abs(balance))})` : formatter.format(balance) || "No Data",
      color: balance < 0 ? "red" : null,
      opacity: balance < 0 ? 1 : 0.5,
    },
  ];

  return (
    <Pressable
      style={[
        card.card,
        styles.content,
        { backgroundColor: parent && childCount > 0 ? "#DCFCE7" : parent ? "#FFFFFF" : "#FEF9C3" },
      ]}
      onPress={() => navigation.navigate("COA Detail", { id: id, parent: parent, childCount: childCount })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{code}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(code)} />
        </View>
        <View style={styles.status}>
          <Text style={[TextProps]}>{name}</Text>
        </View>
      </View>
      {dataArr.map((item, index) => {
        return (
          <View key={index} style={styles.data}>
            <Text style={[TextProps]}>{item.title}</Text>
            <Text style={[TextProps, { opacity: item.opacity, textAlign: "right", width: "60%", color: item.color }]}>
              {item.value}
            </Text>
          </View>
        );
      })}
    </Pressable>
  );
};

export default COAListItem;

const styles = StyleSheet.create({
  content: {
    marginVertical: 4,
    justifyContent: "space-between",
    gap: 8,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  status: {
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});
