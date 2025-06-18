import { Platform, Text, View } from "react-native";

import Button from "../../../styles/forms/Button";
import CustomModal from "../../../styles/modals/CustomModal";
import { Colors } from "../../../styles/Color";
import FormButton from "../../../styles/buttons/FormButton";
import { TextProps } from "../../../styles/CustomStylings";

const ChatMessageDeleteModal = ({
  id,
  myMessage,
  deleteModalChatIsOpen,
  handleToggleDeleteModalChat,
  handleDeleteMessage,
  isLoading,
  isDeleted,
  setDeleteSelected,
  type,
  toggleLoading,
  toggleModal,
  toggleAlert,
  setRequest,
  setError,
}) => {
  const handleWhenBackdropPress = () => {
    if (Platform.OS === "android") {
      handleToggleDeleteModalChat();
    } else {
      handleToggleDeleteModalChat();
      setDeleteSelected(false);
    }
  };

  const handleDeleteForMe = async () => {
    await handleDeleteMessage(
      id,
      "me",
      type,
      toggleLoading,
      toggleModal,
      toggleAlert,
      setRequest,
      setError
    );
  };

  const handleDeleteForEveryone = async () => {
    await handleDeleteMessage(
      id,
      "everyone",
      type,
      toggleLoading,
      toggleModal,
      toggleAlert,
      setRequest,
      setError
    );
  };

  return (
    <CustomModal
      isOpen={deleteModalChatIsOpen}
      toggle={handleWhenBackdropPress}
      hideModalContentWhileAnimating={true}
    >
      <Text style={[TextProps, { fontWeight: "500" }]}>Delete message?</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Button variant="outline" onPress={handleToggleDeleteModalChat}>
          <Text style={[TextProps]}>Cancel</Text>
        </Button>

        <FormButton
          disabled={isLoading}
          onPress={handleDeleteForMe}
          isSubmitting={isLoading}
          backgroundColor={Colors.danger}
        >
          <Text style={[TextProps, { color: Colors.fontLight }]}>Delete for Me</Text>
        </FormButton>

        {myMessage && !isDeleted && (
          <FormButton
            disabled={isLoading}
            onPress={handleDeleteForEveryone}
            isSubmitting={isLoading}
            backgroundColor={Colors.danger}
          >
            <Text style={[TextProps, { color: Colors.fontLight }]}>
              Delete for Everyone
            </Text>
          </FormButton>
        )}
      </View>
    </CustomModal>
  );
};

export default ChatMessageDeleteModal;
