import { useEffect, useState, useCallback, useRef } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import Pusher from "pusher-js/react-native";

import { SafeAreaView, StyleSheet, Platform } from "react-native";
import Toast from "react-native-root-toast";
import { SheetManager } from "react-native-actions-sheet";

import axiosInstance from "../../../config/api";
import { useKeyboardChecker } from "../../../hooks/useKeyboardChecker";
import { useWebsocketContext } from "../../../hoc/WebsocketContextProvider";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";
import ChatHeader from "../../../components/Chat/ChatHeader/ChatHeader";
import ChatInput from "../../../components/Chat/ChatInput/ChatInput";
import ChatList from "../../../components/Chat/ChatList/ChatList";
import ChatOptionMenu from "../../../components/Chat/ChatBubble/ChatOptionMenu";
import ChatMessageDeleteModal from "../../../components/Chat/ChatBubble/ChatMessageDeleteModal";
import ImageFullScreenModal from "../../../styles/modals/ImageFullScreenModal";
import RemoveConfirmationModal from "../../../styles/modals/RemoveConfirmationModal";
import { ErrorToastProps } from "../../../styles/CustomStylings";
import PickImage from "../../../styles/PickImage";
import { selectFile } from "../../../styles/SelectFIle";
import { CopyToClipboard } from "../../../styles/CopyToClipboard";
import {
  deleteChatPersonal,
  groupDeleteHandler,
  groupExitHandler,
  pinChatHandler,
} from "../../../components/Chat/shared/functions";
import ChatCalendar from "../../../components/Chat/ChatHeader/ChatCalendar";
import { useFetch } from "../../../hooks/useFetch";
import AlertModal from "../../../styles/modals/AlertModal";

const ChatRoom = () => {
  const [chatList, setChatList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [fileAttachment, setFileAttachment] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [bandAttachment, setBandAttachment] = useState(null);
  const [bandAttachmentType, setBandAttachmentType] = useState(null);
  const [messageToReply, setMessageToReply] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChatBubble, setSelectedChatBubble] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [placement, setPlacement] = useState(undefined);
  const [selectedChatToDelete, setSelectedChatToDelete] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [deleteMessageSelected, setDeleteMessageSelected] = useState(false);
  const [imageToShare, setImageToShare] = useState(null);
  const [searchChatVisible, setSearchChatVisible] = useState(false);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [monthChangeFilter, setMonthChangeFilter] = useState({
    month: dayjs().format("M"),
    year: dayjs().format("YYYY"),
  });
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  window.Pusher = Pusher;
  const { laravelEcho, setLaravelEcho } = useWebsocketContext();

  const { keyboardHeight } = useKeyboardChecker();

  const userSelector = useSelector((state) => state.auth);

  const route = useRoute();

  const currentDate = dayjs().format("DD-MM-YYYY");

  const {
    userId,
    name,
    roomId,
    image,
    position,
    email,
    type,
    active_member,
    isPinned,
    forwardedMessage,
    forwardedProject,
    forwardedTask,
    forwarded_file_path,
    forwarded_file_name,
    forwarded_file_size,
    forwarded_mime_type,
    attendance_today,
  } = route.params;

  const navigation = useNavigation();

  const searchFormRef = useRef(null);
  const calendarRef = useRef(null);

  const { isOpen: exitGroupModalIsOpen, toggle: toggleExitGroupModal } = useDisclosure(false);
  const { isOpen: deleteGroupModalIsOpen, toggle: toggleDeleteGroupModal } = useDisclosure(false);
  const { isOpen: deleteChatPersonalModalIsOpen, toggle: toggleDeleteChatPersonalModal } = useDisclosure(false);
  const { isOpen: optionIsOpen, toggle: toggleOption } = useDisclosure(false);
  const { isOpen: deleteModalChatIsOpen, toggle: toggleDeleteModalChat } = useDisclosure(false);
  const { isOpen: addImageModalIsOpen, toggle: toggleAddImageModal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { isLoading: deleteChatMessageIsLoading, toggle: toggleDeleteChatMessage } = useLoading(false);
  const { isLoading: exitGroupIsLoading, toggle: toggleExitGroup } = useLoading(false);
  const { isLoading: deleteGroupIsLoading, toggle: toggleDeleteGroup } = useLoading(false);
  const { isLoading: chatIsLoading, stop: stopLoadingChat, start: startLoadingChat } = useLoading(false);

  const dateFetchParameters = monthChangeFilter;

  const { data: projectDeadlines, isLoading: projectDeadlinesIsLoading } = useFetch(
    "/pm/projects/deadline",
    [monthChangeFilter],
    dateFetchParameters
  );
  const { data: holidays, isLoading: holidaysIsLoading } = useFetch(
    "/hr/holidays/calendar",
    [monthChangeFilter],
    dateFetchParameters
  );
  const { data: taskDeadlines, isLoading: taskDeadlinesIsLoading } = useFetch(
    "/pm/tasks/deadline",
    [monthChangeFilter],
    dateFetchParameters
  );
  const { data: leaves, isLoading: leavesIsLoading } = useFetch(
    "/hr/timesheets/personal",
    [monthChangeFilter],
    dateFetchParameters
  );

  const filteredLeave = leaves?.data.filter((item) => item?.att_type === "Leave");

  const allLoading = projectDeadlinesIsLoading || holidaysIsLoading || taskDeadlinesIsLoading || leavesIsLoading;

  const formattedDotColorProjects = {};
  const formattedDotColorTasks = {};
  const formattedDotColorHolidays = {};
  const formattedDotColorToday = {};
  const formattedDotColorLeaves = {};

  projectDeadlines?.data?.forEach((item) => {
    const date = item.date.split("-").reverse().join("-"); // Convert date format
    const key = `${date.slice(0, 7)}-01`; // Truncate to the first day of the month
    const value = {
      customStyles: {
        container: {
          backgroundColor: "#FFA800",
          borderRadius: 5,
        },
        text: {
          color: "#ffffff",
        },
      },
    };

    formattedDotColorProjects[key] = value;
  });

  taskDeadlines?.data?.forEach((item) => {
    const date = item.date.split("-").reverse().join("-"); // Convert date format
    const key = `${date.slice(0, 7)}-01`; // Truncate to the first day of the month
    const value = {
      customStyles: {
        container: {
          backgroundColor: "#FFA800",
          borderRadius: 5,
        },
        text: {
          color: "#FFFFFF",
        },
      },
    };

    formattedDotColorTasks[key] = value;
  });

  holidays?.data?.forEach((item) => {
    const date = item.date.split("-").reverse().join("-"); // Convert date format
    const value = {
      customStyles: {
        container: {
          backgroundColor: "#3DD04B",
          borderRadius: 5,
        },
        text: {
          color: "#FFFFFF",
        },
      },
    };

    formattedDotColorHolidays[date] = value;
  });

  filteredLeave?.forEach((item) => {
    const date = item.date;
    const value = {
      customStyles: {
        container: {
          backgroundColor: "#4688D5",
          borderRadius: 5,
        },
        text: {
          color: "#FFFFFF",
        },
      },
    };
    formattedDotColorLeaves[date] = value;
  });

  const date = currentDate.split("-").reverse().join("-");
  const value = {
    customStyles: {
      container: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 5,
      },
      text: {
        color: "#186688",
      },
    },
  };

  formattedDotColorToday[date] = value;

  const colorDots = {
    ...formattedDotColorProjects,
    ...formattedDotColorTasks,
    ...formattedDotColorHolidays,
    ...formattedDotColorToday,
    ...formattedDotColorLeaves,
  };

  /**
   * Handle for mention name in group member
   */
  const memberName = selectedGroupMembers.map((item) => {
    return item?.user?.name;
  });

  /**
   * Handle open chat options
   * @param {*} chat
   */
  const openChatBubbleHandler = (chat, placement) => {
    setSelectedChatBubble(chat);
    setPlacement(placement);
    toggleOption();
  };

  /**
   * Handle close chat options
   */
  const closeChatBubbleHandler = () => {
    if (Platform.OS === "android") {
      setSelectedChatBubble(null);
    } else {
      null;
    }
    toggleOption();
  };

  /**
   * Handle toggle fullscreen image
   */
  const toggleFullScreen = (chat) => {
    setSelectedChatBubble(chat);
    setIsFullScreen(!isFullScreen);
  };

  /**
   * Handle for delete Message
   */
  const openDeleteChatMessageHandler = () => {
    setSelectedChatToDelete(selectedChatBubble);
    toggleDeleteModalChat();
  };

  const updatePinHandler = () => {
    pinChatHandler(
      type,
      roomId,
      isPinned?.pin_chat ? "unpin" : "pin",
      navigation,
      setRequestType,
      setErrorMessage,
      toggleAlert
    );
    SheetManager.hide("form-sheet");
  };

  const deleteChatHandler = async () => {
    await SheetManager.hide("form-sheet");
    toggleDeleteChatPersonalModal();
  };

  const exitGroupHandler = async () => {
    await SheetManager.hide("form-sheet");
    toggleExitGroupModal();
  };

  const deleteGroupHandler = async () => {
    await SheetManager.hide("form-sheet");
    toggleDeleteGroupModal();
  };

  const searchChatHandler = () => {
    toggleChatSearch();
    SheetManager.hide("form-sheet");
  };

  /**
   * Handle for swipe ChatBubble
   * @param {*} message
   */
  const swipeToReply = (message) => {
    setMessageToReply(message);
  };

  /**
   * Handle for member name in chatHeader
   */
  const membersName = selectedGroupMembers.map((item) => {
    const name = !item?.user
      ? userSelector?.id === item?.id
        ? "You"
        : item?.name
      : userSelector?.id === item?.user?.id
      ? "You"
      : item?.user?.name;
    return `${name}`;
  });
  const concatenatedNames = membersName.join(", ");

  const toggleChatSearch = () => {
    setSearchChatVisible(!searchChatVisible);
  };

  /**
   * Event listener for new personal chat messages
   */
  const personalChatMessageEvent = () => {
    if (userSelector?.id && currentUser) {
      laravelEcho.channel(`personal.chat.${userSelector?.id}.${userId}`).listen(".personal.chat", (event) => {
        if (event.data.type === "New") {
          stopLoadingChat();
          setChatList((prevState) => [event.data, ...prevState]);
        } else {
          deleteChatFromChatMessages(event.data);
        }
      });
    }
  };

  /**
   * Event listener for new group chat messages
   */
  const groupChatMessageEvent = () => {
    if (userSelector?.id && currentUser) {
      laravelEcho.channel(`group.chat.${currentUser}.${userSelector?.id}`).listen(".group.chat", (event) => {
        if (event.data.type === "New") {
          stopLoadingChat();
          setChatList((prevState) => [event.data, ...prevState]);
        } else {
          deleteChatFromChatMessages(event.data);
        }
      });
    }
  };

  /**
   * Handle delete message event
   * @param {*} chatMessageObj
   */
  const deleteChatFromChatMessages = (chatMessageObj) => {
    setChatList((prevState) => {
      const index = prevState.findIndex((obj) => obj.id === chatMessageObj.id);
      if (chatMessageObj.type === "Delete For Me") {
        prevState.splice(index, 1);
      } else if (chatMessageObj.type === "Delete For Everyone") {
        const updatedState = [...prevState];
        updatedState[index] = {
          ...updatedState[index],
          delete_for_everyone: 1,
        };
        return updatedState;
      }
      return [...prevState];
    });
  };

  /**
   * Fetch Chat Messages
   * @param {*} type
   * @param {*} id
   * @param {*} setHasBeenScrolled
   */
  const fetchChatMessage = async (type, id, setHasBeenScrolled) => {
    if (hasMore && !isLoading) {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/chat/${type}/${id}/message`, {
          params: {
            offset: offset,
            limit: 50,
            sort: "desc",
            search: searchMessage,
          },
        });

        if (!searchMessage) {
          setChatList((currentChats) => {
            if (currentChats.length !== currentChats.length + res?.data?.data.length) {
              return [...currentChats, ...res?.data?.data];
            } else {
              setHasMore(false);
              return currentChats;
            }
          });
          setOffset((prevState) => prevState + 50);
          setFilteredSearch([]);
        } else {
          setFilteredSearch((currentChats) => {
            if (currentChats.length !== currentChats.length + res?.data?.data.length) {
              return [...currentChats, ...res?.data?.data];
            } else {
              setHasMore(false);
              return currentChats;
            }
          });
          setOffset((prevState) => prevState + 50);
          setChatList([]);
        }
      } catch (err) {
        console.log(err);
        Toast.show(err.response.data.message, ErrorToastProps);
      } finally {
        setIsLoading(false);
      }
    }
  };

  /**
   * Set all messages to read after opening up the chat
   * @param {*} type
   * @param {*} id
   */
  const messageReadHandler = async (type, id) => {
    try {
      await axiosInstance.get(`/chat/${type}/${id}/read-message`);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handle fetch members of selected group
   */
  const fetchSelectedGroupMembers = async () => {
    try {
      const res = await axiosInstance.get(`/chat/group/${roomId}/member`);
      setSelectedGroupMembers(res?.data?.data);
    } catch (err) {
      console.log(err);
      Toast.show(err.response.data.message, ErrorToastProps);
    }
  };

  /**
   * Handle submission of chat message
   */
  const { mutate, variables } = useMutation(
    (chat) => {
      startLoadingChat();
      return axiosInstance.post(`/chat/${type}/message`, chat, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
    },
    {
      onSettled: () => {
        if (currentUser === null) {
          setCurrentUser(res.data.data?.chat_personal_id);
        }
      },
      onError: (error) => {
        stopLoadingChat();
        console.log(error);
        Toast.show(error.response.data.message, ErrorToastProps);
      },
    }
  );

  const renderChats = chatIsLoading
    ? [
        {
          message: variables?._parts[3][1],
          from_user_id: userSelector.id,
          file_name: variables?._parts[4][1]?.name,
          file_path: variables?._parts[4][1]?.uri,
          mime_type: variables?._parts[4][1]?.type,
          project_id: variables?._parts[5][1],
          project_no: variables?._parts[6][1],
          project_title: variables?._parts[7][1],
          task_id: variables?._parts[8][1],
          task_no: variables?._parts[9][1],
          task_title: variables?._parts[10][1],
          isOptimistic: true,
        },
        ...chatList,
      ]
    : chatList;

  /**
   * Handle personal message delete
   * @param {*} chat_message_id
   * @param {*} delete_type
   * @param {*} setIsLoading
   */
  const messagedeleteHandler = async (chat_message_id, delete_type) => {
    try {
      toggleDeleteChatMessage();
      await axiosInstance.delete(`/chat/${type}/message/${delete_type}/${chat_message_id}`);
      toggleDeleteModalChat();
      toggleDeleteChatMessage();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleDeleteChatMessage();
    }
  };

  /**
   * Clean all state after change chat
   */
  const clearAdditionalContentActionState = () => {
    setFileAttachment(null);
    setBandAttachment(null);
    setBandAttachmentType(null);
    setMessageToReply(null);
  };

  /**
   * Trigger fetch all chat messages
   * @param {*} read
   */
  const fetchChatMessageHandler = (read) => {
    if (type === "personal") {
      if (currentUser) {
        fetchChatMessage(type, currentUser);
        if (read) {
          messageReadHandler(type, currentUser);
        }
      }
    } else if (type === "group") {
      if (currentUser) {
        fetchChatMessage(type, currentUser);
        if (read) {
          messageReadHandler(type, currentUser);
        }
      }
    }
  };

  /**
   * Handle confirmation modal for exit group and delete group
   */
  let modalIsOpen, toggleModal, modalDescription, onPressHandler;

  if (type === "personal") {
    modalIsOpen = deleteChatPersonalModalIsOpen;
    toggleModal = toggleDeleteChatPersonalModal;
    modalDescription = "Are you sure want to delete this chat?";
    onPressHandler = () =>
      deleteChatPersonal(
        roomId,
        toggleDeleteChatMessage,
        toggleDeleteChatPersonalModal,
        navigation,
        setRequestType,
        setErrorMessage,
        toggleAlert
      );
  } else if (type === "group") {
    if (active_member === 1) {
      modalIsOpen = exitGroupModalIsOpen;
      toggleModal = toggleExitGroupModal;
      modalDescription = "Are you sure want to exit this group?";
      onPressHandler = () =>
        groupExitHandler(
          roomId,
          toggleExitGroup,
          toggleExitGroupModal,
          navigation,
          setRequestType,
          setErrorMessage,
          toggleAlert
        );
    } else if (active_member === 0) {
      modalIsOpen = deleteGroupModalIsOpen;
      toggleModal = toggleDeleteGroupModal;
      modalDescription = "Are you sure want to delete this group?";
      onPressHandler = () =>
        groupDeleteHandler(
          roomId,
          toggleDeleteGroup,
          toggleDeleteGroupModal,
          navigation,
          setRequestType,
          setErrorMessage,
          toggleAlert
        );
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchChatMessageHandler(true);
    }
  }, [currentUser, type, isPinned]);

  useEffect(() => {
    fetchSelectedGroupMembers();
  }, [currentUser, roomId]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        /**
         * To reset all state
         */
        if (type === "personal") {
          laravelEcho.leaveChannel(`personal.chat.${userSelector?.id}.${roomId}`);
        } else {
          laravelEcho.leaveChannel(`group.chat.${userId}.${userSelector?.id}`);
        }
        setHasMore(true);
        setOffset(0);
        clearAdditionalContentActionState();
      };
    }, [])
  );

  useEffect(() => {
    /**
     * To fill all state
     */
    if (roomId) {
      setCurrentUser(roomId);
    }
    setHasMore(true);
    setOffset(0);
    clearAdditionalContentActionState();
    personalChatMessageEvent();
    groupChatMessageEvent();
  }, [roomId, currentUser]);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  }, []);

  /**
   * Handle return after create new message group or personal
   */
  useEffect(() => {
    const { routes } = navigation.getState();
    const filteredRoutes = routes.filter(
      (route) => route.name !== "New Chat" && route.name !== "Group Form" && route.name !== "Group Participant"
    );
    navigation.reset({
      index: filteredRoutes.length - 1,
      routes: filteredRoutes,
    });
  }, []);

  return isReady ? (
    <SafeAreaView style={[styles.container, { marginBottom: Platform.OS === "ios" && keyboardHeight }]}>
      <ChatHeader
        name={name}
        image={image}
        position={position}
        email={email}
        type={type}
        active_member={active_member}
        roomId={roomId}
        isPinned={isPinned}
        isLoading={isLoading}
        loggedInUser={userSelector?.id}
        onToggleDeleteModal={deleteChatHandler}
        onUpdatePin={updatePinHandler}
        navigation={navigation}
        searchMessage={searchMessage}
        setSearchMessage={setSearchMessage}
        searchFormRef={searchFormRef}
        onToggleExitModal={exitGroupHandler}
        onToggleDeleteGroupModal={deleteGroupHandler}
        toggleSearch={searchChatHandler}
        searchVisible={searchChatVisible}
        groupName={concatenatedNames}
        calendarRef={calendarRef}
        attendance_today={attendance_today}
      />

      <ChatList
        type={type}
        chatList={renderChats}
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        handleFetchChatMessage={fetchChatMessageHandler}
        bandAttachment={bandAttachment}
        setBandAttachment={setBandAttachment}
        bandAttachmentType={bandAttachmentType}
        isLoading={isLoading}
        handleOpenChatBubble={openChatBubbleHandler}
        onToggleFullScreen={toggleFullScreen}
        onSwipeToReply={swipeToReply}
        placement={placement}
        memberName={memberName}
        userSelector={userSelector}
        navigation={navigation}
        filteredSearch={filteredSearch}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
      />

      <ChatInput
        userId={userId}
        roomId={roomId}
        type={type}
        active_member={active_member}
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        bandAttachment={bandAttachment}
        setBandAttachment={setBandAttachment}
        bandAttachmentType={bandAttachmentType}
        setBandAttachmentType={setBandAttachmentType}
        messageToReply={messageToReply}
        setMessageToReply={setMessageToReply}
        onSendMessage={mutate}
        groupMember={selectedGroupMembers}
        navigation={navigation}
        selectFile={selectFile}
        onAddImage={toggleAddImageModal}
        name={name}
        image={image}
        position={position}
        email={email}
        isPinned={isPinned}
        memberName={memberName}
        forwardedMessage={forwardedMessage}
        forwardedProject={forwardedProject}
        forwardedTask={forwardedTask}
        forwarded_file_path={forwarded_file_path}
        forwarded_file_name={forwarded_file_name}
        forwarded_file_size={forwarded_file_size}
        forwarded_mime_type={forwarded_mime_type}
        setRequestType={setRequestType}
        setError={setErrorMessage}
        toggleAlert={toggleAlert}
      />

      <RemoveConfirmationModal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        description={modalDescription}
        onPress={() => onPressHandler()}
        isLoading={type === "group" && active_member === 1 ? exitGroupIsLoading : deleteGroupIsLoading}
      />

      <ImageFullScreenModal
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        file_path={selectedChatBubble}
        setSelectedPicture={setSelectedChatBubble}
        type="Chat"
        image={imageToShare}
        setImage={setImageToShare}
        navigation={navigation}
      />

      <ChatOptionMenu
        optionIsOpen={optionIsOpen}
        onClose={closeChatBubbleHandler}
        setMessageToReply={setMessageToReply}
        chat={selectedChatBubble}
        onToggleDeleteModal={openDeleteChatMessageHandler}
        placement={placement}
        deleteSelected={deleteMessageSelected}
        setDeleteSelected={setDeleteMessageSelected}
        copyToClipboard={CopyToClipboard}
        navigation={navigation}
      />

      <ChatMessageDeleteModal
        id={selectedChatToDelete?.id}
        isDeleted={selectedChatToDelete?.delete_for_everyone}
        deleteModalChatIsOpen={deleteModalChatIsOpen}
        onToggleDeleteModalChat={toggleDeleteModalChat}
        myMessage={userSelector?.id === selectedChatToDelete?.from_user_id}
        isLoading={deleteChatMessageIsLoading}
        onDeleteMessage={messagedeleteHandler}
        setDeleteSelected={setDeleteMessageSelected}
      />
      <ChatCalendar
        reference={calendarRef}
        colorDots={colorDots}
        holidays={holidays?.data}
        leaves={filteredLeave}
        dayjs={dayjs}
        projectDeadlines={projectDeadlines?.data}
        taskDeadlines={taskDeadlines?.data}
        setFilter={setMonthChangeFilter}
        allLoading={allLoading}
      />
      <PickImage
        setImage={setFileAttachment}
        modalIsOpen={addImageModalIsOpen}
        toggleModal={toggleAddImageModal}
        sheetManager={true}
      />

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        type={requestType === "reject" ? "warning" : "danger"}
        title="Process error!"
        description={errorMessage || "Please try again later"}
      />
    </SafeAreaView>
  ) : null;
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
