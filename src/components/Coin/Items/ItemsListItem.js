import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../layouts/CustomCard";
import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";

const ItemsListItem = ({ id, name, code, available_qty, qty, unit, index, length, navigation, category }) => {
  const dataArr = [
    { title: "SKU", value: code },
    { title: "Category", value: category },
    { title: "Unit", value: unit },
    { title: "Total Stock", value: qty },
    { title: "Available Stock", value: qty - available_qty },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Items Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps, { maxWidth: 300, overflow: "hidden" }]} ellipsizeMode="tail" numberOfLines={2}>
            {name}
          </Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(null)} />
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
    </CustomCard>
  );
};

export default ItemsListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
