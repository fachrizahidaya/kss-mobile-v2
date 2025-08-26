import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";
import _ from "lodash";

import {
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import axiosInstance from "../../../config/api";
import FormButton from "../../../styles/buttons/FormButton";
import Input from "../../../styles/forms/Input";
import Select from "../../../styles/forms/Select";
import { TextProps } from "../../../styles/CustomStylings";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ReturnConfirmationModal from "../../../styles/modals/ReturnConfirmationModal";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import TextEditor from "../../../layouts/TextEditor";

const { width, height } = Dimensions.get("window");

const ProjectForm = ({ route }) => {
  const [projectId, setProjectId] = useState(null);
  const [saved, setSaved] = useState(true);

  const navigation = useNavigation();

  const {
    projectData,
    refetchSelectedProject,
    teamMembers,
    toggleSuccess,
    setRequestType,
    setErrorMessage,
  } = route.params;

  const { isOpen: modalIsOpen, toggle: toggleModal } = useDisclosure(false);

  const projectOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];

  const handleReturnToPreviousScreen = () => {
    if (
      (formik.values.title ||
        formik.values.description ||
        formik.values.deadline ||
        formik.values.priority) &&
      projectData === null
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

  const handleSave = useCallback(
    _.debounce((values) => {
      handleSubmit(values, formik.setSubmitting, formik.setStatus);
    }, 2000),
    [projectData]
  );

  const handleSubmit = async (form, setSubmitting, setStatus) => {
    try {
      if (!projectData) {
        const res = await axiosInstance.post("/pm/projects", form);
        // Creating project from My Team screen
        // Bulk invite teams to project
        if (teamMembers) {
          for (let i = 0; i < teamMembers.length; i++) {
            await axiosInstance.post("/pm/projects/member", {
              project_id: res.data.data.id,
              user_id: teamMembers[i].user_id,
            });
          }
        } else {
          // Assign the creator as owner
          axiosInstance.post("/pm/projects/member", {
            project_id: res.data.data.id,
            user_id: res.data.data.owner_id,
          });
        }
        setRequestType("post");
        setProjectId(res.data.data.id);
        toggleSuccess();
      } else {
        await axiosInstance.patch(`/pm/projects/${projectData.id}`, form);
        setProjectId(projectData.id);
        setRequestType("patch");

        // Fetch current project's detail again
        refetchSelectedProject();
      }

      // Refetch all project (with current selected status)
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
    enableReinitialize: projectData ? true : false,
    initialValues: {
      title: projectData?.title?.toString() || "",
      priority: projectData?.priority || "",
      deadline: projectData?.deadline || "",
      description: projectData?.description?.toString() || "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Project title is required"),
      priority: yup.string().required("Priority is required"),
      deadline: yup.date().required("Project deadline is required"),
      description: yup.string().required("Description is required"),
    }),
    validateOnChange: false,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      handleSubmit(values, setSubmitting, setStatus);
      toggleSuccess();
      navigation.navigate("Project Detail", { projectId: projectId });
    },
  });

  const handleDisabled =
    !formik.values.title ||
    !formik.values.description ||
    !formik.values.deadline ||
    !formik.values.priority;

  const renderSaveStatus = () => {
    return projectData ? (
      saved ? (
        <Text>Saved</Text>
      ) : (
        <Text style={{ fontStyle: "italic" }}>Saving...</Text>
      )
    ) : null;
  };

  const handleChange = (value) => {
    formik.setFieldValue("description", value);
  };

  const handleChangeDeadline = (value) => {
    formik.setFieldValue("deadline", value);
  };

  // To change empty p tag to br tag
  const handlePreProcessContent = (content) => {
    return content.replace(/<p><\/p>/g, "<br/>");
  };

  useEffect(() => {
    if (projectData) {
      if (
        formik.values.title !== projectData?.title ||
        formik.values.description !== projectData?.description ||
        formik.values.deadline !== projectData?.deadline ||
        formik.values.priority !== projectData?.priority
      ) {
        setSaved(false);
        handleSave(formik.values);
      }
    }
    return handleSave.cancel;
  }, [formik.values, handleSave, projectData]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen
        screenTitle="New Project"
        returnButton={true}
        onPress={handleReturnToPreviousScreen}
        childrenHeader={renderSaveStatus()}
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

            <TextEditor
              handleChange={handleChange}
              handlePreProcessContent={handlePreProcessContent}
              values={formik.values.description}
            />

            <View>
              <CustomDateTimePicker
                defaultValue={formik.values.deadline}
                onChange={handleChangeDeadline}
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
              items={projectOptions}
            />

            {projectData ? null : (
              <FormButton
                isSubmitting={formik.isSubmitting}
                onPress={formik.handleSubmit}
                disabled={handleDisabled}
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

export default ProjectForm;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.secondary,
  },
});
