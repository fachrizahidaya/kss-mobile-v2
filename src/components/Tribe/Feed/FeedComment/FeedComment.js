import { useState, memo } from "react";

import { StyleSheet, View, Text } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import FeedCommentList from "./FeedCommentList";
import FeedCommentForm from "./FeedCommentForm";
import { TextProps } from "../../../shared/CustomStylings";

const FeedComment = ({
  loggedEmployeeName,
  loggedEmployeeImage,
  commentIsFetching,
  commentIsLoading,
  comments,
  handleClose,
  handleWhenScrollReachedEnd,
  parentId,
  onReply,
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
    <ActionSheet ref={reference} onClose={() => handleClose(reference, setPostId, setCommentParentId, setComments)}>
      <View style={styles.header}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={[TextProps, { fontSize: 15, fontWeight: "500" }]}>Comments</Text>
        </View>
      </View>

      <View style={styles.wrapper}>
        <FeedCommentList
          comments={comments}
          hasBeenScrolled={hasBeenScrolled}
          setHasBeenScrolled={setHasBeenScrolled}
          onReply={onReply}
          handleWhenScrollReachedEnd={handleWhenScrollReachedEnd}
          commentIsFetching={commentIsFetching}
          commentIsLoading={commentIsLoading}
          onPressLink={onPressLink}
          employeeUsername={employeeUsername}
          setCommentParentId={setCommentParentId}
          navigation={navigation}
          handleRefreshComments={handleRefreshComments}
        />
      </View>
      <FeedCommentForm
        loggedEmployeeImage={loggedEmployeeImage}
        loggedEmployeeName={loggedEmployeeName}
        parentId={parentId}
        renderSuggestions={handleUsernameSuggestions}
        handleChange={handleShowUsername}
        formik={formik}
      />
    </ActionSheet>
  );
};

export default memo(FeedComment);

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DBDBDB",
    marginTop: 15,
  },
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});
