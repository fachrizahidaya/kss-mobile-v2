import { View, Text, StyleSheet, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ContactAction = ({
  type,
  active_member,
  handleToggleClearChatMessage,
  handleToggleExitModal,
  handleToggleDeleteGroupModal,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: Colors.secondary }]}>
      <View style={[styles.content, { backgroundColor: Colors.backgroundLight }]}>
        <Pressable style={[styles.wrapper]} onPress={handleToggleClearChatMessage}>
          <Text style={{ fontSize: 14, fontWeight: "400", color: Colors.danger }}>Clear Messages</Text>
          <MaterialCommunityIcons name="close-circle-outline" size={15} color={Colors.danger} />
        </Pressable>

        {type === "group" && active_member === 1 && (
          <Pressable style={[styles.wrapper, { borderTopWidth: 1 }]} onPress={handleToggleExitModal}>
            <Text style={[{ fontSize: 14 }, TextProps]}>Exit Group</Text>
            <MaterialCommunityIcons
              name={type === "personal" ? "not-interested" : "exit-to-app"}
              size={15}
              color={Colors.iconDark}
            />
          </Pressable>
        )}
        {type === "group" && active_member === 0 && (
          <Pressable style={[styles.wrapper, , { borderTopWidth: 1 }]} onPress={handleToggleDeleteGroupModal}>
            <Text style={{ fontSize: 14, fontWeight: "400", color: Colors.danger }}>Delete Group</Text>
            <MaterialCommunityIcons
              name={type === "personal" ? "not-interested" : "trash-can-outline"}
              size={15}
              color={Colors.danger}
            />
          </Pressable>
        )}

        {/* <Pressable
          style={{ ...styles.wrapper, borderTopWidth: 1, borderTopColor: "#fafafa" }}
          onPress={null}
        >
          <Text fontSize={14} fontWeight={400}>
            Report {name.length > 30 ? name.split(" ")[0] : name}
          </Text>
        </Pressable> */}
      </View>
    </View>
  );
};

export default ContactAction;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 10,
    gap: 5,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopColor: Colors.borderGrey,
  },
  content: {
    borderRadius: 10,
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 5,
  },
});
