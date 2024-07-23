import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";

import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ReturnConfirmationModal from "../../../../styles/modals/ReturnConfirmationModal";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useLoading } from "../../../../hooks/useLoading";
import { useFetch } from "../../../../hooks/useFetch";
import axiosInstance from "../../../../config/api";
import AppraisalReviewDetailList from "../../../../components/Tribe/Performance/Review/AppraisalReviewDetailList";
import AppraisalReviewDetailItem from "../../../../components/Tribe/Performance/Review/AppraisalReviewDetailItem";
import PageHeader from "../../../../styles/PageHeader";
import AppraisalReviewForm from "../../../../components/Tribe/Performance/Review/AppraisalReviewForm";
import AlertModal from "../../../../styles/modals/AlertModal";
import ConfirmationModal from "../../../../styles/modals/ConfirmationModal";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";
import AppraisalReviewSaveButton from "../../../../components/Tribe/Performance/Review/AppraisalReviewSaveButton";

const AppraisalReview = () => {
  const [appraisalValues, setAppraisalValues] = useState([]);
  const [employeeAppraisalValue, setEmployeeAppraisalValue] = useState([]);
  const [appraisal, setAppraisal] = useState(null);
  const [employeeAppraisal, setEmployeeAppraisal] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const formScreenSheetRef = useRef(null);

  const { id } = route.params;

  const { isOpen: returnModalIsOpen, toggle: toggleReturnModal } = useDisclosure(false);
  const { isOpen: saveModalIsOpen, toggle: toggleSaveModal } = useDisclosure(false);
  const { isOpen: confirmationModalIsOpen, toggle: toggleConfirmationModal } = useDisclosure(false);
  const { isOpen: confirmedModalIsOpen, toggle: toggleConfirmedModal } = useDisclosure(false);

  const { isLoading: submitIsLoading, toggle: toggleSubmit } = useLoading(false);

  const { data: appraisalList, refetch: refetchAppraisalList } = useFetch(`/hr/employee-review/appraisal/${id}`);

  /**
   * Handle selected Appraisal item
   * @param {*} data
   * @param {*} value
   */
  const openSelectedAppraisal = (data, value) => {
    setAppraisal(data);
    setEmployeeAppraisal(value);
    formScreenSheetRef.current?.show();
  };
  const closeSelectedAppraisal = () => {
    formScreenSheetRef.current?.hide();
  };

  const getEmployeeAppraisalValue = (employee_appraisal_value) => {
    let employeeAppraisalValArr = [];
    if (Array.isArray(employee_appraisal_value)) {
      employee_appraisal_value.forEach((val) => {
        employeeAppraisalValArr.push({
          ...val?.performance_appraisal_value,
          id: val?.id,
          performance_appraisal_value_id: val?.performance_appraisal_value_id,
          supervisor_choice: val?.supervisor_choice,
          employee_choice: val?.choice,
          supervisor_notes: val?.supervisor_notes,
          employee_notes: val?.notes,
        });
      });
    }
    return employeeAppraisalValArr;
  };

  /**
   * Handle update value of Appraisal item
   * @param {*} data
   */
  const employeeAppraisalValueUpdateHandler = (data) => {
    setEmployeeAppraisalValue((prevState) => {
      const index = prevState.findIndex(
        (employee_appraisal_val) =>
          employee_appraisal_val?.performance_appraisal_value_id === data?.performance_appraisal_value_id
      );
      const currentData = [...prevState];
      if (index > -1) {
        currentData[index].supervisor_choice = data?.supervisor_choice;
        currentData[index].supervisor_notes = data?.supervisor_notes;
      } else {
        currentData.push(data);
      }
      return currentData;
    });
  };

  /**
   * Handle array of update Appraisal item
   */
  const sumUpAppraisalValue = () => {
    setAppraisalValues(() => {
      const employeeAppraisalValue = getEmployeeAppraisalValue(appraisalList?.data?.employee_appraisal_value);
      return [...employeeAppraisalValue];
    });
  };

  /**
   * Handle saved actual achievement value to be can saved or not
   * @param {*} appraisalValues
   * @param {*} employeeAppraisalValue
   * @returns
   */
  const compareActualChoiceAndNotes = (appraisalValues, employeeAppraisalValue) => {
    let differences = [];

    for (let empAppraisal of employeeAppraisalValue) {
      let appraisalValue = appraisalValues.find((appraisal) => appraisal.id === empAppraisal.id);

      if (appraisalValue && appraisalValue.supervisor_choice !== empAppraisal.supervisor_choice) {
        differences.push({
          id: empAppraisal.id,
          difference: [empAppraisal.supervisor_choice, appraisalValue.supervisor_choice],
        });
      }
      if (appraisalValue && appraisalValue.supervisor_notes !== empAppraisal.supervisor_notes) {
        differences.push({
          id: empAppraisal.id,
          difference: [empAppraisal.supervisor_notes, appraisalValue.supervisor_notes],
        });
      }
    }

    return differences;
  };

  let differences = compareActualChoiceAndNotes(appraisalValues, employeeAppraisalValue);

  /**
   * Handle save filled or updated Appraisal
   */
  const submitHandler = async () => {
    try {
      toggleSubmit();
      const res = await axiosInstance.patch(`/hr/employee-review/appraisal/${appraisalList?.data?.id}`, {
        appraisal_value: employeeAppraisalValue,
      });
      setRequestType("patch");
      toggleSaveModal();
      refetchAppraisalList();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      toggleSaveModal();
      toggleSubmit();
    } finally {
      toggleSubmit();
    }
  };

  /**
   * Handle create Appraisal value
   */
  const formik = useFormik({
    initialValues: {
      performance_appraisal_value_id: appraisal?.performance_appraisal_value_id || appraisal?.id,
      supervisor_choice: appraisal?.supervisor_choice || "",
      supervisor_notes: appraisal?.supervisor_notes || "",
    },
    onSubmit: (values) => {
      if (formik.isValid) {
        employeeAppraisalValueUpdateHandler(values);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (appraisalList?.data) {
      sumUpAppraisalValue();
      setEmployeeAppraisalValue(() => {
        const employeeAppraisalValue = getEmployeeAppraisalValue(appraisalList?.data?.employee_appraisal_value);
        return [...employeeAppraisalValue];
      });
    }
  }, [appraisalList?.data]);

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <View style={styles.header}>
        <PageHeader
          width={200}
          title="Appraisal Review"
          backButton={true}
          onPress={() => {
            if (differences.length === 0) {
              navigation.goBack();
            } else {
              toggleReturnModal();
            }
          }}
        />
        {appraisalValues.length === 0 || appraisalList?.data?.confirm ? null : (
          <AppraisalReviewSaveButton isLoading={submitIsLoading} differences={differences} onSubmit={submitHandler} />
        )}
      </View>

      <AppraisalReviewDetailList
        dayjs={dayjs}
        begin_date={appraisalList?.data?.performance_appraisal?.review?.begin_date}
        end_date={appraisalList?.data?.performance_appraisal?.review?.end_date}
        target={appraisalList?.data?.performance_appraisal?.target_name}
        name={appraisalList?.data?.employee?.name}
      />

      <View style={styles.container}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
          {appraisalValues && appraisalValues.length > 0 ? (
            appraisalValues.map((item, index) => {
              const correspondingEmployeeAppraisal = employeeAppraisalValue.find(
                (empAppraisal) => empAppraisal.id === item.id
              );
              return (
                <AppraisalReviewDetailItem
                  key={index}
                  item={item}
                  id={item?.id}
                  description={item?.description}
                  onChange={employeeAppraisalValueUpdateHandler}
                  handleOpen={openSelectedAppraisal}
                  choice_a={item?.choice_a}
                  choice_b={item?.choice_b}
                  choice_c={item?.choice_c}
                  choice_d={item?.choice_d}
                  choice_e={item?.choice_e}
                  choice={item?.supervisor_choice}
                  employeeAppraisalValue={correspondingEmployeeAppraisal}
                />
              );
            })
          ) : (
            <View style={styles.content}>
              <EmptyPlaceholder height={250} width={250} text="No Data" />
            </View>
          )}
        </ScrollView>
      </View>
      {appraisalValues.length > 0 ? (
        <Pressable style={styles.confirmIcon} onPress={toggleConfirmationModal}>
          <MaterialCommunityIcons name="check" size={30} color="#FFFFFF" />
        </Pressable>
      ) : null}

      <ReturnConfirmationModal
        isOpen={returnModalIsOpen}
        toggle={toggleReturnModal}
        description="Are you sure want to return? Data changes will not be save."
        onPress={() => navigation.goBack()}
      />
      <AppraisalReviewForm
        reference={formScreenSheetRef}
        handleClose={closeSelectedAppraisal}
        description={appraisal?.description}
        choice_a={appraisal?.choice_a}
        choice_b={appraisal?.choice_b}
        choice_c={appraisal?.choice_c}
        choice_d={appraisal?.choice_d}
        choice_e={appraisal?.choice_e}
        formik={formik}
        choice={appraisal?.supervisor_choice}
        choiceValue={employeeAppraisal?.supervisor_choice}
        employee_choice={appraisal?.employee_choice}
        employee_notes={appraisal?.employee_notes}
      />
      <ConfirmationModal
        isOpen={confirmationModalIsOpen}
        toggle={toggleConfirmationModal}
        isGet={true}
        isDelete={false}
        apiUrl={`/hr/employee-review/appraisal/${id}/finish`}
        color="#377893"
        hasSuccessFunc={true}
        onSuccess={() => navigation.goBack()}
        description="Are you sure want to confirm this review?"
        toggleOtherModal={toggleConfirmedModal}
        success={success}
        setSuccess={setSuccess}
        setError={setErrorMessage}
        setRequestType={setRequestType}
      />
      <AlertModal
        isOpen={saveModalIsOpen}
        toggle={toggleSaveModal}
        type={requestType === "patch" ? "success" : "danger"}
        title={requestType === "patch" ? "Changes saved!" : "Process error!"}
        description={
          requestType === "patch" ? "Data has successfully updated" : errorMessage || "Please try again later"
        }
      />

      <AlertModal
        isOpen={confirmedModalIsOpen}
        toggle={toggleConfirmedModal}
        type={requestType === "fetch" ? "success" : "danger"}
        title={requestType === "fetch" ? "Report submitted!" : "Process error!"}
        description={requestType === "fetch" ? "Your report is logged" : errorMessage || "Please try again later"}
      />
    </SafeAreaView>
  );
};

export default AppraisalReview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  confirmIcon: {
    backgroundColor: "#377893",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 50,
    right: 15,
    zIndex: 2,
    borderRadius: 30,
    shadowOffset: 0,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  content: {
    marginTop: 20,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
