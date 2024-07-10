import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";

import { Dimensions, Keyboard, TouchableWithoutFeedback, View, Text } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { ScrollView } from "react-native-gesture-handler";

import CustomDateTimePicker from "../../styles/CustomDateTimePicker";
import axiosInstance from "../../config/api";
import FormButton from "../../styles/FormButton";
import PageHeader from "../../styles/PageHeader";
import Input from "../../styles/forms/Input";
import Select from "../../styles/forms/Select";
import { ErrorToastProps, TextProps } from "../../styles/CustomStylings";
import SuccessModal from "../../styles/modals/SuccessModal";
import { useDisclosure } from "../../hooks/useDisclosure";

const ProjectForm = ({ route }) => {
  const richText = useRef();
  const { width, height } = Dimensions.get("window");
  const { projectData, refetchSelectedProject, teamMembers } = route.params;
  const navigation = useNavigation();
  const [requestType, setRequestType] = useState("");
  const { isOpen: isSuccess, toggle: toggleSuccess } = useDisclosure(false);

  // State to save editted or created project
  const [projectId, setProjectId] = useState(null);

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
      setSubmitting(false);
      setStatus("error");
      Toast.show(error.response.data.message, ErrorToastProps);
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
        <ScrollView
          style={{
            width: width,
            height: height,
            paddingVertical: 13,
            paddingHorizontal: 16,
            backgroundColor: "#FFFFFF",
            paddingBottom: 40,
          }}
        >
          <PageHeader
            title="New Project"
            onPress={() => !formik.isSubmitting && formik.status !== "processing" && navigation.goBack()}
          />

          <View style={{ gap: 17, marginTop: 22 }}>
            <Input
              formik={formik}
              title="Project Name"
              fieldName="title"
              value={formik.values.title}
              placeHolder="Input project title..."
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
              placeHolder="Select Priority"
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

      <SuccessModal
        isOpen={isSuccess}
        toggle={toggleSuccess}
        title={requestType === "post" ? "Project created!" : "Changes saved!"}
        description={
          requestType === "post" ? "Thank you for initiating this project" : "Data has successfully updated!"
        }
        type={requestType === "post" ? "warning" : "success"}
      />
    </>
  );
};

export default ProjectForm;
