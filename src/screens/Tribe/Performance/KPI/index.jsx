import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as yup from "yup";

import { StyleSheet, View } from "react-native";

import { useFetch } from "../../../../hooks/useFetch";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useLoading } from "../../../../hooks/useLoading";
import ReturnConfirmationModal from "../../../../styles/modals/ReturnConfirmationModal";
import KPIDetailList from "../../../../components/Tribe/Performance/KPI/KPIDetailList";
import KPIForm from "../../../../components/Tribe/Performance/KPI/KPIForm";
import AlertModal from "../../../../styles/modals/AlertModal";
import Tabs from "../../../../layouts/Tabs";
import AttachmentForm from "../../../../components/Tribe/Performance/KPI/AttachmentForm";
import SaveButton from "../../../../components/Tribe/Performance/KPI/SaveButton";
import { selectFile } from "../../../../styles/buttons/SelectFIle";
import {
  attachmentDownloadHandler,
  employeeKpiValueUpdateHandler,
  getEmployeeKpiValue,
  openSelectedKpi,
  closeSelectedKpi,
  sumUpKpiValue,
  submitHandler,
  compareActualAchievement,
} from "../../../../components/Tribe/Performance/shared/functions";
import Screen from "../../../../layouts/Screen";
import KPIList from "../../../../components/Tribe/Performance/KPI/KPIList";
import AttachmentList from "../../../../components/Tribe/Performance/KPI/AttachmentList";
import { Colors } from "../../../../styles/Color";

const KPIScreen = () => {
  const [kpiValues, setKpiValues] = useState([]);
  const [employeeKpiValue, setEmployeeKpiValue] = useState([]);
  const [kpi, setKpi] = useState(null);
  const [employeeKpi, setEmployeeKpi] = useState(null);
  const [fileAttachment, setFileAttachment] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [tabValue, setTabValue] = useState("KPI");
  const [attachments, setAttachments] = useState([]);
  const [currentAttachments, setCurrentAttachments] = useState([]);
  const [differenceTotalAttachments, setDifferenceTotalAttachments] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const formScreenSheetRef = useRef(null);
  const formAttachmentScreenSheetRef = useRef(null);

  const { isOpen: returnModalIsOpen, toggle: toggleReturnModal } = useDisclosure(false);
  const { isOpen: saveModalIsOpen, toggle: toggleSaveModal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { isLoading: submitIsLoading, toggle: toggleSubmit } = useLoading(false);

  const { id } = route.params;

  const { data: kpiSelected } = useFetch(`/hr/employee-kpi/${id}/start`);
  const kpiId = kpiSelected?.data?.id;

  const {
    data: kpiList,
    refetch: refetchKpiList,
    isLoading: kpiListIsLoading,
  } = useFetch(`/hr/employee-kpi/${kpiId}`);

  const openSelectedAttachmentKpi = () => {
    formAttachmentScreenSheetRef.current?.show();
  };
  const closeSelectedAttachmentKpi = () => {
    formAttachmentScreenSheetRef.current?.hide();
  };

  const tabs = useMemo(() => {
    return [
      {
        title: `KPI`,
        value: "KPI",
      },
      { title: `Attachment`, value: "Attachment" },
    ];
  }, []);

  const handleChangeTab = useCallback((value) => {
    setTabValue(value);
  }, []);

  const handleUpdateKpiAttachment = (data, setStatus, setSubmitting) => {
    setEmployeeKpiValue((prevState) => {
      let currentData = [...prevState];
      const index = currentData.findIndex(
        (employee_kpi_val) => employee_kpi_val?.id === data?.id
      );
      if (index > -1) {
        currentData[index].attachment = [...currentData[index].attachment, data.file];
      }
      return [...currentData];
    });
    setStatus("success");
    setSubmitting(false);
  };

  const handleDeleteKpiAttachment = (employee_kpi_id, id, att_index) => {
    if (att_index > -1) {
      setEmployeeKpiValue((prevState) => {
        let currentData = [...prevState];
        const index = currentData.findIndex(
          (employee_kpi_val) => employee_kpi_val?.id === employee_kpi_id
        );
        if (index > -1) {
          currentData[index].attachment.splice(att_index, 1);
          if (id) {
            currentData[index].deleted_attachment = [];
            currentData[index].deleted_attachment = [
              ...currentData[index].deleted_attachment,
              id,
            ];
          }
        }
        return [...currentData];
      });
    }
  };

  const handleSumAttachments = () => {
    setAttachments(() => {
      let attachmentArr = [];
      employeeKpiValue.map((kpiVal) => {
        kpiVal?.attachment?.map((attVal, index) => {
          attachmentArr = [
            ...attachmentArr,
            {
              employee_kpi_id: kpiVal?.id,
              attachment_id: attVal?.id || null,
              index: index,
              description:
                kpiVal?.description || kpiVal?.performance_kpi_value?.description,
              file_name: attVal?.file_name || null,
              file_path: attVal?.file_path || null,
              attachment: !attVal?.file_name ? attVal : null,
            },
          ];
        });
      });
      return [...attachmentArr];
    });
  };

  const handleSumCurrentAttachments = () => {
    setCurrentAttachments(() => {
      let attachmentArr = [];
      kpiValues.map((kpiVal) => {
        kpiVal?.attachment?.map((attVal, index) => {
          attachmentArr = [
            ...attachmentArr,
            {
              employee_kpi_id: kpiVal?.id,
              attachment_id: attVal?.id || null,
              index: index,
              description:
                kpiVal?.description || kpiVal?.performance_kpi_value?.description,
              file_name: attVal?.file_name || null,
              file_path: attVal?.file_path || null,
              attachment: !attVal?.file_name ? attVal : null,
            },
          ];
        });
      });
      return [...attachmentArr];
    });
  };

  let differences = compareActualAchievement(kpiValues, employeeKpiValue);

  /**
   * Handle convert integer to string for KPI
   */
  if (!kpi?.actual_achievement) {
    var actualString = null;
  } else {
    var actualString = kpi?.actual_achievement.toString();
  }

  /**
   * Handle create kpi value
   */
  const formik = useFormik({
    initialValues: {
      id: kpi?.id,
      actual_achievement:
        // achievement || 0,
        actualString || 0,
    },
    validationSchema: yup.object().shape({
      actual_achievement: yup
        .number()
        .required("Value is required")
        .min(0, "Value should not be negative")
        .max(kpi?.target, "Value should not exceed target"),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        if (values.actual_achievement) {
          values.actual_achievement = Number(values.actual_achievement);
        } else {
          values.actual_achievement = null;
        }
        employeeKpiValueUpdateHandler(values, setEmployeeKpiValue);
      }
    },
    enableReinitialize: true,
  });

  const formikAttachment = useFormik({
    initialValues: {
      id: "",
      file: fileAttachment || "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setSubmitting("processing");
      handleUpdateKpiAttachment(values, setStatus, setSubmitting);
    },
    enableReinitialize: true,
  });

  const handleReturn = () => {
    if (differences.length === 0 && attachments.length === currentAttachments.length) {
      navigation.goBack();
    } else {
      toggleReturnModal();
    }
  };

  const differenceBetweenCurrentAttachmentsAndLatestAttachments = () => {
    setDifferenceTotalAttachments(attachments?.length - currentAttachments?.length);
  };

  useEffect(() => {
    if (kpiList?.data) {
      sumUpKpiValue(setKpiValues, kpiList);
      setEmployeeKpiValue(() => {
        const employeeKpiValue = getEmployeeKpiValue(kpiList?.data?.employee_kpi_value);
        return [...employeeKpiValue];
      });
    }
  }, [kpiList?.data]);

  useEffect(() => {
    handleSumAttachments();
  }, [employeeKpiValue]);

  useEffect(() => {
    handleSumCurrentAttachments();
  }, [employeeKpiValue]);

  useEffect(() => {
    differenceBetweenCurrentAttachmentsAndLatestAttachments();
  }, [currentAttachments, attachments]);

  useEffect(() => {
    if (!formikAttachment.isSubmitting && formikAttachment.status === "success") {
      formikAttachment.resetForm();
      setFileAttachment(null);
    }
  }, [formikAttachment.isSubmitting, formikAttachment.status]);

  return (
    <Screen
      screenTitle={kpiList?.data?.performance_kpi?.review?.description || "Employee KPI"}
      returnButton={true}
      onPress={handleReturn}
      backgroundColor={Colors.backgroundLight}
      childrenHeader={
        kpiList?.data?.confirm || kpiValues?.length === 0 ? null : (
          <SaveButton
            isLoading={submitIsLoading}
            differences={differences}
            onSubmit={submitHandler}
            differenceTotalAttachments={differenceTotalAttachments}
            toggleSubmit={toggleSubmit}
            toggleSaveModal={toggleSaveModal}
            employeeKpiValue={employeeKpiValue}
            kpiList={kpiList}
            setRequestType={setRequestType}
            refetchKpiList={refetchKpiList}
            setError={setErrorMessage}
          />
        )
      }
    >
      <KPIDetailList
        dayjs={dayjs}
        begin_date={kpiList?.data?.performance_kpi?.review?.begin_date}
        end_date={kpiList?.data?.performance_kpi?.review?.end_date}
        target={kpiList?.data?.performance_kpi?.target_name}
        target_level={kpiList?.data?.performance_kpi?.target_level}
      />

      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={handleChangeTab} />
      </View>

      {tabValue === "KPI" ? (
        <KPIList
          kpiValues={kpiValues}
          handleSelectedKpi={openSelectedKpi}
          setKpi={setKpi}
          setEmployeeKpi={setEmployeeKpi}
          reference={formScreenSheetRef}
        />
      ) : (
        <AttachmentList
          kpiList={kpiList}
          attachments={attachments}
          handleDelete={handleDeleteKpiAttachment}
        />
      )}

      <ReturnConfirmationModal
        isOpen={returnModalIsOpen}
        toggle={toggleReturnModal}
        description="Are you sure want to return? Data changes will not be save."
        onPress={() => navigation.goBack()}
      />
      <KPIForm
        reference={formScreenSheetRef}
        threshold={kpi?.threshold}
        weight={kpi?.weight}
        measurement={kpi?.measurement}
        description={kpi?.description}
        formik={formik}
        handleClose={closeSelectedKpi}
        achievement={kpi?.actual_achievement}
        target={kpi?.target}
        achievementValue={employeeKpi?.actual_achievement}
        confirmed={kpiList?.data?.confirm}
        attachment={kpi?.attachment}
        onDownload={attachmentDownloadHandler}
      />
      <AttachmentForm
        reference={formAttachmentScreenSheetRef}
        onSelectFile={selectFile}
        kpiValues={employeeKpiValue}
        formik={formikAttachment}
        handleClose={closeSelectedAttachmentKpi}
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        setRequestType={setRequestType}
        toggleAlert={toggleAlert}
        setError={setErrorMessage}
      />
      <AlertModal
        isOpen={saveModalIsOpen}
        toggle={toggleSaveModal}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Changes saved!" : "Process error!"}
        description={
          requestType === "post"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
      />

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        type={requestType === "rejected" ? "warning" : "danger"}
        title="Process error!"
        description={errorMessage || "Please try again later"}
      />
    </Screen>
  );
};

export default KPIScreen;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
