import { memo, useEffect, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { ScrollView } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Bar } from "react-native-progress";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDisclosure } from "../../../../../hooks/useDisclosure";
import { useFetch } from "../../../../../hooks/useFetch";
import axiosInstance from "../../../../../config/api";
import FormButton from "../../../../../styles/buttons/FormButton";
import CheckListItem from "./CheckListItem/CheckListItem";
import ConfirmationModal from "../../../../../styles/modals/ConfirmationModal";
import { useLoading } from "../../../../../hooks/useLoading";
import Input from "../../../../../styles/forms/Input";
import { TextProps } from "../../../../../styles/CustomStylings";
import AlertModal from "../../../../../styles/modals/AlertModal";
import CustomModal from "../../../../../styles/modals/CustomModal";
import { Colors } from "../../../../../styles/Color";

const ChecklistSection = ({ taskId, disabled }) => {
  const [selectedChecklist, setSelectedChecklist] = useState({});
  const [requestType, setRequestType] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { isOpen, toggle } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
  const { isOpen: deleteChecklistModalIsOpen, toggle: toggleDeleteChecklist } =
    useDisclosure(false);

  const { isLoading, start, stop } = useLoading(false);

  const { data: checklists, refetch: refetchChecklists } = useFetch(
    `/pm/tasks/${taskId}/checklist`
  );

  const handleCloseActionSheet = (resetForm) => {
    toggle();
    resetForm();
  };

  const handleBackdropPress = () => {
    handleCloseActionSheet(formik.resetForm);
  };

  const handleDeleteModal = (id) => {
    toggleDeleteChecklist();

    const filteredChecklist = checklists?.data.filter((item) => {
      return item.id === id;
    });

    setSelectedChecklist(filteredChecklist[0]);
  };

  /**
   * Calculate finished checklists
   */
  const finishChecklists = checklists?.data.filter((item) => {
    return item.status === "Finish";
  });

  /**
   * Handles add new checklist
   * @param {Object} form - Form to submit
   */
  const handleAddChecklist = async (form, setStatus, setSubmitting) => {
    try {
      await axiosInstance.post("/pm/tasks/checklist", {
        ...form,
        task_id: taskId,
        status: "Open",
      });
      refetchChecklists();
      setStatus("success");
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
      setStatus("error");
      setSubmitting(false);
    }
  };

  const handleCompleteChecklist = async (checklistId, currentStatus) => {
    try {
      start();
      await axiosInstance.patch(`/pm/tasks/checklist/${checklistId}`, {
        status: currentStatus === "Open" ? "Finish" : "Open",
      });
      refetchChecklists();
      stop();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
      stop();
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .required("Checklist title is required")
        .max(30, "30 characters max!"),
    }),
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setStatus("processing");
      handleAddChecklist(values, setStatus, setSubmitting);
    },
  });

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      handleCloseActionSheet(formik.resetForm);
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <>
      <View style={{ gap: 10, marginHorizontal: 16 }}>
        <View style={styles.header}>
          <Text style={[{ fontWeight: "500" }, TextProps]}>
            CHECKLIST (
            {Math.round((finishChecklists?.length / checklists?.data?.length || 0) * 100)}
            %)
          </Text>
          <Pressable onPress={toggle} style={styles.addChecklist}>
            <MaterialCommunityIcons name="plus" size={20} color={Colors.iconDark} />
          </Pressable>
        </View>

        <Bar
          progress={finishChecklists?.length / checklists?.data?.length || 0}
          color={Colors.primary}
          borderColor={Colors.borderWhite}
          unfilledColor={Colors.borderGrey}
          width={null}
        />

        <ScrollView style={{ maxHeight: 200 }}>
          <View style={{ flex: 1, minHeight: 2 }}>
            <FlashList
              data={checklists?.data}
              keyExtractor={(item) => item?.id}
              extraData={isLoading}
              estimatedItemSize={30}
              renderItem={({ item }) => (
                <CheckListItem
                  id={item.id}
                  title={item.title}
                  status={item.status}
                  isLoading={isLoading}
                  onPress={handleCompleteChecklist}
                  onPressDelete={handleDeleteModal}
                  disabled={disabled}
                />
              )}
            />
          </View>
        </ScrollView>

        {/* {!disabled ? (
          <Pressable>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialCommunityIcons name="plus" size={20} color="#304FFD" />
              <Text style={{ fontWeight: "500", color: "#304FFD" }}>
                Add checklist item
              </Text>
            </View>
          </Pressable>
        ) : null} */}
      </View>

      <CustomModal isOpen={isOpen} toggle={handleBackdropPress} avoidKeyboard={true}>
        <Text style={[{ alignSelf: "center", fontWeight: "500" }, TextProps]}>
          Add New Checklist
        </Text>
        <Input
          placeHolder="Check List Title"
          value={formik.values.title}
          formik={formik}
          fieldName="title"
        />

        <FormButton
          disabled={
            formik.isSubmitting ||
            !formik.values.title ||
            formik.values.title.length >= 30
          }
          isSubmitting={formik.isSubmitting}
          onPress={formik.handleSubmit}
        >
          <Text style={{ color: Colors.fontLight }}>Save</Text>
        </FormButton>
      </CustomModal>

      <ConfirmationModal
        isOpen={deleteChecklistModalIsOpen}
        toggle={toggleDeleteChecklist}
        apiUrl={`/pm/tasks/checklist/${selectedChecklist?.id}`}
        header="Remove Checklist"
        description={`Are you sure want to remove ${selectedChecklist?.title}?`}
        hasSuccessFunc={true}
        onSuccess={refetchChecklists}
        toggleOtherModal={toggleAlert}
        success={success}
        setSuccess={setSuccess}
        setError={setErrorMessage}
        setRequestType={setRequestType}
      />
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={requestType === "remove" ? "Checklist removed!" : "Process error!"}
        type={requestType === "remove" ? "success" : "danger"}
        description={
          requestType === "remove"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
      />
    </>
  );
};

export default memo(ChecklistSection);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addChecklist: {
    backgroundColor: "#F1F2F3",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 10,
  },
});
