import { useCallback, memo } from "react";
import dayjs from "dayjs";

import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, View } from "react-native";

import ChatBubble from "../ChatBubble/ChatBubble";
import ChatMessageTimeStamp from "../ChatMessageTimeStamp/ChatMessageTimeStamp";
import ImageAttachment from "../Attachment/ImageAttachment";
import FileAttachment from "../Attachment/FileAttachment";
import ProjectTaskAttachmentPreview from "../Attachment/ProjectTaskAttachmentPreview";
import { Colors } from "../../../styles/Color";

const ChatList = ({
  type,
  chatList,
  handleFetchChatMessage,
  isLoading,
  handleOpenChatBubble,
  onToggleFullScreen,
  fileAttachment,
  setFileAttachment,
  bandAttachment,
  bandAttachmentType,
  setBandAttachment,
  onSwipeToReply,
  memberName,
  userSelector,
  navigation,
  filteredSearch,
  hasBeenScrolled,
  setHasBeenScrolled,
}) => {
  /**
   * Decide when username should be rendered at
   */
  const userNameRenderCheck = useCallback(
    (prevMessage, currentMessage) => {
      const prevMessageDate = dayjs(prevMessage?.created_at).format("YYYY-MM-DD");
      const currentMessageDate = dayjs(currentMessage?.created_at).format("YYYY-MM-DD");

      if (prevMessage) {
        if (prevMessage?.from_user_id !== currentMessage?.from_user_id) {
          return currentMessage?.user?.name;
        } else {
          if (dayjs(prevMessageDate).isBefore(dayjs(currentMessageDate))) {
            return currentMessage?.user?.name;
          }
          return;
        }
      } else {
        return currentMessage?.user?.name;
      }
    },
    [chatList]
  );

  /**
   * Decide when messages should be grouped closer together or not
   */
  const messageIsGrouped = useCallback(
    (currentMessage, nextMessage) => {
      const currentMessageDate = dayjs(currentMessage?.created_at).format("YYYY-MM-DD");
      const nextMessageDate = dayjs(nextMessage?.created_at).format("YYYY-MM-DD");

      if (
        nextMessage &&
        currentMessage?.from_user_id == nextMessage?.from_user_id &&
        dayjs(currentMessageDate).isSame(dayjs(nextMessageDate))
      ) {
        return true;
      } else {
        return false;
      }
    },
    [chatList]
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundLight }}>
      <FlashList
        showsVerticalScrollIndicator={true}
        inverted
        ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
        keyExtractor={(item, index) => index}
        onScrollBeginDrag={() => setHasBeenScrolled(true)}
        onEndReached={() => hasBeenScrolled && handleFetchChatMessage()}
        onEndReachedThreshold={0.1}
        estimatedItemSize={35}
        data={chatList.length ? chatList : filteredSearch}
        renderItem={({ item, index }) => (
          <>
            {chatList[index + 1] ? (
              !dayjs(item?.created_at).isSame(
                dayjs(chatList[index + 1]?.created_at),
                "date"
              ) ? (
                <>
                  <ChatMessageTimeStamp
                    key={`${item?.id}_${index}_timestamp-group`}
                    timestamp={item?.created_at}
                  />
                </>
              ) : (
                ""
              )
            ) : (
              <ChatMessageTimeStamp
                key={`${item?.id}_${index}_timestamp-group`}
                timestamp={item?.created_at}
              />
            )}
            <ChatBubble
              chat={item}
              fromUserId={item?.from_user_id}
              content={item?.message}
              time={item?.created_time}
              file_path={item?.file_path}
              file_name={item?.file_name}
              file_type={item?.mime_type}
              file_size={item?.file_size}
              band_attachment_id={item?.project_id ? item?.project_id : item?.task_id}
              band_attachment_no={item?.project_no ? item?.project_no : item?.task_no}
              band_attachment_type={item?.project_id ? "Project" : "Task"}
              band_attachment_title={
                item?.project_title ? item?.project_title : item?.task_title
              }
              reply_to={item?.reply_to}
              isDeleted={item?.delete_for_everyone}
              type={type}
              onToggleFullScreen={onToggleFullScreen}
              name={userNameRenderCheck(chatList[index + 1], item)}
              isGrouped={messageIsGrouped(item, chatList[index - 1])}
              handleOpenChatBubble={handleOpenChatBubble}
              onSwipe={onSwipeToReply}
              isOptimistic={item?.type}
              memberName={memberName}
              userSelector={userSelector}
              navigation={navigation}
            />
          </>
        )}
      />

      {fileAttachment && (
        <>
          {fileAttachment.type === "image/jpg" ? (
            <ImageAttachment image={fileAttachment} setImage={setFileAttachment} />
          ) : (
            <FileAttachment file={fileAttachment} setFile={setFileAttachment} />
          )}
        </>
      )}

      {bandAttachment && (
        <ProjectTaskAttachmentPreview
          bandAttachmentType={bandAttachmentType}
          bandAttachment={bandAttachment}
          setBandAttachment={setBandAttachment}
        />
      )}
    </View>
  );
};

export default memo(ChatList);
