import { memo } from "react";

import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

import PostCardItem from "./PostCardItem";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";

const PostCard = ({
  posts,
  loggedEmployeeId,
  loggedEmployeeImage,
  handleWhenScrollReachedEnd,
  hasBeenScrolled,
  setHasBeenScrolled,
  postIsLoading,
  postIsFetching,
  toggleComment,
  forceRerender,
  toggleFullScreen,
  employeeUsername,
  navigation,
  pressLinkHandler,
  toggleLikeHandler,
  reference,
  setPostId,
  isFullScreen,
  setIsFullScreen,
  setSelectedPicture,
  toggleReport,
  handleRefreshPosts,
  handleIconWhenScrolling,
}) => {
  return (
    <View style={styles.container}>
      {posts?.length > 0 ? (
        <FlatList
          removeClippedSubviews={true}
          data={posts}
          extraData={forceRerender} // re-render data handler
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item?.id}
          refreshing={true}
          onScrollBeginDrag={() => setHasBeenScrolled(true)}
          onScroll={handleIconWhenScrolling}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          onEndReached={hasBeenScrolled ? handleWhenScrollReachedEnd : null}
          refreshControl={<RefreshControl refreshing={postIsFetching} onRefresh={() => handleRefreshPosts()} />}
          ListFooterComponent={() => hasBeenScrolled && postIsLoading && <ActivityIndicator />}
          renderItem={({ item }) => (
            <PostCardItem
              key={item?.id}
              id={item?.id}
              employeeId={item?.author_id}
              employeeName={item?.employee_name}
              employeeImage={item?.employee_image}
              createdAt={item?.created_at}
              content={item?.content}
              total_like={item?.total_like}
              totalComment={item?.total_comment}
              likedBy={item?.liked_by}
              attachment={item?.file_path}
              type={item?.type}
              loggedEmployeeId={loggedEmployeeId}
              loggedEmployeeImage={loggedEmployeeImage}
              toggleLike={toggleLikeHandler}
              handleToggleComment={toggleComment}
              handleToggleFullScreen={toggleFullScreen}
              handlePressLink={pressLinkHandler}
              employeeUsername={employeeUsername}
              navigation={navigation}
              reference={reference}
              setPostId={setPostId}
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
              setSelectedPicture={setSelectedPicture}
              handleToggleReport={toggleReport}
            />
          )}
        />
      ) : (
        <EmptyPlaceholder text="No Data" />
      )}
    </View>
  );
};

export default memo(PostCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
