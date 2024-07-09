import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";

import { SafeAreaView, StyleSheet, Text, View, Pressable, Linking } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { useFetch } from "../../../hooks/useFetch";
import axiosInstance from "../../../config/api";
import { TextProps } from "../../../components/shared/CustomStylings";
import ImageFullScreenModal from "../../../components/shared/Modal/ImageFullScreenModal";
import PageHeader from "../../../components/shared/PageHeader";
import FeedCommentPost from "../../../components/Tribe/Feed/FeedComment/FeedCommentPost";
import FeedCommentFormPost from "../../../components/Tribe/Feed/FeedComment/FeedCommentFormPost";
import FeedCardItemPost from "../../../components/Tribe/Feed/FeedCard/FeedCardItemPost";
import ShareImage from "../../../components/Tribe/Feed/ShareImage";
import {
  likePostHandler,
  pressLinkHandler,
  refetchCommentHandler,
  replyCommentHandler,
  toggleFullScreenImageHandler,
} from "../../../components/Tribe/Feed/shared/functions";
import { useDisclosure } from "../../../hooks/useDisclosure";
import SuccessModal from "../../../components/shared/Modal/SuccessModal";

const PostScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [commentParentId, setCommentParentId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [reloadComment, setReloadComment] = useState(false);
  const [currentOffsetComments, setCurrentOffsetComments] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [viewReplyToggle, setViewReplyToggle] = useState(false);
  const [hideReplies, setHideReplies] = useState(false);
  const [requestType, setRequestType] = useState("");

  const route = useRoute();
  const navigation = useNavigation();
  const sharePostScreenSheetRef = useRef(null);

  const userSelector = useSelector((state) => state.auth);

  const { id } = route.params;

  const { data: post, isFetching: postIsFetching } = useFetch("/hr/posts");
  const { data: postData, refetch: refetchPostData, isFetching: postDataIsFetching } = useFetch(`/hr/posts/${id}`);
  const { data: profile } = useFetch("/hr/my-profile");
  const { data: employees } = useFetch("/hr/employees");

  const { isOpen: errorModalIsOpen, toggle: toggleErrorModal } = useDisclosure(false);

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
    `/hr/posts/${postData?.data?.id}/comment`,
    [reloadComment, currentOffsetComments],
    commentsFetchParameters
  );

  /**
   * Handle fetch more Comments
   * After end of scroll reached, it will added other earlier comments
   */
  const commentEndReachedHandler = () => {
    if (comments.length !== comments.length + comment?.data.length) {
      setCurrentOffsetComments(currentOffsetComments + 10);
    }
  };

  /**
   * Handle add comment
   */
  const addCommentHandler = () => {
    const referenceIndex = posts.findIndex((post) => post.id === postData?.data?.id);
    posts[referenceIndex]["total_comment"] += 1;
    refetchPostData();
  };

  /**
   * Handle submit a comment
   * @param {*} data
   * @param {*} setSubmitting
   * @param {*} setStatus
   */
  const submitCommentHandler = async (data, setSubmitting, setStatus) => {
    try {
      const res = await axiosInstance.post(`/hr/posts/comment`, data);
      refetchPostData();
      refetchCommentHandler(setCurrentOffsetComments, setReloadComment, reloadComment);
      addCommentHandler(postData?.data?.id);
      setCommentParentId(null);
      setSubmitting(false);
      setStatus("success");
    } catch (err) {
      console.log(err);
      toggleErrorModal();
      setRequestType("warning");
      setSubmitting(false);
      setStatus("error");
    }
  };

  // const sharePostToWhatsappHandler = async (message, url) => {
  //   let messageBody = `${message}\n${url}`;
  //   let whatsappUrl = `whatsapp://send?text=${encodeURIComponent(messageBody)}`;
  //   try {
  //     await Linking.openURL(whatsappUrl);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  /**
   * Handle show username in post
   */
  const objectContainEmployeeUsernameHandler = employees?.data?.map((item) => {
    return {
      username: item.username,
      id: item.id,
      name: item.name,
    };
  });

  /**
   * Handle show username suggestion option
   */
  const employeeData = employees?.data.map(({ id, username }) => ({
    id,
    name: username,
  }));

  /**
   * Handle show suggestion username
   * @param {*} param
   * @returns
   */
  const renderSuggestionsHandler = ({ keyword, onSuggestionPress }) => {
    if (keyword == null || keyword === "@@" || keyword === "@#") {
      return null;
    }
    const data = employeeData.filter((one) => one.name.toLowerCase().includes(keyword.toLowerCase()));

    return (
      <ScrollView style={{ maxHeight: 100 }}>
        <FlashList
          data={data}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index}
          estimatedItemSize={200}
          renderItem={({ item, index }) => (
            <Pressable key={index} onPress={() => onSuggestionPress(item)} style={{ padding: 12 }}>
              <Text style={[TextProps]}>{item.name}</Text>
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
  const commentContainUsernameHandler = (value) => {
    formik.handleChange("comments")(value);
  };

  /**
   * Handle create a new comment
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      post_id: postData?.data?.id || "",
      comments: "",
      parent_id: commentParentId || "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
      const modifiedContent = values.comments.replace(mentionRegex, "@$1");
      values.comments = modifiedContent;
      submitCommentHandler(values, setSubmitting, setStatus);
    },
  });

  useEffect(() => {
    if (post?.data && postIsFetching === false) {
      setPosts((prevData) => [...prevData, ...post?.data]);
    }
  }, [postIsFetching]);

  useEffect(() => {
    if (comment?.data && commentIsFetching === false) {
      if (currentOffsetComments === 0) {
        setComments(comment?.data);
      } else {
        setComments((prevData) => [...prevData, ...comment?.data]);
      }
    }
  }, [commentIsFetching, reloadComment, commentParentId]);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  });

  return isReady ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader
          title="Post"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <ScrollView
        style={{ backgroundColor: "#F8F8F8" }}
        refreshControl={
          <RefreshControl
            refreshing={postDataIsFetching && commentIsFetching}
            onRefresh={() => {
              refetchPostData();
              refetchComment();
            }}
          />
        }
      >
        <View style={{ paddingHorizontal: 16 }}>
          <FeedCardItemPost
            id={postData?.data?.id}
            employeeId={postData?.data?.author_id}
            employeeName={postData?.data?.employee_name}
            createdAt={postData?.data?.updated_at}
            employeeImage={postData?.data?.employee_image}
            content={postData?.data?.content}
            total_like={postData?.data?.total_like}
            totalComment={postData?.data?.total_comment}
            likedBy={postData?.data?.liked_by}
            attachment={postData?.data?.file_path}
            type={postData?.data?.type}
            loggedEmployeeId={profile?.data?.id}
            loggedEmployeeImage={profile?.data?.image}
            onToggleLike={likePostHandler}
            onToggleFullScreen={toggleFullScreenImageHandler}
            onPressLink={pressLinkHandler}
            employeeUsername={objectContainEmployeeUsernameHandler}
            navigation={navigation}
            reference={sharePostScreenSheetRef}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            setSelectedPicture={setSelectedPicture}
          />
          <FeedCommentPost
            comments={comments}
            commentIsLoading={commentIsLoading}
            handleWhenScrollReachedEnd={commentEndReachedHandler}
            onReply={replyCommentHandler}
            employeeUsername={objectContainEmployeeUsernameHandler}
            onPressLink={pressLinkHandler}
            setCommentParentId={setCommentParentId}
            navigation={navigation}
            hasBeenScrolled={hasBeenScrolled}
            setHasBeenScrolled={setHasBeenScrolled}
            viewReplyToggle={viewReplyToggle}
            setViewReplyToggle={setViewReplyToggle}
            hideReplies={hideReplies}
            setHideReplies={setHideReplies}
          />
        </View>
      </ScrollView>
      <FeedCommentFormPost
        loggedEmployeeImage={profile?.data?.image}
        loggedEmployeeName={userSelector?.name}
        parentId={commentParentId}
        renderSuggestions={renderSuggestionsHandler}
        handleChange={commentContainUsernameHandler}
        formik={formik}
      />

      <ShareImage
        reference={sharePostScreenSheetRef}
        navigation={navigation}
        type="Post"
        // sharePost={sharePostToWhatsappHandler}
      />
      <ImageFullScreenModal
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        file_path={selectedPicture}
        setSelectedPicture={setSelectedPicture}
      />
      <SuccessModal
        isOpen={errorModalIsOpen}
        toggle={toggleErrorModal}
        type={requestType}
        title="Process error!"
        description="Please try again later"
      />
    </SafeAreaView>
  ) : null;
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
