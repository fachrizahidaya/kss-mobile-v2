import { Platform, Text, View, ActivityIndicator } from "react-native";

import Button from "../../../styles/forms/Button";
import CustomModal from "../../../styles/modals/CustomModal";

const ChatMessageDeleteModal = ({
  id,
  myMessage,
  deleteModalChatIsOpen,
  handleToggleDeleteModalChat,
  handleDeleteMessage,
  isLoading,
  isDeleted,
  setDeleteSelected,
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
    await handleDeleteMessage(id, "me");
  };

  const handleDeleteForEveryone = async () => {
    await handleDeleteMessage(id, "everyone");
  };

  return (
    <CustomModal isOpen={deleteModalChatIsOpen} toggle={handleWhenBackdropPress} hideModalContentWhileAnimating={true}>
      <View>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Delete message?</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 5 }}>
        <Button padding={10} variant="outline" onPress={handleToggleDeleteModalChat}>
          <Text style={{ fontSize: 12, fontWeight: "400", color: "#377893" }}>Cancel</Text>
        </Button>

        <Button padding={10} disabled={isLoading} variant="outline" onPress={handleDeleteForMe}>
          <Text style={{ fontSize: 12, fontWeight: "400", color: "#377893" }}>
            {isLoading ? <ActivityIndicator /> : "Delete for Me"}
          </Text>
        </Button>

        {myMessage && !isDeleted && (
          <Button padding={10} disabled={isLoading} variant="outline" onPress={handleDeleteForEveryone}>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#377893" }}>
              {isLoading ? <ActivityIndicator /> : "Delete for Everyone"}
            </Text>
          </Button>
        )}
      </View>
    </CustomModal>
  );
};

export default ChatMessageDeleteModal;
