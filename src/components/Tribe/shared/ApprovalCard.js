import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../../../styles/Color";

const ApprovalCard = ({
  children,
  index,
  length,
  navigation,
  forSick,
  date,
  kind,
}) => {
  const handlePress = () => {
    if (kind === "Leave Request") {
      navigation.navigate("Leave Requests");
    } else {
      return null;
    }
  };
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
      onPress={handlePress}
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
    height: 100,
    gap: 8,
    width: 250,
  },
});
