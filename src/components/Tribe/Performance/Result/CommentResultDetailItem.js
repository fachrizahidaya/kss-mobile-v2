import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../../styles/Card";
import { TextProps } from "../../../../styles/CustomStylings";

const CommentResultDetailItem = ({ id, type, total_comment, navigation }) => {
  return (
    <Pressable
      style={[card.card, styles.wrapper]}
      onPress={() => navigation.navigate("Comment Employee", { id: id, type: type })}
    >
      <View style={{ flexDirection: "column", gap: 10 }}>
        <Text style={[{ fontSize: 16, fontWeight: "700" }, TextProps]}>Comment</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[TextProps]}>Total Comments: </Text>
          <Text style={[TextProps]}>{total_comment?.length}</Text>
        </View>
      </View>
      <MaterialCommunityIcons name={"chevron-right"} size={20} style={{ opacity: 0.5 }} />
    </Pressable>
  );
};

export default CommentResultDetailItem;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
    marginBottom: 14,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
