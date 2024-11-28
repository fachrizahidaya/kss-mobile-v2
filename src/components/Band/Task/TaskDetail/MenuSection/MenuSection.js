import { memo, useState } from "react";

import { SheetManager } from "react-native-actions-sheet";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDisclosure } from "../../../../../hooks/useDisclosure";
import ConfirmationModal from "../../../../../styles/modals/ConfirmationModal";
import useCheckAccess from "../../../../../hooks/useCheckAccess";
import { TextProps } from "../../../../../styles/CustomStylings";
import AlertModal from "../../../../../styles/modals/AlertModal";
import { Colors } from "../../../../../styles/Color";

const MenuSection = ({ selectedTask, openEditForm, disabled, onTakeTask, navigation }) => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestType, setRequestType] = useState("");

  const { isOpen, toggle: toggleDeleteModal } = useDisclosure(false);
  const { isOpen: isSuccess, toggle: toggleSuccess } = useDisclosure(false);
  const editCheckAccess = useCheckAccess("update", "Tasks");
  const deleteCheckAccess = useCheckAccess("delete", "Tasks");

  const handleDeleteSuccess = () => {
    setTimeout(() => navigation.goBack(), 1000);
  };

  const renderOptionSheet = () =>
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.menu}>
            <View style={styles.wrapper}>
              <Pressable
                onPress={async () => {
                  await onTakeTask();
                  SheetManager.hide("form-sheet");
                }}
                style={styles.menuItem}
              >
                <Text style={[TextProps, { fontSize: 16 }]}>Take task</Text>
                <MaterialCommunityIcons name="playlist-play" size={20} color={Colors.primary} />
              </Pressable>
              {editCheckAccess ? (
                <Pressable
                  onPress={() => {
                    SheetManager.hide("form-sheet");
                    openEditForm();
                  }}
                  style={[styles.menuItem, { marginTop: 3 }]}
                >
                  <Text style={[TextProps, { fontSize: 16 }]}>Edit</Text>
                  <MaterialCommunityIcons name="file-edit" size={20} color={Colors.primary} />
                </Pressable>
              ) : null}
            </View>

            <View style={styles.wrapper}>
              {deleteCheckAccess ? (
                <Pressable
                  onPress={async () => {
                    await SheetManager.hide("form-sheet");
                    toggleDeleteModal();
                  }}
                  style={[styles.menuItem, { marginTop: 3 }]}
                >
                  <Text style={{ fontSize: 16, fontWeight: "700", color: "#EB0E29" }}>Remove</Text>
                  <MaterialCommunityIcons name="trash-can-outline" color="#EB0E29" size={20} />
                </Pressable>
              ) : null}
            </View>
          </View>
        ),
      },
    });

  return (
    <>
      <Pressable disabled={disabled} onPress={renderOptionSheet}>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={20}
          style={{ opacity: disabled ? 0.5 : 1 }}
          color={Colors.iconDark}
        />
      </Pressable>

      <ConfirmationModal
        isOpen={isOpen}
        toggle={toggleDeleteModal}
        apiUrl={`/pm/tasks/${selectedTask?.id}`}
        header="Remove Task"
        description={`Are you sure want to remove ${selectedTask?.title}?`}
        hasSuccessFunc
        onSuccess={handleDeleteSuccess}
        otherModal={true}
        toggleOtherModal={toggleSuccess}
        success={success}
        setSuccess={setSuccess}
        setError={setErrorMessage}
        setRequestType={setRequestType}
      />

      <AlertModal
        isOpen={isSuccess}
        toggle={toggleSuccess}
        title={requestType === "remove" ? "Task removed!" : "Process error!"}
        description={requestType === "remove" ? "Data successfully saved" : errorMessage || "Please try again later"}
        type={requestType === "remove" ? "success" : "danger"}
      />
    </>
  );
};

export default memo(MenuSection);

const styles = StyleSheet.create({
  menu: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  wrapper: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderWhite,
  },
});
