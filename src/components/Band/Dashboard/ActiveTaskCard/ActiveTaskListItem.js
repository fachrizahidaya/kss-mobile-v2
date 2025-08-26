import { memo } from "react";
import { useSelector } from "react-redux";

import { View, Text, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const ActiveTaskListItem = ({
  id,
  task,
  title,
  responsible,
  image,
  status,
  priority,
  onPress,
  onPressItem,
  index,
  length,
}) => {
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

  var renderPriority;

  if (priority === "Low") {
    renderPriority = Colors.primary;
  } else if (priority === "Medium") {
    renderPriority = "#FF965D";
  } else {
    renderPriority = "#FD7972";
  }

  var renderStatus;

  if (status === "Open") {
    renderStatus = "#49C96D";
  } else if (status === "Medium") {
    renderStatus = "#FFD240";
  } else {
    renderStatus = "#FF965D";
  }

  const handleCloseTask = () => {
    if (status === "Finish" && userSelector.id === task?.responsible_id) {
      onPress(task);
    } else {
      return null;
    }
  };

  const handleRedirectTask = () => onPressItem(id);

  return (
    <Pressable onPress={handleRedirectTask}>
      <View
        style={[
          styles.wrapper,
          {
            borderBottomColor: renderPriority,
            marginRight: index === length - 1 ? 14 : null,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Pressable onPress={handleCloseTask}>
            <MaterialCommunityIcons
              size={20}
              name={renderIcon()}
              color={
                status === "Open" || status === "On Progress"
                  ? Colors.iconGrey
                  : Colors.iconDark
              }
            />
          </Pressable>
          <Text
            style={[
              {
                textDecorationLine: status === "Closed" ? "line-through" : "none",
                width: 120,
              },
              TextProps,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        <Text style={{ color: renderStatus }}>{status}</Text>
        {responsible ? (
          <AvatarPlaceholder name={responsible} image={image} size="sm" />
        ) : null}
      </View>
    </Pressable>
  );
};

export default memo(ActiveTaskListItem);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 10,
    height: 100,
    borderBottomWidth: 5,
    backgroundColor: Colors.secondary,
    width: 200,
    gap: 6,
    marginLeft: 14,
  },
});
