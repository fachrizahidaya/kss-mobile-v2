import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useFormik } from "formik";

import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ReturnConfirmationModal from "../../../../styles/modals/ReturnConfirmationModal";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useFetch } from "../../../../hooks/useFetch";
import { useLoading } from "../../../../hooks/useLoading";
import axiosInstance from "../../../../config/api";
import AppraisalDetailList from "../../../../components/Tribe/Performance/Appraisal/AppraisalDetailList";
import AppraisalDetailItem from "../../../../components/Tribe/Performance/Appraisal/AppraisalDetailItem";
import AppraisalForm from "../../../../components/Tribe/Performance/Appraisal/AppraisalForm";
import AlertModal from "../../../../styles/modals/AlertModal";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";
import SaveButton from "../../../../components/Tribe/Performance/Appraisal/SaveButton";
import Screen from "../../../../styles/Screen";

const AppraisalScreen = () => {
  const [appraisalValues, setAppraisalValues] = useState([]);
  const [employeeAppraisalValue, setEmployeeAppraisalValue] = useState([]);
  const [appraisal, setAppraisal] = useState(null);
  const [employeeAppraisal, setEmployeeAppraisal] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const formScreenSheetRef = useRef(null);

  const { isOpen: returnModalIsOpen, toggle: toggleReturnModal } = useDisclosure(false);
  const { isOpen: saveModalIsOpen, toggle: toggleSaveModal } = useDisclosure(false);

  const { isLoading: submitIsLoading, toggle: toggleSubmit } = useLoading(false);

  const { id } = route.params;

  const { data: appraisalSelected } = useFetch(`/hr/employee-appraisal/${id}/start`);
  const appraisalId = appraisalSelected?.data?.id;

  const {
    data: appraisalList,
    refetch: refetchAppraisalList,
    isLoading: appraisalListIsLoading,
  } = useFetch(`/hr/employee-appraisal/${appraisalId}`);

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
          choice: val?.choice,
          notes: val?.notes,
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
      let currentData = [...prevState];
      const index = currentData.findIndex(
        (employee_appraisal_val) =>
          employee_appraisal_val?.performance_appraisal_value_id === data?.performance_appraisal_value_id
      );
      if (index > -1) {
        currentData[index].choice = data?.choice;
        currentData[index].notes = data?.notes;
      } else {
        currentData = [...currentData, data];
      }
      return [...currentData];
    });
  };

  /**
   * Handle array of update Appraisal item
   */
  const sumUpAppraisalValue = () => {
    setAppraisalValues(() => {
      const performanceAppraisalValue = appraisalList?.data?.performance_appraisal?.value;
      const employeeAppraisalValue = getEmployeeAppraisalValue(appraisalList?.data?.employee_appraisal_value);
      return [...employeeAppraisalValue, ...performanceAppraisalValue];
    });
  };

  /**
   * Handle saved selected value to be can saved or not
   * @param {*} appraisalValues
   * @param {*} employeeAppraisalValue
   * @returns
   */
  const compareActualChoiceAndNote = (appraisalValues, employeeAppraisalValue) => {
    let differences = [];

    for (let empAppraisal of employeeAppraisalValue) {
      let appraisalValue = appraisalValues.find((appraisal) => appraisal.id === empAppraisal.id);

      if (appraisalValue && appraisalValue.choice !== empAppraisal.choice) {
        differences.push({
          id: empAppraisal.id,
          difference: [empAppraisal.choice, appraisalValue.choice],
        });
      }
      if (appraisalValue && appraisalValue.notes !== empAppraisal.notes) {
        differences.push({
          id: empAppraisal.id,
          difference: [empAppraisal.notes, appraisalValue.notes],
        });
      }
    }

    return differences;
  };

  let differences = compareActualChoiceAndNote(appraisalValues, employeeAppraisalValue);

  const handleReturn = () => {
    if (differences.length === 0) {
      navigation.goBack();
    } else {
      toggleReturnModal();
    }
  };

  /**
   * Handle saved selected value to be can saved or not
   */
  const submitHandler = async () => {
    try {
      toggleSubmit();
      await axiosInstance.patch(`/hr/employee-appraisal/${appraisalList?.data?.id}`, {
        appraisal_value: employeeAppraisalValue,
      });
      setRequestType("patch");
      toggleSaveModal();
      refetchAppraisalList();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setErrorMessage(err.response.data.message);
      toggleSaveModal();
      toggleSubmit();
    } finally {
      toggleSubmit();
    }
  };

  /**
   * Handle create appraisal value
   */
  const formik = useFormik({
    initialValues: {
      performance_appraisal_value_id: appraisal?.performance_appraisal_value_id || appraisal?.id,
      choice: appraisal?.choice || null,
      notes: appraisal?.notes || null,
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
    <Screen
      screenTitle={appraisalList?.data?.performance_appraisal?.review?.description || "Employee Appraisal"}
      returnButton={true}
      onPress={handleReturn}
      childrenHeader={
        appraisalList?.data?.confirm || !appraisalValues ? null : (
          <SaveButton isLoading={submitIsLoading} differences={differences} onSubmit={submitHandler} />
        )
      }
    >
      <AppraisalDetailList
        dayjs={dayjs}
        begin_date={appraisalList?.data?.begin_date}
        end_date={appraisalList?.data?.end_date}
        name={appraisalList?.data?.description}
        target={appraisalList?.data?.performance_appraisal?.target_name}
        target_level={appraisalList?.data?.performance_appraisal?.target_level}
      />

      <ScrollView>
        {appraisalValues && appraisalValues.length > 0 ? (
          appraisalValues.map((item, index) => {
            const correspondingEmployeeAppraisal = employeeAppraisalValue.find(
              (empAppraisal) => empAppraisal.id === item.id
            );
            return (
              <AppraisalDetailItem
                key={index}
                id={item?.performance_appraisal_value_id || item?.id}
                description={item?.description}
                item={item}
                choice={item?.choice}
                onChange={employeeAppraisalValueUpdateHandler}
                choice_a={item?.choice_a}
                choice_b={item?.choice_b}
                choice_c={item?.choice_c}
                choice_d={item?.choice_d}
                choice_e={item?.choice_e}
                handleOpen={openSelectedAppraisal}
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

      <ReturnConfirmationModal
        isOpen={returnModalIsOpen}
        toggle={toggleReturnModal}
        description="Are you sure want to return? Data changes will not be save."
        onPress={() => navigation.goBack()}
      />
      <AppraisalForm
        reference={formScreenSheetRef}
        handleClose={closeSelectedAppraisal}
        description={appraisal?.description}
        choice_a={appraisal?.choice_a}
        choice_b={appraisal?.choice_b}
        choice_c={appraisal?.choice_c}
        choice_d={appraisal?.choice_d}
        choice_e={appraisal?.choice_e}
        formik={formik}
        choice={appraisal?.choice}
        choiceValue={employeeAppraisal?.choice}
        notes={appraisal?.notes}
        noteValue={employeeAppraisal?.notes}
        confirmed={appraisalList?.data?.confirm}
      />
      <AlertModal
        isOpen={saveModalIsOpen}
        toggle={toggleSaveModal}
        type={requestType === "patch" ? "success" : "danger"}
        title={requestType === "patch" ? "Changes saved!" : "Process error!"}
        description={requestType === "patch" ? "Data successfully saved" : errorMessage || "Please try again later"}
      />
    </Screen>
  );
};

export default AppraisalScreen;

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
