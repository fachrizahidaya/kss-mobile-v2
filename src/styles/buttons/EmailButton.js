import { Linking, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../Color";

const EmailButton = ({ email, size }) => {
  /**
   * Link to email form from email address handler
   */
  const handleEmailPress = () => {
    try {
      const emailUrl = `mailto:${email}`;
      Linking.openURL(emailUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Pressable onPress={handleEmailPress}>
      <MaterialCommunityIcons name="email-outline" size={!size ? 10 : size} color={Colors.iconDark} />
    </Pressable>
  );
};

export default EmailButton;
