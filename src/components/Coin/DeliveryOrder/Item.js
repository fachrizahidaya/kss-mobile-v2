import { Pressable, StyleSheet, Text } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const Item = ({ item_id, name, qty, unit, warehouse, navigation }) => {
  return (
    <Pressable style={styles.container}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: 100, fontSize: 12 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
        onPress={() => navigation.navigate("Items Detail", { id: item_id })}
      >
        {name}
      </Text>
      <Text
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 80 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {new Intl.NumberFormat("id-ID").format(qty)} {unit}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={2}
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 100 }]}
      >
        {warehouse}
      </Text>
    </Pressable>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E9EB",
  },
});
