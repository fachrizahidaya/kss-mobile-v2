import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { Pressable, Text, View, AppState } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../CustomStylings";
import CustomSheet from "../../layouts/CustomSheet";
import { Colors } from "../Color";
import AlertModal from "../modals/AlertModal";
import { useBand } from "./hooks/useBand";
import styles from "./Actionsheet.styles";

const BandAddNewSheet = (props) => {
  const {
    requestType,
    setRequestType,
    errorMessage,
    setErrorMessage,
    isSuccessProject,
    toggleSuccessProject,
    isSuccessTask,
    toggleSuccessTask,
    isSuccessNote,
    toggleSuccessNote,
    items,
    handleNavigateToTribe,
  } = useBand();
  const [lastClock, setLastClock] = useState("");

  const navigation = useNavigation();

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
    props.reference.current?.hide();
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      const currentTime = dayjs().format("HH:mm");
      if (nextAppState == "active" || nextAppState === "background") {
        setLastClock(currentTime);
      } else if (nextAppState === "active") {
        if (lastClock) {
          checkTimeDifference();
        }
      }
    };

    const checkTimeDifference = () => {
      const lastTime = dayjs(lastClock, "HH:mm");
      const now = dayjs();
      const diffInMinutes = now.diff(lastTime, "minute");

      if (diffInMinutes >= 10) {
        handleNavigateToTribe();
      }
    };

    AppState.addEventListener("change", handleAppStateChange);
  }, [lastClock]);

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
          requestType === "post" ? "info" : requestType === "patch" ? "success" : "danger"
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
          requestType === "post" ? "info" : requestType === "patch" ? "success" : "danger"
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
          requestType === "post" ? "info" : requestType === "patch" ? "success" : "error"
        }
      />
    </>
  );
};

export default BandAddNewSheet;
