import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text, View } from "react-native";

import PostCommentListItem from "../PostComment/PostCommentListItem";

const PostCommentList = ({
  comments,
  onReply,
  handleWhenScrollReachedEnd,
  commentIsLoading,
  commentIsFetching,
  hasBeenScrolled,
  setHasBeenScrolled,
  onPressLink,
  employeeUsername,
  setCommentParentId,
  navigation,
  viewReplyToggle,
  setViewReplyToggle,
  hideReplies,
  setHideReplies,
}) => {
  return (
    <View>
      <FlashList
        data={comments}
        keyExtractor={(item, index) => item.id}
        onEndReachedThreshold={0.1}
        onScrollBeginDrag={() => setHasBeenScrolled(true)}
        ListFooterComponent={() => (commentIsFetching ? <ActivityIndicator /> : null)}
        onEndReached={hasBeenScrolled ? handleWhenScrollReachedEnd : null}
        estimatedItemSize={80}
        renderItem={({ item, index }) => {
          if (comments.length === 0) {
            return (
              <View style={{ marginTop: 20, alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>No Comments Yet</Text>
              </View>
            );
          }
          return (
            <PostCommentListItem
              key={index}
              postId={item?.id}
              parentId={item.parent_id ? item?.parent_id : item?.id}
              authorImage={item?.employee?.image}
              authorName={item?.employee?.name}
              totalReplies={item?.replies_count}
              comments={item?.comments}
              handleReply={onReply}
              handlePressLink={onPressLink}
              employeeUsername={employeeUsername}
              setCommentParentId={setCommentParentId}
              navigation={navigation}
              viewReplyToggle={viewReplyToggle}
              setViewReplyToggle={setViewReplyToggle}
              hideReplies={hideReplies}
              setHideReplies={setHideReplies}
            />
          );
        }}
      />
    </View>
  );
};

export default PostCommentList;
