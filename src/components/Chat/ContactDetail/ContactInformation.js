import { memo } from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ContactInformation = ({
  type,
  selectedGroupMembers,
  loggedInUser,
  handleToggleMemberList,
  handleToggleMemberListAction,
  currentUserIsAdmin,
  setMemberId,
  setMemberName,
  setMemberAdminStatus,
}) => {
  const handleGroupParticipantOption = (member) => {
    if (currentUserIsAdmin && loggedInUser !== member?.user_id) {
      handleToggleMemberListAction();
    }
    setMemberId(member?.id);
    setMemberName(member?.user?.name);
    setMemberAdminStatus(member?.is_admin);
  };

  return type === "personal" ? (
    <View style={styles.personalContainer}>
      <Text style={[{ fontSize: 14 }, TextProps]}>Active</Text>
    </View>
  ) : (
    <View style={styles.groupContainer}>
      <Text style={[{ fontSize: 12, opacity: 0.5 }, TextProps]}>Group Participant</Text>

      <ScrollView style={{ minHeight: type === 100, maxHeight: 300 }}>
        <View style={styles.wrapper}>
          {selectedGroupMembers.map((member, index) => {
            return (
              <Pressable key={index} onPress={() => handleGroupParticipantOption(member)}>
                <View style={{ borderRadius: 15, backgroundColor: "#ededed", padding: 5 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <AvatarPlaceholder
                      name={!member?.user ? member?.name : member?.user?.name}
                      image={!member?.user ? member?.image : member?.user?.image}
                      size="xs"
                    />
                    <Text style={[{ fontSize: 12 }, TextProps]}>
                      {!member?.user
                        ? loggedInUser === member?.id
                          ? "You"
                          : member?.name
                        : loggedInUser === member?.user?.id
                        ? "You"
                        : member?.user?.name}
                    </Text>
                    {member?.is_admin === 1 && (
                      <View style={{ borderRadius: 10, padding: 5, backgroundColor: "#186688" }}>
                        <Text style={{ fontSize: 12, color: Colors.fontLight }}>Admin</Text>
                      </View>
                    )}
                    {currentUserIsAdmin && loggedInUser !== member?.user_id && (
                      <MaterialIcons name="chevron-right" color="#3F434A" />
                    )}
                  </View>
                </View>
              </Pressable>
            );
          })}
          {currentUserIsAdmin && (
            <View style={{ borderRadius: 20 }}>
              <MaterialIcons name="add" size={20} onPress={handleToggleMemberList} color="#3F434A" />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(ContactInformation);

const styles = StyleSheet.create({
  personalContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 5,
  },
  groupContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 5,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
  },
});
