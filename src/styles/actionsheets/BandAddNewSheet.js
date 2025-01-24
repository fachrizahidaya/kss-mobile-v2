import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import useCheckAccess from "../../hooks/useCheckAccess";
import { TextProps } from "../CustomStylings";
import CustomSheet from "../../layouts/CustomSheet";
import { Colors } from "../Color";
import AlertModal from "../modals/AlertModal";
import { useDisclosure } from "../../hooks/useDisclosure";

const BandAddNewSheet = (props) => {
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const createProjectAccess = useCheckAccess("create", "Projects");
  const createTaskAccess = useCheckAccess("create", "Tasks");
  const createNoteAccess = useCheckAccess("create", "Notes");

  const { isOpen: isSuccessProject, toggle: toggleSuccessProject } =
    useDisclosure(false);
  const { isOpen: isSuccessTask, toggle: toggleSuccessTask } =
    useDisclosure(false);
  const { isOpen: isSuccessNote, toggle: toggleSuccessNote } =
    useDisclosure(false);

  const items = [
    {
      icons: "view-grid-outline",
      title: `New Project ${createProjectAccess ? "" : "(No access)"}`,
      screen: createProjectAccess ? "Project Form" : "Dashboard",
    },
    {
      icons: "plus",
      title: `New Task | Ad Hoc ${createTaskAccess ? "" : "(No access)"}`,
      screen: createTaskAccess ? "Task Form" : "Dashboard",
    },
    {
      icons: "pencil-outline",
      title: `New Notes ${createNoteAccess ? "" : "(No access)"}`,
      screen: createNoteAccess ? "Note Form" : "Dashboard",
    },
  ];

  const handleNavigate = (value) => {
    navigation.navigate(value.screen, {
      projectData: null,
      taskData: null,
      noteData: null,
      toggleSuccess:
        value.screen === "Project Form"
          ? toggleSuccessProject
          : value.screen === "Task Form"
          ? toggleSuccessTask
          : toggleSuccessNote,
      setRequestType: setRequestType,
      setErrorMessage: setErrorMessage,
    });
  };

  return (
    <>
      <CustomSheet reference={props.reference} moduleScreenSheet={true}>
        {items.map((item, idx) => {
          return (
            <Pressable
              key={idx}
              style={styles.wrapper}
              onPress={() => handleNavigate(item)}
            >
              <View style={styles.content}>
                <View style={styles.item}>
                  <MaterialCommunityIcons
                    name={item.icons}
                    size={20}
                    color={Colors.iconDark}
                  />
                </View>
                <Text key={item.title} style={TextProps}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </CustomSheet>
      <AlertModal
        isOpen={isSuccessProject}
        toggle={toggleSuccessProject}
        title={
          requestType === "post"
            ? "Project created!"
            : requestType === "patch"
            ? "Changes saved!"
            : "Process error!"
        }
        description={
          requestType === "post"
            ? "Thank you for initiating this project"
            : requestType === "patch"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={
          requestType === "post"
            ? "info"
            : requestType === "patch"
            ? "success"
            : "danger"
        }
      />
      <AlertModal
        isOpen={isSuccessTask}
        toggle={toggleSuccessTask}
        title={
          requestType === "post"
            ? "Task created!"
            : requestType === "patch"
            ? "Changes saved!"
            : "Process error!"
        }
        description={
          requestType === "post"
            ? "Thank you for initiating this task"
            : requestType === "patch"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={
          requestType === "post"
            ? "info"
            : requestType === "patch"
            ? "success"
            : "danger"
        }
      />
      <AlertModal
        isOpen={isSuccessNote}
        toggle={toggleSuccessNote}
        title={
          requestType === "post"
            ? "Note created!"
            : requestType === "patch"
            ? "Changes saved!"
            : "Process error!"
        }
        description={
          requestType === "post"
            ? "We will hold the note for you"
            : requestType === "patch"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={
          requestType === "post"
            ? "info"
            : requestType === "patch"
            ? "success"
            : "error"
        }
      />
    </>
  );
};

export default BandAddNewSheet;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  item: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 5,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
