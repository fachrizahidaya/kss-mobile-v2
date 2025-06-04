import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../../../styles/Color";

const ApprovalCard = ({
  children,
  index,
  length,
  navigation,
  forSick,
  date,
<<<<<<< HEAD
<<<<<<< HEAD
  kind,
  loggedInEmployee,
  approvalCreator,
  handleSelectApproval,
  id,
}) => {
  const handlePress = () => {
    if (kind == "Leave Request" && loggedInEmployee === approvalCreator) {
      navigation.navigate("Leave Requests");
    } else if (kind == "Leave Request" && loggedInEmployee !== approvalCreator) {
      navigation.navigate("Team Leave Request");
    } else {
      handleSelectApproval(id);
    }
  };

=======
}) => {
>>>>>>> 27c0a3f5 (feat: pending approval)
=======
  kind,
  loggedInEmployee,
  approvalCreator,
}) => {
  const handlePress = () => {
    if (kind == "Leave Request" && loggedInEmployee === approvalCreator) {
      navigation.navigate("Leave Requests");
    } else if (kind == "Leave Request" && loggedInEmployee !== approvalCreator) {
      navigation.navigate("Team Leave Request");
    } else {
      return null;
    }
  };
<<<<<<< HEAD
>>>>>>> 8d10428a (fix: pending approval)
=======

>>>>>>> f2850a25 (fix: pending approval, add section task)
  return (
    <Pressable
      style={[
        styles.wrapper,
        {
          marginLeft: 16,
          marginRight: index === length - 1 ? 16 : null,
          backgroundColor: !forSick ? Colors.secondary : "#EDEDED",
        },
      ]}
<<<<<<< HEAD
<<<<<<< HEAD
      onPress={handlePress}
=======
      //   onPress={() => navigation.navigate("Attendance Screen", { unattendance: date })}
>>>>>>> 27c0a3f5 (feat: pending approval)
=======
      onPress={handlePress}
>>>>>>> 8d10428a (fix: pending approval)
    >
      {children}
    </Pressable>
  );
};

export default ApprovalCard;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 10,
<<<<<<< HEAD
<<<<<<< HEAD
    height: 100,
    gap: 8,
=======
    height: 80,
    gap: 12,
>>>>>>> 27c0a3f5 (feat: pending approval)
=======
    height: 100,
    gap: 8,
>>>>>>> 8d10428a (fix: pending approval)
    width: 250,
  },
});
