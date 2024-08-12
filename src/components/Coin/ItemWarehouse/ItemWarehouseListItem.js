import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import { CopyToClipboard } from "../../../styles/CopyToClipboard";

const ItemWarehouseListItem = ({ name, code, qty }) => {
  return (
    <Pressable
      style={[card.card, styles.content]}
      onPress={() => navigation.navigate("Sales Order Detail", { id: id })}
    >
      <Text style={[TextProps]}>{name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={[TextProps]}>{code}</Text>
        <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(null)} />
      </View>
      <Text style={[TextProps]}>{qty}</Text>
    </Pressable>
  );
};

export default ItemWarehouseListItem;

const styles = StyleSheet.create({
  content: {
    marginVertical: 4,
    marginHorizontal: 14,
    justifyContent: "space-between",
    gap: 8,
  },
});
