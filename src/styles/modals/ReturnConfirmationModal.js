import { View, Text } from "react-native";

import Button from "../forms/Button";
import { TextProps } from "../CustomStylings";
import CustomModal from "./CustomModal";

const ReturnConfirmationModal = ({ isOpen, toggle, onPress, description }) => {
  return (
    <CustomModal isOpen={isOpen} toggle={toggle}>
      <View style={{ alignItems: "center" }}>
        <Text style={[TextProps]}>{description}</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5 }}>
        <Button onPress={toggle} flex={1} padding={10} variant="outline" backgroundColor="#FD7972">
          <Text style={TextProps}>Cancel</Text>
        </Button>

        <Button backgroundColor="#E53935" onPress={onPress} flex={1} padding={10}>
          <Text style={[TextProps, { color: "#FFFFFF" }]}>Confirm</Text>
        </Button>
      </View>
    </CustomModal>
  );
};

export default ReturnConfirmationModal;
