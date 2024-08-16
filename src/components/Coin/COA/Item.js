import { Pressable, StyleSheet, Text } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const Item = ({ name, code }) => {
  return (
    <Pressable style={styles.container}>
      <Text style={[TextProps, { overflow: "hidden", width: "50%" }]} ellipsizeMode="tail" numberOfLines={2}>
        {name}
      </Text>
      <Text style={[TextProps, { overflow: "hidden" }]} ellipsizeMode="tail" numberOfLines={2}>
        {code}
      </Text>
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
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
