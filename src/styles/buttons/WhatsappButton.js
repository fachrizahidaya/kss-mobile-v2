import { Linking, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../Color";

const WhatsappButton = ({ phone, size }) => {
  /**
   * Link to whatsapp from phone number handler
   */
  const handleWhatsappPress = () => {
    try {
      const whatsappUrl = `whatsapp://send?phone=+62${phone}`;
      Linking.openURL(whatsappUrl);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Pressable onPress={handleWhatsappPress}>
      <MaterialCommunityIcons name="whatsapp" size={size ? size : 10} color={Colors.iconDark} />
    </Pressable>
  );
};

export default WhatsappButton;
