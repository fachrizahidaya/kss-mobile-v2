import { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import _ from "lodash";

import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";
import { useFetch } from "../../../hooks/useFetch";
import { ErrorToastProps } from "../../../styles/CustomStylings";
import axiosInstance from "../../../config/api";
import RemoveConfirmationModal from "../../../styles/modals/RemoveConfirmationModal";
import UserListModal from "../../../components/Chat/ContactDetail/UserListModal";
import MemberListActionModal from "../../../components/Chat/ContactDetail/MemberListActionModal";
import ContactAvatar from "../../../components/Chat/ContactDetail/ContactAvatar";
import ContactInformation from "../../../components/Chat/ContactDetail/ContactInformation";
import ContactAction from "../../../components/Chat/ContactDetail/ContactAction";
import ContactMedia from "../../../components/Chat/ContactDetail/ContactMedia";
import ContactPersonalized from "../../../components/Chat/ContactDetail/ContactPersonalized";
import {
  clearChatMessageHandler,
  groupDeleteHandler,
  groupExitHandler,
} from "../../../components/Chat/shared/functions";
import AlertModal from "../../../styles/modals/AlertModal";
import { Colors } from "../../../styles/Color";

const ContactDetail = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [memberId, setMemberId] = useState();
  const [memberName, setMemberName] = useState(null);
  const [memberAdminStatus, setMemberAdminStatus] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [forceRerender, setForceRerender] = useState(false);
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [cumulativeData, setCumulativeData] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  const { name, image, position, type, loggedInUser, active_member, roomId } =
    route.params;

  const { isOpen: memberListIsopen, toggle: toggleMemberList } = useDisclosure(false);
  const { isOpen: memberListActionIsopen, toggle: toggleMemberListAction } =
    useDisclosure(false);
  const { isOpen: removeMemberActionIsopen, toggle: toggleRemoveMemberAction } =
    useDisclosure(false);
  const { isOpen: clearChatMessageModalIsOpen, toggle: toggleClearChatMessageModal } =
    useDisclosure(false);
  const { isOpen: deleteGroupModalIsOpen, toggle: toggleDeleteGroupModal } =
    useDisclosure(false);
  const { isOpen: exitGroupModalIsOpen, toggle: toggleExitGroupModal } =
    useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { isLoading: removeMemberIsLoading, toggle: toggleRemoveMember } =
    useLoading(false);
  const { isLoading: addMemberIsLoading, toggle: toggleAddMember } = useLoading(false);
  const { isLoading: clearChatMessageIsLoading, toggle: toggleClearChatMessage } =
    useLoading(false);
  const { isLoading: exitGroupIsLoading, toggle: toggleExitGroup } = useLoading(false);
  const { isLoading: deleteGroupIsLoading, toggle: toggleDeleteGroup } =
    useLoading(false);

  const fetchUserParameters = {
    page: currentPage,
    search: searchInput,
    limit: 50,
  };

  const {
    data: userList,
    isLoading: userListIsLoading,
    refetch: refetchUserList,
  } = useFetch(
    memberListIsopen && "/chat/user",
    [currentPage, searchInput],
    fetchUserParameters
  );

  /**
   * Handle Fetch media for pictures and docs
   */
  const { data: media } = useFetch(`/chat/${type}/${roomId}/media`);
  const { data: document } = useFetch(`/chat/${type}/${roomId}/docs`);

  const fetchMorUser = () => {
    if (currentPage < userList?.data?.last_page) {
      setCurrentPage(currentPage + 1);
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
      Toast.show(err.response.data.message || "Network Error", ErrorToastProps);
    }
  };

  var renderTitle;

  if (requestType === "post") {
    renderTitle = "Data added!";
  } else if (requestType === "remove") {
    renderTitle = "Data removed!";
  } else {
    renderTitle = "Process error!";
  }

  var renderDescription;

  if (requestType === "post") {
    renderDescription = "Data successfully saved";
  } else if (requestType === "remove") {
    renderDescription = "Data successfully saved";
  } else {
    renderDescription = errorMessage || "Please try again leter";
  }

  var renderType;

  if (requestType === "post") {
    renderType = "info";
  } else if (requestType === "remove") {
    renderType = "success";
  } else {
    renderType = "danger";
  }

  const deleteMemberHandler = () => {
    handleDeleteMember(memberId);
  };

  /**
   * Handle group member add event
   *
   * @param {*} data
   */
  const handleAddMember = async (group_id, new_members) => {
    try {
      toggleAddMember();
      const res = await axiosInstance.post(`/chat/group/member`, {
        group_id: group_id,
        member: new_members,
      });
      setCumulativeData([]);
      setFilteredDataArray([]);
      setSelectedUsers([]);
      fetchSelectedGroupMembers();
      refetchUserList();
      toggleAddMember();
      toggleMemberList();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleAddMember();
    }
  };

  /**
   * Handle group member admin status changes event
   *
   * @param {*} group_member_id
   * @param {*} data
   */
  const handleUpdateMember = async (group_member_id, data) => {
    try {
      const res = await axiosInstance.patch(`/chat/group/member/${group_member_id}`, {
        is_admin: data,
      });
      fetchSelectedGroupMembers();
      refetchUserList();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setErrorMessage(err.response.data.message);
      toggleAlert();
    }
  };

  /**
   * Handle group member removal event
   *
   * @param {*} group_member_id
   */
  const handleDeleteMember = async (group_member_id, item_name) => {
    try {
      toggleRemoveMember();
      const res = await axiosInstance.delete(`/chat/group/member/${group_member_id}`);
      setCumulativeData([]);
      setFilteredDataArray([]);
      fetchSelectedGroupMembers();
      toggleRemoveMember();
      toggleRemoveMemberAction();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleRemoveMember();
    }
  };

  /**
   * Handle filter from member registered for add new member to group
   * @param {*} users
   * @returns
   */
  const handleFilterUsers = (users) => {
    if (selectedGroupMembers && selectedUsers) {
      const allSelectedMembers = [...selectedGroupMembers, ...selectedUsers];

      return users?.filter((user) => {
        return !allSelectedMembers.some((groupMember) => {
          return groupMember?.user_id === user?.id;
        });
      });
    } else {
      return users;
    }
  };

  const handleSearch = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  /**
   * Handle select new member to the group
   * @param {*} user
   */
  const handleAddSelectedUser = (user) => {
    setSelectedUsers((prevState) => {
      if (!prevState?.find((val) => val.id === user.id)) {
        return [...prevState, { ...user, user_id: user?.id, is_admin: 0 }];
      }
      return prevState;
    });
    setForceRerender((prev) => !prev);
  };

  const handleRemoveSelectedUser = (user) => {
    const newUserArray = selectedUsers?.filter((val) => {
      return val.id !== user.id;
    });
    setSelectedUsers(newUserArray);
    setForceRerender((prev) => !prev);
  };

  const handleClearChat = () => {
    clearChatMessageHandler(
      roomId,
      type,
      toggleClearChatMessage,
      toggleClearChatMessageModal,
      setRequestType,
      setErrorMessage,
      toggleAlert
    );
    navigation.navigate("Chat List");
  };

  /**
   * Handle confirmation modal for exit group and delete group
   */
  let modalIsOpen, toggleModal, modalDescription, onPressHandler;

  if (type === "group") {
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
    const myMemberObj = selectedGroupMembers?.find(
      (groupMember) => groupMember.user_id === loggedInUser
    );
    setCurrentUserIsAdmin(myMemberObj?.is_admin ? true : false);
  }, [selectedGroupMembers, loggedInUser]);

  useEffect(() => {
    fetchSelectedGroupMembers();
  }, [roomId]);

  useEffect(() => {
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (userList?.data?.data?.length) {
      if (!searchInput) {
        setCumulativeData((prevData) => [
          ...prevData,
          ...handleFilterUsers(userList?.data?.data),
        ]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [
          ...prevData,
          ...handleFilterUsers(userList?.data?.data),
        ]);
        setCumulativeData([]);
      }
    }
  }, [userList, searchInput, selectedGroupMembers]);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 300);
  }, []);

  return isReady ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={20} color={Colors.iconDark} />
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {type === "personal" ? "Contact Info" : "Group Info"}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <ContactAvatar
          navigation={navigation}
          roomId={roomId}
          type={type}
          name={name}
          image={image}
          position={position}
          currentUserIsAdmin={currentUserIsAdmin}
        />

        <ContactInformation
          type={type}
          selectedGroupMembers={selectedGroupMembers}
          loggedInUser={loggedInUser}
          handleToggleMemberList={toggleMemberList}
          currentUserIsAdmin={currentUserIsAdmin}
          handleToggleMemberListAction={toggleMemberListAction}
          setMemberId={setMemberId}
          setMemberName={setMemberName}
          setMemberAdminStatus={setMemberAdminStatus}
        />

        <ContactMedia
          qty={media?.data?.length + document?.data?.length}
          media={media?.data}
          docs={document?.data}
          navigation={navigation}
        />

        {/* <ContactPersonalized /> */}

        <ContactAction
          type={type}
          active_member={active_member}
          handleToggleClearChatMessage={toggleClearChatMessageModal}
          handleToggleExitModal={toggleExitGroupModal}
          handleToggleDeleteGroupModal={toggleDeleteGroupModal}
        />
      </View>

      {/* Confirmation modal to delete personal chat or exit group */}
      <RemoveConfirmationModal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        description={modalDescription}
        onPress={onPressHandler}
        isLoading={
          type === "group" && active_member === 1
            ? exitGroupIsLoading
            : deleteGroupIsLoading
        }
      />

      {/* Confirmation modal to remove member from group */}
      <RemoveConfirmationModal
        isOpen={removeMemberActionIsopen}
        toggle={toggleRemoveMemberAction}
        description="Are you sure want to remove member from group?"
        onPress={deleteMemberHandler}
        isLoading={removeMemberIsLoading}
      />

      {/* Confirmation modal to clear chat */}
      <RemoveConfirmationModal
        isOpen={clearChatMessageModalIsOpen}
        toggle={toggleClearChatMessageModal}
        description="Are you sure want to clear chat?"
        isLoading={clearChatMessageIsLoading}
        onPress={handleClearChat}
      />

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={renderTitle}
        description={renderDescription}
        type={renderType}
      />

      {/* If user as group admin, user can add member, delete member, etc. */}
      <UserListModal
        roomId={roomId}
        memberListIsopen={memberListIsopen}
        handleToggleMemberList={toggleMemberList}
        handleToggleAddMember={toggleAddMember}
        handleSearch={handleSearch}
        inputToShow={inputToShow}
        setInputToShow={setInputToShow}
        setSearchInput={setSearchInput}
        fetchMoreData={fetchMorUser}
        cumulativeData={cumulativeData}
        filteredDataArray={filteredDataArray}
        userListIsLoading={userListIsLoading}
        handlePressAdd={handleAddSelectedUser}
        handlePressRemove={handleRemoveSelectedUser}
        selectedUsers={selectedUsers}
        forceRerender={forceRerender}
        handleAddMoreMember={handleAddMember}
        addMemberIsLoading={addMemberIsLoading}
      />
      <MemberListActionModal
        memberListActionIsopen={memberListActionIsopen}
        handleToggleMemberListAction={toggleMemberListAction}
        memberId={memberId}
        setMemberId={setMemberId}
        memberName={memberName}
        setMemberName={setMemberName}
        memberAdminStatus={memberAdminStatus}
        setMemberAdminStatus={setMemberAdminStatus}
        handleUpdateAdminStatus={handleUpdateMember}
        currentUserIsAdmin={currentUserIsAdmin}
        handleToggleRemoveMemberAction={toggleRemoveMemberAction}
      />
    </SafeAreaView>
  ) : null;
};

export default ContactDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    position: "relative",
    gap: 10,
    backgroundColor: Colors.backgroundLight,
  },
});
