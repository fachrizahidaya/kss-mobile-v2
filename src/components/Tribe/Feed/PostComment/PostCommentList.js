import { View, ActivityIndicator, Text, Dimensions } from "react-native";
import { GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";

import PostCommentListItem from "./PostCommentListItem";

const PostCommentList = ({
  comments,
  replyHandler,
  handleWhenScrollReachedEnd,
  commentIsFetching,
  commentIsLoading,
  hasBeenScrolled,
  setHasBeenScrolled,
  pressLinkHandler,
  employeeUsername,
  setCommentParentId,
  navigation,
  handleRefreshComments,
}) => {
  const screenHeight = Dimensions.get("screen");

  return (
    <GestureHandlerRootView>
      <View style={{ height: screenHeight.height - 550 }}>
        {comments.length > 0 ? (
          <FlashList
            data={comments}
            keyExtractor={(item, index) => item.id}
            onEndReachedThreshold={0.1}
            onScrollBeginDrag={() => setHasBeenScrolled(true)}
            ListFooterComponent={() => hasBeenScrolled && commentIsLoading && <ActivityIndicator />}
            onEndReached={hasBeenScrolled ? handleWhenScrollReachedEnd : null}
            estimatedItemSize={80}
            refreshControl={<RefreshControl refreshing={commentIsFetching} onRefresh={handleRefreshComments} />}
            renderItem={({ item, index }) => (
              <PostCommentListItem
                key={index}
                postId={item?.id}
                parentId={item.parent_id ? item?.parent_id : item?.id}
                authorImage={item?.employee_image}
                authorName={item?.employee_name}
                totalReplies={item?.total_replies}
                comments={item?.comments}
                handleReply={replyHandler}
                handlePressLink={pressLinkHandler}
                employeeUsername={employeeUsername}
                setCommentParentId={setCommentParentId}
                navigation={navigation}
              />
            )}
          />
        ) : (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>No Comments Yet</Text>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default PostCommentList;
