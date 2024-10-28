import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const COAListItem = ({
  parent,
  name,
  code,
  type,
  balance,
  navigation,
  id,
  childCount,
  formatter,
  index,
  length,
  date,
  coa_name,
}) => {
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
    <CustomCard
      index={index}
      length={length}
      gap={8}
      backgroundColor={parent && childCount > 0 ? "#DCFCE7" : parent ? "#FFFFFF" : "#FEF9C3"}
      handlePress={() => navigation.navigate("COA Detail", { id: id, parent: parent, childCount: childCount })}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[TextProps, { fontWeight: "700", fontSize: 16 }]}>{code}</Text>
        <Text style={[TextProps, { fontWeight: "700" }]}> :</Text>
        <Text
          style={[TextProps, { fontSize: 16, overflow: "hidden", maxWidth: 200 }]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {" "}
          {name}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { opacity: 0.5, overflow: "hidden", maxWidth: 100 }]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {coa_name || "No Data"}
        </Text>
        <Text style={[TextProps, { opacity: 0.5 }]}>{date === "Invalid Date" ? "No Data" : date}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontWeight: "700", fontSize: 18, color: balance < 0 ? "red" : null }]}>
          {balance < 0 ? `(${formatter.format(Math.abs(balance))})` : formatter.format(balance) || "No Data"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default COAListItem;

const styles = StyleSheet.create({
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
