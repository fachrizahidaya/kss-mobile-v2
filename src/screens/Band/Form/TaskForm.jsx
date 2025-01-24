import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";
import _ from "lodash";

import { ScrollView } from "react-native-gesture-handler";
import {
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import axiosInstance from "../../../config/api";
import FormButton from "../../../styles/buttons/FormButton";
import Input from "../../../styles/forms/Input";
import Select from "../../../styles/forms/Select";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ReturnConfirmationModal from "../../../styles/modals/ReturnConfirmationModal";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

const { width, height } = Dimensions.get("window");

const TaskForm = ({ route }) => {
  const [taskId, setTaskId] = useState(null);
  const [saved, setSaved] = useState(true);

  const richText = useRef();
  const navigation = useNavigation();
  const {
    taskData,
    projectId,
    selectedStatus,
    refetch,
    setRequestType,
    setErrorMessage,
    toggleSuccess,
  } = route.params;

  const { isOpen: modalIsOpen, toggle: toggleModal } = useDisclosure(false);

  const handleReturnToPreviousScreen = () => {
    if (
      (formik.values.title ||
        formik.values.description ||
        formik.values.deadline ||
        formik.values.priority) &&
      taskData === null
    ) {
      toggleModal();
    } else {
      if (!formik.isSubmitting && formik.status !== "processing") {
        navigation.goBack();
      }
    }
  };

  const handleReturnConfirmation = () => {
    toggleModal();
    navigation.goBack();
  };

  const debounceSave = useCallback(
    _.debounce((values) => {
      submitHandler(
        values,
        selectedStatus || "Open",
        formik.setSubmitting,
        formik.setStatus
      );
    }, 2000),
    [taskData]
  );

  /**
   * Handles submission of task
   * @param {*} form - form to submit
   * @param {*} status - task status
   * @param {*} setSubmitting - formik setSubmitting
   * @param {*} setStatus - formik setStatus
   */
  const submitHandler = async (form, status, setSubmitting, setStatus) => {
    try {
      if (!taskData) {
        const res = await axiosInstance.post("/pm/tasks", {
          project_id: projectId,
          status: status,
          ...form,
        });
        setRequestType("post");
        // Set the task id so navigation can redirect to the task detail screen
        setTaskId(res.data.data.id);
      } else {
        await axiosInstance.patch(`/pm/tasks/${taskData.id}`, form);
        setRequestType("patch");
      }
      if (refetch) {
        refetch();
      }
      setSubmitting(false);
      setStatus("success");
      setSaved(true);
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleSuccess();
      setSubmitting(false);
      setStatus("error");
    }
  };

  const formik = useFormik({
    enableReinitialize: taskData ? true : false,
    initialValues: {
      title: taskData?.title || "",
      description: taskData?.description.toString() || "",
      deadline: taskData?.deadline || "",
      priority: taskData?.priority || "Low",
      score: taskData?.score || 1,
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required"),
      description: yup
        .string()
        .max(150, "150 character max")
        .required("Description is required"),
      deadline: yup.date().required("Deadline is required"),
      priority: yup.string().required("Priority is required"),
      score: yup.number().required("Score is required"),
    }),
    validateOnChange: false,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      submitHandler(values, selectedStatus || "Open", setSubmitting, setStatus);
      toggleSuccess();
    },
  });

  const onChangeDeadline = (value) => {
    formik.setFieldValue("deadline", value);
  };

  // To change empty p tag to br tag
  const preprocessContent = (content) => {
    return content.replace(/<p><\/p>/g, "<br/>");
  };

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      navigation.navigate("Task Detail", { taskId: taskId });
    }
    if (taskData) {
      if (
        formik.values.title !== taskData?.title ||
        formik.values.description !== taskData?.description ||
        formik.values.deadline !== taskData?.deadline ||
        formik.values.priority !== taskData?.priority ||
        formik.values.score !== taskData?.score
      ) {
        setSaved(false);
        debounceSave(formik.values);
      }
    }
    return debounceSave.cancel;
  }, [
    formik.values,
    debounceSave,
    taskData,
    formik.isSubmitting,
    formik.status,
  ]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen
        screenTitle="New Task"
        returnButton={true}
        onPress={handleReturnToPreviousScreen}
        childrenHeader={
          taskData ? (
            saved ? (
              <Text>Saved</Text>
            ) : (
              <Text style={{ fontStyle: "italic" }}>Saving...</Text>
            )
          ) : null
        }
      >
        <ScrollView style={styles.container}>
          <View style={{ gap: 17 }}>
            <Input
              formik={formik}
              title="Title"
              fieldName="title"
              value={formik.values.title}
              placeHolder="Input title"
            />

            <Text style={[TextProps]}>Description</Text>

            <RichToolbar
              editor={richText}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.setStrikethrough,
                actions.setUnderline,
              ]}
              iconTint={Colors.iconDark}
              selectedIconTint={Colors.primary}
            />

            <View style={{ height: 200 }}>
              <RichEditor
                ref={richText}
                onChange={(descriptionText) => {
                  formik.setFieldValue("description", descriptionText);
                }}
                initialContentHTML={preprocessContent(
                  formik.values.description
                )}
                style={{
                  flex: 1,
                  borderWidth: 0.5,
                  borderRadius: 10,
                  borderColor: Colors.borderGrey,
                }}
                editorStyle={{
                  contentCSSText: `
                    display: flex; 
                    flex-direction: column; 
                    min-height: 200px; 
                    position: absolute; 
                    top: 0; right: 0; bottom: 0; left: 0;`,
                }}
              />
            </View>

            <View>
              <CustomDateTimePicker
                defaultValue={formik.values.deadline}
                onChange={onChangeDeadline}
                title="Deadline"
              />
              {formik.errors.deadline && (
                <Text style={{ marginTop: 9, color: "red" }}>
                  {formik.errors.deadline}
                </Text>
              )}
            </View>

            <Select
              value={formik.values.priority}
              placeHolder="Select priority"
              formik={formik}
              title="Priority"
              fieldName="priority"
              onChange={(value) => formik.setFieldValue("priority", value)}
              items={[
                { label: "Low", value: "Low" },
                { label: "Medium", value: "Medium" },
                { label: "High", value: "High" },
              ]}
            />

            {taskData ? null : (
              <FormButton
                isSubmitting={formik.isSubmitting}
                onPress={formik.handleSubmit}
                disabled={
                  !formik.values.title ||
                  !formik.values.description ||
                  !formik.values.deadline ||
                  !formik.values.priority
                }
                padding={10}
              >
                <Text style={{ color: Colors.fontLight }}>Create</Text>
              </FormButton>
            )}
          </View>
        </ScrollView>

        <ReturnConfirmationModal
          isOpen={modalIsOpen}
          toggle={toggleModal}
          onPress={handleReturnConfirmation}
          description="Are you sure want to exit? Changes will not be saved"
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.secondary,
  },
});
