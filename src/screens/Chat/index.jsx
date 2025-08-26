import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/core";

import { useSelector } from "react-redux";

import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import { SheetManager } from "react-native-actions-sheet";

import { useWebsocketContext } from "../../hoc/WebsocketContextProvider";
import { useFetch } from "../../hooks/useFetch";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useLoading } from "../../hooks/useLoading";
import axiosInstance from "../../config/api";
import RemoveConfirmationModal from "../../styles/modals/RemoveConfirmationModal";
import GlobalSearchInput from "../../components/Chat/GlobalSearchInput/GlobalSearchInput";
import GroupSection from "../../components/Chat/GroupSection/GroupSection";
import PersonalSection from "../../components/Chat/PersonalSection/PersonalSection";
import GlobalSearchChatSection from "../../components/Chat/GlobalSearchChatSection/GlobalSearchChatSection";
import ContactMenu from "../../components/Chat/ContactListItem/ContactMenu";
import { ErrorToastProps } from "../../styles/CustomStylings";
import {
  clearChatMessageHandler,
  deleteChatPersonal,
  groupDeleteHandler,
  pinChatHandler,
} from "../../components/Chat/shared/functions";
import AlertModal from "../../styles/modals/AlertModal";
import Screen from "../../layouts/Screen";
import { Colors } from "../../styles/Color";

const ChatList = () => {
  const [personalChats, setPersonalChats] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const { laravelEcho } = useWebsocketContext();
  const [globalKeyword, setGlobalKeyword] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage] = useState(1);

  const navigation = useNavigation();
  const userSelector = useSelector((state) => state.auth);

  const searchFromRef = useRef(null);
  const scrollRef = useRef(null);

  const { isOpen: deleteGroupModalIsOpen, toggle: toggleDeleteGroupModal } =
    useDisclosure(false);
  const { isOpen: deleteModalIsOpen, toggle: toggleDeleteModal } = useDisclosure(false);
  const { isOpen: clearChatMessageModalIsOpen, toggle: toggleClearChatMessageModal } =
    useDisclosure(false);
  const { isOpen: exitModalIsOpen, toggle: toggleExitModal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { isLoading: deleteChatMessageIsLoading, toggle: toggleDeleteChatMessage } =
    useLoading(false);
  const { isLoading: deleteGroupIsLoading, toggle: toggleDeleteGroup } =
    useLoading(false);
  const { isLoading: clearChatMessageIsLoading, toggle: toggleClearChatMessage } =
    useLoading(false);

  const personalChatOptions = [
    {
      id: 1,
      name: "New Chat",
      onPress: () => {
        navigation.navigate("New Chat");
        SheetManager.hide("form-sheet");
      },
    },
  ];

  /**
   * Event listener for new chats
   */
  const personalChatEvent = () => {
    laravelEcho
      .channel(`personal.list.${userSelector?.id}`)
      .listen(".personal.list", (event) => {
        setPersonalChats(event.data);
      });
  };

  /**
   * Event listener for new group chats
   */
  const groupChatEvent = () => {
    laravelEcho
      .channel(`group.list.${userSelector.id}`)
      .listen(".group.list", (event) => {
        setGroupChats(event.data);
      });
  };

  /**
   * Fetch all personal chats
   */
  const fetchPersonalChats = async () => {
    try {
      const res = await axiosInstance.get("/chat/personal");
      setPersonalChats(res.data.data);
    } catch (err) {
      console.log(err);
      Toast.show(err.response.data.message || "Network Error", ErrorToastProps);
    }
  };

  /**
   * Fetch all personal chats
   */
  const fetchGroupChats = async () => {
    try {
      const res = await axiosInstance.get("/chat/group");
      setGroupChats(res.data.data);
    } catch (err) {
      console.log(err);
      Toast.show(err.response.data.message || "Network Error", ErrorToastProps);
    }
  };

  const userFetchParameters = {
    page: currentPage,
    limit: 1000,
  };

  const { data: searchResult } = useFetch("/chat/global-search", [globalKeyword], {
    search: globalKeyword,
  });
  const { data: user } = useFetch("/chat/user", [currentPage], userFetchParameters);

  /**
   * Handle for mention name in group member
   */
  const memberName = user?.data?.data.map((item) => {
    return item?.name;
  });

  /**
   * Handle select message to open contact menu
   */
  const handleOpenChatMenu = (contact) => {
    setSelectedChat(contact);
    toggleDeleteModal();
  };
  const handleCloseChatMenu = () => {
    setSelectedChat(null);
    toggleDeleteModal();
  };

  /**
   * Handle clear chat message
   */
  const handleSelectChatToClear = (contact) => {
    setSelectedChat(contact);
    toggleClearChatMessageModal();
  };
  const handleCloseSelectedChatToClear = () => {
    setSelectedChat(null);
    toggleClearChatMessageModal();
  };

  /**
   * Handle delete group chat
   */
  const handleSelectGroupToDelete = (contact) => {
    setSelectedChat(contact);
    toggleDeleteGroupModal();
  };
  const handleCloseSelectedGroupToDelete = () => {
    setSelectedChat(null);
    toggleDeleteGroupModal();
  };

  /**
   * Handle open contact menu
   * @param {*} contact
   */
  const handleContactMenu = (contact) => {
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <ContactMenu
            contact={contact}
            toggleDeleteModal={handleOpenChatMenu}
            toggleDeleteGroupModal={handleSelectGroupToDelete}
            toggleClearChatMessage={handleSelectChatToClear}
            loggedInUser={userSelector?.id}
            toggleDeleteChatMessage={toggleDeleteChatMessage}
            toggleExitModal={toggleExitModal}
            deleteModalIsOpen={deleteModalIsOpen}
            exitModalIsOpen={exitModalIsOpen}
            deleteGroupModalIsOpen={deleteGroupModalIsOpen}
            deleteChatPersonal={deleteChatPersonal}
            deleteChatMessageIsLoading={deleteChatMessageIsLoading}
            chatRoomIsLoading={deleteGroupIsLoading}
            navigation={navigation}
          />
        ),
      },
    });
  };

  const handleDeletePersonalChat = () => {
    deleteChatPersonal(
      selectedChat?.id,
      toggleDeleteChatMessage,
      toggleDeleteModal,
      null,
      setRequestType,
      setErrorMessage,
      toggleAlert
    );
  };

  const handleDeleteGroup = () =>
    groupDeleteHandler(
      selectedChat?.id,
      toggleDeleteGroup,
      toggleDeleteGroupModal,
      null,
      setRequestType,
      setErrorMessage,
      toggleAlert
    );

  const handleClearChat = () =>
    clearChatMessageHandler(
      selectedChat?.id,
      selectedChat?.pin_group ? "group" : "personal",
      toggleClearChatMessage,
      toggleClearChatMessageModal,
      setRequestType,
      setErrorMessage,
      toggleAlert
    );

  useEffect(() => {
    fetchPersonalChats();
    fetchGroupChats();
  }, []);

  useEffect(() => {
    personalChatEvent();
    groupChatEvent();
  }, [userSelector.id, groupChats, personalChats]);

  // Removes chat room screen from stack if app opens by pressing push notification
  useEffect(() => {
    const { routes } = navigation.getState();

    const filteredRoutes = routes.filter((route) => route.name !== "Chat Room");

    navigation.reset({
      index: filteredRoutes.length - 1,
      routes: filteredRoutes,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 300);
  }, []);

  return isReady ? (
    <Screen
      screenTitle="Chats"
      returnButton={true}
      onPress={() => navigation.goBack()}
      backgroundColor={Colors.secondary}
    >
      <GlobalSearchInput
        globalKeyword={globalKeyword}
        setGlobalKeyword={setGlobalKeyword}
        searchFormRef={searchFromRef}
      />
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        <GroupSection
          groupChats={groupChats}
          searchKeyword={globalKeyword}
          searchResult={searchResult?.group}
          handleClickMore={handleContactMenu}
          onPinControl={pinChatHandler}
          navigation={navigation}
          userSelector={userSelector}
          setRequest={setRequestType}
          setError={setErrorMessage}
          toggleAlert={toggleAlert}
        />

        <PersonalSection
          personalChats={personalChats}
          searchKeyword={globalKeyword}
          searchResult={searchResult?.personal}
          handleClickMore={handleContactMenu}
          onPinControl={pinChatHandler}
          navigation={navigation}
          userSelector={userSelector}
          menuOptions={personalChatOptions}
          setRequest={setRequestType}
          setError={setErrorMessage}
          toggleAlert={toggleAlert}
        />

        {searchResult?.message?.length > 0 ? (
          <GlobalSearchChatSection
            searchResult={searchResult}
            globalKeyword={globalKeyword}
            memberName={memberName}
            navigation={navigation}
          />
        ) : null}
      </ScrollView>

      {selectedChat?.pin_personal ? (
        <RemoveConfirmationModal
          isLoading={deleteChatMessageIsLoading}
          isOpen={deleteModalIsOpen}
          toggle={handleCloseChatMenu}
          onPress={handleDeletePersonalChat}
          description="Are you sure want to delete this chat?"
        />
      ) : null}
      {selectedChat?.pin_group ? (
        <RemoveConfirmationModal
          isLoading={deleteGroupIsLoading}
          isOpen={deleteGroupModalIsOpen}
          toggle={handleCloseSelectedGroupToDelete}
          onPress={handleDeleteGroup}
          description="Are you sure want to delete this group?"
        />
      ) : null}

      <RemoveConfirmationModal
        isOpen={clearChatMessageModalIsOpen}
        toggle={handleCloseSelectedChatToClear}
        description="Are you sure want to clear chat?"
        isLoading={clearChatMessageIsLoading}
        onPress={handleClearChat}
      />

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={requestType === "remove" ? "Data removed!" : "Process error!"}
        description={
          requestType === "remove"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={requestType === "remove" ? "success" : "danger"}
      />
    </Screen>
  ) : null;
};

export default ChatList;
