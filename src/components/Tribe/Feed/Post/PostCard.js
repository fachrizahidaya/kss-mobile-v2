import { memo } from "react";

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PostCardItem from "./PostCardItem";
import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

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
  reminder,
  approval,
}) => {
  const height = Dimensions.get("screen").height - (reminder?.length ? 400 : 300);

  return (
    <View style={styles.container}>
      {reminder?.length === 0 && approval?.length === 0 ? null : (
        <View style={styles.header}>
          <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>Posts</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Pressable onPress={handleRefreshPosts} style={styles.refresh}>
              <MaterialCommunityIcons name="refresh" size={15} color={Colors.iconDark} />
            </Pressable>
          </View>
        </View>
      )}
      {posts?.length > 0 ? (
        <FlatList
          data={posts}
          removeClippedSubviews={true}
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
          refreshControl={
            <RefreshControl
              refreshing={postIsFetching}
              onRefresh={() => handleRefreshPosts()}
            />
          }
          bounces={Platform.OS === "ios" ? false : true}
          ListFooterComponent={() =>
            hasBeenScrolled && postIsFetching && <ActivityIndicator />
          }
          renderItem={({ item, index }) => (
            <PostCardItem
              key={item?.id}
              index={index}
              id={item?.id}
              employeeId={item?.author?.id}
              employeeName={item?.author?.name}
              employeeImage={item?.author?.image}
              createdAt={item?.created_at}
              content={item?.content}
              total_like={item?.likes_count}
              totalComment={item?.comments_count}
              likedBy={item?.likes}
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
              length={posts?.length}
            />
          )}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={postIsFetching} onRefresh={handleRefreshPosts} />
          }
        >
          <View style={[styles.wrapper, { height: height }]}>
            <EmptyPlaceholder text="No Data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default memo(PostCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 14,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  refresh: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: Colors.secondary,
  },
});
