import { Pressable, StyleSheet, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../styles/CustomStylings";

const ActionSheet = ({
  toggleUserModal,
  editCheckAccess,
  projectData,
  refetch,
  deleteCheckAccess,
  toggleDeleteModal,
  navigation,
}) => {
  const handleChangeOwnership = async () => {
    await SheetManager.hide("form-sheet");
    toggleUserModal();
  };

  const handleEditProject = () => {
    navigation.navigate("Project Form", {
      projectData: projectData?.data,
      refetchSelectedProject: refetch,
    });
    SheetManager.hide("form-sheet");
  };

  const handleDeleteProject = async () => {
    await SheetManager.hide("form-sheet");
    toggleDeleteModal();
  };

  return (
    <View style={styles.menu}>
      <View style={styles.wrapper}>
        <Pressable onPress={handleChangeOwnership} style={styles.menuItem}>
          <Text style={[TextProps, { fontSize: 16 }]}>Change Ownership</Text>
          <MaterialCommunityIcons name="account-switch" size={20} color="#176688" />
        </Pressable>

        {editCheckAccess ? (
          <Pressable onPress={handleEditProject} style={styles.menuItem}>
            <Text style={[TextProps, { fontSize: 16 }]}>Edit</Text>
            <MaterialCommunityIcons name="file-edit" size={20} color="#176688" />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.wrapper}>
        {deleteCheckAccess ? (
          <Pressable onPress={handleDeleteProject} style={[styles.menuItem, { marginTop: 3 }]}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#EB0E29" }}>Delete</Text>
            <MaterialCommunityIcons name="trash-can-outline" color="#EB0E29" size={20} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default ActionSheet;

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
