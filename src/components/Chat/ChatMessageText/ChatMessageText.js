import { Text } from "react-native";
import { Colors } from "../../../styles/Color";

const ChatMessageText = ({ message, myMessage, mimeTypeInfo, renderMessage }) => {
  return (
    <>
      {message?.delete_for_everyone ? (
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            fontStyle: "italic",
            color: !myMessage ? Colors.fontDark : Colors.fontLight,
          }}
        >
          Message has been deleted
        </Text>
      ) : (
        renderMessage(mimeTypeInfo?.file_type)
      )}
    </>
  );
};

export default ChatMessageText;
