import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";

const ItemMinimumListItem = ({ name, code, index, length, navigation, stock }) => {
  const dataArr = [
    { title: "SKU", value: code },
    { title: "Total Stock", value: stock },
  ];

  return (
    <CustomCard index={index} length={length} gap={8}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={[TextProps, { maxWidth: 300, overflow: "hidden" }]} ellipsizeMode="tail" numberOfLines={2}>
          {name}
        </Text>
        <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(null)} />
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

export default ItemMinimumListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
