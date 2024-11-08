import { StyleSheet, View } from "react-native";

const ReminderCard = ({ children, index, length, borderBottomColor, borderBottomWidth }) => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          borderBottomWidth: borderBottomWidth ? borderBottomWidth : null,
          borderBottomColor: borderBottomColor ? borderBottomColor : null,
          marginLeft: 16,
          marginRight: index === length - 1 ? 16 : null,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default ReminderCard;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 10,
    height: 80,
    borderBottomWidth: 3,
    backgroundColor: "#FFFFFF",
    gap: 12,
    width: 200,
  },
});
