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
  const contentWidth = Dimensions.get("screen").width - 230;
=======
  const screenWidth = Dimensions.get("screen");
>>>>>>> 33ce77b1 (fix:)
  const handleNavigateToNest = () => {
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
          <View style={{ position: "relative" }}>
            <AvatarPlaceholder image={image} name={name} size="md" isThumb={false} />

            <View
              style={[
                styles.attendanceStatus,
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
>>>>>>> 33ce77b1 (fix:)
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
        <View style={styles.itemWrapper}>
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
