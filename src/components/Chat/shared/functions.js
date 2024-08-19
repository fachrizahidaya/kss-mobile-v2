import axiosInstance from "../../../config/api";

/**
 * Handle Exit group
 * @param {*} group_id
 */
export const groupExitHandler = async (
  group_id,
  toggleProcess,
  toggleModal,
  navigation,
  setRequest,
  setError,
  toggleAlert
) => {
  try {
    toggleProcess();
    await axiosInstance.post(`/chat/group/exit`, { group_id: group_id });
    toggleProcess();
    toggleModal();
    navigation.navigate("Chat List");
  } catch (err) {
    console.log(err);
    setRequest("error");
    setError(err.response.data.message);
    toggleAlert();
    toggleProcess();
  }
};

/**
 * Handle Delete group after exit group
 * @param {*} group_id
 */
export const groupDeleteHandler = async (
  group_id,
  toggleProcess,
  toggleModal,
  navigation,
  setRequest,
  setError,
  toggleAlert
) => {
  try {
    toggleProcess();
    await axiosInstance.delete(`/chat/group/${group_id}`);
    toggleModal();
    toggleProcess();
    if (navigation) {
      navigation.navigate("Chat List");
    }
  } catch (err) {
    console.log(err);
    setRequest("error");
    setError(err.response.data.message);
    toggleAlert();
    toggleProcess();
  }
};

/**
 * Handle clear chat
 * @param {*} id
 * @param {*} type
 * @param {*} itemName
 */
export const clearChatMessageHandler = async (
  id,
  type,
  toggleProcess,
  toggleModal,
  setRequest,
  setError,
  toggleAlert
) => {
  try {
    toggleProcess();
    await axiosInstance.delete(`/chat/${type}/${id}/message/clear`);
    toggleModal();
    toggleProcess();
  } catch (err) {
    console.log(err);
    setRequest("error");
    setError(err.response.data.message);
    toggleAlert();
    toggleProcess();
  }
};

/**
 * Handle Delete chat room personal
 * @param {*} id
 */
export const deleteChatPersonal = async (
  id,
  toggleProcess,
  toggleModal,
  navigation,
  setRequest,
  setError,
  toggleAlert
) => {
  try {
    toggleProcess();
    await axiosInstance.delete(`/chat/personal/${id}`);
    toggleModal();
    toggleProcess();
    if (navigation) {
      navigation.navigate("Chat List");
    }
  } catch (err) {
    console.log(err);
    setRequest("error");
    setError(err.response.data.message);
    toggleAlert();
    toggleProcess();
  }
};

/**
 * Handle chat pin update event
 *
 * @param {*} id - Personal chat id / Group chat id
 * @param {*} action - either pin/unpin
 */
export const pinChatHandler = async (chatType, id, action, navigation, setRequest, setError, toggleAlert) => {
  try {
    await axiosInstance.patch(`/chat/${chatType}/${id}/${action}`);
    if (navigation) {
      navigation.goBack();
    }
  } catch (err) {
    console.log(err);
    setRequest("error");
    setError(err.response.data.message);
    toggleAlert();
  }
};
