import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";

const ActivityListItem = ({ message, name, date }) => {
  return (
    <Pressable style={[card.card, styles.content]}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[TextProps]}>{name}</Text>
        <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%" }]}>{date}</Text>
      </View>

      <Text style={[TextProps]}>{message}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  content: {
    marginVertical: 4,
    marginHorizontal: 14,
    justifyContent: "space-between",
    gap: 8,
  },
});

export default ActivityListItem;
