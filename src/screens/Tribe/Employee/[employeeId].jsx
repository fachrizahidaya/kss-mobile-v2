import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useFormik } from "formik";

import { Pressable, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { useFetch } from "../../../hooks/useFetch";
import { useDisclosure } from "../../../hooks/useDisclosure";
import axiosInstance from "../../../config/api";
import ImageFullScreenModal from "../../../styles/modals/ImageFullScreenModal";
import PostCard from "../../../components/Tribe/Employee/Feed/PostCard";
import PostComment from "../../../components/Tribe/Employee/Feed/PostComment";
import EmployeeTeammates from "../../../components/Tribe/Employee/EmployeeTeammates";
import AlertModal from "../../../styles/modals/AlertModal";
import EditPost from "../../../components/Tribe/Employee/Feed/EditPost";
import RemoveConfirmationModal from "../../../styles/modals/RemoveConfirmationModal";
import { useLoading } from "../../../hooks/useLoading";
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
import { pickImageHandler } from "../../../styles/buttons/PickImage";
import Screen from "../../../layouts/Screen";

const EmployeeProfileScreen = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [reloadPost, setReloadPost] = useState(false);
  const [reloadComment, setReloadComment] = useState(false);
  const [currentOffsetPost, setCurrentOffsetPost] = useState(0);
  const [currentOffsetComment, setCurrentOffsetComment] = useState(0);
  const [postId, setPostId] = useState(null);
  const [forceRerender, setForceRerender] = useState(false);
  const [commentParentId, setCommentParentId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [image, setImage] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [inputToShow, setInputToShow] = useState("");
  const [filteredType, setFilteredType] = useState([]);
  const [teammatesData, setTeammatesData] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [requestType, setRequestType] = useState("");
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const { employeeId, loggedEmployeeImage, loggedEmployeeId } = route.params;

  const commentsScreenSheetRef = useRef(null);
  const teammatesScreenSheetRef = useRef(null);

  const { isOpen: deleteModalIsOpen, toggle: toggleDeleteModal } =
    useDisclosure(false);
  const { isOpen: editModalIsOpen, toggle: toggleEditModal } =
    useDisclosure(false);
  const { isOpen: updatePostModalIsOpen, toggle: toggleUpdatePostModal } =
    useDisclosure(false);
  const { isOpen: deletePostModalIsOpen, toggle: toggleDeletePostModal } =
    useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { toggle: toggleDeletePost, isLoading: deletePostIsLoading } =
    useLoading(false);

  const userSelector = useSelector((state) => state.auth);
  const menuSelector = useSelector((state) => state.user_menu.user_menu.menu);

  const checkAccess = menuSelector[1].sub[2]?.actions.create_announcement;

  const fetchTeammatesParameters = {
    search: searchInput,
  };

  const { data: employee } = useFetch(`/hr/employees/${employeeId}`);

  const postFetchParameters = {
    offset: currentOffsetPost,
    limit: 10,
  };

  const {
    data: personalPost,
    refetch: refetchPersonalPost,
    isFetching: personalPostIsFetching,
    isLoading: personalPostIsLoading,
  } = useFetch(
    `/hr/posts/personal/${employee?.data?.id}`,
    [reloadPost, currentOffsetPost],
    postFetchParameters
  );

  const { data: singlePost } = useFetch(`/hr/posts/${selectedPost}`);
  const { data: teammates } = useFetch(
    `/hr/employees/${employeeId}/team`,
    [searchInput],
    fetchTeammatesParameters
  );
  const { data: profile } = useFetch("/hr/my-profile");
  const { data: employees } = useFetch("/hr/employees");

  const commentsFetchParameters = {
    offset: currentOffsetComment,
    limit: 10,
  };

  const {
    data: comment,
    isFetching: commentIsFetching,
    isLoading: commentIsLoading,
    refetch: refetchComment,
  } = useFetch(
    `/hr/posts/${postId}/comment`,
    [reloadComment, currentOffsetComment],
    commentsFetchParameters
  );

  /**
   * Handle fetch more Comments
   * After end of scroll reached, it will added other earlier comments
   */
  const commentEndReachedHandler = () => {
    if (comments.length !== comments.length + comment?.data.length) {
      setCurrentOffsetComment(currentOffsetComment + 10);
    }
  };

  /**
   * Handle Fetch more Posts
   * After end of scroll reached, it will added other earlier posts
   */
  const postEndReachedHandler = () => {
    if (posts.length !== posts.length + personalPost?.data.length) {
      setCurrentOffsetPost(currentOffsetPost + 10);
    }
  };

  /**
   * Handle fetch post from first offset
   * After create a new post or comment, it will return to the first offset
   */
  const postRefetchHandler = () => {
    setCurrentOffsetPost(0);
    setReloadPost(!reloadPost);
  };

  /**
   * Handle open option selected post
   */
  const openSelectedPersonalPostHandler = useCallback((post) => {
    setSelectedPost(post);
  }, []);

  /**
   * Handle close option selected post
   */
  const closeSelectedPersonalPostHandler = () => {
    setSelectedPost(null);
    setImagePreview(null);
    toggleEditModal();
  };

  const openSelectedPersonalPostToReportHandler = useCallback((post) => {
    setSelectedPost(post);
  }, []);

  /**
   * Handle search teammates
   */
  const searchTeammatesHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
    }, 300),
    []
  );

  /**
   * Handle edit a post
   * @param {*} form
   * @param {*} setSubmitting
   * @param {*} setStatus
   */
  const editPostHandler = async (form, setSubmitting, setStatus) => {
    try {
      await axiosInstance.post(`/hr/posts/${selectedPost}`, form, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setSubmitting(false);
      setStatus("success");
      setPosts([]);
      postRefetchHandler();
      setRequestType("patch");
      toggleAlert();
      toggleUpdatePostModal();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      setRequestType("error");
      toggleAlert();
      setSubmitting(false);
      setStatus("error");
    }
  };

  const deletePostHandler = async () => {
    try {
      toggleDeletePost();
      await axiosInstance.delete(`/hr/posts/${selectedPost}`);
      setPosts([]);
      postRefetchHandler();
      toggleDeletePost();
      setRequestType("remove");
      toggleDeleteModal();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      setRequestType("error");
      toggleDeletePost();
    }
  };

  /**
   * Handle show username in post
   */
  const objectContainEmployeeUsernameHandler = employees?.data?.map(
    (item, index) => {
      return {
        username: item.username,
        id: item.id,
        name: item.name,
      };
    }
  );

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
  const renderSuggestionsHandler = ({ keyword, onSuggestionPress }) => {
    if (keyword == null || keyword === "@@" || keyword === "@#") {
      return null;
    }
    const data = employeeData.filter((one) =>
      one.name.toLowerCase().includes(keyword.toLowerCase())
    );

    return (
      <View style={{ height: 100 }}>
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
              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>
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
        setCurrentOffsetComment,
        setReloadComment,
        reloadComment,
        posts,
        postId,
        setForceRerender,
        forceRerender
      );
    },
  });

  useEffect(() => {
    setFilteredType([]);
  }, [searchInput]);

  useEffect(() => {
    if (teammates?.data.length) {
      if (!searchInput) {
        setTeammatesData((prevData) => [...prevData, ...teammates?.data]);
        setFilteredType([]);
      } else {
        setFilteredType((prevData) => [...prevData, ...teammates?.data]);
        setTeammatesData([]);
      }
    }
  }, [teammates]);

  useEffect(() => {
    if (personalPost?.data && personalPostIsFetching === false) {
      if (currentOffsetPost === 0) {
        setPosts(personalPost?.data);
      } else {
        setPosts((prevData) => [...prevData, ...personalPost?.data]);
      }
    }
  }, [personalPostIsFetching, reloadPost]);

  useEffect(() => {
    if (!openCommentHandler) {
      setCommentParentId(null);
      setComments([]);
    } else {
      if (comment?.data && commentIsFetching === false) {
        if (currentOffsetComment === 0) {
          setComments(comment?.data);
        } else {
          setComments((prevData) => [...prevData, ...comment?.data]);
        }
      }
    }
  }, [commentIsFetching, commentParentId, reloadComment]);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  });

  return (
    <Screen
      screenTitle={
        employee?.data?.name.length > 30
          ? employee?.data?.name.split(" ")[0]
          : employee?.data?.name
      }
      returnButton={true}
      onPress={() => navigation.goBack()}
    >
      {isReady ? (
        <>
          {/* Content here */}
          <PostCard
            posts={posts}
            loggedEmployeeId={loggedEmployeeId}
            loggedEmployeeImage={loggedEmployeeImage}
            postEndReachedHandler={postEndReachedHandler}
            personalPostIsFetching={personalPostIsFetching}
            refetchPersonalPost={refetchPersonalPost}
            employee={employee}
            teammates={teammates}
            hasBeenScrolled={hasBeenScrolled}
            setHasBeenScrolled={setHasBeenScrolled}
            handleToggleComment={openCommentHandler}
            forceRerender={forceRerender}
            setForceRerender={setForceRerender}
            personalPostIsLoading={personalPostIsLoading}
            handleToggleFullScreen={toggleFullScreenImageHandler}
            openSelectedPersonalPostHandler={openSelectedPersonalPostHandler}
            employeeUsername={objectContainEmployeeUsernameHandler}
            userSelector={userSelector}
            handleToggleDeleteModal={toggleDeleteModal}
            handleToggleEditModal={toggleEditModal}
            handleToggleReportModal={toggleAlert}
            reference={teammatesScreenSheetRef}
            navigation={navigation}
            postRefetchHandler={postRefetchHandler}
            handlePressLink={pressLinkHandler}
            handleToggleLike={likePostHandler}
            setPostId={setPostId}
            commentScreenSheetRef={commentsScreenSheetRef}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            setSelectedPicture={setSelectedPicture}
            handleToggleReport={openSelectedPersonalPostToReportHandler}
          />

          <PostComment
            loggedEmployeeName={userSelector?.name}
            loggedEmployeeImage={profile?.data?.image}
            comments={comments}
            commentIsFetching={commentIsFetching}
            commentIsLoading={commentIsLoading}
            refetchComment={refetchComment}
            handleClose={closeCommentHandler}
            handleEndReached={commentEndReachedHandler}
            commentRefetchHandler={refetchCommentHandler}
            parentId={commentParentId}
            handleReply={replyCommentHandler}
            employeeUsername={objectContainEmployeeUsernameHandler}
            reference={commentsScreenSheetRef}
            handlePressLink={pressLinkHandler}
            formik={formik}
            commentContainUsernameHandler={commentContainUsernameHandler}
            handleSuggestions={renderSuggestionsHandler}
            reloadComment={reloadComment}
            setReloadComment={setReloadComment}
            setCurrentOffsetComments={setCurrentOffsetComment}
            setPostId={setPostId}
            setCommentParentId={setCommentParentId}
            setComments={setComments}
          />
        </>
      ) : null}
      <ImageFullScreenModal
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        file_path={selectedPicture}
        setSelectedPicture={setSelectedPicture}
        type="Feed"
      />
      <EditPost
        isVisible={editModalIsOpen}
        handleBackdrop={closeSelectedPersonalPostHandler}
        employees={employees?.data}
        content={singlePost?.data}
        image={image}
        setImage={setImage}
        postEditHandler={editPostHandler}
        pickImageHandler={pickImageHandler}
        checkAccess={checkAccess}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        updatePostModalIsOpen={updatePostModalIsOpen}
        toggleUpdatePostModal={toggleUpdatePostModal}
        requestType={requestType}
        errorMessage={errorMessage}
      />
      <RemoveConfirmationModal
        toggle={toggleDeleteModal}
        isOpen={deleteModalIsOpen}
        isLoading={deletePostIsLoading}
        description="Are you sure to delete this post?"
        onPress={deletePostHandler}
        toggleOtherModal={toggleDeletePostModal}
        success={success}
        setSuccess={setSuccess}
      />
      <EmployeeTeammates
        teammates={filteredType.length > 0 ? filteredType : teammatesData}
        reference={teammatesScreenSheetRef}
        handleSearch={searchTeammatesHandler}
        inputToShow={inputToShow}
        setInputToShow={setInputToShow}
        setSearchInput={setSearchInput}
      />

      <AlertModal
        isOpen={deletePostModalIsOpen}
        toggle={toggleDeletePostModal}
        type={requestType === "remove" ? "success" : "danger"}
        title={requestType === "remove" ? "Changes saved!" : "Process error!"}
        description={
          requestType === "remove"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
      />

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Report submitted!" : "Process error!"}
        description={
          requestType === "post"
            ? "Your report is logged"
            : errorMessage || "Please try again later"
        }
      />
    </Screen>
  );
};

export default EmployeeProfileScreen;
