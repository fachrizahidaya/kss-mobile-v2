import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CustomFilter = ({ toggle, filterAppear, size }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={toggle}>
      <MaterialCommunityIcons name="tune-variant" size={size ? size : 20} color="#3F434A" />
      {filterAppear ? <View style={styles.filterIndicator} /> : null}
    </TouchableOpacity>
  );
};

export default CustomFilter;

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  filterIndicator: {
    position: "absolute",
    backgroundColor: "#4AC96D",
    borderRadius: 10,
    right: 3,
    top: 3,
    width: 10,
    height: 10,
  },
});
