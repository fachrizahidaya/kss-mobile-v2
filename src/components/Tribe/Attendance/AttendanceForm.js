import { memo, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
=======
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
>>>>>>> 6d058444 (feat: attendance)

<<<<<<< HEAD
=======
=======
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";

>>>>>>> 859eea89 (first commit)
=======
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";

>>>>>>> c3ae17e7 (new branch)
import AlertModal from "../../../styles/modals/AlertModal";
>>>>>>> 0b658dbb (fix: attendance form)
import LateOrEarly from "./FormType/LateOrEarly";
import LateAndEarly from "./FormType/LateAndEarly";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import ForgotClockOut from "./FormType/ForgotClockOut";
import CustomSheet from "../../../layouts/CustomSheet";
<<<<<<< HEAD
=======
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
import SubmittedReport from "./FormType/SubmittedReport";
import AllGood from "./FormType/AllGood";
import ForgotClockOut from "./FormType/ForgotClockOut";
import CustomSheet from "../../../layouts/CustomSheet";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> fd03cb64 (feat: form for forgot clockout)
import { useAttendance } from "./hooks/useAttendance";
import PickImage from "../../../styles/buttons/PickImage";
<<<<<<< HEAD
<<<<<<< HEAD
import { useFetch } from "../../../hooks/useFetch";
import Submitted from "./FormType/Submitted";
import Unattendance from "./FormType/Unattendance";
=======
import HolidayLeave from "./FormType/HolidayLeave";
<<<<<<< HEAD
>>>>>>> 5ff79603 (fix:)
=======
import styles from "./Attendance.styles";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 6d058444 (feat: attendance)
=======
import { useAttendance } from "./useAttendance";
>>>>>>> d64fa295 (fix: calendar)
=======
import { useAttendance } from "./hooks/useAttendance";
>>>>>>> 44e387b9 (fix: calendar)
=======
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
=======
import { useFetch } from "../../../hooks/useFetch";
>>>>>>> 0b658dbb (fix: attendance form)
=======
import { useAttendance } from "./hooks/useAttendance";
import PickImage from "../../../styles/buttons/PickImage";
import { useFetch } from "../../../hooks/useFetch";
>>>>>>> 859eea89 (first commit)
=======
import { useAttendance } from "./hooks/useAttendance";
import PickImage from "../../../styles/buttons/PickImage";
import { useFetch } from "../../../hooks/useFetch";
>>>>>>> c3ae17e7 (new branch)

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
  notAttendPastDate,
  notAttend,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  notClockOutNotLate,
=======
  isLeave,
  holidayCutLeave,
  holiday,
  CURRENT_DATE,
>>>>>>> 5ff79603 (fix:)
=======
>>>>>>> d6d8c50d (fix:)
=======
  notClockOutNotLate,
>>>>>>> 40c1e0d2 (fix: form attendance)
=======
  notClockOutNotLate,
>>>>>>> 859eea89 (first commit)
=======
  notClockOutNotLate,
>>>>>>> c3ae17e7 (new branch)
  reference,
  isOpen,
  toggle,
  requestType,
  error,
  refetchAttendance,
  refetchAttachment,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 980d4a4f (fix: attendance)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
  setSelectedPicture,
  isFullScreen,
  setIsFullScreen,
  toggleFullScreen,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  currentDate,
=======
>>>>>>> e5a0993b (fix: attendance reason)
=======
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
=======
>>>>>>> 980d4a4f (fix: attendance)
=======
>>>>>>> 859eea89 (first commit)
=======
  currentDate,
>>>>>>> 72fb5f5b (chore: adjustment for conflict)
=======
>>>>>>> c3ae17e7 (new branch)
=======
  currentDate,
>>>>>>> c0cd712b (fix: form attendance late, forgot clock out)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

  const approvalHistoryParams = {
    "object[]": [
      "Attendance Late",
      "Attendance Early",
      "Unattendance",
      "Attendance Forgot Clock Out",
    ],

    object_id: date?.id,
  };

  const { data: history } = useFetch(`/hr/approvals/history`, [], approvalHistoryParams);
=======
>>>>>>> d64fa295 (fix: calendar)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)

  const approvalHistoryParams = {
    "object[]": "Attendance Late",
    "object[]": "Attendance Early",
    "object[]": "Unattendance",
    "object[]": "Attendance Forgot Clock Out",
    object_id: date?.id,
  };

  const { data: history } = useFetch(`/hr/approvals/history`, [], approvalHistoryParams);

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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const tabs = useMemo(() => {
    return [
      { title: "late", value: "late", number: 1 },
      { title: "early", value: "early", number: 2 },
    ];
  }, []);

  const handleChangeNumber = (value) => {
    setNumber(value);
  };

  const handleChangeTab = useCallback((value) => {
    setTabValue(value);
  }, []);

=======
>>>>>>> d64fa295 (fix: calendar)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
  const handleClose = () => {
    if (!formik.isSubmitting && formik.status !== "processing") {
      toggleReport();
      formik.resetForm();
    }
  };

>>>>>>> 33ce77b1 (fix:)
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
      attachment: "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      formData.append("_method", "PATCH");
      handleSubmit(date?.id, formData, setSubmitting, setStatus);
    },
  });

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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

  const handleClose = () => {
    formik.resetForm();
    setFileAttachment(null);
    reference.current?.hide();
  };

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
      setFileAttachment(null);
    }
  }, [formik.isSubmitting, formik.status]);

  useEffect(() => {
    formik.setFieldValue("attachment", fileAttachment ? fileAttachment : "");
  }, [fileAttachment]);

  const renderForm = () => {
    if (hasLateWithoutReason) {
      return (
        <View style={{ gap: 10 }}>
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
            reasonNotClockOutValue={formik.values.att_reason}
            handleChangeNotClockOut={(value) => formik.setFieldValue("att_reason", value)}
            fieldName={"att_reason"}
            currentDate={currentDate}
            approvalHistory={history?.data}
            data={date}
          />
        </View>
      );
    } else if (hasEarlyWithoutReason) {
      return (
        <View style={{ gap: 10 }}>
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
            reasonNotClockOutValue={formik.values.att_reason}
            handleChangeNotClockOut={(value) => formik.setFieldValue("att_reason", value)}
            fieldName={"att_reason"}
          />
        </View>
=======
  const clockOutFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reason: "",
    },
    onSubmit: (values, {}) => {},
  });

=======
>>>>>>> 987e6189 (feat: forgot to clock out form)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
        <View style={{ gap: 10 }}>
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
            reasonNotClockOutValue={formik.values.att_reason}
            handleChangeNotClockOut={(value) => formik.setFieldValue("att_reason", value)}
            fieldName={"att_reason"}
          />
        </View>
      );
    } else if (hasEarlyWithoutReason) {
      return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
>>>>>>> fd03cb64 (feat: form for forgot clockout)
=======
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
        <View style={{ gap: 10 }}>
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
            reasonNotClockOutValue={formik.values.att_reason}
            handleChangeNotClockOut={(value) => formik.setFieldValue("att_reason", value)}
            fieldName={"att_reason"}
          />
        </View>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 987e6189 (feat: forgot to clock out form)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          approvalHistory={history?.data}
=======
>>>>>>> fd03cb64 (feat: form for forgot clockout)
=======
          approvalHistory={history?.data}
>>>>>>> 0b658dbb (fix: attendance form)
=======
          approvalHistory={history?.data}
>>>>>>> 859eea89 (first commit)
=======
          approvalHistory={history?.data}
>>>>>>> c3ae17e7 (new branch)
        />
      );
    } else if (hasSubmittedLateReport) {
      return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <View style={{ gap: 10 }}>
          <Submitted
=======
        <View style={{ gap: 10 }}>
          <SubmittedReport
>>>>>>> 987e6189 (feat: forgot to clock out form)
=======
        <View style={{ gap: 10 }}>
          <SubmittedReport
>>>>>>> 859eea89 (first commit)
=======
        <View style={{ gap: 10 }}>
          <SubmittedReport
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            reasonNotClockOutValue={formik.values.att_reason}
            handleChangeNotClockOut={(value) => formik.setFieldValue("att_reason", value)}
            approvalHistory={history?.data}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            currentDate={currentDate}
            timeDuty={date?.onDuty}
            time={date?.timeIn}
            timeLateOrEarly={date?.late}
<<<<<<< HEAD
=======
            reasonNotClockOutValue={formik.values.att_reason}
            handleChangeNotClockOut={(value) => formik.setFieldValue("att_reason", value)}
            approvalHistory={history?.data}
>>>>>>> 859eea89 (first commit)
=======
            currentDate={currentDate}
>>>>>>> 72fb5f5b (chore: adjustment for conflict)
=======
            reasonNotClockOutValue={formik.values.att_reason}
            handleChangeNotClockOut={(value) => formik.setFieldValue("att_reason", value)}
            approvalHistory={history?.data}
>>>>>>> c3ae17e7 (new branch)
=======
            currentDate={currentDate}
>>>>>>> c0cd712b (fix: form attendance late, forgot clock out)
=======
>>>>>>> f9738b6c (fix: attendance form)
          />
        </View>
      );
    } else if (hasSubmittedEarlyReport) {
      return (
        <View style={{ gap: 10 }}>
<<<<<<< HEAD
<<<<<<< HEAD
          <Submitted
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
            reasonNotClockOutValue={formik.values.att_reason}
            handleChangeNotClockOut={(value) => formik.setFieldValue("att_reason", value)}
            approvalHistory={history?.data}
            timeDuty={date?.offDuty}
            time={date?.timeOut}
            timeLateOrEarly={date?.early}
          />
        </View>
      );
    } else if (hasSubmittedReportAlpa || notAttendPastDate || notAttend) {
      return (
        <View style={{ gap: 10 }}>
          <Unattendance
            date={date}
            formik={formik}
            title="Unattendance Type"
            field="att_type"
            types={alpaType}
            fieldName="att_reason"
            alpa={true}
            reasonValue={formik.values.att_reason}
            typeValue={formik.values.att_type}
            // sickFormik={sickAttachmentFormik}
            onChangeStartDate={handleChangeStartDate}
            onChangeEndDate={handleChangeEndDate}
            onSelectFile={handleSelectFile}
            fileAttachment={fileAttachment}
            setFileAttachment={setFileAttachment}
            setRequestType={setRequestType}
            setError={setError}
            toggleAlert={toggleAlert}
            toggleImage={toggleImage}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            setSelectedPicture={setSelectedPicture}
            toggleFullScreen={toggleFullScreen}
            approvalHistory={history?.data}
          />
        </View>
      );
    } else if (notClockOutNotLate) {
      return (
        <ForgotClockOut
          formik={formik}
          value={formik.values.att_reason}
          handleChange={(value) => formik.setFieldValue("att_reason", value)}
          fieldName={"att_reason"}
          disabled={date?.approvalClockOut === null ? false : true}
          isEditable={date?.approvalClockOut === null ? true : false}
          approvalClockOut={date?.approvalClockOut}
          tabValue={tabValue}
          date={date}
          approvalHistory={history?.data}
=======
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
=======
=======
            reasonNotClockOutValue={formik.values.att_reason}
            handleChangeNotClockOut={(value) => formik.setFieldValue("att_reason", value)}
>>>>>>> 40c1e0d2 (fix: form attendance)
=======
>>>>>>> 0b658dbb (fix: attendance form)
          />
        </View>
>>>>>>> 987e6189 (feat: forgot to clock out form)
      );
    } else if (hasSubmittedEarlyReport) {
      return (
        <View style={{ gap: 10 }}>
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
            reasonNotClockOutValue={formik.values.att_reason}
            handleChangeNotClockOut={(value) => formik.setFieldValue("att_reason", value)}
            approvalHistory={history?.data}
          />
        </View>
      );
    } else if (hasSubmittedReportAlpa || notAttend) {
      return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
        />
      );
    } else if (!date?.timeOut) {
      return (
        <ForgotClockOut
          formik={clockOutFormik}
          value={clockOutFormik.values.reason}
          fieldName={"reason"}
          handleChange={(value) => clockOutFormik.setFieldValue("reason", value)}
>>>>>>> fd03cb64 (feat: form for forgot clockout)
=======
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
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
        />
=======
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
        <View style={{ gap: 10 }}>
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
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            setSelectedPicture={setSelectedPicture}
            toggleFullScreen={toggleFullScreen}
            approvalHistory={history?.data}
          />
        </View>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 987e6189 (feat: forgot to clock out form)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
      );
    } else if (notClockOutNotLate) {
      return (
        <ForgotClockOut
          formik={formik}
          value={formik.values.att_reason}
          handleChange={(value) => formik.setFieldValue("att_reason", value)}
          fieldName={"att_reason"}
          disabled={date?.approvalClockOut === null ? false : true}
          isEditable={date?.approvalClockOut === null ? true : false}
          approvalClockOut={date?.approvalClockOut}
          tabValue={tabValue}
          date={date}
          approvalHistory={history?.data}
        />
      );
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
      refetchAttendance();
      refetchAttachment();
      toggleReport();
<<<<<<< HEAD
<<<<<<< HEAD
    }
  }, [formik.isSubmitting, formik.status]);

=======
>>>>>>> fd03cb64 (feat: form for forgot clockout)
  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
      refetchAttendance();
      refetchAttachment();
      toggleReport();
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <View>{renderForm()}</View>
      </TouchableWithoutFeedback>

      <PickImage
        setImage={setFileAttachment}
        modalIsOpen={imageIsOpen}
        toggleModal={toggleImage}
<<<<<<< HEAD
=======
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
<<<<<<< HEAD
>>>>>>> 33ce77b1 (fix:)
=======
        <View>{renderForm()}</View>
      </TouchableWithoutFeedback>
=======
        <View>{renderForm()}</View>
      </TouchableWithoutFeedback>
>>>>>>> c3ae17e7 (new branch)

      <PickImage
        setImage={setFileAttachment}
        modalIsOpen={imageIsOpen}
        toggleModal={toggleImage}
<<<<<<< HEAD
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
      />
=======
      /> */}
>>>>>>> d6d8c50d (fix:)
=======
        <View>{renderForm()}</View>
      </TouchableWithoutFeedback>
>>>>>>> fd03cb64 (feat: form for forgot clockout)
=======
      />
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
    </CustomSheet>
  );
};

export default memo(AttendanceForm);
