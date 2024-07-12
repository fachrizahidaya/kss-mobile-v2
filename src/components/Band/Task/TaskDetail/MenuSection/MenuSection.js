import { memo } from "react";
import { useNavigation } from "@react-navigation/native";

import { SheetManager } from "react-native-actions-sheet";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDisclosure } from "../../../../../hooks/useDisclosure";
import ConfirmationModal from "../../../../../styles/modals/ConfirmationModal";
import useCheckAccess from "../../../../../hooks/useCheckAccess";
import { TextProps } from "../../../../../styles/CustomStylings";
import SuccessModal from "../../../../../styles/modals/SuccessModal";

const MenuSection = ({ selectedTask, openEditForm, disabled, onTakeTask }) => {
  const navigation = useNavigation();
  const { isOpen, toggle: toggleDeleteModal } = useDisclosure(false);
  const { isOpen: isSuccess, toggle: toggleSuccess } = useDisclosure(false);
  const editCheckAccess = useCheckAccess("update", "Tasks");
  const deleteCheckAccess = useCheckAccess("delete", "Tasks");

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={() =>
          SheetManager.show("form-sheet", {
            payload: {
              children: (
                <View style={styles.menu}>
                  <View style={styles.wrapper}>
                    <TouchableOpacity
                      onPress={async () => {
                        await onTakeTask();
                        SheetManager.hide("form-sheet");
                      }}
                      style={styles.menuItem}
                    >
                      <Text style={[TextProps, { fontSize: 16 }]}>Take task</Text>
                      <MaterialCommunityIcons name="playlist-play" size={20} color="#176688" />
                    </TouchableOpacity>
                    {editCheckAccess && (
                      <TouchableOpacity
                        onPress={() => {
                          SheetManager.hide("form-sheet");
                          openEditForm();
                        }}
                        style={[styles.menuItem, { marginTop: 3 }]}
                      >
                        <Text style={[TextProps, { fontSize: 16 }]}>Edit</Text>
                        <MaterialCommunityIcons name="file-edit" size={20} color="#176688" />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    {deleteCheckAccess && (
                      <TouchableOpacity
                        onPress={async () => {
                          await SheetManager.hide("form-sheet");
                          toggleDeleteModal();
                        }}
                        style={[styles.menuItem, { marginTop: 3 }]}
                      >
                        <Text style={{ fontSize: 16, fontWeight: 700, color: "#EB0E29" }}>Delete</Text>
                        <MaterialCommunityIcons name="trash-can-outline" color="#EB0E29" size={20} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ),
            },
          })
        }
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={20}
          style={{ opacity: disabled ? 0.5 : 1 }}
          color="#3F434A"
        />
      </TouchableOpacity>

      <ConfirmationModal
        isOpen={isOpen}
        toggle={toggleDeleteModal}
        apiUrl={`/pm/tasks/${selectedTask?.id}`}
        header="Delete Task"
        description={`Are you sure to delete ${selectedTask?.title}?`}
        hasSuccessFunc
        onSuccess={() => {
          setTimeout(() => navigation.goBack(), 1000);
        }}
        otherModal={true}
        toggleOtherModal={toggleSuccess}
      />

      <SuccessModal
        isOpen={isSuccess}
        toggle={toggleSuccess}
        title="Changes saved!"
        description="Data has successfully deleted"
        type="danger"
      />
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  wrapper: {
    backgroundColor: "#F5F5F5",
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
    borderBottomColor: "#fff",
  },
});

export default memo(MenuSection);
