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
            borderBottomColor:
              priority === "Low"
                ? "#49C96D"
                : priority === "Medium"
                ? "#FF965D"
                : "#FD7972",
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
                textDecorationLine:
                  status === "Closed" ? "line-through" : "none",
                width: 120,
              },
              TextProps,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        <Text
          style={{
            color:
              status === "Open"
                ? Colors.primary
                : status === "Medium"
                ? "#FFD240"
                : "#FF965D",
          }}
        >
          {status}
        </Text>
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
