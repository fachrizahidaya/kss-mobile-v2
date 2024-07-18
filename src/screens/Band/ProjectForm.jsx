import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import { Dimensions, Keyboard, TouchableWithoutFeedback, View, Text, StyleSheet, SafeAreaView } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { ScrollView } from "react-native-gesture-handler";

import CustomDateTimePicker from "../../styles/CustomDateTimePicker";
import axiosInstance from "../../config/api";
import FormButton from "../../styles/FormButton";
import PageHeader from "../../styles/PageHeader";
import Input from "../../styles/forms/Input";
import Select from "../../styles/forms/Select";
import { TextProps } from "../../styles/CustomStylings";
import AlertModal from "../../styles/modals/AlertModal";
import { useDisclosure } from "../../hooks/useDisclosure";
import ReturnConfirmationModal from "../../styles/modals/ReturnConfirmationModal";

const { width, height } = Dimensions.get("window");

const ProjectForm = ({ route }) => {
  const [projectId, setProjectId] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const richText = useRef();
  const navigation = useNavigation();

  const { projectData, refetchSelectedProject, teamMembers } = route.params;

  const { isOpen: modalIsOpen, toggle: toggleModal } = useDisclosure(false);
  const { isOpen: isSuccess, toggle: toggleSuccess } = useDisclosure(false);

  const handleReturnToPreviousScreen = () => {
    if (formik.values.title || formik.values.description || formik.values.deadline || formik.values.priority) {
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

  const submitHandler = async (form, setSubmitting, setStatus) => {
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
      toggleSuccess();
    } catch (error) {
      console.log(error);
      setRequestType("warning");
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
      submitHandler(values, setSubmitting, setStatus);
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
      navigation.navigate("Project Detail", { projectId: projectId });
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.container}>
          <PageHeader title="New Project" onPress={handleReturnToPreviousScreen} />

          <View style={{ gap: 17, marginTop: 22 }}>
            <Input
              formik={formik}
              title="Project Name"
              fieldName="title"
              value={formik.values.title}
              placeHolder="Input title"
            />

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
              iconTint="#000"
              selectedIconTint="#176688"
            />

            <View style={{ height: 200 }}>
              <RichEditor
                ref={richText}
                onChange={(descriptionText) => {
                  formik.setFieldValue("description", descriptionText);
                }}
                initialContentHTML={preprocessContent(formik.values.description)}
                style={{ flex: 1, borderWidth: 0.5, borderRadius: 10, borderColor: "#E8E9EB" }}
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
              <Text style={[{ marginBottom: 9 }, TextProps]}>End Date</Text>
              <CustomDateTimePicker defaultValue={formik.values.deadline} onChange={onChangeDeadline} />
              {formik.errors.deadline && <Text style={{ marginTop: 9, color: "red" }}>{formik.errors.deadline}</Text>}
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

            <FormButton isSubmitting={formik.isSubmitting} onPress={formik.handleSubmit}>
              <Text style={{ color: "#FFFFFF" }}>{projectData ? "Save" : "Create"}</Text>
            </FormButton>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <ReturnConfirmationModal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        onPress={handleReturnConfirmation}
        description="Are you sure want to exit? It will be deleted"
      />
      <AlertModal
        isOpen={isSuccess}
        toggle={toggleSuccess}
        title={
          requestType === "post" ? "Project created!" : requestType === "patch" ? "Changes saved!" : "Process error!"
        }
        description={
          requestType === "post"
            ? "Thank you for initiating this project"
            : requestType === "patch"
            ? "Data has successfully updated"
            : errorMessage || "Please try again later"
        }
        type={requestType === "post" ? "info" : requestType === "patch" ? "success" : "warning"}
      />
    </>
  );
};

export default ProjectForm;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingVertical: 13,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    paddingBottom: 40,
  },
});
