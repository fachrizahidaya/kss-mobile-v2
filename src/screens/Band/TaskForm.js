import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";

import { ScrollView } from "react-native-gesture-handler";
import { Dimensions, View, Text } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import CustomDateTimePicker from "../../components/shared/CustomDateTimePicker";
import axiosInstance from "../../config/api";
import FormButton from "../../components/shared/FormButton";
import PageHeader from "../../components/shared/PageHeader";
import Input from "../../components/shared/Forms/Input";
import Select from "../../components/shared/Forms/Select";
import { ErrorToastProps, SuccessToastProps } from "../../components/shared/CustomStylings";
import SuccessModal from "../../components/shared/Modal/SuccessModal";
import { useDisclosure } from "../../hooks/useDisclosure";

const TaskForm = ({ route }) => {
  const richText = useRef();
  const { taskData, projectId, selectedStatus, refetch } = route.params;
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [taskId, setTaskId] = useState(null);
  const [requestType, setRequestType] = useState("");
  const { isOpen: isSuccess, toggle: toggleSuccess } = useDisclosure(false);

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
      toggleSuccess();
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      setStatus("error");
      Toast.show(error.response.data.message, ErrorToastProps);
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
      description: yup.string().max(150, "150 character max").required("Description is required"),
      deadline: yup.date().required("Deadline is required"),
      priority: yup.string().required("Priority is required"),
      score: yup.number().required("Score is required"),
    }),
    validateOnChange: false,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      submitHandler(values, selectedStatus || "Open", setSubmitting, setStatus);
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
      if (taskData) {
        navigation.goBack();
      } else {
        navigation.navigate("Task Detail", { taskId: taskId });
      }
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <View w={width} height={height} style={{ marginTop: 13, paddingHorizontal: 16 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <PageHeader
            title="New Task"
            onPress={() => !formik.isSubmitting && formik.status !== "processing" && navigation.goBack()}
          />

          <View style={{ gap: 17, marginTop: 22 }}>
            <Input
              formik={formik}
              title="Task Title"
              fieldName="title"
              value={formik.values.title}
              placeHolder="Input task title..."
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
              <Text style={{ marginBottom: 9 }}>End Date</Text>
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
              <Text style={{ color: "#FFFFFF" }}>{taskData ? "Save" : "Create"}</Text>
            </FormButton>
          </View>
        </ScrollView>

        <SuccessModal
          isOpen={isSuccess}
          toggle={toggleSuccess}
          title={requestType === "post" ? "Task added!" : "Changes saved!"}
          description={requestType === "post" ? "Keep the progress updated!" : "Data has successfully updated!"}
          type={requestType === "post" ? "warning" : "success"}
        />
      </View>
    </View>
  );
};

export default TaskForm;
