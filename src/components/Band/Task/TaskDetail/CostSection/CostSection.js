import { memo, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Modal from "react-native-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlashList } from "@shopify/flash-list";
import { Dimensions, Platform, Text, View, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFetch } from "../../../../../hooks/useFetch";
import { useDisclosure } from "../../../../../hooks/useDisclosure";
import FormButton from "../../../../../styles/FormButton";
import axiosInstance from "../../../../../config/api";
import ConfirmationModal from "../../../../../styles/modals/ConfirmationModal";
import Input from "../../../../../styles/forms/Input";
import { TextProps } from "../../../../../styles/CustomStylings";
import AlertModal from "../../../../../styles/modals/AlertModal";

const CostSection = ({ taskId, disabled }) => {
  const [selectedCost, setSelectedCost] = useState({});
  const [requestType, setRequestType] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  const { isOpen, toggle } = useDisclosure(false);
  const { isOpen: deleteCostModalisOpen, toggle: toggleDeleteCostModal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data: costs, refetch: refechCosts } = useFetch(`/pm/tasks/${taskId}/cost`);

  const onCloseActionSheet = (resetForm) => {
    toggle();
    resetForm();
  };

  const onBackdropPress = () => onCloseActionSheet(formik.resetForm);

  const openDeleteModal = (id) => {
    toggle();

    setTimeout(toggleDeleteCostModal, 500);

    const filteredCost = costs?.data.filter((item) => {
      return item.id === id;
    });

    setSelectedCost(filteredCost[0]);
  };

  /**
   * Handles the addition of a new cost associated with a task.
   * @param {Object} form - The form containing cost-related data to be added.
   */
  const newCostHandler = async (form, setStatus, setSubmitting) => {
    try {
      await axiosInstance.post("/pm/tasks/cost", { ...form, task_id: taskId });
      setStatus("success");
      setSubmitting(false);
      refechCosts();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
      setStatus("error");
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      cost_name: "",
      cost_amount: "",
    },
    validationSchema: yup.object().shape({
      cost_name: yup.string().required("Cost detail is required").max(50, "50 characters max"),
      cost_amount: yup.number().required("Cost amount is required"),
    }),
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setStatus("processing");
      newCostHandler(values, setStatus, setSubmitting);
    },
  });

  /**
   * Sum all task's costs
   */
  const totalCostCalculation = costs?.data.reduce((cost, object) => {
    return cost + object.cost_amount;
  }, 0);

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      onCloseActionSheet(formik.resetForm);
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <>
      <View style={{ gap: 10 }}>
        <Text style={[{ fontWeight: "500" }, TextProps]}>COST</Text>
        <View style={{ position: "relative" }}>
          <Pressable onPress={toggle} style={styles.container} />

          <Input
            value={`${
              totalCostCalculation?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }) || 0
            }`}
            placeHolder="Task's cost"
            editable={false}
          />
        </View>

        <Modal
          avoidKeyboard={true}
          isVisible={isOpen}
          onBackdropPress={onBackdropPress}
          deviceHeight={deviceHeight}
          deviceWidth={deviceWidth}
        >
          <View style={{ gap: 10, backgroundColor: "#FFFFFF", padding: 20, borderRadius: 10 }}>
            <View style={{ gap: 10 }}>
              {costs?.data?.length > 0 ? (
                <ScrollView style={{ maxHeight: 200 }}>
                  <View style={{ flex: 1, minHeight: 2 }}>
                    <FlashList
                      data={costs?.data}
                      keyExtractor={(item, index) => index}
                      estimatedItemSize={25}
                      renderItem={({ item, index }) => (
                        <View key={index} style={styles.wrapper}>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={[{ fontSize: 16 }, TextProps]}>{item?.cost_name} - </Text>
                            <Text style={[{ fontSize: 16 }, TextProps]}>
                              {item?.cost_amount?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              })}
                            </Text>
                          </View>

                          <TouchableOpacity onPress={() => openDeleteModal(item.id)}>
                            <MaterialCommunityIcons name="delete-outline" size={20} color="#3F434A" />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                </ScrollView>
              ) : (
                <Text style={TextProps}>This task has no cost yet.</Text>
              )}

              {!disabled ? (
                <>
                  <View style={{ flex: 1, borderWidth: 1, borderColor: "#E8E9EB" }} />
                  <View style={{ gap: 5 }}>
                    <Input
                      placeHolder="Cost Title"
                      value={formik.values.cost_name}
                      fieldName="cost_name"
                      formik={formik}
                    />

                    <Input
                      keyboardType="numeric"
                      placeHolder="Cost Amount"
                      value={formik.values.cost_amount}
                      formik={formik}
                      fieldName="cost_amount"
                    />
                    <FormButton isSubmitting={formik.isSubmitting} onPress={formik.handleSubmit}>
                      <Text style={{ color: "#FFFFFF" }}>Save</Text>
                    </FormButton>
                  </View>
                </>
              ) : null}
            </View>
          </View>
        </Modal>

        <ConfirmationModal
          isOpen={deleteCostModalisOpen}
          toggle={toggleDeleteCostModal}
          apiUrl={`/pm/tasks/cost/${selectedCost?.id}`}
          header="Delete Cost"
          description={`Are you sure want to remove ${selectedCost?.cost_name}?`}
          hasSuccessFunc={true}
          onSuccess={refechCosts}
          toggleOtherModal={toggleAlert}
          success={success}
          setSuccess={setSuccess}
          setError={setErrorMessage}
          setRequestType={setRequestType}
        />
        <AlertModal
          isOpen={alertIsOpen}
          toggle={toggleAlert}
          title={requestType === "remove" ? "Cost removed!" : "Process error!"}
          type={requestType === "remove" ? "success" : "danger"}
          description={requestType === "remove" ? "Data successfully saved" : errorMessage || "Please try again later"}
        />
      </View>
    </>
  );
};

export default memo(CostSection);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
});
