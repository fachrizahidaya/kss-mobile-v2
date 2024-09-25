import { View, Text, Pressable, StyleSheet } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";

const UserListItem = ({
  user,
  id,
  roomId,
  image,
  name,
  userType,
  onPressAddHandler,
  onPressRemoveHandler,
  selectedUsers,
  multiSelect,
  email,
  type,
  active_member,
  navigation,
  userSelector,
  position,
  attendanceToday,
  index,
  length,
}) => {
  return (
    userSelector.id !== id && (
      <Pressable
        style={{ marginHorizontal: 16, marginTop: 14, marginBottom: index === length - 1 ? 14 : null }}
        onPress={() => {
          if (multiSelect) {
            // If user already inside array, remove onpress
            if (selectedUsers.find((val) => val.id === id)) {
              onPressRemoveHandler(user);
            } else {
              // If user not inside array, add onpress
              onPressAddHandler(user);
            }
          } else {
            navigation.navigate("Chat Room", {
              name: name,
              userId: id,
              roomId: roomId,
              image: image,
              position: userType,
              email: email,
              type: type,
              active_member: active_member,
              forwardedMessage: null,
            });
          }
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <View style={{ position: "relative" }}>
              {type === "personal" ? (
                <View
                  style={[
                    styles.attendanceStatus,
                    { backgroundColor: attendanceToday?.time_in ? "#3bc14a" : "#EDEDED" },
                  ]}
                ></View>
              ) : null}
              <AvatarPlaceholder image={image} name={name} size="md" />
            </View>
            <View>
              <Text style={[{ fontSize: 12 }, TextProps]}>{name}</Text>
              <Text style={[{ fontSize: 12, opacity: 0.5 }, TextProps]}>{position}</Text>
            </View>
          </View>

          {multiSelect && (
            <View>
              {selectedUsers.find((val) => val.id === id) && (
                <MaterialCommunityIcons name="checkbox-marked" size={20} color="#176688" />
              )}
            </View>
          )}
        </View>
      </Pressable>
    )
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  attendanceStatus: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 15,
    height: 15,
    position: "absolute",
    top: 0,
    right: -3,
    zIndex: 2,
    shadowOffset: 0,
  },
});
