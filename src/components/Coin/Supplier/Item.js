import { StyleSheet, Text, View } from "react-native";
import { TextProps } from "../../../styles/CustomStylings";

const Item = ({ name, email, phone, isBank, bank, account_no, account_name }) => {
  return isBank ? (
    <View style={styles.container}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: 100, fontSize: 12 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {bank}
      </Text>
      <Text
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 80 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {account_no}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={2}
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 100 }]}
      >
        {account_name}
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: 100, fontSize: 12 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {name}
      </Text>
      <Text
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 80 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {email}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={2}
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 100 }]}
      >
        {phone}
      </Text>
    </View>
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
