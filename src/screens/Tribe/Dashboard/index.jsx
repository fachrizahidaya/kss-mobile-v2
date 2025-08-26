import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { useFormik } from "formik";

import { Text, Pressable, BackHandler, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";

import { useFetch } from "../../../hooks/useFetch";
import PostCard from "../../../components/Tribe/Feed/Post/PostCard";
import PostComment from "../../../components/Tribe/Feed/PostComment/PostComment";
import ImageFullScreenModal from "../../../styles/modals/ImageFullScreenModal";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";
import {
  closeCommentHandler,
  likePostHandler,
  openCommentHandler,
  pressLinkHandler,
  refetchCommentHandler,
  replyCommentHandler,
  submitCommentHandler,
  toggleFullScreenImageHandler,
} from "../../../components/Tribe/Feed/shared/functions";
import Screen from "../../../layouts/Screen";
import Reminder from "../../../components/Tribe/Reminder/Reminder";
import FloatingButton from "../../../styles/buttons/FloatingButton";
import Approval from "../../../components/Tribe/Approval/Approval";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentOffsetPost, setCurrentOffsetPost] = useState(0);
  const [currentOffsetComments, setCurrentOffsetComments] = useState(0);
  const [reloadPost, setReloadPost] = useState(false);
  const [reloadComment, setReloadComment] = useState(false);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [postId, setPostId] = useState(null);
  const [commentParentId, setCommentParentId] = useState(null);
  const [forceRerender, setForceRerender] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [hideCreateIcon, setHideCreateIcon] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  const navigation = useNavigation();
  const commentScreenSheetRef = useRef(null);
  const flashListRef = useRef(null);
  const scrollOffsetY = useRef(0);
  const SCROLL_THRESHOLD = 20;

  const route = useRoute();
  const isFocused = useIsFocused();

  const userSelector = useSelector((state) => state.auth);

  const { isOpen: postReportModalIsOpen, toggle: togglePostReportModal } =
    useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
  const { isOpen: postReportAlertIsOpen, toggle: togglePostReportAlert } =
    useDisclosure(false);

  const postFetchParameters = {
    offset: currentOffsetPost,
    limit: 20,
  };

  const {
    data: post,
    refetch: refetchPost,
    isFetching: postIsFetching,
    isLoading: postIsLoading,
  } = useFetch("/hr/posts", [reloadPost, currentOffsetPost], postFetchParameters);

  const { data: profile } = useFetch("/hr/my-profile");
  const { data: employees } = useFetch("/hr/employees");
  const {
    data: reminder,
    isLoading: reminderIsLoading,
    refetch: refetchReminder,
    isFetching: reminderIsFetching,
  } = useFetch("/hr/reminder");

  const commentsFetchParameters = {
    offset: currentOffsetComments,
    limit: 10,
  };

  const {
    data: comment,
    isFetching: commentIsFetching,
    isLoading: commentIsLoading,
    refetch: refetchComment,
  } = useFetch(
    postId && `/hr/posts/${postId}/comment`,
    [reloadComment, currentOffsetComments],
    commentsFetchParameters
  );

  const {
    data: approvals,
    isLoading: approvalsIsLoading,
    isFetching: approvalIsFetching,
    refetch: refetchApprovals,
  } = useFetch("/hr/approvals/pending");

  const handleOpenSelectedPost = useCallback((post) => {
    setSelectedPost(post);
    togglePostReportModal();
  }, []);

  const handleCloseSelectedPost = () => {
    setSelectedPost(null);
    togglePostReportModal();
  };

  const handleShowModalAfterNewPost = () => {
    handleRefetchPost();
    toggleAlert();
    setRequestType("post");
  };

  const modalErrorAfterNewPostHandler = () => {
    toggleAlert();
    setRequestType("error");
  };

  const handleRefreshPosts = () => {
    setPosts([]);
    handleRefetchPost();
    refetchPost();
    refetchReminder();
    refetchApprovals();
  };

  const handleRefreshComments = () => {
    refetchCommentHandler(setCurrentOffsetComments, setReloadComment, reloadComment);
    refetchComment();
  };

  /**
   * Handle fetch more Comments
   * After end of scroll reached, it will added other earlier comments
   */
  const handleCommentEndReached = () => {
    if (comments.length !== comments.length + comment?.data.length) {
      setCurrentOffsetComments(currentOffsetComments + 10);
    }
  };

  /**
   * Handle Fetch more Posts
   * After end of scroll reached, it will added other earlier posts
   */
  const handlePostEndReached = () => {
    if (posts.length !== posts.length + post?.data.length) {
      setCurrentOffsetPost(currentOffsetPost + 10);
    }
  };

  /**
   * Handle fetch post from first offset
   * After create a new post or comment, it will return to the first offset
   */
  const handleRefetchPost = () => {
    setCurrentOffsetPost(0);
    setReloadPost(!reloadPost);
  };

  const params = {
    loggedEmployeeId: profile?.data?.id,
    loggedEmployeeImage: profile?.data?.image,
    loggedEmployeeName: userSelector?.name,
    loggedEmployeeDivision: profile?.data?.position_id,
    handleAfterNewPost: handleShowModalAfterNewPost,
    handleErrorAfterNewPost: modalErrorAfterNewPostHandler,
  };

  /**
   * Handle show username in post
   */
  const handleEmployeeUsername = employees?.data?.map((item) => {
    return {
      username: item.username,
      id: item.id,
      name: item.name,
    };
  });

  /**
   * Handle show username suggestion option
   */
  const employeeData = employees?.data?.map(({ id, username }) => ({
    id,
    name: username,
  }));

  /**
   * Handle show suggestion username
   * @param {*} param
   * @returns
   */
  const renderSuggestions = ({ keyword, onSuggestionPress }) => {
    if (keyword == null || keyword === "@@" || keyword === "@#") {
      return null;
    }
    const data = employeeData.filter((one) =>
      one.name.toLowerCase().includes(keyword.toLowerCase())
    );

    return (
      <ScrollView style={{ maxHeight: 100 }}>
        <FlashList
          data={data}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index}
          estimatedItemSize={200}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              onPress={() => onSuggestionPress(item)}
              style={{ padding: 12 }}
            >
              <Text style={{ fontSize: 12, fontWeight: "400" }}>{item.name}</Text>
            </Pressable>
          )}
        />
      </ScrollView>
    );
  };

  /**
   * Handle adjust the content if there is username
   * @param {*} value
   */
  const handleCommentContainUsername = (value) => {
    formik.handleChange("comments")(value);
  };

  const handleScroll = (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const offsetDifference = currentOffsetY - scrollOffsetY.current;

    if (Math.abs(offsetDifference) < SCROLL_THRESHOLD) {
      return; // Ignore minor scrolls
    }

    if (currentOffsetY > scrollOffsetY.current) {
      if (scrollDirection !== "down") {
        setHideCreateIcon(true); // Scrolling down
        setScrollDirection("down");
      }
    } else {
      if (scrollDirection !== "up") {
        setHideCreateIcon(false); // Scrolling up
        setScrollDirection("up");
      }
    }

    scrollOffsetY.current = currentOffsetY;
  };

  /**
   * Handle create a new comment
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      post_id: postId || "",
      comments: "",
      parent_id: commentParentId || "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
      const modifiedContent = values.comments.replace(mentionRegex, "@$1");
      values.comments = modifiedContent;
      submitCommentHandler(
        values,
        setSubmitting,
        setStatus,
        setCommentParentId,
        setCurrentOffsetComments,
        setReloadComment,
        reloadComment,
        posts,
        postId,
        setForceRerender,
        forceRerender,
        setRequestType,
        setErrorMessage,
        toggleAlert
      );
    },
  });

  /**
   * After created a post, it will scroll to top
   */
  useEffect(() => {
    if (flashListRef.current && posts.length > 0) {
      flashListRef.current.scrollToIndex({ animated: true, index: 0 });
    }
  }, [posts]);

  /**
   * Handle double press back to exit app
   */
  useEffect(() => {
    if (route.name === "Dashboard" && isFocused) {
      const backAction = () => {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }
        setBackPressedOnce(true);
        ToastAndroid.show("Press again to exit", ToastAndroid.SHORT);
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000); // Reset backPressedOnce after 2 seconds
        return true;
      };
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => backHandler.remove();
    }
  }, [backPressedOnce, route, isFocused]);

  /**
   * Handle infinite scroll
   */
  useEffect(() => {
    if (post?.data && postIsFetching === false) {
      if (currentOffsetPost === 0) {
        setPosts(post?.data);
      } else {
        setPosts((prevData) => [...prevData, ...post?.data]);
      }
    }
  }, [postIsFetching, reloadPost]);

  useEffect(() => {
    if (!openCommentHandler) {
      setCommentParentId(null);
      setComments([]); // after close current post's comment, it clear the comments
    } else {
      if (comment?.data && commentIsFetching === false) {
        if (currentOffsetComments === 0) {
          setComments(comment?.data);
        } else {
          setComments((prevData) => [...prevData, ...comment?.data]);
        }
      }
    }
  }, [commentIsFetching, reloadComment, commentParentId]);

  return (
    <Screen>
      {hideCreateIcon ? null : (
        <FloatingButton
          icon="pencil"
          handlePress={() => navigation.navigate("New Feed", params)}
        />
      )}

      {reminder?.data?.length > 0 && (
        <Reminder
          data={reminder?.data}
          isLoading={reminderIsLoading}
          refetch={refetchReminder}
          isFetching={reminderIsFetching}
          navigation={navigation}
        />
      )}

      {approvals?.data?.length > 0 && (
        <Approval
          data={approvals?.data}
          isLoading={approvalsIsLoading}
          refetch={refetchApprovals}
          isFetching={approvalIsFetching}
          navigation={navigation}
          loggedInEmployee={profile?.data?.id}
        />
      )}

      <PostCard
        posts={posts}
        loggedEmployeeId={profile?.data?.id}
        loggedEmployeeImage={profile?.data?.image}
        handleWhenScrollReachedEnd={handlePostEndReached}
        postIsFetching={postIsFetching}
        postIsLoading={postIsLoading}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        toggleComment={openCommentHandler}
        forceRerender={forceRerender}
        toggleFullScreen={toggleFullScreenImageHandler}
        employeeUsername={handleEmployeeUsername}
        navigation={navigation}
        pressLinkHandler={pressLinkHandler}
        toggleLikeHandler={likePostHandler}
        reference={commentScreenSheetRef}
        setPostId={setPostId}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        setSelectedPicture={setSelectedPicture}
        toggleReport={handleOpenSelectedPost}
        handleRefreshPosts={handleRefreshPosts}
        handleIconWhenScrolling={handleScroll}
        reminder={reminder?.data}
        approval={approvals?.data}
      />

      <PostComment
        loggedEmployeeName={userSelector?.name}
        loggedEmployeeImage={profile?.data?.image}
        comments={comments}
        commentIsFetching={commentIsFetching}
        commentIsLoading={commentIsLoading}
        handleClose={closeCommentHandler}
        handleWhenScrollReachedEnd={handleCommentEndReached}
        parentId={commentParentId}
        replyHandler={replyCommentHandler}
        employeeUsername={handleEmployeeUsername}
        reference={commentScreenSheetRef}
        onPressLink={pressLinkHandler}
        handleUsernameSuggestions={renderSuggestions}
        handleShowUsername={handleCommentContainUsername}
        formik={formik}
        setCommentParentId={setCommentParentId}
        setPostId={setPostId}
        setComments={setComments}
        navigation={navigation}
        handleRefreshComments={handleRefreshComments}
      />

      <ImageFullScreenModal
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        file_path={selectedPicture}
        setSelectedPicture={setSelectedPicture}
        type="Feed"
      />

      <ConfirmationModal
        isOpen={postReportModalIsOpen}
        toggle={handleCloseSelectedPost}
        description="Are you sure want to report this post?"
        apiUrl={`/hr/post-report`}
        body={{ post_id: selectedPost, notes: "Inappropriate Post" }}
        isDelete={false}
        hasSuccessFunc={true}
        onSuccess={refetchPost}
        toggleOtherModal={togglePostReportAlert}
        setError={setErrorMessage}
        success={success}
        setRequestType={setRequestType}
        setSuccess={setSuccess}
      />

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={"Post shared!"}
        description={"Thank you for contributing to the community"}
        type={"success"}
      />

      <AlertModal
        isOpen={postReportAlertIsOpen}
        toggle={togglePostReportAlert}
        title={requestType === "post" ? "Report submitted!" : "Process error!"}
        description={
          requestType === "post"
            ? "Your report is logged"
            : errorMessage || "Please try again later"
        }
        type={requestType === "post" ? "info" : "danger"}
      />
    </Screen>
  );
};

export default Feed;
