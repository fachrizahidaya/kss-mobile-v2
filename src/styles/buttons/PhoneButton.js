import { Linking, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../Color";

const PhoneButton = ({ phone, size }) => {
  /**
   * Link to Caller from phone number handler
   */
  const handleCallPress = () => {
    try {
      const phoneUrl = `tel:${phone}`;
      Linking.openURL(phoneUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Pressable onPress={handleCallPress}>
      <MaterialCommunityIcons name="phone-outline" size={!size ? 10 : size} color={Colors.iconDark} />
    </Pressable>
  );
};

export default PhoneButton;
