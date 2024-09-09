import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import { Pressable, ScrollView, StyleSheet, View, Linking } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useLoading } from "../../../../hooks/useLoading";
import { useFetch } from "../../../../hooks/useFetch";
import axiosInstance from "../../../../config/api";
import KPIReviewDetailList from "../../../../components/Tribe/Performance/Review/KPIReviewDetailList";
import KPIReviewDetailItem from "../../../../components/Tribe/Performance/Review/KPIReviewDetailItem";
import KPIReviewForm from "../../../../components/Tribe/Performance/Review/KPIReviewForm";
import ReturnConfirmationModal from "../../../../styles/modals/ReturnConfirmationModal";
import AlertModal from "../../../../styles/modals/AlertModal";
import ConfirmationModal from "../../../../styles/modals/ConfirmationModal";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";
import KPIReviewSaveButton from "../../../../components/Tribe/Performance/Review/KPIReviewSaveButton";
import Screen from "../../../../styles/Screen";

const KPIReview = () => {
  const [kpiValues, setKpiValues] = useState([]);
  const [employeeKpiValue, setEmployeeKpiValue] = useState([]);
  const [kpi, setKpi] = useState(null);
  const [employeeKpi, setEmployeeKpi] = useState(null);
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

  const { data: kpiList, refetch: refetchKpiList } = useFetch(`/hr/employee-review/kpi/${id}`);

  /**
   * Handle selected KPI item
   * @param {*} data
   * @param {*} value
   */
  const openSelectedKpi = (data, value) => {
    setKpi(data);
    setEmployeeKpi(value);
    formScreenSheetRef.current?.show();
  };
  const closeSelectedKpi = () => {
    formScreenSheetRef.current?.hide();
  };

  const handleReturn = () => {
    if (differences.length === 0) {
      navigation.goBack();
    } else {
      toggleReturnModal();
    }
  };

  const attachmentDownloadHandler = async (file_path) => {
    try {
      Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${file_path}`, "_blank");
    } catch (err) {
      console.log(err);
    }
  };

  const getEmployeeKpiValue = (employee_kpi_value) => {
    let employeeKpiValArr = [];
    if (Array.isArray(employee_kpi_value)) {
      employee_kpi_value.forEach((val) => {
        employeeKpiValArr = [
          ...employeeKpiValArr,
          {
            ...val?.performance_kpi_value,
            id: val?.id,
            performance_kpi_value_id: val?.performance_kpi_value_id,
            supervisor_actual_achievement: val?.supervisor_actual_achievement,
            employee_actual_achievement: val?.actual_achievement,
            attachment: val?.attachment,
          },
        ];
      });
    }
    return [...employeeKpiValArr];
  };

  /**
   * Handle update value of KPI item
   * @param {*} data
   */
  const employeeKpiValueUpdateHandler = (data) => {
    setEmployeeKpiValue((prevState) => {
      let currentData = [...prevState];
      const index = currentData.findIndex(
        (employee_kpi_val) => employee_kpi_val?.performance_kpi_value_id === data?.performance_kpi_value_id
      );
      if (index > -1) {
        currentData[index].supervisor_actual_achievement = data?.supervisor_actual_achievement;
      } else {
        currentData = [...currentData, data];
      }
      return [...currentData];
    });
  };

  /**
   * Handle array of update KPI item
   */
  const sumUpKpiValue = () => {
    setKpiValues(() => {
      const employeeKpiValue = getEmployeeKpiValue(kpiList?.data?.employee_kpi_value);
      return [...employeeKpiValue];
    });
  };

  /**
   * Handle saved actual achievement value to be can saved or not
   * @param {*} kpiValues
   * @param {*} employeeKpiValue
   * @returns
   */
  const compareActualAchievement = (kpiValues, employeeKpiValue) => {
    let differences = [];

    for (let empKpi of employeeKpiValue) {
      let kpiValue = kpiValues.find((kpi) => kpi.id === empKpi.id);

      if (kpiValue && kpiValue.supervisor_actual_achievement !== empKpi.supervisor_actual_achievement) {
        differences.push({
          id: empKpi.id,
          difference: empKpi.supervisor_actual_achievement - kpiValue.supervisor_actual_achievement,
        });
      }
    }

    return differences;
  };

  let differences = compareActualAchievement(kpiValues, employeeKpiValue);

  /**
   * Handle convert integer to string for KPI
   */
  if (!kpi?.supervisor_actual_achievement) {
    var actualString = null;
  } else {
    var actualString = kpi?.supervisor_actual_achievement.toString();
  }

  /**
   * Handle save filled or updated KPI
   */
  const submitHandler = async () => {
    try {
      toggleSubmit();
      await axiosInstance.patch(`/hr/employee-review/kpi/${kpiList?.data?.id}`, {
        kpi_value: employeeKpiValue,
      });
      setRequestType("patch");
      toggleSaveModal();
      refetchKpiList();
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
   * Handle create KPI value
   */
  const formik = useFormik({
    initialValues: {
      performance_kpi_value_id: kpi?.performance_kpi_value_id || kpi?.id,
      supervisor_actual_achievement:
        // achievement || 0,
        actualString || 0,
    },
    validationSchema: yup.object().shape({
      supervisor_actual_achievement: yup
        .number()
        .required("Value is required")
        .min(0, "Value should not be negative")
        .max(kpi?.target, "Value should not exceed target"),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        if (values.supervisor_actual_achievement) {
          values.supervisor_actual_achievement = Number(values.supervisor_actual_achievement);
        } else {
          values.supervisor_actual_achievement = null;
        }
        employeeKpiValueUpdateHandler(values);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (kpiList?.data) {
      sumUpKpiValue();
      setEmployeeKpiValue(() => {
        const employeeKpiValue = getEmployeeKpiValue(kpiList?.data?.employee_kpi_value);
        return [...employeeKpiValue];
      });
    }
  }, [kpiList?.data]);

  return (
    <Screen
      screenTitle={kpiList?.data?.performance_kpi?.review?.description || "KPI Review"}
      returnButton={true}
      onPress={handleReturn}
      childrenHeader={
        kpiValues.length === 0 || kpiList?.data?.confirm ? null : (
          <KPIReviewSaveButton isLoading={submitIsLoading} differences={differences} onSubmit={submitHandler} />
        )
      }
    >
      <KPIReviewDetailList
        dayjs={dayjs}
        begin_date={kpiList?.data?.performance_kpi?.review?.begin_date}
        end_date={kpiList?.data?.performance_kpi?.review?.end_date}
        target={kpiList?.data?.performance_kpi?.target_name}
        name={kpiList?.data?.employee?.name}
      />

      <ScrollView>
        {kpiValues && kpiValues.length > 0 ? (
          kpiValues.map((item, index) => {
            const correspondingEmployeeKpi = employeeKpiValue.find((empKpi) => empKpi.id === item.id);
            return (
              <KPIReviewDetailItem
                key={index}
                item={item}
                id={item?.id}
                description={item?.description}
                target={item?.target}
                weight={item?.weight}
                threshold={item?.threshold}
                measurement={item?.measurement}
                achievement={item?.supervisor_actual_achievement}
                handleOpen={openSelectedKpi}
                employeeKpiValue={correspondingEmployeeKpi}
                attachment={item?.attachment}
                onDownload={attachmentDownloadHandler}
                index={index}
                length={kpiValues?.length}
              />
            );
          })
        ) : (
          <View style={styles.content}>
            <EmptyPlaceholder height={250} width={250} text="No Data" />
          </View>
        )}
      </ScrollView>
      {kpiValues.length > 0 ? (
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
      <KPIReviewForm
        reference={formScreenSheetRef}
        threshold={kpi?.threshold}
        weight={kpi?.weight}
        measurement={kpi?.measurement}
        description={kpi?.description}
        formik={formik}
        handleClose={closeSelectedKpi}
        achievement={kpi?.supervisor_actual_achievement}
        target={kpi?.target}
        achievementValue={employeeKpi?.supervisor_actual_achievement}
        employee_achievement={employeeKpi?.employee_actual_achievement}
        attachment={kpi?.attachment}
      />
      <ConfirmationModal
        isOpen={confirmationModalIsOpen}
        toggle={toggleConfirmationModal}
        isGet={true}
        isDelete={false}
        apiUrl={`/hr/employee-review/kpi/${id}/finish`}
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
        description={requestType === "patch" ? "Data successfully saved" : errorMessage || "Please try again later"}
      />

      <AlertModal
        isOpen={confirmedModalIsOpen}
        toggle={toggleConfirmedModal}
        type={requestType === "fetch" ? "success" : "danger"}
        title={requestType === "fetch" ? "Report submitted!" : "Process error!"}
        description={requestType === "fetch" ? "Your report is logged" : errorMessage || "Please try again later"}
      />
    </Screen>
  );
};

export default KPIReview;

const styles = StyleSheet.create({
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
