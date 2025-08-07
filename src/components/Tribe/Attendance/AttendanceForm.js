import { memo, useEffect } from "react";
import { useFormik } from "formik";

import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import AlertModal from "../../../styles/modals/AlertModal";
import LateOrEarly from "./FormType/LateOrEarly";
import LateAndEarly from "./FormType/LateAndEarly";
import LeaveOrPermit from "./FormType/LeaveOrPermit";
import SubmittedReport from "./FormType/SubmittedReport";
import AllGood from "./FormType/AllGood";
import CustomSheet from "../../../layouts/CustomSheet";
import HolidayLeave from "./FormType/HolidayLeave";
import styles from "./Attendance.styles";
import { useAttendance } from "./hooks/useAttendance";

const AttendanceForm = ({
  toggleReport,
  date,
  handleSubmit,
  hasClockInAndOut,
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
    { label: "Went Home Early", value: "Went Home Early" },
    { label: "Permit", value: "Permit" },
    { label: "Other", value: "Other" },
  ];

  /**
   * Handle for Alpa type
   */
  const alpaType =
    date?.dayType === "Day Off"
      ? [
          { label: "Alpa", value: "Alpa" },
          { label: "Sick", value: "Sick" },
          { label: "Permit", value: "Permit" },
          { label: "Day Off", value: "Day Off" },
          { label: "Other", value: "Other" },
        ]
      : [
          { label: "Alpa", value: "Alpa" },
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
        <View>
          {/* If employee ontime for Clock in and Clock out */}
          {hasClockInAndOut && <AllGood date={date} />}

          {/* If employee Clock in late, require Late Report */}
          {hasLateWithoutReason && (
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
          )}

          {/* If employee Clock out early, require Early Report */}
          {hasEarlyWithoutReason && (
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
          )}

          {/* If report submitted for Late */}
          {hasSubmittedLateReport && (
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
          )}

          {/* If report submitted for Early */}
          {hasSubmittedEarlyReport && (
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
          )}

          {/* If report submitted for Alpa */}
          {hasSubmittedReportAlpa && (
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
            />
          )}

          {/* If not yet submit report for Late and Early */}
          {hasLateAndEarlyWithoutReason && (
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
          )}

          {hasSubmittedLateNotEarly && (
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
          )}

          {hasSubmittedEarlyNotLate && (
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
          )}

          {/* If report submitted Late and Early */}
          {hasSubmittedBothReports && (
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
          )}

          {/* If Alpa */}
          {notAttend && (
            <SubmittedReport
              date={date}
              formik={formik}
              title="Unattendance Type"
              field="att_type"
              types={alpaType}
              fieldName="att_reason"
              placeholder="Select alpa type"
              alpa={true}
              reasonValue={formik.values.att_reason}
              typeValue={formik.values.att_type}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      {/* <AlertModal
        isOpen={isOpen}
        toggle={toggle}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Report submitted!" : "Process error!"}
        description={
          requestType === "post"
            ? "Your report is logged"
            : error || "Please try again later"
        }
      /> */}
    </CustomSheet>
  );
};

export default memo(AttendanceForm);
