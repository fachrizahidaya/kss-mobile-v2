import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ChatReplyInfo from "./ChatReplyInfo";
import FileAttachmentBubble from "./FileAttachmentBubble";
import BandAttachmentBubble from "./BandAttachmentBubble";
import { Colors } from "../../../styles/Color";

const ChatBubbleItem = ({
  isDeleted,
  panGesture,
  rTaskContainerStyle,
  isOptimistic,
  myMessage,
  chat,
  type,
  name,
  reply_to,
  userSelector,
  memberName,
  content,
  allWords,
  file_name,
  file_path,
  imgTypes,
  formatMimeType,
  file_type,
  onToggleFullScreen,
  band_attachment_id,
  band_attachment_title,
  band_attachment_no,
  band_attachment_type,
  styledTexts,
  time,
  file_size,
  mimeTyeInfo,
  setMimeTypeInfo,
  getFileExt,
  extension,
  onDownload,
  onRedirect,
  renderMessage,
  longPressHandler,
}) => {
  const handleLongPress = () => {
    longPressHandler(chat, !myMessage ? "right" : "left");
  };

  const handleFullScreen = () => {
    if (file_path) {
      onToggleFullScreen(file_path);
    }
  };

  const renderChatAttachment = () => {
    return (
      !isDeleted && (
        <>
          {reply_to && (
            <ChatReplyInfo
              message={reply_to}
              chatBubbleView={true}
              myMessage={myMessage}
              type={type}
              loggedInUser={userSelector}
              memberName={memberName}
              content={content}
              allWord={allWords}
              mimeTypeInfo={mimeTyeInfo}
              setMimeTypeInfo={setMimeTypeInfo}
              renderMessage={renderMessage}
            />
          )}
          {file_path && (
            <>
              {imgTypes.includes(formatMimeType(file_type)) && (
                <>
                  <Pressable style={{ borderRadius: 5 }} onPress={handleFullScreen}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: isOptimistic
                          ? file_path
                          : `${process.env.EXPO_PUBLIC_API}/image/${file_path}`,
                      }}
                      alt="Chat Image"
                      resizeMethod="auto"
                    />
                  </Pressable>
                </>
              )}
              {
                <FileAttachmentBubble
                  file_type={file_type}
                  file_name={file_name}
                  file_path={file_path}
                  file_size={file_size}
                  myMessage={myMessage}
                  getFileExt={getFileExt}
                  extension={extension}
                  onDownload={onDownload}
                />
              }
            </>
          )}
          {band_attachment_id && (
            <BandAttachmentBubble
              id={band_attachment_id}
              title={band_attachment_title}
              number_id={band_attachment_no}
              type={band_attachment_type}
              myMessage={myMessage}
              onRedirect={onRedirect}
            />
          )}
        </>
      )
    );
  };

  const renderChatContent = () => {
    if (!isDeleted) {
      return (
        <Text
          style={{
            flexShrink: 1,
            fontSize: 14,
            fontWeight: "400",
            color: !myMessage ? Colors.iconDark : Colors.iconLight,
          }}
        >
          {styledTexts}
        </Text>
      );
    } else if (myMessage && isDeleted) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
          <MaterialIcons
            name="block-flipped"
            size={15}
            color={Colors.iconGrey}
            style={{ opacity: 0.5 }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              fontStyle: "italic",
              color: "#F1F1F1",
              opacity: 0.5,
            }}
          >
            You deleted this message
          </Text>
        </View>
      );
    } else if (!myMessage && isDeleted) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
          <MaterialIcons
            name="block-flipped"
            size={15}
            color={Colors.iconDark}
            style={{ opacity: 0.5 }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              fontStyle: "italic",
              color: Colors.iconDark,
              opacity: 0.5,
            }}
          >
            This message was deleted
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <PanGestureHandler
      failOffsetY={[-5, 5]}
      activeOffsetX={[-5, 5]}
      onGestureEvent={!isDeleted && panGesture}
    >
      <Animated.View style={[rTaskContainerStyle]}>
        <Pressable
          style={[
            styles.wrapper,
            {
              backgroundColor: isOptimistic
                ? "#9E9E9E"
                : !myMessage
                ? Colors.iconLight
                : Colors.primary,
            },
          ]}
          onLongPress={handleLongPress}
          delayLongPress={200}
        >
          {type === "group" && name && !myMessage && (
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: !myMessage ? Colors.primary : Colors.iconLight,
              }}
            >
              {name}
            </Text>
          )}
          {renderChatAttachment()}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            {renderChatContent()}
            <Text
              style={{
                fontSize: 8,
                color: !myMessage ? Colors.fontGrey : Colors.iconLight,
                alignSelf: "flex-end",
              }}
            >
              {time}
            </Text>
          </View>
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ChatBubbleItem;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    maxWidth: 300,
    borderRadius: 10,
    padding: 8,
    gap: 5,
  },
  image: {
    flex: 1,
    width: 280,
    height: 350,
    resizeMode: "cover",
    backgroundColor: Colors.backgroundLight,
  },
});
