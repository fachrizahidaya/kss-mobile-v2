import { Pressable, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../../../styles/CustomStylings";

const CheckListItem = ({ id, title, status, onPress, onPressDelete, disabled }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <TouchableOpacity disabled={disabled} onPress={() => onPress(id, status)}>
          <MaterialCommunityIcons
            name={status === "Open" ? "checkbox-blank-circle-outline" : "checkbox-marked-circle-outline"}
            color={status === "Finish" ? "#176688" : "#3F434A"}
            size={20}
          />
        </TouchableOpacity>

        <Text style={[{ textDecorationLine: status === "Finish" ? "line-through" : "none" }, TextProps]}>{title}</Text>
      </View>

      {!disabled ? (
        <Pressable disabled={disabled} onPress={() => onPressDelete(id)}>
          <MaterialCommunityIcons name="delete-outline" size={20} color="#3F434A" />
        </Pressable>
      ) : null}
    </View>
  );
};

export default CheckListItem;
