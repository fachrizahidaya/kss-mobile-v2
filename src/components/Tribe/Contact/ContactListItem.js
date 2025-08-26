import { Text, View, Dimensions } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import EmailButton from "../../../styles/buttons/EmailButton";
import PhoneButton from "../../../styles/buttons/PhoneButton";
import WhatsappButton from "../../../styles/buttons/WhatsappButton";
import PersonalNestButton from "../../../styles/buttons/PersonalNestButton";
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";
import styles from "../Clock/Contact.styles";

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const contentWidth = Dimensions.get("screen").width - 230;
=======
  const screenWidth = Dimensions.get("screen");
>>>>>>> 33ce77b1 (fix:)
=======
  const contentWidth = Dimensions.get("screen").width - 230;
>>>>>>> 859eea89 (first commit)
  const handleNavigateToNest = () => {
=======
  const contentWidth = Dimensions.get("screen").width - 230;
<<<<<<< HEAD
  const navigateToNestHandler = () => {
>>>>>>> 2075a560 (feat: new user)
=======
  const handleNavigateToNest = () => {
>>>>>>> 5ef7bde9 (fix: new user, contact list)
    navigation.navigate("Employee Profile", {
      employeeId: id,
      returnPage: "Contact",
      loggedEmployeeId: loggedEmployeeId,
    });
  };

  var renderBackgroundColor;
  if (leave_status === 1) {
    renderBackgroundColor = "FDC500";
  } else if (attendanceToday?.time_in) {
    renderBackgroundColor = "#3BC14A";
  } else {
    renderBackgroundColor = "#EDEDED";
  }

  const renderLeaveStatus =
    leave_status === 1 ? (
      <View style={styles.leaveStatus}>
        <MaterialCommunityIcons name="airplane" size={15} color={Colors.iconDark} />
      </View>
    ) : null;

  return (
    <CustomCard handlePress={handleNavigateToNest} index={index} length={length}>
      <View style={styles.content}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <View style={styles.itemWrapper}>
=======
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
>>>>>>> 33ce77b1 (fix:)
=======
        <View style={styles.wrapper}>
>>>>>>> 2075a560 (feat: new user)
=======
        <View style={styles.itemWrapper}>
>>>>>>> 394d1d73 (fix: hooks on)
=======
        <View style={styles.itemWrapper}>
>>>>>>> 859eea89 (first commit)
          <View style={{ position: "relative" }}>
            <AvatarPlaceholder image={image} name={name} size="md" isThumb={false} />

            <View
              style={[
                styles.attendanceStatus,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                { backgroundColor: renderBackgroundColor },
              ]}
            />

            {renderLeaveStatus}
          </View>
          <View style={{ width: contentWidth }}>
=======
                {
                  backgroundColor:
                    leave_status === 1
                      ? "FDC500"
                      : attendanceToday?.time_in
                      ? "#3bc14a"
                      : "#EDEDED",
                },
=======
                { backgroundColor: renderBackgroundColor },
>>>>>>> 859eea89 (first commit)
              ]}
            />

            {renderLeaveStatus}
          </View>
<<<<<<< HEAD
          <View style={{ width: screenWidth.width - 230 }}>
>>>>>>> 33ce77b1 (fix:)
=======
                { backgroundColor: renderBackgroundColor },
              ]}
            />

            {renderLeaveStatus}
          </View>
          <View style={{ width: contentWidth }}>
>>>>>>> 2075a560 (feat: new user)
=======
          <View style={{ width: contentWidth }}>
>>>>>>> 859eea89 (first commit)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <View style={styles.itemWrapper}>
=======
        <View style={styles.wrapper}>
>>>>>>> 2075a560 (feat: new user)
=======
        <View style={styles.itemWrapper}>
>>>>>>> 394d1d73 (fix: hooks on)
=======
        <View style={styles.itemWrapper}>
>>>>>>> 859eea89 (first commit)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

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
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
});
>>>>>>> 2075a560 (feat: new user)
=======
>>>>>>> 394d1d73 (fix: hooks on)
=======
>>>>>>> 859eea89 (first commit)
