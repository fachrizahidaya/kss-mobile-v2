import { Text, View, ActivityIndicator } from "react-native";

import Button from "../forms/Button";
import { TextProps } from "../CustomStylings";
import CustomModal from "./CustomModal";
import { Colors } from "../Color";
import FormButton from "../buttons/FormButton";

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
        <Button onPress={handleCancel} variant="outline" flex={1}>
          <Text style={TextProps}>Cancel</Text>
        </Button>
        <FormButton
          flex={1}
          disabled={isLoading}
          backgroundColor={Colors.danger}
          onPress={handleConfirm}
          isSubmitting={isLoading}
        >
          <Text style={[{ color: Colors.fontLight }]}>Confirm</Text>
        </FormButton>
      </View>
    </CustomModal>
  );
};

export default RemoveConfirmationModal;
