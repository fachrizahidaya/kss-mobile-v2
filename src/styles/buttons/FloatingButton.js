import { Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors } from "../Color";

const FloatingButton = ({ icon, handlePress }) => {
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <MaterialCommunityIcons name={icon} size={30} color={Colors.iconLight} />
    </Pressable>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 30,
    right: 10,
    zIndex: 2,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.borderWhite,
  },
});
