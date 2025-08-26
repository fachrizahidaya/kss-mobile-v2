import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";
import _ from "lodash";

import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import axiosInstance from "../../../config/api";
import FormButton from "../../../styles/buttons/FormButton";
import Input from "../../../styles/forms/Input";
import useCheckAccess from "../../../hooks/useCheckAccess";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ReturnConfirmationModal from "../../../styles/modals/ReturnConfirmationModal";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import TextEditor from "../../../layouts/TextEditor";

const { width, height } = Dimensions.get("window");

const NoteForm = ({ route }) => {
  const [saved, setSaved] = useState(true);

  const { noteData, toggleSuccess, setRequestType, setErrorMessage } = route.params;
  const navigation = useNavigation();

  const editCheckAccess = useCheckAccess("update", "Notes");

  const { isOpen: modalIsOpen, toggle: toggleModal } = useDisclosure(false);

  const handleReturnToPreviousScreen = () => {
    if (
      (formik.values.title ||
        formik.values.description ||
        formik.values.deadline ||
        formik.values.priority) &&
      noteData === null
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
      handleSubmit(
        { ...values, pinned: noteData ? noteData.pinned : false },
        formik.setSubmitting,
        formik.setStatus
      );
    }, 2000),
    [noteData]
  );

  const handleSubmit = async (form, setSubmitting, setStatus) => {
    try {
      if (noteData?.id) {
        await axiosInstance.patch(`/pm/notes/${noteData.id}`, form);
        setRequestType("patch");
      } else {
        await axiosInstance.post("/pm/notes", form);
        setRequestType("post");
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
      handleSubmit(
        { ...values, pinned: noteData ? noteData.pinned : false },
        setSubmitting,
        setStatus
      );
      toggleSuccess();
      navigation.goBack();
    },
  });

  const handleDisabled = !formik.values.title || !formik.values.content;

  const handleChange = (value) => {
    formik.setFieldValue("content", value);
  };

  const renderSaveStatus = () => {
    return noteData ? (
      saved ? (
        <Text>Saved</Text>
      ) : (
        <Text style={{ fontStyle: "italic" }}>Saving...</Text>
      )
    ) : null;
  };

  const renderButton = () => {
    return noteData ? null : editCheckAccess ? (
      <FormButton
        isSubmitting={formik.isSubmitting}
        onPress={formik.handleSubmit}
        disabled={handleDisabled}
      >
        <Text style={{ color: Colors.fontLight }}>Create</Text>
      </FormButton>
    ) : null;
  };

  // To change empty p tag to br tag
  const handlePreProcessContent = (content) => {
    return content.replace(/<p><\/p>/g, "<br/>");
  };

  useEffect(() => {
    if (noteData) {
      if (
        formik.values.title !== noteData?.title ||
        formik.values.content !== noteData?.content
      ) {
        setSaved(false);
        handleSave(formik.values);
      }
    }
    return handleSave.cancel;
  }, [formik.values, handleSave, noteData]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen
        screenTitle="New Note"
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[TextProps]}>Description</Text>
            </View>
            <TextEditor
              handleChange={handleChange}
              handlePreProcessContent={handlePreProcessContent}
              values={formik.values.content}
            />

            {renderButton()}
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
