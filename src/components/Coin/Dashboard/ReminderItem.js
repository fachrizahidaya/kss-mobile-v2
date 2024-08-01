import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextProps } from "../../../styles/CustomStylings";
import dayjs from "dayjs";

const ReminderItem = ({ due_date, description, type, customer, company }) => {
  return (
    <TouchableOpacity onPress={null}>
      <View style={[styles.wrapper, { borderBottomColor: "#49c96d" }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={[{ width: 120 }, TextProps]} numberOfLines={1}>
            {dayjs(due_date).format("DD MMM YYYY")}
          </Text>
        </View>
        <Text style={[TextProps]}>{description}</Text>
        <Text style={[TextProps]}>{type === "Sales" ? customer : company}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReminderItem;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 10,
    height: 100,
    borderBottomWidth: 5,
    backgroundColor: "#FFFFFF",
    marginRight: 10,
    width: 220,
    gap: 6,
    borderColor: "#E8E9EB",
    borderWidth: 1,
  },
});
