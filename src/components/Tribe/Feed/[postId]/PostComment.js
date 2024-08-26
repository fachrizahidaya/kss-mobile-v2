import { StyleSheet, View } from "react-native";

import PostCommentList from "./PostCommentList";

const PostComment = ({
  commentIsLoading,
  comments,
  handleWhenScrollReachedEnd,
  handleReply,
  employeeUsername,
  handlePressLink,
  setCommentParentId,
  navigation,
  hasBeenScrolled,
  setHasBeenScrolled,
  viewReplyToggle,
  setViewReplyToggle,
  hideReplies,
  setHideReplies,
}) => {
  return (
    <View style={styles.container}>
      <PostCommentList
        comments={comments}
        onReply={handleReply}
        commentEndReachedHandler={handleWhenScrollReachedEnd}
        commentIsLoading={commentIsLoading}
        employeeUsername={employeeUsername}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        onPressLink={handlePressLink}
        setCommentParentId={setCommentParentId}
        navigation={navigation}
        hideReplies={hideReplies}
        setHideReplies={setHideReplies}
        viewReplyToggle={viewReplyToggle}
        setViewReplyToggle={setViewReplyToggle}
      />
    </View>
  );
};

export default PostComment;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    gap: 21,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 14,
    elevation: 1,
  },
});
