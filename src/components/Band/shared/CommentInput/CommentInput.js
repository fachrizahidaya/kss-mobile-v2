import { memo, useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
import { useFormik } from "formik";
import * as yup from "yup";

import { Image, Linking, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useFetch } from "../../../../hooks/useFetch";
import axiosInstance from "../../../../config/api";
import FormButton from "../../../../styles/buttons/FormButton";
import CommentList from "./CommentList/CommentList";
import Input from "../../../../styles/forms/Input";
import { TextProps } from "../../../../styles/CustomStylings";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import AlertModal from "../../../../styles/modals/AlertModal";
import { Colors } from "../../../../styles/Color";

const doc = "../../../../assets/doc-icons/doc-format.png";
const gif = "../../../../assets/doc-icons/gif-format.png";
const key = "../../../../assets/doc-icons/key-format.png";
const other = "../../../../assets/doc-icons/other-format.png";
const pdf = "../../../../assets/doc-icons/pdf-format.png";
const ppt = "../../../../assets/doc-icons/ppt-format.png";
const rar = "../../../../assets/doc-icons/rar-format.png";
const xls = "../../../../assets/doc-icons/xls-format.png";
const zip = "../../../../assets/doc-icons/zip-format.png";

const CommentInput = ({ taskId, projectId, data }) => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestType, setRequestType] = useState("");

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data: comments, refetch: refetchComments } = useFetch(
    projectId
      ? `/pm/projects/${projectId}/comment`
      : taskId
      ? `/pm/tasks/${taskId}/comment`
      : null
  );
  const { refetch: refetchAttachments } = useFetch(
    projectId
      ? `/pm/projects/${projectId}/attachment`
      : taskId
      ? `/pm/tasks/${taskId}/attachment`
      : null
  );

  /**
   * Handle submission of comment for project or task
   * @param {FormData} form - FormData (comment and attachment)
   */
  const submitComment = async (form, setSubmitting, setStatus) => {
    try {
      // Checking current comment is from project or task
      let apiURL = "";
      if (projectId) {
        apiURL = "/pm/projects/comment";
      } else if (taskId) {
        apiURL = "/pm/tasks/comment";
      }

      await axiosInstance.post(apiURL, form, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      // Refetch all comments after success submission
      refetchComments();
      refetchAttachments();
      setFiles([]);
      setSubmitting(false);
      setStatus("success");
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
      setSubmitting(false);
      setStatus("error");
    }
  };

  const formik = useFormik({
    initialValues: {
      task_id: taskId || null,
      project_id: projectId || null,
      comments: "",
    },
    validationSchema: yup.object().shape({
      comments: yup.string().required("Comment can't be empty"),
    }),
    validateOnChange: false,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");

      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      files.map((val) => {
        formData.append("attachment[]", val);
      });

      submitComment(formData, setSubmitting, setStatus);
    },
  });

  /**
   * Select file handler
   */
  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
      });

      // Check if there is selected file
      if (result) {
        if (!files) {
          setFiles([
            {
              name: result.assets[0].name,
              size: result.assets[0].size,
              type: result.assets[0].mimeType,
              uri: result.assets[0].uri,
              webkitRelativePath: "",
            },
          ]);
        } else {
          setFiles([
            ...files,
            {
              name: result.assets[0].name,
              size: result.assets[0].size,
              type: result.assets[0].mimeType,
              uri: result.assets[0].uri,
              webkitRelativePath: "",
            },
          ]);
        }
      }
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
    }
  };

  /**
   * Remove file handler
   */
  const removeFile = (index) => {
    const updatedFiles = files.filter((file, idx) => idx !== index);
    setFiles(updatedFiles);
  };

  /**
   * Download Attachment
   */
  const downloadAttachment = async (attachment) => {
    try {
      await axiosInstance.get(`/download/${attachment}`);
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${attachment}`);
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
    }
  };

  useEffect(() => {
    return () => {
      setFiles([]);
    };
  }, [projectId]);

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <>
      <View style={{ gap: 10 }}>
        {/* Render selected attachments here */}
        {files.length > 0 && (
          <View style={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
            {files.map((file, idx) => {
              // If file is image : render the image uri
              if (file.type.includes("image")) {
                return (
                  <Pressable key={idx} onPress={() => removeFile(idx)}>
                    <Image
                      style={{ height: 60, width: 60, resizeMode: "contain" }}
                      alt="file"
                      source={{ uri: file.uri }}
                    />
                  </Pressable>
                );
              } else {
                // Else if file is other than image : render the extension image logo
                return (
                  <Pressable key={idx} onPress={() => removeFile(idx)}>
                    <Image
                      alt="file"
                      source={
                        file.type.includes("doc")
                          ? require(doc)
                          : file.type.includes("gif")
                          ? require(gif)
                          : file.type.includes("key")
                          ? require(key)
                          : file.type.includes("pdf")
                          ? require(pdf)
                          : file.type.includes("ppt") ||
                            file.type.includes("pptx")
                          ? require(ppt)
                          : file.type.includes("rar")
                          ? require(rar)
                          : file.type.includes("xls") ||
                            file.type.includes("xlsx")
                          ? require(xls)
                          : file.type.includes("zip")
                          ? require(zip)
                          : require(other)
                      }
                      style={{ height: 60, width: 60, resizeMode: "contain" }}
                    />
                  </Pressable>
                );
              }
            })}

            <Text
              style={[
                { fontSize: 12, opacity: 0.5, alignSelf: "center" },
                TextProps,
              ]}
            >
              Tap item to remove
            </Text>
          </View>
        )}
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.borderGrey,
            padding: 12,
          }}
        >
          <Input
            formik={formik}
            fieldName="comments"
            value={formik.values.comments}
            placeHolder="Add comment"
            multiline
            style={{ borderWidth: 0 }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pressable onPress={selectFile}>
              <MaterialCommunityIcons
                name="attachment"
                size={25}
                color={Colors.iconDark}
                style={{ transform: [{ rotate: "-35deg" }] }}
              />
            </Pressable>

            <FormButton
              isSubmitting={formik.isSubmitting}
              onPress={formik.handleSubmit}
              borderRadius={20}
              height={40}
              width={40}
              transform={[{ rotate: "-45deg" }]}
              disabled={!formik.values.comments || formik.isSubmitting}
            >
              <MaterialCommunityIcons
                name="send"
                size={20}
                color={Colors.iconLight}
              />
            </FormButton>
          </View>
        </View>

        {/* Comment list */}
        <CommentList
          comments={comments}
          projectId={projectId}
          parentData={data}
          refetchAttachments={refetchAttachments}
          refetchComments={refetchComments}
          downloadAttachment={downloadAttachment}
          setRequest={setRequestType}
          setError={setErrorMessage}
          toggleAlert={toggleAlert}
        />
      </View>
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={"Process error!"}
        type={requestType === "post" ? "info" : "danger"}
        description={errorMessage || "Please try again later"}
      />
    </>
  );
};

export default memo(CommentInput);
