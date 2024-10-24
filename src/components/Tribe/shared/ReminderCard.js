import { Pressable, StyleSheet } from "react-native";

const ReminderCard = ({ children, index, length, navigation, forSick, date }) => {
  return (
    <Pressable
      style={[
        styles.wrapper,
        {
          marginLeft: 16,
          marginRight: index === length - 1 ? 16 : null,
          backgroundColor: !forSick ? "#FFFFFF" : "#EDEDED",
        },
      ]}
      onPress={() => navigation.navigate("Attendance Screen", { unattendance: date })}
    >
      {children}
    </Pressable>
  );
};

export default ReminderCard;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 10,
    height: 80,
    gap: 12,
    width: 250,
  },
});
