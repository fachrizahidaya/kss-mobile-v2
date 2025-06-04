import { View, Text } from "react-native";

import Button from "../forms/Button";
import { TextProps } from "../CustomStylings";
import CustomModal from "./CustomModal";
import { Colors } from "../Color";

const ReturnConfirmationModal = ({ isOpen, toggle, onPress, description }) => {
  return (
    <CustomModal isOpen={isOpen} toggle={toggle}>
      <Text style={[TextProps, { textAlign: "center" }]}>{description}</Text>

      <View style={{ flexDirection: "row", gap: 5 }}>
        <Button onPress={toggle} flex={1} variant="outline">
          <Text style={TextProps}>Cancel</Text>
        </Button>

        <Button backgroundColor={Colors.danger} onPress={onPress} flex={1}>
          <Text style={[{ color: Colors.fontLight }]}>Confirm</Text>
        </Button>
      </View>
    </CustomModal>
  );
};

export default ReturnConfirmationModal;
