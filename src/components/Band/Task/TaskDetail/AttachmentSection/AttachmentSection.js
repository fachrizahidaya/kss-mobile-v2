import { memo, useState } from "react";
import * as DocumentPicker from "expo-document-picker";

import { SheetManager } from "react-native-actions-sheet";

import { ScrollView } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AttachmentList from "./AttachmentList/AttachmentList";
import { useFetch } from "../../../../../hooks/useFetch";
import axiosInstance from "../../../../../config/api";
import { TextProps } from "../../../../../styles/CustomStylings";
import { useDisclosure } from "../../../../../hooks/useDisclosure";
import AlertModal from "../../../../../styles/modals/AlertModal";
import { Colors } from "../../../../../styles/Color";

const AttachmentSection = ({ taskId, disabled }) => {
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
  const { data: attachments, refetch: refetchAttachments } = useFetch(
    taskId && `/pm/tasks/${taskId}/attachment`
  );

  var renderRequest;

  if (requestType === "post") {
    renderRequest = "info";
  } else if (requestType === "reject") {
    renderRequest = "warning";
  } else {
    renderRequest = "danger";
  }

  /**
   * Handles downloading attachment
   * Read file's base64 format and saving it to the user's selected directory
   * @param {string} attachmentId - ID of the file
   * @param {string} attachmentName - File name
   * @param {string} attachmentFrom - Description of the file's origin (Comment or Project)
   */
  const handleDownload = async (attachment) => {
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

  const handleUploadFile = async (formData) => {
    try {
      // Sending the formData to backend
      await axiosInstance.post("/pm/tasks/attachment", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      // Refetch project's attachments
      refetchAttachments();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
    }
  };

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
        // formData format
        const formData = new FormData();
        formData.append("attachment", {
          name: result.assets[0].name,
          size: result.assets[0].size,
          type: result.assets[0].mimeType,
          uri: result.assets[0].uri,
          webkitRelativePath: "",
        });
        formData.append("task_id", taskId);

        // Call upload handler and send formData to the api
        handleUploadFile(formData);
      }
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
    }
  };

  /**
   * Delete file handler
   * @param {string} attachmentId - Attachment id to delete
   * @param {string} attachmentFrom - Attachment origin (Comment or Project)
   */
  const handleDeleteFile = async (attachmentId, attachmentFrom) => {
    try {
      if (attachmentFrom === "Comment") {
        await axiosInstance.delete(`/pm/tasks/comment/attachment/${attachmentId}`);
      } else {
        await axiosInstance.delete(`/pm/tasks/attachment/${attachmentId}`);
      }
      SheetManager.hide("form-sheet");
      // Refetch attachments after deletion
      refetchAttachments();

      // If the deleted attachment is from comment
      // Then refetch comments
      if (attachmentFrom === "Comment") {
        refetchComments();
      }
      setRequestType("remove");
      toggleAlert();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
    }
  };
  return (
    <View style={{ gap: 10 }}>
      <View style={{ gap: 10 }}>
        <View style={{ marginHorizontal: 16 }}>
          <View style={styles.header}>
            <Text style={[{ fontWeight: "500" }, TextProps]}>ATTACHMENTS</Text>
            <Pressable onPress={selectFile} style={styles.addFile}>
              <MaterialCommunityIcons name="plus" size={20} color={Colors.iconDark} />
            </Pressable>
          </View>
        </View>

        {attachments?.data?.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlashList
              data={attachments.data}
              keyExtractor={(item) => item.id}
              estimatedItemSize={221}
              horizontal
              renderItem={({ item }) => (
                <AttachmentList
                  id={item?.id}
                  title={item.file_name}
                  size={item.file_size}
                  time={item.uploaded_at}
                  type={item.mime_type}
                  from={item.attachment_from}
                  deleteFileHandler={handleDeleteFile}
                  downloadFileHandler={handleDownload}
                  path={item.file_path}
                  disabled={disabled}
                />
              )}
            />
          </View>
        ) : null}
      </View>

      {/* <Pressable >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginHorizontal: 16,
          }}
        >
          <MaterialCommunityIcons name="plus" size={20} color="#304FFD" />
          <Text style={{ fontWeight: "500", color: "#304FFD" }}>
            Add attachment
          </Text>
        </View>
      </Pressable> */}
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={requestType === "remove" ? "Attachment deleted!" : "Process error!"}
        description={
          requestType === "remove"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={renderRequest}
      />
    </View>
  );
};

export default memo(AttachmentSection);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addFile: {
    backgroundColor: "#F1F2F3",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 10,
  },
});
