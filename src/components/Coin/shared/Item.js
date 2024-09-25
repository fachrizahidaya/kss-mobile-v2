import { Pressable, StyleSheet, Text } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const Item = ({ name, qty, unit, total_amount, currencyConverter }) => {
  return (
    <Pressable style={styles.container}>
      <Text style={[TextProps, { fontSize: 12 }]}>
        {new Intl.NumberFormat("id-ID").format(qty)} {unit}
      </Text>
      <Text
        style={[TextProps, { overflow: "hidden", width: "50%", fontSize: 12 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {name}
      </Text>
      <Text style={[TextProps, { fontSize: 12 }]}>{currencyConverter.format(total_amount)}</Text>
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
  },
});
