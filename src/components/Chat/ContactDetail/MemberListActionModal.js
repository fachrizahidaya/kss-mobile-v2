import { useState } from "react";

import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import Button from "../../../styles/forms/Button";
import { TextProps } from "../../../styles/CustomStylings";

const MemberListActionModal = ({
  memberListActionIsopen,
  handleToggleMemberListAction,
  memberId,
  memberName,
  memberAdminStatus,
  handleUpdateAdminStatus = () => {},
  handleToggleRemoveMemberAction,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  const handleWhenBackdropPress = () => {
    handleToggleMemberListAction();
    setShowConfirmationModal(false);
  };

  const handleWhenModalHide = () => {
    if (showConfirmationModal) {
      handleToggleRemoveMemberAction();
    }
  };

  const handleDismissAdmin = () => {
    handleUpdateAdminStatus(memberId, 1);
    handleToggleMemberListAction();
  };

  const handleMakeAdmin = () => {
    handleUpdateAdminStatus(memberId, 1);
    handleToggleMemberListAction();
    setShowConfirmationModal(false);
  };

  const handleRemoveMember = () => {
    handleToggleMemberListAction();
    setShowConfirmationModal(false);
  };

  return (
    <Modal
      isVisible={memberListActionIsopen}
      onBackdropPress={handleWhenBackdropPress}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      hideModalContentWhileAnimating={true}
      useNativeDriver={false}
      onModalHide={handleWhenModalHide}
    >
      <View style={styles.container}>
        <Text style={[{ fontSize: 12 }, TextProps]}>{memberName}</Text>
        {memberAdminStatus ? (
          <Button onPress={handleDismissAdmin} variant="outline" padding={10}>
            <Text style={[{ fontSize: 12 }, TextProps]}>Dismiss as Admin</Text>
          </Button>
        ) : (
          <Button onPress={handleMakeAdmin} variant="outline" padding={10}>
            <Text style={[{ fontSize: 12 }, TextProps]}>Make Group Admin</Text>
          </Button>
        )}
        <Button onPress={handleRemoveMember} variant="outline" padding={10}>
          <Text style={[{ fontSize: 12 }, TextProps]}>Remove from Group</Text>
        </Button>
      </View>
    </Modal>
  );
};

export default MemberListActionModal;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
  },
});
