import { Text } from "react-native";

const NotificationTimeStamp = ({ timestamp }) => {
  return <Text style={{ color: "#8A9099", fontWeight: 400, marginLeft: 42, marginVertical: 14 }}>{timestamp}</Text>;
};

export default NotificationTimeStamp;
