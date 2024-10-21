import { Pressable, StyleSheet, Text } from "react-native";
import { TextProps } from "../../../styles/CustomStylings";

const Item = ({ code, date, amount, isInvoice }) => {
  return (
    <Pressable style={styles.container}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: isInvoice ? 80 : null }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {`${code}`}
      </Text>

      <Text style={[TextProps]}>{date}</Text>

      {isInvoice ? <Text style={[TextProps]}>{amount}</Text> : null}
    </Pressable>
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
