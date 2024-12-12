import { memo, useState } from "react";

import { StyleSheet, View, Text } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import PostCommentList from "../../Feed/PostComment/PostCommentList";
import PostCommentForm from "../../Feed/PostComment/PostCommentForm";
import CustomSheet from "../../../../layouts/CustomSheet";
import { Colors } from "../../../../styles/Color";

const PostComment = ({
  loggedEmployeeName,
  loggedEmployeeImage,
  commentIsFetching,
  commentIsLoading,
  comments,
  handleClose,
  refetchComment,
  handleEndReached,
  commentRefetchHandler,
  parentId,
  handleReply,
  employeeUsername,
  reference,
  handlePressLink,
  formik,
  handleSuggestions,
  commentContainUsernameHandler,
  reloadComment,
  setReloadComment,
  setCurrentOffsetComments,
  setPostId,
  setCommentParentId,
  setComments,
}) => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);

  return (
    <CustomSheet
      reference={reference}
      handleClose={() => handleClose(reference, setPostId, setCommentParentId, setComments)}
      commentSheet={true}
    >
      <View style={styles.header}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Comments</Text>
        </View>
      </View>
      <View style={styles.container}>
        <PostCommentList
          comments={comments}
          hasBeenScrolled={hasBeenScrolled}
          setHasBeenScrolled={setHasBeenScrolled}
          replyHandler={handleReply}
          commentEndReachedHandler={handleEndReached}
          commentsRefetchHandler={commentRefetchHandler}
          commentIsFetching={commentIsFetching}
          commentIsLoading={commentIsLoading}
          refetchComment={refetchComment}
          pressLinkHandler={handlePressLink}
          employeeUsername={employeeUsername}
          reloadComment={reloadComment}
          setReloadComment={setReloadComment}
          setCurrentOffsetComments={setCurrentOffsetComments}
          setCommentParentId={setCommentParentId}
        />
      </View>
      <PostCommentForm
        loggedEmployeeImage={loggedEmployeeImage}
        loggedEmployeeName={loggedEmployeeName}
        parentId={parentId}
        renderSuggestions={handleSuggestions}
        handleChange={commentContainUsernameHandler}
        formik={formik}
      />
    </CustomSheet>
  );
};

export default memo(PostComment);

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGrey,
    marginTop: 15,
  },
  container: {
    gap: 21,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});
