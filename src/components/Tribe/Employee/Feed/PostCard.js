import { memo } from "react";

import { StyleSheet, View, Text, ActivityIndicator, FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

import PostCardItem from "./PostCardItem";
import EmployeeData from "../EmployeeData";

const PostCard = ({
  posts,
  loggedEmployeeId,
  loggedEmployeeImage,
  postEndReachedHandler,
  personalPostIsFetching,
  refetchPersonalPost,
  employee,
  teammates,
  hasBeenScrolled,
  setHasBeenScrolled,
  handleToggleComment,
  forceRerender,
  setForceRerender,
  personalPostIsLoading,
  handleToggleFullScreen,
  openSelectedPersonalPostHandler,
  employeeUsername,
  userSelector,
  handleToggleDeleteModal,
  handleToggleEditModal,
  handleToggleReportModal,
  reference,
  navigation,
  postRefetchHandler,
  handlePressLink,
  handleToggleLike,
  setPostId,
  commentScreenSheetRef,
  isFullScreen,
  setIsFullScreen,
  setSelectedPicture,
  handleToggleReport,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts.length > 0 ? posts : [{ id: "no-posts" }]}
        extraData={forceRerender} // re-render data handler
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.1}
        onScrollBeginDrag={() => setHasBeenScrolled(true)} // user scroll handler
        onEndReached={hasBeenScrolled === true ? postEndReachedHandler : null}
        ListFooterComponent={() => hasBeenScrolled && personalPostIsLoading && <ActivityIndicator />}
        refreshControl={
          <RefreshControl
            refreshing={personalPostIsFetching}
            onRefresh={() => {
              postRefetchHandler();
              refetchPersonalPost();
            }}
          />
        }
        // Employee Information
        ListHeaderComponent={
          <EmployeeData userSelector={userSelector} employee={employee} teammates={teammates} reference={reference} />
        }
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
        // Employee Posts
        renderItem={({ item, index }) => {
          if (item.id === "no-posts") {
            return (
              <View style={styles.noPost}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>No Posts Yet</Text>
              </View>
            );
          }
          return (
            <View style={{ paddingHorizontal: 16 }}>
              <PostCardItem
                key={index}
                id={item?.id}
                employeeId={item?.author_id}
                employeeName={item?.employee_name}
                createdAt={item?.created_at}
                employeeImage={item?.employee_image}
                content={item?.content}
                total_like={item?.total_like}
                totalComment={item?.total_comment}
                likedBy={item?.liked_by}
                attachment={item?.file_path}
                type={item?.type}
                toggleLike={handleToggleLike}
                loggedEmployeeId={loggedEmployeeId}
                loggedEmployeeImage={loggedEmployeeImage}
                toggleComment={handleToggleComment}
                forceRerenderPersonal={forceRerender}
                setForceRerenderPersonal={setForceRerender}
                toggleFullScreen={handleToggleFullScreen}
                handleLinkPress={handlePressLink}
                handleOpenSelectedPersonalPost={openSelectedPersonalPostHandler}
                employeeUsername={employeeUsername}
                toggleDeleteModal={handleToggleDeleteModal}
                toggleEditModal={handleToggleEditModal}
                navigation={navigation}
                reference={commentScreenSheetRef}
                setPostId={setPostId}
                isFullScreen={isFullScreen}
                setIsFullScreen={setIsFullScreen}
                setSelectedPicture={setSelectedPicture}
                toggleReport={handleToggleReport}
                toggleReportModal={handleToggleReportModal}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default memo(PostCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noPost: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    paddingVertical: 10,
    paddingTop: 30,
  },
});
