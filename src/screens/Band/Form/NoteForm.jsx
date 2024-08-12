import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import { Dimensions, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { ScrollView } from "react-native-gesture-handler";

import axiosInstance from "../../../config/api";
import FormButton from "../../../styles/FormButton";
import PageHeader from "../../../styles/PageHeader";
import Input from "../../../styles/forms/Input";
import useCheckAccess from "../../../hooks/useCheckAccess";
import AlertModal from "../../../styles/modals/AlertModal";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ReturnConfirmationModal from "../../../styles/modals/ReturnConfirmationModal";
import { TextProps } from "../../../styles/CustomStylings";

const { width, height } = Dimensions.get("window");

const NoteForm = ({ route }) => {
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { noteData } = route.params;
  const richText = useRef();
  const navigation = useNavigation();

  const editCheckAccess = useCheckAccess("update", "Notes");

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
      if (noteData?.id) {
        await axiosInstance.patch(`/pm/notes/${noteData.id}`, form);
        setRequestType("patch");
      } else {
        const res = await axiosInstance.post("/pm/notes", form);
        setRequestType("post");
      }
      toggleSuccess();
      setSubmitting(false);
      setStatus("success");
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
    enableReinitialize: noteData ? true : false,
    initialValues: {
      title: noteData?.title || "",
      content: noteData?.content || "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Note title is required"),
      content: yup.string().required("Content is required"),
    }),
    validateOnChange: false,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      submitHandler({ ...values, pinned: noteData ? noteData.pinned : false }, setSubmitting, setStatus);
    },
  });

  // To change empty p tag to br tag
  const preprocessContent = (content) => {
    return content.replace(/<p><\/p>/g, "<br/>");
  };

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      navigation.goBack();
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.container}>
          <PageHeader title={noteData?.title ? noteData?.title : "New Note"} onPress={handleReturnToPreviousScreen} />

          <View style={{ gap: 17, marginTop: 22, flex: 1, paddingBottom: 40 }}>
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
              iconTint="#000"
              selectedIconTint="#176688"
            />

            <View style={{ flex: 1 }}>
              <RichEditor
                ref={richText}
                onChange={(descriptionText) => {
                  formik.setFieldValue("content", descriptionText);
                }}
                initialContentHTML={preprocessContent(formik.values.content)}
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

            {editCheckAccess ? (
              <FormButton
                isSubmitting={formik.isSubmitting}
                onPress={formik.handleSubmit}
                disabled={!formik.values.title || !formik.values.content}
              >
                <Text style={{ color: "#FFFFFF" }}>{noteData ? "Save" : "Create"}</Text>
              </FormButton>
            ) : null}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <ReturnConfirmationModal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        onPress={handleReturnConfirmation}
        description="Are you sure want to exit? Changes will not be saved"
      />
      <AlertModal
        isOpen={isSuccess}
        toggle={toggleSuccess}
        title={requestType === "post" ? "Note created!" : requestType === "patch" ? "Changes saved!" : "Process error!"}
        description={
          requestType === "post"
            ? "We will hold the note for you"
            : requestType === "error"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={requestType === "post" ? "info" : requestType === "patch" ? "success" : "error"}
      />
    </>
  );
};

export default NoteForm;

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
