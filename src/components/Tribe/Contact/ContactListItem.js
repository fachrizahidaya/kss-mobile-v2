import { Text, View, StyleSheet, Dimensions } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import EmailButton from "../../../styles/buttons/EmailButton";
import PhoneButton from "../../../styles/buttons/PhoneButton";
import WhatsappButton from "../../../styles/buttons/WhatsappButton";
import PersonalNestButton from "../../../styles/buttons/PersonalNestButton";
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";

const ContactListItem = ({
  id,
  index,
  length,
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
  const handleNavigateToNest = () => {
    navigation.navigate("Employee Profile", {
      employeeId: id,
      returnPage: "Contact",
      loggedEmployeeId: loggedEmployeeId,
    });
  };

  return (
    <CustomCard handlePress={handleNavigateToNest} index={index} length={length}>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <View style={{ position: "relative" }}>
            <AvatarPlaceholder image={image} name={name} size="md" isThumb={false} />

            <View
              style={[
                styles.attendanceStatus,
                {
                  backgroundColor:
                    leave_status === 1
                      ? "FDC500"
                      : attendanceToday?.time_in
                      ? "#3bc14a"
                      : "#EDEDED",
                },
              ]}
            />

            {leave_status === 1 ? (
              <View style={styles.leaveStatus}>
                <MaterialCommunityIcons
                  name="airplane"
                  size={15}
                  color={Colors.iconDark}
                />
              </View>
            ) : null}
          </View>
          <View style={{ width: screenWidth.width - 230 }}>
            <Text
              style={[TextProps, { overflow: "hidden", fontWeight: "500" }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
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
          {user ? (
            <PersonalNestButton
              email={email}
              user_id={user_id}
              user_name={user_name}
              user_type={user_type}
              user_image={user_image}
              room_id={room_id}
            />
          ) : null}
        </View>
      </View>
    </CustomCard>
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
    backgroundColor: Colors.secondary,
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
});
