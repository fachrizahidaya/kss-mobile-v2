import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";
import CommentDetailItem from "./CommentDetailItem";

const CommentReviewList = ({ commentValues, handleSelectedComment }) => {
  return (
    <ScrollView>
      {commentValues && commentValues.length > 0 ? (
        commentValues.map((item, index) => {
          const correspondingEmployeeComment = employeeCommentValue.find((empComment) => empComment.id === item.id);
          return (
            <CommentDetailItem
              key={index}
              item={item}
              description={item?.description}
              handleOpen={handleSelectedComment}
              employeeCommentValue={correspondingEmployeeComment}
              comment={item?.comment}
              index={index}
              length={commentValues?.length}
            />
          );
        })
      ) : (
        <View style={styles.content}>
          <EmptyPlaceholder text="No Data" />
        </View>
      )}
    </ScrollView>
  );
};

export default CommentReviewList;

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
