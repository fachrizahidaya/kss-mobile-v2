import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import { CopyToClipboard } from "../../../styles/CopyToClipboard";
const ItemMinimumListItem = ({ name, code, available_qty, ordered_qty, requested_qty, index, length }) => {
  return (
    <Pressable
      style={[card.card, styles.content, { marginBottom: index === length - 1 ? 14 : null }]}
      onPress={() => navigation.navigate("Sales Order Detail", { id: id })}
    >
      <Text style={[TextProps]}>{name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={[TextProps]}>{code}</Text>
        <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(null)} />
      </View>
      <Text style={[TextProps]}>{available_qty}</Text>
      <Text style={[TextProps]}>{ordered_qty}</Text>
      <Text style={[TextProps]}>{requested_qty}</Text>
    </Pressable>
  );
};

export default ItemMinimumListItem;

const styles = StyleSheet.create({
  content: {
    marginTop: 14,
    marginHorizontal: 14,
    justifyContent: "space-between",
    gap: 8,
  },
});
