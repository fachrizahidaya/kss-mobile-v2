import { View, Text, Pressable, Dimensions, Platform, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextProps } from "../../../styles/CustomStylings";

const ChatOptionMenu = ({
  optionIsOpen,
  handleClose,
  setMessageToReply,
  chat,
  handleToggleDeleteModal,
  placement,
  setDeleteSelected,
  deleteSelected,
  copyToClipboard,
  navigation,
}) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  const options = [
    {
      name: "Reply",
      icon: "reply-outline",
      onPress: () => {
        setMessageToReply(chat);
        handleClose();
      },
      color: "#176688",
    },
    {
      name: "Forward",
      icon: "share",
      onPress: () => {
        navigation.push("Forward Screen", {
          message: chat?.message,
          project: chat?.project,
          task: chat?.task,
          file_path: chat?.file_path,
          file_name: chat?.file_name,
          file_size: chat?.file_size,
          mime_type: chat?.mime_type,
        });
        handleClose();
      },
      color: "#176688",
    },
    {
      name: "Copy",
      icon: "content-copy",
      onPress: () => {
        copyToClipboard(chat?.message);
        handleClose();
      },
      color: "#176688",
    },
    // {
    //   name: "Report",
    //   icon: "alert-outline",
    //   onPress: null,
    //   color: "#FF0303",
    // },
    {
      name: "Delete",
      icon: "trash-can-outline",
      onPress: () => {
        if (Platform.OS === "android") {
          handleToggleDeleteModal();
          handleClose();
        } else {
          setDeleteSelected(true);
          handleClose();
        }
      },
      color: "#FF0303",
    },
  ];

  const handleBackdropPress = () => {
    handleClose();
    setDeleteSelected(false);
  };

  const handleWhenModalHide = () => {
    if (Platform.OS === "ios") {
      if (deleteSelected) {
        handleToggleDeleteModal();
      } else {
        null;
      }
    } else {
      null;
    }
  };

  return (
    <Modal
      isVisible={optionIsOpen}
      onBackdropPress={handleBackdropPress}
      backdropColor="#272A2B"
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      hideModalContentWhileAnimating={true}
      useNativeDriver={false}
      onModalHide={handleWhenModalHide}
    >
      <View style={[styles[placement], { width: 200 }]}>
        <View style={{ backgroundColor: "#FFFFFF", padding: 15, gap: 10, borderRadius: 15 }}>
          {options.map((option, index) => {
            return (
              <Pressable key={index} onPress={option.onPress} style={styles.wrapper}>
                <Text style={[{ fontSize: 16 }, TextProps]}>{option.name}</Text>
                <MaterialCommunityIcons name={option.icon} size={25} color={option.color} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default ChatOptionMenu;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#F6F6F6",
  },
});
