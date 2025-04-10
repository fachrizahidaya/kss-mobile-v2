import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../styles/Color";

const CourierPickupTotal = ({ total }) => {
  return (
    <View style={styles.container}>
      <Text>Total:</Text>
      <Text>{total || 0}</Text>
    </View>
  );
};

export default CourierPickupTotal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: 14,
  },
});
