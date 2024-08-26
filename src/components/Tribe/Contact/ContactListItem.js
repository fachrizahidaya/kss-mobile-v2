import { TouchableOpacity, Text, View, StyleSheet, Platform, Pressable, Dimensions } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { card } from "../../../styles/Card";
import EmailButton from "../../../styles/EmailButton";
import PhoneButton from "../../../styles/PhoneButton";
import WhatsappButton from "../../../styles/WhatsappButton";
import PersonalNestButton from "../../../styles/PersonalNestButton";

const ContactListItem = ({
  id,
  name,
  position,
  image,
  phone,
  email,
  loggedEmployeeId,
  user,
  user_id,
  user_name,
  user_type,
  user_image,
  room_id,
  navigation,
  leave_status,
  attendanceToday,
}) => {
  const screenWidth = Dimensions.get("screen");
  const navigateToNestHandler = () => {
    navigation.navigate("Employee Profile", {
      employeeId: id,
      returnPage: "Contact",
      loggedEmployeeId: loggedEmployeeId,
    });
  };

  return (
    <Pressable onPress={navigateToNestHandler} style={[card.card, { marginVertical: 4, marginHorizontal: 14 }]}>
      <View style={styles.content}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <View style={{ position: "relative" }}>
            <AvatarPlaceholder image={image} name={name} size="md" isThumb={false} />

            <View
              style={[
                styles.attendanceStatus,
                { backgroundColor: leave_status === 1 ? "FDC500" : attendanceToday?.time_in ? "#3bc14a" : "#EDEDED" },
              ]}
            ></View>

            {leave_status === 1 && (
              <View style={styles.leaveStatus}>
                <MaterialCommunityIcons name="airplane" size={15} color="#3F434A" />
              </View>
            )}
          </View>
          <View style={{ width: screenWidth.width - 230 }}>
            <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>

            <Text style={styles.positionText} numberOfLines={1} ellipsizeMode="tail">
              {position}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <WhatsappButton phone={phone} size={20} />
          <EmailButton email={email} size={20} />
          <PhoneButton phone={phone} size={20} />
          {user && (
            <PersonalNestButton
              email={email}
              user_id={user_id}
              user_name={user_name}
              user_type={user_type}
              user_image={user_image}
              room_id={room_id}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leaveStatus: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 20,
    height: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 2,
    shadowOffset: 0,
  },
  attendanceStatus: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 15,
    height: 15,
    position: "absolute",
    top: -2,
    right: -2,
    zIndex: 2,
    shadowOffset: 0,
  },
  positionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#20A144",
    width: 140,
    overflow: "hidden",
  },
  nameText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3F434A",
    overflow: "hidden",
  },
});
