import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../../../../styles/CustomStylings";

const AdditionAndResponsibleSection = ({
  image,
  totalAttachments,
  totalChecklists,
  totalChecklistsDone,
  totalComments,
  responsible,
}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ flexDirection: "row", gap: 15 }}>
        {totalAttachments > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <MaterialCommunityIcons name="attachment" size={18} color="#3F434A" />
            <Text style={[{ fontSize: 16 }, TextProps]}>{totalAttachments || 0}</Text>
          </View>
        ) : null}

        {totalComments > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <MaterialCommunityIcons name="message-text-outline" size={18} color="#3F434A" />
            <Text style={[{ fontSize: 16 }, TextProps]}>{totalComments || 0}</Text>
          </View>
        ) : null}

        {totalChecklists > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <MaterialCommunityIcons name="checkbox-marked-outline" size={18} color="#3F434A" />
            <Text style={[{ fontSize: 16 }, TextProps]}>
              {totalChecklistsDone || 0} / {totalChecklists || 0}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {responsible ? <AvatarPlaceholder image={image} name={responsible} size="xs" /> : null}
      </View>
    </View>
  );
};

export default AdditionAndResponsibleSection;
