import dayjs from "dayjs";

import { Pressable, StyleSheet, Text } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const Item = ({ item_id, name, qty, unit, navigation, delivered_qty, receive_no, receive_date, isReceive }) => {
  return isReceive ? (
    <Pressable style={styles.container}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: 200, fontSize: 12 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
        onPress={() => navigation.navigate("Items Detail", { id: item_id })}
      >
        {receive_no}
      </Text>
      <Text
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 80 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {receive_date}
      </Text>
    </Pressable>
  ) : (
    <Pressable style={styles.container}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: 200, fontSize: 12 }]}
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
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 80 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {new Intl.NumberFormat("id-ID").format(delivered_qty)} {unit}
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
