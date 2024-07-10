import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const Item = ({ name, qty, unit, warehouse }) => {
  return (
    <View style={styles.container}>
      <Text style={[TextProps, { overflow: "hidden", width: 75 }]} ellipsizeMode="tail" numberOfLines={2}>
        {name}
      </Text>
      <Text style={[TextProps]}>
        {new Intl.NumberFormat("id-ID").format(qty)} {unit}
      </Text>
      <Text style={[TextProps]}>{warehouse}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E9EB",
    padding: 10,
  },
});
