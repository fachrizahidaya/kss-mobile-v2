import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import { Dimensions, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { ScrollView } from "react-native-gesture-handler";

import axiosInstance from "../../../config/api";
import FormButton from "../../../styles/buttons/FormButton";
import Input from "../../../styles/forms/Input";
import useCheckAccess from "../../../hooks/useCheckAccess";
import AlertModal from "../../../styles/modals/AlertModal";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ReturnConfirmationModal from "../../../styles/modals/ReturnConfirmationModal";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

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
        await axiosInstance.post("/pm/notes", form);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen screenTitle="New Note" returnButton={true} onPress={handleReturnToPreviousScreen}>
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

            <View style={{ flex: 1 }}>
              <RichEditor
                ref={richText}
                onChange={(descriptionText) => {
                  formik.setFieldValue("content", descriptionText);
                }}
                initialContentHTML={preprocessContent(formik.values.content)}
                style={{ flex: 1, borderWidth: 0.5, borderRadius: 10, borderColor: Colors.borderGrey }}
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
                <Text style={{ color: Colors.fontLight }}>{noteData ? "Save" : "Create"}</Text>
              </FormButton>
            ) : null}
          </View>
        </ScrollView>

        <ReturnConfirmationModal
          isOpen={modalIsOpen}
          toggle={toggleModal}
          onPress={handleReturnConfirmation}
          description="Are you sure want to exit? Changes will not be saved"
        />
        <AlertModal
          isOpen={isSuccess}
          toggle={toggleSuccess}
          title={
            requestType === "post" ? "Note created!" : requestType === "patch" ? "Changes saved!" : "Process error!"
          }
          description={
            requestType === "post"
              ? "We will hold the note for you"
              : requestType === "patch"
              ? "Data successfully saved"
              : errorMessage || "Please try again later"
          }
          type={requestType === "post" ? "info" : requestType === "patch" ? "success" : "error"}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default NoteForm;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.secondary,
  },
});
