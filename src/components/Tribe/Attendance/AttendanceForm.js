import { memo, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";

import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import AlertModal from "../../../styles/modals/AlertModal";
import LateOrEarly from "./FormType/LateOrEarly";
import LateAndEarly from "./FormType/LateAndEarly";
import SubmittedReport from "./FormType/SubmittedReport";
import AllGood from "./FormType/AllGood";
import ForgotClockOut from "./FormType/ForgotClockOut";
import CustomSheet from "../../../layouts/CustomSheet";
import { useAttendance } from "./hooks/useAttendance";
import PickImage from "../../../styles/buttons/PickImage";

const AttendanceForm = ({
  toggleReport,
  date,
  handleSubmit,
  hasLateWithoutReason,
  hasEarlyWithoutReason,
  hasLateAndEarlyWithoutReason,
  hasSubmittedLateNotEarly,
  hasSubmittedEarlyNotLate,
  hasSubmittedBothReports,
  hasSubmittedReportAlpa,
  hasSubmittedLateReport,
  hasSubmittedEarlyReport,
  notAttend,
  reference,
  isOpen,
  toggle,
  requestType,
  error,
  refetchAttendance,
  refetchAttachment,
  handleSubmitSickAttachment,
  handleSelectFile,
  fileAttachment,
  setFileAttachment,
  setRequestType,
  setError,
  toggleAlert,
  toggleImage,
  imageIsOpen,
  unattendanceDate,
}) => {
  const {
    tabValue,
    setTabValue,
    number,
    setNumber,
    handleChangeTab,
    handleChangeNumber,
    tabs,
  } = useAttendance();

  /**
   * Handle for Late type
   */
  const lateType = date?.available_day_off
    ? [
        { label: "Late", value: "Late" },
        { label: "Permit", value: "Permit" },
        { label: "Other", value: "Other" },
        { label: "Day Off", value: "Day Off" },
      ]
    : [
        { label: "Late", value: "Late" },
        { label: "Permit", value: "Permit" },
        { label: "Other", value: "Other" },
      ];

  /**
   * Handle for Early type
   */
  const earlyType = [
    { label: "Went Home Early", value: "Early" },
    { label: "Permit", value: "Permit" },
    { label: "Other", value: "Other" },
  ];

  /**
   * Handle for Alpa type
   */
  const alpaType =
    date?.dayType === "Day Off"
      ? [
          { label: "Absent", value: "Absent" },
          { label: "Sick", value: "Sick" },
          { label: "Permit", value: "Permit" },
          { label: "Day Off", value: "Day Off" },
          { label: "Other", value: "Other" },
        ]
      : [
          { label: "Absent", value: "Absent" },
          { label: "Sick", value: "Sick" },
          { label: "Permit", value: "Permit" },
          { label: "Other", value: "Other" },
        ];

  const handleClose = () => {
    if (!formik.isSubmitting && formik.status !== "processing") {
      toggleReport();
      formik.resetForm();
    }
  };

  /**
   * Handle create attendance report
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      late_type: date?.lateType || "",
      late_reason: date?.lateReason || "",
      early_type: date?.earlyType || "",
      early_reason: date?.earlyReason || "",
      att_type: date?.attendanceType || "",
      att_reason: date?.attendanceReason || "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      handleSubmit(date?.id, values, setSubmitting, setStatus);
    },
  });

  const clockOutFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reason: "",
    },
    onSubmit: (values, {}) => {},
  });

  const sickAttachmentFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      begin_date: dayjs().format("YYYY-MM-DD") || "",
      end_date: dayjs().format("YYYY-MM-DD") || "",
      attachment: "",
    },
    validationSchema: yup.object().shape({
      begin_date: yup.date().required("Start date is required"),
      end_date: yup
        .date()
        .required("End date is required")
        .min(yup.ref("begin_date"), "End date can't be less than start date"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      handleSubmitSickAttachment(formData, setSubmitting, setStatus);
    },
  });

  const handleChangeStartDate = (value) => {
    if (unattendanceDate) {
      formik.setFieldValue("begin_date", unattendanceDate);
    } else {
      formik.setFieldValue("begin_date", value);
    }
  };

  const handleChangeEndDate = (value) => {
    formik.setFieldValue("end_date", value);
  };

  const renderForm = () => {
    if (hasLateWithoutReason) {
      return (
        <LateOrEarly
          formik={formik}
          arrayList={lateType}
          titleTime="Clock-in Time"
          time={date?.timeIn}
          title="Late Type"
          inputValue={formik.values.late_reason}
          inputOnChangeText={(value) => formik.setFieldValue("late_reason", value)}
          selectOnValueChange={(value) => formik.setFieldValue("late_type", value)}
          titleDuty="On Duty"
          timeDuty={date?.onDuty}
          titleLateOrEarly="Late"
          timeLateOrEarly={date?.late}
          placeholder="Select late type"
          fieldOption="late_type"
          inputType={formik.values.late_type}
          date={date?.date}
        />
      );
    } else if (hasEarlyWithoutReason) {
      return (
        <LateOrEarly
          formik={formik}
          arrayList={earlyType}
          titleTime="Clock-out Time"
          time={date?.timeOut}
          title="Early Type"
          inputValue={formik.values.early_reason}
          inputOnChangeText={(value) => formik.setFieldValue("early_reason", value)}
          selectOnValueChange={(value) => formik.setFieldValue("early_type", value)}
          titleDuty="Off Duty"
          timeDuty={date?.offDuty}
          titleLateOrEarly="Early"
          timeLateOrEarly={date?.early}
          placeholder="Select early type"
          fieldOption="early_type"
          inputType={formik.values.early_type}
          date={date?.date}
        />
      );
    } else if (
      hasLateAndEarlyWithoutReason ||
      hasSubmittedLateNotEarly ||
      hasSubmittedEarlyNotLate ||
      hasSubmittedBothReports
    ) {
      return (
        <LateAndEarly
          tabs={tabs}
          tabValue={tabValue}
          onChangeTab={handleChangeTab}
          onDuty={date?.onDuty}
          timeIn={date?.timeIn}
          late={date?.late}
          lateTypes={lateType}
          offDuty={date?.offDuty}
          early={date?.early}
          earlyTypes={earlyType}
          timeOut={date?.timeOut}
          formik={formik}
          date={date?.date}
          onChangeNumber={handleChangeNumber}
          number={number}
        />
      );
    } else if (hasSubmittedLateReport) {
      return (
        <SubmittedReport
          date={date}
          formik={formik}
          titleDuty="On Duty"
          titleClock="Clock-in Time"
          title="Late Type"
          field="late_type"
          types={lateType}
          fieldName="late_reason"
          reasonValue={formik.values.late_reason}
          typeValue={formik.values.late_type}
        />
      );
    } else if (hasSubmittedEarlyReport) {
      return (
        <SubmittedReport
          date={date}
          formik={formik}
          titleDuty="Off Duty"
          titleClock="Clock-out Time"
          title="Early Type"
          field="early_type"
          types={earlyType}
          fieldName="early_reason"
          reasonValue={formik.values.early_reason}
          typeValue={formik.values.early_type}
        />
      );
    } else if (hasSubmittedReportAlpa || notAttend) {
      return (
        <SubmittedReport
          date={date}
          formik={formik}
          title="Unattendance Type"
          field="att_type"
          types={alpaType}
          fieldName="att_reason"
          alpa={true}
          reasonValue={formik.values.att_reason}
          typeValue={formik.values.att_type}
          sickFormik={sickAttachmentFormik}
          onChangeStartDate={handleChangeStartDate}
          onChangeEndDate={handleChangeEndDate}
          onSelectFile={handleSelectFile}
          fileAttachment={fileAttachment}
          setFileAttachment={setFileAttachment}
          setRequestType={setRequestType}
          setError={setError}
          toggleAlert={toggleAlert}
          toggleImage={toggleImage}
        />
      );
    }
    // else if (!date?.timeOut) {
    //   return (
    //     <ForgotClockOut
    //       formik={clockOutFormik}
    //       value={clockOutFormik.values.reason}
    //       fieldName={"reason"}
    //       handleChange={(value) => clockOutFormik.setFieldValue("reason", value)}
    //     />
    //   );
    // }
  };

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
      refetchAttendance();
      refetchAttachment();
      toggleReport();
    }
  }, [formik.isSubmitting, formik.status]);

  useEffect(() => {
    return () => {
      setTabValue("late");
    };
  }, [date]);

  return (
    <CustomSheet reference={reference} handleClose={handleClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>{renderForm()}</View>
      </TouchableWithoutFeedback>

      <PickImage
        setImage={setFileAttachment}
        modalIsOpen={imageIsOpen}
        toggleModal={toggleImage}
      />
    </CustomSheet>
  );
};

export default memo(AttendanceForm);
