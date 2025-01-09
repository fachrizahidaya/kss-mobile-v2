import { StyleSheet, View } from "react-native";

import PostCommentList from "./PostCommentList";
import { Colors } from "../../../../styles/Color";

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
    marginHorizontal: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.secondary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    gap: 21,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 4,
  },
});
