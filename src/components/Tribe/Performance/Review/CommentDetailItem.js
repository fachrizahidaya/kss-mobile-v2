import { Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../styles/CustomStylings";
import CustomCard from "../../../../layouts/CustomCard";

const CommentDetailItem = ({ description, handleOpen, item, employeeCommentValue, comment, index, length }) => {
  return (
    <CustomCard index={index} length={length} gap={10} handlePress={() => handleOpen(item, employeeCommentValue)}>
      <Text style={[TextProps]}>{description}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <MaterialCommunityIcons name={"chart-bar"} size={15} style={{ opacity: 0.5 }} />

        <Text style={[TextProps]}>{comment}</Text>
      </View>
    </CustomCard>
  );
};

export default CommentDetailItem;
