import { Text, View, ActivityIndicator } from "react-native";

import Button from "../forms/Button";
import { TextProps } from "../CustomStylings";
import CustomModal from "./CustomModal";
import { Colors } from "../Color";

const RemoveConfirmationModal = ({
  isOpen,
  toggle,
  onPress,
  description,
  isLoading,
  success,
  setSuccess,
  toggleOtherModal,
}) => {
  const handleAfterModalHide = () => {
    if (success) {
      toggleOtherModal();
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      if (setSuccess) {
        setSuccess(false);
      }
      toggle();
    }
  };

  const handleConfirm = () => {
    if (setSuccess) {
      setSuccess(true);
    }
    onPress();
  };

  return (
    <CustomModal isOpen={isOpen} toggle={toggle} handleAfterModalHide={handleAfterModalHide}>
      <View style={{ alignItems: "center" }}>
        <Text style={[TextProps]}>{description}</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5 }}>
        <Button onPress={handleCancel} variant="outline" flex={1} padding={10}>
          <Text style={TextProps}>Cancel</Text>
        </Button>
        <Button flex={1} disabled={isLoading} backgroundColor={Colors.danger} onPress={handleConfirm} padding={10}>
          {isLoading ? <ActivityIndicator /> : <Text style={[TextProps, { color: Colors.fontLight }]}>Confirm</Text>}
        </Button>
      </View>
    </CustomModal>
  );
};

export default RemoveConfirmationModal;
