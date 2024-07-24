import { memo } from "react";
import { useSelector } from "react-redux";

import { TouchableOpacity, View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../../styles/CustomStylings";

const ActiveTaskList = ({ id, task, title, responsible, image, status, priority, onPress, onPressItem }) => {
  const userSelector = useSelector((state) => state.auth);

  const renderIcon = () => {
    if (status === "Closed") {
      return "checkbox-outline";
    } else if (status === "Finish") {
      return "checkbox-blank-outline";
    } else {
      return "checkbox-blank";
    }
  };

  return (
    <TouchableOpacity onPress={() => onPressItem(id)}>
      <View
        style={{
          borderRadius: 10,
          padding: 10,
          height: 100,
          borderBottomWidth: 5,
          borderColor: priority === "Low" ? "#49c96d" : priority === "Medium" ? "#ff965d" : "#fd7972",
          backgroundColor: "#FFFFFF",
          // shadowColor: "rgba(0, 0, 0, 0.3)",
          // shadowOffset: { width: 0, height: 4 },
          // shadowOpacity: 0.8,
          // shadowRadius: 4,
          // elevation: 4,
          marginRight: 10,
          width: 200,
          gap: 6,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Pressable
            onPress={() => {
              status === "Finish" && userSelector.id === task?.responsible_id ? onPress(task) : null;
            }}
          >
            <MaterialCommunityIcons
              size={20}
              name={renderIcon()}
              color={status === "Open" || status === "On Progress" ? "#E8E9EB" : "#3F434A"}
            />
          </Pressable>
          <Text
            style={[{ textDecorationLine: status === "Closed" ? "line-through" : "none", width: 120 }, TextProps]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        <Text
          style={{
            color: status === "Open" ? "#176688" : status === "Medium" ? "#FFD240" : "#FF965D",
          }}
        >
          {status}
        </Text>
        {responsible ? <AvatarPlaceholder name={responsible} image={image} size="sm" /> : null}
      </View>
    </TouchableOpacity>
  );
};

export default memo(ActiveTaskList);
