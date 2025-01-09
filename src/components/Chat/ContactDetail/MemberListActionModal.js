import { useState } from "react";

import { Text } from "react-native";

import Button from "../../../styles/forms/Button";
import { TextProps } from "../../../styles/CustomStylings";
import CustomModal from "../../../styles/modals/CustomModal";

const MemberListActionModal = ({
  memberListActionIsopen,
  handleToggleMemberListAction,
  memberId,
  memberName,
  memberAdminStatus,
  handleUpdateAdminStatus,
  handleToggleRemoveMemberAction,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
    handleUpdateAdminStatus(memberId, 0);
    handleToggleMemberListAction();
  };

  const handleMakeAdmin = () => {
    handleUpdateAdminStatus(memberId, 1);
    handleToggleMemberListAction();
    setShowConfirmationModal(false);
  };

  const handleRemoveMember = () => {
    handleToggleMemberListAction();
    setShowConfirmationModal(true);
  };

  return (
    <CustomModal
      isOpen={memberListActionIsopen}
      toggle={handleWhenBackdropPress}
      hideModalContentWhileAnimating={true}
      handleAfterModalHide={handleWhenModalHide}
    >
      <Text style={[{ fontSize: 12 }, TextProps]}>{memberName}</Text>
      {memberAdminStatus ? (
        <Button onPress={handleDismissAdmin} variant="outline">
          <Text style={[TextProps]}>Dismiss as Admin</Text>
        </Button>
      ) : (
        <Button onPress={handleMakeAdmin} variant="outline">
          <Text style={[TextProps]}>Make Group Admin</Text>
        </Button>
      )}
      <Button onPress={handleRemoveMember} variant="outline">
        <Text style={[TextProps]}>Remove from Group</Text>
      </Button>
    </CustomModal>
  );
};

export default MemberListActionModal;
