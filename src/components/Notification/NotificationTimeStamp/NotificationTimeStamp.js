import { Text } from "react-native";
import { Colors } from "../../../styles/Color";

const NotificationTimeStamp = ({ timestamp }) => {
  return (
    <Text style={{ color: Colors.fontGrey, fontWeight: 400, marginLeft: 42, marginVertical: 14 }}>{timestamp}</Text>
  );
};

export default NotificationTimeStamp;
