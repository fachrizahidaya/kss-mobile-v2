import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";

import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import NewPostInput from "../../Feed/NewPost/NewPostInput";
import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import Button from "../../../../styles/forms/Button";
import { TextProps } from "../../../../styles/CustomStylings";
import PostTypeOptions from "../../Feed/NewPost/PostTypeOptions";
import AlertModal from "../../../../styles/modals/AlertModal";
import CustomModal from "../../../../styles/modals/CustomModal";
import { Colors } from "../../../../styles/Color";

const EditPost = ({
  isVisible,
  handleBackdrop,
  employees,
  content,
  image,
  setImage,
  pickImageHandler,
  postEditHandler,
  checkAccess,
  imagePreview,
  setImagePreview,
  updatePostModalIsOpen,
  toggleUpdatePostModal,
  requestType,
  errorMessage,
  refetch,
}) => {
  const [dateShown, setDateShown] = useState(false);
  const [isAnnouncementSelected, setIsAnnouncementSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Public");

  const postActionScreenSheetRef = useRef(null);

  /**
   * Handle show username
   */
  const initialContent = content?.content || "";
  const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
  const modifiedInitialContent = initialContent.replace(mentionRegex, "@$1");

  /**
   * Handle toggle Public
   */
  const handleTogglePublic = () => {
    setSelectedOption("Public");
    formik.setFieldValue("type", "Public");
    formik.setFieldValue("end_date", "");
    setDateShown(false);
    setIsAnnouncementSelected(false);
  };

  /**
   * Handle toggle announcement
   */
  const handleToggleAnnouncement = () => {
    setDateShown(true);
    setIsAnnouncementSelected(true);
    setSelectedOption("Announcement");
    formik.setFieldValue("end_date", content?.end_date);
    formik.setFieldValue("type", "Announcement");
  };

  /**
   * Handle End date of announcement
   * @param {*} value
   */
  const handleEndDateAnnouncement = (value) => {
    formik.setFieldValue("end_date", value);
  };

  /**
   * Handle image preview removal
   */
  const handleImagePreviewRemove = () => {
    setImagePreview(null);
    formik.setFieldValue("file", "");
    formik.setFieldValue("file_name", "");
  };

  const handleCloseImage = () => {
    setImage(null);
  };

  const handleEdit = () => {
    if (formik.values.content === "") {
      return null;
    } else {
      formik.handleSubmit();
    }
  };

  const handlePostType = () => {
    if (checkAccess) {
      postActionScreenSheetRef.current?.show();
    } else {
      return null;
    }
  };

  /**
   * Handle edit post
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: modifiedInitialContent,
      type: content?.type || selectedOption,
      end_date: content?.end_date || "",
      file_name: content?.file_name || "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      const formData = new FormData();
      for (let key in values) {
        if (key === "content") {
          const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
          const modifiedContent = values[key]?.replace(mentionRegex, "@$1");
          formData.append(key, modifiedContent);
        } else {
          formData.append(key, values[key]);
        }
      }
      formData.append("_method", "PATCH");
      formData.append("file_name", values.file_name);
      formData.append("file", image);

      if (values.type === "Public") {
        postEditHandler(formData, setSubmitting, setStatus);
      } else {
        if (values.end_date) {
          postEditHandler(formData, setSubmitting, setStatus);
        } else {
          throw new Error("For Announcement type, end date is required");
        }
      }
    },
  });

  useEffect(() => {
    if (content?.file_path) {
      setImagePreview(content?.file_path || "");
    }
  }, [content]);

  useEffect(() => {
    if (content?.type === "Announcement") {
      handleToggleAnnouncement();
    } else {
      handleTogglePublic();
    }
  }, [content]);

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
      refetch();
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <CustomModal isOpen={isVisible} toggle={handleBackdrop}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: formik.values.type === "Public" ? "center" : "center",
              gap: 5,
              marginBottom: 10,
            }}
          >
            <AvatarPlaceholder
              image={content?.author?.image}
              name={content?.author?.name}
              size="lg"
              isThumb={false}
            />
            <View style={{ gap: 5 }}>
              <Button disabled={!checkAccess} onPress={handlePostType} variant="outline">
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[{ fontSize: 10 }, TextProps]}>{formik.values.type}</Text>
                  {checkAccess ? (
                    <MaterialCommunityIcons
                      name="chevron-down"
                      color={Colors.iconDark}
                      size={15}
                    />
                  ) : null}
                </View>
              </Button>
              {formik.values.type === "Public" ? (
                ""
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                  <MaterialCommunityIcons
                    name="clock-time-three-outline"
                    color={Colors.iconDark}
                  />
                  <Text style={[{ fontSize: 10 }, TextProps]}>
                    {!formik.values.end_date
                      ? "Please select"
                      : dayjs(formik.values.end_date).format("YYYY-MM-DD")}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.container}>
            <NewPostInput formik={formik} employees={employees} />
            <View style={styles.boxImage}>
              {imagePreview ? (
                <View style={{ alignSelf: "center" }}>
                  <Image
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_API}/image/${imagePreview}`,
                    }}
                    style={styles.image}
                    alt="image selected"
                  />
                  <Pressable
                    style={styles.close}
                    onPress={handleImagePreviewRemove}
                    disabled={formik.isSubmitting}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={20}
                      color={Colors.secondary}
                    />
                  </Pressable>
                </View>
              ) : image ? (
                <View style={{ alignSelf: "center" }}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.image}
                    alt="image selected"
                  />
                  <Pressable style={styles.close} onPress={handleCloseImage}>
                    <MaterialCommunityIcons
                      name="close"
                      size={20}
                      color={Colors.secondary}
                    />
                  </Pressable>
                </View>
              ) : null}
            </View>
            <View style={styles.action}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                <Pressable
                  onPress={() => pickImageHandler(false, setImage, false)}
                  disabled={formik.isSubmitting}
                >
                  <MaterialCommunityIcons
                    name="attachment"
                    size={25}
                    color={Colors.iconDark}
                    style={{ transform: [{ rotate: "-35deg" }] }}
                  />
                </Pressable>
              </View>

              <Pressable
                style={[
                  styles.submit,
                  {
                    opacity:
                      (formik.values.type === "Announcement" &&
                        formik.values.end_date == "") ||
                      formik.values.content === "" ||
                      formik.isSubmitting
                        ? 0.5
                        : 1,
                  },
                ]}
                onPress={handleEdit}
                disabled={
                  (formik.values.type === "Announcement" &&
                    formik.values.end_date == "") ||
                  formik.values.content === "" ||
                  formik.isSubmitting
                }
              >
                {formik.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <MaterialCommunityIcons
                    name={formik.values.type === "Public" ? "send" : "bullhorn-variant"}
                    size={20}
                    color={Colors.iconLight}
                    style={{ transform: [{ rotate: "-45deg" }] }}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <AlertModal
        isOpen={updatePostModalIsOpen}
        toggle={toggleUpdatePostModal}
        type={requestType === "patch" ? "success" : "danger"}
        title={requestType === "patch" ? "Changes saved!" : "Process error!"}
        description={
          requestType === "patch"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
      />
      {postActionScreenSheetRef ? (
        <PostTypeOptions
          publicToggleHandler={handleTogglePublic}
          announcementToggleHandler={handleToggleAnnouncement}
          isAnnouncementSelected={isAnnouncementSelected}
          dateShown={dateShown}
          endDateAnnouncementHandler={handleEndDateAnnouncement}
          formik={formik}
          reference={postActionScreenSheetRef}
        />
      ) : null}
    </CustomModal>
  );
};

export default EditPost;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dfdfdf",
    position: "relative",
  },
  close: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 30,
    backgroundColor: "#4b4f53",
  },
  submit: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.borderWhite,
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  boxImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: 280,
    height: 500,
    resizeMode: "contain",
    backgroundColor: Colors.secondary,
  },
});
