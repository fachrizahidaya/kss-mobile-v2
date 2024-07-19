import { useState } from "react";

import { View, Text, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { useFetch } from "../../../../hooks/useFetch";
import { TextProps } from "../../../../styles/CustomStylings";
import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import PostCommentReply from "./PostCommentReply";
import FeedContentStyle from "../../../../styles/FeedContentStyle";

const PostCommentListItem = ({
  postId,
  parentId,
  authorImage,
  authorName,
  totalReplies,
  handleReply,
  comments,
  handlePressLink,
  employeeUsername,
  setCommentParentId,
  navigation,
}) => {
  const [hideReplies, setHideReplies] = useState(false);
  const [viewReplyToggle, setViewReplyToggle] = useState(false);

  const words = comments.split(" ");

  const {
    data: commentRepliesData,
    isFetching: commentRepliesDataIsFetching,
    refetch: refetchCommentRepliesData,
  } = useFetch(parentId && `/hr/posts/${postId}/comment/${parentId}/replies`);

  const handleViewReply = () => {
    setHideReplies(false);
    setViewReplyToggle(true);
    refetchCommentRepliesData();
  };

  const handleHideReply = () => {
    setHideReplies(true);
    setViewReplyToggle(false);
  };

  return (
    <View style={{ gap: 3 }}>
      <Pressable onPress={() => handleReply(null, setCommentParentId)} style={{ marginVertical: 10 }}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View>
            <AvatarPlaceholder image={authorImage} name={authorName} size="md" isThumb={false} />
          </View>
          <View style={{ flex: 1, gap: 5 }}>
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              {authorName.length > 30 ? authorName.split(" ")[0] : authorName}
            </Text>
            <Text style={[{ fontSize: 12 }, TextProps]}>
              {
                <FeedContentStyle
                  words={words}
                  navigation={navigation}
                  employeeUsername={employeeUsername}
                  loggedEmployeeId={null}
                  loggedEmployeeImage={null}
                  onPressLink={handlePressLink}
                />
              }
            </Text>

            <Text
              onPress={() => handleReply(parentId, setCommentParentId)}
              style={{ fontSize: 12, fontWeight: "500", color: "#8A7373" }}
            >
              Reply
            </Text>
          </View>
        </View>

        {!totalReplies ? (
          ""
        ) : (
          <Pressable style={{ marginHorizontal: 40, marginVertical: 10 }} onPress={handleViewReply}>
            {viewReplyToggle === false ? (
              <Text style={{ fontSize: 12, fontWeight: "500", color: "#8A7373", marginLeft: 10 }}>
                View{totalReplies ? ` ${totalReplies}` : ""} {totalReplies > 1 ? "Replies" : "Reply"}
              </Text>
            ) : (
              ""
            )}
          </Pressable>
        )}

        {viewReplyToggle === true && totalReplies > 0 && hideReplies === false && (
          <>
            <View style={{ flex: 1, minHeight: 2 }}>
              <FlashList
                data={commentRepliesData?.data}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                windowSize={5}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, index) => index}
                estimatedItemSize={200}
                renderItem={({ item, index }) => (
                  <PostCommentReply
                    key={index}
                    authorName={item?.employee_name}
                    authorImage={item?.employee_image}
                    comments={item?.comments}
                    totalReplies={item?.total_replies}
                    parentId={parentId}
                    handleReply={handleReply}
                    handlePressLink={handlePressLink}
                    employeeUsername={employeeUsername}
                    setCommentParentId={setCommentParentId}
                    navigation={navigation}
                  />
                )}
              />
            </View>

            {viewReplyToggle === false ? (
              ""
            ) : (
              <View style={{ marginHorizontal: 40, marginVertical: 5 }}>
                <Pressable onPress={handleHideReply}>
                  <Text style={{ fontSize: 12, fontWeight: "500", color: "#8A7373" }}>Hide Reply</Text>
                </Pressable>
              </View>
            )}
          </>
        )}
      </Pressable>
    </View>
  );
};

export default PostCommentListItem;
