import { Pressable, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../../styles/Card";
import { TextProps } from "../../../../styles/CustomStylings";

const CommentDetailItem = ({ description, handleOpen, item, employeeCommentValue, comment, index, length }) => {
  return (
    <Pressable
      style={[
        card.card,
        {
          marginTop: 14,
          marginBottom: index === length - 1 ? 14 : null,
          marginHorizontal: 16,
          gap: 10,
        },
      ]}
      onPress={() => {
        handleOpen(item, employeeCommentValue);
      }}
    >
      <Text style={[TextProps]}>{description}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <MaterialCommunityIcons name={"chart-bar"} size={15} style={{ opacity: 0.5 }} />

        <Text style={[TextProps]}>{comment}</Text>
      </View>
    </Pressable>
  );
};

export default CommentDetailItem;
