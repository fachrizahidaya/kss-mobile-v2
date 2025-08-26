import { useCallback, useEffect, useRef } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import AttendanceCalendar from "../../../components/Tribe/Attendance/AttendanceCalendar";
import AttendanceForm from "../../../components/Tribe/Attendance/AttendanceForm";
import AddAttendanceAttachment from "../../../components/Tribe/Attendance/AddAttendanceAttachment";
import AttendanceAttachment from "../../../components/Tribe/Attendance/AttendanceAttachment";
import AlertModal from "../../../styles/modals/AlertModal";
import RemoveConfirmationModal from "../../../styles/modals/RemoveConfirmationModal";
import { selectFile } from "../../../styles/buttons/SelectFIle";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import { useAttendance } from "./hooks/useAttendance";
import AttendanceColor from "../../../components/Tribe/Attendance/AttendanceColor";
import CustomCalendar from "../../../components/Tribe/Attendance/CustomCalendar";
import { toggleFullScreenImageHandler } from "../../../components/Tribe/Feed/shared/functions";

const AttendanceScreen = () => {
  const {
    filter,
    items,
    date,
    fileAttachment,
    requestType,
    errorMessage,
    success,
    hasMonthPassed,
    unattendanceDate,
    currentDate,
    setFileAttachment,
    setRequestType,
    setErrorMessage,
    setItems,
    setDate,
    setSuccess,
    setUnattendanceDate,
    updateAttendanceCheckAccess,
    attendanceScreenSheetRef,
    attachmentScreenSheetRef,
    deleteAttendanceAttachmentIsLoading,
    attendance,
    attendanceIsFetching,
    refetchAttendance,
    attachment,
    attachmentIsFetching,
    refetchAttachment,
    sickAttachment,
    sickAttachmentIsFetching,
    refetchSickAttachment,
    handleSwitchMonth,
    handleSubmitReport,
    handleSubmitAttachment,
    handleOpenDeleteAttachment,
    handleHasMonthPassedCheck,
    handleRefresh,
    handleDeleteAttachment,
    pickImageIsOpen,
    togglePickImage,
    deleteAttachmentIsOpen,
    toggleDeleteAttachment,
    attendanceReportModalIsOpen,
    toggleAttendanceReportModal,
    attendanceAttachmentModalIsOpen,
    toggleAttendanceAttachmentModal,
    alertIsOpen,
    toggleAlert,
    toggleDate,
    handleCloseDate,
    isFullScreen,
    setIsFullScreen,
    setSelectedPicture,
  } = useAttendance();

  const firstTimeRef = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();

  const { unattendance } = route.params;

  /**
   * Handle attendance status by day
   */
  const statusTypes = [
    { key: "allGood", color: "#EDEDED", name: "All Good", textColor: Colors.fontDark },
    {
      key: "reportRequired",
      color: "#FDC500",
      name: "Report Required",
      textColor: Colors.fontLight,
    },
    {
      key: "submittedReport",
      color: "#186688",
      name: "Submitted Report",
      textColor: Colors.fontLight,
    },
    { key: "dayOff", color: "#3bc14a", name: "Day-off", textColor: Colors.fontLight },
    {
      key: "leave",
      color: "#F97316",
      name: "Leave",
      textColor: Colors.fontLight,
    },
    { key: "sick", color: "#d6293a", name: "Sick", textColor: Colors.fontLight },
  ];
  const [allGood, reportRequired, submittedReport, dayOff, leave, sick] = statusTypes;

  /**
   * Handle attendance for form report by day
   */
  const attendanceType = date?.attendanceType;
  const attendanceReason = date?.attendanceReason;
  const dayType = date?.dayType;
  const lateType = date?.lateType;
  const lateReason = date?.lateReason;
  const earlyType = date?.earlyType;
  const earlyReason = date?.earlyReason;
  const lateStatus = date?.lateStatus;
  const earlyStatus = date?.earlyStatus;
  const timeIn = date?.timeIn;
  const isWorkDay = date?.dayType === "Work Day";
  const hasClockInAndOut =
    date?.dayType === "Work Day" &&
    !date?.lateType &&
    !date?.earlyType &&
    date?.timeIn &&
    !["Leave", "Alpa", "Absent"].includes(date?.attendanceType);
  const hasLateWithoutReason =
    date?.dayType === "Work Day" &&
    (date?.attendanceType === "Attend" || date?.attendanceType === "Present") &&
    date?.late &&
    !date?.lateReason;
  const hasEarlyWithoutReason =
    date?.dayType === "Work Day" &&
    (date?.attendanceType === "Attend" || date?.attendanceType === "Present") &&
    date?.early &&
    !date?.earlyReason;
  const hasLateAndEarlyWithoutReason =
    date?.late && date?.early && !date?.lateReason && !date?.earlyReason;
  const hasSubmittedLateReport = date?.lateType && date?.lateReason && !date?.earlyType;
  const hasSubmittedEarlyReport = date?.earlyType && date?.earlyReason && !date?.lateType;
  const hasSubmittedLateNotEarly =
    date?.late && date?.lateReason && date?.early && !date?.earlyReason;
  const hasSubmittedEarlyNotLate =
    date?.early && date?.earlyReason && date?.late && !date?.lateReason;
  const hasSubmittedBothReports = date?.late && date?.early;
  const hasSubmittedReportAlpa =
    (date?.attendanceType === "Sick" ||
      date?.attendanceType === "Other" ||
      date?.attendanceType === "Permit" ||
      date?.attendanceType === "Alpa" ||
      date?.attendanceType === "Absent") &&
    date?.attendanceReason &&
    date?.dayType === "Work Day";
  const notAttend =
    (date?.attendanceType === "Alpa" || date?.attendanceType === "Absent") &&
    date?.dayType === "Work Day" &&
    !date?.attendanceReason;
  const isLeave =
    (attendanceType === "Leave" && dayType !== "Holiday") || attendanceType === "Permit";
  const holiday = dayType === "Holiday";
  const holidayCutLeave =
    attendanceType === "Leave" && dayType === "Holiday" && attendanceReason;

  /**
   * Handle to create appropriate object for react-native-calendar
   */
  useEffect(() => {
    if (attendance?.data && attendance?.data.length > 0) {
      let dateList = {};

      attendance?.data.forEach((item) => {
        dateList[item?.date] = [
          {
            id: item?.id,
            attendanceReason: item?.att_reason,
            attendanceType: item?.att_type,
            timeIn: item?.time_in,
            late: item?.late,
            lateReason: item?.late_reason,
            lateType: item?.late_type,
            lateStatus: item?.late_status,
            dayType: item?.day_type,
            timeOut: item?.time_out,
            early: item?.early,
            earlyReason: item?.early_reason,
            earlyType: item?.early_type,
            earlyStatus: item?.early_status,
            confirmation: item?.confirm,
            date: item?.date,
            onDuty: item?.on_duty,
            offDuty: item?.off_duty,
            leaveRequest: item?.leave_request,
            approvalLate: item?.approval_late,
            approvalLateStatus: item?.approval_late?.status,
            approvalEarly: item?.approval_early,
            approvalEarlyStatus: item?.approval_early?.status,
            approvalClockOut: item?.approval_forgot_clock_out,
            approvalClockOutStatus: item?.approval_forgot_clock_out?.status,
            approvalUnattendance: item?.approval_unattendance,
            approvalUnattendanceStatus: item?.approval_unattendance?.status,
            attendanceAttachment: item?.timesheet_attachment,
          },
        ];
      });

      setItems(dateList);
    }
  }, [attendance?.data]);

  var renderAlertType;

  if (requestType === "remove") {
    renderAlertType = "success";
  } else if (requestType === "post") {
    renderAlertType = "info";
  } else if (requestType === "reject") {
    renderAlertType = "warning";
  } else {
    renderAlertType = "danger";
  }

  var renderAlertTitle;

  if (requestType === "remove") {
    renderAlertTitle = "Changes saved!";
  } else if (requestType === "post") {
    renderAlertTitle = "Attendance confirmed!";
  } else {
    renderAlertTitle = "Process error!";
  }

  useEffect(() => {
    if (unattendance) {
      setUnattendanceDate(dayjs(unattendance).format("YYYY-MM-DD"));
    }
    // attachmentScreenSheetRef.current?.show();
    navigation.navigate("New Attachment", {
      toggle: toggleAlert,
      setRequestType: setRequestType,
      setError: setErrorMessage,
    });
  }, [unattendance]);

  useEffect(() => {
    handleHasMonthPassedCheck(filter.year, filter.month);
  }, [filter]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetchAttendance();
      refetchAttachment();
    }, [refetchAttendance, refetchAttachment])
  );

  return (
    <Screen
      screenTitle="My Attendance"
      returnButton={true}
      onPress={() => navigation.goBack()}
      backgroundColor={Colors.secondary}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={
              attendanceIsFetching && attachmentIsFetching && sickAttachmentIsFetching
            }
            onRefresh={handleRefresh}
          />
        }
      >
        {/* <AttendanceCalendar
          items={items}
          updateAttendanceCheckAccess={updateAttendanceCheckAccess}
          toggleDate={toggleDate}
          currentDate={currentDate}
          handleSwitchMonth={handleSwitchMonth}
          allGood={allGood}
          reportRequired={reportRequired}
          submittedReport={submittedReport}
          dayOff={dayOff}
          sick={sick}
        /> */}

        <CustomCalendar
          toggleDate={toggleDate}
          updateAttendanceCheckAccess={updateAttendanceCheckAccess}
          allGood={allGood}
          reportRequired={reportRequired}
          submittedReport={submittedReport}
          dayOff={dayOff}
          sick={sick}
          leave={leave}
          items={items}
          currentDate={currentDate}
          handleSwitchMonth={handleSwitchMonth}
          beginPeriod={dayjs(attendance?.period?.begin_date).format("DD MMM YYYY")}
          endPeriod={dayjs(attendance?.period?.end_date).format("DD MMM YYYY")}
        />
        <AttendanceColor />

        {/* <AttendanceAttachment
          attachment={attachment}
          reference={attachmentScreenSheetRef}
          setAttachmentId={handleOpenDeleteAttachment}
          attachmentIsFetching={attachmentIsFetching}
          refetchAttachment={refetchAttachment}
          sickAttachment={sickAttachment?.data}
          sickAttachmentIsFetching={sickAttachmentIsFetching}
          refetchSickAttachment={refetchSickAttachment}
          navigation={navigation}
        /> */}
      </ScrollView>

      <AttendanceForm
        toggleReport={handleCloseDate}
        date={date}
        handleSubmit={handleSubmitReport}
        hasClockInAndOut={hasClockInAndOut}
        hasLateWithoutReason={hasLateWithoutReason}
        hasEarlyWithoutReason={hasEarlyWithoutReason}
        hasLateAndEarlyWithoutReason={hasLateAndEarlyWithoutReason}
        hasSubmittedLateNotEarly={hasSubmittedLateNotEarly}
        hasSubmittedEarlyNotLate={hasSubmittedEarlyNotLate}
        hasSubmittedBothReports={hasSubmittedBothReports}
        hasSubmittedReportAlpa={hasSubmittedReportAlpa}
        hasSubmittedLateReport={hasSubmittedLateReport}
        hasSubmittedEarlyReport={hasSubmittedEarlyReport}
        notAttend={notAttend}
        isLeave={isLeave}
        CURRENT_DATE={currentDate}
        reference={attendanceScreenSheetRef}
        isOpen={attendanceReportModalIsOpen}
        toggle={toggleAttendanceReportModal}
        requestType={requestType}
        error={errorMessage}
        holiday={holiday}
        holidayCutLeave={holidayCutLeave}
        refetchAttendance={refetchAttendance}
        refetchAttachment={refetchSickAttachment}
        handleSubmitSickAttachment={handleSubmitAttachment}
        handleSelectFile={selectFile}
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        setRequestType={setRequestType}
        setError={setErrorMessage}
        toggleAlert={toggleAlert}
        toggleImage={togglePickImage}
        imageIsOpen={pickImageIsOpen}
        unattendanceDate={unattendanceDate}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        setSelectedPicture={setSelectedPicture}
        toggleFullScreen={toggleFullScreenImageHandler}
      />

      <AddAttendanceAttachment
        handleSelectFile={selectFile}
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        handleSubmit={handleSubmitAttachment}
        reference={attachmentScreenSheetRef}
        isOpen={attendanceAttachmentModalIsOpen}
        toggle={toggleAttendanceAttachmentModal}
        requestType={requestType}
        error={errorMessage}
        setRequestType={setRequestType}
        setError={setErrorMessage}
        toggleAlert={toggleAlert}
        unattendanceDate={unattendanceDate}
      />

      <RemoveConfirmationModal
        isOpen={deleteAttachmentIsOpen}
        toggle={toggleDeleteAttachment}
        description="Are you sure want to remove attachment?"
        onPress={handleDeleteAttachment}
        isLoading={deleteAttendanceAttachmentIsLoading}
        success={success}
        setSuccess={setSuccess}
        toggleOtherModal={toggleAlert}
      />

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        type={renderAlertType}
        title={renderAlertTitle}
        description={
          requestType === "remove" || "post"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
      />
    </Screen>
  );
};

export default AttendanceScreen;
