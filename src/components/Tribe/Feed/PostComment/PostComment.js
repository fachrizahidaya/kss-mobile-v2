import { useState, memo } from "react";

import { StyleSheet, View, Text } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import PostCommentList from "./PostCommentList";
import PostCommentForm from "./PostCommentForm";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomSheet from "../../../../layouts/CustomSheet";
import { Colors } from "../../../../styles/Color";

const PostComment = ({
  loggedEmployeeName,
  loggedEmployeeImage,
  commentIsFetching,
  commentIsLoading,
  comments,
  handleClose,
  handleWhenScrollReachedEnd,
  parentId,
  replyHandler,
  employeeUsername,
  reference,
  onPressLink,
  handleUsernameSuggestions,
  handleShowUsername,
  formik,
  setPostId,
  setCommentParentId,
  navigation,
  handleRefreshComments,
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
        <View style={{ alignItems: "center", marginBottom: 9 }}>
          <Text style={[TextProps, { fontSize: 15, fontWeight: "500" }]}>Comments</Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <PostCommentList
          comments={comments}
          hasBeenScrolled={hasBeenScrolled}
          setHasBeenScrolled={setHasBeenScrolled}
          replyHandler={replyHandler}
          handleWhenScrollReachedEnd={handleWhenScrollReachedEnd}
          commentIsFetching={commentIsFetching}
          commentIsLoading={commentIsLoading}
          pressLinkHandler={onPressLink}
          employeeUsername={employeeUsername}
          setCommentParentId={setCommentParentId}
          navigation={navigation}
          handleRefreshComments={handleRefreshComments}
        />
      </View>
      <PostCommentForm
        loggedEmployeeImage={loggedEmployeeImage}
        loggedEmployeeName={loggedEmployeeName}
        parentId={parentId}
        renderSuggestions={handleUsernameSuggestions}
        handleChange={handleShowUsername}
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
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});
