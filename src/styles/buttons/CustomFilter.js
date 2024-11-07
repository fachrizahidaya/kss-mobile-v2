import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../Color";

const CustomFilter = ({ toggle, filterAppear, size }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={toggle}>
      <MaterialCommunityIcons name="tune-variant" size={size ? size : 20} color={Colors.iconDark} />
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
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
    position: "relative",
  },
  filterIndicator: {
    position: "absolute",
    backgroundColor: Colors.indicatorIsTrue,
    borderRadius: 10,
    right: 3,
    top: 3,
    width: 10,
    height: 10,
  },
});
